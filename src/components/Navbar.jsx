import React from "react";
import { AppBar, Toolbar, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <AppBar position="static" color="primary">
      <Toolbar>

        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Travel Itinerary Planner
        </Typography>

        
        <Button color="inherit" component={Link} to="/">
          Home
        </Button>
        <Button color="inherit" component={Link} to="/dashboard">
          Dashboard
        </Button>
        <Button color="inherit" component={Link} to="/login">
          Login/Register
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
