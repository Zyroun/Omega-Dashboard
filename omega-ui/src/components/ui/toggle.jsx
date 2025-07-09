import React from 'react';

export const Toggle = ({ enabled, onToggle, label }) => (
  <div className="flex items-center space-x-4">
    <label>{label}</label>
    <button
      onClick={onToggle}
      className={`w-12 h-6 rounded-full transition-colors duration-300 ${enabled ? 'bg-green-500' : 'bg-gray-300'}`}
    >
      <span
        className={`block w-5 h-5 rounded-full bg-white shadow transform transition-transform duration-300 ${enabled ? 'translate-x-6' : 'translate-x-1'}`}
      ></span>
    </button>
  </div>
);
