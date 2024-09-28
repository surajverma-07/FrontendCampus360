import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { Box, Container, Grid, Typography, Button, TextField, Card, CardContent, CardMedia, CardActions, IconButton, Avatar, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';

function MyEvent() {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/v1/campus-connect/event/my', { withCredentials: true });
      setEvents(response.data.data.events);
    } catch (error) {
      toast.error('Failed to fetch events!');
    }
  };

  const handleUpdate = async (id) => {
    try {
      const response = await axios.patch(`http://localhost:3000/api/v1/campus-connect/event/update/${id}`, selectedEvent, { withCredentials: true });
      toast.success('Event updated successfully!');
      fetchEvents();
      setOpen(false);
    } catch (error) {
      toast.error('Failed to update event!');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/v1/campus-connect/event/delete/${id}`, { withCredentials: true });
      toast.success('Event deleted successfully!');
      fetchEvents();
    } catch (error) {
      toast.error('Failed to delete event!');
    }
  };

  const handleClickOpen = (event) => {
    setSelectedEvent(event);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 10, p: 4, backgroundColor: 'white', borderRadius: 2, boxShadow: 2 }}>
      <Typography variant="h4" sx={{ mb: 2 }}>
        My Events
      </Typography>
      <Grid container spacing={2} sx={{ justifyContent: 'center' }}>
        {events.map((event) => (
          <Grid item xs={12} md={6} lg={4} xl={3} key={event._id}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Grid container spacing={2} sx={{ alignItems: 'center' }}>
                  <Grid item>
                    {event.poster ? (
                      <CardMedia
                        component="img"
                        height="140"
                        width="140"
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
                  <Grid item>
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
                    {/* {event.applyLink && (
                      <a href={event.applyLink} target="_blank" rel="noopener noreferrer">
                        <Button variant="contained" color="primary">
                          Apply Now
                        </Button>
                      </a>
                    )} */}
                  </Grid>
                </Grid>
              </CardContent>
              <CardActions sx={{ justifyContent: 'space-between' }}>
                <Grid container spacing={2}>
                  <Grid item>
                    <Button variant="contained" color="primary" size="small" onClick={() => handleClickOpen(event)}>
                      Edit
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button variant="contained" color="error" size="small" onClick={() => handleDelete(event._id)}>
                      Delete
                    </Button>
                  </Grid>
                </Grid>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Update Event
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <TextField
              type="text"
              value={selectedEvent ? selectedEvent.title : ""}
 onChange={(e) => setSelectedEvent({ ...selectedEvent, title: e.target.value })}
              placeholder="Title"
              fullWidth
            />
            <TextField type="text"
              value={selectedEvent ? selectedEvent.description : ""}
              onChange={(e) => setSelectedEvent({ ...selectedEvent, description: e.target.value })}
              placeholder="Description"
              fullWidth
            />
            <TextField
              type="text"
              value={selectedEvent ? selectedEvent.category : ""}
              onChange={(e) => setSelectedEvent({ ...selectedEvent, category: e.target.value })}
              placeholder="Category"
              fullWidth
            />
            <TextField
              type="text"
              value={selectedEvent ? selectedEvent.location : ""}
              onChange={(e) => setSelectedEvent({ ...selectedEvent, location: e.target.value })}
              placeholder="Location"
              fullWidth
            />
            <TextField
              type="text"
              value={selectedEvent ? selectedEvent.company : ""}
              onChange={(e) => setSelectedEvent({ ...selectedEvent, company: e.target.value })}
              placeholder="Company"
              fullWidth
            />
            <TextField
              type="date"
              value={selectedEvent ? selectedEvent.dueDate : ""}
              onChange={(e) => setSelectedEvent({ ...selectedEvent, dueDate: e.target.value })}
              placeholder="Due Date"
              fullWidth
            />
            <TextField
              type="text"
              value={selectedEvent ? selectedEvent.applyLink : ""}
              onChange={(e) => setSelectedEvent({ ...selectedEvent, applyLink: e.target.value })}
              placeholder="Apply Link"
              fullWidth
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={() => handleUpdate(selectedEvent._id)} color="primary" autoFocus>
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default MyEvent;