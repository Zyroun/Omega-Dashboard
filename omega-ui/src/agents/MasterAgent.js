// File: src/agents/MasterAgent.js

import { logAgentActivity, logError } from '../utils/logger';
import { OmegaKernel } from '../core/OmegaKernel';
import { getAdaptiveStrategy } from '../utils/helpers';

// All critical and monetisable intelligent agents
const agentRegistry = [
  'InventoryAgent',
  'PricingAgent',
  'TrafficAgent',
  'EmailAgent',
  'BillingAgent',
  'FulfillmentAgent',
  'BacklinkAgent',
  'DiagnosticAgent',
  'AnalyticsAgent',
  'SuperAnalyticsAgent',
  'RevenueAgent',
  'AutoConfigAgent',
  'ReputationAgent',
  'CustomerInsightsAgent',
  'FeedbackAgent',
  'LifecycleAgent',
];

const MasterAgent = {
  name: 'MasterAgent',
  description:
    'Oversees, monetizes, configures, heals, and orchestrates all agents with recursive intelligence and adaptive strategy.',

  async execute(commandPayload) {
    const {
      type,
      pattern = '',
      targetAgents = agentRegistry,
      options = {},
      feedbackEnabled = true,
    } = commandPayload;

    logAgentActivity('MasterAgent', 'Command Received', commandPayload);

    const strategy = getAdaptiveStrategy(pattern);
    logAgentActivity('MasterAgent', 'Adaptive Strategy Detected', { strategy });

    try {
      switch (type) {
        case 'broadcast':
          logAgentActivity('MasterAgent', 'Broadcasting pattern to agents', { pattern });
          await OmegaKernel.broadcastAction(pattern, targetAgents);
          break;

        case 'ignite':
          logAgentActivity('MasterAgent', 'Igniting Kernel with strategy', {
            targetAgents,
            strategy,
            options,
          });
          await OmegaKernel.ignite(targetAgents, { ...options, strategy });
          break;

        case 'diagnostics':
          logAgentActivity('MasterAgent', 'Running diagnostics via DiagnosticAgent');
          await OmegaKernel.ignite(['DiagnosticAgent'], { diagnostics: true });
          break;

        case 'monetize':
          logAgentActivity('MasterAgent', 'Initiating Monetisation Sequence');
          await OmegaKernel.broadcastAction('surge in high-converting traffic', [
            'RevenueAgent',
            'PricingAgent',
            'BacklinkAgent',
            'EmailAgent',
            'SuperAnalyticsAgent',
          ]);
          break;

        case 'optimize-revenue':
          logAgentActivity('MasterAgent', 'Revenue Optimization Triggered');
          await OmegaKernel.broadcastAction('low sales recovery', [
            'RevenueAgent',
            'LifecycleAgent',
            'CustomerInsightsAgent',
          ]);
          break;

        case 'auto-config':
          logAgentActivity('MasterAgent', 'Executing AutoConfigAgent');
          await OmegaKernel.ignite(['AutoConfigAgent'], {
            refreshSettings: true,
            strategy,
          });
          break;

        case 'reputation-scan':
          logAgentActivity('MasterAgent', 'Reputation Cleanup Initiated');
          await OmegaKernel.ignite(['ReputationAgent', 'FeedbackAgent'], {
            scanDepth: 'deep',
          });
          break;

        case 'heal':
          logAgentActivity('MasterAgent', 'Launching Self-Healing Mode');
          await OmegaKernel.ignite(['DiagnosticAgent', 'InventoryAgent', 'TrafficAgent'], {
            autoHeal: true,
          });
          break;

        default:
          logAgentActivity('MasterAgent', 'Unknown Command Type', { type });
          break;
      }

      // Optional feedback meta-loop
      if (feedbackEnabled) {
        logAgentActivity('MasterAgent', 'Initiating Feedback Loop');
        await OmegaKernel.ignite(['FeedbackAgent'], {
          meta: {
            command: type,
            pattern,
            strategy,
          },
        });
      }

      return {
        status: 'success',
        executed: type,
        agents: targetAgents,
        strategy,
      };
    } catch (error) {
      logError(error, 'MasterAgent::execute');
      return {
        status: 'error',
        message: error.message,
        fallback: 'Check agent execution path or agent status',
      };
    }
  },
};

export default MasterAgent;
