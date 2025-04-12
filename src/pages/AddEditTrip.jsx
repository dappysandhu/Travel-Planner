/* eslint-disable no-unused-vars */
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
  Alert,
  CircularProgress,
} from "@mui/material";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "../utils/axiosConfig";
import moment from "moment";
import { ToastProvider } from "../context/ToastContext";
const AddEditTrip = () => {
  const { tripId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  // const { currentUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [toast, showToast] = useState();
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
    const fetchTripData = async () => {
      if (tripId) {
        setLoading(true);
        try {
          const response = await axios.get(`/api/trips/${tripId}`);
          const trip = response.data;

          setTripData({
            title: trip.title,
            startDate: moment(trip.startDate)
              .add(1, "day")
              .format("YYYY-MM-DD"),
            endDate: moment(trip.endDate).add(1, "day").format("YYYY-MM-DD"),
            destinations: trip.destinations.map((dest) => ({
              id: dest._id || `d${Date.now()}`,
              name: dest.name,
              country: dest.country,
              startDate: moment(dest.startDate)
                .add(1, "day")
                .format("YYYY-MM-DD"),
              endDate: moment(dest.endDate).add(1, "day").format("YYYY-MM-DD"),
              activities: Array.isArray(dest.activities)
                ? dest.activities.join(", ")
                : dest.activities,
              accommodation: {
                name: dest.accommodation?.name || "",
                address: dest.accommodation?.address || "",
                checkIn: moment(dest.accommodation?.checkIn)
                  .add(1, "day")
                  .format("YYYY-MM-DD"),
                checkOut: moment(dest.accommodation?.checkOut)
                  .add(1, "day")
                  .format("YYYY-MM-DD"),
              },
            })),
          });
        } catch (error) {
          showToast("Failed to load trip details", "error");
        } finally {
          setLoading(false);
        }
      } else if (location.state?.destination) {
        const { title, destinations } = location.state.destination;
        setTripData({
          title: title,
          startDate: moment(destinations[0].startDate)
            .add(1, "day")
            .format("YYYY-MM-DD"),
          endDate: moment(destinations[0].endDate)
            .add(1, "day")
            .format("YYYY-MM-DD"),
          destinations: destinations.map((dest) => ({
            id: `d${Date.now()}`,
            name: dest.name,
            country: dest.country,
            startDate: moment(dest.startDate)
              .add(1, "day")
              .format("YYYY-MM-DD"),
            endDate: moment(dest.endDate).add(1, "day").format("YYYY-MM-DD"),
            activities: dest.activities.join(", "),
            accommodation: {
              name: dest.accommodation.name,
              address: dest.accommodation.address,
              checkIn: moment(dest.accommodation.checkIn)
                .add(1, "day")
                .format("YYYY-MM-DD"),
              checkOut: moment(dest.accommodation.checkOut)
                .add(1, "day")
                .format("YYYY-MM-DD"),
            },
          })),
        });
      }
    };
    fetchTripData();
  }, [tripId, location.state]);
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

  // const handleActivitiesChange = (index, value) => {
  //   const activities = value
  //     .split(",")
  //     .map((activity) => activity.trim())
  //     .filter((activity) => activity.length > 0);

  //   handleDestinationChange(index, "activities", activities);
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formattedTripData = {
      title: tripData.title,
      startDate: moment(tripData.startDate)
        .subtract(1, "days")
        .format("YYYY-MM-DD"),
      endDate: moment(tripData.endDate)
        .subtract(1, "days")
        .format("YYYY-MM-DD"),
      destinations: tripData.destinations.map((dest) => ({
        name: dest.name,
        country: dest.country,
        startDate: moment(dest.startDate)
          .subtract(1, "days")
          .format("YYYY-MM-DD"),
        endDate: moment(dest.endDate).subtract(1, "days").format("YYYY-MM-DD"),
        activities: dest.activities
          .split(",")
          .map((a) => a.trim())
          .filter(Boolean),
        accommodation: {
          ...dest.accommodation,
          checkIn: moment(dest.accommodation.checkIn)
            .subtract(1, "days")
            .format("YYYY-MM-DD"),
          checkOut: moment(dest.accommodation.checkOut)
            .subtract(1, "days")
            .format("YYYY-MM-DD"),
        },
      })),
    };

    try {
      if (tripId) {
        await axios.put(`/api/trips/${tripId}`, formattedTripData);
        showToast("Trip updated successfully!", "success");
        navigate(`/view-trip/${tripId}`); // Go to view trip after edit
      } else {
        await axios.post("/api/trips", formattedTripData);
        showToast("Trip created successfully!", "success");
        navigate("/dashboard"); // Go to dashboard after creating new trip
      }
    } catch (error) {
      showToast(error.response?.data?.message || "Error saving trip", "error");
    } finally {
      setLoading(false);
    }
  };
  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 8, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        {tripId ? "Edit Trip" : "Add Trip"}
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

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
                      inputProps={{
                        style: { whiteSpace: "normal" },
                      }}
                      value={
                        Array.isArray(destination.activities)
                          ? destination.activities.join(", ")
                          : destination.activities
                      }
                      onChange={(e) =>
                        handleDestinationChange(
                          index,
                          "activities",
                          e.target.value
                        )
                      }
                      helperText="Type activities and separate them with commas"
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
          <Button
            variant="outlined"
            onClick={() => navigate(-1)}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={loading}
            // onClick={() => navigate(`/view-trip/${tripId}`)}
          >
            {loading ? <CircularProgress size={24} /> : "Save Trip"}
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default AddEditTrip;
