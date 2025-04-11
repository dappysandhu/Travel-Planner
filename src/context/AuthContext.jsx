/* eslint-disable react/prop-types */
import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "../utils/axiosConfig.js";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Check if user is logged in on page load
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      fetchUserProfile();
    } else {
      setLoading(false);
    }
  }, []);

  const fetchUserProfile = async () => {
    try {
      const res = await axios.get("/api/auth/me");
      setCurrentUser(res.data.data);
      setIsAuthenticated(true);
    } catch (err) {
      console.error("Error fetching user profile:", err);
      localStorage.removeItem("token");
      delete axios.defaults.headers.common["Authorization"];
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      // Make real API call instead of hardcoded check
      const res = await axios.post("/api/auth/login", { email, password });
      const { token } = res.data;

      localStorage.setItem("token", token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      await fetchUserProfile();
      return currentUser;
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
      throw new Error(err.response?.data?.message || "Invalid credentials");
    }
  };

  const signup = async (name, email, password) => {
    try {
      const res = await axios.post("/api/auth/register", {
        name,
        email,
        password,
      });
      const { token } = res.data;

      localStorage.setItem("token", token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      await fetchUserProfile();
      return currentUser;
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
      throw new Error(err.response?.data?.message || "Registration failed");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    delete axios.defaults.headers.common["Authorization"];
    setCurrentUser(null);
    setIsAuthenticated(false);
  };

  const forgotPassword = async (email) => {
    try {
      await axios.post("/api/auth/forgotpassword", { email });
      return true;
    } catch (err) {
      setError(err.response?.data?.message || "Failed to send reset email");
      throw new Error(
        err.response?.data?.message || "Failed to send reset email"
      );
    }
  };

  const resetPassword = async (token, password) => {
    try {
      await axios.put(`/api/auth/resetpassword/${token}`, { password });
      return true;
    } catch (err) {
      setError(err.response?.data?.message || "Password reset failed");
      throw new Error(err.response?.data?.message || "Password reset failed");
    }
  };

  const updatePassword = async (currentPassword, newPassword) => {
    try {
      await axios.put("/api/auth/updatepassword", {
        currentPassword,
        newPassword,
      });
      return true;
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update password");
      throw new Error(
        err.response?.data?.message || "Failed to update password"
      );
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        currentUser,
        login,
        logout,
        signup,
        forgotPassword,
        resetPassword,
        updatePassword,
        loading,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
