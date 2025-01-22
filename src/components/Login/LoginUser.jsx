// UserLogin.js
import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { userState } from '../../context/UserContext';
import { Box, Container, Grid, Typography, Button, TextField, CircularProgress } from '@mui/material';

function LoginUser() {
  const { setUserData, setIsAuthorized } = userState();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigateTo = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        'http://localhost:3000/api/v1/campus-connect/user/login',
        {
          email,
          password,
        },
        { withCredentials: true }
      );

      if (response.data.success) {
        setUserData(response.data);
        setIsAuthorized(true);
        navigateTo('/all-posts');
        toast.success('Login Successfully');
      } else {
        setIsAuthorized(false);
        navigateTo('/login');
      }
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 10, p: 4, backgroundColor: 'white', borderRadius: 2, boxShadow: 2 }}>
      <Grid container spacing={2 } sx={{ justifyContent: 'center' }}>
        <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <img src="/login.jpg" alt="Login Image" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </Grid>
        <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Box sx={{ p: 4 }}>
            <Typography variant="h4" sx={{ mb: 2 }}>
              User Login
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                fullWidth
                sx={{ mb: 2 }}
              />
              <TextField
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                fullWidth
                sx={{ mb: 2 }}
              />
              <Button
                type="submit"
                variant="contained"
                sx={{ mt: 2, backgroundColor: 'blue', '&:hover': { backgroundColor: 'darkblue' } }}
                disabled={loading}
              >
                {loading ? (
                  <CircularProgress size={24} sx={{ color: 'white' }} />
                ) : (
                  'Login'
                )}
              </Button>
              {error && <Typography variant="body2" sx={{ color: 'red', mt: 2 }}>{error.message}</Typography>}
            </form>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

export default LoginUser;