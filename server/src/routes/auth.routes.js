import { Router } from 'express';
import passport from 'passport';
import rateLimit from 'express-rate-limit';
import * as authController from '#controllers/auth.controller.js';
import { authenticate } from '#middleware/auth.js';
import {
  registerValidation,
  loginValidation,
  updateProfileValidation,
  changePasswordValidation,
  forgotPasswordValidation,
  resetPasswordValidation,
} from '#middleware/validate.js';

const router = Router();

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { success: false, message: 'Too many login attempts, your account is temporarily locked. Try again in 15 minutes.' },
  standardHeaders: true,
  legacyHeaders: false,
});

router.post('/register', registerValidation, authController.register);

router.post('/login', loginLimiter, loginValidation, authController.login);

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get(
  '/google/callback',
  passport.authenticate('google', { session: false, failureRedirect: `${process.env.CLIENT_URL || 'http://localhost:3000'}/login?error=true` }),
  authController.googleCallback
);

router.post('/refresh', authController.refresh);

router.post('/logout', authenticate, authController.logout);

router.get('/me', authenticate, authController.getMe);

router.put('/profile', authenticate, updateProfileValidation, authController.updateProfile);

router.put('/change-password', authenticate, changePasswordValidation, authController.changePassword);

router.post('/forgot-password', forgotPasswordValidation, authController.forgotPassword);

router.post('/reset-password', resetPasswordValidation, authController.resetPassword);

export default router;
