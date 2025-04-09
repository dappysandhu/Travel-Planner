import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Paper,
  Grid,
  Button,
  Box,
  CircularProgress,
  Card,
  CardContent,
  Chip,
  CardMedia,
  Avatar,
  Alert,
  Stepper,
  Step,
  StepLabel,
  StepContent,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import HotelIcon from "@mui/icons-material/Hotel";
import DirectionsWalkIcon from "@mui/icons-material/DirectionsWalk";
import PlaceIcon from "@mui/icons-material/Place";
import { dummyTrips } from "../data/tripsData";

// Helper function to get destination image
const getDestinationImage = (destination) => {
  const locations = {
    Paris: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34",
    Rome: "https://images.unsplash.com/photo-1529260830199-42c24126f198",
    Aspen: "https://images.unsplash.com/photo-1595351722944-9ad8b35a1112",
    Vancouver: "https://images.unsplash.com/photo-1559511260-66a654ae982a",
  };
  return (
    locations[destination] ||
    "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800"
  );
};

const ViewTrip = () => {
  const [trip, setTrip] = useState(null);
  const { tripId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const foundTrip = dummyTrips.find((t) => t.id === tripId);
    setTrip(foundTrip);
  }, [tripId]);

  if (!trip) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <CircularProgress size={60} />
        <Typography variant="h6" color="text.secondary">
          Loading trip details...
        </Typography>
      </Box>
    );
  }

  const isPastTrip = new Date(trip.endDate) < new Date();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundImage: "linear-gradient(to bottom, #e6f2ff, #ffffff)",
        pt: 4,
        pb: 8,
      }}
    >
      <Container maxWidth="lg">
        {/* Back button */}
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate("/dashboard")}
          sx={{ mb: 3 }}
        >
          Back to trips
        </Button>

        {/* Hero section */}
        <Paper
          elevation={0}
          sx={{
            p: 0,
            mb: 4,
            overflow: "hidden",
            position: "relative",
            borderRadius: 3,
            boxShadow: "0 12px 24px rgba(0,0,0,0.1)",
          }}
        >
          <Box
            sx={{
              height: 250,
              position: "relative",
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.6)), url(${getDestinationImage(trip.destinations[0]?.name)})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              display: "flex",
              alignItems: "flex-end",
              p: 4,
            }}
          >
            <Box>
              <Typography
                variant="h3"
                component="h1"
                sx={{
                  color: "white",
                  fontWeight: 700,
                  textShadow: "1px 1px 3px rgba(0,0,0,0.3)",
                }}
              >
                {trip.title}
              </Typography>
              <Typography
                variant="h6"
                sx={{ color: "white", opacity: 0.9, mb: 2 }}
              >
                {trip.startDate} - {trip.endDate}
              </Typography>
              {isPastTrip ? (
                <Chip
                  icon={<CheckCircleIcon />}
                  label="Completed Trip"
                  color="success"
                  sx={{ fontSize: "0.9rem", height: 32, fontWeight: 600 }}
                />
              ) : (
                <Chip
                  icon={<FlightTakeoffIcon />}
                  label="Upcoming Adventure"
                  color="primary"
                  sx={{ fontSize: "0.9rem", height: 32, fontWeight: 600 }}
                />
              )}
            </Box>
          </Box>
        </Paper>

        {/* Trip itinerary */}
        <Grid container spacing={4}>
          {/* Left column - Destinations and timeline */}
          <Grid item xs={12} md={8}>
            <Paper
              elevation={0}
              sx={{
                p: 4,
                mb: 4,
                borderRadius: 3,
                boxShadow: "0 8px 16px rgba(149, 157, 165, 0.2)",
              }}
            >
              <Typography
                variant="h5"
                gutterBottom
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  mb: 3,
                  pb: 2,
                  borderBottom: "1px solid rgba(0,0,0,0.08)",
                }}
              >
                <PlaceIcon color="secondary" /> Journey Timeline
              </Typography>

              <Stepper orientation="vertical" sx={{ mb: 2 }}>
                {trip.destinations.map((destination, index) => (
                  <Step
                    key={destination.id}
                    active={true}
                    completed={new Date(destination.endDate) < new Date()}
                  >
                    <StepLabel
                      StepIconComponent={() => (
                        <Avatar
                          sx={{
                            bgcolor:
                              new Date(destination.endDate) < new Date()
                                ? "success.main"
                                : "primary.main",
                            width: 32,
                            height: 32,
                          }}
                        >
                          {index + 1}
                        </Avatar>
                      )}
                    >
                      <Typography variant="h6">
                        {destination.name}, {destination.country}
                      </Typography>
                      <Typography color="text.secondary" variant="body2">
                        {destination.startDate} - {destination.endDate}
                      </Typography>
                    </StepLabel>
                    <StepContent>
                      <Card
                        elevation={0}
                        sx={{
                          mb: 3,
                          mt: 1,
                          borderRadius: 2,
                          overflow: "hidden",
                        }}
                      >
                        <CardMedia
                          component="img"
                          height="160"
                          image={getDestinationImage(destination.name)}
                          alt={destination.name}
                        />
                        <CardContent>
                          <Box sx={{ mb: 2 }}>
                            <Typography
                              variant="subtitle1"
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 1,
                                fontWeight: 600,
                                color: "primary.main",
                              }}
                            >
                              <DirectionsWalkIcon fontSize="small" /> Activities
                            </Typography>
                            <Box component="ul" sx={{ pl: 2 }}>
                              {destination.activities.map((activity, idx) => (
                                <Box component="li" key={idx} sx={{ mb: 0.5 }}>
                                  {activity}
                                </Box>
                              ))}
                            </Box>
                          </Box>

                          <Box>
                            <Typography
                              variant="subtitle1"
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 1,
                                fontWeight: 600,
                                color: "primary.main",
                              }}
                            >
                              <HotelIcon fontSize="small" /> Accommodation
                            </Typography>
                            <Typography
                              variant="body1"
                              sx={{ fontWeight: 500 }}
                            >
                              {destination.accommodation.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {destination.accommodation.address}
                            </Typography>
                            <Typography variant="body2">
                              Check-in: {destination.accommodation.checkIn}
                              <br />
                              Check-out: {destination.accommodation.checkOut}
                            </Typography>
                          </Box>
                        </CardContent>
                      </Card>
                    </StepContent>
                  </Step>
                ))}
              </Stepper>
            </Paper>
          </Grid>

          {/* Right column - Trip actions and status */}
          <Grid item xs={12} md={4}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                borderRadius: 3,
                boxShadow: "0 8px 16px rgba(149, 157, 165, 0.2)",
                mb: 3,
                borderLeft: isPastTrip
                  ? "4px solid #4caf50"
                  : "4px solid #1976d2",
              }}
            >
              <Typography variant="h6" gutterBottom>
                Trip Actions
              </Typography>

              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => navigate(`/edit-trip/${tripId}`)}
                  disabled={isPastTrip}
                  startIcon={<EditIcon />}
                  fullWidth
                  sx={{ py: 1.2 }}
                >
                  Edit Trip Details
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => console.log("Delete Trip")}
                  disabled={isPastTrip}
                  startIcon={<DeleteIcon />}
                  fullWidth
                  sx={{ py: 1.2 }}
                >
                  Delete This Trip
                </Button>
              </Box>

              {isPastTrip && (
                <Alert
                  severity="success"
                  icon={<CheckCircleIcon />}
                  sx={{ mt: 3 }}
                >
                  This trip has been completed! You can view the details only.
                </Alert>
              )}
            </Paper>

            <Paper
              elevation={0}
              sx={{
                p: 3,
                borderRadius: 3,
                boxShadow: "0 8px 16px rgba(149, 157, 165, 0.2)",
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.6)), url(${getDestinationImage(trip.destinations[0]?.name)})`,
              }}
            >
              <Typography variant="h6" gutterBottom>
                Trip Summary
              </Typography>
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" sx={{ mb: 0.5, opacity: 0.9 }}>
                  Duration:
                </Typography>
                <Typography variant="h5" sx={{ fontWeight: 600 }}>
                  {Math.ceil(
                    (new Date(trip.endDate) - new Date(trip.startDate)) /
                      (1000 * 60 * 60 * 24)
                  )}{" "}
                  days
                </Typography>
              </Box>
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" sx={{ mb: 0.5, opacity: 0.9 }}>
                  Destinations:
                </Typography>
                <Typography variant="h5" sx={{ fontWeight: 600 }}>
                  {trip.destinations.length} places
                </Typography>
              </Box>
              <Box>
                <Typography variant="body2" sx={{ mb: 0.5, opacity: 0.9 }}>
                  Countries:
                </Typography>
                <Typography variant="h5" sx={{ fontWeight: 600 }}>
                  {new Set(trip.destinations.map((d) => d.country)).size}{" "}
                  visited
                </Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default ViewTrip;
