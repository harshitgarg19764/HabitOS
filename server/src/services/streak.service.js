import { Log } from '#models/Log.js';

export const calculateStreak = async (userId, habitId) => {
  const logs = await Log.find({ userId, habitId }).sort({ date: -1 }).lean();
  let currentStreak = 0;
  let longestStreak = 0;
  let tempStreak = 0;

  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);

  let currentDateObj = new Date(today);

  for (let i = 0; i < logs.length; i++) {
    const logDate = new Date(logs[i].date);
    logDate.setUTCHours(0, 0, 0, 0);

    const diffTime = Math.abs(currentDateObj - logDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (i === 0 && diffDays > 1) {
      break;
    }

    if (i > 0 && diffDays > 1) {
      break;
    }

    if (logs[i].value === true || logs[i].value > 0) {
      currentStreak++;
      currentDateObj.setDate(currentDateObj.getDate() - 1);
    } else {
      break; // Log was negative/zero
    }
  }

  for (let i = logs.length - 1; i >= 0; i--) {
    if (logs[i].value === true || logs[i].value > 0) {
      let logDate = new Date(logs[i].date);
      logDate.setUTCHours(0, 0, 0, 0);

      if (i < logs.length - 1) {
        let prevDate = new Date(logs[i + 1].date);
        prevDate.setUTCHours(0, 0, 0, 0);
        const diffTime = Math.abs(prevDate - logDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays <= 1) {
          tempStreak++;
        } else {
          tempStreak = 1;
        }
      } else {
        tempStreak = 1;
      }
      if (tempStreak > longestStreak) longestStreak = tempStreak;
    } else {
      tempStreak = 0;
    }
  }

  return { currentStreak, longestStreak };
};

export const calculateCurrentStreak = async (userId, habitId) => {
  const result = await calculateStreak(userId, habitId);
  return result.currentStreak;
};

export const isStreakAtRisk = async (userId, habitId) => {
  const logs = await Log.find({ userId, habitId }).sort({ date: -1 }).limit(1).lean();
  if (logs.length === 0) return false;

  const lastLogDate = new Date(logs[0].date);
  lastLogDate.setUTCHours(0, 0, 0, 0);

  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);

  const diffTime = Math.abs(today - lastLogDate);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return diffDays === 1;
};
