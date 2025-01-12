import { Row, Col } from "react-bootstrap";
import { useGetTasksQuery } from "../slices/tasksApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";

const HomeScreen = () => {
  const {
    data: tasks,
    isLoading,
    error,
  } = useGetTasksQuery();

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error?.data?.message || error.error}</Message>
      ) : (
        <>
          <h1>Welcome to BlinqIO</h1>
          <Row>
            {tasks.map((task) => (
              <Col sm={12} md={6} lg={4} xl={3}>
                <h3>{task.title}</h3>
              </Col>
            ))}
          </Row>
        </>
      )}
    </>
  );
};

export default HomeScreen;
