export const JWT_EXPIRE = process.env.JWT_EXPIRE || '15m';
export const JWT_REFRESH_EXPIRE = process.env.JWT_REFRESH_EXPIRE || '7d';

export const RATE_LIMIT_WINDOW = 15 * 60 * 1000;
export const RATE_LIMIT_MAX_REQUESTS = 200;

export const SCORE_WEIGHTS = {
  COMPLETION: 10,
  STREAK_BONUS: 5,
  CONSISTENCY: 3,
  GOAL_MET: 15,
};

export const STREAK_THRESHOLDS = {
  WEEK: 7,
  MONTH: 30,
  QUARTER: 90,
  YEAR: 365,
};

export const ACHIEVEMENT_TYPES = {
  FIRST_HABIT: 'first_habit',
  WEEK_STREAK: 'week_streak',
  MONTH_STREAK: 'month_streak',
  PERFECT_DAY: 'perfect_day',
  PERFECT_WEEK: 'perfect_week',
  CONSISTENCY_KING: 'consistency_king',
  EARLY_BIRD: 'early_bird',
  NIGHT_OWL: 'night_owl',
  GOAL_GETTER: 'goal_getter',
  MASTERAchER: 'master',
};

export const HABIT_TYPES = {
  BOOLEAN: 'boolean',
  NUMERIC: 'numeric',
};

export const FREQUENCY_TYPES = {
  DAILY: 'daily',
  WEEKLY: 'weekly',
  CUSTOM: 'custom',
};

export const GOAL_PERIODS = {
  DAILY: 'daily',
  WEEKLY: 'weekly',
  MONTHLY: 'monthly',
};

export const USER_ROLES = {
  USER: 'user',
  ADMIN: 'admin',
};

export const AUTH_PROVIDERS = {
  LOCAL: 'local',
  GOOGLE: 'google',
  BOTH: 'both',
};

export const EMAIL_TYPES = {
  DAILY_SUMMARY: 'daily_summary',
  WEEKLY_REPORT: 'weekly_report',
  STREAK_REMINDER: 'streak_reminder',
  MOTIVATIONAL: 'motivational',
  MISSED_HABIT: 'missed_habit',
  WELCOME: 'welcome',
};

export const AI_CACHE_EXPIRY = 24 * 60 * 60 * 1000;
export const AI_PROMPT_TYPES = {
  INSIGHT: 'insight',
  QUOTE: 'quote',
  SUGGESTION: 'suggestion',
  SUMMARY: 'summary',
  PREDICT: 'predict',
};

export const MOOD_SCORES = {
  MIN: 1,
  MAX: 10,
};

export const PAGINATION_DEFAULTS = {
  PAGE: 1,
  LIMIT: 10,
  MAX_LIMIT: 100,
};

export const VALIDATION_LIMITS = {
  HABIT_NAME_MAX: 100,
  HABIT_DESCRIPTION_MAX: 500,
  LOG_NOTE_MAX: 500,
  MOOD_NOTE_MAX: 300,
};
