import express from 'express';
import Task from '../models/taskModel.js'; // Task model
import asyncHandler from 'express-async-handler'; // For async route handling

const router = express.Router();

// @desc   Get all tasks
// @route  GET /api/tasks
// @access Public
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const tasks = await Task.find(); // Fetch all tasks
    res.json(tasks);
  })
);

// @desc   Get task by ID
// @route  GET /api/tasks/:id
// @access Public
router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const task = await Task.findById(req.params.id); // Find task by ID
    if (task) {
      res.json(task);
    } else {
      res.status(404).json({ message: 'Task not found' });
    }
  })
);

// @desc   Create a new task
// @route  POST /api/tasks
// @access Private
router.post(
  '/',
  asyncHandler(async (req, res) => {
    const { title, description, completed, user } = req.body;

    // Validation check
    if (!title || !description) {
      res.status(400);
      throw new Error('Please add title and description');
    }

    const task = new Task({
      title,
      description,
      completed,
      user, // Assuming `user` will be passed in the request body (e.g., logged-in user ID)
    });

    const createdTask = await task.save(); // Save new task to DB
    res.status(201).json(createdTask); // Respond with the created task
  })
);

// @desc   Update a task
// @route  PUT /api/tasks/:id
// @access Private
router.put(
  '/:id',
  asyncHandler(async (req, res) => {
    const { title, description, completed } = req.body;

    const task = await Task.findById(req.params.id);

    if (!task) {
      res.status(404);
      throw new Error('Task not found');
    }

    // Update task fields
    task.title = title || task.title;
    task.description = description || task.description;
    task.completed = completed !== undefined ? completed : task.completed;

    const updatedTask = await task.save();
    res.json(updatedTask);
  })
);

// @desc   Delete a task
// @route  DELETE /api/tasks/:id
// @access Private
router.delete(
  '/:id',
  asyncHandler(async (req, res) => {
    const task = await Task.findById(req.params.id);

    if (!task) {
      res.status(404);
      throw new Error('Task not found');
    }

    await task.remove(); // Remove task from DB
    res.json({ message: 'Task removed' });
  })
);

export default router;