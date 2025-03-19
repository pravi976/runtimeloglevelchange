import React from 'react';
import { useNavigate } from 'react-router-dom';

function BackButton() {
  const navigate = useNavigate();

  return (
    <button
      className="link-button"
      style={{ marginBottom: '20px' }}
      onClick={() => navigate(-1)}
    >
      ← Back
    </button>
  );
}

export default BackButton;