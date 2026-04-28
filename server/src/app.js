import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import expressMongoSanitize from 'express-mongo-sanitize';
import xssClean from 'xss-clean';
import rateLimit from 'express-rate-limit';
import cookieParser from 'cookie-parser';

import { errorHandler, notFound } from '#middleware/errorHandler.js';
import { requestId } from '#middleware/requestId.js';
import { logger } from '#utils/logger.js';
import authRoutes from '#routes/auth.routes.js';
import habitRoutes from '#routes/habits.routes.js';
import logRoutes from '#routes/logs.routes.js';
import analyticsRoutes from '#routes/analytics.routes.js';
import aiRoutes from '#routes/ai.routes.js';
import achievementRoutes from '#routes/achievements.routes.js';
import settingsRoutes from '#routes/settings.routes.js';
import passport from 'passport';
import { configureGoogleAuth } from '#services/googleAuth.service.js';

configureGoogleAuth();

export const app = express();

app.use(requestId);

app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true,
  },
  xFrameOptions: 'DENY',
}));

app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-request-id'],
}));

app.use(compression());

app.use(expressMongoSanitize());

app.use(xssClean());

app.use(express.json({ limit: '10kb' }));

app.use(express.urlencoded({ extended: true, limit: '10kb' }));

const mode = process.env.NODE_ENV === 'production' ? 'combined' : 'dev';
app.use(morgan(mode, {
  stream: {
    write: (message) => logger.http(message.trim()),
  },
}));

const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  message: { success: false, message: 'Too many requests, please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
});

// Limit all routes - DISABLED for development stability
// if (process.env.NODE_ENV === 'production') {
//   app.use('/api/', globalLimiter);
// }

app.use(cookieParser());

app.use(passport.initialize());

app.use('/api/auth', authRoutes);
app.use('/api/habits', habitRoutes);
app.use('/api/logs', logRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/achievements', achievementRoutes);
app.use('/api/settings', settingsRoutes);

app.get('/health', (req, res) => {
  res.status(200).json({ success: true, message: 'Server is healthy' });
});

app.use(notFound);

app.use(errorHandler);
