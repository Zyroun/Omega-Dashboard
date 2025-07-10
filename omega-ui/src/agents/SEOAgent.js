// File: src/agents/SEOAgent.js

import { logAgentActivity, logError } from '../utils/logger';
import { triggerAgentResponse } from '../api/agentRouter';
import { generateExecutionId, scoreKeywords, suggestBacklinkPartners } from '../utils/helpers';
import { OmegaKernel } from '../core/OmegaKernel';

const SEOAgent = {
  name: 'SEOAgent',
  description: 'Optimizes metadata, content, backlinks, and organic SEO positioning using AI-enhanced logic.',

  async execute(payload) {
    const executionId = generateExecutionId();
    logAgentActivity('SEOAgent', 'SEO Execution Initiated', { executionId, payload });

    try {
      const {
        keywords = [],
        targetPages = [],
        backlinkSources = [],
        domainAuthorityThreshold = 30,
        autoScore = true,
        monetizationSync = true,
        deepAudit = false
      } = payload;

      // Score keywords if autoScore is enabled
      let scoredKeywords = keywords;
      if (autoScore) {
        scoredKeywords = scoreKeywords(keywords);
        logAgentActivity('SEOAgent', 'Keyword scoring completed', { scoredKeywords });
      }

      // Step 1: Optimize Content via ContentAgent
      await triggerAgentResponse('ContentAgent', {
        type: 'seo_update',
        keywords: scoredKeywords,
        targetPages,
        embedSchema: true,
        internalLinking: true
      });

      // Step 2: Secure high-DA backlinks via BacklinkAgent
      const backlinksToTarget = backlinkSources.length
        ? backlinkSources
        : suggestBacklinkPartners(scoredKeywords, domainAuthorityThreshold);

      await triggerAgentResponse('BacklinkAgent', {
        type: 'outreach',
        sources: backlinksToTarget,
        anchorText: scoredKeywords.map(k => k.term).join(', '),
        context: targetPages
      });

      // Step 3: Benchmark organic impact via AnalyticsAgent
      await triggerAgentResponse('AnalyticsAgent', {
        type: 'benchmark',
        metric: 'organic_traffic',
        compareTo: 'last_month',
        detailed: true
      });

      // Optional: Trigger monetization synergy
      if (monetizationSync) {
        await OmegaKernel.ignite(['MonetizationAgent'], {
          type: 'seo_signal',
          keywords: scoredKeywords,
          triggerFrom: 'SEOAgent',
        });
      }

      // Optional: Run deep audit if required
      if (deepAudit) {
        await triggerAgentResponse('DiagnosticAgent', {
          type: 'audit',
          focus: 'seo',
          executionId,
        });
      }

      const result = {
        status: 'SEO flow complete',
        executionId,
        scoredKeywords,
        backlinksTargeted: backlinksToTarget.length,
        pagesOptimized: targetPages.length,
        monetizationTriggered: monetizationSync,
        auditRun: deepAudit
      };

      logAgentActivity('SEOAgent', 'SEO process finalized', result);

      return {
        status: 'success',
        result,
      };

    } catch (error) {
      logError(error, 'SEOAgent::execute');
      return {
        status: 'error',
        message: error.message,
      };
    }
  },
};

export default SEOAgent;
