// File: src/components/dashboard/SystemStatus.jsx

import React, { useEffect, useState } from 'react';
import { logSystemHealth, logError } from '../../utils/logger';

const SystemStatus = () => {
  const [status, setStatus] = useState({
    health: 'Loading...',
    uptime: 'Fetching...',
    cpuUsage: 0,
    memoryUsage: 0,
    agentsOnline: 0,
    errorsLastHour: 0
  });

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const res = await fetch('/api/system/status');
        const data = await res.json();
        setStatus(data);
        logSystemHealth('System status fetched', data);
      } catch (error) {
        logError(error, 'SystemStatus');
      }
    };

    fetchStatus();
    const interval = setInterval(fetchStatus, 30000); // 30s refresh
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="system-status-card">
      <h3>🧠 System Status</h3>
      <ul>
        <li><strong>Health:</strong> {status.health}</li>
        <li><strong>Uptime:</strong> {status.uptime}</li>
        <li><strong>CPU Usage:</strong> {status.cpuUsage}%</li>
        <li><strong>Memory Usage:</strong> {status.memoryUsage}%</li>
        <li><strong>Agents Online:</strong> {status.agentsOnline}</li>
        <li><strong>Errors (Last Hour):</strong> {status.errorsLastHour}</li>
      </ul>
    </div>
  );
};

export default SystemStatus;
