import React, { useState } from "react";
import {
  Typography,
  TextField,
  Button,
  Paper,
  Grid,
  CircularProgress,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import resetPasswordImage from "../../assets/travel5.jpg";
import logo from "../../assets/appLogo-blue.png";

const ResetPassword = () => {
  const navigate = useNavigate();
  const { token } = useParams();
  const { resetPassword } = useAuth();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (password !== confirmPassword) {
      setError("Passwords don't match!");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    setLoading(true);
    try {
      await resetPassword(token, password);
      setSuccess("Password has been reset successfully!");
      navigate("/login");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to reset password. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: `url(${resetPasswordImage})`,
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
          padding: "24px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <img src={logo} alt="App Logo" style={{ maxHeight: "150px" }} />
        </div>
        <Typography component="h1" variant="h5" align="center">
          Reset Password
        </Typography>
        {error && (
          <Typography
            color="error"
            variant="body2"
            align="center"
            sx={{ mt: 2 }}
          >
            {error}
          </Typography>
        )}
        {success && (
          <Typography
            color="success.main"
            variant="body2"
            align="center"
            sx={{ mt: 2 }}
          >
            {success}
          </Typography>
        )}
        <form onSubmit={handleSubmit}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="New Password"
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
            label="Confirm New Password"
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
            {loading ? <CircularProgress size={24} /> : "Reset Password"}
          </Button>
          <Grid container>
            <Grid item>
              <Button onClick={() => navigate("/login")}>Back to Login</Button>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
};

export default ResetPassword;
