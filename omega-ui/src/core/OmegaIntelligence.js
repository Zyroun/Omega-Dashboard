// File: src/core/OmegaIntelligence.js

import { logAgentActivity, logSystemHealth } from '../utils/logger';
import { OmegaConvergence } from './OmegaConvergence';
import { getSystemMetrics, detectPatterns } from '../utils/helpers';
import { OmegaMemory } from './OmegaMemory'; // optional long-term state memory module
import { getAdaptiveStrategy } from '../utils/helpers';

export class OmegaIntelligence {
  constructor() {
    this.patterns = [];
    this.loopCounter = 0;
    this.lastSystemState = {};
  }
  
export const OmegaIntelligence = {
  evaluatePatterns(agentName, data) {
    const patterns = data?.patterns || [];
    const decision = patterns.map(getAdaptiveStrategy);
  
  async initialize() {
    logSystemHealth('Initializing Omega Intelligence Engine...', {
      timestamp: new Date().toISOString(),
    });
    this.lastSystemState = await getSystemMetrics();
  }

  async observe(agentName, agentData) {
    this.loopCounter += 1;
    const pattern = detectPatterns(agentData);

    if (pattern) {
      this.patterns.push({
        agent: agentName,
        pattern,
        timestamp: new Date().toISOString(),
      });

      logAgentActivity(agentName, 'Pattern Detected', { pattern });
      await this.react(agentName, pattern);
    }

    if (this.loopCounter % 10 === 0) {
      const newState = await getSystemMetrics();
      this.learn(newState);
    }
  }

  async react(agentName, pattern) {
    // Forward to convergence engine
    OmegaConvergence.decide(agentName, pattern);
  }

  learn(currentState) {
    const differences = {};

    Object.keys(currentState).forEach((key) => {
      if (this.lastSystemState[key] !== currentState[key]) {
        differences[key] = {
          from: this.lastSystemState[key],
          to: currentState[key],
        };
      }
    });

    if (Object.keys(differences).length > 0) {
      logSystemHealth('Learning from system state changes...', differences);
    }

    this.lastSystemState = currentState;
  }

  getSummary() {
    return {
      loopCounter: this.loopCounter,
      patterns: this.patterns.slice(-10), // last 10 patterns
    };
  }
}

export const OmegaAI = new OmegaIntelligence();
