import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import LoadingScreen from './components/UI/LoadingScreen';
import './App.css';

// Lazy load components
const Dashboard = lazy(() => import('./components/dashboard/Dashboard'));

// const ShipmentDetails = lazy(() => import('./components/ShipmentDetails/ShipmentDetails'));
// const Settings = lazy(() => import('./components/Settings/Settings'));
const Layout = lazy(() => import('./components/Layout/Layout'));

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Suspense fallback={<LoadingScreen />}>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Dashboard />} />
              {/* <Route path="shipment/:id" element={<ShipmentDetails />} />
              <Route path="settings" element={<Settings />} /> */}
            </Route>
          </Routes>
        </Suspense>
      </Router>
    </ThemeProvider>
  );
}

export default App;