import { asyncHandler } from '#utils/asyncHandler.js';
import { ApiResponse } from '#utils/ApiResponse.js';
import { EmailSettings } from '#models/EmailSettings.js';
import { sendEmail } from '#services/email.service.js';
import { dailySummaryTemplate } from '#services/email/templates.js';
import { getDashboardStats } from '#services/analytics.service.js';
import { User } from '#models/User.js';

export const getEmailSettings = asyncHandler(async (req, res) => {
  const settings = await EmailSettings.getSettings(req.userId);
  res.json(ApiResponse.success(settings, 'Email settings retrieved'));
});

export const updateEmailSettings = asyncHandler(async (req, res) => {
  const settings = await EmailSettings.updateSettings(req.userId, req.body);
  res.json(ApiResponse.success(settings, 'Email settings updated'));
});

export const testEmail = asyncHandler(async (req, res) => {
  const user = await User.findById(req.userId);
  const stats = await getDashboardStats(req.userId);
  const html = dailySummaryTemplate(user.name, stats);

  await sendEmail({
    to: user.email,
    subject: 'HabitOS - Test Notification',
    html
  });

  res.json(ApiResponse.success(null, 'Test email sent successfully'));
});
