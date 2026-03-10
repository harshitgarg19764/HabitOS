import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { USER_ROLES, AUTH_PROVIDERS } from '#config/constants.js';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    maxlength: [100, 'Name cannot exceed 100 characters'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
  },
  passwordHash: {
    type: String,
    select: false,
  },
  avatar: {
    type: String,
    default: null,
  },
  timezone: {
    type: String,
    default: 'UTC',
  },
  role: {
    type: String,
    enum: Object.values(USER_ROLES),
    default: USER_ROLES.USER,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  verificationToken: {
    type: String,
    select: false,
  },
  passwordResetToken: {
    type: String,
    select: false,
  },
  passwordResetExpires: {
    type: Date,
    select: false,
  },
  googleId: {
    type: String,
    sparse: true,
    unique: true,
  },
  authProvider: {
    type: String,
    enum: Object.values(AUTH_PROVIDERS),
    default: AUTH_PROVIDERS.LOCAL,
  },
  preferences: {
    theme: {
      type: String,
      enum: ['light', 'dark', 'system'],
      default: 'system',
    },
    accentColor: {
      type: String,
      default: '#6366f1',
    },
    weekStartDay: {
      type: Number,
      min: 0,
      max: 6,
      default: 0,
    },
  },
}, {
  timestamps: true,
});

userSchema.index({ email: 1 });

userSchema.pre('save', async function (next) {
  if (!this.isModified('passwordHash') || !this.passwordHash) {
    return next();
  }
  
  const salt = await bcrypt.genSalt(12);
  this.passwordHash = await bcrypt.hash(this.passwordHash, salt);
  next();
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  if (!this.passwordHash) return false;
  return bcrypt.compare(candidatePassword, this.passwordHash);
};

userSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.passwordHash;
  delete user.verificationToken;
  delete user.passwordResetToken;
  delete user.passwordResetExpires;
  return user;
};

export const User = mongoose.model('User', userSchema);
