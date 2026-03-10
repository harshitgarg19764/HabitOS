import mongoose from 'mongoose';
import { ACHIEVEMENT_TYPES } from '#config/constants.js';

const achievementSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true,
  },
  type: {
    type: String,
    required: [true, 'Achievement type is required'],
    enum: Object.values(ACHIEVEMENT_TYPES),
  },
  earnedAt: {
    type: Date,
    default: Date.now,
  },
  metadata: {
    type: mongoose.Schema.Types.Mixed,
    default: {},
  },
}, {
  timestamps: true,
});

achievementSchema.index({ userId: 1, type: 1 }, { unique: true });

achievementSchema.statics.getUserAchievements = async function (userId) {
  return this.find({ userId }).sort({ earnedAt: -1 });
};

achievementSchema.statics.hasAchievement = async function (userId, type) {
  const achievement = await this.findOne({ userId, type });
  return !!achievement;
};

export const Achievement = mongoose.model('Achievement', achievementSchema);
