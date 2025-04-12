import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Box,
  Button,
  Chip,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  Divider,
  Paper,
} from "@mui/material";
import { Link } from "react-router-dom";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import AddIcon from "@mui/icons-material/Add";
import MapIcon from "@mui/icons-material/Map";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import DateRangeIcon from "@mui/icons-material/DateRange";
import HotelIcon from "@mui/icons-material/Hotel";
import DirectionsWalkIcon from "@mui/icons-material/DirectionsWalk";
import PopularDestinations from "../components/PopularDestinations";
import { useLoading } from "../context/LoadingContext";
import { useToast } from "../context/ToastContext";
import axios from "../utils/axiosConfig";
import moment from "moment";

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

const isTripCompleted = (trip) => {
  const today = new Date();
  const tripEndDate = new Date(trip.endDate);
  return tripEndDate < today;
};

const Dashboard = () => {
  const { startLoading, stopLoading } = useLoading();
  const { showToast } = useToast();
  const [trips, setTrips] = useState([]);
  const [imagesLoaded, setImagesLoaded] = useState(0);
  const [totalImages, setTotalImages] = useState(0);

  useEffect(() => {
    const fetchTrips = async () => {
      startLoading();
      try {
        const response = await axios.get("/api/trips");
        setTrips(response.data);
      } catch (error) {
        showToast(
          error.response?.data?.message || "Failed to fetch trips",
          "error"
        );
      }
    };
    fetchTrips();
  }, []);

  const upcomingTrips = trips.filter((trip) => !isTripCompleted(trip));
  const pastTrips = trips.filter((trip) => isTripCompleted(trip));

  console.log(`upcoming trip: ${upcomingTrips}`);

  useEffect(() => {
    startLoading();
    const totalTripCards = trips.length;
    const totalDestinationAvatars = pastTrips.reduce(
      (total, trip) => total + Math.min(trip.destinations.length, 3),
      0
    );
    setTotalImages(totalTripCards + totalDestinationAvatars);
    if (totalTripCards + totalDestinationAvatars === 0) {
      stopLoading();
    }
    return () => stopLoading();
  }, [startLoading, stopLoading, trips.length, pastTrips]);

  useEffect(() => {
    if (totalImages > 0 && imagesLoaded >= totalImages) {
      stopLoading();
    }
  }, [imagesLoaded, totalImages, stopLoading]);

  const handleImageLoad = () => {
    setImagesLoaded((prev) => prev + 1);
  };

  const handleImageError = () => {
    setImagesLoaded((prev) => prev + 1);
  };

  useEffect(() => {
    const allDestinations = new Set();
    trips.forEach((trip) => {
      if (trip.destinations) {
        trip.destinations.forEach((dest) => {
          allDestinations.add(dest.name);
        });
      }
    });

    allDestinations.forEach((destName) => {
      const img = new Image();
      img.src = getDestinationImage(destName);
      img.onload = handleImageLoad;
      img.onerror = handleImageError;
    });
  }, [trips]);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundImage: "linear-gradient(to bottom, #e6f2ff, #ffffff)",
        pt: 8,
        pb: 8,
      }}
    >
      <Container>
        <Box sx={{ textAlign: "center", mb: 6, position: "relative" }}>
          <Typography
            variant="h3"
            component="h1"
            gutterBottom
            sx={{ fontWeight: 700 }}
          >
            My Travel Journal
          </Typography>
          <Typography
            variant="h6"
            color="text.secondary"
            sx={{ maxWidth: 600, mx: "auto", mb: 4 }}
          >
            Plan, organize, and relive your travel adventures all in one place
          </Typography>
          {upcomingTrips.length > 0 ? (
            <Button
              variant="contained"
              color="primary"
              component={Link}
              to="/add-trip"
              sx={{
                borderRadius: 30,
                px: 4,
                py: 1.5,
                boxShadow: "0 8px 16px rgba(138, 170, 251, 0.2)",
              }}
              startIcon={<AddIcon />}
            >
              Create New Trip
            </Button>
          ) : null}
        </Box>

        <Grid container spacing={3} sx={{ mb: 6 }}>
          <Grid item xs={12} md={4}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                p: 3,
                backgroundImage:
                  "linear-gradient(135deg, #63a4ff 0%, #83eaf1 100%)",
                color: "white",
              }}
            >
              <MapIcon sx={{ fontSize: 48, mb: 2 }} />
              <Typography variant="h4" component="div" sx={{ fontWeight: 700 }}>
                {trips.length}
              </Typography>
              <Typography variant="h6" sx={{ opacity: 0.9 }}>
                Total Trips
              </Typography>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                p: 3,
                backgroundImage:
                  "linear-gradient(135deg, #008080 0%, #4db6ac 100%)",
                color: "white",
              }}
            >
              <FlightTakeoffIcon sx={{ fontSize: 48, mb: 2 }} />
              <Typography variant="h4" component="div" sx={{ fontWeight: 700 }}>
                {upcomingTrips.length}
              </Typography>
              <Typography variant="h6" sx={{ opacity: 0.9 }}>
                Upcoming Adventures
              </Typography>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                p: 3,
                backgroundImage:
                  "linear-gradient(135deg, #4caf50 0%, #80e27e 100%)",
                color: "white",
              }}
            >
              <CheckCircleIcon sx={{ fontSize: 48, mb: 2 }} />
              <Typography variant="h4" component="div" sx={{ fontWeight: 700 }}>
                {pastTrips.length}
              </Typography>
              <Typography variant="h6" sx={{ opacity: 0.9 }}>
                Completed Journeys
              </Typography>
            </Card>
          </Grid>
        </Grid>

        <Box sx={{ mb: 6 }}>
          <Typography
            variant="h4"
            gutterBottom
            sx={{ mb: 3, display: "flex", alignItems: "center", gap: 1 }}
          >
            <FlightTakeoffIcon color="primary" /> Upcoming Trips
          </Typography>
          {upcomingTrips.length === 0 ? (
            <Paper
              elevation={0}
              sx={{
                p: 4,
                textAlign: "center",
                borderRadius: 3,
                backgroundColor: "rgba(25, 118, 210, 0.05)",
                border: "1px dashed rgba(25, 118, 210, 0.3)",
              }}
            >
              <Typography variant="h6" color="text.secondary" gutterBottom>
                No upcoming trips planned yet
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                Start planning your next adventure by creating a new trip
              </Typography>
              <Button
                variant="contained"
                color="primary"
                component={Link}
                to="/add-trip"
                sx={{
                  borderRadius: 30,
                  px: 4,
                  py: 1.5,
                  boxShadow: "0 8px 16px rgba(138, 170, 251, 0.2)",
                }}
                startIcon={<AddIcon />}
              >
                Create New Trip
              </Button>
              <Box sx={{ mt: 4 }}>
                <PopularDestinations />
              </Box>
            </Paper>
          ) : (
            <Grid container spacing={3}>
              {upcomingTrips.map((trip) => (
                <Grid item xs={12} md={6} lg={4} key={trip._id}>
                  <Card
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      overflow: "hidden",
                      borderRadius: 3,
                    }}
                  >
                    <CardActionArea
                      component={Link}
                      to={`/view-trip/${trip._id}`}
                      sx={{
                        flex: 1,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "stretch",
                      }}
                    >
                      <Box sx={{ position: "relative" }}>
                        <CardMedia
                          component="img"
                          height="180"
                          image={getDestinationImage(trip.destination)}
                          alt={trip.title}
                          onLoad={handleImageLoad}
                          onError={handleImageError}
                        />
                        <Chip
                          icon={<FlightTakeoffIcon />}
                          label="Upcoming"
                          color="primary"
                          sx={{
                            position: "absolute",
                            top: 16,
                            right: 16,
                            fontWeight: 600,
                          }}
                        />
                      </Box>
                      <CardContent sx={{ flex: 1, p: 3 }}>
                        <Typography
                          variant="h5"
                          component="div"
                          gutterBottom
                          sx={{ fontWeight: 600 }}
                        >
                          {trip.title}
                        </Typography>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                            mb: 1.5,
                          }}
                        >
                          <DateRangeIcon fontSize="small" color="action" />
                          <Typography variant="body2" color="text.secondary">
                            {moment(trip.startDate)
                              .add(1, "day")
                              .format("MMM DD, YYYY")}{" "}
                            -{" "}
                            {moment(trip.endDate)
                              .add(1, "day")
                              .format("MMM DD, YYYY")}
                          </Typography>
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                            mb: 1.5,
                          }}
                        >
                          <LocationOnIcon fontSize="small" color="action" />
                          <Typography variant="body2" color="text.secondary">
                            {trip.destinations.map((d) => d.name).join(" → ")}
                          </Typography>
                        </Box>

                        <Divider sx={{ my: 2 }} />

                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                            }}
                          >
                            <DirectionsWalkIcon
                              fontSize="small"
                              color="primary"
                            />
                            <Typography variant="body2">
                              {trip.destinations.reduce(
                                (total, dest) => total + dest.activities.length,
                                0
                              )}{" "}
                              Activities
                            </Typography>
                          </Box>

                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                            }}
                          >
                            <HotelIcon fontSize="small" color="primary" />
                            <Typography variant="body2">
                              {trip.destinations.length} Stays
                            </Typography>
                          </Box>
                        </Box>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </Box>

        <Box>
          <Typography
            variant="h4"
            gutterBottom
            sx={{ mb: 3, display: "flex", alignItems: "center", gap: 1 }}
          >
            <CheckCircleIcon color="success" /> Past Adventures
          </Typography>
          {pastTrips.length === 0 ? (
            <Paper
              elevation={0}
              sx={{
                p: 4,
                textAlign: "center",
                borderRadius: 3,
                backgroundColor: "rgba(76, 175, 80, 0.05)",
                border: "1px dashed rgba(76, 175, 80, 0.3)",
              }}
            >
              <Typography variant="h6" color="text.secondary" gutterBottom>
                No completed trips yet
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Your completed trips will appear here
              </Typography>
            </Paper>
          ) : (
            <Grid container spacing={3}>
              {pastTrips.map((trip) => (
                <Grid item xs={12} md={6} lg={4} key={trip._id}>
                  <Card
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      overflow: "hidden",
                      borderRadius: 3,
                      opacity: 0.9,
                    }}
                  >
                    <CardActionArea
                      component={Link}
                      to={`/view-trip/${trip._id}`}
                      sx={{
                        flex: 1,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "stretch",
                      }}
                    >
                      <Box sx={{ position: "relative" }}>
                        <CardMedia
                          component="img"
                          height="180"
                          image={getDestinationImage(trip.destination)}
                          alt={trip.title}
                          sx={{ filter: "grayscale(0.3)" }}
                          onLoad={handleImageLoad}
                          onError={handleImageError}
                        />
                        <Chip
                          icon={<CheckCircleIcon />}
                          label="Completed"
                          color="success"
                          sx={{
                            position: "absolute",
                            top: 16,
                            right: 16,
                            fontWeight: 600,
                          }}
                        />
                      </Box>
                      <CardContent sx={{ flex: 1, p: 3 }}>
                        <Typography
                          variant="h5"
                          component="div"
                          gutterBottom
                          sx={{ fontWeight: 600 }}
                        >
                          {trip.title}
                        </Typography>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                            mb: 1.5,
                          }}
                        >
                          <DateRangeIcon fontSize="small" color="action" />
                          <DateRangeIcon fontSize="small" color="action" />
                          <Typography variant="body2" color="text.secondary">
                            {new Date(trip.startDate).toLocaleDateString()} -{" "}
                            {new Date(trip.endDate).toLocaleDateString()}
                          </Typography>
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                            mb: 1.5,
                          }}
                        >
                          <LocationOnIcon fontSize="small" color="action" />
                          <Typography variant="body2" color="text.secondary">
                            {trip.destination}
                          </Typography>
                        </Box>
                        <Divider sx={{ my: 2 }} />
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <Typography
                            variant="body2"
                            color="success.main"
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 0.5,
                              fontWeight: 600,
                            }}
                          >
                            <CheckCircleIcon fontSize="small" />
                            Completed
                          </Typography>
                        </Box>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default Dashboard;
