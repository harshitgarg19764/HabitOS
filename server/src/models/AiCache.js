import mongoose from 'mongoose';
import crypto from 'crypto';
import { AI_PROMPT_TYPES, AI_CACHE_EXPIRY } from '#config/constants.js';

const aiCacheSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true,
  },
  type: {
    type: String,
    required: [true, 'AI cache type is required'],
    enum: Object.values(AI_PROMPT_TYPES),
  },
  promptHash: {
    type: String,
    required: true,
  },
  response: {
    type: String,
    required: true,
  },
  expiresAt: {
    type: Date,
    required: true,
    index: { expireAfterSeconds: 0 },
  },
}, {
  timestamps: true,
});

aiCacheSchema.index({ userId: 1, type: 1, promptHash: 1 });

aiCacheSchema.statics.getCache = async function (userId, type, prompt) {
  const promptHash = crypto.createHash('md5').update(prompt).digest('hex');
  
  const cached = await this.findOne({
    userId,
    type,
    promptHash,
    expiresAt: { $gt: new Date() },
  });

  return cached;
};

aiCacheSchema.statics.setCache = async function (userId, type, prompt, response) {
  const promptHash = crypto.createHash('md5').update(prompt).digest('hex');
  
  const expiresAt = new Date();
  expiresAt.setTime(expiresAt.getTime() + AI_CACHE_EXPIRY);

  return this.findOneAndUpdate(
    { userId, type, promptHash },
    {
      response,
      expiresAt,
    },
    { upsert: true, new: true }
  );
};

aiCacheSchema.statics.clearCache = async function (userId, type = null) {
  const query = { userId };
  if (type) {
    query.type = type;
  }
  return this.deleteMany(query);
};

export const AiCache = mongoose.model('AiCache', aiCacheSchema);
