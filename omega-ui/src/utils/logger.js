// File: src/utils/logger.js
// 💠 SYNTHMIRAGE Engine Logger (Ultra-Merged Edition)
// ✅ Preserves ALL logging functions across all systems (UI, backend, core, recursion, agent orchestration)

export const SYNTHMIRAGE_LOG_PREFIX = "[Ω SYNTHMIRAGE LOG]";
export const SYNTHMIRAGE_ERROR_PREFIX = "[Ω SYNTHMIRAGE ERROR]";
export const SYNTHMIRAGE_WARN_PREFIX = "[Ω SYNTHMIRAGE WARNING]";

// === Timestamp Utility ===
function getTimestamp() {
  return new Date().toISOString();
}

// === BASE LOGGING (Generic Console) ===
export const log = (message, context = 'GENERAL') => {
  console.log(`[${getTimestamp()}][${context}]`, message);
};

export const logError = (error, context = 'ERROR') => {
  console.error(`[${getTimestamp()}][${context}]`, error);
};

// === SYNTHMIRAGE AGENT LOGGING ===

// Original version (no timestamp)
export function logInfo(agent, message) {
  console.log(`${SYNTHMIRAGE_LOG_PREFIX} (${agent}): ${message}`);
}

export function logErrorOriginal(agent, error) {
  console.error(`${SYNTHMIRAGE_ERROR_PREFIX} (${agent}):`, error);
}

// Enhanced version (with timestamp)
export function logInfoWithTimestamp(agent, message) {
  console.log(`${getTimestamp()} ${SYNTHMIRAGE_LOG_PREFIX} (${agent}): ${message}`);
}

export function logErrorWithTimestamp(agent, error) {
  console.error(`${getTimestamp()} ${SYNTHMIRAGE_ERROR_PREFIX} (${agent}):`, error);
}

export function logWarn(agent, message) {
  console.warn(`${getTimestamp()} ${SYNTHMIRAGE_WARN_PREFIX} (${agent}): ${message}`);
}

// === ADVANCED SYSTEM + AGENT INTELLIGENCE LOGGING ===

export const logAgentActivity = (agentName, activity, data = {}) => {
  console.log(
    `[${getTimestamp()}][AGENT][${agentName}] - ${activity}`,
    JSON.stringify(data, null, 2)
  );
};

export const logSystemHealth = (status, metadata = {}) => {
  console.log(
    `[${getTimestamp()}][SYSTEM HEALTH] - ${status}`,
    JSON.stringify(metadata, null, 2)
  );
};

export const logRecursionLoop = (loopId, level, metadata = {}) => {
  console.log(
    `[${getTimestamp()}][RECURSION][Loop #${loopId}][Level ${level}]`,
    JSON.stringify(metadata, null, 2)
  );
};
