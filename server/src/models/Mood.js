import mongoose from 'mongoose';
import { MOOD_SCORES } from '#config/constants.js';

const moodSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true,
  },
  date: {
    type: Date,
    required: true,
  },
  score: {
    type: Number,
    required: [true, 'Mood score is required'],
    min: [MOOD_SCORES.MIN, `Score must be at least ${MOOD_SCORES.MIN}`],
    max: [MOOD_SCORES.MAX, `Score cannot exceed ${MOOD_SCORES.MAX}`],
  },
  emoji: {
    type: String,
    required: true,
  },
  note: {
    type: String,
    trim: true,
    maxlength: [300, 'Note cannot exceed 300 characters'],
  },
}, {
  timestamps: true,
});

moodSchema.index({ userId: 1, date: 1 }, { unique: true });

export const Mood = mongoose.model('Mood', moodSchema);
