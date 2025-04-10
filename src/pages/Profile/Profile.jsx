import React from "react";
import {
  Container,
  Paper,
  Typography,
  Grid,
  Avatar,
  Button,
  Divider,
  Box,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SecurityIcon from "@mui/icons-material/Security";
import NotificationsIcon from "@mui/icons-material/Notifications";

const Profile = () => {
  return (
    <Container maxWidth="md" sx={{ mt: 12, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4} sx={{ textAlign: "center" }}>
            <Avatar
              sx={{ width: 150, height: 150, margin: "0 auto" }}
              alt="User Profile"
              src="/path-to-profile-image.jpg"
            />
            <Button variant="outlined" startIcon={<EditIcon />} sx={{ mt: 2 }}>
              Change Photo
            </Button>
          </Grid>

          <Grid item xs={12} md={8}>
            <Typography variant="h4" gutterBottom>
              User Profile
            </Typography>
            <Typography variant="body1" gutterBottom>
              Email: user@example.com
            </Typography>
            <Typography variant="body1" gutterBottom>
              Member since: January 2024
            </Typography>

            <Box sx={{ mt: 3 }}>
              <Button
                variant="contained"
                startIcon={<EditIcon />}
                sx={{ mr: 2 }}
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
                >
                  Security Settings
                </Button>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<NotificationsIcon />}
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
