import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

import { User } from '../models/User.js';
import { Habit } from '../models/Habit.js';
import { Log } from '../models/Log.js';
import { Mood } from '../models/Mood.js';
import { Achievement } from '../models/Achievement.js';
import { EmailSettings } from '../models/EmailSettings.js';
import { ACHIEVEMENT_TYPES, MOOD_SCORES } from '../config/constants.js';
import { logger } from '../utils/logger.js';

const HABIT_ICONS = ['💪', '📚', '🏃', '💧', '🧘', '💤', '🥗', '✍️'];

const HABIT_COLORS = [
  '#ef4444', '#f97316', '#f59e0b', '#84cc16',
  '#22c55e', '#14b8a6', '#06b6d4', '#3b82f6',
];

const MOOD_EMOJIS = ['😢', '😔', '😐', '🙂', '😊', '😄', '😁', '🤩', '🥳', '🤗'];

const seedDatabase = async () => {
  try {
    const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/habitos';
    
    await mongoose.connect(mongoURI);
    logger.info('Connected to MongoDB');

    await clearDatabase();

    const user = await createUser();
    logger.info(`Created test user: ${user.email}`);

    const emailSettings = await EmailSettings.create({ userId: user._id });
    logger.info('Created email settings');

    const habits = await createHabits(user._id);
    logger.info(`Created ${habits.length} habits`);

    const logs = await createLogs(user._id, habits);
    logger.info(`Created ${logs.length} logs`);

    const moods = await createMoods(user._id);
    logger.info(`Created ${moods.length} mood entries`);

    const achievements = await createAchievements(user._id);
    logger.info(`Created ${achievements.length} achievements`);

    logger.info('✅ Database seeded successfully!');
    logger.info(`Test user credentials - Email: test@habitos.app | Password: Test@123456`);

    process.exit(0);
  } catch (error) {
    logger.error('Seed failed:', error);
    process.exit(1);
  }
};

const clearDatabase = async () => {
  await User.deleteMany({});
  await Habit.deleteMany({});
  await Log.deleteMany({});
  await Mood.deleteMany({});
  await Achievement.deleteMany({});
  await EmailSettings.deleteMany({});
  logger.info('Cleared all collections');
};

const createUser = async () => {
  return User.create({
    name: 'Test User',
    email: 'test@habitos.app',
    passwordHash: '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/X4.IY8LpxWy6W.J2e',
    isVerified: true,
    timezone: 'UTC',
    preferences: {
      theme: 'dark',
      accentColor: '#6366f1',
      weekStartDay: 0,
    },
  });
};

const createHabits = async (userId) => {
  const habits = [
    { name: 'Morning Exercise', description: '30 minutes of workout', frequency: 'daily' },
    { name: 'Read 30 minutes', description: 'Read a book or article', frequency: 'daily' },
    { name: 'Drink 8 glasses of water', description: 'Stay hydrated', frequency: 'daily' },
    { name: 'Meditation', description: '10 minutes of mindfulness', frequency: 'daily' },
    { name: 'Sleep before 11 PM', description: 'Maintain consistent sleep schedule', frequency: 'daily' },
    { name: 'No social media day', description: 'Avoid social media', frequency: 'weekly' },
    { name: 'Write in journal', description: 'Daily reflection', frequency: 'daily' },
    { name: 'Learn new skill', description: '30 minutes of learning', frequency: 'weekly' },
  ];

  return Habit.insertMany(habits.map((habit, index) => ({
    userId,
    name: habit.name,
    description: habit.description,
    icon: HABIT_ICONS[index],
    color: HABIT_COLORS[index],
    type: 'boolean',
    frequency: habit.frequency,
    order: index,
    tags: [habit.frequency],
  })));
};

const createLogs = async (userId, habits) => {
  const logs = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  for (let dayOffset = 0; dayOffset < 90; dayOffset++) {
    const date = new Date(today);
    date.setDate(date.getDate() - dayOffset);

    for (const habit of habits) {
      if (habit.frequency === 'daily' || (habit.frequency === 'weekly' && date.getDay() === 1)) {
        const randomValue = Math.random() > 0.3;
        
        logs.push({
          userId,
          habitId: habit._id,
          date: new Date(date),
          value: randomValue,
          note: randomValue ? `Completed ${habit.name}` : null,
        });
      }
    }
  }

  return Log.insertMany(logs);
};

const createMoods = async (userId) => {
  const moods = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  for (let dayOffset = 0; dayOffset < 30; dayOffset++) {
    const date = new Date(today);
    date.setDate(date.getDate() - dayOffset);

    const score = Math.floor(Math.random() * (MOOD_SCORES.MAX - MOOD_SCORES.MIN + 1)) + MOOD_SCORES.MIN;
    
    moods.push({
      userId,
      date: new Date(date),
      score,
      emoji: MOOD_EMOJIS[score - 1],
      note: score >= 7 ? 'Great day!' : score <= 3 ? 'Tough day' : null,
    });
  }

  return Mood.insertMany(moods);
};

const createAchievements = async (userId) => {
  const achievements = [
    { type: ACHIEVEMENT_TYPES.FIRST_HABIT },
    { type: ACHIEVEMENT_TYPES.WEEK_STREAK },
    { type: ACHIEVEMENT_TYPES.PERFECT_DAY },
  ];

  return Achievement.insertMany(achievements.map((a) => ({
    userId,
    type: a.type,
    earnedAt: new Date(),
    metadata: {},
  })));
};

seedDatabase();
