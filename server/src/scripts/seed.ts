import mongoose from 'mongoose';
import { env } from '@/config/environment.js';
// TODO: Uncomment these imports once Unit model is created (Task 2.1)
// import { Unit } from '@/models/Unit.js';
// import { UNIT_SIZES, UNIT_DIMENSIONS, MONTHLY_RATES, UNIT_STATUS } from '@/config/constants.js';

/**
 * Seed script for populating the database with initial unit data
 *
 * This script creates a comprehensive set of storage units across different sizes
 * to provide realistic demo data for the application.
 *
 * Run with: npm run seed
 *
 * NOTE: This script is ready to use once the Unit model is created in Task 2.1.
 * Simply uncomment the imports and implementation code below.
 */

// TODO: Uncomment this data once Unit model is created (Task 2.1)
// const UNITS_TO_CREATE = [
//   // Small units (5x5) - Building A
//   { unitNumber: 'A-101', size: UNIT_SIZES.SMALL, features: ['ground-floor'] },
//   { unitNumber: 'A-102', size: UNIT_SIZES.SMALL, features: ['ground-floor'] },
//   { unitNumber: 'A-103', size: UNIT_SIZES.SMALL, features: ['ground-floor', 'corner-unit'] },
//   { unitNumber: 'A-104', size: UNIT_SIZES.SMALL, features: ['ground-floor'] },
//   { unitNumber: 'A-105', size: UNIT_SIZES.SMALL, features: ['ground-floor'] },
//   { unitNumber: 'A-201', size: UNIT_SIZES.SMALL, features: ['second-floor'] },
//   { unitNumber: 'A-202', size: UNIT_SIZES.SMALL, features: ['second-floor'] },
//   { unitNumber: 'A-203', size: UNIT_SIZES.SMALL, features: ['second-floor', 'corner-unit'] },
//   { unitNumber: 'A-204', size: UNIT_SIZES.SMALL, features: ['second-floor'] },
//   { unitNumber: 'A-205', size: UNIT_SIZES.SMALL, features: ['second-floor'] },
//
//   // Medium units (10x10) - Building B
//   { unitNumber: 'B-101', size: UNIT_SIZES.MEDIUM, features: ['ground-floor', 'climate-controlled'] },
//   { unitNumber: 'B-102', size: UNIT_SIZES.MEDIUM, features: ['ground-floor', 'climate-controlled'] },
//   { unitNumber: 'B-103', size: UNIT_SIZES.MEDIUM, features: ['ground-floor', 'climate-controlled', 'corner-unit'] },
//   { unitNumber: 'B-104', size: UNIT_SIZES.MEDIUM, features: ['ground-floor'] },
//   { unitNumber: 'B-105', size: UNIT_SIZES.MEDIUM, features: ['ground-floor'] },
//   { unitNumber: 'B-201', size: UNIT_SIZES.MEDIUM, features: ['second-floor', 'climate-controlled'] },
//   { unitNumber: 'B-202', size: UNIT_SIZES.MEDIUM, features: ['second-floor', 'climate-controlled'] },
//   { unitNumber: 'B-203', size: UNIT_SIZES.MEDIUM, features: ['second-floor'] },
//   { unitNumber: 'B-204', size: UNIT_SIZES.MEDIUM, features: ['second-floor'] },
//   { unitNumber: 'B-205', size: UNIT_SIZES.MEDIUM, features: ['second-floor', 'corner-unit'] },
//
//   // Large units (10x20) - Building C
//   { unitNumber: 'C-101', size: UNIT_SIZES.LARGE, features: ['ground-floor', 'climate-controlled', 'drive-up'] },
//   { unitNumber: 'C-102', size: UNIT_SIZES.LARGE, features: ['ground-floor', 'climate-controlled', 'drive-up'] },
//   { unitNumber: 'C-103', size: UNIT_SIZES.LARGE, features: ['ground-floor', 'drive-up'] },
//   { unitNumber: 'C-104', size: UNIT_SIZES.LARGE, features: ['ground-floor', 'drive-up'] },
//   { unitNumber: 'C-105', size: UNIT_SIZES.LARGE, features: ['ground-floor', 'climate-controlled', 'drive-up', 'corner-unit'] },
//   { unitNumber: 'C-201', size: UNIT_SIZES.LARGE, features: ['second-floor', 'climate-controlled'] },
//   { unitNumber: 'C-202', size: UNIT_SIZES.LARGE, features: ['second-floor', 'climate-controlled'] },
//   { unitNumber: 'C-203', size: UNIT_SIZES.LARGE, features: ['second-floor'] },
//   { unitNumber: 'C-204', size: UNIT_SIZES.LARGE, features: ['second-floor'] },
//   { unitNumber: 'C-205', size: UNIT_SIZES.LARGE, features: ['second-floor', 'corner-unit'] },
// ];

const seedDatabase = async () => {
  try {
    console.log('🌱 Starting database seed...');
    console.log(`📍 Environment: ${env.NODE_ENV}`);
    console.log(`📍 Database: ${env.MONGODB_URI.replace(/\/\/.*@/, '//***@')}`); // Hide credentials

    // Connect to MongoDB
    await mongoose.connect(env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // TODO: Uncomment once Unit model is created (Task 2.1)
    // // Clear existing units
    // const deleteResult = await Unit.deleteMany({});
    // console.log(`🗑️  Cleared ${deleteResult.deletedCount} existing units`);

    // // Create units with proper structure
    // const units = UNITS_TO_CREATE.map(({ unitNumber, size, features }) => ({
    //   unitNumber,
    //   size,
    //   dimensions: UNIT_DIMENSIONS[size],
    //   monthlyRate: MONTHLY_RATES[size],
    //   status: UNIT_STATUS.VACANT,
    //   features: features || [],
    // }));

    // const createdUnits = await Unit.insertMany(units);
    // console.log(`✅ Created ${createdUnits.length} units`);

    // // Summary by size
    // const summary = {
    //   small: createdUnits.filter(u => u.size === UNIT_SIZES.SMALL).length,
    //   medium: createdUnits.filter(u => u.size === UNIT_SIZES.MEDIUM).length,
    //   large: createdUnits.filter(u => u.size === UNIT_SIZES.LARGE).length,
    // };

    // console.log('\n📊 Summary:');
    // console.log(`   Small units (5x5):   ${summary.small} @ $${MONTHLY_RATES[UNIT_SIZES.SMALL]}/month`);
    // console.log(`   Medium units (10x10): ${summary.medium} @ $${MONTHLY_RATES[UNIT_SIZES.MEDIUM]}/month`);
    // console.log(`   Large units (10x20):  ${summary.large} @ $${MONTHLY_RATES[UNIT_SIZES.LARGE]}/month`);
    // console.log(`   Total units: ${createdUnits.length}`);

    console.log('\n⚠️  Seed script structure created. Unit model not yet implemented.');
    console.log('   This script will be functional after Task 2.1 is completed.');
    console.log('   To activate: Uncomment the imports and implementation code in seed.ts');
  } catch (error) {
    console.error('❌ Seed failed:', error);
    // eslint-disable-next-line no-process-exit
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log('✅ Disconnected from MongoDB');
  }
};

// Run the seed
void seedDatabase();
