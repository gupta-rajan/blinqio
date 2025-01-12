import { Navbar, Nav, Container } from "react-bootstrap";
import { FaUser } from "react-icons/fa";
import logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Set initial state for logged-in status
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsLoggedIn(false); // Update state when the user logs out
    navigate('/'); // Navigate to home or other page
  };

  return (
    <header>
      <Navbar bg="primary" variant="dark" expand="md" collapseOnSelect>
        <Container>
          <Navbar.Brand href="/">
            <img src={logo} alt="BlinqIO" style={{ width: '150px', height: 'auto' }} />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              {!isLoggedIn ? (
                <>
                  <Nav.Link as={Link} to="/login">
                    <FaUser /> Sign In
                  </Nav.Link>
                  <Nav.Link as={Link} to="/register">
                    <FaUser /> Register
                  </Nav.Link>
                </>
              ) : (
                <Nav.Link onClick={handleLogout}>
                  <FaUser /> Log Out
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;