import React from "react";
import { AppBar, Toolbar, Typography, Button, IconButton } from "@mui/material";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import { NavLink } from "react-router-dom";
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
      <Button color="inherit" component={NavLink} to="/homepage">
        Home
      </Button>

      {/* Dashboard Link */}
          <Button color="inherit" component={NavLink} to="/dashboard">
            Dashboard
          </Button>
          <Button color="inherit" component={NavLink} to="/teamManagement">
            Team Management
          </Button>
          <Button color="inherit" component={NavLink} to="/matchScheduler">
            Match Scheduler
          </Button>
          <Button color="inherit" component={NavLink} to="/store">
            Store
          </Button>
          <Button color="inherit" component={NavLink} to="/reports">
            Stats & Reports
          </Button>
          <Button color="inherit" component={NavLink} to="/signin">
            Logout
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
