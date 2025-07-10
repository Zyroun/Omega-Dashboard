// File: src/agents/RefundAgent.js

import { logAgentActivity, logError } from '../utils/logger';

const RefundAgent = {
  name: 'RefundAgent',
  description: 'Manages refund requests, logic branching, auto-approvals, and flagging anomalies.',

  async execute(payload) {
    try {
      logAgentActivity('RefundAgent', 'Evaluating Refund Request', payload);

      const { orderValue, reason, customerHistory } = payload;

      if (orderValue < 50 && customerHistory === 'good') {
        return { status: 'approved', method: 'auto' };
      }

      if (reason === 'fraud' || customerHistory === 'risky') {
        return { status: 'escalated', reason: 'Manual review required' };
      }

      return { status: 'queued', reason: 'Needs manual confirmation' };
    } catch (error) {
      logError(error, 'RefundAgent::execute');
      return { status: 'error', message: error.message };
    }
  },
};

export default RefundAgent;
