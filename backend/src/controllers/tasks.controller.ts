import { Request, Response } from 'express';
import pool from '../config/db';
import { CreateTaskInput, UpdateTaskInput } from '../types/task.types';

// Get all tasks for a user
export const getTasks = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user?.userId;
    const result = await pool.query(
      'SELECT * FROM tasks WHERE user_id = $1 ORDER BY created_at DESC',
      [userId]
    );

    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Create a new task
export const createTask = async (
  req: Request<{}, {}, CreateTaskInput>,
  res: Response
): Promise<void> => {
  try {
    const { title, description } = req.body;
    const userId = req.user?.userId;

    const result = await pool.query(
      'INSERT INTO tasks (title, description, user_id) VALUES ($1, $2, $3) RETURNING *',
      [title, description, userId]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update a task
export const updateTask = async (
  req: Request<{ id: string }, {}, UpdateTaskInput>,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const { title, description, isComplete } = req.body;
    const userId = req.user?.userId;

    // First check if the task belongs to the user
    const taskCheck = await pool.query(
      'SELECT * FROM tasks WHERE id = $1 AND user_id = $2',
      [id, userId]
    );

    if (taskCheck.rows.length === 0) {
      res.status(404).json({ message: 'Task not found' });
      return;
    }

    // Build the update query dynamically based on what fields were provided
    let updates: string[] = [];
    let values: any[] = [];
    let paramCount = 1;

    if (title !== undefined) {
      updates.push(`title = $${paramCount}`);
      values.push(title);
      paramCount++;
    }
    if (description !== undefined) {
      updates.push(`description = $${paramCount}`);
      values.push(description);
      paramCount++;
    }
    if (isComplete !== undefined) {
      updates.push(`is_complete = $${paramCount}`);
      values.push(isComplete);
      paramCount++;
    }

    values.push(id);
    values.push(userId);

    const result = await pool.query(
      `UPDATE tasks SET ${updates.join(', ')} 
       WHERE id = $${paramCount} AND user_id = $${paramCount + 1}
       RETURNING *`,
      values
    );

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete a task
export const deleteTask = async (
  req: Request<{ id: string }>,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const userId = req.user?.userId;

    const result = await pool.query(
      'DELETE FROM tasks WHERE id = $1 AND user_id = $2 RETURNING *',
      [id, userId]
    );

    if (result.rows.length === 0) {
      res.status(404).json({ message: 'Task not found' });
      return;
    }

    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json({ message: 'Server error' });
  }
};