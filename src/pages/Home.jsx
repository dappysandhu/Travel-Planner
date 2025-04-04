import React from "react";
import { Container, Typography, Box, Button } from "@mui/material";
import { Link } from "react-router-dom";

function Home() {
  return (
    <Container sx={{ textAlign: "center", mt: 10 }}>
      {/* App Name */}
      <Typography variant="h3" component="h1" gutterBottom>
        Travel Itinerary Planner
      </Typography>

      {/* App Description */}
      <Typography
        variant="h6"
        component="p"
        color="text.secondary"
        gutterBottom
      >
        Plan and organize your trips with ease.
      </Typography>

      {/* Navigation Buttons */}
      <Box mt={4}>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/login"
          sx={{ mr: 2 }}
        >
          Login
        </Button>
        <Button variant="outlined" component={Link} to="/register">
          Sign Up
        </Button>
      </Box>
    </Container>
  );
}

export default Home;
