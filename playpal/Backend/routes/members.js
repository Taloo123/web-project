const express = require("express");
const router = express.Router();
const TeamMember = require("../models/TeamMember"); // Import the TeamMember model
const authenticateToken = require("../middleware/authenticateToken"); // Import auth middleware

// Get all team members for the authenticated user
router.get("/", authenticateToken, async (req, res) => {
  try {
    const teamMembers = await TeamMember.find({ createdBy: req.user.id });
    res.json(teamMembers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Add a new team member
router.post("/", authenticateToken, async (req, res) => {
  const { name, age, role, matchesPlayed } = req.body;

  if (!name || !age || !role || matchesPlayed == null) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const newMember = new TeamMember({
      name,
      age,
      role,
      matchesPlayed,
      createdBy: req.user.id,
    });

    await newMember.save();
    res.status(201).json(newMember);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Update an existing team member
router.put("/:id", authenticateToken, async (req, res) => {
  const { id } = req.params;
  const { name, age, role, matchesPlayed } = req.body;

  try {
    const updatedMember = await TeamMember.findOneAndUpdate(
      { _id: id, createdBy: req.user.id },
      { name, age, role, matchesPlayed },
      { new: true }
    );

    if (!updatedMember) {
      return res.status(404).json({ message: "Member not found" });
    }

    res.json(updatedMember);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Delete a team member
router.delete("/:id", authenticateToken, async (req, res) => {
  const { id } = req.params;

  try {
    const deletedMember = await TeamMember.findOneAndDelete({
      _id: id,
      createdBy: req.user.id,
    });

    if (!deletedMember) {
      return res.status(404).json({ message: "Member not found" });
    }

    res.json({ message: "Member deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
