// File: src/components/dashboard/AgentControl.jsx

import React from 'react';
import PropTypes from 'prop-types';
import './AgentControl.css';

const AgentControl = ({ name, isActive, onStart, onStop, onRestart }) => {
  return (
    <div className="agent-control-container">
      <h3>{name}</h3>
      <div className="agent-control-buttons">
        <button
          className="start-btn"
          onClick={() => onStart(name)}
          disabled={isActive}
        >
          Start
        </button>
        <button
          className="stop-btn"
          onClick={() => onStop(name)}
          disabled={!isActive}
        >
          Stop
        </button>
        <button
          className="restart-btn"
          onClick={() => onRestart(name)}
        >
          Restart
        </button>
      </div>
    </div>
  );
};

AgentControl.propTypes = {
  name: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
  onStart: PropTypes.func.isRequired,
  onStop: PropTypes.func.isRequired,
  onRestart: PropTypes.func.isRequired,
};

export default AgentControl;
