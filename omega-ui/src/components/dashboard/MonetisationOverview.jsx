// File: src/components/dashboard/MonetisationOverview.jsx

import React, { useEffect, useState } from 'react';
import './MonetisationOverview.css';
import { log, logError } from '../../utils/logger';

const MonetisationOverview = () => {
  const [metrics, setMetrics] = useState(null);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const response = await fetch('/api/monetisation/overview');
        const data = await response.json();
        setMetrics(data);
        log('Monetisation metrics fetched successfully', 'MonetisationOverview');
      } catch (error) {
        logError(error, 'MonetisationOverview');
      }
    };

    fetchMetrics();
    const interval = setInterval(fetchMetrics, 60000); // Refresh every minute
    return () => clearInterval(interval);
  }, []);

  if (!metrics) {
    return <div className="monetisation-loading">Loading monetisation data...</div>;
  }

  return (
    <div className="monetisation-overview">
      <h3>💸 Monetisation Overview</h3>
      <div className="metrics-grid">
        <Metric title="Total Revenue" value={`$${metrics.totalRevenue.toLocaleString()}`} />
        <Metric title="Active Agents" value={metrics.activeAgents} />
        <Metric title="Conversion Rate" value={`${metrics.conversionRate}%`} />
        <Metric title="Avg Order Value" value={`$${metrics.averageOrderValue}`} />
        <Metric title="Projected Monthly" value={`$${metrics.projectedMonthly}`} />
      </div>
    </div>
  );
};

const Metric = ({ title, value }) => (
  <div className="metric">
    <div className="metric-title">{title}</div>
    <div className="metric-value">{value}</div>
  </div>
);

export default MonetisationOverview;
