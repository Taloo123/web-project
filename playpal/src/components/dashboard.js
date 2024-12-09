import React, { useState, useEffect } from "react";
import Navbar from "./navbar"; // Import Navbar to integrate with Dashboard
import axios from "axios"; // For making API requests
import "../styles/dashboard.css"; // Centralized CSS for Dashboard styling

const Dashboard = () => {
  const [userData, setUserData] = useState({
    team: "",
    role: "",
    matchesPlayed: 0,
  });
  const [notifications, setNotifications] = useState([]);

  const userName = localStorage.getItem("userName");
  console.log("Username: ", userName); // Check if userName is retrieved correctly

  useEffect(() => {
    // Fetch user data from the backend API by name
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/teamMemberByName/${userName}`);
        setUserData(response.data); // Store team, role, and matchesPlayed
      } catch (error) {
        console.error("Error fetching team member data:", error);
      }
    };

    fetchUserData();
  }, [userName]);

  useEffect(() => {
    // Fetch notifications for the user when the component mounts
    const fetchNotifications = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/notifications/${userName}`);
        setNotifications(response.data); // Assuming response data is an array of notification messages
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    fetchNotifications();
  }, [userName]);

  return (
    <div className="navbar">
      <Navbar />
      <div className="dashboard-container">
        {/* Dashboard Main Content */}
        <div className="dashboard-content">
          {/* Profile Section */}
          <div className="dashboard-section profile">
            <h2>My Profile</h2>
            <p>Team: {userData.team}</p>
            <p>Role: {userData.role}</p>
            <p>Matches Played: {userData.matchesPlayed}</p>
          </div>

          {/* Notifications Panel */}
          <div className="dashboard-section notifications">
            <h2>Notifications</h2>
            <ul>
              {/* Render notifications dynamically */}
              {notifications.length > 0 ? (
                notifications.map((notification, index) => (
                  <li key={index}>{notification}</li>
                ))
              ) : (
                <li>No new notifications</li>
              )}
            </ul>
          </div>

          {/* Upcoming Matches Section */}
          <div className="dashboard-section upcoming-matches">
            <h2>Upcoming Matches</h2>
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Venue</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>25th Nov</td>
                  <td>3:00 PM</td>
                  <td>City Stadium</td>
                </tr>
                <tr>
                  <td>30th Nov</td>
                  <td>5:00 PM</td>
                  <td>Sports Arena</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Financial Overview Section */}
          <div className="dashboard-section financial-overview">
            <h2>Financial Overview</h2>
            <p>Revenue: $5,000</p>
            <p>Expenses: $2,000</p>
            <p>Net Profit: $3,000</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
