import React from "react";
import Dashboard from "./pages/Dashboard";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Auth from "./pages/Auth";
import Home from "./pages/Home";
import ViewTrip from "./pages/ViewTrip";

function App() {
  return (
    <div className="app-container">
      <Router>
        <Routes>
          <Route path="/auth" element={<Auth />} />
          <Route path="/" element={<Home />} />
          <Route path="/view-trip/:tripId" element={<ViewTrip />} />
          <Route path="/dashboard" element={<Dashboard />} />

          {/* Add routes for Login and Register */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
