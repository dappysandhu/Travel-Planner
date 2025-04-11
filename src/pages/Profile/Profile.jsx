import React, { useEffect } from "react";
import {
  Container,
  Paper,
  Typography,
  Grid,
  Avatar,
  Button,
  Divider,
  Box,
  Alert,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SecurityIcon from "@mui/icons-material/Security";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useAuth } from "../../context/AuthContext";
import { useLoading } from "../../context/LoadingContext";
import moment from "moment";

const Profile = () => {
  const { currentUser, error } = useAuth();
  const { startLoading, stopLoading } = useLoading();

  useEffect(() => {
    startLoading();

    const checkImagesLoaded = () => {
      if (currentUser?.avatar) {
        const img = new Image();
        img.src = currentUser.avatar;
        img.onload = () => stopLoading();
        img.onerror = () => stopLoading();
      } else {
        stopLoading();
      }
    };

    if (currentUser) {
      checkImagesLoaded();
    }

    return () => {
      stopLoading();
    };
  }, [currentUser, startLoading, stopLoading]);

  if (error) {
    return (
      <Container maxWidth="md" sx={{ mt: 12, mb: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  if (!currentUser) {
    return (
      <Container maxWidth="md" sx={{ mt: 12, mb: 4 }}>
        <Alert severity="warning">
          You are not logged in. Please log in to view your profile.
        </Alert>
      </Container>
    );
  }

  const memberSince = currentUser.createdAt
    ? moment(currentUser.createdAt).format("MMMM YYYY")
    : "N/A";

  const getInitials = () => {
    return currentUser.name
      ? currentUser.name
          .split(" ")
          .map((n) => n[0])
          .join("")
          .toUpperCase()
      : "?";
  };

  return (
    <Container maxWidth="md" sx={{ mt: 12, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4} sx={{ textAlign: "center" }}>
            <Avatar
              sx={{
                width: 150,
                height: 150,
                margin: "0 auto",
                fontSize: "3rem",
                bgcolor: "primary.main",
              }}
              alt={currentUser.name || "User Profile"}
              src={currentUser.avatar || ""}
              onLoad={() => stopLoading()}
            >
              {!currentUser.avatar && getInitials()}
            </Avatar>
            <Button
              variant="outlined"
              startIcon={<EditIcon />}
              sx={{ mt: 2 }}
              disabled
            >
              Change Photo
            </Button>
          </Grid>

          <Grid item xs={12} md={8}>
            <Typography variant="h4" gutterBottom>
              {currentUser.name || "User Profile"}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Email: {currentUser.email || "N/A"}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Member since: {memberSince}
            </Typography>

            <Box sx={{ mt: 3 }}>
              <Button
                variant="contained"
                startIcon={<EditIcon />}
                sx={{ mr: 2 }}
                disabled
              >
                Edit Profile
              </Button>
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Divider sx={{ my: 3 }} />

            <Typography variant="h6" gutterBottom>
              Account Settings
            </Typography>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<SecurityIcon />}
                  disabled
                >
                  Security Settings
                </Button>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<NotificationsIcon />}
                  disabled
                >
                  Notification Preferences
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default Profile;
