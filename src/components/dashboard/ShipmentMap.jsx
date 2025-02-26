// src/components/Dashboard/ShipmentMap.jsx
import React from 'react';
import './ShipmentMap.css';
import { getStatusColor } from '../../data/mockData';

// Simple mock map component 
// In a real app, we would integrate with a mapping library like Leaflet or Google Maps
const ShipmentMap = ({ shipments }) => {
  // Mock map dimensions for our simplified version
  const mapWidth = 600;
  const mapHeight = 300;
  
  // Function to convert lat/lng to x,y coordinates for our simplified map
  // This is a very simplified mapping just for visualization purposes
  const getCoordinates = (lat, lng) => {
    // Map latitude (-90 to 90) to y coordinate (0 to mapHeight)
    const y = mapHeight - ((lat + 90) / 180 * mapHeight);
    
    // Map longitude (-180 to 180) to x coordinate (0 to mapWidth)
    const x = (lng + 180) / 360 * mapWidth;
    
    return { x, y };
  };
  
  return (
    <div className="shipment-map-container">
      <h2>Shipment Locations</h2>
      <div className="map-wrapper">
        <svg width="100%" height="100%" viewBox={`0 0 ${mapWidth} ${mapHeight}`} preserveAspectRatio="xMidYMid meet">
          {/* Simple map background */}
          <rect x="0" y="0" width={mapWidth} height={mapHeight} fill="#f0f8ff" />
          
          {/* Draw simplified continent outlines */}
          <path d="M100,100 Q200,50 300,100 T500,120" fill="none" stroke="#ccc" strokeWidth="2" />
          <path d="M50,150 Q150,180 250,150 T450,170" fill="none" stroke="#ccc" strokeWidth="2" />
          
          {/* Plot shipment locations */}
          {shipments.map((shipment) => {
            const { lat, lng } = shipment.currentLocation;
            const { x, y } = getCoordinates(lat, lng);
            
            return (
              <g key={shipment.id}>
                <circle 
                  cx={x} 
                  cy={y} 
                  r="6" 
                  fill={getStatusColor(shipment.status)}
                  stroke="#fff"
                  strokeWidth="2"
                />
                <title>{`${shipment.id}: ${shipment.origin} to ${shipment.destination}`}</title>
              </g>
            );
          })}
        </svg>
        
        {/* Map legend */}
        <div className="map-legend">
          <div className="legend-item">
            <span className="legend-dot" style={{ backgroundColor: getStatusColor('in-transit') }}></span>
            In Transit
          </div>
          <div className="legend-item">
            <span className="legend-dot" style={{ backgroundColor: getStatusColor('delivered') }}></span>
            Delivered
          </div>
          <div className="legend-item">
            <span className="legend-dot" style={{ backgroundColor: getStatusColor('delayed') }}></span>
            Delayed
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShipmentMap;