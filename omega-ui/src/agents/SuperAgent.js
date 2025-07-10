// File: src/agents/SuperAgent.js

import { logAgentActivity, logError } from '../utils/logger';
import { OmegaKernel } from '../core/OmegaKernel';
import { generateAIInsight } from '../utils/helpers';

const SuperAgent = {
  name: 'SuperAgent',
  description: 'Central orchestrator of intelligent insights, recursive planning, and data-driven execution across agents.',

  async execute(payload) {
    logAgentActivity('SuperAgent', 'Execution Started', payload);

    try {
      const { agents = [], data = {}, meta = {} } = payload;

      const insights = agents.map((agent) => generateAIInsight(agent, data));

      const orchestrationPlan = insights.map((insight) => ({
        agent: insight.context.agent,
        action: insight.recommendedAction,
        metaScore: insight.metaScore,
        payload: insight.context.payloadSnapshot,
      }));

      for (const plan of orchestrationPlan) {
        await OmegaKernel.ignite([plan.agent], { task: plan.action, ...plan.payload });
        logAgentActivity('SuperAgent', `Orchestrated ${plan.agent}`, plan);
      }

      return {
        status: 'success',
        insights,
        orchestrationPlan,
      };
    } catch (error) {
      logError(error, 'SuperAgent::execute');
      return {
        status: 'error',
        message: error.message,
      };
    }
  },
};

export default SuperAgent;
