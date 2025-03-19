import React from 'react';
import { useNavigate } from 'react-router-dom';
import './BackButton.css';

function BackButton() {
  const navigate = useNavigate();

  const handleBack = (e) => {
    e.preventDefault();
    e.stopPropagation();
    navigate('/', { replace: true });
  };

  return (
    <button className="back-button" onClick={handleBack}>
      ← Back
    </button>
  );
}

export default BackButton;