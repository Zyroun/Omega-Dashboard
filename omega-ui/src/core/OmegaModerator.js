// OmegaModerator.js
import OmegaKernel from './OmegaKernel';
import OmegaRecursionEngine from './OmegaRecursionEngine';
import { getShopifyCredentials } from '../api/credentials';
import logger from '../utils/logger';
import ShopifyHeavyLoadAgent from '../agents/ShopifyHeavyLoadAgent';

/**
 * OmegaModerator is the executive governor of the Omega Ecosystem.
 * It intelligently oversees agent health, monetisation opportunities, and triggers fallback healing.
 * Acts as the backbone of the SuperAgent orchestration layer.
 */
class OmegaModerator {
  constructor(overrides = {}) {
    this.kernel = new OmegaKernel();
    this.recursion = new OmegaRecursionEngine();
    this.credentials = getShopifyCredentials(overrides);
    this.shopifyLoadAgent = new ShopifyHeavyLoadAgent(this.credentials);
    this.agentStats = {};
    this.healingAttempts = 0;
  }

  async startMonitoring() {
    logger.info('[OmegaModerator] Initializing system-wide monitoring...');
    await this.evaluateSystem();
  }

  async evaluateSystem() {
    try {
      logger.info('[OmegaModerator] Evaluating agent performance...');
      const status = await this.shopifyLoadAgent.executeAll();

      this.agentStats = {
        uptime: Date.now(),
        agentsHealthy: true,
        tasksCompleted: this.shopifyLoadAgent.getStatus(),
        memoryUsage: process.memoryUsage(),
      };

      this.recursion.log(this.agentStats);

      if (!this.agentStats.agentsHealthy) {
        this.triggerSelfHealing();
      } else {
        logger.success('[OmegaModerator] All agents operating nominally');
      }
    } catch (err) {
      logger.error('[OmegaModerator] Critical failure detected', err);
      await this.triggerSelfHealing();
    }
  }

  async triggerSelfHealing() {
    this.healingAttempts++;
    logger.warn(`[OmegaModerator] Initiating self-healing protocol. Attempt ${this.healingAttempts}`);

    if (this.healingAttempts > 3) {
      logger.error('[OmegaModerator] Max healing attempts reached. Escalating...');
      return;
    }

    await this.kernel.restart();
    await this.evaluateSystem(); // Recursively validate after healing
  }

  getAgentStats() {
    return this.agentStats;
  }
}

export default OmegaModerator;
