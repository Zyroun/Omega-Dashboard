// File: src/utils/helpers.js

/**
 * Introduces an artificial delay
 * @param {number} ms - Milliseconds to wait
 */
export const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Generates a unique execution ID with timestamp and random seed
 */
export const generateExecutionId = () =>
  `EX-${Date.now()}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;

/**
 * Formats a number into a currency string (default USD)
 * @param {number} value - Numeric value
 * @param {string} currency - Currency code (e.g., 'USD')
 */
export const formatCurrency = (value, currency = 'USD') =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(value);

/**
 * Determines an adaptive strategy based on detected patterns
 * Handles both basic and advanced triggers across the system
 */
export const getAdaptiveStrategy = (pattern) => {
  const normalized = pattern.toLowerCase();

  if (normalized.includes('high traffic')) return 'scale_up_infra';
  if (normalized.includes('low sales')) return 'adjust_price';
  if (normalized.includes('cart abandonment')) return 'send_discount_email';
  if (normalized.includes('drop')) return 'adjustPricing';
  if (normalized.includes('surge')) return 'scaleInventory';

  return 'default_monitor';
};

/**
 * Returns the agent endpoint route based on its name
 */
export const getAgentEndpoint = (agentName) => {
  return `/api/agents/${agentName.toLowerCase()}`;
};

/**
 * Generates a basic AI decision payload to guide agent behavior
 */
export const generateAIInsight = (agent, payload) => {
  return {
    recommendedAction: 'analyze',
    context: {
      agent,
      payloadSnapshot: payload,
    },
    metaScore: Math.random().toFixed(4),
  };
};

/**
 * Sanitizes user input to prevent HTML injection/XSS
 */
export const sanitizeInput = (input) => {
  if (typeof input !== 'string') return input;
  return input.replace(/[<>]/g, '');
};

