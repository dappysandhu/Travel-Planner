import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "./theme/theme";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import ViewTrip from "./pages/ViewTrip";
import AddEditTrip from "./pages/AddEditTrip";
import Login from "./pages/AUth/Login";
import Signup from "./pages/AUth/SIgnup";
import { AuthProvider } from "./context/AuthContext";
import Profile from "./pages/Profile/Profile";
import AddEditDestination from "./pages/AddEditDestination";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <div className="app-container">
          <Router>
            <Navbar />
            <Routes>
              <Route
                path="/trip/:tripId/add-destination"
                element={<AddEditDestination />}
              />
              <Route
                path="/trip/:tripId/edit-destination/:destinationId"
                element={<AddEditDestination />}
              />
              <Route path="/" element={<Home />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/view-trip/:tripId" element={<ViewTrip />} />
              <Route path="/add-trip" element={<AddEditTrip />} />
              <Route path="/edit-trip/:tripId" element={<AddEditTrip />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </Router>
        </div>
      </AuthProvider>
    </ThemeProvider>
  );
}
export default App;
