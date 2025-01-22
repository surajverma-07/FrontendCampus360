import React, { useState } from "react";
import { Typography, Button, TextField, Box, Grid } from "@mui/material";
import axios from "axios";

const AddEvent = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
    organizer: "",
  });
  const [poster, setPoster] = useState(null);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePosterChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setPoster(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("title", formData.title);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("date", formData.date);
    formDataToSend.append("location", formData.location);
    formDataToSend.append("organizer", formData.organizer);
    if (poster) {
      formDataToSend.append("poster", poster);
    }

    try {
      const response = await axios.post("http://localhost:3000/api/v1/campus-connect/event/add", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      // Handle response
    } catch (error) {
      // Handle error
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            name="title"
            label="Event Title"
            fullWidth
            value={formData.title}
            onChange={handleInputChange}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="description"
            label="Description"
            fullWidth
            value={formData.description}
            onChange={handleInputChange}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="date"
            label="Date"
            fullWidth
            value={formData.date}
            onChange={handleInputChange}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="location"
            label="Location"
            fullWidth
            value={formData.location}
            onChange={handleInputChange}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="organizer"
            label="Organizer"
            fullWidth
            value={formData.organizer}
            onChange={handleInputChange}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <input
            accept="image/*"
            style={{ display: 'none' }}
            id="raised-button-file"
            type="file"
            onChange={handlePosterChange}
          />
          <label htmlFor="raised-button-file">
            <Button variant="contained" component="span">
              Upload Event Poster
            </Button>
          </label>
          {poster && <Typography variant="body2">{poster.name}</Typography>}
        </Grid>
      </Grid>
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        Add Event
      </Button>
    </Box>
  );
};

export default AddEvent;
