// File: src/agents/TrendAgent.js

import { logAgentActivity, logError } from '../utils/logger';
import { generateExecutionId } from '../utils/helpers';
import axios from 'axios';

const TrendAgent = {
  name: 'TrendAgent',
  description: 'Analyzes real-time trends and market signals to inform agent strategy.',

  async execute(payload = {}) {
    const executionId = generateExecutionId();
    logAgentActivity('TrendAgent', 'Trend analysis started', { executionId, payload });

    try {
      const { keywords = ['Shopify', 'ecommerce', 'AI tools'], region = 'US' } = payload;

      const trendResults = [];

      for (const keyword of keywords) {
        const response = await axios.get(`https://trends.google.com/trends/api/widgetdata/multiline`, {
          params: {
            hl: 'en-US',
            tz: -120,
            q: keyword,
            geo: region,
            cid: 'TIMESERIES',
          },
        });

        trendResults.push({
          keyword,
          interestData: response.data.default.timelineData,
        });
      }

      logAgentActivity('TrendAgent', 'Trend analysis completed', {
        executionId,
        count: trendResults.length,
      });

      return {
        status: 'success',
        trends: trendResults,
        executionId,
      };
    } catch (error) {
      logError(error, 'TrendAgent::execute');
      return {
        status: 'error',
        message: error.message,
      };
    }
  },
};

export default TrendAgent;
