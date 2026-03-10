import mongoose from 'mongoose';

const emailSettingsSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
    index: true,
  },
  enabled: {
    type: Boolean,
    default: true,
  },
  dailySummaryEnabled: {
    type: Boolean,
    default: true,
  },
  dailySummaryTime: {
    type: String,
    default: '08:00',
  },
  weeklyReportEnabled: {
    type: Boolean,
    default: true,
  },
  weeklyReportDay: {
    type: Number,
    min: 0,
    max: 6,
    default: 0,
  },
  streakReminderEnabled: {
    type: Boolean,
    default: true,
  },
  motivationalQuoteEnabled: {
    type: Boolean,
    default: false,
  },
  missedHabitAlertEnabled: {
    type: Boolean,
    default: false,
  },
  timezone: {
    type: String,
    default: 'UTC',
  },
  lastEmailSentAt: {
    type: Date,
    default: null,
  },
}, {
  timestamps: true,
});

emailSettingsSchema.statics.getSettings = async function (userId) {
  let settings = await this.findOne({ userId });
  
  if (!settings) {
    settings = await this.create({ userId });
  }
  
  return settings;
};

emailSettingsSchema.statics.updateSettings = async function (userId, updates) {
  return this.findOneAndUpdate(
    { userId },
    { $set: updates },
    { new: true, runValidators: true }
  );
};

export const EmailSettings = mongoose.model('EmailSettings', emailSettingsSchema);
