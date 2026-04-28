import jwt from 'jsonwebtoken';
import { User } from '#models/User.js';
import { ApiError } from '#utils/ApiError.js';
import { env } from '#config/env.js';
import * as authService from '#services/auth.service.js';

export const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    let token = authHeader?.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;

    // Fallback to refresh token in cookies if access token is missing
    if (!token && req.cookies?.refreshToken) {
      const tokens = await authService.rotateTokens(req.cookies.refreshToken);
      token = tokens.accessToken;
      // Refresh the cookie for the user
      res.cookie('refreshToken', tokens.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
    }

    if (!token) {
      throw new ApiError({ statusCode: 401, message: 'Access token required' });
    }

    const decoded = jwt.verify(token, env.JWT_SECRET);

    const user = await User.findById(decoded.userId);

    if (!user) {
      throw new ApiError({ statusCode: 401, message: 'User not found' });
    }

    req.user = user;
    req.userId = user._id;
    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      next(new ApiError({ statusCode: 401, message: 'Token expired' }));
    } else if (error instanceof jwt.JsonWebTokenError) {
      next(new ApiError({ statusCode: 401, message: 'Invalid token' }));
    } else {
      next(error);
    }
  }
};

export const optionalAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return next();
    }

    const token = authHeader.split(' ')[1];

    const decoded = jwt.verify(token, env.JWT_SECRET);

    const user = await User.findById(decoded.userId);

    if (user) {
      req.user = user;
      req.userId = user._id;
    }

    next();
  } catch (error) {
    next();
  }
};

export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return next(new ApiError({ statusCode: 401, message: 'Authentication required' }));
    }

    if (!roles.includes(req.user.role)) {
      return next(new ApiError({ 
        statusCode: 403, 
        message: 'You do not have permission to perform this action' 
      }));
    }

    next();
  };
};

export const rateLimiter = (options = {}) => {
  const { max = 100, windowMs = 15 * 60 * 1000 } = options;
  
  const rateLimit = require('express-rate-limit');
  
  return rateLimit({
    windowMs,
    max,
    message: { success: false, message: 'Too many requests, please try again later.' },
    standardHeaders: true,
    legacyHeaders: false,
  });
};
