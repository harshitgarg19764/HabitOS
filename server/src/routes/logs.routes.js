import { Router } from 'express';
import * as logsController from '#controllers/logs.controller.js';
import { authenticate } from '#middleware/auth.js';

const router = Router();

router.use(authenticate);

router.get('/', logsController.getLogsByDate);
router.get('/range', logsController.getLogsByRange);
router.post('/', logsController.createOrUpdateLog);

router.delete('/:id', logsController.deleteLog);
router.get('/streak/:habitId', logsController.getStreak);

export default router;
