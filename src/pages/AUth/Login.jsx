import React, { useState } from "react";
import {
  Typography,
  TextField,
  Button,
  Paper,
  Grid,
  Link,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import loginImage from "../../assets/travel5.jpg";
import logo from "../../assets/appLogo-blue.png";
import { useToast } from "../../context/ToastContext";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { showSuccessToast, showErrorToast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      await login(email, password); 
      showSuccessToast("Welcome Back !!");
      navigate("/dashboard");
      setLoading(false);
    } catch (err) {
      console.error("Login Error:", err);
      const errorMessage = err?.message || "Login failed. Please try again.";
      showErrorToast(errorMessage); 
    } 
    finally {
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
          backgroundImage: `url(${loginImage})`,
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
          Sign in
        </Typography>
        <form onSubmit={handleSubmit}>
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
          <TextField
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : "Sign In"}
          </Button>
          <Grid container>
            <Grid item xs>
              <Link
                onClick={() => navigate("/forgot-password")}
                variant="body2"
                sx={{ cursor: "pointer" }}
              >
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Button onClick={() => navigate("/signup")}>
                {`Don't have an account? Sign Up`}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
};

export default Login;
