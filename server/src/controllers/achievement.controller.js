import { asyncHandler } from '#utils/asyncHandler.js';
import { ApiResponse } from '#utils/ApiResponse.js';
import * as achievementService from '#services/achievement.service.js';

export const getAchievements = asyncHandler(async (req, res) => {
  const result = await achievementService.getAchievements(req.userId);
  res.json(ApiResponse.success(result));
});

export const getLeaderboard = asyncHandler(async (req, res) => {
  const result = await achievementService.getLeaderboard();
  res.json(ApiResponse.success(result));
});
