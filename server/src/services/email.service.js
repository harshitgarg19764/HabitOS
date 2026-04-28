import sgMail from '@sendgrid/mail';
import { logger } from '#utils/logger.js';

// Initialize SendGrid with API Key
if (process.env.SENDGRID_API_KEY && process.env.SENDGRID_API_KEY !== 'dummy-key') {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
}

/**
 * Send an email using SendGrid
 * @param {Object} options - Email options
 * @param {string} options.to - Recipient email
 * @param {string} options.subject - Email subject
 * @param {string} options.html - HTML content
 * @param {string} [options.text] - Plain text content (backup)
 */
export const sendEmail = async ({ to, subject, html, text }) => {
  const msg = {
    to,
    from: process.env.EMAIL_FROM || 'noreply@habitos.app',
    subject,
    text: text || 'HabitOS Notification',
    html,
  };

  try {
    if (process.env.SENDGRID_API_KEY && process.env.SENDGRID_API_KEY !== 'dummy-key') {
      await sgMail.send(msg);
      logger.info(`Email sent to ${to}: ${subject}`);
    } else {
      logger.warn(`No valid SENDGRID_API_KEY found. Logging email instead:
To: ${to}
Subject: ${subject}
Content: ${html.substring(0, 100)}...`);
    }
    return { success: true };
  } catch (error) {
    logger.error(`Error sending email to ${to}:`, error);
    if (error.response) {
      logger.error(error.response.body);
    }
    return { success: false, error };
  }
};
