// File: src/components/dashboard/AgentStatus.jsx

import React from 'react';
import PropTypes from 'prop-types';
import './AgentStatus.css';

const AgentStatus = ({ name, status, lastUpdated }) => {
  const getStatusClass = () => {
    switch (status) {
      case 'active':
        return 'status-active';
      case 'idle':
        return 'status-idle';
      case 'error':
        return 'status-error';
      default:
        return 'status-unknown';
    }
  };

  return (
    <div className="agent-status-card">
      <h3 className="agent-name">{name}</h3>
      <div className={`status-indicator ${getStatusClass()}`}>
        <span>{status.toUpperCase()}</span>
      </div>
      <div className="last-updated">
        Last Updated: {new Date(lastUpdated).toLocaleString()}
      </div>
    </div>
  );
};

AgentStatus.propTypes = {
  name: PropTypes.string.isRequired,
  status: PropTypes.oneOf(['active', 'idle', 'error', 'unknown']).isRequired,
  lastUpdated: PropTypes.string.isRequired,
};

export default AgentStatus;
