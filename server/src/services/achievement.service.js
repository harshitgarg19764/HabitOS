import { Log } from '#models/Log.js';
import { Habit } from '#models/Habit.js';

export const getAchievements = async (userId) => {
  const habits = await Habit.find({ userId });
  const habitIds = habits.map(h => h._id);
  
  const [totalCompletions, maxStreakLog] = await Promise.all([
    Log.countDocuments({ userId, value: { $gt: 0 } }),
    Log.aggregate([
      { $match: { userId } },
      { $group: { _id: "$habitId", maxStreak: { $max: "$value" } } },
      { $group: { _id: null, overallMax: { $max: "$maxStreak" } } }
    ])
  ]);

  const bestStreak = maxStreakLog[0]?.overallMax || 0;

  // Logic for default badges
  const badges = [
    { 
      id: 1, 
      name: 'First Step', 
      description: 'Complete your first habit', 
      earned: totalCompletions >= 1, 
      progress: Math.min(100, (totalCompletions / 1) * 100), 
      requirement: 1, 
      category: 'milestone' 
    },
    { 
      id: 2, 
      name: 'Week Warrior', 
      description: 'Maintain a 7-day streak', 
      earned: bestStreak >= 7, 
      progress: Math.min(100, (bestStreak / 7) * 100), 
      requirement: 7, 
      category: 'streak' 
    },
    { 
      id: 3, 
      name: 'Century Club', 
      description: 'Complete 100 habits', 
      earned: totalCompletions >= 100, 
      progress: Math.min(100, (totalCompletions / 100) * 100), 
      requirement: 100, 
      category: 'milestone' 
    },
    { 
      id: 4, 
      name: 'Month Master', 
      description: 'Maintain a 30-day streak', 
      earned: bestStreak >= 30, 
      progress: Math.min(100, (bestStreak / 30) * 100), 
      requirement: 30, 
      category: 'streak' 
    }
  ];

  return {
    badges,
    stats: {
      totalPoints: totalCompletions * 50,
      totalCompletions,
      bestStreak,
      badgesEarned: badges.filter(b => b.earned).length
    }
  };
};

export const getLeaderboard = async () => {
  // Mock leaderboard for now as we only have one user usually in dev
  // In real app, we'd aggregate across users
  return [
    { rank: 1, name: 'AI Coach', score: 12450, avatar: 'A', streak: 156 },
    { rank: 2, name: 'Sarah Miller', score: 11820, avatar: 'S', streak: 89 },
    { rank: 3, name: 'James Wilson', score: 10560, avatar: 'J', streak: 67 },
  ];
};
