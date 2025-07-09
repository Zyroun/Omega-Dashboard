// File: src/App.jsx
import React from 'react';
import { APIKeyManager } from './components/APIKeyManager';
import { AgentControlPanel } from './components/AgentControlPanel';
import { BillingPanel } from './components/BillingPanel';
import { LiveLogs } from './components/LiveLogs';
import { Card } from '@/components/ui/card';

export default function App() {
  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold text-center mb-10">Omega UI v3 Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        <APIKeyManager />
        <AgentControlPanel />
        <BillingPanel />
        <LiveLogs />
      </div>
    </main>
  );
}
