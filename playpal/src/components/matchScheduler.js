import React, { useEffect, useState } from "react";
import Navbar from "./navbar";
import "../styles/matchScheduler.css";
import { Typography, Button, TextField } from "@mui/material";
import axios from "axios";

const MatchScheduler = () => {
  const [team1, setTeam1] = useState("");
  const [team2, setTeam2] = useState("");
  const [venue, setVenue] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [scheduledMatches, setScheduledMatches] = useState([]);
  const [notificationSent, setNotificationSent] = useState(false);

  const API_URL = "http://localhost:5000/api/matches"; // Replace with your backend URL
  const token = localStorage.getItem("token"); // Replace with your auth token retrieval method

  // Fetch scheduled matches on component mount
  useEffect(() => {
    fetchScheduledMatches();
  }, []);

  const fetchScheduledMatches = async () => {
    try {
      const response = await axios.get(API_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setScheduledMatches(response.data);
    } catch (error) {
      console.error("Error fetching scheduled matches:", error);
    }
  };

  const handleScheduleMatch = async (e) => {
    e.preventDefault();

    if (team1 && team2 && venue && date && time) {
      const newMatch = { team1, team2, venue, date, time };

      try {
        await axios.post(API_URL, newMatch, {
          headers: { Authorization: `Bearer ${token}` },
        });
        fetchScheduledMatches(); // Refresh match list
        // Clear form inputs
        setTeam1("");
        setTeam2("");
        setVenue("");
        setDate("");
        setTime("");
      } catch (error) {
        console.error("Error scheduling match:", error);
      }
    } else {
      alert("Please fill in all fields to schedule the match.");
    }
  };

  const handleSendNotification = async () => {
    try {
      await axios.post(
        `${API_URL}/send-notifications`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("Reminder notifications sent successfully!");
      setNotificationSent(true);
    } catch (error) {
      console.error("Error sending notifications:", error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="match-scheduler">
        <div className="match-scheduler-container">
          {/* Page Header */}
          <Typography
            variant="h4"
            align="center"
            color="error"
            className="match-scheduler__header"
            gutterBottom
          >
            Match Scheduler
          </Typography>

          {/* Match Scheduling Form */}
          <form onSubmit={handleScheduleMatch} className="match-scheduler__form">
            <TextField
              label="Team 1 Name"
              variant="outlined"
              value={team1}
              onChange={(e) => setTeam1(e.target.value)}
              fullWidth
              margin="normal"
              className="text-field"
              required
            />
            <TextField
              label="Team 2 Name"
              variant="outlined"
              value={team2}
              onChange={(e) => setTeam2(e.target.value)}
              fullWidth
              margin="normal"
              className="text-field"
              required
            />
            <TextField
              label="Venue"
              variant="outlined"
              value={venue}
              onChange={(e) => setVenue(e.target.value)}
              fullWidth
              margin="normal"
              className="text-field"
              required
            />
            <TextField
              label="Match Date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              fullWidth
              margin="normal"
              className="text-field"
              InputLabelProps={{
                shrink: true,
              }}
              required
            />
            <TextField
              label="Match Time"
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              fullWidth
              margin="normal"
              className="text-field"
              InputLabelProps={{
                shrink: true,
              }}
              required
            />
            <Button
              type="submit"
              variant="contained"
              className="match-scheduler__submit-btn"
            >
              Schedule Match
            </Button>
          </form>
        </div>

        {/* Calendar View */}
        <div className="match-scheduler__calendar">
          <Typography variant="h6" className="match-scheduler__calendar-header">
            Upcoming Matches
          </Typography>
          {scheduledMatches.length > 0 ? (
            scheduledMatches.map((match, index) => (
              <div key={index} className="match-scheduler__match-entry">
                <Typography variant="body1">
                  {`${match.date} - ${match.team1} vs ${match.team2} at ${match.venue} - ${match.time}`}
                </Typography>
              </div>
            ))
          ) : (
            <Typography variant="body2" className="match-scheduler__no-matches">
              No matches scheduled yet.
            </Typography>
          )}
        </div>

        {/* Notification Button */}
        <Button
          onClick={handleSendNotification}
          variant="contained"
          className={`match-scheduler__notification-btn ${
            notificationSent ? "match-scheduler__notification-btn--success" : ""
          }`}
        >
          {notificationSent ? "Reminders Sent" : "Send Match Reminders"}
        </Button>
      </div>
    </div>
  );
};

export default MatchScheduler;
