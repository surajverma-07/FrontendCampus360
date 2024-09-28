import React from 'react';
import { Box, Container, Grid, Typography, Button, SvgIcon, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Card from '../components/Card';

const Home = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box sx={{ overflow: 'hidden' }}>
      <Container maxWidth="lg" sx={{ pt: 10, pb: 10 }}>
        <Grid container spacing={2} sx={{ justifyContent: 'center' }}>
          <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h2" sx={{ fontSize: '2.5rem', fontWeight: 'bold' }}>
                Elevate Your University Community Experience
              </Typography>
              <Typography variant="body1" sx={{ fontSize: '1.2rem', color: 'text.secondary' }}>
                The specialised community solution for leading schools and universities
              </Typography>
              <Button variant="contained" sx={{ mt: 2, backgroundColor: '#ff7e7e', '&:hover': { backgroundColor: '#ff6b6b' } }}>
                About us
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <img src="/Home-Image.svg" alt="Home Image" style={{ width: isMobile ? '100%' : '50%' }} />
          </Grid>
        </Grid>
      </Container>

      <Container maxWidth="lg" sx={{ pt: 10, pb: 10 }}>
        <Grid container spacing={2} sx={{ justifyContent: 'center' }}>
          <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h3" sx={{ fontSize: '2rem', fontWeight: 'bold', color: '#ff7e7e' }}>
                Campus Connect
              </Typography>
              <Typography variant="body1" sx={{ fontSize: '1.2rem', color: 'text.secondary' }}>
                Join a vibrant community where you can connect with peers, share events, and collaborate on projects effortlessly.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <img src="/img1.png" alt="Students collaborating" style={{ width: isMobile ? '100%' : '50%' }} />
          </Grid>
        </Grid>
      </Container>

      <Container maxWidth="lg" sx={{ pt: 10, pb: 10 }}>
        <Grid container spacing={2} sx={{ justifyContent: 'center' }}>
          <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h3" sx={{ fontSize: '2rem', fontWeight: 'bold', color: '#ff7e7e' }}>
                Campus Sells
              </Typography>
              <Typography variant="body1" sx={{ fontSize: '1.2rem', color: 'text.secondary' }}>
                Click 📸  AND SELL
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <img src="/img7.jpeg" alt="People in park" style={{ width: isMobile ? '100%' : '50%' }} />
          </Grid>
        </Grid>
      </Container>

      <Container maxWidth="lg" sx={{ pt: 10, pb: 10 }}>
        <Grid container spacing={2} sx={{ justifyContent: 'center' }}>
          <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h3" sx={{ fontSize: '2rem', fontWeight: 'bold', color: '#ff7e7e' }}>
                Campus-360
              </Typography>
              <Typography variant="body1" sx={{ fontSize: '1.2rem', color: 'text.secondary' }}>
                Your college here
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <img src="/img8.jpeg" alt="Woman in red coat" style={{ width: isMobile ? '100%' : '50%' }} />
          </Grid>
        </Grid>
      </Container>

      <Container maxWidth="lg" sx={{ pt: 10, pb: 10 }}>
        <Grid container spacing={2} sx={{ justifyContent: 'center' }}>
          <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h2" sx={{ fontSize: '2.5rem', fontWeight: 'bold' }}>
                Ready to level up your community strategy?
              </Typography>
              <Button variant="contained" sx={{ mt: 2, backgroundColor: '#ff7e7e', '&:hover': { backgroundColor: '#ff6b6b' } }}>
                Contact us
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <img src="/img9.jpeg" alt="Isometric community illustration" style={{ width: isMobile ? '100%' : '50%' }} />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Home;