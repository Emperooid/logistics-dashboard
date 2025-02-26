// src/data/mockData.js
export const mockShipmentData = [
    {
      id: 'SHP-1001',
      origin: 'Los Angeles, CA',
      destination: 'New York, NY',
      status: 'in-transit',
      estimatedDelivery: '2025-03-01',
      currentLocation: {
        lat: 39.8283,
        lng: -98.5795,
      },
      customer: 'Acme Corp',
      carrier: 'FastShip Logistics',
      updates: [
        { timestamp: '2025-02-20T08:00:00', status: 'picked-up', location: 'Los Angeles, CA' },
        { timestamp: '2025-02-22T14:30:00', status: 'in-transit', location: 'Denver, CO' },
      ],
    },
    {
      id: 'SHP-1002',
      origin: 'Seattle, WA',
      destination: 'Miami, FL',
      status: 'delivered',
      estimatedDelivery: '2025-02-18',
      currentLocation: {
        lat: 25.7617,
        lng: -80.1918,
      },
      customer: 'Global Trade Inc',
      carrier: 'Ocean Freight Co',
      updates: [
        { timestamp: '2025-02-10T09:15:00', status: 'picked-up', location: 'Seattle, WA' },
        { timestamp: '2025-02-14T16:45:00', status: 'in-transit', location: 'Chicago, IL' },
        { timestamp: '2025-02-18T11:30:00', status: 'delivered', location: 'Miami, FL' },
      ],
    },
    {
      id: 'SHP-1003',
      origin: 'Chicago, IL',
      destination: 'Houston, TX',
      status: 'delayed',
      estimatedDelivery: '2025-02-28',
      currentLocation: {
        lat: 39.1054,
        lng: -94.5786,
      },
      customer: 'Midwest Suppliers',
      carrier: 'United Shipping',
      updates: [
        { timestamp: '2025-02-15T10:00:00', status: 'picked-up', location: 'Chicago, IL' },
        { timestamp: '2025-02-17T13:20:00', status: 'in-transit', location: 'St. Louis, MO' },
        { timestamp: '2025-02-19T09:45:00', status: 'delayed', location: 'Kansas City, MO' },
      ],
    },
    {
      id: 'SHP-1004',
      origin: 'Boston, MA',
      destination: 'San Francisco, CA',
      status: 'pending',
      estimatedDelivery: '2025-03-05',
      currentLocation: {
        lat: 42.3601,
        lng: -71.0589,
      },
      customer: 'East Coast Distributors',
      carrier: 'Pacific Routes',
      updates: [],
    },
    {
      id: 'SHP-1005',
      origin: 'Dallas, TX',
      destination: 'Atlanta, GA',
      status: 'in-transit',
      estimatedDelivery: '2025-02-27',
      currentLocation: {
        lat: 32.7767,
        lng: -96.7970,
      },
      customer: 'Southern Goods LLC',
      carrier: 'ExpressFreight',
      updates: [
        { timestamp: '2025-02-21T07:30:00', status: 'picked-up', location: 'Dallas, TX' },
      ],
    },
  ];
  
  export const getStatusColor = (status) => {
    const statusColors = {
      'picked-up': '#3498db',
      'in-transit': '#f39c12',
      'delivered': '#2ecc71',
      'delayed': '#e74c3c',
      'pending': '#95a5a6',
    };
    
    return statusColors[status] || '#95a5a6';
  };