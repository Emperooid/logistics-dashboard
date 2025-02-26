// src/components/Layout/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import ThemeToggle from '../UI/ThemeToggle';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">
          <h1>EmperooidTrack</h1>
        </Link>
      </div>
      
      <div className="navbar-actions">
        <div className="search-bar">
          <input type="text" placeholder="Search shipments..." />
        </div>
        
        <ThemeToggle />
        
        <div className="user-profile">
          <img src="/avatar.jpg" alt="User avatar" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;