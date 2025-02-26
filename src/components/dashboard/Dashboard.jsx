// src/components/Dashboard/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import ShipmentTable from './ShipmentTable';
import ShipmentMap from './ShipmentMap';
import ShipmentStats from './ShipmentStats';
import ShipmentFilters from './ShipmentFilters';
import { mockShipmentData } from '../../data/mockData';
import websocketService from '../../services/websocketService';
import Toast from '../UI/Toast';
import './Dashboard.css';

const Dashboard = () => {
  const [shipments, setShipments] = useState([]);
  const [filteredShipments, setFilteredShipments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    status: 'all',
    date: 'all',
  });
  const [connectionStatus, setConnectionStatus] = useState('disconnected');
  const [notification, setNotification] = useState(null);

  // Simulate fetching initial data
  useEffect(() => {
    // In a real app, this would be an API call
    setTimeout(() => {
      setShipments(mockShipmentData);
      setFilteredShipments(mockShipmentData);
      setLoading(false);
    }, 1000);
  }, []);

  // Connect to WebSocket and handle real-time updates
  useEffect(() => {
    // Subscribe to connection status changes
    const connectionUnsubscribe = websocketService.subscribe('connection', (data) => {
      setConnectionStatus(data.status);
    });
    
    // Subscribe to shipment updates
    const updateUnsubscribe = websocketService.subscribe('shipment_update', (data) => {
      setShipments(prevShipments => {
        // Find the updated shipment
        const updatedShipments = prevShipments.map(shipment => {
          if (shipment.id === data.shipmentId) {
            // Create a notification
            setNotification({
              type: 'info',
              message: `Shipment ${data.shipmentId} updated to ${data.status}`,
              duration: 5000,
            });
            
            // Update the shipment with new data
            return {
              ...shipment,
              status: data.status,
              updates: [
                ...shipment.updates,
                {
                  timestamp: data.timestamp,
                  status: data.status,
                  location: data.location,
                }
              ]
            };
          }
          return shipment;
        });
        
        return updatedShipments;
      });
    });
    
    // Connect to the WebSocket server
    websocketService.connect();
    
    // Clean up subscriptions when component unmounts
    return () => {
      connectionUnsubscribe();
      updateUnsubscribe();
      websocketService.disconnect();
    };
  }, []);

  // Apply filters when they change
  useEffect(() => {
    if (shipments.length === 0) return;

    let result = [...shipments];

    if (filters.status !== 'all') {
      result = result.filter(shipment => shipment.status === filters.status);
    }

    if (filters.date !== 'all') {
      // Add date filtering logic here
      const now = new Date();
      if (filters.date === 'day') {
        const oneDayAgo = new Date(now.setDate(now.getDate() - 1));
        result = result.filter(shipment => {
          const lastUpdate = shipment.updates.length ? new Date(shipment.updates[shipment.updates.length - 1].timestamp) : null;
          return lastUpdate && lastUpdate >= oneDayAgo;
        });
      } else if (filters.date === 'week') {
        const oneWeekAgo = new Date(now.setDate(now.getDate() - 7));
        result = result.filter(shipment => {
          const lastUpdate = shipment.updates.length ? new Date(shipment.updates[shipment.updates.length - 1].timestamp) : null;
          return lastUpdate && lastUpdate >= oneWeekAgo;
        });
      } else if (filters.date === 'month') {
        const oneMonthAgo = new Date(now.setMonth(now.getMonth() - 1));
        result = result.filter(shipment => {
          const lastUpdate = shipment.updates.length ? new Date(shipment.updates[shipment.updates.length - 1].timestamp) : null;
          return lastUpdate && lastUpdate >= oneMonthAgo;
        });
      }
    }

    setFilteredShipments(result);
  }, [filters, shipments]);

  const handleFilterChange = (newFilters) => {
    setFilters({ ...filters, ...newFilters });
  };

  const handleNotificationClose = () => {
    setNotification(null);
  };

  if (loading) {
    return <div className="dashboard-loading">Loading dashboard...</div>;
  }

  return (
    <div className="dashboard-container">
      {notification && (
        <Toast 
          type={notification.type}
          message={notification.message}
          duration={notification.duration}
          onClose={handleNotificationClose}
        />
      )}

      <div className="dashboard-header">
        <div>
          <h1>Logistics Dashboard</h1>
          <div className={`connection-status ${connectionStatus}`}>
            {connectionStatus === 'connected' ? 'Live Updates Active' : 'Connecting...'}
          </div>
        </div>
        <ShipmentFilters filters={filters} onFilterChange={handleFilterChange} />
      </div>
      
      <div className="dashboard-stats">
        <ShipmentStats shipments={filteredShipments} />
      </div>
      
      <div className="dashboard-main">
        <div className="dashboard-map">
          <ShipmentMap shipments={filteredShipments} />
        </div>
        
        <div className="dashboard-table">
          <ShipmentTable shipments={filteredShipments} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;