import { Router } from 'express';
import healthRoutes from '@/routes/health.js';

const router = Router();

// Mount health routes
router.use('/health', healthRoutes);

// Placeholder for future routes
// router.use('/units', unitRoutes);
// router.use('/tenants', tenantRoutes);
// router.use('/payments', paymentRoutes);
// router.use('/dashboard', dashboardRoutes);

export default router;
