import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors';
import users from './data/users.js';
import tasks from './data/tasks.js'; // Sample task data
import User from './models/userModel.js';
import Task from './models/taskModel.js'; // Task model
import connectDB from './config/db.js'; // Database connection

dotenv.config();

connectDB();

// Import data to the database
const importData = async () => {
  try {
    // Delete existing data
    await Task.deleteMany();
    await User.deleteMany();

    // Insert sample users data
    const createdUsers = await User.insertMany(users);

    // Assuming the first user is the admin, assign tasks to the users
    const adminUser = createdUsers[0]._id;

    // Modify task data to associate tasks with the created users
    const sampleTasks = tasks.map((task) => {
      return { ...task, user: adminUser }; // Assign admin user to tasks
    });

    // Insert tasks
    await Task.insertMany(sampleTasks);

    console.log('Data Imported!'.green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

// Destroy data from the database
const destroyData = async () => {
  try {
    // Delete all tasks and users
    await Task.deleteMany();
    await User.deleteMany();

    console.log('Data Destroyed!'.red.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

// Command-line argument to determine whether to destroy or import data
if (process.argv[2] === '-d') {
  destroyData(); // Destroy data if '-d' argument is passed
} else {
  importData(); // Import data by default
}