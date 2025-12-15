/**
 * Unit size definitions
 */
export const UNIT_SIZES = {
  SMALL: 'small',
  MEDIUM: 'medium',
  LARGE: 'large',
} as const;

export type UnitSize = typeof UNIT_SIZES[keyof typeof UNIT_SIZES];

/**
 * Unit dimensions by size (in feet)
 */
export const UNIT_DIMENSIONS = {
  [UNIT_SIZES.SMALL]: { width: 5, depth: 5, height: 8 },
  [UNIT_SIZES.MEDIUM]: { width: 10, depth: 10, height: 8 },
  [UNIT_SIZES.LARGE]: { width: 10, depth: 20, height: 8 },
} as const;

/**
 * Monthly rates by size (in USD)
 */
export const MONTHLY_RATES = {
  [UNIT_SIZES.SMALL]: 75,
  [UNIT_SIZES.MEDIUM]: 150,
  [UNIT_SIZES.LARGE]: 250,
} as const;

/**
 * Unit status values
 */
export const UNIT_STATUS = {
  VACANT: 'vacant',
  OCCUPIED: 'occupied',
} as const;

export type UnitStatus = typeof UNIT_STATUS[keyof typeof UNIT_STATUS];

/**
 * Tenant status values
 */
export const TENANT_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
} as const;

export type TenantStatus = typeof TENANT_STATUS[keyof typeof TENANT_STATUS];

/**
 * Payment status values
 */
export const PAYMENT_STATUS = {
  PENDING: 'pending',
  PAID: 'paid',
  OVERDUE: 'overdue',
} as const;

export type PaymentStatus = typeof PAYMENT_STATUS[keyof typeof PAYMENT_STATUS];

/**
 * Occupation log event types
 */
export const EVENT_TYPE = {
  MOVE_IN: 'move-in',
  MOVE_OUT: 'move-out',
} as const;

export type EventType = typeof EVENT_TYPE[keyof typeof EVENT_TYPE];

/**
 * Days overdue thresholds
 */
export const DAYS_OVERDUE_THRESHOLDS = {
  CRITICAL: 30,
  WARNING: 15,
} as const;
