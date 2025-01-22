import React, { useState } from "react"
import { Typography, Button, TextField, Box, Avatar, Grid } from "@mui/material"
import axios from "axios"

const ProfileSection = ({ userData }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: userData.name,
    email: userData.email,
    course: userData.course,
    branch_section: userData.branch_section,
    year: userData.year,
    bio: userData.bio || "",
    interests: userData.interests || "",
  })

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleUpdate = async () => {
    try {
      const response = await axios.patch("http://localhost:3000/api/v1/campus-connect/user/update-account", formData, {
        withCredentials: true,
      })
      setIsEditing(false)
      // You might want to update the userData state in the parent component here
    } catch (error) {
      console.error("Error updating profile:", error)
    }
  }

  const handleImageUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    const formData = new FormData()
    formData.append("profileImage", file)

    try {
      const response = await axios.patch(
        "http://localhost:3000/api/v1/campus-connect/user/update/profileImage",
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        },
      )
      // You might want to update the userData state in the parent component here
    } catch (error) {
      console.error("Error uploading image:", error)
    }
  }

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Profile Information
      </Typography>
      <Grid container spacing={2} alignItems="center">
        <Grid item>
          <Avatar alt={userData.name} src={userData.profileImage} sx={{ width: 100, height: 100 }} />
        </Grid>
        <Grid item>
          <input
            accept="image/*"
            style={{ display: "none" }}
            id="raised-button-file"
            type="file"
            onChange={handleImageUpload}
          />
          <label htmlFor="raised-button-file">
            <Button variant="contained" component="span">
              Upload New Image
            </Button>
          </label>
        </Grid>
      </Grid>
      {isEditing ? (
        <Box component="form" noValidate autoComplete="off" sx={{ mt: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Name" name="name" value={formData.name} onChange={handleInputChange} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Email" name="email" value={formData.email} onChange={handleInputChange} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Course" name="course" value={formData.course} onChange={handleInputChange} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Branch/Section"
                name="branch_section"
                value={formData.branch_section}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Year" name="year" value={formData.year} onChange={handleInputChange} />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Bio"
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
                multiline
                rows={3}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Interests"
                name="interests"
                value={formData.interests}
                onChange={handleInputChange}
                multiline
                rows={2}
              />
            </Grid>
          </Grid>
          <Box sx={{ mt: 2 }}>
            <Button onClick={handleUpdate} variant="contained" sx={{ mr: 1 }}>
              Save
            </Button>
            <Button onClick={() => setIsEditing(false)} variant="outlined">
              Cancel
            </Button>
          </Box>
        </Box>
      ) : (
        <Box sx={{ mt: 2 }}>
          <Typography>
            <strong>Name:</strong> {userData.name}
          </Typography>
          <Typography>
            <strong>Email:</strong> {userData.email}
          </Typography>
          <Typography>
            <strong>Course:</strong> {userData.course}
          </Typography>
          <Typography>
            <strong>Branch/Section:</strong> {userData.branch_section}
          </Typography>
          <Typography>
            <strong>Year:</strong> {userData.year}
          </Typography>
          <Typography>
            <strong>Bio:</strong> {userData.bio || "Not provided"}
          </Typography>
          <Typography>
            <strong>Interests:</strong> {userData.interests || "Not provided"}
          </Typography>
          <Button onClick={() => setIsEditing(true)} variant="contained" sx={{ mt: 2 }}>
            Edit Profile
          </Button>
        </Box>
      )}
    </Box>
  )
}

export default ProfileSection

