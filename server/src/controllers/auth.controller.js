import { asyncHandler } from '#utils/asyncHandler.js';
import { ApiResponse } from '#utils/ApiResponse.js';
import * as authService from '#services/auth.service.js';

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict',
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

export const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const result = await authService.registerUser({ name, email, password });

  res
    .cookie('refreshToken', result.refreshToken, cookieOptions)
    .status(201)
    .json(ApiResponse.success(
      { user: result.user, accessToken: result.accessToken },
      'Registration successful',
      201
    ));
});

export const googleCallback = asyncHandler(async (req, res) => {
  const result = await authService.generateTokenPair(req.user._id);
  
  res
    .cookie('refreshToken', result.refreshToken, cookieOptions)
    .redirect(`${process.env.CLIENT_URL || 'http://localhost:3000'}/dashboard?token=${result.accessToken}`);
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const result = await authService.loginUser({ email, password });

  res
    .cookie('refreshToken', result.refreshToken, cookieOptions)
    .json(ApiResponse.success(
      { user: result.user, accessToken: result.accessToken },
      'Login successful'
    ));
});

export const refresh = asyncHandler(async (req, res) => {
  const refreshToken = req.cookies.refreshToken || req.body.refreshToken;

  if (!refreshToken) {
    return res.status(401).json(ApiResponse.success(
      null,
      'Refresh token required',
      401
    ));
  }

  const tokens = await authService.rotateTokens(refreshToken);

  res
    .cookie('refreshToken', tokens.refreshToken, cookieOptions)
    .json(ApiResponse.success(
      { accessToken: tokens.accessToken },
      'Token refreshed successfully'
    ));
});

export const logout = asyncHandler(async (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  await authService.logoutUser(req.userId, refreshToken);

  res
    .clearCookie('refreshToken')
    .json(ApiResponse.success(null, 'Logout successful'));
});

export const getMe = asyncHandler(async (req, res) => {
  const user = await authService.getProfile(req.userId);

  res.json(ApiResponse.success(user, 'User profile retrieved successfully'));
});

export const updateProfile = asyncHandler(async (req, res) => {
  const user = await authService.updateProfile(req.userId, req.body);

  res.json(ApiResponse.success(user, 'Profile updated successfully'));
});

export const changePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  const result = await authService.changePassword(req.userId, { currentPassword, newPassword });

  res.json(ApiResponse.success(result, 'Password changed successfully'));
});

export const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;

  const result = await authService.generatePasswordResetToken(email);

  res.json(ApiResponse.success(result, 'Password reset email sent if account exists'));
});

export const resetPassword = asyncHandler(async (req, res) => {
  const { token, userId, newPassword } = req.body;

  const result = await authService.resetPassword({ token, userId, newPassword });

  res.json(ApiResponse.success(result, 'Password reset successfully'));
});
