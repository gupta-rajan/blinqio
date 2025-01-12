import express from 'express';
const router = express.Router();
import {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
} from '../controllers/taskController.js';

router.route('/').post(createTask).get(getTasks); // Create and get all tasks
router.route('/:id').get(getTaskById).put(updateTask).delete(deleteTask); // Get, update, delete specific task

export default router;