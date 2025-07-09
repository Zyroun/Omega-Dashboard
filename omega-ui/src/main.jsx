// File: src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { OmegaProvider } from './context/OmegaContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
    <OmegaProvider>
      <Router>
        <App />
      </Router>
    </OmegaProvider>
  </React.StrictMode>
);

// File: src/App.jsx
import React from 'react';
import { APIKeyManager } from './components/APIKeyManager';
import { AgentControlPanel } from './components/AgentControlPanel';
import { Card } from '@/components/ui/card';

export default function App() {
  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-center mb-10">Omega UI v3 Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <APIKeyManager />
        </Card>
        <Card>
          <AgentControlPanel />
        </Card>
      </div>
    </main>
  );
}

// File: src/components/APIKeyManager.jsx
import React, { useState } from 'react';

export function APIKeyManager() {
  const [shopifyKey, setShopifyKey] = useState('');

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">API Key Manager</h2>
      <label className="block mb-2">Shopify API Key (optional):</label>
      <input
        className="w-full border border-gray-300 p-2 rounded"
        type="text"
        placeholder="Paste your Shopify API key here"
        value={shopifyKey}
        onChange={(e) => setShopifyKey(e.target.value)}
      />
    </div>
  );
}

// File: src/components/AgentControlPanel.jsx
import React from 'react';
import { Button } from '@/components/ui/button';

export function AgentControlPanel() {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Omega Agent Control</h2>
      <div className="space-y-4">
        <Button className="w-full">Run Order Manager Agent</Button>
        <Button className="w-full">Run Inventory Tracker</Button>
        <Button className="w-full">Run SEO Engine</Button>
        <Button className="w-full">Run TikTok Publisher</Button>
      </div>
    </div>
  );
}
