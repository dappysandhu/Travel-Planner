import React, { useState } from "react";
import {
  Typography,
  TextField,
  Button,
  Paper,
  Grid,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import forgotPasswordImage from "../../assets/travel5.jpg";
import logo from "../../assets/applogo-blue.png";
import CustomToast from "../../components/Toast";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const { forgotPassword } = useAuth();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleToastClose = () => {
    setToast({ ...toast, open: false });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await forgotPassword(email);
      setToast({
        open: true,
        message: "Password reset email sent. Please check your inbox.",
        severity: "success",
      });
    } catch (err) {
      setToast({
        open: true,
        message:
          err.response?.data?.message ||
          "Failed to send reset email. Please try again.",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <CustomToast
        open={toast.open}
        message={toast.message}
        severity={toast.severity}
        onClose={handleToastClose}
      />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: `url(${forgotPasswordImage})`,
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
          Forgot Password
        </Typography>
        <form onSubmit={handleSubmit}>
          <Typography variant="body2" sx={{ mt: 2 }}>
            {`Enter your email address and we'll send you a link to reset your
            password.`}
          </Typography>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Email Address"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : "Send Reset Link"}
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

export default ForgotPassword;
