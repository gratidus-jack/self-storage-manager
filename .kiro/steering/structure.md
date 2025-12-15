# Project Structure

## Monorepo Layout

```
storage-manager/
├── .github/
│   └── workflows/
│       ├── test.yml           # PR testing workflow
│       ├── build.yml          # Docker build workflow
│       └── deploy.yml         # Production deployment
├── .kiro/
│   ├── specs/                 # Kiro specifications
│   └── steering/              # Kiro steering files
├── client/                    # React frontend
├── server/                    # Express backend
├── shared/                    # Shared TypeScript types
├── docker-compose.yml         # Local development
├── docker-compose.prod.yml    # Production compose
├── package.json               # Workspace root
└── README.md
```

## Client Structure (Feature-Based)

```
client/
├── src/
│   ├── app/
│   │   ├── store.ts           # Redux store setup
│   │   ├── hooks.ts           # Typed Redux hooks
│   │   └── api.ts             # RTK Query base API
│   ├── features/
│   │   ├── units/             # Units feature module
│   │   │   ├── index.ts       # Public exports
│   │   │   ├── unitsApi.ts    # RTK Query endpoints
│   │   │   ├── unitsSlice.ts  # Redux slice
│   │   │   ├── UnitList.tsx
│   │   │   ├── UnitCard.tsx
│   │   │   └── __tests__/
│   │   ├── tenants/
│   │   ├── payments/
│   │   └── dashboard/
│   ├── components/            # Shared UI components
│   │   ├── Layout/
│   │   ├── common/
│   │   └── index.ts
│   ├── pages/                 # Route page components
│   ├── hooks/                 # Custom hooks (non-Redux)
│   ├── utils/                 # Utility functions
│   ├── types/                 # Frontend-only types
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css              # Tailwind imports
├── public/
├── index.html
├── vite.config.ts
├── tailwind.config.js
├── tsconfig.json
└── package.json
```

## Server Structure (Layered Architecture)

```
server/
├── src/
│   ├── config/
│   │   ├── database.ts        # MongoDB connection
│   │   ├── environment.ts     # Env var validation with zod
│   │   └── constants.ts       # App constants
│   ├── models/
│   │   ├── Unit.ts
│   │   ├── Tenant.ts
│   │   ├── Payment.ts
│   │   ├── OccupationLog.ts
│   │   └── index.ts           # Model exports
│   ├── services/              # Business logic layer
│   │   ├── UnitService.ts
│   │   ├── TenantService.ts
│   │   ├── PaymentService.ts
│   │   ├── DashboardService.ts
│   │   └── index.ts
│   ├── controllers/           # Request handlers
│   │   ├── unitController.ts
│   │   ├── tenantController.ts
│   │   ├── paymentController.ts
│   │   ├── dashboardController.ts
│   │   └── index.ts
│   ├── routes/
│   │   ├── units.ts
│   │   ├── tenants.ts
│   │   ├── payments.ts
│   │   ├── dashboard.ts
│   │   ├── health.ts
│   │   └── index.ts           # Route aggregator
│   ├── middleware/
│   │   ├── errorHandler.ts
│   │   ├── validateRequest.ts
│   │   ├── logger.ts
│   │   └── index.ts
│   ├── utils/
│   │   ├── asyncHandler.ts
│   │   ├── ApiError.ts
│   │   └── index.ts
│   ├── validators/            # Zod schemas
│   │   ├── unitSchemas.ts
│   │   ├── tenantSchemas.ts
│   │   └── index.ts
│   └── app.ts                 # Express app setup
├── tests/
│   ├── unit/
│   ├── integration/
│   ├── setup.ts               # Test configuration
│   └── factories/             # Test data factories
├── index.ts                   # Entry point
├── tsconfig.json
└── package.json
```

## Shared Types

```
shared/
├── types/
│   ├── unit.ts                # Unit interfaces
│   ├── tenant.ts              # Tenant interfaces
│   ├── payment.ts             # Payment interfaces
│   ├── dashboard.ts           # Dashboard interfaces
│   ├── api.ts                 # API request/response types
│   └── index.ts
├── constants/
│   ├── unitSizes.ts           # Size definitions
│   └── index.ts
├── tsconfig.json
└── package.json
```

## Naming Conventions

### Files
- React components: `PascalCase.tsx` (e.g., `UnitCard.tsx`)
- TypeScript modules: `camelCase.ts` (e.g., `unitsApi.ts`)
- Test files: `*.test.ts` or `*.test.tsx`
- Index files: Always `index.ts` for barrel exports

### Code
- React components: PascalCase
- Functions/variables: camelCase
- Constants: SCREAMING_SNAKE_CASE
- Types/Interfaces: PascalCase with `I` prefix optional (prefer without)
- MongoDB collections: snake_case plural (e.g., `occupation_logs`)

### Exports
- Use named exports for everything except page components
- Page components may use default exports for lazy loading
- Barrel exports via index.ts files

## Import Order

```typescript
// 1. External libraries
import React from 'react';
import { useSelector } from 'react-redux';

// 2. Internal absolute imports (aliased)
import { useAppDispatch } from '@/app/hooks';
import { Button } from '@/components';

// 3. Relative imports
import { UnitCard } from './UnitCard';

// 4. Types (if separate)
import type { Unit } from '@shared/types';

// 5. Styles (if any)
import './styles.css';
```
