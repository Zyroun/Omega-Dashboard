// File: src/core/RecursiveOrchestrator.js

import { OmegaKernel } from './OmegaKernel';
import { logAgentActivity, logError } from '../utils/logger';

const RecursiveOrchestrator = {
  name: 'RecursiveOrchestrator',
  description: 'Handles recursive execution logic for agents based on signals, success, failure, and adaptation layers.',

  async loop(payload = {}, cycle = 1) {
    const MAX_RECURSION_DEPTH = 5;
    const trace = {
      cycle,
      startedAt: new Date().toISOString(),
      triggerSource: payload.triggerSource || 'MasterAgent',
    };

    try {
      logAgentActivity('RecursiveOrchestrator', `Cycle ${cycle} Start`, trace);

      // Step 1: Run Revenue + Diagnostic Intelligence Loop
      const agentsToRun = [
        'RevenueAgent',
        'DiagnosticAgent',
        'AnalyticsAgent',
        'ConversionAgent',
        'UXAgent',
        'SEOAgent',
      ];

      const result = await OmegaKernel.ignite(agentsToRun, {
        recursive: true,
        triggerSource: trace.triggerSource,
        trace,
      });

      logAgentActivity('RecursiveOrchestrator', 'Loop Execution Complete', { result, cycle });

      // Step 2: Evaluate need for relooping based on result
      const shouldRecurse =
        result?.some?.((res) => res?.status !== 'optimal') ||
        result?.length < agentsToRun.length;

      if (cycle < MAX_RECURSION_DEPTH && shouldRecurse) {
        logAgentActivity('RecursiveOrchestrator', `Recursing Cycle ${cycle + 1}`);
        return this.loop(payload, cycle + 1);
      }

      logAgentActivity('RecursiveOrchestrator', 'Loop Finished');
      return { status: 'complete', finalCycle: cycle, agentsProcessed: agentsToRun.length };
    } catch (error) {
      logError(error, 'RecursiveOrchestrator::loop');

      await OmegaKernel.ignite(['DiagnosticAgent', 'MasterAgent'], {
        issue: 'Recursive loop failure',
        payload,
        cycle,
      });

      return { status: 'error', message: error.message, cycle };
    }
  },
};

export default RecursiveOrchestrator;
