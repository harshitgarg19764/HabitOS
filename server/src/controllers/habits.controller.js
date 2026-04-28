import { asyncHandler } from '#utils/asyncHandler.js';
import { ApiResponse } from '#utils/ApiResponse.js';
import * as habitService from '#services/habit.service.js';

export const getHabits = asyncHandler(async (req, res) => {
  const includeArchived = req.query.archived === 'true';
  const habits = await habitService.getAllHabits(req.userId, includeArchived);
  res.json(ApiResponse.success(habits, 'Habits retrieved'));
});

export const getHabit = asyncHandler(async (req, res) => {
  const habit = await habitService.getHabitById(req.userId, req.params.id);
  res.json(ApiResponse.success(habit, 'Habit retrieved'));
});

export const createHabit = asyncHandler(async (req, res) => {
  const habit = await habitService.createHabit(req.userId, req.body);
  res.status(201).json(ApiResponse.success(habit, 'Habit created', 201));
});

export const updateHabit = asyncHandler(async (req, res) => {
  const habit = await habitService.updateHabit(req.userId, req.params.id, req.body);
  res.json(ApiResponse.success(habit, 'Habit updated'));
});

export const archiveHabit = asyncHandler(async (req, res) => {
  const habit = await habitService.archiveHabit(req.userId, req.params.id);
  res.json(ApiResponse.success(habit, 'Habit archived'));
});

export const deleteHabit = asyncHandler(async (req, res) => {
  await habitService.deleteHabit(req.userId, req.params.id);
  res.json(ApiResponse.success(null, 'Habit deleted'));
});

export const reorderHabits = asyncHandler(async (req, res) => {
  const habits = await habitService.reorderHabits(req.userId, req.body.habits);
  res.json(ApiResponse.success(habits, 'Habits reordered'));
});
