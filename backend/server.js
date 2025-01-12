import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';
import taskRoutes from './routes/taskRoutes.js'; // Import task routes
import userRoutes from './routes/userRoutes.js'; // Import user routes
import path from 'path';
// import tasks from './data/tasks.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
dotenv.config();

const port = process.env.PORT || 4000; // Set default port to 4000 if not provided in the environment variables

connectDB(); // Connect to MongoDB database

const app = express();

// Middleware to parse incoming JSON requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Default route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// User Routes
app.use('/api/users', userRoutes); // Handles all user-related routes (login, register, profile, etc.)

// Task Routes
app.use('/api/tasks', taskRoutes); // Handles all task-related routes

const __dirname = path.resolve();
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  );
} else {
  app.get('/', (req, res) => {
    res.send('API is running....');
  });
}

// Error handling middlewares
app.use(notFound);  // Handles 404 errors (if a route doesn't match)
app.use(errorHandler);  // Custom error handling middleware

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});