import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes';
import taskRoutes from './routes/tasks.routes';


dotenv.config();

const app: Express = express();
const port: number = parseInt(process.env.PORT || '3000', 10);

// Middleware
app.use(cors());
app.use(express.json());

// Health check route
app.get('/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok' });
});

// Routes
app.use('/auth', authRoutes);
app.use('/tasks', taskRoutes);

// Start server
app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});