// OmegaCommandCenter.jsx
import React, { useState } from 'react';
import ShopifyHeavyLoadAgent from '../../agents/ShopifyHeavyLoadAgent';
import DeploymentAgent from '../../agents/DeploymentAgent';
import OmegaModerator from '../../core/OmegaModerator';
import { Card, Button, Textarea, Input, Notification } from '@geist-ui/react';

/**
 * The OmegaCommandCenter is the UI brain of the dashboard.
 * It enables live agent control, deployment execution, and moderation reporting.
 */
const OmegaCommandCenter = () => {
  const [log, setLog] = useState('');
  const [deployStatus, setDeployStatus] = useState(null);
  const [overrideCreds, setOverrideCreds] = useState({
    apiKey: '',
    apiSecretKey: '',
    accessToken: '',
  });

  const appendLog = (msg) => {
    setLog((prev) => prev + `\n> ${msg}`);
  };

  const runModerator = async () => {
    const moderator = new OmegaModerator(overrideCreds);
    appendLog('Running OmegaModerator...');
    await moderator.startMonitoring();
    appendLog('OmegaModerator execution complete.');
  };

  const runShopifyAgent = async () => {
    const agent = new ShopifyHeavyLoadAgent(overrideCreds);
    appendLog('Starting Shopify Heavy Load Agent...');
    await agent.executeAll();
    appendLog('Heavy load sync complete.');
  };

  const deploy = async () => {
    const agent = new DeploymentAgent('https://github.com/YOUR_REPO_HERE');
    appendLog('Deploying to Render/GitHub...');
    const status = await agent.deploy();
    setDeployStatus(status);
    appendLog(`Deployment ${status.status}`);
  };

  return (
    <Card shadow style={{ marginTop: '2rem' }}>
      <h3>🧠 Omega Command Center</h3>
      <Input
        placeholder="API Key"
        width="100%"
        onChange={(e) => setOverrideCreds({ ...overrideCreds, apiKey: e.target.value })}
      />
      <Input
        placeholder="API Secret Key"
        width="100%"
        onChange={(e) => setOverrideCreds({ ...overrideCreds, apiSecretKey: e.target.value })}
      />
      <Input
        placeholder="Admin Access Token"
        width="100%"
        onChange={(e) => setOverrideCreds({ ...overrideCreds, accessToken: e.target.value })}
      />
      <div style={{ marginTop: '1rem' }}>
        <Button auto onClick={runModerator}>Run Moderator</Button>
        <Button auto type="secondary" onClick={runShopifyAgent}>Run Shopify Agent</Button>
        <Button auto type="success" onClick={deploy}>Deploy</Button>
      </div>
      <Textarea
        value={log}
        width="100%"
        placeholder="System logs will appear here..."
        rows={12}
        readOnly
        style={{ marginTop: '1rem' }}
      />
      {deployStatus && (
        <Notification type={deployStatus.status === 'success' ? 'success' : 'error'}>
          Deployment Status: {deployStatus.status}<br />
          {deployStatus.timestamp || deployStatus.error}
        </Notification>
      )}
    </Card>
  );
};

export default OmegaCommandCenter;
