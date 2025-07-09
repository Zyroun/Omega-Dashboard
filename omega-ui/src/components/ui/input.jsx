import React from 'react';

export const Input = ({ value, onChange, placeholder, type = 'text' }) => (
  <input
    type={type}
    className="w-full border border-gray-300 p-2 rounded shadow-sm"
    value={value}
    onChange={onChange}
    placeholder={placeholder}
  />
);
