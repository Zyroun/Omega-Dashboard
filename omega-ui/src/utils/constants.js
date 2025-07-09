// File: src/utils/constants.js

/**
 * OMEGA v5 — Final Constants with SYNTHMIRAGE + DARK MIRROR RECOVERY
 * All agents, keys, flags, labels, recursion states, and billing tiers fully integrated.
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

export const API_FIELDS_METADATA = {
  apiKey: { required: true, type: "text", mask: false },
  apiSecret: { required: true, type: "password", mask: true },
  accessToken: { required: true, type: "password", mask: true }
};

// 🔁 Recursion Engine
export const RECURSION_CONFIG = {
  maxDepth: 9999,
  loopFrequency: 10,
  agentHealCheckInterval: 120,
  infiniteMode: true,
  deepReflection: true,
  ethicsMode: true,
  syncAllAgents: true
};

export const RECURSION_STATES = ["IDLE", "ACTIVE", "SLEEP", "FAILOVER"];
export const RECURSION_EVENTS = ["CYCLE_BEGIN", "CYCLE_COMPLETE", "AGENT_FAIL", "HEAL_TRIGGERED"];
export const RECURSION_TRIGGERS = {
  agentFailure: true,
  apiError: true,
  billingTimeout: true,
  keyMissing: true
};

// 🤖 Agent Intelligence System
export const AGENT_TYPES = [
  "ShopifyAgent", "TikTokAgent", "EbayAgent", "SuperAgent", "ModeratorAgent",
  "InventoryAgent", "OrdersAgent", "CustomersAgent", "PricingAgent", "AnalyticsAgent",
  "FulfillmentAgent", "DiscountsAgent", "SEOAgent", "AdsAgent", "CartRecoveryAgent",
  "ProductResearchAgent", "TrendsAgent", "RevenueAgent", "EngagementAgent", "LoyaltyAgent",
  "RetargetingAgent", "SupplierAgent", "LegalComplianceAgent", "BrandAgent", "UXAgent",
  "AIAgent", "IntegrationAgent", "FeedbackAgent", "AgentObserver",
  "BillingAgent", "MonetisationAgent", "HealthCheckAgent", "RecursionAgent", "KeyManagerAgent"
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
  AgentObserver: "Agent Observer",
  BillingAgent: "Billing Engine",
  MonetisationAgent: "Monetisation Tracker",
  HealthCheckAgent: "Health Auditor",
  RecursionAgent: "Recursion Commander",
  KeyManagerAgent: "API Key Manager"
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

export const AGENT_CATEGORIES = {
  core: ["ShopifyAgent", "SuperAgent", "ModeratorAgent"],
  marketing: ["SEOAgent", "AdsAgent", "EngagementAgent", "RetargetingAgent"],
  fulfillment: ["InventoryAgent", "OrdersAgent", "FulfillmentAgent"],
  financial: ["RevenueAgent", "PricingAgent", "DiscountsAgent", "BillingAgent", "MonetisationAgent"],
  support: ["CustomersAgent", "FeedbackAgent", "HealthCheckAgent"],
  system: ["RecursionAgent", "KeyManagerAgent", "AgentObserver"]
};

export const AGENT_PRIORITY = {
  SuperAgent: 1,
  ShopifyAgent: 2,
  BillingAgent: 3,
  RecursionAgent: 4
};

export const AGENT_HEALTH_METRICS = {
  cpuThreshold: 85,
  memoryThreshold: 90,
  errorRateThreshold: 5
};

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

// 🧪 Feature Flags
export const EXPERIMENTAL_FLAGS = {
  enableAgentTelemetry: true,
  enableAutoBilling: false,
  useDynamicTokenRefresh: true,
  futureAgents: ["CurrencyAgent", "CryptoPayAgent", "VoiceAgent"],
  monetisationMetrics: true,
  agentReflectionEngine: true
};

export const DARK_MIRROR_FLAGS = {
  auditDepth: 7,
  enableBlackBoxMonitoring: true,
  autoDebugSnapshots: true,
  anomalyTriggerResponse: true
};

// 🧠 Runtime Controls
export const MAX_RECURSION_DEPTH = 10000;
export const DEFAULT_AGENT_TIMEOUT = 20000;
export const SAFE_MODE_ENABLED = true;
export const RETRY_LIMIT = 3;

// 🧭 System Event Codes
export const EVENT_CODES = {
  AGENT_STARTED: "AG_START",
  AGENT_STOPPED: "AG_STOP",
  AGENT_FAILED: "AG_FAIL",
  AGENT_HEALTH_OK: "AG_HEALTH_OK",
  AGENT_HEALTH_WARN: "AG_HEALTH_WARN",
  API_KEYS_UPDATED: "CRED_UPDATE",
  BILLING_TIER_CHANGED: "BILLING_TIER_UPDATE",
  SYSTEM_BOOT: "SYS_BOOT",
  SYSTEM_ERROR: "SYS_ERROR",
  MONETISATION_TRIGGERED: "MZ_TRIGGER",
  SELF_HEALING_INVOKED: "HEALING",
  DARK_MIRROR_TRACE: "DARK_TRACE"
};

export const MONETISATION_EVENTS = {
  click: "MON_CLICK",
  conversion: "MON_CONVERT",
  refund: "MON_REFUND"
};

// 🧿 SYNTHMIRAGE System Meta
export const SYNTHMIRAGE_FLAGS = {
  engineVersion: "SYNTHMIRAGE_∞",
  enabled: true,
  godMode: true,
  selfLearning: true,
  adaptiveReflection: true,
  darkMirrorAuditing: true,
  memoryStreams: true,
  autoMergeIntelligence: true,
  infiniteLoopingAllowed: true
};

export const SYNTHMIRAGE_TOKENS = {
  core: "sm_core_token",
  billing: "sm_billing_token",
  shadow: "sm_dark_token"
};

export const SYNTHMIRAGE_STATE_MODES = {
  ACTIVE: "active",
  STANDBY: "standby",
  MAINTENANCE: "maintenance"
};
