import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Nav, Button, Navbar } from 'react-bootstrap';
import AllCourses from './AllCourses';

const Home = () => {
  return (
    <>
      {/* Navbar */}
      <Navbar expand="lg" bg="light" variant="light">
        <Container fluid>
          <Navbar.Brand as={Link} to="/">
            <h2 className='fw-bold'>Study App</h2>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="ms-auto">
              <Nav.Link as={Link} to="/">Home</Nav.Link>
              <Nav.Link as={Link} to="/login">Login</Nav.Link>
              <Nav.Link as={Link} to="/register">Register</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Hero Section */}
      <div className="first-container text-center py-5 bg-light">
        <div className="content-home">
          <h1 className="display-5 fw-bold">Small App, Big Dreams</h1>
          <p className="lead">Elevating Your Education</p>
          <Link to="/register">
            <Button variant="warning" size="md" className="mt-2">
              Explore Courses
            </Button>
          </Link>
        </div>
      </div>

      {/* Courses Preview */}
      <Container className="second-container py-4">
        <h2 className="text-center my-4">Trending Courses</h2>
        <AllCourses />
      </Container>
    </>
  );
};

export default Home;
