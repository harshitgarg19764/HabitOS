// Mock Data for HabitOS Frontend Phase

export const mockHabits = [
    { id: 'h1', name: 'Morning Meditation', color: '#8b5cf6', icon: '🧘', type: 'boolean', streak: 12 },
    { id: 'h2', name: 'Drink Water (2L)', color: '#3b82f6', icon: '💧', type: 'numeric', unit: 'ml', goal: 2000, streak: 45 },
    { id: 'h3', name: 'Read 20 pages', color: '#10b981', icon: '📚', type: 'boolean', streak: 3 },
    { id: 'h4', name: 'Gym Session', color: '#ef4444', icon: '🏋️', type: 'boolean', streak: 0 },
    { id: 'h5', name: 'Journaling', color: '#f59e0b', icon: '✍️', type: 'boolean', streak: 8 },
    { id: 'h6', name: 'No Sugar', color: '#ec4899', icon: '🚫', type: 'boolean', streak: 21 },
    { id: 'h7', name: 'Sleep by 11 PM', color: '#6366f1', icon: '🌙', type: 'boolean', streak: 5 },
    { id: 'h8', name: 'Learn Spanish', color: '#f97316', icon: '🇪🇸', type: 'boolean', streak: 1 }
];

// Generate 90 days of logs for each habit
const today = new Date();
today.setHours(0, 0, 0, 0);

export const mockLogs: Record<string, any[]> = {};

mockHabits.forEach(habit => {
    mockLogs[habit.id] = [];
    for (let i = 0; i < 90; i++) {
        const d = new Date(today);
        d.setDate(today.getDate() - i);
        const dateStr = d.toISOString().split('T')[0];

        // Randomly assign completion based on streak and some randomness
        let completed = false;
        let value = 0;

        if (i < habit.streak) {
            completed = true;
        } else if (Math.random() > 0.3) {
            completed = true;
        }

        if (completed) {
            if (habit.type === 'numeric' && habit.goal) {
                value = habit.goal;
            } else {
                value = 1;
            }
        }

        if (completed) {
            mockLogs[habit.id].push({
                id: `l_${habit.id}_${i}`,
                habitId: habit.id,
                date: dateStr,
                value: value,
                completed: true,
                note: Math.random() > 0.8 ? 'Felt great today!' : ''
            });
        }
    }
});

export const mockAnalytics = {
    dailyScore: 85,
    completionRate: 75,
    habitsLoggedToday: 6,
    totalHabits: 8,
    bestStreak: 45,
    weeklyTrend: [
        { day: 'Mon', score: 60 },
        { day: 'Tue', score: 80 },
        { day: 'Wed', score: 100 },
        { day: 'Thu', score: 75 },
        { day: 'Fri', score: 90 },
        { day: 'Sat', score: 50 },
        { day: 'Sun', score: 85 }
    ],
    monthlyCompletions: 142
};

export const mockInsights = [
    { id: 'i1', type: 'pattern', message: 'You are 40% more likely to go to the gym if you sleep by 11 PM.', confidence: 85 },
    { id: 'i2', type: 'streak', message: 'Keep it up! "Drink Water" is your longest active streak at 45 days.', confidence: 100 },
    { id: 'i3', type: 'suggestion', message: 'Consider moving "Read 20 pages" to the morning for a higher completion rate.', confidence: 72 },
    { id: 'i4', type: 'milestone', message: 'You are only 5 days away from a 50-day streak on "Drink Water"!', confidence: 100 },
    { id: 'i5', type: 'warning', message: 'Your "Gym Session" streak was broken. Start fresh today!', confidence: 95 }
];

export const mockAchievements = [
    { id: 'a1', name: 'First Step', description: 'Log your first habit', icon: '🌱', unlocked: true, date: '2025-10-01' },
    { id: 'a2', name: '7-Day Streak', description: 'Maintain a 7-day streak on any habit', icon: '🔥', unlocked: true, date: '2025-10-08' },
    { id: 'a3', name: '30-Day Streak', description: 'Maintain a 30-day streak on any habit', icon: '🏆', unlocked: true, date: '2025-10-31' },
    { id: 'a4', name: 'Perfect Week', description: 'Complete all daily habits for 7 consecutive days', icon: '⭐', unlocked: false },
    { id: 'a5', name: 'Night Owl', description: 'Log 5 habits after 10 PM', icon: '🦉', unlocked: true, date: '2025-11-15' },
    { id: 'a6', name: 'Early Bird', description: 'Log 5 habits before 7 AM', icon: '🌅', unlocked: false },
    { id: 'a7', name: 'Centurion', description: 'Log 100 total habit completions', icon: '💯', unlocked: true, date: '2025-12-05' },
    { id: 'a8', name: '100-Day Streak', description: 'Maintain a 100-day streak on any habit', icon: '👑', unlocked: false },
    { id: 'a9', name: 'Habit Master', description: 'Maintain 10 active habits', icon: '🧩', unlocked: false },
    { id: 'a10', name: 'Perfect Month', description: 'Complete all daily habits for 30 consecutive days', icon: '💎', unlocked: false }
];

export const mockUser = {
    id: 'u1',
    name: 'Harshit',
    email: 'harshit@example.com',
    avatar: 'https://i.pravatar.cc/150?u=harshit',
    joinedDate: '2025-10-01',
    score: 4520,
    level: 12
};
