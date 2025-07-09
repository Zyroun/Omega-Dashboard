// File: src/components/AgentControlPanel.jsx
import React from 'react';
import { useOmega } from '../context/OmegaContext';
import { Button } from '@/components/ui/button';

export function AgentControlPanel() {
  const { logAgentExecution, shopifyKey } = useOmega();

  const runAgent = async (agentName, endpoint) => {
    try {
      await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ shopifyKey })
      });
      logAgentExecution(agentName);
    } catch (err) {
      console.error('Agent failed:', err);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Omega Agent Control</h2>
      <div className="space-y-4">
        <Button onClick={() => runAgent("Order Manager", "https://your-render-service/order-agent")}>
          Run Order Manager Agent
        </Button>
        <Button onClick={() => runAgent("Inventory Tracker", "https://your-render-service/inventory-agent")}>
          Run Inventory Tracker
        </Button>
        <Button onClick={() => runAgent("SEO Engine", "https://your-render-service/seo-agent")}>
          Run SEO Engine
        </Button>
        <Button onClick={() => runAgent("TikTok Publisher", "https://your-render-service/tiktok-agent")}>
          Run TikTok Publisher
        </Button>
      </div>
    </div>
  );
}
