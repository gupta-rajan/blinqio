import { Button, ListGroup, Row, Col } from 'react-bootstrap';
import { useDeleteTaskMutation } from '../slices/tasksApiSlice';

const TaskItem = ({ task }) => {
  const [deleteTask] = useDeleteTaskMutation();

  const handleDeleteTask = async () => {
    try {
      await deleteTask(task._id).unwrap();
    } catch (err) {
      console.error('Failed to delete task:', err);
    }
  };

  return (
    <ListGroup.Item key={task._id}>
      <Row>
        <Col md={8}>
          <h5>{task.title}</h5>
          <p>{task.description}</p>
        </Col>
        <Col md={4} className="text-end">
          <Button variant="danger" onClick={handleDeleteTask}>
            Delete
          </Button>
        </Col>
      </Row>
    </ListGroup.Item>
  );
};

export default TaskItem;
