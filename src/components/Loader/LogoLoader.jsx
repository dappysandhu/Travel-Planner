import React from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import { keyframes } from "@mui/system";

const fadeIn = keyframes`
  0% {
    opacity: 0.6;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0.6;
  }
`;

const LogoLoader = () => {
  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        zIndex: 9999,
      }}
    >
      <Box
        sx={{
          animation: `${fadeIn} 2s infinite ease-in-out`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* circular loader */}
        <CircularProgress size={70} thickness={4} color="primary" />

        <Typography
          variant="h6"
          color="primary"
          sx={{ mt: 3, fontWeight: "bold" }}
        >
          WanderWeave
        </Typography>

        <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
          Loading your adventure...
        </Typography>
      </Box>
    </Box>
  );
};

export default LogoLoader;
