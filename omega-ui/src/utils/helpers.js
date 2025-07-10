// File: src/utils/helpers.js

export const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const generateExecutionId = () =>
  `EX-${Date.now()}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;

export const formatCurrency = (value, currency = 'USD') =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(value);

export const getAdaptiveStrategy = (pattern) => {
  // Very basic logic, can be replaced with AI model
  if (pattern.includes('high traffic')) return 'scale_up_infra';
  if (pattern.includes('low sales')) return 'adjust_price';
  if (pattern.includes('cart abandonment')) return 'send_discount_email';
  return 'default_monitor';
};

export const sanitizeInput = (input) => {
  if (typeof input !== 'string') return input;
  return input.replace(/[<>]/g, '');
};
