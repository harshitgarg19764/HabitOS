import { Log } from '#models/Log.js';
import { Habit } from '#models/Habit.js';
import { ApiError } from '#utils/ApiError.js';
import * as achievementService from './achievement.service.js';

export const getLogsByDate = async (userId, date) => {
  const startOfDay = new Date(date);
  startOfDay.setUTCHours(0, 0, 0, 0);
  
  const endOfDay = new Date(date);
  endOfDay.setUTCHours(23, 59, 59, 999);

  return Log.find({
    userId,
    date: { $gte: startOfDay, $lte: endOfDay }
  });
};

export const getLogsByRange = async (userId, startDate, endDate) => {
  return Log.getLogsForDateRange(userId, new Date(startDate), new Date(endDate));
};

export const createOrUpdateLog = async (userId, logData) => {
  const { habitId, date, value, note } = logData;

  const habit = await Habit.findOne({ _id: habitId, userId });
  if (!habit) throw new ApiError({ statusCode: 404, message: 'Habit not found' });

  const targetDate = new Date(date);
  targetDate.setUTCHours(0, 0, 0, 0);

  const log = await Log.findOneAndUpdate(
    { userId, habitId, date: targetDate },
    { $set: { value, note } },
    { new: true, upsert: true, runValidators: true }
  );

  // Background check for achievements (non-blocking)
  achievementService.getAchievements(userId).catch(err => console.error('Achievement check failed:', err));

  return log;
};

export const deleteLog = async (userId, logId) => {
  const log = await Log.findOneAndDelete({ _id: logId, userId });
  if (!log) throw new ApiError({ statusCode: 404, message: 'Log not found' });
  return log;
};
