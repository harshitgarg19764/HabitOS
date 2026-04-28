import { Router } from 'express';
import * as aiController from '#controllers/ai.controller.js';
import { authenticate } from '#middleware/auth.js';

const router = Router();

router.use(authenticate);

router.get('/insights', aiController.getInsights);
router.post('/quote', aiController.getQuote);
router.get('/suggestions', aiController.getSuggestions);
router.get('/summary', aiController.getSummary);
router.get('/predict', aiController.getPredictions);

export default router;
