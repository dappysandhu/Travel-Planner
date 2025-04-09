import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
      light: "#63a4ff",
      dark: "#004ba0",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#ff6d00",
      light: "#ff9e40",
      dark: "#c43c00",
      contrastText: "#ffffff",
    },
    background: {
      default: "#f8f9fa",
      paper: "#ffffff",
    },
    success: {
      main: "#4caf50",
      light: "#80e27e",
      dark: "#087f23",
    },
    info: {
      main: "#03a9f4",
    },
    text: {
      primary: "#1c2536",
      secondary: "#58667e",
    },
  },
  typography: {
    fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
    h3: {
      fontWeight: 600,
    },
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 12,
  },
  shadows: [
    "none",
    "0px 2px 1px -1px rgba(0,0,0,0.1),0px 1px 1px 0px rgba(0,0,0,0.07),0px 1px 3px 0px rgba(0,0,0,0.06)",
    "0px 3px 3px -2px rgba(0,0,0,0.1),0px 2px 6px 0px rgba(0,0,0,0.07),0px 1px 8px 0px rgba(0,0,0,0.06)",
    "0px 4px 6px -1px rgba(0,0,0,0.1),0px 2px 4px 0px rgba(0,0,0,0.06)",
    "0px 8px 16px -1px rgba(0,0,0,0.1),0px 4px 8px 0px rgba(0,0,0,0.06)",
  ],
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 600,
          padding: "10px 20px",
          boxShadow: "0 4px 14px 0 rgba(0,118,255,0.09)",
        },
        containedPrimary: {
          "&:hover": {
            boxShadow: "0 6px 20px rgba(0,118,255,0.23)",
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: "0 8px 24px rgba(149, 157, 165, 0.2)",
          transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
          "&:hover": {
            transform: "translateY(-5px)",
            boxShadow: "0 16px 30px rgba(149, 157, 165, 0.3)",
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: "0 8px 24px rgba(149, 157, 165, 0.2)",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: 12,
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "#1976d2",
              borderWidth: 2,
            },
          },
          "& .MuiFormLabel-root.Mui-focused": {
            color: "#1976d2",
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 500,
          "&.MuiChip-colorPrimary": {
            boxShadow: "0 2px 8px rgba(25, 118, 210, 0.25)",
          },
          "&.MuiChip-colorSecondary": {
            boxShadow: "0 2px 8px rgba(255, 109, 0, 0.25)",
          },
          "&.MuiChip-colorSuccess": {
            boxShadow: "0 2px 8px rgba(76, 175, 80, 0.25)",
          },
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          textDecoration: "none",
          transition: "color 0.2s",
          "&:hover": {
            color: "#004ba0",
          },
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: "rgba(0, 0, 0, 0.08)",
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: "rgba(0, 0, 0, 0.8)",
          fontSize: "0.75rem",
          padding: "8px 12px",
          borderRadius: 8,
        },
      },
    },
    MuiBackdrop: {
      styleOverrides: {
        root: {
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          backdropFilter: "blur(4px)",
        },
      },
    },
  },
});

export default theme;
