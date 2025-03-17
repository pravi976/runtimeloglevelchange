import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import LoggerDashboard from './components/LoggerDashboard';
import LoggerManagement from './components/LoggerManagement';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <span className="running-text">Fedex Log Level Management</span>
          <Navigation />
        </header>
        <main>
          <Routes>
            <Route path="/" element={<LoggerDashboard />} />
            <Route path="/logger/:app/:type" element={<LoggerManagement />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
