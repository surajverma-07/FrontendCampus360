import React, { useState } from "react"
import { Typography, Button, TextField, Box, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material"
import axios from "axios"

const UserActions = () => {
  const [openPasswordDialog, setOpenPasswordDialog] = useState(false)
  const [openReportDialog, setOpenReportDialog] = useState(false)
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [reportedUserId, setReportedUserId] = useState("")
  const [reportReason, setReportReason] = useState("")

  const handleChangePassword = async () => {
    try {
      await axios.post(
        "http://localhost:3000/api/v1/campus-connect/user/change-password",
        {
          currentPassword,
          newPassword,
        },
        { withCredentials: true },
      )
      setOpenPasswordDialog(false)
      setCurrentPassword("")
      setNewPassword("")
      alert("Password changed successfully")
    } catch (error) {
      console.error("Error changing password:", error)
      alert("Failed to change password")
    }
  }

  const handleReportUser = async () => {
    try {
      await axios.post(
        `http://localhost:3000/api/v1/campus-connect/user/report/${reportedUserId}`,
        {
          reason: reportReason,
        },
        { withCredentials: true },
      )
      setOpenReportDialog(false)
      setReportedUserId("")
      setReportReason("")
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
      <Button onClick={() => setOpenPasswordDialog(true)}>Change Password</Button>
      <Button onClick={() => setOpenReportDialog(true)}>Report User</Button>

      <Dialog open={openPasswordDialog} onClose={() => setOpenPasswordDialog(false)}>
        <DialogTitle>Change Password</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Current Password"
            type="password"
            fullWidth
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
          <TextField
            margin="dense"
            label="New Password"
            type="password"
            fullWidth
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenPasswordDialog(false)}>Cancel</Button>
          <Button onClick={handleChangePassword}>Change Password</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openReportDialog} onClose={() => setOpenReportDialog(false)}>
        <DialogTitle>Report User</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="User ID to Report"
            fullWidth
            value={reportedUserId}
            onChange={(e) => setReportedUserId(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Reason for Reporting"
            fullWidth
            multiline
            rows={4}
            value={reportReason}
            onChange={(e) => setReportReason(e.target.value)}
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

