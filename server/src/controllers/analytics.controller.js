import { asyncHandler } from '#utils/asyncHandler.js';
import { ApiResponse } from '#utils/ApiResponse.js';
import * as analyticsService from '#services/analytics.service.js';

export const getDashboard = asyncHandler(async (req, res) => {
  const stats = await analyticsService.getDashboardStats(req.userId);
  res.json(ApiResponse.success(stats, 'Dashboard stats retrieved'));
});

export const getHeatmap = asyncHandler(async (req, res) => {
  const { year } = req.query;
  const heatmap = await analyticsService.getHeatmap(req.userId, year || new Date().getFullYear());
  res.json(ApiResponse.success(heatmap, 'Heatmap retrieved'));
});

export const getSummary = asyncHandler(async (req, res) => {
  const distribution = await analyticsService.getHabitDistribution(req.userId);
  res.json(ApiResponse.success({ distribution }, 'Summary retrieved'));
});
