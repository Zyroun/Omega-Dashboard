// File: src/agents/MetaCognitionAgent.js

import { logAgentActivity, logError } from '../utils/logger';
import { getAdaptiveStrategy } from '../utils/helpers';
import { OmegaKernel } from '../core/OmegaKernel';

const MetaCognitionAgent = {
  name: 'MetaCognitionAgent',
  description: 'Self-reflective agent that monitors, evaluates, and evolves other agents based on performance and adaptive strategy.',

  async execute(payload) {
    const { context = {}, pattern = 'meta-reflection' } = payload;

    logAgentActivity('MetaCognitionAgent', 'Reflection and Evaluation Started', payload);

    try {
      const agentPool = context.agents || [
        'RevenueAgent',
        'TrafficAgent',
        'PricingAgent',
        'EmailAgent',
        'ConversionAgent',
        'SEOAgent',
        'CartRecoveryAgent',
        'AnalyticsAgent',
      ];

      const strategy = getAdaptiveStrategy(pattern);

      const results = [];

      for (const agent of agentPool) {
        const evaluationPayload = {
          pattern,
          evaluation: true,
          meta: true,
          strategy,
        };

        const result = await OmegaKernel.ignite([agent], evaluationPayload);
        results.push({ agent, result });
      }

      logAgentActivity('MetaCognitionAgent', 'Meta-Evaluation Complete', results);

      return {
        status: 'success',
        strategy,
        evaluations: results,
      };
    } catch (err) {
      logError(err, 'MetaCognitionAgent::execute');
      return { status: 'error', message: err.message };
    }
  },
};

export default MetaCognitionAgent;
