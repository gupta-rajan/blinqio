import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import taskRoutes from './routes/taskRoutes.js';
import userRoutes from './routes/userRoutes.js'; // Import user routes
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
dotenv.config();

const port = 4000;

connectDB(); // Connect to the MongoDB database

const app = express();

// Middleware to parse incoming JSON requests
app.use(express.json());

// Default route
app.get('/', (req, res) => {
    res.send('API is running...');
});

// User Routes
app.use('/api/users', userRoutes); // User routes

// Task Routes
app.use('/api/tasks', taskRoutes); // Task routes

// Error handling middlewares
app.use(notFound);  // Handles 404 errors (if a route doesn't match)
app.use(errorHandler);  // Custom error handling middleware

// Start the server
app.listen(port, () => console.log(`Server running on port ${port}`));