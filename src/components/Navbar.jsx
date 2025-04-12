import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
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
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SettingsIcon from "@mui/icons-material/Settings";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/zoomedLogo.png";

const Navbar = () => {
  const navigate = useNavigate();
  const { isAuthenticated, logout, currentUser } = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase();
  };

  useEffect(() => {
    console.log("Authentication state changed:", isAuthenticated);
  }, [isAuthenticated]);

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
      sx={{ width: "100%", top: 0, left: 0, right: 0, zIndex: 1000, p: 0 }}
    >
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          sx={{ mr: 2 }}
          onClick={() => navigate(isAuthenticated ? "/dashboard" : "/")}
        >
          <img
            src={logo}
            alt="WanderWeave"
            style={{
              marginLeft: "24px",
              maxHeight: "80px",
              width: "auto",
              transform: "scale(2.2)",
            }}
          />
        </IconButton>

        <div style={{ flexGrow: 1 }} />

        {!isAuthenticated && (
          <>
            <Button
              color="inherit"
              startIcon={<HomeIcon />}
              onClick={() => navigate("/")}
            >
              Home
            </Button>
            <Button
              color="inherit"
              startIcon={<LoginIcon />}
              onClick={() => navigate("/login")}
            >
              Login
            </Button>
          </>
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
              <Avatar
                sx={{
                  bgcolor: "#e3f2fd",
                  width: 32,
                  height: 32,
                  color: "#1976d2",
                  fontWeight: 600,
                }}
              >
                {getInitials(currentUser.name)}
              </Avatar>
            </IconButton>
          </>
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
          {isAuthenticated && (
            <MenuItem onClick={handleLogout}>
              <LogoutIcon sx={{ mr: 1 }} /> Logout
            </MenuItem>
          )}
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
