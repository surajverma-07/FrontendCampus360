import React from "react";
import { Link } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

const NotFoundPage = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        textAlign: "center",
        backgroundColor: "#f9f9f9",
        padding: 4,
      }}
    >
      <ErrorOutlineIcon sx={{ fontSize: 80, color: "#ff6f61" }} />
      <Typography variant="h4" component="h1" sx={{ marginTop: 2, color: "#333" }}>
        Oops! Page Not Found
      </Typography>
      <Typography variant="body1" sx={{ marginTop: 1, color: "#555" }}>
        The page you're looking for doesn't exist or has been moved.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        component={Link}
        to="/"
        sx={{ marginTop: 3, textTransform: "none" }}
      >
        Back to Home
      </Button>
    </Box>
  );
};

export default NotFoundPage;
