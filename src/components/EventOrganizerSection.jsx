import React, { useState } from "react"
import { Typography, Button, Box } from "@mui/material"
import axios from "axios"

const EventOrganizerSection = ({ userData }) => {
  const [isApplied, setIsApplied] = useState(userData.isAppliedForEventOrganizer)

  const handleApply = async () => {
    try {
      await axios.post(
        "http://localhost:3000/api/v1/campus-connect/user/eventorganizer/apply",
        {},
        { withCredentials: true },
      )
      setIsApplied(true)
      alert("Application submitted successfully")
    } catch (error) {
      console.error("Error applying for event organizer:", error)
      alert("Failed to submit application")
    }
  }

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Event Organizer Status
      </Typography>
      {isApplied ? (
        <Typography>You have applied to be an event organizer. Your application is under review.</Typography>
      ) : (
        <>
          <Typography gutterBottom>Become an event organizer to create and manage events for your college.</Typography>
          <Button onClick={handleApply} variant="contained">
            Apply for Event Organizer
          </Button>
        </>
      )}
    </Box>
  )
}

export default EventOrganizerSection

