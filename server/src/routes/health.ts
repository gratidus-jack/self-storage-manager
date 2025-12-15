import { Router } from 'express';
import mongoose from 'mongoose';

const router = Router();

/**
 * Basic health check endpoint (liveness probe)
 */
router.get('/', (_req, res) => {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
  });
});

/**
 * Readiness probe - checks database connectivity
 */
router.get('/ready', (_req, res) => {
  // Check if MongoDB is connected (readyState: 0=disconnected, 1=connected, 2=connecting, 3=disconnecting)
  const CONNECTED_STATE = 1 as number;
  const isConnected = (mongoose.connection.readyState as number) === CONNECTED_STATE;
  const dbStatus = isConnected ? 'connected' : 'disconnected';
  
  if (!isConnected) {
    res.status(503).json({
      status: 'error',
      database: dbStatus,
      timestamp: new Date().toISOString(),
    });
    return;
  }

  res.status(200).json({
    status: 'ok',
    database: dbStatus,
    timestamp: new Date().toISOString(),
  });
});

export default router;
