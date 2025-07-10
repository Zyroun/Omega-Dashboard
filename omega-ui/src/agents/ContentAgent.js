// File: src/agents/ContentAgent.js

import { logAgentActivity, logError } from '../utils/logger';
import { generateExecutionId } from '../utils/helpers';
import axios from 'axios';

const ContentAgent = {
  name: 'ContentAgent',
  description: 'Generates and rewrites AI-optimized content for storefronts, blogs, and product listings.',

  async execute(payload) {
    const executionId = generateExecutionId();
    logAgentActivity('ContentAgent', 'Content generation initiated', { executionId, payload });

    try {
      const {
        contentType = 'product_description',  // blog_post, landing_page
        keywords = [],
        tone = 'informative',
        targetPages = [],
        rewriteExisting = false,
      } = payload;

      const generatedContent = [];

      for (const page of targetPages) {
        const response = await axios.post('https://api.openai.com/v1/chat/completions', {
          model: 'gpt-4',
          messages: [
            {
              role: 'system',
              content: `You are a Shopify AI Content Strategist. Write ${contentType.replace('_', ' ')} in a ${tone} tone using keywords: ${keywords.join(', ')}.`,
            },
            {
              role: 'user',
              content: `Rewrite content for page: ${page}. Focus on SEO.`,
            },
          ],
        }, {
          headers: {
            'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
            'Content-Type': 'application/json',
          },
        });

        generatedContent.push({
          page,
          content: response.data.choices[0].message.content,
        });
      }

      logAgentActivity('ContentAgent', 'Content generation completed', {
        executionId,
        count: generatedContent.length,
      });

      return {
        status: 'success',
        contentGenerated: generatedContent,
        executionId,
      };
    } catch (error) {
      logError(error, 'ContentAgent::execute');
      return {
        status: 'error',
        message: error.message,
      };
    }
  },
};

export default ContentAgent;
