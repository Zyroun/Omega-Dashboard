import { logAgentActivity, logError } from '../utils/logger';
import { delay } from '../utils/helpers';

const EmailAgent = {
  name: 'EmailAgent',
  description: 'Handles email marketing: cart recovery, promotions, surge discounts, etc.',

  async execute(payload) {
    logAgentActivity('EmailAgent', 'Execution Started', payload);

    try {
      const { triggerType, userSegment, discountCode } = payload;

      let action = 'none';

      switch (triggerType) {
        case 'cart_abandonment':
          action = 'send_cart_recovery_email';
          break;
        case 'traffic_surge':
          action = 'send_discount_blast';
          break;
        case 'low_sales':
          action = 'reactivate_inactive_customers';
          break;
        default:
          action = 'send_generic_promo';
          break;
      }

      await delay(400); // simulate email API latency
      logAgentActivity('EmailAgent', 'Email Sent', {
        action,
        userSegment,
        discountCode,
      });

      return {
        status: 'success',
        actionExecuted: action,
        segmentTargeted: userSegment,
      };
    } catch (err) {
      logError(err, 'EmailAgent::execute');
      return {
        status: 'error',
        message: err.message,
      };
    }
  },
};

export default EmailAgent;
