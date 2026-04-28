import mongoose from 'mongoose';
import { Log } from '#models/Log.js';
import { Habit } from '#models/Habit.js';

export const getDashboardStats = async (userId) => {
  const habits = await Habit.find({ userId, archived: false }).select('_id');
  const habitIds = habits.map(h => h._id);

  const now = new Date();
  const today = new Date(now.setUTCHours(0, 0, 0, 0));
  const sevenDaysAgo = new Date(today);
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6);
  
  const eightyFourDaysAgo = new Date(today);
  eightyFourDaysAgo.setDate(eightyFourDaysAgo.getDate() - 83);

  const [logsToday, trendData, activityData] = await Promise.all([
    Log.countDocuments({
      userId,
      date: today,
      habitId: { $in: habitIds },
      value: { $gt: 0 } 
    }),
    Log.aggregate([
      { 
        $match: { 
          userId: new mongoose.Types.ObjectId(userId), 
          date: { $gte: sevenDaysAgo, $lte: today } 
        } 
      },
      { $group: { _id: "$date", completions: { $sum: 1 } } },
      { $sort: { _id: 1 } }
    ]),
    Log.aggregate([
      { 
        $match: { 
          userId: new mongoose.Types.ObjectId(userId), 
          date: { $gte: eightyFourDaysAgo, $lte: today } 
        } 
      },
      { 
        $group: { 
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$date" } }, 
          count: { $sum: 1 } 
        } 
      }
    ])
  ]);

  // Format trend data
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const trend = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(sevenDaysAgo);
    d.setDate(d.getDate() + i);
    const dayName = weekDays[d.getDay()];
    const record = trendData.find(t => t._id.getTime() === d.getTime());
    trend.push({ day: dayName, completions: record ? record.completions : 0 });
  }

  // Format activity for 12-week heatmap
  const activityMap = {};
  activityData.forEach(a => activityMap[a._id] = a.count);

  return {
    activeHabits: habitIds.length,
    completedToday: logsToday,
    trend,
    activity: activityMap,
    currentStreak: 0, 
    bestStreak: 0,
    score: Math.round((logsToday / (habitIds.length || 1)) * 100)
  };
};

export const getHeatmap = async (userId, year) => {
  const startYear = new Date(`${year}-01-01T00:00:00Z`);
  const endYear = new Date(`${year}-12-31T23:59:59Z`);

  const heatmapData = await Log.aggregate([
    { $match: { userId: userId, date: { $gte: startYear, $lte: endYear } } },
    {
      $group: {
        _id: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
        count: { $sum: 1 }
      }
    },
    { $sort: { _id: 1 } }
  ]);

  return heatmapData.map(item => ({ date: item._id, count: item.count }));
};

export const getHabitDistribution = async (userId) => {
  const habits = await Habit.find({ userId, archived: false });
  const logs = await Log.find({ userId });

  const distribution = habits.map(habit => {
    const completions = logs.filter(l => l.habitId.toString() === habit._id.toString()).length;
    return {
      name: habit.name,
      value: completions,
      color: habit.color
    };
  });

  const total = distribution.reduce((acc, curr) => acc + curr.value, 0);
  return distribution.map(d => ({
    ...d,
    value: total > 0 ? Math.round((d.value / total) * 100) : 0
  }));
};

