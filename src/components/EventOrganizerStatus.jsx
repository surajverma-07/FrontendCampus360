import React, { useState } from "react"
import { Typography, Button, Box } from "@mui/material"
import axios from "axios"

const EventOrganizerStatus = ({ userData }) => {
  const [status, setStatus] = useState(userData.eventOrganizerStatus || "Not Applied")

  const handleApply = async () => {
    try {
      await axios.post(
        "http://localhost:3000/api/v1/campus-connect/user/eventorganizer/apply",
        {},
        { withCredentials: true },
      )
      setStatus("Pending")
    } catch (error) {
      console.error("Error applying for event organizer:", error)
    }
  }

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Event Organizer Status
      </Typography>
      <Typography>Status: {status}</Typography>
      {status === "Not Applied" && <Button onClick={handleApply}>Apply for Event Organizer</Button>}
    </Box>
  )
}

export default EventOrganizerStatus

