import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { Box, Container, Grid, Typography, Button, TextField, Card, CardContent, CardMedia, CardActions, IconButton, Avatar, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import { Link } from 'react-router-dom';

function AllEvent() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/v1/campus-connect/event/all',{withCredentials:true});
      setEvents(response.data.data.events);
    } catch (error) {
      toast.error('Failed to fetch events!');
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 10, p: 4, backgroundColor: 'white', borderRadius: 2, boxShadow: 2 }}>
      <Typography variant="h4" sx={{ mb: 2 }}>
        All Events
      </Typography>
      <Grid container spacing={2} sx={{ justifyContent: 'center' }}>
        {events.map((event) => (
          <Grid item xs={12} md={6} lg={4} xl={3} key={event._id}>
            <Card sx={{ height: '100%' }}>
              <CardContent sx={{ height: '80%' }}>
                <Grid container spacing={2} sx={{ alignItems: 'center', height: '100%' }}>
                  <Grid item xs={12}>
                    {event.poster ? (
                      <CardMedia
                        component="img"
                        height="140"
                        width="100%"
                        image={event.poster}
                        alt={event.title}
                        sx={{ objectFit: 'cover' }}
                      />
                    ) : (
                      <Typography variant="h4" sx={{ textAlign: 'center' }}>
                        Event
                      </Typography>
                    )}
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="body2" color="text.secondary">
                      {event.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {event.description}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Location: {event.location}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Organizer: {event.organizer}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Date: {new Date(event.date).toLocaleString()}
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
              <CardActions sx={{ justifyContent: 'center' }}>
                {event.applyLink && (
                  <a href={event.applyLink} target="_blank" rel="noopener noreferrer">
                    <Button variant="contained" color="primary">
                      Apply Now
                    </Button>
                  </a>
                )}
                {/* <Button variant="contained" color="primary">
                  <Link to={`/event/${event._id}`}>View Details</Link>
                </Button> */}
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default AllEvent;