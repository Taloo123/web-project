// routes/matchRoutes.js
const express = require("express");
const router = express.Router();
const Match = require("../models/matchModel");
const User = require("../models/User"); // Import the User model
const authenticate = require("../middleware/authenticateToken");

// GET all scheduled matches for the logged-in user
router.get("/", authenticate, async (req, res) => {
  try {
    // Fetch matches that are scheduled by the logged-in user (captain)
    const matches = await Match.find({ scheduledBy: req.user.id }); // Filter by the user's ID
    res.status(200).json(matches);
  } catch (error) {
    console.error("Error fetching matches:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

// POST to schedule a new match (only accessible by captains)
router.post("/", authenticate, async (req, res) => {
  const { team1, team2, venue, date, time } = req.body;

  if (!team1 || !team2 || !venue || !date || !time) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Get the user who is scheduling the match
    const user = await User.findById(req.user.id); // req.user.id comes from the authenticate middleware
    if (user.role !== "captain") {
      return res.status(403).json({ message: "Only captains can schedule matches" });
    }

    const newMatch = new Match({ team1, team2, venue, date, time, scheduledBy: req.user.id });
    await newMatch.save();
    res.status(201).json(newMatch);
  } catch (error) {
    console.error("Error scheduling match:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

// Send notifications (just an example endpoint)
router.post("/send-notifications", authenticate, async (req, res) => {
  try {
    // For simplicity, just send a success message here
    console.log("Sending notifications...");
    res.status(200).json({ message: "Notifications sent successfully!" });
  } catch (error) {
    console.error("Error sending notifications:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
