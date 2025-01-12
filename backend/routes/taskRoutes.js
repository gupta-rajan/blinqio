import express from 'express';
const router = express.Router();
import {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
} from '../controllers/taskController.js';
import { protect } from '../middleware/authMiddleware.js'; // Ensure to import authentication middleware

// Routes for tasks
router.route('/')
  .get(protect, getTasks)   // Get all tasks (protected)
  .post(protect, createTask); // Create a new task (protected)

router.route('/:id')
  .get(protect, getTaskById) // Get a specific task (protected)
  .put(protect, updateTask)   // Update a specific task (protected)
  .delete(protect, deleteTask); // Delete a specific task (protected)

export default router;
