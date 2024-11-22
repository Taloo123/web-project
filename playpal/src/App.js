import React from "react";
import "./App.css";
// import Navbar from "./components/navbar"; // Navbar component
import HomePage from "./components/HomePage";
import Dashboard from "./components/dashboard"; // Dashboard component
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TeamManagement from "./components/teamManagement";
import MatchScheduler from "./components/matchScheduler";

function App() {
  return (
    <Router>
      <div className="App">
        {/* <NavigationLinks /> Navbar with links */}
        
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/teamManagement" element={<TeamManagement />} />
          <Route path="/matchScheduler" element={<MatchScheduler />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
