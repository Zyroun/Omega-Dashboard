// File: src/agents/ModeratorAgent.js

import { logAgentActivity, logError } from '../utils/logger';

const policyRules = {
  preventHighRiskOperations: true,
  requireReviewForRefunds: true,
  maxDiscountThreshold: 50, // percent
};

const ModeratorAgent = {
  name: 'ModeratorAgent',
  description: 'Moderates actions, enforces rules, policies, and thresholds for ethical automation.',

  validate(action, context) {
    if (policyRules.preventHighRiskOperations && action.includes('purge')) {
      return { valid: false, reason: 'High-risk operation blocked.' };
    }

    if (action.includes('discount') && context.discount > policyRules.maxDiscountThreshold) {
      return { valid: false, reason: 'Discount exceeds threshold.' };
    }

    if (action === 'refund' && policyRules.requireReviewForRefunds && !context.manualApproval) {
      return { valid: false, reason: 'Refund requires manual review.' };
    }

    return { valid: true };
  },

  async execute({ action, context }) {
    logAgentActivity('ModeratorAgent', 'Validation Started', { action, context });

    try {
      const result = this.validate(action, context);
      logAgentActivity('ModeratorAgent', 'Validation Result', result);
      return result;
    } catch (error) {
      logError(error, 'ModeratorAgent::execute');
      return {
        valid: false,
        error: error.message,
      };
    }
  },
};

export default ModeratorAgent;
