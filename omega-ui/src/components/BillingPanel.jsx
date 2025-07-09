// File: src/components/BillingPanel.jsx
import React from 'react';

export function BillingPanel() {
  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Billing & Monetisation Panel</h2>
      <p className="text-gray-600 mb-2">Track real-time agent monetisation, billing cycles, and cost management.</p>
      <div className="space-y-2">
        <div className="bg-white p-4 rounded shadow border border-gray-200">
          <h3 className="text-md font-bold">Live Usage</h3>
          <p className="text-sm">Real-time cost estimation and monetisation metrics coming soon.</p>
        </div>
        <div className="bg-white p-4 rounded shadow border border-gray-200">
          <h3 className="text-md font-bold">Upcoming Features</h3>
          <ul className="list-disc pl-5 text-sm text-gray-700">
            <li>Real-time cost calculator</li>
            <li>API usage-based billing</li>
            <li>Agent monetisation tracking</li>
            <li>Subscription + Pay-per-use models</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

// File: src/components/OmegaAgentModerator.jsx
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

export function OmegaAgentModerator() {
  const [agentStatus, setAgentStatus] = useState([]);
  const [log, setLog] = useState([]);

  useEffect(() => {
    // TODO: Fetch agent status from n8n API
    setAgentStatus([
      { name: 'Order Intake Manager', status: 'active' },
      { name: 'SEO Engine', status: 'idle' },
      // dynamically update
    ]);
  }, []);

  const toggleAgent = (agentName) => {
    // TODO: Implement backend toggle logic
    setLog((prev) => [...prev, `Toggled agent: ${agentName}`]);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Omega Agent Moderator</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {agentStatus.map((agent, idx) => (
          <div
            key={idx}
            className="p-4 rounded border bg-white shadow flex justify-between items-center"
          >
            <div>
              <p className="font-semibold">{agent.name}</p>
              <p className="text-sm text-gray-500">Status: {agent.status}</p>
            </div>
            <Button
              onClick={() => toggleAgent(agent.name)}
              className={`px-4 py-1 ${
                agent.status === 'active' ? 'bg-red-500' : 'bg-green-500'
              } text-white rounded`}
            >
              {agent.status === 'active' ? 'Deactivate' : 'Activate'}
            </Button>
          </div>
        ))}
      </div>
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2">Live Log</h3>
        <div className="bg-black text-green-400 font-mono text-sm p-4 rounded h-48 overflow-y-auto">
          {log.map((entry, idx) => (
            <div key={idx}>{entry}</div>
          ))}
        </div>
      </div>
    </div>
  );
}
