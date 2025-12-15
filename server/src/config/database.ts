import mongoose from 'mongoose';
import { env } from '@/config/environment.js';

const MAX_RETRIES = 5;
const RETRY_DELAY_MS = 5000;

/**
 * Connect to MongoDB with retry logic
 */
export const connectDatabase = async (): Promise<void> => {
  let retries = 0;

  while (retries < MAX_RETRIES) {
    try {
      await mongoose.connect(env.MONGODB_URI);
      console.log('✅ MongoDB connected successfully');
      return;
    } catch (error) {
      retries++;
      console.error(`❌ MongoDB connection attempt ${retries} failed:`, error);

      if (retries >= MAX_RETRIES) {
        console.error('❌ Max retries reached. Could not connect to MongoDB.');
        throw error;
      }

      console.log(`⏳ Retrying in ${RETRY_DELAY_MS / 1000} seconds...`);
      await new Promise(resolve => setTimeout(resolve, RETRY_DELAY_MS));
    }
  }
};

/**
 * Disconnect from MongoDB
 */
export const disconnectDatabase = async (): Promise<void> => {
  try {
    await mongoose.disconnect();
    console.log('✅ MongoDB disconnected successfully');
  } catch (error) {
    console.error('❌ Error disconnecting from MongoDB:', error);
    throw error;
  }
};

/**
 * Handle graceful shutdown
 */
export const setupGracefulShutdown = (): void => {
  const shutdown = async (signal: string) => {
    console.log(`\n${signal} received. Closing MongoDB connection...`);
    await disconnectDatabase();
    // eslint-disable-next-line no-process-exit
    process.exit(0);
  };

  process.on('SIGINT', () => {
    void shutdown('SIGINT');
  });
  process.on('SIGTERM', () => {
    void shutdown('SIGTERM');
  });
};
