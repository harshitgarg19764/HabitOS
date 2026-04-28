import { Router } from 'express';
import * as settingsController from '#controllers/settings.controller.js';
import { authenticate } from '#middleware/auth.js';

const router = Router();

router.use(authenticate);

router.get('/email', settingsController.getEmailSettings);
router.put('/email', settingsController.updateEmailSettings);
router.post('/email/test', settingsController.testEmail);

export default router;
