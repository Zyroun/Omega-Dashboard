// File: src/App.jsx
import React from 'react';
import { APIKeyManager } from './components/APIKeyManager';
import { AgentControlPanel } from './components/AgentControlPanel';
import { BillingPanel } from './components/BillingPanel';
import { ModeratorAgentPanel } from './components/ModeratorAgentPanel';
import { SuperAgentPanel } from './components/SuperAgentPanel';
import { LiveLogs } from './components/LiveLogs';
import { Card } from '@/components/ui/card';

export default function App() {
  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-center mb-10">⚛️ Omega UI v5 – Enterprise Automation Panel</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card><APIKeyManager /></Card>
        <Card><AgentControlPanel /></Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card><SuperAgentPanel /></Card>
        <Card><ModeratorAgentPanel /></Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card><BillingPanel /></Card>
        <Card><LiveLogs /></Card>
      </div>
    </main>
  );
}

