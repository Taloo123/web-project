import React, { useEffect, useState } from "react";
import { Container, Typography, Button } from "@mui/material";
import Navbar from "./navbar"; // Navbar for navigation
import "../styles/teamManagement.css"; // Separate CSS for Team Management styling
import axios from "axios"; // Axios for API calls

const TeamManagement = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [newMember, setNewMember] = useState({
    name: "",
    age: "",
    role: "",
    matchesPlayed: "",
  });
  const [editingIndex, setEditingIndex] = useState(null);

  const API_URL = "http://localhost:5000/api/team"; // Replace with your backend URL
  const token = localStorage.getItem("token"); // Replace with your auth token retrieval method

  const name = localStorage.getItem("userName");
  const date = Date.now();

  // Fetch team members on component mount
  useEffect(() => {
    fetchTeamMembers();
    document.title = "Team Management";
  }, []);

  const fetchTeamMembers = async () => {
    try {
      const response = await axios.get(API_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTeamMembers(response.data);
    } catch (error) {
      console.error("Error fetching team members:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMember({ ...newMember, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const notification = {
      message: `You added a player`,
      name: name,
    };

    try {
      if (editingIndex !== null) {
        // Edit existing member
        const updatedMember = {
          ...newMember,
          matchesPlayed: parseInt(newMember.matchesPlayed, 10),
          age: parseInt(newMember.age, 10),
        };

        await axios.put(`${API_URL}/${teamMembers[editingIndex]._id}`, updatedMember, {
          headers: { Authorization: `Bearer ${token}` },
        });

        fetchTeamMembers(); // Refresh data
        setEditingIndex(null);
      } else {
        // Add new member
        await axios.post(API_URL, {
          ...newMember,
          matchesPlayed: parseInt(newMember.matchesPlayed, 10),
          age: parseInt(newMember.age, 10),
        }, {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log("Notification: ", notification);
        await axios.post('http://localhost:5000/api/StoreNotification', notification);

        fetchTeamMembers(); // Refresh data
      }

      setNewMember({ name: "", age: "", role: "", matchesPlayed: "" });
    } catch (error) {
      console.error("Error saving team member:", error);
    }
  };

  const handleEditClick = (index) => {
    setNewMember(teamMembers[index]);
    setEditingIndex(index);
  };

  const handleRemoveClick = async (index) => {
    try {
      await axios.delete(`${API_URL}/${teamMembers[index]._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      fetchTeamMembers(); // Refresh data
    } catch (error) {
      console.error("Error deleting team member:", error);
    }
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
                        color="secondary"
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
