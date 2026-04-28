import cron from 'node-cron';
import mongoose from 'mongoose';
import { logger } from '#utils/logger.js';

// Access the AI Cache collection directly since it might not have a full model exported everywhere
export const initAiCacheCleanupJob = () => {
  // Run daily at 3:00 AM
  cron.schedule('0 3 * * *', async () => {
    logger.info('Running AI Cache Cleanup Job');
    
    try {
      const AiCache = mongoose.model('AiCache');
      const result = await AiCache.deleteMany({ expiresAt: { $lt: new Date() } });
      
      logger.info(`AI Cache Cleanup completed: Deleted ${result.deletedCount} expired items.`);
    } catch (err) {
      logger.error('AI Cache Cleanup Job failed:', err);
    }
  });
};
