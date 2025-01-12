import { useEffect } from 'react';
import { ListGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useGetTasksQuery } from '../slices/tasksApiSlice';
import TaskForm from '../components/TaskForm';
import TaskItem from '../components/TaskItem';
import Loader from '../components/Loader';
import Message from '../components/Message';

const TaskListScreen = () => {
  const navigate = useNavigate();
  const { data: tasks, isLoading, error } = useGetTasksQuery();

  useEffect(() => {
    if (!localStorage.getItem('userInfo')) {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div>
      <h1>Task List</h1>

      {isLoading && <Loader />}
      {error && <Message variant="danger">{error?.data?.message || error.error}</Message>}

      <TaskForm />

      <h2 className="my-4">Your Tasks</h2>
      {tasks && tasks.length > 0 ? (
        <ListGroup>
          {tasks?.map((task) => (
            <TaskItem key={task._id} task={task} />
          ))}
        </ListGroup>
      ) : (
        <Message>No tasks available</Message>
      )}
    </div>
  );
};

export default TaskListScreen;