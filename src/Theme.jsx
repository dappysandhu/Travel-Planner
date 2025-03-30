import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2", // Blue
    },
    secondary: {
      main: "#f50057", // Pink
    },
    background: {
      default: "#f4f6f8", // Light Gray
    },
    text: {
      primary: "#333",
      secondary: "#555",
    },
  },
  typography: {
    fontFamily: "Roboto, sans-serif",
    h1: { fontSize: "2rem", fontWeight: 700 },
    h2: { fontSize: "1.8rem", fontWeight: 600 },
    body1: { fontSize: "1rem" },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "8px", // Rounded buttons
          textTransform: "none", // No uppercase text
        },
      },
    },
  },
});

export default theme;
