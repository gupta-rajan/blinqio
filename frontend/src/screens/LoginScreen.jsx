import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { search } = useLocation();
  const redirect = new URLSearchParams(search).get("redirect") || "/tasklist"; // Default to '/tasklist' if no redirect is found

  useEffect(() => {
    // If the user is already logged in, redirect them to the task list
    const token = localStorage.getItem("authToken");
    if (token) {
      navigate(redirect);
    }
  }, [navigate, redirect]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    setError(""); // Reset error on each submit

    try {
      const response = await axios.post("/api/users/auth", {
        email,
        password,
      });

      // Store the token in localStorage (or cookie for better security in real apps)
      localStorage.setItem("authToken", response.data.token); 

      // Redirect to task list or to the page they were trying to access
      navigate(redirect);
    } catch (err) {
      setError("Invalid credentials. Please try again.");
    } finally {
      setIsLoading(false); // Stop loading once the API call is done
    }
  };

  return (
    <Container className="login-container">
      <Row className="justify-content-md-center">
        <Col md={6}>
          <div className="login-box">
            <h2>Sign In</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Form.Group>

              {error && <Alert variant="danger">{error}</Alert>}

              <Button variant="primary" type="submit" block disabled={isLoading}>
                {isLoading ? "Logging In..." : "Log In"}
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginScreen;