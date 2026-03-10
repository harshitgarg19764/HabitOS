import { z } from 'zod';
import { logger } from '#utils/logger.js';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.coerce.number().default(5000),
  
  MONGO_URI: z.string().min(1, 'MONGO_URI is required'),
  
  JWT_SECRET: z.string().min(32, 'JWT_SECRET must be at least 32 characters'),
  JWT_REFRESH_SECRET: z.string().min(32, 'JWT_REFRESH_SECRET must be at least 32 characters'),
  JWT_EXPIRE: z.string().default('15m'),
  JWT_REFRESH_EXPIRE: z.string().default('7d'),
  
  CLIENT_URL: z.string().url('CLIENT_URL must be a valid URL'),
  
  OPENAI_API_KEY: z.string().optional(),
  AI_ENABLED: z.string().default('true'),
  
  SENDGRID_API_KEY: z.string().optional(),
  EMAIL_FROM: z.string().email().optional(),
  
  REDIS_URL: z.string().optional(),
  LOG_LEVEL: z.enum(['error', 'warn', 'info', 'http', 'debug']).default('debug'),
  
  GOOGLE_CLIENT_ID: z.string().optional(),
  GOOGLE_CLIENT_SECRET: z.string().optional(),
  ALLOWED_EMAIL_DOMAINS: z.string().optional(),
});

const validateEnv = () => {
  try {
    const validatedEnv = envSchema.parse(process.env);
    
    Object.keys(validatedEnv).forEach((key) => {
      if (validatedEnv[key] !== undefined) {
        process.env[key] = validatedEnv[key];
      }
    });
    
    logger.info('Environment variables validated successfully');
    return validatedEnv;
  } catch (error) {
    if (error instanceof z.ZodError) {
      const missingVars = error.errors.map((e) => e.path.join('.')).join(', ');
      logger.error(`Missing or invalid environment variables: ${missingVars}`);
      console.error('\n❌ Environment validation failed!');
      console.error('Missing or invalid variables:', error.errors.map((e) => `${e.path.join('.')}: ${e.message}`));
    } else {
      logger.error('Environment validation error:', error.message);
    }
    process.exit(1);
  }
};

export const env = validateEnv();

export default env;
