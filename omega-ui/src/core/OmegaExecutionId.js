// File: src/core/OmegaExecutionId.js

import { v4 as uuidv4 } from 'uuid';
import { log, logError, logSystemHealth } from '../utils/logger';

const activeExecutions = new Map();

export const generateExecutionId = (agentName = 'UNKNOWN_AGENT') => {
  const id = uuidv4();
  const timestamp = new Date().toISOString();

  const metadata = {
    id,
    agent: agentName,
    timestamp,
    status: 'INITIATED',
  };

  activeExecutions.set(id, metadata);

  log(`[Execution Start] ID: ${id} | Agent: ${agentName}`, 'EXECUTION');
  return id;
};

export const updateExecutionStatus = (id, status, data = {}) => {
  if (!activeExecutions.has(id)) {
    logError(`Execution ID not found: ${id}`, 'EXECUTION');
    return;
  }

  const metadata = activeExecutions.get(id);
  metadata.status = status;
  metadata.updatedAt = new Date().toISOString();
  metadata.details = { ...metadata.details, ...data };

  activeExecutions.set(id, metadata);

  log(`[Execution Updated] ID: ${id} | Status: ${status}`, 'EXECUTION');
};

export const endExecution = (id) => {
  if (!activeExecutions.has(id)) {
    logError(`Execution ID not found on termination: ${id}`, 'EXECUTION');
    return;
  }

  const metadata = activeExecutions.get(id);
  metadata.status = 'COMPLETED';
  metadata.completedAt = new Date().toISOString();

  log(`[Execution Ended] ID: ${id}`, 'EXECUTION');
  activeExecutions.delete(id);
};

export const getExecutionMetadata = (id) => {
  return activeExecutions.get(id) || null;
};
