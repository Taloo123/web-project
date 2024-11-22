import React, { useEffect, useState } from "react";
import { Container, Typography, Button, Grid, Card, CardContent } from "@mui/material";
import Navbar from "./navbar"; // Navbar for navigation
import "../styles/teamManagement.css"; // Separate CSS for Team Management styling

const TeamManagement = () => {
  // State for team members
  const [teamMembers, setTeamMembers] = useState([
    { name: "Alice Johnson", age: 25, role: "Vice Captain", matchesPlayed: 20 },
    { name: "Bob Smith", age: 28, role: "All-Rounder", matchesPlayed: 18 },
    { name: "Charlie Brown", age: 22, role: "Batsman", matchesPlayed: 15 },
    { name: "Dana White", age: 30, role: "Bowler", matchesPlayed: 22 },
  ]);

  // State for form inputs
  const [newMember, setNewMember] = useState({
    name: "",
    age: "",
    role: "",
    matchesPlayed: "",
  });

  // State to track if editing
  const [editingIndex, setEditingIndex] = useState(null);

  // Update document title
  useEffect(() => {
    document.title = "Team Management";
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMember({ ...newMember, [name]: value });
  };

  // Handle form submission
  const handleFormSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission

    if (editingIndex !== null) {
      // Edit existing member
      const updatedMembers = [...teamMembers];
      updatedMembers[editingIndex] = {
        ...newMember,
        matchesPlayed: parseInt(newMember.matchesPlayed, 10),
        age: parseInt(newMember.age, 10),
      };
      setTeamMembers(updatedMembers);
      setEditingIndex(null); // Reset editing index
    } else {
      // Add new member
      setTeamMembers([ 
        ...teamMembers, 
        { ...newMember, matchesPlayed: parseInt(newMember.matchesPlayed, 10), age: parseInt(newMember.age, 10) }
      ]);
    }

    // Clear the form inputs
    setNewMember({ name: "", age: "", role: "", matchesPlayed: "" });
  };

  // Handle edit button click
  const handleEditClick = (index) => {
    const member = teamMembers[index];
    setNewMember(member); // Populate form fields with the member's data
    setEditingIndex(index); // Set the index of the member being edited
  };

  // Handle remove button click
  const handleRemoveClick = (index) => {
    const updatedMembers = teamMembers.filter((_, i) => i !== index);
    setTeamMembers(updatedMembers);
  };

  return (
    <div>
      <Navbar />
      <div className="team-management-container">
        <div className="team-management-content">
          <Typography variant="h2" align="center" color="error" gutterBottom>
            Team Management
          </Typography>

          {/* Team Table */}
          <div className="team-table-section">
            <table className="team-table">
              <thead>
                <tr>
                  <th>Player Name</th>
                  <th>Age</th>
                  <th>Role</th>
                  <th>Matches Played</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {teamMembers.map((member, index) => (
                  <tr key={index}>
                    <td>{member.name}</td>
                    <td>{member.age}</td>
                    <td>{member.role}</td>
                    <td>{member.matchesPlayed}</td>
                    <td>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleEditClick(index)}
                        className="action-button edit"
                      >
                        Edit
                      </Button>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleRemoveClick(index)}
                        className="action-button remove"
                      >
                        Remove
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Add or Edit Member */}
          <div className="add-member-section">
            <Typography variant="h3" align="center" color="error" gutterBottom>
              {editingIndex !== null ? "Edit Member" : "Add New Member"}
            </Typography>
            <form onSubmit={handleFormSubmit}>
              <input
                type="text"
                name="name"
                value={newMember.name}
                onChange={handleInputChange}
                placeholder="Name"
                className="input-field"
                required
              />
              <input
                type="number"
                name="age"
                value={newMember.age}
                onChange={handleInputChange}
                placeholder="Age"
                className="input-field"
                required
                min="0"
              />
              <input
                type="text"
                name="role"
                value={newMember.role}
                onChange={handleInputChange}
                placeholder="Role"
                className="input-field"
                required
              />
              <input
                type="number"
                name="matchesPlayed"
                value={newMember.matchesPlayed}
                onChange={handleInputChange}
                placeholder="Matches Played"
                className="input-field"
                required
                min="0"
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className="action-button add"
              >
                {editingIndex !== null ? "Update Member" : "Add Member"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamManagement;
