// File: src/core/OmegaRecursionEngine.js

import { logRecursionLoop, logSystemHealth, logError } from '../utils/logger';
import { triggerAgentResponse } from '../api/agentRouter';
import { generateExecutionId } from '../utils/helpers';

let activeLoops = {};

export const OmegaRecursionEngine = {
  async execute(agentName, payload, depth = 0, maxDepth = 5) {
    const executionId = generateExecutionId();
    const loopId = `${agentName}-${executionId}`;

    try {
      logRecursionLoop(loopId, depth, { agentName, payload });

      if (depth > maxDepth) {
        logSystemHealth('RECURSION_LIMIT_REACHED', { loopId, depth });
        return { status: 'limit_exceeded', loopId };
      }

      const response = await triggerAgentResponse(agentName, {
        ...payload,
        executionId,
      });

      if (response?.recursion && response.nextAgent) {
        return await this.execute(
          response.nextAgent,
          response.nextPayload || {},
          depth + 1,
          maxDepth
        );
      }

      return {
        status: 'completed',
        loopId,
        result: response,
      };
    } catch (error) {
      logError(error, 'OmegaRecursionEngine');
      return { status: 'error', error: error.message };
    }
  },

  async startLoop(agentName, payload, config = {}) {
    const loopId = `${agentName}-${Date.now()}`;
    const maxDepth = config.maxDepth || 5;

    activeLoops[loopId] = true;
    logSystemHealth('RECURSION_STARTED', { loopId, agentName });

    const result = await this.execute(agentName, payload, 0, maxDepth);

    delete activeLoops[loopId];
    logSystemHealth('RECURSION_ENDED', { loopId, result });

    return result;
  },

  stopAllLoops() {
    activeLoops = {};
    logSystemHealth('ALL_RECURSION_TERMINATED');
  },

  getActiveLoops() {
    return Object.keys(activeLoops);
  },
};

export default OmegaRecursionEngine;
