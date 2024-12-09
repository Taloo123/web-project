import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Typography, Box } from "@mui/material";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import axios from "axios";
import "../styles/captainForm.css";

const CaptainForm = () => {
  const [formData, setFormData] = useState({
    teamName: "",
    matchesPlayed: "",
    revenue: "",
    expenses: "",
    netProfit: "",
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

    const { teamName, revenue, expenses, netProfit } = formData;

    try {
      const response = await axios.post("http://localhost:5000/api/TeamDetails", {
        teamName,
        revenue,
        expenses,
        netProfit,
      });

      alert(response.data.message);
      console.log(response.data);
      alert("Captain information submitted successfully!");
      navigate("/signin"); // Redirect to sign-in page
    } catch (error) {
      console.error(error);
      setError(error.response?.data?.message || "Server error");
    }
  };

  return (
    <Box className="captain-page-container">
    <Box className="captain-form-container">
      {/* PlayPal Logo */}
      <div className="playpal-logo">
        <SportsSoccerIcon fontSize="large" className="playpal-logo-icon" />
        <Typography variant="h6" className="playpal-logo-text">
          PlayPal
        </Typography>
      </div>

      {/* Form Title */}
      <Typography variant="h4" className="captain-form-title" gutterBottom>
        Captain Details
      </Typography>

      {/* Error Message */}
      {error && <Typography color="error">{error}</Typography>}

      {/* Form */}
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          variant="outlined"
          label="Team Name"
          margin="normal"
          className="captain-form-input"
          required
          name="teamName"
          value={formData.teamName}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          variant="outlined"
          label="Matches Played"
          margin="normal"
          className="captain-form-input"
          required
          name="matchesPlayed"
          type="number"
          value={formData.matchesPlayed}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          variant="outlined"
          label="Revenue (USD)"
          margin="normal"
          className="captain-form-input"
          required
          name="revenue"
          type="number"
          value={formData.revenue}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          variant="outlined"
          label="Expenses (USD)"
          margin="normal"
          className="captain-form-input"
          required
          name="expenses"
          type="number"
          value={formData.expenses}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          variant="outlined"
          label="Net Profit (USD)"
          margin="normal"
          className="captain-form-input"
          required
          name="netProfit"
          type="number"
          value={formData.netProfit}
          onChange={handleChange}
        />
        <Button
          fullWidth
          variant="contained"
          className="captain-form-button"
          type="submit"
        >
          Sign Up
        </Button>
      </form>
    </Box>
    </Box>
  );
};

export default CaptainForm;
