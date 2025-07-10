import { logAgentActivity, logError } from '../utils/logger';
import { formatCurrency } from '../utils/helpers';

const PricingAgent = {
  name: 'PricingAgent',
  description: 'Adjusts product prices dynamically based on sales, traffic, and inventory patterns.',

  async execute(payload) {
    logAgentActivity('PricingAgent', 'Execution Started', payload);

    try {
      const { pattern, inventoryLevel, salesVelocity } = payload;

      let newPrice;
      if (pattern.includes('surge')) {
        newPrice = payload.currentPrice * 1.15;
      } else if (pattern.includes('drop') || inventoryLevel > 1000) {
        newPrice = payload.currentPrice * 0.9;
      } else {
        newPrice = payload.currentPrice;
      }

      logAgentActivity('PricingAgent', 'Price Adjusted', {
        oldPrice: formatCurrency(payload.currentPrice),
        newPrice: formatCurrency(newPrice),
      });

      return {
        status: 'success',
        oldPrice: payload.currentPrice,
        newPrice,
      };
    } catch (err) {
      logError(err, 'PricingAgent::execute');
      return { status: 'error', message: err.message };
    }
  },
};

export default PricingAgent;
