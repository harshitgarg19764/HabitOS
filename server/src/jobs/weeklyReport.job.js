import cron from 'node-cron';
import { User } from '#models/User.js';
import { EmailSettings } from '#models/EmailSettings.js';
import { getHabitDistribution } from '#services/analytics.service.js';
import { sendEmail } from '#services/email.service.js';
import { logger } from '#utils/logger.js';

export const initWeeklyReportJob = () => {
  // Run every Sunday at 9:00 AM
  cron.schedule('0 9 * * 0', async () => {
    logger.info('Running Weekly Report Job');
    
    try {
      const users = await User.find();
      
      for (const user of users) {
        try {
          const settings = await EmailSettings.getSettings(user._id);
          
          if (!settings.enabled || !settings.weeklyReportEnabled) {
            continue;
          }
          
          const distribution = await getHabitDistribution(user._id);
          
          // Construct HTML 
          const html = `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background: #f9fafb; padding: 20px; border-radius: 12px;">
              <h1 style="color: #6366f1; text-align: center;">Weekly Habit Review</h1>
              <p>Hi ${user.name}, here is how your week looked:</p>
              <div style="background: white; padding: 20px; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
                <ul style="list-style: none; padding: 0;">
                  ${distribution.map(d => `
                    <li style="margin-bottom: 15px;">
                      <strong>${d.name}:</strong> ${d.percentage}% completion
                      <div style="background: #e5e7eb; height: 8px; border-radius: 4px; margin-top: 5px;">
                        <div style="background: #6366f1; height: 100%; width: ${d.percentage}%; border-radius: 4px;"></div>
                      </div>
                    </li>
                  `).join('')}
                </ul>
              </div>
              <p style="text-align: center; margin-top: 20px;">
                <a href="${process.env.CLIENT_URL || 'http://localhost:3000'}/analytics" style="background: #6366f1; color: white; padding: 10px 20px; text-decoration: none; border-radius: 6px;">View Full Analytics</a>
              </p>
            </div>
          `;

          await sendEmail({
            to: user.email,
            subject: 'HabitOS - Your Weekly Performance Report',
            html
          });
          
          logger.info(`Weekly report sent to ${user.email}`);
        } catch (err) {
          logger.error(`Failed to send weekly report to ${user.email}:`, err);
        }
      }
    } catch (err) {
      logger.error('Weekly Report Job failed:', err);
    }
  });
};
