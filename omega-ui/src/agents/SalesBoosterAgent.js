// File: src/agents/SalesBoosterAgent.js

import { logAgentActivity, logError } from '../utils/logger';
import { getAdaptiveStrategy, generateExecutionId } from '../utils/helpers';
import { triggerAgentResponse } from '../api/agentRouter';

const SalesBoosterAgent = {
  name: 'SalesBoosterAgent',
  description: 'Activates intelligent sales-boosting strategies including discounts, urgency, and influencer signals.',

  async execute(payload) {
    const executionId = generateExecutionId();
    logAgentActivity('SalesBoosterAgent', 'Execution started', { executionId, payload });

    try {
      const { pattern = 'low sales', campaignTag = 'flash_discount', discountRate = 15 } = payload;
      const strategy = getAdaptiveStrategy(pattern);

      // Step 1: Trigger PricingAgent to update prices
      await triggerAgentResponse('PricingAgent', {
        type: 'adjust',
        strategy,
        discountRate,
        campaignTag,
      });

      // Step 2: Trigger EmailAgent to launch email blast
      await triggerAgentResponse('EmailAgent', {
        type: 'campaign',
        subject: 'Flash Sale!',
        content: `Exclusive ${discountRate}% off!`,
        tag: campaignTag,
      });

      // Step 3: Trigger SocialAgent to post urgency message
      await triggerAgentResponse('SocialAgent', {
        platform: 'instagram',
        content: `🚨 FLASH SALE: ${discountRate}% off now! 🚨 #${campaignTag}`,
      });

      const result = {
        status: 'sales boost initiated',
        strategy,
        campaignTag,
      };

      logAgentActivity('SalesBoosterAgent', 'Sales boost executed', {
        executionId,
        result,
      });

      return {
        status: 'success',
        executionId,
        result,
      };
    } catch (err) {
      logError(err, 'SalesBoosterAgent::execute');
      return {
        status: 'error',
        message: err.message,
      };
    }
  },
};

export default SalesBoosterAgent;
