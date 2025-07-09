// ShopifyHeavyLoadAgent.js
import { getShopifyCredentials } from '../api/credentials';
import { syncInventory, syncOrders, syncProducts } from '../utils/helpers';
import logger from '../utils/logger';

/**
 * Central smart balancer that distributes tasks across all Shopify-related agents,
 * optimised for high-throughput, concurrency, and self-repairing fallback logic.
 */
class ShopifyHeavyLoadAgent {
  constructor(overrides = {}) {
    this.credentials = getShopifyCredentials(overrides);
    this.loadStatus = {
      inventory: false,
      orders: false,
      products: false,
    };
    this.retryCount = 0;
  }

  async executeAll() {
    try {
      logger.info('[ShopifyHeavyLoadAgent] Starting full data sync');
      await Promise.all([
        this.syncInventory(),
        this.syncOrders(),
        this.syncProducts(),
      ]);
      logger.success('[ShopifyHeavyLoadAgent] All sync operations complete');
    } catch (err) {
      logger.error('[ShopifyHeavyLoadAgent] Execution failed', err);
      if (this.retryCount < 3) {
        this.retryCount++;
        logger.warn(`[ShopifyHeavyLoadAgent] Retrying... attempt ${this.retryCount}`);
        await this.executeAll();
      } else {
        throw new Error('ShopifyHeavyLoadAgent failed after multiple attempts');
      }
    }
  }

  async syncInventory() {
    logger.info('[Inventory Sync] Starting...');
    await syncInventory(this.credentials);
    this.loadStatus.inventory = true;
    logger.success('[Inventory Sync] Complete');
  }

  async syncOrders() {
    logger.info('[Orders Sync] Starting...');
    await syncOrders(this.credentials);
    this.loadStatus.orders = true;
    logger.success('[Orders Sync] Complete');
  }

  async syncProducts() {
    logger.info('[Products Sync] Starting...');
    await syncProducts(this.credentials);
    this.loadStatus.products = true;
    logger.success('[Products Sync] Complete');
  }

  getStatus() {
    return this.loadStatus;
  }
}

export default ShopifyHeavyLoadAgent;
