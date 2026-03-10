import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { User } from '#models/User.js';
import { RefreshToken } from '#models/RefreshToken.js';
import { EmailSettings } from '#models/EmailSettings.js';
import { ApiError } from '#utils/ApiError.js';
import { AUTH_PROVIDERS } from '#config/constants.js';
import { env } from '#config/env.js';

export const generateAccessToken = (userId) => {
  return jwt.sign({ userId }, env.JWT_SECRET, {
    expiresIn: env.JWT_EXPIRE || '15m',
  });
};

export const generateRefreshToken = async (userId) => {
  const token = crypto.randomBytes(64).toString('hex');
  const tokenHash = crypto.createHash('sha256').update(token).digest('hex');

  const expiresAt = new Date();
  const expiresIn = env.JWT_REFRESH_EXPIRE || '7d';
  expiresAt.setTime(expiresAt.getTime() + parseDuration(expiresIn));

  await RefreshToken.create({
    userId,
    tokenHash,
    expiresAt,
  });

  return token;
};

export const generateTokenPair = async (userId) => {
  const accessToken = generateAccessToken(userId);
  const refreshToken = await generateRefreshToken(userId);

  return { accessToken, refreshToken };
};

export const verifyRefreshToken = async (userId, refreshToken) => {
  const tokenHash = crypto.createHash('sha256').update(refreshToken).digest('hex');

  const storedToken = await RefreshToken.findOne({
    userId,
    tokenHash,
    expiresAt: { $gt: new Date() },
  });

  if (!storedToken) {
    throw new ApiError({ statusCode: 401, message: 'Invalid or expired refresh token' });
  }

  return storedToken;
};

export const rotateTokens = async (userId, refreshToken) => {
  await verifyRefreshToken(userId, refreshToken);

  await RefreshToken.deleteOne({
    userId,
    tokenHash: crypto.createHash('sha256').update(refreshToken).digest('hex'),
  });

  return generateTokenPair(userId);
};

export const registerUser = async ({ name, email, password }) => {
  const existingUser = await User.findOne({ email: email.toLowerCase() });

  if (existingUser) {
    if (existingUser.authProvider === AUTH_PROVIDERS.GOOGLE) {
      throw new ApiError({
        statusCode: 409,
        message: 'This email is registered with Google. Please use Google Sign-In.',
      });
    }
    throw new ApiError({
      statusCode: 409,
      message: 'Email already registered',
    });
  }

  const user = await User.create({
    name,
    email: email.toLowerCase(),
    passwordHash: password,
    isVerified: true,
    authProvider: AUTH_PROVIDERS.LOCAL,
  });

  await EmailSettings.create({ userId: user._id });

  const tokens = await generateTokenPair(user._id);

  return {
    user: user.toJSON(),
    ...tokens,
  };
};

export const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email: email.toLowerCase() }).select('+passwordHash');

  if (!user) {
    throw new ApiError({ statusCode: 401, message: 'Invalid email or password' });
  }

  if (user.authProvider === AUTH_PROVIDERS.GOOGLE && !user.passwordHash) {
    throw new ApiError({
      statusCode: 400,
      message: 'Please use Google Sign-In to access this account',
    });
  }

  const isPasswordValid = await user.comparePassword(password);

  if (!isPasswordValid) {
    throw new ApiError({ statusCode: 401, message: 'Invalid email or password' });
  }

  const tokens = await generateTokenPair(user._id);

  return {
    user: user.toJSON(),
    ...tokens,
  };
};

export const logoutUser = async (userId, refreshToken) => {
  if (refreshToken) {
    const tokenHash = crypto.createHash('sha256').update(refreshToken).digest('hex');
    await RefreshToken.deleteOne({ userId, tokenHash });
  } else {
    await RefreshToken.deleteMany({ userId });
  }
};

export const getProfile = async (userId) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new ApiError({ statusCode: 404, message: 'User not found' });
  }

  return user.toJSON();
};

export const updateProfile = async (userId, updates) => {
  const allowedUpdates = ['name', 'avatar', 'timezone', 'preferences'];
  
  const filteredUpdates = {};
  
  for (const key of allowedUpdates) {
    if (updates[key] !== undefined) {
      filteredUpdates[key] = updates[key];
    }
  }

  if (updates.preferences) {
    const allowedPrefs = ['theme', 'accentColor', 'weekStartDay'];
    const filteredPrefs = {};
    
    for (const key of allowedPrefs) {
      if (updates.preferences[key] !== undefined) {
        filteredPrefs[key] = updates.preferences[key];
      }
    }
    
    if (Object.keys(filteredPrefs).length > 0) {
      filteredUpdates.preferences = filteredPrefs;
    }
  }

  const user = await User.findByIdAndUpdate(
    userId,
    { $set: filteredUpdates },
    { new: true, runValidators: true }
  );

  if (!user) {
    throw new ApiError({ statusCode: 404, message: 'User not found' });
  }

  return user.toJSON();
};

export const changePassword = async (userId, { currentPassword, newPassword }) => {
  const user = await User.findById(userId).select('+passwordHash');

  if (!user) {
    throw new ApiError({ statusCode: 404, message: 'User not found' });
  }

  if (user.authProvider === AUTH_PROVIDERS.GOOGLE) {
    throw new ApiError({
      statusCode: 400,
      message: 'Cannot change password for Google accounts',
    });
  }

  const isPasswordValid = await user.comparePassword(currentPassword);

  if (!isPasswordValid) {
    throw new ApiError({ statusCode: 401, message: 'Current password is incorrect' });
  }

  user.passwordHash = newPassword;
  user.authProvider = AUTH_PROVIDERS.BOTH;
  await user.save();

  await RefreshToken.deleteMany({ userId });

  return { message: 'Password changed successfully' };
};

export const generatePasswordResetToken = async (email) => {
  const user = await User.findOne({ email: email.toLowerCase() });

  if (!user) {
    return { message: 'If the email exists, a reset link will be sent' };
  }

  if (user.authProvider === AUTH_PROVIDERS.GOOGLE && !user.passwordHash) {
    return { message: 'If the email exists, a reset link will be sent' };
  }

  const resetToken = crypto.randomBytes(32).toString('hex');
  const resetTokenHash = crypto.createHash('sha256').update(resetToken).digest('hex');

  user.passwordResetToken = resetTokenHash;
  user.passwordResetExpires = new Date(Date.now() + 60 * 60 * 1000);
  await user.save();

  return { resetToken, userId: user._id };
};

export const resetPassword = async ({ token, userId, newPassword }) => {
  const user = await User.findById(userId).select('+passwordResetToken +passwordResetExpires');

  if (!user) {
    throw new ApiError({ statusCode: 400, message: 'Invalid reset token' });
  }

  if (user.passwordResetExpires < new Date()) {
    throw new ApiError({ statusCode: 400, message: 'Reset token has expired' });
  }

  const tokenHash = crypto.createHash('sha256').update(token).digest('hex');

  if (user.passwordResetToken !== tokenHash) {
    throw new ApiError({ statusCode: 400, message: 'Invalid reset token' });
  }

  user.passwordHash = newPassword;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  await RefreshToken.deleteMany({ userId });

  return { message: 'Password reset successfully' };
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
