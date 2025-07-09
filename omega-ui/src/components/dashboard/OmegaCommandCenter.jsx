// src/components/dashboard/OmegaCommandCenter.jsx
import React, { useEffect, useState } from 'react';
import AgentControl from './AgentControl';
import AgentStatus from './AgentStatus';
import APICredentialsForm from './APICredentialsForm';
import BillingPanel from './BillingPanel';
import LiveLogsPanel from './LiveLogsPanel';
import SystemStatus from './SystemStatus';
import AgentObserverPanel from './AgentObserverPanel';
import MonetisationOverview from './MonetisationOverview';
import { fetchSystemMetrics } from '../../api/agentRouter';
import './OmegaCommandCenter.css';

const OmegaCommandCenter = () => {
  const [systemMetrics, setSystemMetrics] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMetrics = async () => {
      try {
        const data = await fetchSystemMetrics();
        setSystemMetrics(data);
        setLoading(false);
      } catch (err) {
        console.error('Failed to load metrics:', err);
        setLoading(false);
      }
    };

    loadMetrics();
    const interval = setInterval(loadMetrics, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="omega-command-center">
      <h1>🧠 Omega Command Center</h1>

      <SystemStatus metrics={systemMetrics} loading={loading} />
      <APICredentialsForm />
      <BillingPanel />
      <MonetisationOverview />

      <section>
        <h2>🔁 Agent Control Panel</h2>
        <AgentControl />
        <AgentStatus />
        <AgentObserverPanel />
      </section>

      <section>
        <h2>📡 Live System Logs</h2>
        <LiveLogsPanel />
      </section>
    </div>
  );
};

export default OmegaCommandCenter;
