// File: src/agents/ContentAgent.js

import { logAgentActivity, logError } from '../utils/logger';
import { generateExecutionId } from '../utils/helpers';

const ContentAgent = {
  name: 'ContentAgent',
  description: 'Creates and updates content including product descriptions, blog posts, meta tags, and marketing copy.',

  async execute(payload) {
    const executionId = generateExecutionId();
    logAgentActivity('ContentAgent', 'Execution started', { executionId, payload });

    try {
      const {
        contentType = 'productDescription',
        topic = '',
        product = {},
        tone = 'professional',
        wordCount = 150,
      } = payload;

      const generatedText = `This is a ${tone} ${contentType} for "${product.name || topic}" with around ${wordCount} words.`;

      logAgentActivity('ContentAgent', 'Generated content', {
        executionId,
        content: generatedText,
      });

      return {
        status: 'success',
        executionId,
        contentType,
        output: generatedText,
        source: 'AI Engine',
      };
    } catch (err) {
      logError(err, 'ContentAgent::execute');
      return {
        status: 'error',
        message: err.message,
      };
    }
  },
};

export default ContentAgent;
