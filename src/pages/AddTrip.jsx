import React, { useState } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

function AddTrip() {
  const [tripTitle, setTripTitle] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (!tripTitle || !startDate || !endDate) {
      setError("All fields are required.");
      return;
    }

    if (dayjs(startDate).isAfter(dayjs(endDate))) {
      setError("Start date cannot be after end date.");
      return;
    }

    // Normally, send this data to an API or store it
    console.log("New Trip:", { tripTitle, startDate, endDate });

    // Clear form after submission
    setTripTitle("");
    setStartDate(null);
    setEndDate(null);
    setError("");

    // Navigate to dashboard after adding trip
    navigate("/dashboard");
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 5, p: 3, boxShadow: 3, borderRadius: 2, bgcolor: "white" }}>
        <Typography variant="h5" align="center" color="black" gutterBottom>
          Add a New Trip
        </Typography>

        {error && (
          <Typography color="error" align="center">
            {error}
          </Typography>
        )}

        <form onSubmit={handleSubmit}>
          <TextField
            label="Trip Title"
            fullWidth
            variant="outlined"
            margin="normal"
            value={tripTitle}
            onChange={(e) => setTripTitle(e.target.value)}
          />

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Start Date"
              value={startDate}
              onChange={(date) => setStartDate(date)}
              renderInput={(params) => <TextField {...params} fullWidth margin="normal" />}
            />
            <DatePicker
              label="End Date"
              value={endDate}
              onChange={(date) => setEndDate(date)}
              renderInput={(params) => <TextField {...params} fullWidth margin="normal" />}
            />
          </LocalizationProvider>

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Add Trip
          </Button>
        </form>
      </Box>
    </Container>
  );
}

export default AddTrip;
