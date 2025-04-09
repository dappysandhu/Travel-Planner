import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Grid,
  Card,
  CardContent,
  IconButton,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { dummyTrips } from "../data/tripsData";

const AddEditTrip = () => {
  const { tripId } = useParams();
  const navigate = useNavigate();
  const [tripData, setTripData] = useState({
    title: "",
    startDate: "",
    endDate: "",
    destinations: [
      {
        id: `d${Date.now()}`,
        name: "",
        country: "",
        startDate: "",
        endDate: "",
        activities: [],
        accommodation: {
          name: "",
          address: "",
          checkIn: "",
          checkOut: "",
        },
      },
    ],
  });

  useEffect(() => {
    if (tripId) {
      const existingTrip = dummyTrips.find((trip) => trip.id === tripId);
      if (existingTrip) {
        setTripData(existingTrip);
      }
    }
  }, [tripId]);

  const handleChange = (e) => {
    setTripData({ ...tripData, [e.target.name]: e.target.value });
  };

  const handleDestinationChange = (index, field, value) => {
    const updatedDestinations = [...tripData.destinations];
    if (field.includes(".")) {
      const [parent, child] = field.split(".");
      updatedDestinations[index][parent][child] = value;
    } else {
      updatedDestinations[index][field] = value;
    }
    setTripData({ ...tripData, destinations: updatedDestinations });
  };

  const handleAddDestination = () => {
    setTripData({
      ...tripData,
      destinations: [
        ...tripData.destinations,
        {
          id: `d${Date.now()}`,
          name: "",
          country: "",
          startDate: "",
          endDate: "",
          activities: [],
          accommodation: {
            name: "",
            address: "",
            checkIn: "",
            checkOut: "",
          },
        },
      ],
    });
  };

  const handleRemoveDestination = (index) => {
    const updatedDestinations = tripData.destinations.filter(
      (_, i) => i !== index
    );
    setTripData({ ...tripData, destinations: updatedDestinations });
  };

  const handleActivitiesChange = (index, value) => {
    const activities = value.split(",").map((activity) => activity.trim());
    handleDestinationChange(index, "activities", activities);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Trip Data:", tripData);
    navigate("/dashboard");
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        {tripId ? "Edit Trip" : "Add Trip"}
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <TextField
          label="Trip Title"
          name="title"
          fullWidth
          margin="normal"
          value={tripData.title}
          onChange={handleChange}
          required
        />
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Start Date"
              name="startDate"
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={tripData.startDate}
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
              value={tripData.endDate}
              onChange={handleChange}
              required
            />
          </Grid>
        </Grid>

        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" gutterBottom>
            Destinations
            <IconButton color="primary" onClick={handleAddDestination}>
              <AddIcon />
            </IconButton>
          </Typography>

          {tripData.destinations.map((destination, index) => (
            <Card key={destination.id} sx={{ mb: 3, mt: 2 }}>
              <CardContent>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Destination Name"
                      fullWidth
                      value={destination.name}
                      onChange={(e) =>
                        handleDestinationChange(index, "name", e.target.value)
                      }
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Country"
                      fullWidth
                      value={destination.country}
                      onChange={(e) =>
                        handleDestinationChange(
                          index,
                          "country",
                          e.target.value
                        )
                      }
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Start Date"
                      type="date"
                      fullWidth
                      InputLabelProps={{ shrink: true }}
                      value={destination.startDate}
                      onChange={(e) =>
                        handleDestinationChange(
                          index,
                          "startDate",
                          e.target.value
                        )
                      }
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="End Date"
                      type="date"
                      fullWidth
                      InputLabelProps={{ shrink: true }}
                      value={destination.endDate}
                      onChange={(e) =>
                        handleDestinationChange(
                          index,
                          "endDate",
                          e.target.value
                        )
                      }
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Activities"
                      fullWidth
                      multiline
                      rows={2}
                      value={destination.activities.join(", ")}
                      onChange={(e) =>
                        handleActivitiesChange(index, e.target.value)
                      }
                      helperText="Enter activities separated by commas"
                      required
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Typography variant="h6" sx={{ mt: 2, mb: 2 }}>
                      Accommodation
                    </Typography>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Hotel Name"
                      fullWidth
                      value={destination.accommodation.name}
                      onChange={(e) =>
                        handleDestinationChange(
                          index,
                          "accommodation.name",
                          e.target.value
                        )
                      }
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Address"
                      fullWidth
                      value={destination.accommodation.address}
                      onChange={(e) =>
                        handleDestinationChange(
                          index,
                          "accommodation.address",
                          e.target.value
                        )
                      }
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Check-in Date"
                      type="date"
                      fullWidth
                      InputLabelProps={{ shrink: true }}
                      value={destination.accommodation.checkIn}
                      onChange={(e) =>
                        handleDestinationChange(
                          index,
                          "accommodation.checkIn",
                          e.target.value
                        )
                      }
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Check-out Date"
                      type="date"
                      fullWidth
                      InputLabelProps={{ shrink: true }}
                      value={destination.accommodation.checkOut}
                      onChange={(e) =>
                        handleDestinationChange(
                          index,
                          "accommodation.checkOut",
                          e.target.value
                        )
                      }
                      required
                    />
                  </Grid>
                </Grid>
                {tripData.destinations.length > 1 && (
                  <Box sx={{ mt: 2, textAlign: "right" }}>
                    <IconButton
                      color="error"
                      onClick={() => handleRemoveDestination(index)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                )}
              </CardContent>
            </Card>
          ))}
        </Box>

        <Box
          sx={{ mt: 3, display: "flex", gap: 2, justifyContent: "flex-end" }}
        >
          <Button variant="outlined" onClick={() => navigate("/dashboard")}>
            Cancel
          </Button>
          <Button type="submit" variant="contained" color="primary">
            Save Trip
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default AddEditTrip;
