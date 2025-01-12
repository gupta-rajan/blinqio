import asyncHandler from '../middleware/asyncHandler.js';
import User from '../models/userModel.js';

// Create User
//@desc Create a new user
//@route POST /api/users
//@access Public
const createUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  const user = new User({
    name,
    email,
    password,
  });

  const createdUser = await user.save();

  res.status(201).json({
    _id: createdUser._id,
    name: createdUser.name,
    email: createdUser.email,
  });
});

// Get All Users
//@desc Get all users
//@route GET /api/users
//@access Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

// Get User by ID
//@desc Get user by ID
//@route GET /api/users/:id
//@access Private
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  res.json(user);
});

// Update User
//@desc Update user information
//@route PUT /api/users/:id
//@access Private
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  user.name = req.body.name || user.name;
  user.email = req.body.email || user.email;
  if (req.body.password) {
    user.password = req.body.password;
  }

  const updatedUser = await user.save();

  res.json({
    _id: updatedUser._id,
    name: updatedUser.name,
    email: updatedUser.email,
  });
});

// Delete User
//@desc Delete a user
//@route DELETE /api/users/:id
//@access Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  await user.remove();

  res.json({ message: 'User removed' });
});

export { createUser, getUsers, getUserById, updateUser, deleteUser };