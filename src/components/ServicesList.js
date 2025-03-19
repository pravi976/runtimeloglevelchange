import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import BackButton from './BackButton';
import './ServicesList.css';

function ServicesList() {
  const { app } = useParams();
  const navigate = useNavigate();
  const services = {
    'C6.4': [
      { id: 1, name: 'Authentication Service', description: 'User authentication and authorization' },
      { id: 2, name: 'Data Processing Service', description: 'Core data processing functionality' },
      { id: 3, name: 'Notification Service', description: 'Handles system notifications' }
    ],
    'C2.4': [
      { id: 1, name: 'API Gateway', description: 'API routing and management' },
      { id: 2, name: 'User Service', description: 'User management operations' }
    ],
    'C4': [
      { id: 1, name: 'Monitoring Service', description: 'System monitoring and alerts' },
      { id: 2, name: 'Reporting Service', description: 'Report generation and management' }
    ],
    'GPDE1.10': [
      { id: 1, name: 'Data Integration', description: 'Data integration service' },
      { id: 2, name: 'Analytics Service', description: 'Data analytics and processing' }
    ]
  };

  if (!services[app]) {
    return <div className="logger-dashboard">
      <BackButton />
      <h1>No services found for {app}</h1>
    </div>;
  }

  return (
    <div className="services-page">
      <div className="page-header">
        <h1>{app} Services</h1>
      </div>
      <BackButton />
      <div className="services-container app-grid">
        {services[app].map((service) => (
          <div key={service.id} className="app-card">
            <h2>{service.name}</h2>
            <p>{service.description}</p>
            <div className="link-container">
              <button
                className="primary-button"
                onClick={() => navigate(`/logger/${app}/service/${service.id}/logs`)}
              >
                Click here to view/change log level
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ServicesList;