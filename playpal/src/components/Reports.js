import React, { useState } from "react";
import {
  Button,
  Grid,
  Card,
  CardContent,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Alert,
} from "@mui/material";
import {
  BarChart,
  Bar,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import Navbar from "./navbar";
import "../styles/stat_reports.css";

const Reports = () => {
  const [team, setTeam] = useState("");
  const [player, setPlayer] = useState("");
  const [match, setMatch] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showGraphs, setShowGraphs] = useState({
    teamPerformance: false,
    playerPerformance: false,
  });

  // Example data
  const performanceDataByTeam = [
    { name: "Match 1", performance: 80 },
    { name: "Match 2", performance: 60 },
    { name: "Match 3", performance: 75 },
  ];

  const performanceDataByPlayer = [
    { name: "Match 1", performance: 90 },
    { name: "Match 2", performance: 70 },
    { name: "Match 3", performance: 85 },
  ];

  const financialData = [
    { name: "Income", value: 12000 },
    { name: "Expenditure", value: 8000 },
    { name: "Profit", value: 4000 },
  ];

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    if (name === "team") setTeam(value);
    if (name === "player") setPlayer(value);
    if (name === "match") setMatch(value);
  };

  const handleFilterSubmit = () => {
    if (!team && !player && !match) {
      setErrorMessage("Please select a filter!");
      return;
    }

    setErrorMessage("");
    setShowGraphs({
      teamPerformance: !!team,
      playerPerformance: !!player,
    });
  };

  return (
    <div>
      <Navbar />
      <div className="statistics-container">
        <div className="statistics-container1">
          <Typography
            variant="h4"
            align="center"
            style={{ margin: "20px 0" }}
            className="stat-title"
          >
            Statistics and Report
          </Typography>

          {errorMessage && (
            <Alert severity="error" style={{ marginBottom: "20px" }}>
              {errorMessage}
            </Alert>
          )}

          <Grid container spacing={3}>
            {/* Filters Section */}
            <Grid item xs={12} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h6">Filters</Typography>
                  <FormControl fullWidth style={{ marginBottom: "10px" }}>
                    <InputLabel>Team</InputLabel>
                    <Select
                      value={team}
                      name="team"
                      onChange={handleFilterChange}
                      label="Team"
                    >
                      <MenuItem value="Team A">Team A</MenuItem>
                      <MenuItem value="Team B">Team B</MenuItem>
                      <MenuItem value="Team C">Team C</MenuItem>
                    </Select>
                  </FormControl>

                  <FormControl fullWidth style={{ marginBottom: "10px" }}>
                    <InputLabel>Player</InputLabel>
                    <Select
                      value={player}
                      name="player"
                      onChange={handleFilterChange}
                      label="Player"
                    >
                      <MenuItem value="Player 1">Player 1</MenuItem>
                      <MenuItem value="Player 2">Player 2</MenuItem>
                      <MenuItem value="Player 3">Player 3</MenuItem>
                    </Select>
                  </FormControl>

                  <FormControl fullWidth style={{ marginBottom: "20px" }}>
                    <InputLabel>Match</InputLabel>
                    <Select
                      value={match}
                      name="match"
                      onChange={handleFilterChange}
                      label="Match"
                    >
                      <MenuItem value="Match 1">Match 1</MenuItem>
                      <MenuItem value="Match 2">Match 2</MenuItem>
                      <MenuItem value="Match 3">Match 3</MenuItem>
                    </Select>
                  </FormControl>

                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleFilterSubmit}
                    fullWidth
                  >
                    Apply Filters
                  </Button>
                </CardContent>
              </Card>
            </Grid>

            {/* Graphs Section */}
            <Grid item xs={12} md={8}>
              {/* Financial Chart (always displayed) */}
              <Card style={{ marginBottom: "20px" }}>
                <CardContent>
                  <Typography variant="h6">Financial Summary</Typography>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={financialData}
                        dataKey="value"
                        nameKey="name"
                        outerRadius={80}
                        fill="#8884d8"
                        label
                      >
                        {financialData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={index % 2 === 0 ? "#82ca9d" : "#ffbb28"}
                          />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Team Performance Graph */}
              {showGraphs.teamPerformance && (
                <Card style={{ marginBottom: "20px" }}>
                  <CardContent>
                    <Typography variant="h6">Team Performance</Typography>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={performanceDataByTeam}>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="performance" fill="#8884d8" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              )}

              {/* Player Performance Graph */}
              {showGraphs.playerPerformance && (
                <Card>
                  <CardContent>
                    <Typography variant="h6">Player Performance</Typography>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={performanceDataByPlayer}>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="performance" fill="#82ca9d" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              )}
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  );
};

export default Reports;
