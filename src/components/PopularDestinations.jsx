import React from "react";
import { Grid, Paper, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { popularDestinations } from "../data/popularDestinations";

const PopularDestinations = () => {
  const navigate = useNavigate();

  const handleDestinationClick = (destination) => {
    navigate(`/add-trip`, { state: { destination } });
  };

  return (
    <div>
      <Typography variant="h6" color="text.secondary" sx={{ mb: 3 }}>
        Some Popular Destinations for you
      </Typography>
      <Grid container spacing={4}>
        {popularDestinations.map((destination) => (
          <Grid item xs={12} md={4} key={destination.id}>
            <Paper elevation={3} sx={{ p: 3 }}>
              <img
                src={destination.image}
                alt={destination.name}
                style={{ width: "100%", borderRadius: "8px" }}
              />
              <Typography variant="h6" gutterBottom>
                {destination.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {destination.activities.join(", ")}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                sx={{ mt: 2, height: "28px", width: "120px" }}
                onClick={() => handleDestinationClick(destination)}
              >
                Add Trip
              </Button>
            </Paper>
          </Grid>
        ))}
      </Grid>{" "}
    </div>
  );
};

export default PopularDestinations;
