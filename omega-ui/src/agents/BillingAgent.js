import { logAgentActivity, logError } from '../utils/logger';
import { delay, formatCurrency } from '../utils/helpers';

const BillingAgent = {
  name: 'BillingAgent',
  description: 'Handles billing cycles, invoicing, payments, refunds, and subscription monetisation flows.',

  async execute(payload) {
    logAgentActivity('BillingAgent', 'Execution Started', payload);

    try {
      const { eventType, customerId, amount, currency = 'USD', invoiceId } = payload;

      let actionTaken = '';
      let responseDetails = {};

      switch (eventType) {
        case 'generate_invoice':
          actionTaken = 'invoice_generated';
          responseDetails = {
            invoiceId: `INV-${Date.now()}`,
            customerId,
            amount: formatCurrency(amount, currency),
          };
          break;

        case 'charge_payment':
          actionTaken = 'payment_charged';
          responseDetails = {
            invoiceId,
            customerId,
            amountCharged: formatCurrency(amount, currency),
            status: 'paid',
          };
          break;

        case 'retry_failed_payment':
          actionTaken = 'retry_triggered';
          responseDetails = {
            invoiceId,
            attempt: 1,
            status: 'pending',
          };
          break;

        case 'issue_refund':
          actionTaken = 'refund_issued';
          responseDetails = {
            invoiceId,
            amountRefunded: formatCurrency(amount, currency),
            status: 'refunded',
          };
          break;

        default:
          actionTaken = 'no_valid_event';
          responseDetails = { info: 'Unrecognized billing event' };
          break;
      }

      await delay(300); // simulate processing
      logAgentActivity('BillingAgent', 'Billing Event Processed', {
        eventType,
        actionTaken,
        details: responseDetails,
      });

      return {
        status: 'success',
        action: actionTaken,
        details: responseDetails,
      };
    } catch (err) {
      logError(err, 'BillingAgent::execute');
      return {
        status: 'error',
        message: err.message,
      };
    }
  },
};

export default BillingAgent;
