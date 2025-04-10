/* eslint-disable react/prop-types */
import React from "react";
import { Card, CardContent, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";
import moment from "moment";

const DestinationCard = ({ destination, tripId }) => {
  return (
    <Card elevation={2} sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="h6" fontWeight="600">
          {destination.name}
        </Typography>
        <Typography color="text.secondary">
          {moment(destination.date).format("MMMM D, YYYY")}
        </Typography>
        <Typography sx={{ mt: 1 }}>{destination.notes}</Typography>
        <Box sx={{ mt: 2, display: "flex", gap: 2 }}>
          <Button
            variant="outlined"
            color="primary"
            component={Link}
            to={`/edit-destination/${tripId}/${destination.id}`}
          >
            Edit
          </Button>
          <Button variant="outlined" color="error">
            Delete
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default DestinationCard;
