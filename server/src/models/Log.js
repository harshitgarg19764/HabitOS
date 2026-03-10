import mongoose from 'mongoose';

const logSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true,
  },
  habitId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Habit',
    required: true,
    index: true,
  },
  date: {
    type: Date,
    required: true,
  },
  value: {
    type: mongoose.Schema.Types.Mixed,
    required: [true, 'Log value is required'],
  },
  note: {
    type: String,
    trim: true,
    maxlength: [500, 'Note cannot exceed 500 characters'],
  },
}, {
  timestamps: true,
});

logSchema.index({ userId: 1, habitId: 1, date: 1 }, { unique: true });
logSchema.index({ userId: 1, date: 1 });
logSchema.index({ habitId: 1, date: 1 });

logSchema.statics.getLogsForDateRange = async function (userId, startDate, endDate) {
  return this.find({
    userId,
    date: {
      $gte: startDate,
      $lte: endDate,
    },
  }).populate('habitId');
};

logSchema.statics.getLogsByHabit = async function (habitId, startDate, endDate) {
  return this.find({
    habitId,
    date: {
      $gte: startDate,
      $lte: endDate,
    },
  }).sort({ date: -1 });
};

export const Log = mongoose.model('Log', logSchema);
