import React, { useContext } from 'react';
import { Navbar, Nav, Button, Container } from 'react-bootstrap';
import { UserContext } from '../../App';
import { NavLink } from 'react-router-dom';

const NavBar = ({ setSelectedComponent }) => {
  const user = useContext(UserContext);

  if (!user) return null;

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/';
  };

  const handleOptionClick = (component) => {
    setSelectedComponent(component);
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary shadow-sm">
      <Container fluid>
        <Navbar.Brand>
          <h3 className="fw-bold">Study App</h3>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0" navbarScroll>
            <Nav.Link as="span" onClick={() => handleOptionClick('home')}>
              Home
            </Nav.Link>

            {user.userData.type === 'Teacher' && (
              <Nav.Link as="span" onClick={() => handleOptionClick('addcourse')}>
                Add Course
              </Nav.Link>
            )}

            {user.userData.type === 'Admin' && (
              <Nav.Link as="span" onClick={() => handleOptionClick('cousres')}>
                All Courses
              </Nav.Link>
            )}

            {user.userData.type === 'Student' && (
              <Nav.Link as="span" onClick={() => handleOptionClick('enrolledcourse')}>
                Enrolled Courses
              </Nav.Link>
            )}
          </Nav>

          <Nav className="align-items-center">
            <span className="me-3 fw-semibold">Hi, {user.userData.name}</span>
            <Button onClick={handleLogout} size="sm" variant="outline-danger">
              Log Out
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
