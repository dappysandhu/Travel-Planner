/* eslint-disable react/prop-types */
import React from "react";
import { Snackbar, Alert } from "@mui/material";

const CustomToast = ({ open, message, severity, onClose }) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={onClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert
        onClose={onClose}
        severity={severity}
        variant="filled"
        sx={{ width: "100%" }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

//  CustomToast.propTypes = {
//     open: PropTypes.bool.isRequired,
//     message: PropTypes.string.isRequired,
//     severity: PropTypes.oneOf(['error', 'warning', 'info', 'success']).isRequired,
//     onClose: PropTypes.func.isRequired,
//   }

export default CustomToast;
