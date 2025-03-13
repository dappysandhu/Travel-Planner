import React from "react";
import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import ViewTrip from "./pages/ViewTrip";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/view-trip/:tripId" element={<ViewTrip />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
