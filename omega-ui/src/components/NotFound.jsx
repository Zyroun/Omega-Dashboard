// File: src/components/NotFound.jsx

import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div style={{ textAlign: 'center', padding: '4rem' }}>
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for doesn’t exist or has been moved.</p>
      <Link to="/">Go back to Dashboard</Link>
    </div>
  );
};

export default NotFound;
