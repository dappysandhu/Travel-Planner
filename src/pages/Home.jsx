import React from "react";
import { Container, Typography, Box, Button, Grid, Paper } from "@mui/material";
import { Link } from "react-router-dom";
import Image1 from "../assets/travel1.jpg"; // Paris
import Image2 from "../assets/travel2.jpg"; // Yosemite National Park
import Image3 from "../assets/travel3.jpg"; // Tokyo

function Home() {
  return (
    <Container sx={{ textAlign: "center", mt: 10 }}>
      {/* Hero Section */}
      <Box
        sx={{
          mb: 6,
          backgroundImage: `url(${Image1})`,
          backgroundSize: "cover",
          p: 4,
        }}
      >
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          sx={{ color: "white" }}
        >
          WanderWeave
        </Typography>
        <Typography
          variant="h5"
          component="h2"
          gutterBottom
          sx={{ color: "white" }}
        >
          Your Journey Starts Here
        </Typography>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/login"
        >
          Get Started
        </Button>
      </Box>

      {/* Popular Destinations Section */}
      <Typography variant="h4" gutterBottom>
        Popular Destinations
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <img
              src={Image1}
              alt="Paris"
              style={{ width: "100%", borderRadius: "8px" }}
            />
            <Typography variant="h6" gutterBottom>
              Paris
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Experience the romance of the City of Lights with its iconic
              landmarks and rich culture.
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <img
              src={Image2}
              alt="Yosemite National Park"
              style={{ width: "100%", borderRadius: "8px" }}
            />
            <Typography variant="h6" gutterBottom>
              Yosemite National Park
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Discover breathtaking landscapes, towering cliffs, and stunning
              waterfalls in this natural wonder.
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <img
              src={Image3}
              alt="Tokyo"
              style={{ width: "100%", borderRadius: "8px" }}
            />
            <Typography variant="h6" gutterBottom>
              Tokyo
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {` Immerse yourself in the vibrant culture, technology, and cuisine
              of Japan's bustling capital.`}
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Testimonials Section */}
      <Box mt={6}>
        <Typography variant="h4" gutterBottom>
          What Our Users Say
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {`          "This app made planning my trip so easy and fun!" - Happy Traveler
`}{" "}
        </Typography>
      </Box>

      {/* Footer Section */}
      <Box sx={{ mt: 6, p: 3, backgroundColor: "#f8f8f8" }}>
        <Typography variant="body2" color="text.secondary">
          © {new Date().getFullYear()} WanderWeave. All rights reserved.
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Follow us on:
          <Link href="#" sx={{ ml: 1 }}>
            Facebook
          </Link>{" "}
          |
          <Link href="#" sx={{ ml: 1 }}>
            Twitter
          </Link>{" "}
          |
          <Link href="#" sx={{ ml: 1 }}>
            Instagram
          </Link>
        </Typography>
      </Box>
    </Container>
  );
}

export default Home;
