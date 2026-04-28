import cron from 'node-cron';
import { User } from '#models/User.js';
import { Habit } from '#models/Habit.js';
import { EmailSettings } from '#models/EmailSettings.js';
import { isStreakAtRisk, calculateCurrentStreak } from '#services/streak.service.js';
import { sendEmail } from '#services/email.service.js';
import { streakReminderTemplate } from '#services/email/templates.js';
import { logger } from '#utils/logger.js';

/**
 * Streak Reminder Job
 * Runs every evening (e.g., 6 PM) to nudge users to keep their streaks alive
 */
export const initStreakReminderJob = () => {
  // Run at 18:00 (6 PM) every day
  cron.schedule('0 18 * * *', async () => {
    logger.info('Running Streak Reminder Job...');
    
    try {
      const settings = await EmailSettings.find({ 
        streakReminderEnabled: true,
        enabled: true 
      });

      for (const setting of settings) {
        const user = await User.findById(setting.userId);
        if (!user) continue;

        const habits = await Habit.find({ userId: user._id, archived: false });

        for (const habit of habits) {
          if (await isStreakAtRisk(user._id, habit._id)) {
            const streakCount = await calculateCurrentStreak(user._id, habit._id);
            const html = streakReminderTemplate(user.name, habit.name, streakCount);

            await sendEmail({
              to: user.email,
              subject: `🔥 Keep it going! Your ${habit.name} streak is at risk`,
              html
            });
          }
        }
      }
    } catch (error) {
      logger.error('Error in Streak Reminder Job:', error);
    }
  });
};
