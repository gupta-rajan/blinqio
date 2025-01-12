import asyncHandler from '../middleware/asyncHandler.js';
import Task from '../models/taskModel.js'; // Adjust path to task model

// Create Task
//@desc Create a new task
//@route POST /api/tasks
//@access Private
const createTask = asyncHandler(async (req, res) => {
  const { title, description } = req.body;

  const task = new Task({
    title,
    description,
    user: req.user._id, // assuming user is authenticated
  });

  const createdTask = await task.save();
  res.status(201).json(createdTask);
});

// Get All Tasks
//@desc Get all tasks
//@route GET /api/tasks
//@access Private
const getTasks = asyncHandler(async (req, res) => {
  console.log('API hit with params:', req.query);
  const tasks = await Task.find({});
  res.json(tasks);
});

// Get Task by ID
//@desc Get task by ID
//@route GET /api/tasks/:id
//@access Private
const getTaskById = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    res.status(404);
    throw new Error('Task not found');
  }

  res.json(task);
});

// Update Task
//@desc Update task details
//@route PUT /api/tasks/:id
//@access Private
const updateTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    res.status(404);
    throw new Error('Task not found');
  }

  task.title = req.body.title || task.title;
  task.description = req.body.description || task.description;

  const updatedTask = await task.save();

  res.json(updatedTask);
});

// Delete Task
//@desc Delete a task
//@route DELETE /api/tasks/:id
//@access Private
const deleteTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    res.status(404);
    throw new Error('Task not found');
  }

  await task.remove();

  res.json({ message: 'Task removed' });
});

export { createTask, getTasks, getTaskById, updateTask, deleteTask };