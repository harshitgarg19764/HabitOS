import mongoose from 'mongoose';
import { logger } from '#utils/logger.js';

let mongoServer;

const connectDB = async () => {
  try {
    let mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/habitos';
    
    const options = {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    };

    try {
      await mongoose.connect(mongoURI, options);
    } catch (err) {
      logger.warn('MongoDB not available, trying in-memory server...');
      
      const { MongoMemoryServer } = await import('mongodb-memory-server');
      mongoServer = await MongoMemoryServer.create();
      mongoURI = mongoServer.getUri();
      
      await mongoose.connect(mongoURI, options);
      logger.info('MongoDB Memory Server started');
    }
    
    logger.info('MongoDB connected successfully');

    mongoose.connection.on('error', (err) => {
      logger.error('MongoDB connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      logger.warn('MongoDB disconnected. Attempting to reconnect...');
    });

    mongoose.connection.on('reconnected', () => {
      logger.info('MongoDB reconnected');
    });

  } catch (error) {
    logger.error('MongoDB connection failed:', error.message);
    process.exit(1);
  }
};

export default connectDB;
