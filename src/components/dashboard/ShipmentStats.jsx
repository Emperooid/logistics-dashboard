// src/components/Dashboard/ShipmentStats.jsx
import React from 'react';
import './ShipmentStats.css';

const ShipmentStats = ({ shipments }) => {
  // Calculate stats
  const totalShipments = shipments.length;
  
  const inTransit = shipments.filter(s => s.status === 'in-transit').length;
  const delivered = shipments.filter(s => s.status === 'delivered').length;
  const delayed = shipments.filter(s => s.status === 'delayed').length;
  const pending = shipments.filter(s => s.status === 'pending').length;
  
  // Calculate percentage for in-transit
  const inTransitPercentage = totalShipments ? Math.round((inTransit / totalShipments) * 100) : 0;
  
  return (
    <>
      <div className="stat-card">
        <div className="stat-card-title">Total Shipments</div>
        <div className="stat-card-value">{totalShipments}</div>
      </div>
      
      <div className="stat-card">
        <div className="stat-card-title">In Transit</div>
        <div className="stat-card-value">{inTransit}</div>
        <div className="stat-card-percentage">{inTransitPercentage}%</div>
      </div>
      
      <div className="stat-card">
        <div className="stat-card-title">Delivered</div>
        <div className="stat-card-value">{delivered}</div>
      </div>
      
      <div className="stat-card">
        <div className="stat-card-title">Delayed</div>
        <div className="stat-card-value">{delayed}</div>
      </div>
    </>
  );
};

export default ShipmentStats;