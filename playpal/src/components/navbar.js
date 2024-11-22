import React from "react";
import { AppBar, Toolbar, Typography, Button, IconButton } from "@mui/material";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import { Link } from "react-router-dom";
import "../styles/navbar.css";


const Navbar = () => {
  return (
    <AppBar position="static" className="navbar">
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
        {/* Logo and Title at the beginning */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <IconButton edge="start" color="inherit" aria-label="logo">
            <SportsSoccerIcon fontSize="large" />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ marginLeft: '10px' }}>
            PlayPal
          </Typography>
        </div>

        {/* Links at the end */}
        <div className="nav-links" style={{ display: 'flex' , marginRight: '30px'}}>
            {/* Home Link */}
      <Button color="inherit" component={Link} to="/">
        Home
      </Button>

      {/* Dashboard Link */}
      <Button color="inherit" component={Link} to="/dashboard">
        Dashboard
      </Button>
          <Button color="inherit" component={Link} to="/team-management">
            Team Management
          </Button>
          <Button color="inherit" component={Link} to="/match-scheduler">
            Match Scheduler
          </Button>
          <Button color="inherit" component={Link} to="/store">
            Store
          </Button>
          <Button color="inherit" component={Link} to="/statistics-reports">
            Stats & Reports
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
