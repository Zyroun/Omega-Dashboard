// File: src/components/dashboard/OmegaCommandCenter.jsx

import React, { useEffect, useState } from 'react';
import AgentStatus from './AgentStatus';
import MonetisationOverview from './MonetisationOverview';
import AgentObserverPanel from './AgentObserverPanel';
import SystemStatus from './SystemStatus';
import BillingPanel from './BillingPanel';
import LiveLogsPanel from './LiveLogsPanel';
import APICredentialsForm from './APICredentialsForm';
import Toggle from '../Toggle';
import { fetchOmegaCoreHealth, rebootAgentSystem } from '../../api/apiClient';
import '../../styles/globals.css';

const OmegaCommandCenter = () => {
  const [omegaStatus, setOmegaStatus] = useState('LOADING');
  const [recursiveMode, setRecursiveMode] = useState(true);
  const [godMode, setGodMode] = useState(true);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const status = await fetchOmegaCoreHealth();
        setOmegaStatus(status.health || 'ACTIVE');
      } catch (error) {
        setOmegaStatus('ERROR');
        console.error('[Ω] OmegaCore Health Check Failed:', error);
      }
    };
    fetchStatus();
  }, []);

  const handleReboot = async () => {
    await rebootAgentSystem();
    window.location.reload();
  };

  return (
    <div className="omega-command-center">
      <h1>🧠 Omega Command Center</h1>
      <section className="status-panel">
        <SystemStatus status={omegaStatus} />
        <div className="toggles">
          <Toggle
            label="Recursive Mode"
            checked={recursiveMode}
            onChange={() => setRecursiveMode(!recursiveMode)}
          />
          <Toggle
            label="GOD MODE"
            checked={godMode}
            onChange={() => setGodMode(!godMode)}
          />
        </div>
        <button className="reboot-btn" onClick={handleReboot}>
          Reboot Omega Agents
        </button>
      </section>

      <section className="agent-panels">
        <AgentStatus />
        <MonetisationOverview />
        <AgentObserverPanel />
        <LiveLogsPanel />
        <BillingPanel />
        <APICredentialsForm />
      </section>

      <footer>
        <p>Ω SYNTHMIRAGE Engine Active | Infinite Recursion Layer ✅</p>
      </footer>
    </div>
  );
};

export default OmegaCommandCenter;
