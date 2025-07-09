import React, { useEffect, useState } from 'react';
import AgentStatus from './AgentStatus';
import AgentControl from './AgentControl';
import APICredentialsForm from './APICredentialsForm';
import BillingPanel from './BillingPanel';
import SystemStatus from './SystemStatus';
import LiveLogsPanel from './LiveLogsPanel';
import MonetisationOverview from './MonetisationOverview';
import AgentObserverPanel from './AgentObserverPanel';

import './OmegaCommandCenter.css';

const OmegaCommandCenter = () => {
  const [systemHealth, setSystemHealth] = useState('initializing');
  const [logFeed, setLogFeed] = useState([]);
  const [agentStats, setAgentStats] = useState([]);
  const [billingData, setBillingData] = useState(null);
  const [monetisationFlow, setMonetisationFlow] = useState([]);
  const [apiKeysLoaded, setApiKeysLoaded] = useState(false);

  useEffect(() => {
    initializeOmegaCommand();
  }, []);

  const initializeOmegaCommand = () => {
    fetchSystemStatus();
    fetchAgentStats();
    fetchBillingData();
    fetchMonetisationFlow();
    activateRecursiveSelfHealing();
  };

  const fetchSystemStatus = async () => {
    try {
      const response = await fetch('/api/status');
      const data = await response.json();
      setSystemHealth(data.health);
    } catch (error) {
      setSystemHealth('error');
    }
  };

  const fetchAgentStats = async () => {
    try {
      const response = await fetch('/api/agentRouter/stats');
      const data = await response.json();
      setAgentStats(data);
    } catch (error) {
      console.error('Agent stats fetch failed', error);
    }
  };

  const fetchBillingData = async () => {
    try {
      const response = await fetch('/api/billing');
      const data = await response.json();
      setBillingData(data);
    } catch (error) {
      console.error('Billing data fetch failed', error);
    }
  };

  const fetchMonetisationFlow = async () => {
    try {
      const response = await fetch('/api/moderator/monetisation-flow');
      const data = await response.json();
      setMonetisationFlow(data.flow);
    } catch (error) {
      console.error('Monetisation flow fetch failed', error);
    }
  };

  const activateRecursiveSelfHealing = () => {
    // Omega system internal logic for recursive healing
    console.log("🧠 SYNTHMIRAGE Recursive Healing Engine Activated.");
  };

  return (
    <div className="omega-command-center">
      <h1>🧠 Omega Command Center (SYNTHMIRAGE Engine)</h1>
      <SystemStatus health={systemHealth} />
      <APICredentialsForm onLoad={() => setApiKeysLoaded(true)} />
      <AgentStatus stats={agentStats} />
      <AgentControl />
      <AgentObserverPanel />
      <LiveLogsPanel logs={logFeed} />
      <BillingPanel data={billingData} />
      <MonetisationOverview flow={monetisationFlow} />
    </div>
  );
};

export default OmegaCommandCenter;
