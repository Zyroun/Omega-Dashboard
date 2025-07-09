import React, { useState } from 'react';

export default function App() {
  const [shopifyKey, setShopifyKey] = useState('');
  const [apiEnabled, setApiEnabled] = useState(false);

  return (
    <div className="p-6 max-w-xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold text-teal-400">Omega UI v3</h1>
      <p className="text-sm text-gray-300">Autonomous Commerce Control Panel</p>

      <div className="space-y-2">
        <label className="block text-gray-300">Enable Shopify Agent:</label>
        <input
          type="checkbox"
          onChange={() => setApiEnabled(!apiEnabled)}
          className="form-checkbox text-teal-500"
        />
      </div>

      {apiEnabled && (
        <div className="space-y-2">
          <label className="block text-gray-300">Shopify API Key:</label>
          <input
            type="text"
            value={shopifyKey}
            onChange={(e) => setShopifyKey(e.target.value)}
            className="w-full p-2 rounded bg-gray-800 border border-teal-600"
            placeholder="Enter your Shopify API key"
          />
        </div>
      )}

      <div className="mt-6">
        <button className="bg-teal-500 px-4 py-2 rounded text-white hover:bg-teal-600 transition">
          Launch Omega
        </button>
      </div>
    </div>
  );
}
