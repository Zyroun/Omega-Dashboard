// File: src/agents/SuperIntelligenceAgent.js

import { logAgentActivity, logError } from '../utils/logger';
import { OmegaKernel } from '../core/OmegaKernel';
import { getAdaptiveStrategy } from '../utils/helpers';

const SuperIntelligenceAgent = {
  name: 'SuperIntelligenceAgent',
  description: 'Acts as the omnipresent intelligence layer. Oversees recursion, adaptation, decision impact, and full meta-governance of the system.',

  async execute(payload) {
    logAgentActivity('SuperIntelligenceAgent', 'Activated', payload);

    try {
      const { trigger = 'auto', intent = 'monitor', override = false } = payload;

      const strategy = getAdaptiveStrategy(trigger);

      const targetAgents = [
        'MetaCognitionAgent',
        'PatternRecognitionAgent',
        'TrendForecastAgent',
        'ModifierAgent',
        'ReputationAgent',
        'FeedbackLoopAgent',
        'OmegaGuardianAgent',
      ];

      const result = await OmegaKernel.ignite(targetAgents, {
        action: intent,
        payload,
        strategy,
        override,
      });

      logAgentActivity('SuperIntelligenceAgent', 'Oversight Sequence Completed', result);

      return {
        status: 'success',
        strategy,
        activatedAgents: targetAgents,
        result,
      };
    } catch (error) {
      logError(error, 'SuperIntelligenceAgent::execute');
      return { status: 'error', message: error.message };
    }
  },
};

export default SuperIntelligenceAgent;
