import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  DialogActions,
  Typography,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

function AddDestinationModal({ open, handleClose, onAddDestination }) {
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState(null);
  const [notes, setNotes] = useState("");
  const [error, setError] = useState(""); // <-- Add error state

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!destination || !date || !notes) {
      setError("All fields are required!"); // <-- Set error message
      return;
    }

    const newDestination = {
      id: Date.now(),
      destination,
      date: dayjs(date).format("YYYY-MM-DD"),
      notes,
    };

    onAddDestination(newDestination);

    // Reset fields and close modal
    setDestination("");
    setDate(null);
    setNotes("");
    setError(""); // <-- Reset error on success
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>Add Destination</DialogTitle>
      <DialogContent>
        {error && <Typography color="error">{error}</Typography>} {/* <-- Show error message */}
        <form onSubmit={handleSubmit}>
          <TextField
            label="Destination Name"
            fullWidth
            margin="normal"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            error={!!error && !destination}
            helperText={!!error && !destination ? "Required field" : ""}
          />

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Date"
              value={date}
              onChange={(newDate) => setDate(newDate)}
              slotProps={{
                textField: {
                  fullWidth: true,
                  error: !!error && !date,
                  helperText: !!error && !date ? "Required field" : "",
                },
              }}
            />
          </LocalizationProvider>

          <TextField
            label="Notes"
            fullWidth
            multiline
            rows={3}
            margin="normal"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            error={!!error && !notes}
            helperText={!!error && !notes ? "Required field" : ""}
          />
        </form>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary" variant="contained">
          Add Destination
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddDestinationModal;
