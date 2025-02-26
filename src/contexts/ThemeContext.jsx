// src/contexts/ThemeContext.jsx
import React, { createContext, useState, useEffect, useContext } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    // Try to get theme from localStorage
    const savedTheme = localStorage.getItem('theme');
    // Check if user prefers dark mode
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    return savedTheme || (prefersDark ? 'dark' : 'light');
  });

  useEffect(() => {
    // Save theme to localStorage
    localStorage.setItem('theme', theme);
    
    // Apply theme to body element
    document.body.setAttribute('data-theme', theme);
    
    // Set CSS variables based on theme
    const root = document.documentElement;
    
    if (theme === 'dark') {
      root.style.setProperty('--bg-color', '#121212');
      root.style.setProperty('--card-bg-color', '#1e1e1e');
      root.style.setProperty('--text-primary', '#ffffff');
      root.style.setProperty('--text-secondary', '#a0a0a0');
      root.style.setProperty('--border-color', '#333333');
      root.style.setProperty('--primary-color', '#90caf9');
      root.style.setProperty('--table-header-bg', '#2c2c2c');
      root.style.setProperty('--table-header-hover-bg', '#3c3c3c');
      root.style.setProperty('--table-row-hover-bg', '#2a2a2a');
      root.style.setProperty('--input-bg', '#2c2c2c');
      root.style.setProperty('--map-bg', '#1a1a1a');
    } else {
      root.style.setProperty('--bg-color', '#f5f5f5');
      root.style.setProperty('--card-bg-color', '#ffffff');
      root.style.setProperty('--text-primary', '#333333');
      root.style.setProperty('--text-secondary', '#666666');
      root.style.setProperty('--border-color', '#e0e0e0');
      root.style.setProperty('--primary-color', '#1976d2');
      root.style.setProperty('--table-header-bg', '#f0f0f0');
      root.style.setProperty('--table-header-hover-bg', '#e0e0e0');
      root.style.setProperty('--table-row-hover-bg', '#f9f9f9');
      root.style.setProperty('--input-bg', '#ffffff');
      root.style.setProperty('--map-bg', '#f0f8ff');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};