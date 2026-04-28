import { Router } from 'express';
import * as analyticsController from '#controllers/analytics.controller.js';
import { authenticate } from '#middleware/auth.js';

const router = Router();

router.use(authenticate);

router.get('/dashboard', analyticsController.getDashboard);
router.get('/heatmap', analyticsController.getHeatmap);
router.get('/summary', analyticsController.getSummary);

export default router;
