import React from 'react';
import { Link } from 'react-router-dom';

function Navigation() {
  return (
    <nav className="nav-menu">
      <Link to="/" className="nav-link">Home</Link>
    </nav>
  );
}

export default Navigation;