// File: src/core/OmegaConvergence.js

import { logAgentActivity, logSystemHealth } from '../utils/logger';
import { triggerAgentResponse } from '../api/agentRouter';
import { getAdaptiveStrategy } from '../utils/helpers';

export class OmegaConvergenceEngine {
  constructor() {
    this.decisions = [];
  }

  decide(agentName, pattern) {
    const strategy = getAdaptiveStrategy(pattern);

    const decision = {
      agent: agentName,
      strategy,
      pattern,
      timestamp: new Date().toISOString(),
    };

    this.decisions.push(decision);
    logSystemHealth('Decision made by Omega Convergence Engine', decision);

    // Command the agent to adapt/respond
    this.execute(agentName, strategy);
  }

  async execute(agentName, strategy) {
    try {
      const response = await triggerAgentResponse(agentName, strategy);
      logAgentActivity(agentName, 'Executed Strategy', { strategy, response });
    } catch (err) {
      logAgentActivity(agentName, 'Strategy Execution Failed', {
        strategy,
        error: err.message,
      });
    }
  }

  getDecisionLog(limit = 20) {
    return this.decisions.slice(-limit);
  }
}

export const OmegaConvergence = new OmegaConvergenceEngine();
