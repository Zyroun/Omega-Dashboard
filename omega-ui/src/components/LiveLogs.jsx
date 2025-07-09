import React, { useState } from 'react';

export function LiveLogs() {
  const [logs, setLogs] = useState([
    'System initialized...',
    'Awaiting agent commands...'
  ]);

  return (
    <div className="bg-black text-green-400 p-4 rounded h-64 overflow-y-auto text-sm">
      <h2 className="text-xl font-semibold text-white mb-2">Live Logs</h2>
      <div className="space-y-1">
        {logs.map((log, index) => (
          <div key={index}>{log}</div>
        ))}
      </div>
    </div>
  );
}
