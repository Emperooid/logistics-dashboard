// src/components/Dashboard/ShipmentTable.jsx
import React, { useState, useCallback, useMemo } from 'react';
import './ShipmentTable.css';
import { getStatusColor } from '../../data/mockData';

const ShipmentRow = React.memo(({ shipment }) => {
  return (
    <tr>
      <td>{shipment.id}</td>
      <td>{shipment.origin}</td>
      <td>{shipment.destination}</td>
      <td>
        <span 
          className="status-badge"
          style={{ backgroundColor: getStatusColor(shipment.status) }}
        >
          {shipment.status}
        </span>
      </td>
      <td>{new Date(shipment.estimatedDelivery).toLocaleDateString()}</td>
    </tr>
  );
});

const ShipmentTable = ({ shipments }) => {
  const [sortField, setSortField] = useState('id');
  const [sortDirection, setSortDirection] = useState('asc');

  const handleSort = useCallback((field) => {
    setSortField(prevField => {
      if (prevField === field) {
        setSortDirection(prevDirection => prevDirection === 'asc' ? 'desc' : 'asc');
        return field;
      } else {
        setSortDirection('asc');
        return field;
      }
    });
  }, []);

  const sortedShipments = useMemo(() => {
    return [...shipments].sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];
      
      if (sortDirection === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return bValue < aValue ? -1 : bValue > aValue ? 1 : 0;
      }
    });
  }, [shipments, sortField, sortDirection]);

  const renderSortIndicator = useCallback((field) => {
    if (sortField === field) {
      return sortDirection === 'asc' ? ' ↑' : ' ↓';
    }
    return '';
  }, [sortField, sortDirection]);

  return (
    <div className="shipment-table-container">
      <h2>Shipments</h2>
      <div className="shipment-table-wrapper">
        <table className="shipment-table">
          <thead>
            <tr>
              <th onClick={() => handleSort('id')}>
                ID {renderSortIndicator('id')}
              </th>
              <th onClick={() => handleSort('origin')}>
                Origin {renderSortIndicator('origin')}
              </th>
              <th onClick={() => handleSort('destination')}>
                Destination {renderSortIndicator('destination')}
              </th>
              <th onClick={() => handleSort('status')}>
                Status {renderSortIndicator('status')}
              </th>
              <th onClick={() => handleSort('estimatedDelivery')}>
                ETA {renderSortIndicator('estimatedDelivery')}
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedShipments.map((shipment) => (
              <ShipmentRow key={shipment.id} shipment={shipment} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default React.memo(ShipmentTable);