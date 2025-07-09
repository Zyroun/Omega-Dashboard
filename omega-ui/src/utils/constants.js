// File: src/utils/constants.js

// Global Labels and Branding
export const SYSTEM_NAME = "Omega Automated Ecosystem";
export const UI_BRANDING = {
  theme: 'dark',
  accentColor: '#00FFC6',
  logoPath: '/favicon.ico'
};

// Shopify API Credential Labels
export const SHOPIFY_API_KEYS = {
  API_KEY: "e6a99e604bf66a48f7d7d9c963a7adfe",
  API_SECRET_KEY: "7a14f99acefedb14634d67d9d4a4fa16",
  ADMIN_API_ACCESS_TOKEN: "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"
};

// Optional Credential Inputs - Can be updated via UI
export const DEFAULT_CREDENTIALS_STATE = {
  apiKey: '',
  apiSecret: '',
  accessToken: '',
  overrideMode: false
};

// Omega Recursion Config
export const RECURSION_CONFIG = {
  maxDepth: 1000,
  loopFrequency: 10, // in seconds
  agentHealCheckInterval: 300, // in seconds
  infiniteMode: true,
  deepReflection: true,
  ethicsMode: true,
  syncAllAgents: true
};

// UI Toggle Defaults
export const AGENT_TOGGLES = {
  ModeratorAgent: true,
  SuperAgent: true,
  ShopifyAgent: true,
  TikTokAgent: false,
  EbayAgent: false,
  AIAgent: true,
  FeedbackAgent: true
};

// Billing Tiers
export const BILLING_TIERS = {
  free: {
    maxAgents: 3,
    recursionLevel: 1,
    support: false
  },
  pro: {
    maxAgents: 15,
    recursionLevel: 3,
    support: true
  },
  enterprise: {
    maxAgents: 100,
    recursionLevel: 999,
    support: true,
    SLA: '24/7 Dedicated Support'
  }
};
