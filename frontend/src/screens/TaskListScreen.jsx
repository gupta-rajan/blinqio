import React from 'react';
import { Button, ListGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const TaskListScreen = () => {
  const navigate = useNavigate();
  
  const tasks = [
    { id: 1, name: "Task 1" },
    { id: 2, name: "Task 2" },
    { id: 3, name: "Task 3" }
  ];

  const handleAddTask = () => {
    // Add logic to add a new task
    console.log("Add new task");
  };

  const handleDeleteTask = (taskId) => {
    // Add logic to delete a task
    console.log(`Delete task ${taskId}`);
  };

  return (
    <div>
      <h2>Your Task List</h2>
      <ListGroup>
        {tasks.map((task) => (
          <ListGroup.Item key={task.id}>
            {task.name}
            <Button
              variant="danger"
              onClick={() => handleDeleteTask(task.id)}
              className="float-end"
            >
              Delete
            </Button>
          </ListGroup.Item>
        ))}
      </ListGroup>
      <Button onClick={handleAddTask} className="mt-3">
        Add Task
      </Button>
    </div>
  );
};

export default TaskListScreen;