import React, { useState } from "react"
import { Typography, Button, TextField, Box, Grid } from "@mui/material"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"
const AddCareer = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    location: "",
    company: "",
    dueDate: "",
    applyLink: "",
  })
const navigate = useNavigate();
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await axios.post("http://localhost:3000/api/v1/campus-connect/career/add", formData, {
        withCredentials: true,
      })
      navigate('/career/my-careers');
      toast.success("Opportunity Listed Successfully")
      // Handle response
    } catch (error) {
      // Handle error
      toast.error(`Opportunity Listing Error ${error}`)
    }
  }

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
      <Typography variant="h6" gutterBottom>
        Add New Career Opportunity
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            name="title"
            label="Opportunity Title"
            value={formData.title}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            name="description"
            label="Description"
            multiline
            rows={3}
            value={formData.description}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            name="category"
            label="Category"
            value={formData.category}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            name="location"
            label="Location"
            value={formData.location}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            name="company"
            label="Company"
            value={formData.company}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            name="dueDate"
            label="Due Date"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={formData.dueDate}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            name="applyLink"
            label="Apply Link"
            value={formData.applyLink}
            onChange={handleInputChange}
          />
        </Grid>
      </Grid>
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        Add Career Opportunity
      </Button>
    </Box>
  )
}

export default AddCareer
