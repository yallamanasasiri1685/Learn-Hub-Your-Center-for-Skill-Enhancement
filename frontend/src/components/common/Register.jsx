import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import { Container, Nav } from 'react-bootstrap';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import axiosInstance from './AxiosInstance';
import Dropdown from 'react-bootstrap/Dropdown';

const Register = () => {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState('Select User');
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
    type: '',
  });

  const handleSelect = (eventKey) => {
    setSelectedOption(eventKey);
    setData({ ...data, type: eventKey });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, type } = data;
    if (!name || !email || !password || !type) {
      alert('Please fill all fields');
      return;
    }

    try {
      const response = await axiosInstance.post('/api/user/register', data);
      if (response.data.success) {
        alert(response.data.message);
        navigate('/login');
      } else {
        alert(response.data.message || 'Registration failed');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Something went wrong. Please try again.');
    }
  };

  return (
    <>
      {/* Navigation Bar */}
      <Navbar expand="lg" className="bg-body-tertiary shadow-sm">
        <Container fluid>
          <Navbar.Brand>
            <h2>Study App</h2>
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

      {/* Register Form */}
      <div className="first-container">
        <Container
          component="main"
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Box
            sx={{
              mt: 8,
              mb: 4,
              p: 4,
              background: '#dddde8db',
              border: '1px solid lightblue',
              borderRadius: '5px',
              maxWidth: '500px',
              width: '100%',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Avatar sx={{ bgcolor: 'secondary.main', mb: 1 }} />
              <Typography component="h1" variant="h5">
                Register
              </Typography>
            </Box>

            <Box component="form" onSubmit={handleSubmit} noValidate>
              <TextField
                margin="normal"
                fullWidth
                id="name"
                label="Full Name"
                name="name"
                value={data.name}
                onChange={handleChange}
                autoComplete="name"
              />
              <TextField
                margin="normal"
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                value={data.email}
                onChange={handleChange}
                autoComplete="email"
              />
              <TextField
                margin="normal"
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                value={data.password}
                onChange={handleChange}
                autoComplete="new-password"
              />

              <Dropdown className="my-3">
                <Dropdown.Toggle variant="outline-secondary" id="dropdown-basic">
                  {selectedOption}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => handleSelect('Student')}>Student</Dropdown.Item>
                  <Dropdown.Item onClick={() => handleSelect('Teacher')}>Teacher</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>

              <Box mt={2} textAlign="center">
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  style={{ width: '200px' }}
                >
                  Sign Up
                </Button>
              </Box>

              <Grid container justifyContent="center">
                <Grid item>
                  <Typography variant="body2">
                    Have an account?{' '}
                    <Link to="/login" style={{ color: 'blue' }}>
                      Sign In
                    </Link>
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </div>
    </>
  );
};

export default Register;
