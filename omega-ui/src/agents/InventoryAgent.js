import { logAgentActivity, logError } from '../utils/logger';
import { triggerAgentResponse } from '../api/agentRouter';
import { getAdaptiveStrategy } from '../utils/helpers';

const InventoryAgent = {
  name: 'InventoryAgent',
  description: 'Monitors and manages product stock, auto-reordering and scaling as needed.',

  async execute(payload) {
    logAgentActivity('InventoryAgent', 'Received Payload', payload);

    try {
      const strategy = getAdaptiveStrategy(payload.pattern || '');
      const inventoryCommand = {
        action: strategy === 'scale_up_infra' ? 'restock' : 'audit',
        context: payload,
      };

      const response = await triggerAgentResponse('InventoryAgent', inventoryCommand);

      logAgentActivity('InventoryAgent', 'Executed strategy', {
        strategy,
        response,
      });

      return {
        status: 'success',
        strategy,
        response,
      };
    } catch (error) {
      logError(error, 'InventoryAgent::execute');
      return {
        status: 'error',
        message: error.message,
      };
    }
  },
};

export default InventoryAgent;
