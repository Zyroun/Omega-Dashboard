// File: src/utils/logger.js

export const log = (message, context = 'GENERAL') => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}][${context}]`, message);
};

export const logError = (error, context = 'ERROR') => {
  const timestamp = new Date().toISOString();
  console.error(`[${timestamp}][${context}]`, error);
};

export const logAgentActivity = (agentName, activity, data = {}) => {
  const timestamp = new Date().toISOString();
  console.log(
    `[${timestamp}][AGENT][${agentName}] - ${activity}`,
    JSON.stringify(data, null, 2)
  );
};

export const logSystemHealth = (status, metadata = {}) => {
  const timestamp = new Date().toISOString();
  console.log(
    `[${timestamp}][SYSTEM HEALTH] - ${status}`,
    JSON.stringify(metadata, null, 2)
  );
};

export const logRecursionLoop = (loopId, level, metadata = {}) => {
  const timestamp = new Date().toISOString();
  console.log(
    `[${timestamp}][RECURSION][Loop #${loopId}][Level ${level}]`,
    JSON.stringify(metadata, null, 2)
  );
};
