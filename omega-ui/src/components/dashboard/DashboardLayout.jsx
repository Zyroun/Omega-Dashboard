// File: src/components/dashboard/DashboardLayout.jsx

import React from 'react';
import OmegaCommandCenter from './OmegaCommandCenter';
import '../../styles/globals.css';

const DashboardLayout = () => {
  return (
    <div className="dashboard-layout">
      <header className="dashboard-header">
        <h1>⚛️ Omega UI v5 – Autonomous n8n Commerce Ecosystem</h1>
        <h2>Powered by SYNTHMIRAGE Engine · Enterprise Tier Loophole Mode ✅</h2>
      </header>

      <main className="dashboard-main">
        <OmegaCommandCenter />
      </main>

      <footer className="dashboard-footer">
        <p>
          ⛓ Infinite Recursion Enabled · Self-Healing Active · Super Agent
          Monitoring All Agents · Omega Kernel v5.9.9+
        </p>
      </footer>
    </div>
  );
};

export default DashboardLayout;
