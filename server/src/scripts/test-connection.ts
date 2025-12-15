import mongoose from 'mongoose';
import { connectDatabase, disconnectDatabase } from '@/config/database.js';

/**
 * Simple script to test MongoDB connection
 */
const testConnection = async () => {
  try {
    console.log('🧪 Testing MongoDB connection...');

    await connectDatabase();

    console.log('✅ Connection test successful!');
    console.log(`📊 Connection state: ${mongoose.connection.readyState}`);
    console.log(`🗄️  Database name: ${mongoose.connection.name}`);

    await disconnectDatabase();
  } catch (error) {
    console.error('❌ Connection test failed:', error);
    // eslint-disable-next-line no-process-exit
    process.exit(1);
  }
};

void testConnection();
