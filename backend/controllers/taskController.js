import asyncHandler from '../middleware/asyncHandler.js';
import Task from '../models/taskModel.js'; // Adjust path to task model

// Get All Tasks
//@desc Get all tasks for the logged-in user
//@route GET /api/tasks
//@access Private
const getTasks = asyncHandler(async (req, res) => {
  try {
    // Fetch tasks specific to the logged-in user
    const tasks = await Task.find({ user: req.user._id });  // Ensure user-specific tasks
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create Task
//@desc Create a new task for the logged-in user
//@route POST /api/tasks
//@access Private
const createTask = asyncHandler(async (req, res) => {
  const { title, description } = req.body;

  // Ensure required fields are provided
  if (!title || !description) {
    res.status(400);
    throw new Error('Title and description are required');
  }

  // Create a task and associate it with the logged-in user
  const task = new Task({
    title,
    description,
    user: req.user._id,  // Reference the logged-in user
  });

  try {
    const createdTask = await task.save();
    res.status(201).json(createdTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get Task by ID
//@desc Get task by ID
//@route GET /api/tasks/:id
//@access Private
const getTaskById = asyncHandler(async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      res.status(404);
      throw new Error('Task not found');
    }

    // Ensure the task belongs to the logged-in user
    if (task.user.toString() !== req.user._id.toString()) {
      res.status(401);
      throw new Error('Not authorized to view this task');
    }

    res.json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update Task
//@desc Update task details
//@route PUT /api/tasks/:id
//@access Private
const updateTask = asyncHandler(async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      res.status(404);
      throw new Error('Task not found');
    }

    // Ensure the task belongs to the logged-in user
    if (task.user.toString() !== req.user._id.toString()) {
      res.status(401);
      throw new Error('Not authorized to update this task');
    }

    task.title = req.body.title || task.title;
    task.description = req.body.description || task.description;

    const updatedTask = await task.save();

    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete Task
//@desc Delete a task
//@route DELETE /api/tasks/:id
//@access Private
const deleteTask = asyncHandler(async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      res.status(404);
      throw new Error('Task not found');
    }

    // Ensure the task belongs to the logged-in user
    if (task.user.toString() !== req.user._id.toString()) {
      res.status(401);
      throw new Error('Not authorized to delete this task');
    }

    await task.remove();

    res.json({ message: 'Task removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export { createTask, getTasks, getTaskById, updateTask, deleteTask };