/* eslint-disable react/prop-types */
import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
} from "@mui/material";
import moment from "moment";
import DeleteIcon from "@mui/icons-material/Delete";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import DateRangeIcon from "@mui/icons-material/DateRange";

const DeleteTripModal = ({ open, onClose, trip, onConfirm, loading }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ pb: 1 }}>
        <Typography variant="h5" color="error">
          Delete Trip Confirmation
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            {trip?.title}
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
            <DateRangeIcon color="action" fontSize="small" />
            <Typography variant="body2" color="text.secondary">
              {moment(trip?.startDate).format("MMM DD, YYYY")} -{" "}
              {moment(trip?.endDate).format("MMM DD, YYYY")}
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
            <LocationOnIcon color="action" fontSize="small" />
            <Typography variant="body2" color="text.secondary">
              {trip?.destinations?.map((d) => d.name).join(" → ")}
            </Typography>
          </Box>

          <Typography color="error" variant="body1" sx={{ mt: 2 }}>
            Are you sure you want to delete this trip? This action cannot be
            undone.
          </Typography>
        </Box>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 3 }}>
        <Button onClick={onClose} variant="outlined">
          Cancel
        </Button>
        <Button
          onClick={onConfirm}
          variant="contained"
          color="error"
          startIcon={<DeleteIcon />}
          disabled={loading}
        >
          Delete Trip
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteTripModal;
