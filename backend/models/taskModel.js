import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User', // Reference to the User model
    },
    title: {
      type: String,
      required: [true, 'Please add a task title'],
    },
    description: {
      type: String,
      required: [true, 'Please add a task description'],
    },
    completed: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Create Task model
const Task = mongoose.model('Task', taskSchema);

export default Task;