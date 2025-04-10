/* eslint-disable react/prop-types */
import React from "react";
import { Card, CardContent, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";
import moment from "moment";

const TripCard = ({ trip, isCompleted }) => {
  return (
    <Card elevation={3} sx={{ mb: 3 }}>
      <CardContent>
        <Typography variant="h5" fontWeight="600" gutterBottom>
          {trip.title}
        </Typography>
        <Typography color="text.secondary">
          {moment(trip.startDate).format("MMMM D, YYYY")} -{" "}
          {moment(trip.endDate).format("MMMM D, YYYY")}
        </Typography>
        <Box sx={{ mt: 2, display: "flex", gap: 2 }}>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to={`/view-trip/${trip.id}`}
          >
            View
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            component={Link}
            to={`/edit-trip/${trip.id}`}
            disabled={isCompleted}
          >
            Edit
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default TripCard;
