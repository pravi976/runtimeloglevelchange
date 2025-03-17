import React from 'react';
import { useNavigate } from 'react-router-dom';
import { loggerApplications } from '../config/loggerApps';

function LoggerDashboard() {
  const navigate = useNavigate();

  return (
    <div className="logger-dashboard">
      <h1>CPUDCTV Loggers Dashboard</h1>
      <div className="app-grid">
        {loggerApplications.map(app => (
          <div key={app.id} className="app-card">
            <h2>{app.name}</h2>
            <p>{app.description}</p>
            <div className="link-container">
              {app.links.map((link, index) => (
                <button
                  key={index}
                  className="link-button"
                  onClick={() => navigate(link.path)}
                >
                  {link.title}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LoggerDashboard;