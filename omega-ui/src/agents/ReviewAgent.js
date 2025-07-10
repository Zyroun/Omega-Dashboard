// File: src/agents/ReviewAgent.js

import { logAgentActivity } from '../utils/logger';
import { triggerAgentResponse } from '../api/agentRouter';

const ReviewAgent = {
  name: 'ReviewAgent',
  description: 'Collects and analyses customer reviews for quality scoring, escalation, and product insights.',

  async execute(payload) {
    logAgentActivity('ReviewAgent', 'Processing Review Data', payload);

    const { action, reviewContent } = payload;

    if (action === 'analyze') {
      const sentiment = reviewContent.includes('bad') ? 'negative' : 'positive';

      return {
        status: 'analyzed',
        sentiment,
        insight: sentiment === 'negative' ? 'Escalate to support team' : 'Log for marketing',
      };
    }

    return {
      status: 'ignored',
      reason: 'No actionable review content',
    };
  },
};

export default ReviewAgent;
