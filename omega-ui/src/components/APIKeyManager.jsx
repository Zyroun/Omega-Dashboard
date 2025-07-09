// File: src/components/APIKeyManager.jsx
import React, { useState } from 'react';

export function APIKeyManager() {
  const [apiInputs, setApiInputs] = useState({
    shopifyKey: '',
    shopifySecret: '',
    shopifyToken: '',
    tiktokKey: '',
    ebayKey: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setApiInputs(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">🔑 API Key Manager</h2>

      <div className="space-y-4">
        <label>Shopify API Key (Optional)</label>
        <input name="shopifyKey" value={apiInputs.shopifyKey} onChange={handleChange} className="input" placeholder="e.g. e6a99e..." />

        <label>Shopify Secret (Optional)</label>
        <input name="shopifySecret" value={apiInputs.shopifySecret} onChange={handleChange} className="input" placeholder="e.g. 7a14f9..." />

        <label>Shopify Access Token</label>
        <input name="shopifyToken" value={apiInputs.shopifyToken} onChange={handleChange} className="input" placeholder="shpat_..." />

        <label>TikTok API Key (Optional)</label>
        <input name="tiktokKey" value={apiInputs.tiktokKey} onChange={handleChange} className="input" placeholder="..." />

        <label>eBay API Key (Optional)</label>
        <input name="ebayKey" value={apiInputs.ebayKey} onChange={handleChange} className="input" placeholder="..." />
      </div>
    </div>
  );
}
