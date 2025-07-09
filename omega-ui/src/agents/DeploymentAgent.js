// DeploymentAgent.js
import logger from '../utils/logger';
import { exec } from 'child_process';
import util from 'util';

const execPromise = util.promisify(exec);

/**
 * DeploymentAgent handles automated deployment to Render, GitHub Actions, or CI/CD pipelines.
 * Executes validated commit + push workflows and can auto-sync with n8n workflows.
 */
class DeploymentAgent {
  constructor(repoURL = '', branch = 'main') {
    this.repoURL = repoURL;
    this.branch = branch;
    this.lastDeploy = null;
  }

  async deploy() {
    try {
      logger.info('[DeploymentAgent] Starting deployment...');

      await execPromise('git add .');
      await execPromise(`git commit -m "🚀 Omega Auto Deployment @ ${new Date().toISOString()}"`);
      await execPromise(`git push origin ${this.branch}`);

      this.lastDeploy = new Date().toISOString();
      logger.success(`[DeploymentAgent] Deployment complete at ${this.lastDeploy}`);

      return { status: 'success', timestamp: this.lastDeploy };
    } catch (err) {
      logger.error('[DeploymentAgent] Deployment failed', err);
      return { status: 'failed', error: err.message };
    }
  }

  getDeploymentStatus() {
    return {
      repo: this.repoURL,
      branch: this.branch,
      lastDeploy: this.lastDeploy || 'Not deployed yet',
    };
  }
}

export default DeploymentAgent;
