// File: src/components/ExecutionLog.jsx
import React from 'react';
import { useOmega } from '../context/OmegaContext';

export function ExecutionLog() {
  const { executionLog } = useOmega();

  return (
    <div className="mt-8 p-4 border rounded bg-white">
      <h3 className="font-semibold mb-2">Execution Log</h3>
      <ul className="text-sm space-y-1 max-h-40 overflow-y-auto">
        {executionLog.map((log, idx) => (
          <li key={idx} className="text-gray-700">{log}</li>
        ))}
      </ul>
    </div>
  );
}
