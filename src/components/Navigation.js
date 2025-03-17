import React from 'react';
import { Link } from 'react-router-dom';

function Navigation() {
  return (
    <nav className="nav-menu">
      <Link to="/" className="nav-link">Logger Dashboard</Link>
      <Link to="/settings" className="nav-link">Settings</Link>
    </nav>
  );
}

export default Navigation;