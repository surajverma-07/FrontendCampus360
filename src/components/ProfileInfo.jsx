import React, { useState } from "react"
import { Typography, Button, TextField, Box } from "@mui/material"
import axios from "axios"

const ProfileInfo = ({ userData }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [name, setName] = useState(userData.name)
  const [email, setEmail] = useState(userData.email)

  const handleUpdate = async () => {
    try {
      await axios.patch(
        "http://localhost:3000/api/v1/campus-connect/user/update-account",
        {
          name,
          email,
        },
        { withCredentials: true },
      )
      setIsEditing(false)
    } catch (error) {
      console.error("Error updating profile:", error)
    }
  }

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Profile Information
      </Typography>
      {isEditing ? (
        <>
          <TextField fullWidth label="Name" value={name} onChange={(e) => setName(e.target.value)} margin="normal" />
          <TextField fullWidth label="Email" value={email} onChange={(e) => setEmail(e.target.value)} margin="normal" />
          <Button onClick={handleUpdate}>Save</Button>
          <Button onClick={() => setIsEditing(false)}>Cancel</Button>
        </>
      ) : (
        <>
          <Typography>Name: {userData.name}</Typography>
          <Typography>Email: {userData.email}</Typography>
          <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
        </>
      )}
    </Box>
  )
}

export default ProfileInfo

