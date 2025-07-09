// File: src/components/APIKeyManager.jsx
import React from 'react';
import { useOmega } from '../context/OmegaContext';

export function APIKeyManager() {
  const { shopifyKey, setShopifyKey } = useOmega();

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
