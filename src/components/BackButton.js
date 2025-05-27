import React from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import './BackButton.css';

function BackButton() {
  const navigate = useNavigate();
  const { app, serviceId, environmentId } = useParams();
  const location = useLocation();

  const handleBack = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Determine the previous page based on current route
    if (location.pathname === '/') {
      // On dashboard, no back navigation needed
      return;
    } else if (location.pathname.includes('/logs')) {
      // From logs page to regions page
      navigate(`/logger/${app}/service/${serviceId}/environment/${environmentId}/regions`);
    } else if (location.pathname.includes('/regions')) {
      // From regions page to environments page
      navigate(`/logger/${app}/service/${serviceId}/environments`);
    } else if (location.pathname.includes('/environments')) {
      // From environments page to services page
      navigate(`/logger/${app}/services`);
    } else if (location.pathname.includes('/services')) {
      // From services page to dashboard
      navigate('/');
    }
  };

  // Don't show back button on dashboard
  if (location.pathname === '/') {
    return null;
  }

  return (
    <button className="back-button" onClick={handleBack}>
      ← Back
    </button>
  );
}

export default BackButton;