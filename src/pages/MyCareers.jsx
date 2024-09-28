import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { Box, Container, Grid, Typography, Button, TextField, Card, CardContent, CardMedia, CardActions, IconButton, Avatar, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';

function MyCareers() {
  const [careers, setCareers] = useState([]);
  const [selectedCareer, setSelectedCareer] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetchCareers();
  }, []);

  const fetchCareers = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/v1/campus-connect/career/my', { withCredentials: true });
      setCareers(response.data.data.opportunities);
      console.log('Response :: ', response.data.data.opportunities);
    } catch (error) {
      toast.error('Failed to fetch careers!');
    }
  };

  const handleUpdate = async (id) => {
    try {
      const response = await axios.patch(`http://localhost:3000/api/v1/campus-connect/career/update/${id}`, selectedCareer, { withCredentials: true });
      toast.success('Career updated successfully!');
      fetchCareers();
      setOpen(false);
    } catch (error) {
      toast.error('Failed to update career!');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/v1/campus-connect/career/delete/${id}`, { withCredentials: true });
      toast.success('Career deleted successfully!');
      fetchCareers();
    } catch (error) {
      toast.error('Failed to delete career!');
    }
  };

  const handleClickOpen = (career) => {
    setSelectedCareer(career);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 10, p: 4, backgroundColor: '#f7f7f7', borderRadius: 2, boxShadow: 2 }}>
      <Typography variant="h4" sx={{ mb: 2, color: '#333' }}>
        My Careers
      </Typography>
      <Grid container spacing={2} sx={{ justifyContent: 'center' }}>
        {careers ? careers.map((career) => (
          <Grid item xs={12} md={6} lg={4} xl={3} key={career._id}>
            <Card sx={{ height: '100%', backgroundColor: '#fff', boxShadow: 1 }}>
              <CardContent>
                <Grid container spacing={2} sx={{ alignItems: 'center' }}>
                  <Grid item>
                    <Typography variant="h4" sx={{ textAlign: 'center', color: '#333' }}>
                      {career.title}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="body2" color="#666">
                      {career.description}
                    </Typography>
                    <Typography variant="body2" color="#666">
                      Category: {career.category}
                    </Typography>
                    <Typography variant="body2" color="#666">
                      Location: {career.location}
                    </Typography>
                    <Typography variant="body2" color="#666">
                      Company: {career.company}
                    </Typography>
                    <Typography variant="body2" color="#666">
                      Due Date: {new Date(career.dueDate).toLocaleString()}
                    </Typography>
                    {/* {career.applyLink && (
                      <a href={career.applyLink} target="_blank" rel="noopener noreferrer">
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
                    <Button variant="contained" color="primary" size="small" onClick={() => handleClickOpen(career)}>
                      Edit
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button variant="contained" color="error" size="small" onClick={() => handleDelete(career._id)}>
                      Delete
                    </Button>
                  </Grid>
                </Grid>
              </CardActions>
            </Card>
          </Grid>
        )) : (
          <Typography variant="h6" sx={{ mt: 2, color: '#333' }}>
            No Opportunities Available
          </Typography>
        )}
      </Grid>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog -description"
      >
        <DialogTitle id="alert-dialog-title" sx={{ color: '#333' }}>
          Update Career
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog -description">
            <TextField
              type="text"
              value={selectedCareer ? selectedCareer.title : ""}
              onChange={(e) => setSelectedCareer({ ...selectedCareer, title: e.target.value })}
              placeholder="Title"
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              type="text"
              value={selectedCareer ? selectedCareer.description : ""}
              onChange={(e) => setSelectedCareer({ ...selectedCareer, description: e.target.value })}
              placeholder="Description"
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              type="text"
              value={selectedCareer ? selectedCareer.category : ""}
              onChange={(e) => setSelectedCareer({ ...selectedCareer, category: e.target.value })}
              placeholder="Category"
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              type="text"
              value={selectedCareer ? selectedCareer.location : ""}
              onChange={(e) => setSelectedCareer({ ...selectedCareer, location: e.target.value })}
              placeholder="Location"
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              type="text"
              value={selectedCareer ? selectedCareer.company : ""}
              onChange={(e) => setSelectedCareer({ ...selectedCareer, company: e.target.value })}
              placeholder="Company"
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              type="date"
              value={selectedCareer ? selectedCareer.dueDate : ""}
              onChange={(e) => setSelectedCareer({ ...selectedCareer, dueDate: e.target.value })}
              placeholder="Due Date"
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              type="text"
              value={selectedCareer ? selectedCareer.applyLink : ""}
              onChange={(e) => setSelectedCareer({ ...selectedCareer, applyLink: e.target.value })}
              placeholder="Apply Link"
              fullWidth
              sx={{ mb: 2 }}
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={() => handleUpdate(selectedCareer._id)} color="primary" autoFocus>
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default MyCareers;