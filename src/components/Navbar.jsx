import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SettingsIcon from "@mui/icons-material/Settings";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleProfileMenuClose();
    navigate("/login");
  };

  return (
    <AppBar
      position="fixed"
      sx={{ width: "100%", top: 0, left: 0, right: 0, zIndex: 1000 }}
    >
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          sx={{ mr: 2 }}
          onClick={() => navigate(isAuthenticated ? "/dashboard" : "/")}
        >
          <FlightTakeoffIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Travel Planner
        </Typography>

        {!isAuthenticated && (
          <Button
            color="inherit"
            startIcon={<HomeIcon />}
            onClick={() => navigate("/")}
          >
            Home
          </Button>
        )}

        {isAuthenticated && (
          <>
            <Button
              color="inherit"
              startIcon={<DashboardIcon />}
              onClick={() => navigate("/dashboard")}
            >
              Dashboard
            </Button>
            <IconButton color="inherit" onClick={handleProfileMenuOpen}>
              <Avatar sx={{ width: 32, height: 32 }}>
                <AccountCircleIcon />
              </Avatar>
            </IconButton>
          </>
        )}

        {!isAuthenticated && (
          <Button
            color="inherit"
            startIcon={<LoginIcon />}
            onClick={() => navigate("/login")}
          >
            Login
          </Button>
        )}

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleProfileMenuClose}
        >
          <MenuItem
            onClick={() => {
              navigate("/profile");
              handleProfileMenuClose();
            }}
          >
            <AccountCircleIcon sx={{ mr: 1 }} /> My Profile
          </MenuItem>
          <MenuItem
            onClick={() => {
              navigate("/settings");
              handleProfileMenuClose();
            }}
          >
            <SettingsIcon sx={{ mr: 1 }} /> Settings
          </MenuItem>
          <MenuItem onClick={handleLogout}>
            <LogoutIcon sx={{ mr: 1 }} /> Logout
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
