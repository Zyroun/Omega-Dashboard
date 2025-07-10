// File: src/components/dashboard/BillingPanel.jsx

import React, { useEffect, useState } from 'react';
import { log } from '../../utils/logger';

const BillingPanel = () => {
  const [billingData, setBillingData] = useState({
    plan: 'Loading...',
    usage: 'Loading...',
    quota: 'Loading...',
    billingCycle: 'Loading...',
    nextInvoice: 'Loading...',
    usagePercent: 0
  });

  useEffect(() => {
    const fetchBilling = async () => {
      try {
        const res = await fetch('/api/billing/status');
        const data = await res.json();
        setBillingData(data);
        log('Billing data loaded', 'BillingPanel');
      } catch (error) {
        log(error, 'BillingPanel Error');
      }
    };

    fetchBilling();
    const interval = setInterval(fetchBilling, 60000); // Refresh every 1 minute
    return () => clearInterval(interval);
  }, []);

  const getUsageColor = (percent) => {
    if (percent < 50) return '#00ff88';
    if (percent < 80) return '#ffaa00';
    return '#ff3366';
  };

  return (
    <div className="billing-panel">
      <h3>💸 Billing & Usage</h3>
      <ul>
        <li><strong>Current Plan:</strong> {billingData.plan}</li>
        <li><strong>Billing Cycle:</strong> {billingData.billingCycle}</li>
        <li><strong>Usage:</strong> {billingData.usage} / {billingData.quota}</li>
        <li><strong>Next Invoice:</strong> {billingData.nextInvoice}</li>
      </ul>

      <div className="usage-bar-container">
        <div
          className="usage-bar"
          style={{
            width: `${billingData.usagePercent}%`,
            backgroundColor: getUsageColor(billingData.usagePercent)
          }}
        />
      </div>

      <p style={{ fontSize: '12px', marginTop: '6px', color: '#ccc' }}>
        Usage: {billingData.usagePercent}%
      </p>
    </div>
  );
};

export default BillingPanel;
