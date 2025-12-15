import mongoose from 'mongoose';
import { env } from '@/config/environment.js';

/**
 * Reset script for clearing all data from the database
 *
 * This script removes all documents from all collections, providing
 * a clean slate for development or demo purposes.
 *
 * Run with: npm run reset
 *
 * WARNING: This will delete ALL data in the database!
 *
 * NOTE: This script is ready to use once models are created in Task 2.1.
 * Simply uncomment the imports and implementation code below.
 */

// TODO: Uncomment these imports once models are created (Task 2.1)
// import { Unit } from '@/models/Unit.js';
// import { Tenant } from '@/models/Tenant.js';
// import { Payment } from '@/models/Payment.js';
// import { OccupationLog } from '@/models/OccupationLog.js';

const resetDatabase = async () => {
  try {
    console.log('🔄 Starting database reset...');
    console.log(`📍 Environment: ${env.NODE_ENV}`);
    console.log(`📍 Database: ${env.MONGODB_URI.replace(/\/\/.*@/, '//***@')}`); // Hide credentials

    // Safety check for production
    if (env.NODE_ENV === 'production') {
      console.error('❌ Cannot reset production database!');
      console.error('   This script is only for development and demo purposes.');
      // eslint-disable-next-line no-process-exit
      process.exit(1);
    }

    // Connect to MongoDB
    await mongoose.connect(env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // TODO: Uncomment once models are created (Task 2.1)
    // // Clear all collections
    // const unitsDeleted = await Unit.deleteMany({});
    // console.log(`🗑️  Deleted ${unitsDeleted.deletedCount} units`);

    // const tenantsDeleted = await Tenant.deleteMany({});
    // console.log(`🗑️  Deleted ${tenantsDeleted.deletedCount} tenants`);

    // const paymentsDeleted = await Payment.deleteMany({});
    // console.log(`🗑️  Deleted ${paymentsDeleted.deletedCount} payments`);

    // const logsDeleted = await OccupationLog.deleteMany({});
    // console.log(`🗑️  Deleted ${logsDeleted.deletedCount} occupation logs`);

    // console.log('\n✅ Database reset complete!');
    // console.log('   Run "npm run seed" to populate with fresh data.');

    console.log('\n⚠️  Reset script structure created. Models not yet implemented.');
    console.log('   This script will be functional after Task 2.1 is completed.');
    console.log('   To activate: Uncomment the imports and implementation code in reset.ts');
  } catch (error) {
    console.error('❌ Reset failed:', error);
    // eslint-disable-next-line no-process-exit
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log('✅ Disconnected from MongoDB');
  }
};

// Run the reset
void resetDatabase();
