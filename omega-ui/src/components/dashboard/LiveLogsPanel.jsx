// File: src/components/dashboard/LiveLogsPanel.jsx

import React, { useEffect, useState, useRef } from 'react';
import './LiveLogsPanel.css';
import { log, logError } from '../../utils/logger';

const LiveLogsPanel = () => {
  const [logs, setLogs] = useState([]);
  const logContainerRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      fetch('/api/logs/live')
        .then((res) => res.json())
        .then((data) => {
          setLogs(data);
        })
        .catch((err) => {
          logError(err, 'LiveLogsPanel');
        });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div className="live-logs-panel">
      <h3>🔍 Live Logs</h3>
      <div className="log-output" ref={logContainerRef}>
        {logs.map((logLine, idx) => (
          <div key={idx} className="log-line">
            {logLine}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LiveLogsPanel;
