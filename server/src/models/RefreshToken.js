import mongoose from 'mongoose';
import crypto from 'crypto';

const refreshTokenSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true,
  },
  tokenHash: {
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

refreshTokenSchema.statics.createToken = async function (userId, expiresIn) {
  const cryptoRandom = crypto.randomBytes(64).toString('hex');
  const tokenHash = crypto.createHash('sha256').update(cryptoRandom).digest('hex');
  
  const expiresAt = new Date();
  expiresIn = parseDuration(expiresIn);
  expiresAt.setTime(expiresAt.getTime() + expiresIn);

  const token = await this.create({
    userId,
    tokenHash,
    expiresAt,
  });

  return { token, expiresAt };
};

refreshTokenSchema.statics.verifyToken = async function (userId, token) {
  const tokenHash = crypto.createHash('sha256').update(token).digest('hex');
  
  const refreshToken = await this.findOne({
    userId,
    tokenHash,
    expiresAt: { $gt: new Date() },
  });

  if (!refreshToken) {
    return null;
  }

  return refreshToken;
};

refreshTokenSchema.statics.deleteToken = async function (userId, token) {
  const tokenHash = crypto.createHash('sha256').update(token).digest('hex');
  return this.deleteOne({ userId, tokenHash });
};

refreshTokenSchema.statics.deleteAllUserTokens = async function (userId) {
  return this.deleteMany({ userId });
};

function parseDuration(duration) {
  if (typeof duration === 'number') return duration;
  
  const match = duration.match(/^(\d+)([dhms])$/);
  if (!match) return 7 * 24 * 60 * 60 * 1000;
  
  const value = parseInt(match[1]);
  const unit = match[2];
  
  const units = {
    d: 24 * 60 * 60 * 1000,
    h: 60 * 60 * 1000,
    m: 60 * 1000,
    s: 1000,
  };
  
  return value * (units[unit] || units.d);
}

export const RefreshToken = mongoose.model('RefreshToken', refreshTokenSchema);
