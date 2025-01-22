import React, { useState, useEffect } from "react"
import { Container, Grid, Paper, Typography, Box, CircularProgress } from "@mui/material"
import { useTheme } from "@mui/material/styles"
import ProfileSection from "../components/ProfileSection.jsx"
import AccountManagement from "../components/AccountManagement.jsx";
import EventOrganizerSection from "../components/EventOrganizerSection.jsx"
import UserActions from "../components/UserActions.jsx"
import axios from "axios"

const Dashboard = () => {
  const [userData, setUserData] = useState(null)
  const [loading, setLoading] = useState(true)
  const theme = useTheme()

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/v1/campus-connect/user/current-user", {
          withCredentials: true,
        })
        setUserData(response.data.data.user)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching user data:", error)
        setLoading(false)
      }
    }

    fetchUserData()
  }, [])

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    )
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              height: 240,
              backgroundColor: theme.palette.primary.main,
              color: theme.palette.primary.contrastText,
            }}
          >
            <Typography component="h1" variant="h4" color="inherit" noWrap sx={{ flex: 1 }}>
              Welcome, {userData?.name}!
            </Typography>
            <Typography variant="h6" color="inherit">
              Dashboard
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={8} lg={9}>
          <Paper sx={{ p: 2, display: "flex", flexDirection: "column", height: "100%" }}>
            <ProfileSection userData={userData} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={4} lg={3}>
          <Paper sx={{ p: 2, display: "flex", flexDirection: "column", height: "100%" }}>
            <EventOrganizerSection userData={userData} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, display: "flex", flexDirection: "column", height: "100%" }}>
            <AccountManagement userData={userData} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, display: "flex", flexDirection: "column", height: "100%" }}>
            <UserActions />
          </Paper>
        </Grid>
      </Grid>
      <Box pt={4}>
        <Typography variant="body2" color="text.secondary" align="center">
          {"Copyright © "}
          Campus360 {new Date().getFullYear()}
          {"."}
        </Typography>
      </Box>
    </Container>
  )
}

export default Dashboard

