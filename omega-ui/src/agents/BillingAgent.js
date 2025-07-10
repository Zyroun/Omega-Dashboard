// File: src/agents/BillingAgent.js

import { logAgentActivity, logError } from '../utils/logger';
import axios from 'axios';
import { getAPICredentials } from '../api/credentials';

const BillingAgent = {
  name: 'BillingAgent',
  description: 'Manages billing status, fetches payment history, and ensures Shopify subscription compliance.',

  async execute(commandPayload) {
    const { action = 'status' } = commandPayload;

    logAgentActivity('BillingAgent', 'Command Received', { action });

    try {
      const { accessToken } = await getAPICredentials();

      switch (action) {
        case 'status': {
          const response = await axios.get('/api/billing/status', {
            headers: { Authorization: `Bearer ${accessToken}` },
          });
          logAgentActivity('BillingAgent', 'Fetched billing status', response.data);
          return response.data;
        }

        case 'history': {
          const response = await axios.get('/api/billing/history', {
            headers: { Authorization: `Bearer ${accessToken}` },
          });
          logAgentActivity('BillingAgent', 'Fetched billing history', response.data);
          return response.data;
        }

        case 'cancel': {
          const response = await axios.post('/api/billing/cancel', {}, {
            headers: { Authorization: `Bearer ${accessToken}` },
          });
          logAgentActivity('BillingAgent', 'Cancelled billing subscription', response.data);
          return response.data;
        }

        default:
          logAgentActivity('BillingAgent', 'Unknown billing action', { action });
          return { status: 'error', message: 'Unknown billing action' };
      }
    } catch (err) {
      logError(err, 'BillingAgent::execute');
      return { status: 'error', message: err.message };
    }
  },
};

export default BillingAgent;
