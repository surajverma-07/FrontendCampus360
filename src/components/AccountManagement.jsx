import React, { useState } from "react"
import { Typography, Button, TextField, Box, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material"
import axios from "axios"

const AccountManagement = () => {
  const [openPasswordDialog, setOpenPasswordDialog] = useState(false)
  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
  })

  const handleInputChange = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value })
  }

  const handleChangePassword = async () => {
    try {
      await axios.post("http://localhost:3000/api/v1/campus-connect/user/change-password", passwordData, {
        withCredentials: true,
      })
      setOpenPasswordDialog(false)
      setPasswordData({ oldPassword: "", newPassword: "" })
      alert("Password changed successfully")
    } catch (error) {
      console.error("Error changing password:", error)
      alert("Failed to change password")
    }
  }

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Account Management
      </Typography>
      <Button onClick={() => setOpenPasswordDialog(true)} variant="contained">
        Change Password
      </Button>

      <Dialog open={openPasswordDialog} onClose={() => setOpenPasswordDialog(false)}>
        <DialogTitle>Change Password</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="oldPassword"
            label="Current Password"
            type="password"
            fullWidth
            value={passwordData.oldPassword}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="newPassword"
            label="New Password"
            type="password"
            fullWidth
            value={passwordData.newPassword}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenPasswordDialog(false)}>Cancel</Button>
          <Button onClick={handleChangePassword}>Change Password</Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default AccountManagement

