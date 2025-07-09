import React, { useState } from 'react';
import { Input } from './ui/input';

export function APIKeyManager() {
  const [shopifyKey, setShopifyKey] = useState('');
  const [ebayKey, setEbayKey] = useState('');
  const [tiktokKey, setTiktokKey] = useState('');
  const [socialKey, setSocialKey] = useState('');

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">API Key Manager</h2>
      <label className="block mb-2">Shopify API Key (optional):</label>
      <Input
        value={shopifyKey}
        onChange={(e) => setShopifyKey(e.target.value)}
        placeholder="Paste your Shopify API key here"
      />
      <label className="block mt-4 mb-2">eBay API Key (optional):</label>
      <Input
        value={ebayKey}
        onChange={(e) => setEbayKey(e.target.value)}
        placeholder="Paste your eBay API key here"
      />
      <label className="block mt-4 mb-2">TikTok API Key (optional):</label>
      <Input
        value={tiktokKey}
        onChange={(e) => setTiktokKey(e.target.value)}
        placeholder="Paste your TikTok API key here"
      />
      <label className="block mt-4 mb-2">Social Media API Key (optional):</label>
      <Input
        value={socialKey}
        onChange={(e) => setSocialKey(e.target.value)}
        placeholder="Paste your Social Media API key here"
      />
    </div>
  );
}
