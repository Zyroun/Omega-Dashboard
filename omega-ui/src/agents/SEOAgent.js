// File: src/agents/SEOAgent.js

import { logAgentActivity, logError } from '../utils/logger';
import { triggerAgentResponse } from '../api/agentRouter';
import { generateExecutionId } from '../utils/helpers';

const SEOAgent = {
  name: 'SEOAgent',
  description: 'Optimizes metadata, content, and backlinks for improved search engine ranking and organic visibility.',

  async execute(payload) {
    const executionId = generateExecutionId();
    logAgentActivity('SEOAgent', 'SEO process started', { executionId, payload });

    try {
      const { keywords = [], targetPages = [], backlinkSources = [] } = payload;

      // Step 1: Trigger ContentAgent for optimized metadata/content updates
      await triggerAgentResponse('ContentAgent', {
        type: 'seo_update',
        keywords,
        targetPages,
      });

      // Step 2: Trigger BacklinkAgent to secure backlinks from relevant sources
      await triggerAgentResponse('BacklinkAgent', {
        type: 'outreach',
        sources: backlinkSources,
        anchorText: keywords.join(', '),
      });

      // Step 3: Trigger AnalyticsAgent to benchmark performance improvements
      await triggerAgentResponse('AnalyticsAgent', {
        type: 'benchmark',
        metric: 'organic_traffic',
        compareTo: 'last_month',
      });

      const result = {
        status: 'SEO strategy initiated',
        executionId,
        keywordsUsed: keywords,
        pagesOptimized: targetPages.length,
        backlinksTargeted: backlinkSources.length,
      };

      logAgentActivity('SEOAgent', 'SEO process completed', result);

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
