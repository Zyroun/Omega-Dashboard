// File: src/components/LiveLogs.jsx
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';

export function LiveLogs() {
  const [logs, setLogs] = useState(['Initializing Omega Core...', 'Awaiting Agent Execution...']);

  useEffect(() => {
    const interval = setInterval(() => {
      setLogs((prev) => [
        ...prev.slice(-9),
        `Ω [${new Date().toLocaleTimeString()}] Log event: Agent heartbeat active.`,
      ]);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="h-64 overflow-y-auto bg-black text-green-400 font-mono p-4">
      <h2 className="text-xl font-bold mb-2 text-white">Live Execution Logs</h2>
      {logs.map((log, idx) => (
        <div key={idx}>{log}</div>
      ))}
    </Card>
  );
}
