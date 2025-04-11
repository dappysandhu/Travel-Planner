/* eslint-disable react/prop-types */
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
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
import { AuthProvider, useAuth } from "./context/AuthContext";
import Profile from "./pages/Profile/Profile";
import AddEditDestination from "./pages/AddEditDestination";
import ForgotPassword from "./pages/AUth/ForgotPassword";
import ResetPassword from "./pages/AUth/ReserPassword";
import Settings from "./pages/Settings/Settings";
import { LoadingProvider } from "./context/LoadingContext";
import { ToastProvider } from "./context/ToastContext";

const ProtectedRoute = ({ children }) => {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  return children;
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <LoadingProvider>
          <ToastProvider>
            <div className="app-container">
              <Router>
                <Navbar />
                <Routes>
                  <Route path="/" element={<Home />} />

                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/forgot-password" element={<ForgotPassword />} />
                  <Route
                    path="/reset-password/:token"
                    element={<ResetPassword />}
                  />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/settings" element={<Settings />} />

                  <Route
                    path="/dashboard"
                    element={
                      <ProtectedRoute>
                        <Dashboard />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/trip/:tripId/add-destination"
                    element={<AddEditDestination />}
                  />
                  <Route
                    path="/trip/:tripId/edit-destination/:destinationId"
                    element={<AddEditDestination />}
                  />
                  <Route path="/view-trip/:tripId" element={<ViewTrip />} />
                  <Route path="/add-trip" element={<AddEditTrip />} />
                  <Route path="/edit-trip/:tripId" element={<AddEditTrip />} />
                </Routes>
              </Router>
            </div>
          </ToastProvider>
        </LoadingProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
export default App;
