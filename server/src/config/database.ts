import mongoose from 'mongoose';
import { env } from '@/config/environment.js';

const MAX_RETRIES = 5;
const INITIAL_RETRY_DELAY_MS = 1000;

/**
 * Setup MongoDB connection event listeners
 */
const setupConnectionListeners = (): void => {
  mongoose.connection.on('connected', () => {
    console.log('📡 Mongoose connected to MongoDB');
  });

  mongoose.connection.on('error', (error) => {
    console.error('❌ Mongoose connection error:', error);
  });

  mongoose.connection.on('disconnected', () => {
    console.log('📡 Mongoose disconnected from MongoDB');
  });
};

/**
 * Connect to MongoDB with retry logic and exponential backoff
 */
export const connectDatabase = async (): Promise<void> => {
  let retries = 0;

  // Setup connection event listeners
  setupConnectionListeners();

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

      // Exponential backoff: 1s, 2s, 4s, 8s, 16s
      const delayMs = INITIAL_RETRY_DELAY_MS * Math.pow(2, retries - 1);
      console.log(`⏳ Retrying in ${delayMs / 1000} seconds...`);
      await new Promise((resolve) => setTimeout(resolve, delayMs));
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
 * Check if database is connected
 */
export const isDatabaseConnected = (): boolean => {
  // readyState: 0 = disconnected, 1 = connected, 2 = connecting, 3 = disconnecting
  return mongoose.connection.readyState === mongoose.ConnectionStates.connected;
};
