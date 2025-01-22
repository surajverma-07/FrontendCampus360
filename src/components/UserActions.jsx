import React, { useState } from "react"
import { Typography, Button, TextField, Box, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material"
import axios from "axios"

const UserActions = () => {
  const [openReportDialog, setOpenReportDialog] = useState(false)
  const [reportData, setReportData] = useState({
    reportedUserId: "",
    reason: "",
  })

  const handleInputChange = (e) => {
    setReportData({ ...reportData, [e.target.name]: e.target.value })
  }

  const handleReportUser = async () => {
    try {
      await axios.post(
        `http://localhost:3000/api/v1/campus-connect/user/report/${reportData.reportedUserId}`,
        { reason: reportData.reason },
        { withCredentials: true },
      )
      setOpenReportDialog(false)
      setReportData({ reportedUserId: "", reason: "" })
      alert("User reported successfully")
    } catch (error) {
      console.error("Error reporting user:", error)
      alert("Failed to report user")
    }
  }

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        User Actions
      </Typography>
      <Button onClick={() => setOpenReportDialog(true)} variant="contained">
        Report User
      </Button>

      <Dialog open={openReportDialog} onClose={() => setOpenReportDialog(false)}>
        <DialogTitle>Report User</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="reportedUserId"
            label="User ID to Report"
            fullWidth
            value={reportData.reportedUserId}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="reason"
            label="Reason for Reporting"
            fullWidth
            multiline
            rows={4}
            value={reportData.reason}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenReportDialog(false)}>Cancel</Button>
          <Button onClick={handleReportUser}>Report User</Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default UserActions

