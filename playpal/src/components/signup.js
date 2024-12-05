import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TextField, Button, Typography, Box, IconButton } from "@mui/material";
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer'; // PlayPal symbol
import axios from "axios"; // Import axios to handle HTTP requests
import "../styles/signup.css";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, password, confirmPassword } = formData;

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/signup", {
        name,
        email,
        password,
        confirmPassword,
      });
      alert(response.data.message);
      console.log(response.data);
      alert("User registered successfully!");
      navigate("/signin");
    } catch (error) {
      console.error(error);
      setError(error.response?.data?.message || "Server error");
    }
  };

  return (
    <Box className="signup-page-container">
      <Box className="signup-form-container">
        {/* PlayPal Logo and Symbol */}
        <div className="playpal-logo">
          <IconButton edge="start" color="inherit" aria-label="logo" className="playpal-logo-icon">
            <Link to="/dashboard"> <SportsSoccerIcon fontSize="large" /></Link>
            {/* <SportsSoccerIcon fontSize="large" /> */}
          </IconButton>
          <Typography variant="h6" className="playpal-logo-text">
            PlayPal
          </Typography>
        </div>

        {/* Signup Title */}
        <Typography variant="h4" className="signup-title" gutterBottom>
          Create an Account
        </Typography>

        {/* Error Message */}
        {error && <Typography color="error">{error}</Typography>}

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            variant="outlined"
            label="Full Name"
            margin="normal"
            className="signup-input"
            required
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            variant="outlined"
            label="Email Address"
            type="email"
            margin="normal"
            className="signup-input"
            required
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            variant="outlined"
            label="Password"
            type="password"
            margin="normal"
            className="signup-input"
            required
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            variant="outlined"
            label="Confirm Password"
            type="password"
            margin="normal"
            className="signup-input"
            required
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          <Button
            fullWidth
            variant="contained"
            className="signup-button"
            type="submit"
          >
            Sign Up
          </Button>
        </form>

        {/* Footer Section */}
        <Typography className="signup-footer" mt={2}>
          Already have an account?{" "}
          <a href="/signin" className="signup-link">
            Sign In
          </a>
        </Typography>
      </Box>
    </Box>
  );
};

export default Signup;
