// src/components/Layout/Sidebar.jsx
import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(window.innerWidth <= 768);
  const [showHamburger, setShowHamburger] = useState(window.innerWidth <= 768);
  
  // Add window resize handler to show/hide hamburger menu
  useEffect(() => {
    const handleResize = () => {
      setShowHamburger(window.innerWidth <= 768);
      
      // Auto-collapse on small screens
      if (window.innerWidth <= 768) {
        setCollapsed(true);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };
  
  return (
    <>
      {/* Hamburger menu for mobile */}
      {showHamburger && (
        <button 
          className={`hamburger-menu ${!collapsed ? 'active' : ''}`} 
          onClick={toggleSidebar}
          aria-label="Toggle navigation menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      )}
      
      <aside className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
        {!showHamburger && (
          <button className="collapse-button" onClick={toggleSidebar}>
            {collapsed ? '→' : '←'}
          </button>
        )}
        
        <nav className="sidebar-nav">
          <NavLink to="/" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
            <div className="nav-icon">📊</div>
            {!collapsed && <span>Dashboard</span>}
          </NavLink>
          
          <NavLink to="/shipments" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
            <div className="nav-icon">🚚</div>
            {!collapsed && <span>Shipments</span>}
          </NavLink>
          
          <NavLink to="/analytics" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
            <div className="nav-icon">📈</div>
            {!collapsed && <span>Analytics</span>}
          </NavLink>
          
          <NavLink to="/customers" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
            <div className="nav-icon">👥</div>
            {!collapsed && <span>Customers</span>}
          </NavLink>
          
          <NavLink to="/settings" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
            <div className="nav-icon">⚙️</div>
            {!collapsed && <span>Settings</span>}
          </NavLink>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;