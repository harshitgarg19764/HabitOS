import { Router } from 'express';
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

router.post('/register', registerValidation, authController.register);

router.post('/login', loginValidation, authController.login);

router.post('/refresh', authenticate, authController.refresh);

router.post('/logout', authenticate, authController.logout);

router.get('/me', authenticate, authController.getMe);

router.put('/profile', authenticate, updateProfileValidation, authController.updateProfile);

router.put('/change-password', authenticate, changePasswordValidation, authController.changePassword);

router.post('/forgot-password', forgotPasswordValidation, authController.forgotPassword);

router.post('/reset-password', resetPasswordValidation, authController.resetPassword);

export default router;
