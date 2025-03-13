// src/pages/Auth.js
import React, { useState } from "react";
import {
  Container,
  Tabs,
  Tab,
  Box,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import Toast from "../components/Toast";

function Auth() {
  const [activeTab, setActiveTab] = useState(0);
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  // Toast state
  const [toast, setToast] = useState({
    open: false,
    message: "",
    severity: "success", // 'error', 'warning', 'info'
  });

  // Handle Tab Switching
  const handleTabChange = (event, newValue) => {
    setErrors({});
    setActiveTab(newValue);
  };

  // Form field handlers
  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleRegisterChange = (e) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
  };

  // Validation functions
  const validateLogin = () => {
    const temp = {};
    if (!loginData.email) temp.email = "Email is required";
    if (!loginData.password) temp.password = "Password is required";
    setErrors(temp);
    return temp;
  };

  const validateRegister = () => {
    const temp = {};
    if (!registerData.name) temp.name = "Name is required";
    if (!registerData.email) temp.email = "Email is required";
    if (!registerData.password) temp.password = "Password is required";
    setErrors(temp);
    return temp;
  };

  // Form submission handlers
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const loginErrors = validateLogin();
    if (Object.keys(loginErrors).length === 0) {
      console.log("Login Data:", loginData);
      // Simulate successful login
      setToast({
        open: true,
        message: "Login successful!",
        severity: "success",
      });
      // Reset form or redirect as needed
    } else {
      const firstError = Object.values(loginErrors)[0];
      setToast({
        open: true,
        message: firstError,
        severity: "error",
      });
    }
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    const registerErrors = validateRegister();
    if (Object.keys(registerErrors).length === 0) {
      console.log("Register Data:", registerData);
      // Simulate successful signup
      setToast({
        open: true,
        message: "Registration successful!",
        severity: "success",
      });
      // Reset form or redirect as needed
    } else {
      const firstError = Object.values(registerErrors)[0];
      setToast({
        open: true,
        message: firstError,
        severity: "error",
      });
    }
  };

  const handleToastClose = () => {
    setToast({ ...toast, open: false });
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={activeTab} onChange={handleTabChange} centered>
          <Tab label="Login" />
          <Tab label="Sign Up" />
        </Tabs>
      </Box>

      {activeTab === 0 && (
        <Box component="form" onSubmit={handleLoginSubmit} sx={{ mt: 3 }}>
          <Typography variant="h5" gutterBottom>
            Login
          </Typography>
          <TextField
            label="Email"
            name="email"
            fullWidth
            margin="normal"
            value={loginData.email}
            onChange={handleLoginChange}
            error={!!errors.email}
            helperText={errors.email}
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            fullWidth
            margin="normal"
            value={loginData.password}
            onChange={handleLoginChange}
            error={!!errors.password}
            helperText={errors.password}
          />
          <Button
            variant="contained"
            color="primary"
            type="submit"
            fullWidth
            sx={{ mt: 2 }}
          >
            Login
          </Button>
        </Box>
      )}

      {activeTab === 1 && (
        <Box component="form" onSubmit={handleRegisterSubmit} sx={{ mt: 3 }}>
          <Typography variant="h5" gutterBottom>
            Sign Up
          </Typography>
          <TextField
            label="Name"
            name="name"
            fullWidth
            margin="normal"
            value={registerData.name}
            onChange={handleRegisterChange}
            error={!!errors.name}
            helperText={errors.name}
          />
          <TextField
            label="Email"
            name="email"
            fullWidth
            margin="normal"
            value={registerData.email}
            onChange={handleRegisterChange}
            error={!!errors.email}
            helperText={errors.email}
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            fullWidth
            margin="normal"
            value={registerData.password}
            onChange={handleRegisterChange}
            error={!!errors.password}
            helperText={errors.password}
          />
          <Button
            variant="contained"
            color="primary"
            type="submit"
            fullWidth
            sx={{ mt: 2 }}
          >
            Sign Up
          </Button>
        </Box>
      )}

      {/* Custom Toast for notifications */}
      <Toast
        open={toast.open}
        message={toast.message}
        severity={toast.severity}
        onClose={handleToastClose}
      />
    </Container>
  );
}

export default Auth;
