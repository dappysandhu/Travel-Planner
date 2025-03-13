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
} from "@mui/material";
import ConfirmationModal from "../components/ConfirmationModal";
import { dummyTrips } from "../assets/tripsData";
import moment from "moment";
import PlaceIcon from "@mui/icons-material/Place";

const ViewTrip = () => {
  const [trip, setTrip] = useState(null);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const { tripId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const foundTrip = dummyTrips.find((t) => t.id === tripId);
    setTrip(foundTrip);
  }, [tripId]);

  const handleDeleteTrip = () => {
    setOpenDeleteModal(false);
    navigate("/dashboard");
  };

  if (!trip) {
    return (
      <Typography>
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <CircularProgress />
        </Box>
      </Typography>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom fontWeight={600}>
          {trip.title}
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6">Start Date</Typography>
            <Typography>
              {moment(trip.startDate).format("MMMM D, YYYY")}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6">End Date</Typography>
            <Typography>
              {moment(trip.endDate).format("MMMM D, YYYY")}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <PlaceIcon color="primary" />
              <Typography sx={{ fontSize: 18, fontWeight: 600 }}>
                Destinations
              </Typography>
            </div>
            {trip.destinations &&
              trip.destinations.map((destination, index) => (
                <Typography key={index}>{destination}</Typography>
              ))}
          </Grid>
        </Grid>
        <Box
          sx={{ mt: 3, display: "flex", justifyContent: "flex-end", gap: 2 }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate(`/edit-trip/${tripId}`)}
          >
            Edit Trip
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => setOpenDeleteModal(true)}
          >
            Delete Trip
          </Button>
          <Button variant="contained" onClick={() => navigate("/dashboard")}>
            Back to Dashboard
          </Button>
        </Box>
      </Paper>

      <ConfirmationModal
        open={openDeleteModal}
        onClose={() => setOpenDeleteModal(false)}
        onConfirm={handleDeleteTrip}
        title="Confirm Delete"
        message="Are you sure you want to delete this trip? This action cannot be undone."
        confirmText="Delete"
        confirmColor="error"
      />
    </Container>
  );
};
export default ViewTrip;
