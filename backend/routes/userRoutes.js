import express from 'express';
const router = express.Router();
import {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} from '../controllers/userController.js';

router.route('/').post(createUser); // Create new user
router.route('/').get(getUsers); // Get all users
router.route('/:id').get(getUserById); // Get user by ID
router.route('/:id').put(updateUser); // Update user
router.route('/:id').delete(deleteUser); // Delete user

export default router;