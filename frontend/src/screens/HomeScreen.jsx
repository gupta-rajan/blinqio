import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";
// import Loader from "../components/Loader";
import Message from "../components/Message";
import { Link } from "react-router-dom";

const HomeScreen = () => {
  const { userInfo } = useSelector((state) => state.auth); // Check if user is logged in

  return (
    <>
      <h1>Welcome to BlinqIO</h1>

      {/* Show the 'Go to ToDo List' button only if user is logged in */}
      {userInfo ? (
        <Link to="/tasklist">
          <Button variant="primary" className="mt-3">
            Go to ToDo List
          </Button>
        </Link>
      ) : (
        <Message variant="danger">You need to log in to view your tasks.</Message>
      )}
    </>
  );
};

export default HomeScreen;