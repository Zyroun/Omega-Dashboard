// File: src/api/agentRouter.js

import axios from 'axios';
import { logAgentActivity, logError } from '../utils/logger';
import { getAPICredentials } from './credentials';

const BASE_URL = 'https://api.yourserver.com/agents';

export const triggerAgentResponse = async (agentName, payload) => {
  try {
    const { apiKey, accessToken } = await getAPICredentials();

    const response = await axios.post(
      `${BASE_URL}/${agentName}/execute`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'X-API-KEY': apiKey,
        },
      }
    );

    logAgentActivity(agentName, 'Triggered Execution', payload);
    return response.data;
  } catch (error) {
    logError(error, `AgentRouter::${agentName}`);
    throw error;
  }
};

export const fetchAgentStatus = async (agentName) => {
  try {
    const { apiKey, accessToken } = await getAPICredentials();

    const response = await axios.get(`${BASE_URL}/${agentName}/status`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'X-API-KEY': apiKey,
      },
    });

    logAgentActivity(agentName, 'Fetched Status');
    return response.data;
  } catch (error) {
    logError(error, `AgentRouter::Status::${agentName}`);
    return { status: 'unavailable', error: error.message };
  }
};
