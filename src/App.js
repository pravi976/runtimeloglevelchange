import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import LoggerDashboard from './components/LoggerDashboard';
import LoggerManagement from './components/LoggerManagement';
import ServicesList from './components/ServicesList';
import RegionSelection from './components/RegionSelection';
import EnvironmentSelection from './components/EnvironmentSelection';
import './App.css';

function App() {
  return (
    <Router future={{ v7_relativeSplatPath: true }}>
      <div className="App">
        <header className="App-header">
          <span>CPUDCTV Log Level Management</span>
          <Navigation />
        </header>
        <main>
          <Routes>
            <Route path="/" element={<LoggerDashboard />} />
            <Route path="/logger/:app/services" element={<ServicesList />} />
            <Route path="/logger/:app/service/:serviceId/environments" element={<EnvironmentSelection />} />
            <Route path="/logger/:app/service/:serviceId/environment/:environmentId/regions" element={<RegionSelection />} />
            <Route path="/logger/:app/service/:serviceId/region/:regionId/logs" element={<LoggerManagement />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
