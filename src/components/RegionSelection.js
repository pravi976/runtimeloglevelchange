import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import BackButton from './BackButton';
import './RegionSelection.css';

const RegionSelection = () => {
  const { app, serviceId } = useParams();
  const navigate = useNavigate();

  const regions = [
    { id: 'AZ', name: 'AZ' },
    { id: 'LAS', name: 'LAS' },
  ];

  const handleRegionClick = (regionId) => {
    navigate(`/logger/${app}/service/${serviceId}/region/${regionId}/logs`);
  };

  return (
    <div className="region-selection-container">
      <BackButton />
      <h1>Select Region</h1>
      <div className="regions-grid">
        {regions.map((region) => (
          <div
            key={region.id}
            className="region-card"
            onClick={() => handleRegionClick(region.id)}
          >
            <h2>{region.name}</h2>
            <p>Click to view and manage log levels</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RegionSelection;