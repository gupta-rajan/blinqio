import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useCreateTaskMutation } from '../slices/tasksApiSlice';

const TaskForm = () => {
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');

  const [createTask] = useCreateTaskMutation();

  const handleCreateTask = async (e) => {
    e.preventDefault();
    try {
      const taskData = {
        title: newTaskTitle,
        description: newTaskDescription,
      };
      await createTask(taskData).unwrap(); // Use unwrap to handle success/error properly
      setNewTaskTitle('');  // Clear input fields after successful task creation
      setNewTaskDescription('');
    } catch (err) {
      console.error('Failed to create task:', err);
    }
  };

  return (
    <Form onSubmit={handleCreateTask}>
      <Form.Group controlId="title" className="my-3">
        <Form.Label>Task Title</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter task title"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group controlId="description" className="my-3">
        <Form.Label>Task Description</Form.Label>
        <Form.Control
          as="textarea"
          placeholder="Enter task description"
          value={newTaskDescription}
          onChange={(e) => setNewTaskDescription(e.target.value)}
          required
        />
      </Form.Group>

      <Button type="submit" variant="primary" className="mt-2">
        Add Task
      </Button>
    </Form>
  );
};

export default TaskForm;
