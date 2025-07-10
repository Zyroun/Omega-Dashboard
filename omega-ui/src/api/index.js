// File: src/api/index.js

import express from 'express';
import { getBillingStatus } from './billing.js';
import credentialsRoutes from './credentials.js';
import agentRouter from './agentRouter.js';

const app = express();
app.use(express.json());

// ✅ Connected API endpoints
app.get('/api/billing/status', getBillingStatus);         // ← Billing route (corrected)
app.use('/api/credentials', credentialsRoutes);            // ← Credentials route
app.use('/api/agents', agentRouter);                       // ← Agents route

export default app;
