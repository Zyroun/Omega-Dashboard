// File: src/core/OmegaKernel.js

import { OmegaConvergence } from './OmegaConvergence';
import { logSystemHealth } from '../utils/logger';

export const OmegaKernel = {
  async ignite(agentList, payload) {
    logSystemHealth('OMEGA_KERNEL_IGNITION_STARTED', { agents: agentList });

    const results = await OmegaConvergence.converge(agentList, payload);

    logSystemHealth('OMEGA_KERNEL_IGNITION_COMPLETED', { results });

    return results;
  },

  async broadcastAction(pattern, agentList) {
    for (const agent of agentList) {
      OmegaConvergence.decide(agent, pattern);
    }
  },
};

export default OmegaKernel;
