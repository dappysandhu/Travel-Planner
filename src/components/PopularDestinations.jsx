import React from "react";
import { Grid, Paper, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { popularDestinations } from "../data/popularDestinations";

const PopularDestinations = () => {
  const navigate = useNavigate();

  const handleDestinationClick = (trip) => {
    navigate(`/add-trip`, {
      state: {
        destination: {
          title: trip.title,
          startDate: trip.startDate,
          endDate: trip.endDate,
          destinations: trip.destinations,
        },
      },
    });
  };

  return (
    <div>
      <Typography variant="h6" color="text.secondary" sx={{ mb: 3 }}>
        Some Popular Destinations for you
      </Typography>
      <Grid container spacing={4}>
        {popularDestinations.map((trip, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Paper elevation={3} sx={{ p: 3 }}>
              <img
                src={trip.image}
                alt={trip.title}
                style={{
                  width: "100%",
                  height: "200px",
                  objectFit: "cover",
                  borderRadius: "8px",
                  marginBottom: "16px",
                }}
              />
              <Typography variant="h6" gutterBottom>
                {trip.title}
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                {trip.destinations[0].name}, {trip.destinations[0].country}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {trip.destinations[0].activities.join(", ")}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                sx={{ mt: 2, height: "28px", width: "120px" }}
                onClick={() => handleDestinationClick(trip)}
              >
                Add Trip
              </Button>
            </Paper>{" "}
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default PopularDestinations;
