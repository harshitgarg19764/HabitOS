import { Habit } from '#models/Habit.js';
import { ApiError } from '#utils/ApiError.js';

export const getAllHabits = async (userId, includeArchived = false) => {
  const query = { userId };
  if (!includeArchived) query.archived = false;

  return Habit.find(query).sort({ order: 1, createdAt: -1 });
};

export const getHabitById = async (userId, habitId) => {
  const habit = await Habit.findOne({ _id: habitId, userId });
  if (!habit) throw new ApiError({ statusCode: 404, message: 'Habit not found' });
  return habit;
};

export const createHabit = async (userId, habitData) => {
  const count = await Habit.countDocuments({ userId });
  if (count >= 50) throw new ApiError({ statusCode: 400, message: 'Maximum of 50 habits allowed' });

  return Habit.create({
    ...habitData,
    userId,
    order: count,
  });
};

export const updateHabit = async (userId, habitId, updateData) => {
  const habit = await Habit.findOneAndUpdate(
    { _id: habitId, userId },
    { $set: updateData },
    { new: true, runValidators: true }
  );
  if (!habit) throw new ApiError({ statusCode: 404, message: 'Habit not found' });
  return habit;
};

export const archiveHabit = async (userId, habitId) => {
  return updateHabit(userId, habitId, { archived: true });
};

export const deleteHabit = async (userId, habitId) => {
  const habit = await Habit.findOneAndDelete({ _id: habitId, userId });
  if (!habit) throw new ApiError({ statusCode: 404, message: 'Habit not found' });
  // Optionally, cascade delete logs related to this habit
  return habit;
};

export const reorderHabits = async (userId, habitsList) => {
  const bulkOps = habitsList.map(({ _id, order }) => ({
    updateOne: {
      filter: { _id, userId },
      update: { $set: { order } },
    },
  }));

  if (bulkOps.length > 0) {
    await Habit.bulkWrite(bulkOps);
  }
  return getAllHabits(userId);
};
