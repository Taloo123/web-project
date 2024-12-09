// routes/members.js
const express = require('express');
const TeamMember = require('../models/TeamMember');
const router = express.Router();

// Route to get team member data based on name
router.get('/teamMemberByName/:name', async (req, res) => {
  try {
    // Find the team member by name
    const teamMember = await TeamMember.findOne({ name: req.params.name });

    if (!teamMember) {
      return res.status(404).json({ message: 'Team member not found' });
    }

    // Return the team and role of the team member
    res.json({
      team: teamMember.name, 
      //team: teamMember.teamName,
      role: teamMember.role,
      matchesPlayed: teamMember.matchesPlayed,
    });
  } catch (err) {
    console.error("Error fetching team member:", err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
