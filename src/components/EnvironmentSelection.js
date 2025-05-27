import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import BackButton from './BackButton';
import './EnvironmentSelection.css';

function EnvironmentSelection() {
  const navigate = useNavigate();
  const { app, serviceId } = useParams();

  // Add environment list with descriptions
  const environments = [
    { 
      id: 'L1', 
      name: 'L1',
      description: 'Environment for local development and initial testing'
    },
    { 
      id: 'L2', 
      name: 'L2',
      description: 'Development environment for feature testing'
    },
    { 
      id: 'L3', 
      name: 'L3',
      description: 'End-to-end testing environment for integration tests'
    },
    { 
      id: 'L4', 
      name: 'L4',
      description: 'Quality Assurance environment for final testing'
    },
    { 
      id: 'Production', 
      name: 'Production',
      description: 'Live production environment - handle with care'
    }
  ];

  // Add click handler
  const handleEnvironmentClick = (environmentId) => {
    navigate(`/logger/${app}/service/${serviceId}/environment/${environmentId}/regions`);
  };

  return (
    <div className="environment-selection-container">
      <BackButton />
      <h1>Select Environment</h1>
      <div className="environments-grid">
        {environments.map((env) => (
          <div
            key={env.id}
            className="environment-card"
            onClick={() => handleEnvironmentClick(env.id)}
          >
            <h2>{env.name}</h2>
            <p>{env.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EnvironmentSelection;