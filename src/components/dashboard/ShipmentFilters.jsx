// src/components/Dashboard/ShipmentFilters.jsx
import React from 'react';
import './ShipmentFilters.css';

const ShipmentFilters = ({ filters, onFilterChange }) => {
  const handleStatusChange = (e) => {
    onFilterChange({ status: e.target.value });
  };
  
  const handleDateChange = (e) => {
    onFilterChange({ date: e.target.value });
  };
  
  return (
    <div className="shipment-filters">
      <div className="filter-group">
        <label htmlFor="status-filter">Status:</label>
        <select 
          id="status-filter" 
          value={filters.status} 
          onChange={handleStatusChange}
        >
          <option value="all">All</option>
          <option value="in-transit">In Transit</option>
          <option value="delivered">Delivered</option>
          <option value="delayed">Delayed</option>
          <option value="pending">Pending</option>
        </select>
      </div>
      
      <div className="filter-group">
        <label htmlFor="date-filter">Time Period:</label>
        <select 
          id="date-filter" 
          value={filters.date} 
          onChange={handleDateChange}
        >
          <option value="all">All Time</option>
          <option value="day">Today</option>
          <option value="week">Last 7 Days</option>
          <option value="month">Last 30 Days</option>
        </select>
      </div>
    </div>
  );
};

export default ShipmentFilters;