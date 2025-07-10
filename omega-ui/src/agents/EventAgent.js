// File: src/agents/EventAgent.js

import { logAgentActivity, logError } from '../utils/logger';
import { generateExecutionId, delay } from '../utils/helpers';
import { triggerAgentResponse } from '../api/agentRouter';

const EventAgent = {
  name: 'EventAgent',
  description: 'Handles promotional events, flash sales, and scheduled product launches.',

  async execute(payload = {}) {
    const executionId = generateExecutionId();
    logAgentActivity('EventAgent', 'Initiating event execution', { executionId, payload });

    try {
      const {
        eventType = 'flash_sale',
        eventTime = Date.now(),
        products = [],
        discountRate = 0.15,
        notifyAgents = ['PricingAgent', 'EmailAgent', 'InventoryAgent'],
      } = payload;

      // Schedule logic (basic delay simulation)
      const delayMs = Math.max(eventTime - Date.now(), 0);
      if (delayMs > 0) {
        logAgentActivity('EventAgent', 'Delaying until event start time', { delayMs });
        await delay(delayMs);
      }

      // Notify agents to react to the event
      for (const agent of notifyAgents) {
        await triggerAgentResponse(agent, {
          eventType,
          products,
          discountRate,
        });
      }

      logAgentActivity('EventAgent', 'Event executed successfully', {
        executionId,
        eventType,
        products,
      });

      return {
        status: 'success',
        executionId,
        message: `Event '${eventType}' executed.`,
        affectedAgents: notifyAgents,
      };
    } catch (error) {
      logError(error, 'EventAgent::execute');
      return {
        status: 'error',
        message: error.message,
      };
    }
  },
};

export default EventAgent;
