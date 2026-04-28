import express from 'express';
import * as achievementController from '#controllers/achievement.controller.js';
import { authenticate } from '#middleware/auth.js';

const router = express.Router();

router.use(authenticate);

router.get('/', achievementController.getAchievements);
router.get('/leaderboard', achievementController.getLeaderboard);

export default router;
