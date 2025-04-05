import { Router } from 'express';
import { authenticateToken } from '../middleware/auth';
import * as tasksController from '../controllers/tasks.controller';

const router = Router();

// Protected routes
router.get('/', authenticateToken, tasksController.getTasks);
router.post('/', authenticateToken, tasksController.createTask);
router.put('/:id', authenticateToken, tasksController.updateTask);
router.delete('/:id', authenticateToken, tasksController.deleteTask);

export default router;