# Shared Types and Constants

This package contains shared TypeScript types and constants used across both the client and server applications.

## Structure

```
shared/
├── src/
│   ├── types/              # TypeScript type definitions
│   │   ├── unit.ts         # Unit-related types
│   │   ├── tenant.ts       # Tenant-related types
│   │   ├── payment.ts      # Payment-related types
│   │   ├── occupationLog.ts # Occupation log types
│   │   ├── dashboard.ts    # Dashboard types
│   │   ├── api.ts          # API response types
│   │   └── index.ts        # Type exports
│   ├── constants/          # Shared constants
│   │   ├── unitSizes.ts    # Unit size definitions
│   │   └── index.ts        # Constant exports
│   └── index.ts            # Main entry point
└── dist/                   # Compiled output
```

## Usage

### In Server (Node.js)

```typescript
import {
  Unit,
  Tenant,
  Payment,
  DashboardSummary,
  UNIT_SIZE_DEFINITIONS,
  ERROR_CODES,
} from 'shared';
```

### In Client (React)

```typescript
import type {
  Unit,
  Tenant,
  Payment,
  ApiSuccessResponse,
} from 'shared';

import { UNIT_SIZES, UNIT_FEATURES } from 'shared';
```

## Building

```bash
npm run build        # Compile TypeScript
npm run typecheck    # Type check without emitting
npm run clean        # Remove dist and node_modules
```

## Type Categories

### Core Domain Types
- **Unit**: Storage unit information
- **Tenant**: Tenant/customer information
- **Payment**: Payment records
- **OccupationLog**: Unit occupation history
- **Dashboard**: Dashboard metrics

### API Types
- **ApiSuccessResponse**: Successful API response wrapper
- **ApiCollectionResponse**: Collection response with pagination
- **ApiErrorResponse**: Error response format
- **HealthResponse**: Health check response

### Request Types
- **CreateUnitRequest**: Create new unit
- **UpdateUnitRequest**: Update unit details
- **OccupyUnitRequest**: Occupy a unit
- **CreateTenantRequest**: Create new tenant
- **UpdateTenantRequest**: Update tenant info
- **MarkPaymentPaidRequest**: Mark payment as paid

### Constants
- **UNIT_SIZE_DEFINITIONS**: Size specifications and rates
- **UNIT_SIZES**: Available unit sizes
- **UNIT_FEATURES**: Available unit features
- **ERROR_CODES**: Standard error codes
- **PAYMENT_OVERDUE_RANGES**: Payment filter ranges
- **CRITICAL_OVERDUE_DAYS**: Threshold for critical status

## Type Safety

All types are strictly typed with no `any` types. The package is compiled with TypeScript strict mode enabled.
