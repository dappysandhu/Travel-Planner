import React, { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Grid,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

const AddEditDestination = () => {
  const { tripId, destinationId } = useParams();
  const navigate = useNavigate();

  const [destinationData, setDestinationData] = useState({
    name: "",
    country: "",
    startDate: "",
    endDate: "",
    activities: "",
    accommodation: {
      name: "",
      address: "",
      checkIn: "",
      checkOut: "",
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("accommodation.")) {
      const field = name.split(".")[1];
      setDestinationData({
        ...destinationData,
        accommodation: {
          ...destinationData.accommodation,
          [field]: value,
        },
      });
    } else {
      setDestinationData({ ...destinationData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Convert activities string to array
    const formattedData = {
      ...destinationData,
      activities: destinationData.activities
        .split(",")
        .map((item) => item.trim()),
    };
    console.log("Destination Data:", formattedData);
    navigate(`/view-trip/${tripId}`);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        {destinationId ? "Edit Destination" : "Add Destination"}
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Destination Name"
              name="name"
              fullWidth
              value={destinationData.name}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Country"
              name="country"
              fullWidth
              value={destinationData.country}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Start Date"
              name="startDate"
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={destinationData.startDate}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="End Date"
              name="endDate"
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={destinationData.endDate}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Activities (comma-separated)"
              name="activities"
              fullWidth
              multiline
              rows={2}
              value={destinationData.activities}
              onChange={handleChange}
              helperText="Enter activities separated by commas"
              required
            />
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6" sx={{ mt: 2, mb: 2 }}>
              Accommodation Details
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Hotel Name"
              name="accommodation.name"
              fullWidth
              value={destinationData.accommodation.name}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Address"
              name="accommodation.address"
              fullWidth
              value={destinationData.accommodation.address}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Check-in Date"
              name="accommodation.checkIn"
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={destinationData.accommodation.checkIn}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Check-out Date"
              name="accommodation.checkOut"
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={destinationData.accommodation.checkOut}
              onChange={handleChange}
              required
            />
          </Grid>
        </Grid>

        <Box
          sx={{ mt: 3, display: "flex", gap: 2, justifyContent: "flex-end" }}
        >
          <Button
            variant="outlined"
            onClick={() => navigate(`/view-trip/${tripId}`)}
          >
            Cancel
          </Button>
          <Button type="submit" variant="contained" color="primary">
            Save Destination
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default AddEditDestination;
