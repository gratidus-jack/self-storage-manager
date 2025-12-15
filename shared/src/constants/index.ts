export {
  UNIT_SIZE_DEFINITIONS,
  UNIT_SIZES,
  UNIT_FEATURES,
  type UnitSizeDefinition,
  type UnitFeature,
} from './unitSizes';

export const ERROR_CODES = {
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  NOT_FOUND: 'NOT_FOUND',
  UNIT_ALREADY_OCCUPIED: 'UNIT_ALREADY_OCCUPIED',
  UNIT_NOT_OCCUPIED: 'UNIT_NOT_OCCUPIED',
  DATABASE_ERROR: 'DATABASE_ERROR',
  INTERNAL_ERROR: 'INTERNAL_ERROR',
} as const;

export type ErrorCode = typeof ERROR_CODES[keyof typeof ERROR_CODES];

export const PAYMENT_OVERDUE_RANGES = {
  ALL: 'all',
  RANGE_1_15: '1-15',
  RANGE_16_30: '16-30',
  RANGE_30_PLUS: '30+',
} as const;

export const CRITICAL_OVERDUE_DAYS = 30;
