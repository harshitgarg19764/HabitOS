import { asyncHandler } from '#utils/asyncHandler.js';
import { ApiResponse } from '#utils/ApiResponse.js';
import * as logService from '#services/log.service.js';
import * as streakService from '#services/streak.service.js';

export const getLogsByDate = asyncHandler(async (req, res) => {
  const { date } = req.query;
  const logs = await logService.getLogsByDate(req.userId, date || new Date());
  res.json(ApiResponse.success(logs, 'Logs retrieved'));
});

export const getLogsByRange = asyncHandler(async (req, res) => {
  const { start, end } = req.query;
  const logs = await logService.getLogsByRange(req.userId, start, end);
  res.json(ApiResponse.success(logs, 'Logs retrieved'));
});

export const createOrUpdateLog = asyncHandler(async (req, res) => {
  const log = await logService.createOrUpdateLog(req.userId, req.body);
  res.status(201).json(ApiResponse.success(log, 'Log saved', 201));
});

export const deleteLog = asyncHandler(async (req, res) => {
  await logService.deleteLog(req.userId, req.params.id);
  res.json(ApiResponse.success(null, 'Log deleted'));
});

export const getStreak = asyncHandler(async (req, res) => {
  const streak = await streakService.calculateStreak(req.userId, req.params.habitId);
  res.json(ApiResponse.success(streak, 'Streak retrieved'));
});
