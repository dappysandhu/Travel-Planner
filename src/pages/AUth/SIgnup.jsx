import React, { useState } from "react";
import {
  Typography,
  TextField,
  Button,
  Paper,
  Grid,
  Box,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import signupImage from "../../assets/travel5.jpg";
import logo from "../../assets/appLogo-blue.png";
import CustomToast from "../../components/Toast";
import { useToast } from "../../context/ToastContext";

const Signup = () => {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { showSuccessToast, showErrorToast } = useToast();

  const handleSignup = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      showErrorToast("Passwords don't match!")
      return;
    }

    if (password.length < 6) {
      showErrorToast("Password must be at least 6 characters long")
      return;
    }

    setLoading(true);
    try {
      await signup(name, email, password);
      showSuccessToast("welcome to WanderWeave")
      navigate("/dashboard");
    } catch (err) {
      showErrorToast(err?.message || "Registration failed. Please try again.")
      
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ overflow: "hidden", width: "100%" }}>
      <Grid
        container
        component="main"
        sx={{ height: "100vh", maxWidth: "100%" }}
      >
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${signupImage})`,
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid
          item
          xs={12}
          sm={8}
          md={5}
          component={Paper}
          elevation={6}
          square
          sx={{
            padding: { xs: "16px", sm: "24px" },
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            overflowX: "hidden",
          }}
        >
          <div style={{ textAlign: "center" }}>
            <img
              src={logo}
              alt="App Logo"
              style={{ maxHeight: "150px", maxWidth: "100%" }}
            />
          </div>
          <Typography component="h1" variant="h5" align="center">
            Sign Up
          </Typography>
          <form onSubmit={handleSignup}>
            <TextField
              margin="normal"
              required
              fullWidth
              label="Full Name"
              autoComplete="name"
              autoFocus
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Email Address"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Password"
              type="password"
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              helperText="Password must be at least 6 characters long"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Confirm Password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : "Sign Up"}
            </Button>
            <Grid container>
              <Grid item>
                <Button onClick={() => navigate("/login")}>
                  Already have an account? Sign In
                </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Signup;
