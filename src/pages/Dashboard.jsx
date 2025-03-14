import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  CircularProgress,
  Fab,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom"; // For navigation
import { dummyTrips } from "../assets/tripsData";

function Dashboard() {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  console.log("trips", trips);

  // Navigate to the ViewTrip page with the specific trip ID

  const handleViewTrip = (tripId) => {
    navigate(`/view-trip/${tripId}`);
  };

  // Simulate API loading
  useEffect(() => {
    setTimeout(() => {
      setTrips(dummyTrips);
      setLoading(false);
    }, 1500);
  }, []);

  return (
    <Container maxWidth="md" sx={{ mt: 4, position: "relative" }}>
      <Typography variant="h4" align="center" gutterBottom>
        My Trips
      </Typography>

      {/* Loading State */}
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : trips.length === 0 ? (
        // Empty State Message
        <Typography variant="h6" align="center" sx={{ mt: 3, color: "gray" }}>
          No trips added yet. Start by adding a new trip!
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {trips.map((trip) => (
            <Grid item xs={12} sm={6} md={4} key={trip.id}>
              <Card
                sx={{ minHeight: 150, cursor: "pointer" }}
                onClick={() => handleViewTrip(trip.id)}
              >
                <CardContent>
                  <Typography variant="h6">{trip.title}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    {trip.startDate} - {trip.endDate}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Floating Add Button */}
      <Fab
        color="primary"
        sx={{ position: "fixed", bottom: 30, right: 30 }}
        onClick={() => alert("Redirecting to Add Trip Form...")}
      >
        <AddIcon />
      </Fab>
    </Container>
  );
}

export default Dashboard;
