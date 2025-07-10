// File: src/core/OmegaConvergence.js

import { logAgentActivity, logSystemHealth } from '../utils/logger';
import { triggerAgentResponse } from '../api/agentRouter';
import { getAdaptiveStrategy } from '../utils/helpers';
import OmegaIntelligence from './OmegaIntelligence';
import OmegaRecursionEngine from './OmegaRecursionEngine';

export class OmegaConvergenceEngine {
  constructor() {
    this.decisions = [];
    this.convergenceIdCounter = 0;
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

  async converge(agentGroup, payload, options = {}) {
    const convergenceId = ++this.convergenceIdCounter;
    const results = [];

    logSystemHealth('CONVERGENCE_INITIATED', {
      convergenceId,
      agentGroup,
      payload,
      options,
    });

    for (const agent of agentGroup) {
      try {
        const intelligence = OmegaIntelligence.recommendActions(agent, payload);

        logAgentActivity(agent, 'INTELLIGENCE_GENERATED', {
          convergenceId,
          intelligence,
        });

        const result = await OmegaRecursionEngine.execute(agent, {
          ...payload,
          intelligence,
        });

        results.push({
          agent,
          result,
          intelligence,
          timestamp: new Date().toISOString(),
        });

      } catch (err) {
        results.push({
          agent,
          error: err.message,
          timestamp: new Date().toISOString(),
        });

        logAgentActivity(agent, 'EXECUTION_FAILED', {
          convergenceId,
          error: err.message,
        });
      }
    }

    logSystemHealth('CONVERGENCE_COMPLETED', {
      convergenceId,
      agentGroup,
      results,
    });

    return results;
  }
}

export const OmegaConvergence = new OmegaConvergenceEngine();
