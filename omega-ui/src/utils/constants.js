// File: src/utils/constants.js

/**
 * Omega Constants — Final SYNTHMIRAGE Merge
 * Production-grade, investor-ready, and recursive ecosystem constants file.
 */

// 🔷 System Metadata
export const SYSTEM_NAME = "Omega Shopify Management Ecosystem";
export const UI_BRANDING = {
  theme: "dark",
  accentColor: "#00FFC6",
  logoPath: "/favicon.ico",
  poweredBy: "SYNTHMIRAGE Engine v∞",
  badge: "GODMODE_ACTIVE"
};

// 🔐 Shopify API Credentials (UI-managed)
export const SHOPIFY_API_KEYS = {
  API_KEY: "e6a99e604bf66a48f7d7d9c963a7adfe",
  API_SECRET_KEY: "7a14f99acefedb14634d67d9d4a4fa16",
  ADMIN_API_ACCESS_TOKEN: "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"
};

export const DEFAULT_CREDENTIALS_STATE = {
  apiKey: "",
  apiSecret: "",
  accessToken: "",
  overrideMode: false
};

export const API_FIELD_LABELS = {
  apiKey: "Shopify API Key",
  apiSecret: "API Secret Key",
  accessToken: "Admin Access Token"
};

// 🤖 Agent System
export const AGENT_TYPES = [
  "ShopifyAgent", "TikTokAgent", "EbayAgent", "SuperAgent", "ModeratorAgent",
  "InventoryAgent", "OrdersAgent", "CustomersAgent", "PricingAgent", "AnalyticsAgent",
  "FulfillmentAgent", "DiscountsAgent", "SEOAgent", "AdsAgent", "CartRecoveryAgent",
  "ProductResearchAgent", "TrendsAgent", "RevenueAgent", "EngagementAgent", "LoyaltyAgent",
  "RetargetingAgent", "SupplierAgent", "LegalComplianceAgent", "BrandAgent", "UXAgent",
  "AIAgent", "IntegrationAgent", "FeedbackAgent", "AgentObserver"
];

export const AGENT_LABELS = {
  ShopifyAgent: "Shopify Ops",
  TikTokAgent: "TikTok Manager",
  EbayAgent: "eBay Manager",
  SuperAgent: "Central Coordinator",
  ModeratorAgent: "Moderator",
  InventoryAgent: "Inventory AI",
  OrdersAgent: "Orders Manager",
  CustomersAgent: "Customer Manager",
  PricingAgent: "Pricing AI",
  AnalyticsAgent: "Analytics",
  FulfillmentAgent: "Fulfillment",
  DiscountsAgent: "Discount Engine",
  SEOAgent: "SEO Manager",
  AdsAgent: "Ad Engine",
  CartRecoveryAgent: "Cart Recovery",
  ProductResearchAgent: "Product Research",
  TrendsAgent: "Market Trends",
  RevenueAgent: "Revenue Optimizer",
  EngagementAgent: "Engagement Tracker",
  LoyaltyAgent: "Loyalty Builder",
  RetargetingAgent: "Retargeting",
  SupplierAgent: "Supplier Bot",
  LegalComplianceAgent: "Legal Compliance",
  BrandAgent: "Brand Manager",
  UXAgent: "UX Optimizer",
  AIAgent: "AI Autopilot",
  IntegrationAgent: "API Integrator",
  FeedbackAgent: "Feedback Monitor",
  AgentObserver: "Agent Observer"
};

export const AGENT_ROUTES = AGENT_TYPES.reduce((routes, agent) => {
  routes[agent] = `/agent/${agent.toLowerCase()}`;
  return routes;
}, {});

export const AGENT_CONFIG = AGENT_TYPES.reduce((cfg, agent) => {
  cfg[agent] = {
    timeout: 20000,
    active: true,
    logLevel: "verbose"
  };
  return cfg;
}, {});

// 🧠 Omega Core System Flags
export const RECURSION_CONFIG = {
  maxDepth: 9999,
  loopFrequency: 10,
  agentHealCheckInterval: 120,
  infiniteMode: true,
  deepReflection: true,
  ethicsMode: true,
  syncAllAgents: true
};

export const DEFAULT_AGENT_HEALTH = {
  status: "idle",
  lastCheckIn: null,
  memoryUsage: 0,
  uptime: 0,
  successRate: 100,
  recursionCycles: 0
};

// 🧪 Feature Flags
export const EXPERIMENTAL_FLAGS = {
  enableAgentTelemetry: true,
  enableAutoBilling: false,
  useDynamicTokenRefresh: true,
  futureAgents: ["CurrencyAgent", "CryptoPayAgent", "VoiceAgent"]
};

// 🧠 Runtime Controls
export const MAX_RECURSION_DEPTH = 10000;
export const DEFAULT_AGENT_TIMEOUT = 20000;
export const SAFE_MODE_ENABLED = true;
export const RETRY_LIMIT = 3;

// 💳 Billing Config
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
    recursionLevel: 9999,
    support: true,
    SLA: "24/7 Dedicated Support"
  }
};

// 🧭 System Event Codes (For UI + Logging)
export const EVENT_CODES = {
  AGENT_STARTED: "AG_START",
  AGENT_STOPPED: "AG_STOP",
  AGENT_FAILED: "AG_FAIL",
  AGENT_HEALTH_OK: "AG_HEALTH_OK",
  AGENT_HEALTH_WARN: "AG_HEALTH_WARN",
  API_KEYS_UPDATED: "CRED_UPDATE",
  BILLING_TIER_CHANGED: "BILLING_TIER_UPDATE",
  SYSTEM_BOOT: "SYS_BOOT",
  SYSTEM_ERROR: "SYS_ERROR"
};

// 🧿 SYNTHMIRAGE System Meta
export const SYNTHMIRAGE_FLAGS = {
  engineVersion: "SYNTHMIRAGE_∞",
  enabled: true,
  godMode: true,
  selfLearning: true,
  adaptiveReflection: true,
  darkMirrorAuditing: true,
  memoryStreams: true
};
