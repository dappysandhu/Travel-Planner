import React from "react";
import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
