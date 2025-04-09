import React from "react";
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
  Avatar,
  AvatarGroup,
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
import { dummyTrips } from "../data/tripsData";

// Function to get a background image based on destination
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
  const upcomingTrips = dummyTrips.filter((trip) => !isTripCompleted(trip));
  const pastTrips = dummyTrips.filter((trip) => isTripCompleted(trip));

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundImage: "linear-gradient(to bottom, #e6f2ff, #ffffff)",
        pt: 4,
        pb: 8,
      }}
    >
      <Container>
        {/* Header Section */}
        <Box
          sx={{
            textAlign: "center",
            mb: 6,
            position: "relative",
          }}
        >
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
          <Button
            variant="contained"
            color="secondary"
            size="large"
            component={Link}
            to="/add-trip"
            startIcon={<AddIcon />}
            sx={{
              borderRadius: 30,
              px: 4,
              py: 1.5,
              boxShadow: "0 8px 16px rgba(255, 109, 0, 0.2)",
            }}
          >
            Create New Adventure
          </Button>
        </Box>

        {/* Stats Section */}
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
                {dummyTrips.length}
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
                  "linear-gradient(135deg, #ff9e40 0%, #ffcc80 100%)",
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

        {/* Upcoming Trips Section */}
        <Box sx={{ mb: 6 }}>
          <Typography
            variant="h4"
            gutterBottom
            sx={{
              mb: 3,
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
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
                startIcon={<AddIcon />}
              >
                Create New Trip
              </Button>
            </Paper>
          ) : (
            <Grid container spacing={3}>
              {upcomingTrips.map((trip) => (
                <Grid item xs={12} md={6} lg={4} key={trip.id}>
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
                      to={`/view-trip/${trip.id}`}
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
                          image={getDestinationImage(
                            trip.destinations[0]?.name
                          )}
                          alt={trip.title}
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
                            {trip.startDate} - {trip.endDate}
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

        {/* Past Trips Section */}
        <Box>
          <Typography
            variant="h4"
            gutterBottom
            sx={{
              mb: 3,
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
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
                <Grid item xs={12} md={6} lg={4} key={trip.id}>
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
                      to={`/view-trip/${trip.id}`}
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
                          image={getDestinationImage(
                            trip.destinations[0]?.name
                          )}
                          alt={trip.title}
                          sx={{ filter: "grayscale(0.3)" }}
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
                          <Typography variant="body2" color="text.secondary">
                            {trip.startDate} - {trip.endDate}
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
                          <AvatarGroup
                            max={3}
                            sx={{
                              "& .MuiAvatar-root": { width: 32, height: 32 },
                            }}
                          >
                            {trip.destinations.map((dest, index) => (
                              <Avatar
                                key={index}
                                alt={dest.name}
                                src={getDestinationImage(dest.name)}
                              />
                            ))}
                          </AvatarGroup>

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
