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
    applyLink: "",
  });
  const [poster, setPoster] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Handle input changes
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle poster file input
  const handlePosterChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setPoster(e.target.files[0]);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset messages
    setError(null);
    setSuccess(null);

    const formDataToSend = new FormData();
    formDataToSend.append("title", formData.title);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("date", formData.date);
    formDataToSend.append("location", formData.location);
    formDataToSend.append("organizer", formData.organizer);
    formDataToSend.append("applyLink", formData.applyLink);

    if (poster) {
      formDataToSend.append("poster", poster);
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/campus-connect/event/add",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      setSuccess("Event added successfully!");
    } catch (error) {
      setError(
        error.response?.data?.message || "Something went wrong. Please try again."
      );
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
      <Typography variant="h5" gutterBottom>
        Add a New Event
      </Typography>
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
            multiline
            rows={4}
            value={formData.description}
            onChange={handleInputChange}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="date"
            label="Date (YYYY-MM-DD)"
            fullWidth
            type="date"
            InputLabelProps={{ shrink: true }}
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
          <TextField
            name="applyLink"
            label="Apply Link"
            fullWidth
            value={formData.applyLink}
            onChange={handleInputChange}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <input
            accept="image/*"
            style={{ display: "none" }}
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
      {error && (
        <Typography variant="body2" color="error" sx={{ mt: 2 }}>
          {error}
        </Typography>
      )}
      {success && (
        <Typography variant="body2" color="success.main" sx={{ mt: 2 }}>
          {success}
        </Typography>
      )}
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        Add Event
      </Button>
    </Box>
  );
};

export default AddEvent;
