# Self-Storage Management System - Design Document

## Overview
This document outlines the technical architecture for a production-ready self-storage management system built with React, Redux Toolkit, Node.js/Express, and MongoDB.

---

## System Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                           CLIENT (React)                            │
├─────────────────────────────────────────────────────────────────────┤
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐              │
│  │  Dashboard   │  │    Units     │  │ Late Accounts│              │
│  │    View      │  │    View      │  │    View      │              │
│  └──────────────┘  └──────────────┘  └──────────────┘              │
│                            │                                        │
│  ┌─────────────────────────┴─────────────────────────┐             │
│  │              Redux Store (Redux Toolkit)           │             │
│  │  ┌─────────┐  ┌─────────┐  ┌─────────┐           │             │
│  │  │ units   │  │ tenants │  │payments │           │             │
│  │  │ slice   │  │  slice  │  │ slice   │           │             │
│  │  └─────────┘  └─────────┘  └─────────┘           │             │
│  └───────────────────────────────────────────────────┘             │
│                            │                                        │
│  ┌─────────────────────────┴─────────────────────────┐             │
│  │           RTK Query API Layer                      │             │
│  └────────────────────────────────────────────────────┘             │
└─────────────────────────────────────────────────────────────────────┘
                             │ HTTP/REST
                             ▼
┌─────────────────────────────────────────────────────────────────────┐
│                        SERVER (Node.js/Express)                     │
├─────────────────────────────────────────────────────────────────────┤
│  ┌──────────────────────────────────────────────────┐              │
│  │                   API Routes                      │              │
│  │  /api/units    /api/tenants    /api/payments     │              │
│  │  /api/dashboard    /api/health                   │              │
│  └──────────────────────────────────────────────────┘              │
│                            │                                        │
│  ┌──────────────────────────────────────────────────┐              │
│  │              Middleware Layer                     │              │
│  │  - Error Handler  - Validation  - Logging        │              │
│  └──────────────────────────────────────────────────┘              │
│                            │                                        │
│  ┌──────────────────────────────────────────────────┐              │
│  │              Service Layer                        │              │
│  │  UnitService  TenantService  PaymentService      │              │
│  └──────────────────────────────────────────────────┘              │
│                            │                                        │
│  ┌──────────────────────────────────────────────────┐              │
│  │              Mongoose Models                      │              │
│  │  Unit  Tenant  Payment  OccupationLog            │              │
│  └──────────────────────────────────────────────────┘              │
└─────────────────────────────────────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────────┐
│                         MongoDB Atlas                               │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐  ┌──────────────┐  │
│  │   units    │  │  tenants   │  │  payments  │  │occupation_logs│ │
│  └────────────┘  └────────────┘  └────────────┘  └──────────────┘  │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Data Models

### Unit Model
```typescript
interface Unit {
  _id: ObjectId;
  unitNumber: string;           // e.g., "A-101"
  size: 'small' | 'medium' | 'large';
  dimensions: {
    width: number;              // feet
    depth: number;              // feet
    height: number;             // feet
  };
  monthlyRate: number;          // USD
  status: 'vacant' | 'occupied';
  currentTenantId?: ObjectId;   // Reference to Tenant
  features: string[];           // e.g., ["climate-controlled", "ground-floor"]
  createdAt: Date;
  updatedAt: Date;
}
```

### Tenant Model
```typescript
interface Tenant {
  _id: ObjectId;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
  };
  unitId: ObjectId;             // Reference to Unit
  moveInDate: Date;
  moveOutDate?: Date;
  monthlyRate: number;          // Rate locked at move-in
  status: 'active' | 'inactive';
  createdAt: Date;
  updatedAt: Date;
}
```

### Payment Model
```typescript
interface Payment {
  _id: ObjectId;
  tenantId: ObjectId;           // Reference to Tenant
  unitId: ObjectId;             // Reference to Unit
  amount: number;
  dueDate: Date;
  paidDate?: Date;
  status: 'pending' | 'paid' | 'overdue';
  billingPeriod: {
    start: Date;
    end: Date;
  };
  createdAt: Date;
  updatedAt: Date;
}
```

### OccupationLog Model
```typescript
interface OccupationLog {
  _id: ObjectId;
  unitId: ObjectId;             // Reference to Unit
  tenantId: ObjectId;           // Reference to Tenant
  eventType: 'move-in' | 'move-out';
  eventDate: Date;
  monthlyRateAtEvent: number;
  notes?: string;
  createdAt: Date;
}
```

---

## API Endpoints

### Units API
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/units` | List all units with optional filters |
| GET | `/api/units/:id` | Get single unit details |
| PUT | `/api/units/:id` | Update unit details |
| POST | `/api/units/:id/occupy` | Mark unit as occupied |
| POST | `/api/units/:id/vacate` | Mark unit as vacated |
| GET | `/api/units/:id/history` | Get occupation history |

### Tenants API
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/tenants` | List all tenants |
| GET | `/api/tenants/:id` | Get tenant details |
| POST | `/api/tenants` | Create new tenant |
| PUT | `/api/tenants/:id` | Update tenant |

### Payments API
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/payments` | List payments with filters |
| GET | `/api/payments/late` | Get overdue payments |
| POST | `/api/payments/:id/mark-paid` | Record payment received |

### Dashboard API
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/dashboard/summary` | Get dashboard metrics |

### Health API
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Basic health check |
| GET | `/api/health/ready` | Readiness probe (DB connected) |

---

## Redux State Structure

```typescript
interface RootState {
  units: {
    items: Unit[];
    selectedUnit: Unit | null;
    filters: {
      size: 'all' | 'small' | 'medium' | 'large';
      status: 'all' | 'vacant' | 'occupied';
    };
    loading: boolean;
    error: string | null;
  };
  tenants: {
    items: Tenant[];
    selectedTenant: Tenant | null;
    loading: boolean;
    error: string | null;
  };
  payments: {
    items: Payment[];
    lateAccounts: Payment[];
    filters: {
      daysOverdue: 'all' | '1-15' | '16-30' | '30+';
    };
    loading: boolean;
    error: string | null;
  };
  dashboard: {
    summary: DashboardSummary | null;
    loading: boolean;
    error: string | null;
  };
  api: RTKQueryState;  // Managed by RTK Query
}

interface DashboardSummary {
  totalUnits: number;
  occupiedUnits: number;
  vacantUnits: number;
  occupancyRate: number;
  lateAccountsCount: number;
  totalOutstanding: number;
  monthlyRevenue: {
    collected: number;
    pending: number;
    overdue: number;
  };
}
```

---

## Frontend Component Structure

```
src/
├── app/
│   ├── store.ts                 # Redux store configuration
│   └── hooks.ts                 # Typed hooks (useAppDispatch, useAppSelector)
├── features/
│   ├── units/
│   │   ├── unitsSlice.ts
│   │   ├── unitsApi.ts          # RTK Query endpoints
│   │   ├── UnitList.tsx
│   │   ├── UnitCard.tsx
│   │   ├── UnitFilters.tsx
│   │   ├── OccupyUnitModal.tsx
│   │   └── UnitHistory.tsx
│   ├── tenants/
│   │   ├── tenantsSlice.ts
│   │   ├── tenantsApi.ts
│   │   ├── TenantForm.tsx
│   │   └── TenantDetails.tsx
│   ├── payments/
│   │   ├── paymentsSlice.ts
│   │   ├── paymentsApi.ts
│   │   ├── LateAccountsList.tsx
│   │   ├── LateAccountCard.tsx
│   │   └── PaymentFilters.tsx
│   └── dashboard/
│       ├── dashboardSlice.ts
│       ├── dashboardApi.ts
│       ├── Dashboard.tsx
│       ├── MetricCard.tsx
│       └── OccupancyChart.tsx
├── components/
│   ├── Layout/
│   ├── Navigation/
│   └── common/
│       ├── Button.tsx
│       ├── Modal.tsx
│       ├── Card.tsx
│       └── LoadingSpinner.tsx
└── pages/
    ├── DashboardPage.tsx
    ├── UnitsPage.tsx
    └── LateAccountsPage.tsx
```

---

## Backend Structure

```
server/
├── src/
│   ├── config/
│   │   ├── database.ts          # MongoDB connection
│   │   ├── environment.ts       # Environment variables
│   │   └── constants.ts         # App constants (unit sizes, rates)
│   ├── models/
│   │   ├── Unit.ts
│   │   ├── Tenant.ts
│   │   ├── Payment.ts
│   │   └── OccupationLog.ts
│   ├── services/
│   │   ├── UnitService.ts
│   │   ├── TenantService.ts
│   │   ├── PaymentService.ts
│   │   └── DashboardService.ts
│   ├── controllers/
│   │   ├── unitController.ts
│   │   ├── tenantController.ts
│   │   ├── paymentController.ts
│   │   └── dashboardController.ts
│   ├── routes/
│   │   ├── index.ts
│   │   ├── units.ts
│   │   ├── tenants.ts
│   │   ├── payments.ts
│   │   └── dashboard.ts
│   ├── middleware/
│   │   ├── errorHandler.ts
│   │   ├── validateRequest.ts
│   │   └── logger.ts
│   ├── utils/
│   │   ├── asyncHandler.ts
│   │   └── ApiError.ts
│   └── app.ts
├── tests/
│   ├── unit/
│   └── integration/
└── index.ts
```

---

## CI/CD Pipeline Design

```yaml
# GitHub Actions Workflow Overview

Triggers:
  - Push to main → Full deploy
  - Pull request → Test + Build only

Jobs:
  1. test:
     - Install dependencies
     - Run ESLint
     - Run unit tests
     - Run integration tests
     - Upload coverage to Codecov
  
  2. build:
     - Build React frontend
     - Build Node.js backend
     - Create Docker images
  
  3. deploy (main only):
     - Push images to registry
     - Deploy to staging
     - Run smoke tests
     - Deploy to production
```

---

## Environment Configuration

### Development
```env
NODE_ENV=development
PORT=3001
MONGODB_URI=mongodb://localhost:27017/storage-dev
CLIENT_URL=http://localhost:3000
```

### Production
```env
NODE_ENV=production
PORT=3001
MONGODB_URI=${MONGODB_ATLAS_URI}
CLIENT_URL=${PRODUCTION_URL}
```

---

## Technology Decisions

| Category | Choice | Rationale |
|----------|--------|-----------|
| Frontend | React 18 | Industry standard, aligns with learning goals |
| State Management | Redux Toolkit + RTK Query | Modern Redux patterns, built-in caching |
| Styling | Tailwind CSS | Rapid development, consistent design |
| Backend | Express.js | Lightweight, well-documented |
| Database | MongoDB Atlas | Flexible schema, managed hosting |
| ODM | Mongoose | Schema validation, middleware support |
| Testing | Vitest + React Testing Library | Fast, modern testing stack |
| CI/CD | GitHub Actions | Native GitHub integration |
| Containerization | Docker | Consistent environments |

---

## Correctness Properties

### Property 1: Unit Status Consistency (US-1, US-2)
**INVARIANT:** A unit's status field SHALL always match its tenant relationship state
- IF `currentTenantId` is null THEN `status` MUST be 'vacant'
- IF `currentTenantId` is not null THEN `status` MUST be 'occupied'

### Property 2: Occupation Log Completeness (US-2)
**INVARIANT:** Every status change SHALL have a corresponding occupation log entry
- WHEN a unit transitions from 'vacant' to 'occupied' THEN an OccupationLog with `eventType: 'move-in'` MUST be created
- WHEN a unit transitions from 'occupied' to 'vacant' THEN an OccupationLog with `eventType: 'move-out'` MUST be created

### Property 3: Payment Status Accuracy (US-3)
**INVARIANT:** Payment status SHALL accurately reflect current date vs due date
- IF `paidDate` is not null THEN `status` MUST be 'paid'
- IF `paidDate` is null AND current date > `dueDate` THEN `status` MUST be 'overdue'
- IF `paidDate` is null AND current date <= `dueDate` THEN `status` MUST be 'pending'

### Property 4: Dashboard Metric Consistency (US-4)
**INVARIANT:** Dashboard aggregations SHALL match source data
- `totalUnits` MUST equal count of all Unit documents
- `occupiedUnits` MUST equal count of Units where `status = 'occupied'`
- `vacantUnits` MUST equal `totalUnits - occupiedUnits`
- `occupancyRate` MUST equal `(occupiedUnits / totalUnits) * 100`
- `lateAccountsCount` MUST equal count of Payments where `status = 'overdue'`

### Property 5: Tenant-Unit Relationship Integrity (US-2)
**INVARIANT:** Active tenant-unit relationships SHALL be bidirectional
- IF Tenant.unitId references Unit._id THEN Unit.currentTenantId MUST reference Tenant._id
- IF Unit.currentTenantId references Tenant._id THEN Tenant.unitId MUST reference Unit._id
- A Tenant with `status: 'active'` MUST have a corresponding Unit with `status: 'occupied'`

### Property 6: Rate Lock Consistency (US-2)
**INVARIANT:** Tenant's locked rate SHALL match unit rate at move-in time
- WHEN creating a Tenant record THEN `Tenant.monthlyRate` MUST equal `Unit.monthlyRate` at that moment
- WHEN creating an OccupationLog with `eventType: 'move-in'` THEN `monthlyRateAtEvent` MUST equal current `Unit.monthlyRate`

### Property 7: Date Ordering Validity (US-2, US-3)
**INVARIANT:** Temporal relationships SHALL be logically consistent
- `Tenant.moveOutDate` MUST be null OR greater than `Tenant.moveInDate`
- `Payment.paidDate` MUST be null OR greater than or equal to `Payment.dueDate`
- `OccupationLog.eventDate` for 'move-out' MUST be greater than corresponding 'move-in' eventDate for same unit

### Property 8: Filter Result Accuracy (US-1, US-3)
**INVARIANT:** Filtered queries SHALL return only matching records
- WHEN filtering units by size THEN all returned units MUST have the specified size
- WHEN filtering units by status THEN all returned units MUST have the specified status
- WHEN filtering late accounts by days overdue THEN all returned payments MUST fall within the specified range

### Property 9: Optimistic Update Rollback (NFR-2)
**INVARIANT:** Failed API operations SHALL restore previous state
- WHEN an RTK Query mutation fails THEN Redux state MUST revert to pre-mutation state
- WHEN a database operation fails THEN no partial state changes SHALL persist

### Property 10: API Response Format Consistency (API Standards)
**INVARIANT:** All API responses SHALL follow standard format
- Success responses MUST include `{ success: true, data: ... }`
- Error responses MUST include `{ success: false, error: { code, message, details? } }`
- Collection responses MUST include pagination metadata when applicable
