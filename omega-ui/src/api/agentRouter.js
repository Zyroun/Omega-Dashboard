import axios from 'axios';
import { logAgentActivity, logError } from '../utils/logger';
import { getAgentEndpoint } from '../utils/helpers';
import { getAPICredentials } from './credentials';

const BASE_URL = 'https://api.yourserver.com/agents';

/**
 * Triggers an agent execution using dynamic routing or fallback.
 */
export const triggerAgentResponse = async (agentName, payload) => {
  try {
    const { apiKey, accessToken } = await getAPICredentials();
    const dynamicUrl = getAgentEndpoint(agentName) || `${BASE_URL}/${agentName}/execute`;

    const response = await axios.post(
      dynamicUrl,
      payload,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'X-API-KEY': apiKey,
        },
      }
    );

    logAgentActivity(agentName, 'Triggered Execution', {
      payload,
      response: response.data,
    });

    return response.data;
  } catch (error) {
    logError(error, `AgentRouter::Trigger::${agentName}`);
    throw error;
  }
};

/**
 * Fetches the real-time status of a specific agent.
 */
export const fetchAgentStatus = async (agentName) => {
  try {
    const { apiKey, accessToken } = await getAPICredentials();

    const response = await axios.get(`${BASE_URL}/${agentName}/status`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'X-API-KEY': apiKey,
      },
    });

    logAgentActivity(agentName, 'Fetched Status', {
      status: response.status,
      data: response.data,
    });

    return response.data;
  } catch (error) {
    logError(error, `AgentRouter::Status::${agentName}`);
    return { status: 'unavailable', error: error.message };
  }
};
