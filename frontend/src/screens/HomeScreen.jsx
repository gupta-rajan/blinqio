import {useState, useEffect} from 'react';
import {Row, Col} from 'react-bootstrap';
import tasks from '../tasks';
import axios from 'axios';

const HomeScreen = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(()=>{
    const fetchTasks = async()=>{
      const {data} = await axios.get('/api/tasks');
      setTasks(data);
    }
    fetchTasks();
  },[]);

  return (
    <>
      <h1>Welcome to BlinqIO</h1>
      <Row>
        {tasks.map((task) =>(
          <Col sm={12} md={6} lg={4} xl={3}>
            <h3>{task.title}</h3>
          </Col>
        ))}
      </Row>
    </>
  )
}

export default HomeScreen