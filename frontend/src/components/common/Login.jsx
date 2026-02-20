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

const Login = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!data.email || !data.password) {
      return alert('Please fill all fields');
    }

    try {
      const res = await axiosInstance.post('/api/user/login', data);
      if (res.data.success) {
        alert(res.data.message);
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('user', JSON.stringify(res.data.userData));
        navigate('/dashboard');
        setTimeout(() => window.location.reload(), 1000);
      } else {
        alert(res.data.message);
      }
    } catch (err) {
      if (err.response?.status === 401) {
        alert("User doesn't exist or credentials are incorrect");
      } else {
        alert("Login failed. Try again.");
      }
      navigate('/login');
    }
  };

  return (
    <>
      {/* Navbar */}
      <Navbar expand="lg" className="bg-body-tertiary shadow-sm">
        <Container fluid>
          <Navbar.Brand><h2>Study App</h2></Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="ms-auto">
              <Link className="nav-link" to="/">Home</Link>
              <Link className="nav-link" to="/login">Login</Link>
              <Link className="nav-link" to="/register">Register</Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Login Form */}
      <div className="first-container">
        <Container style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '70vh' }}>
          <Box
            sx={{
              p: 4,
              bgcolor: '#dddde8db',
              border: '1px solid lightblue',
              borderRadius: '8px',
              width: { xs: '90%', sm: '70%', md: '40%' },
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ bgcolor: 'secondary.main', mb: 1 }} />
            <Typography component="h1" variant="h5" gutterBottom>
              Sign In
            </Typography>

            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, width: '100%' }}>
              <TextField
                margin="normal"
                fullWidth
                label="Email Address"
                name="email"
                value={data.email}
                onChange={handleChange}
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                fullWidth
                name="password"
                label="Password"
                type="password"
                value={data.password}
                onChange={handleChange}
                autoComplete="current-password"
              />
              <Box mt={2} textAlign="center">
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ mt: 2, mb: 2, width: '200px' }}
                >
                  Sign In
                </Button>
              </Box>
              <Grid container justifyContent="center">
                <Grid item>
                  <Typography variant="body2">
                    Don't have an account?
                    <Link style={{ marginLeft: 4, color: 'blue' }} to="/register">
                      Sign Up
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

export default Login;
