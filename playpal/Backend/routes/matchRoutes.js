// routes/matchRoutes.js
const express = require("express");
const router = express.Router();
const Match = require("../models/matchModel");

// Middleware for authentication (you can expand it as needed)
const authenticate = require("../middleware/authenticateToken");

// GET all scheduled matches
router.get("/", authenticate, async (req, res) => {
  try {
    const matches = await Match.find();
    res.status(200).json(matches);
  } catch (error) {
    console.error("Error fetching matches:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

// POST to schedule a new match
router.post("/", authenticate, async (req, res) => {
  const { team1, team2, venue, date, time } = req.body;

  if (!team1 || !team2 || !venue || !date || !time) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const newMatch = new Match({ team1, team2, venue, date, time });
    await newMatch.save();
    res.status(201).json(newMatch);
  } catch (error) {
    console.error("Error scheduling match:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

// POST to send notifications (simplified for demo purposes)
router.post("/send-notifications", authenticate, async (req, res) => {
  try {
    // For the sake of this example, we'll just send a success message.
    // In a real-world application, you would use an email or messaging service.
    console.log("Sending notifications...");
    res.status(200).json({ message: "Notifications sent successfully!" });
  } catch (error) {
    console.error("Error sending notifications:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
