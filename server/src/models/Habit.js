import mongoose from 'mongoose';
import { HABIT_TYPES, FREQUENCY_TYPES, GOAL_PERIODS } from '#config/constants.js';

const habitSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true,
  },
  name: {
    type: String,
    required: [true, 'Habit name is required'],
    trim: true,
    maxlength: [100, 'Habit name cannot exceed 100 characters'],
  },
  description: {
    type: String,
    trim: true,
    maxlength: [500, 'Description cannot exceed 500 characters'],
  },
  icon: {
    type: String,
    default: '✨',
  },
  color: {
    type: String,
    required: [true, 'Color is required'],
    match: [/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, 'Please provide a valid hex color'],
  },
  type: {
    type: String,
    enum: Object.values(HABIT_TYPES),
    default: HABIT_TYPES.BOOLEAN,
  },
  unit: {
    type: String,
    default: null,
  },
  goal: {
    type: Number,
    default: null,
  },
  goalPeriod: {
    type: String,
    enum: Object.values(GOAL_PERIODS),
    default: GOAL_PERIODS.DAILY,
  },
  tags: [{
    type: String,
    trim: true,
  }],
  archived: {
    type: Boolean,
    default: false,
  },
  order: {
    type: Number,
    default: 0,
  },
  frequency: {
    type: String,
    enum: Object.values(FREQUENCY_TYPES),
    default: FREQUENCY_TYPES.DAILY,
  },
  frequencyDays: [{
    type: Number,
    min: 0,
    max: 6,
  }],
}, {
  timestamps: true,
});

habitSchema.index({ userId: 1, archived: 1 });
habitSchema.index({ userId: 1, order: 1 });

habitSchema.virtual('logs', {
  ref: 'Log',
  localField: '_id',
  foreignField: 'habitId',
});

habitSchema.set('toJSON', { virtuals: true });
habitSchema.set('toObject', { virtuals: true });

export const Habit = mongoose.model('Habit', habitSchema);
