import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from '../config/db';
import { UserInput } from '../types';

export const register = async (
  req: Request<{}, {}, UserInput>,
  res: Response
): Promise<void> => {
  try {
    const { username, password } = req.body;

    // Check if user exists
    const userExists = await pool.query(
      'SELECT * FROM users WHERE username = $1',
      [username]
    );

    if (userExists.rows.length > 0) {
      res.status(400).json({ message: 'Username already exists' });
      return;
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const result = await pool.query(
      'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id, username',
      [username, hashedPassword]
    );

    const user = result.rows[0];

    // Generate token
    const token = jwt.sign(
      { userId: user.id, username: user.username },
      process.env.JWT_SECRET || 'default_secret',
      { expiresIn: '1h' }
    );

    res.status(201).json({
      token,
      user: {
        id: user.id,
        username: user.username
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const login = async (
  req: Request<{}, {}, UserInput>,
  res: Response
): Promise<void> => {
  try {
    const { username, password } = req.body;

    // Check if user exists
    const result = await pool.query(
      'SELECT * FROM users WHERE username = $1',
      [username]
    );

    if (result.rows.length === 0) {
      res.status(401).json({ message: 'Invalid credentials' });
      return;
    }

    const user = result.rows[0];

    // Check password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      res.status(401).json({ message: 'Invalid credentials' });
      return;
    }

    // Generate token
    const token = jwt.sign(
      { userId: user.id, username: user.username },
      process.env.JWT_SECRET || 'default_secret',
      { expiresIn: '1h' }
    );

    res.json({
      token,
      user: {
        id: user.id,
        username: user.username
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};