/* eslint-disable react/prop-types */
import React, { useState } from "react";
import {
  Container,
  Paper,
  Typography,
  Grid,
  TextField,
  Button,
  Box,
  Alert,
  CircularProgress,
  Tab,
  Tabs,
} from "@mui/material";
import LockResetIcon from "@mui/icons-material/LockReset";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SecurityIcon from "@mui/icons-material/Security";
import { useAuth } from "../../context/AuthContext";

// Tab panel component
function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`settings-tabpanel-${index}`}
      aria-labelledby={`settings-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const Settings = () => {
  const [tabValue, setTabValue] = useState(0);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const { updatePassword } = useAuth();

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handlePasswordReset = async (e) => {
    e.preventDefault();

    // Form validation
    if (!currentPassword || !newPassword || !confirmPassword) {
      setError("All fields are required");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("New passwords don't match");
      return;
    }

    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    try {
      setLoading(true);
      setError("");

      // Call the updatePassword function from AuthContext
      await updatePassword(currentPassword, newPassword);

      // Clear form and show success message
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setSuccess("Password updated successfully");
    } catch (err) {
      setError(err.message || "Failed to update password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 12, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
          Settings
        </Typography>

        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            aria-label="settings tabs"
          >
            <Tab
              icon={<LockResetIcon />}
              iconPosition="start"
              label="Password"
            />
            <Tab
              icon={<SecurityIcon />}
              iconPosition="start"
              label="Security"
            />
            <Tab
              icon={<NotificationsIcon />}
              iconPosition="start"
              label="Notifications"
            />
          </Tabs>
        </Box>

        {/* Password Reset Tab */}
        <TabPanel value={tabValue} index={0}>
          <form onSubmit={handlePasswordReset}>
            {success && (
              <Alert severity="success" sx={{ mb: 3 }}>
                {success}
              </Alert>
            )}
            {error && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {error}
              </Alert>
            )}

            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  label="Current Password"
                  type="password"
                  fullWidth
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="New Password"
                  type="password"
                  fullWidth
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Confirm New Password"
                  type="password"
                  fullWidth
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={loading}
                  startIcon={
                    loading ? <CircularProgress size={20} /> : <LockResetIcon />
                  }
                >
                  {loading ? "Updating..." : "Reset Password"}
                </Button>
              </Grid>
            </Grid>
          </form>
        </TabPanel>

        {/* Security Tab - Placeholder for future implementation */}
        <TabPanel value={tabValue} index={1}>
          <Typography variant="body1">
            Security settings will be implemented in a future update.
          </Typography>
        </TabPanel>

        {/* Notifications Tab - Placeholder for future implementation */}
        <TabPanel value={tabValue} index={2}>
          <Typography variant="body1">
            Notification preferences will be implemented in a future update.
          </Typography>
        </TabPanel>
      </Paper>
    </Container>
  );
};

export default Settings;
