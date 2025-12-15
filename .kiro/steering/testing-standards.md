# Testing Standards

## Overview
- Minimum 80% code coverage required
- All PRs must pass tests before merge
- Use Vitest for all tests (not Jest)

## Test File Organization

### Backend
```
server/tests/
├── unit/
│   ├── services/
│   │   ├── UnitService.test.ts
│   │   ├── TenantService.test.ts
│   │   └── PaymentService.test.ts
│   └── utils/
│       └── ApiError.test.ts
├── integration/
│   ├── units.test.ts
│   ├── tenants.test.ts
│   ├── payments.test.ts
│   └── dashboard.test.ts
├── setup.ts                    # Global test setup
└── factories/
    ├── unitFactory.ts
    ├── tenantFactory.ts
    └── paymentFactory.ts
```

### Frontend
```
client/src/features/units/__tests__/
├── UnitCard.test.tsx
├── UnitList.test.tsx
├── UnitFilters.test.tsx
├── unitsSlice.test.ts
└── unitsApi.test.ts
```

## Naming Conventions

### Test Files
- Co-located with source: `Component.tsx` → `__tests__/Component.test.tsx`
- Or in tests directory: `services/UnitService.ts` → `tests/unit/services/UnitService.test.ts`

### Test Descriptions
```typescript
describe('UnitService', () => {
  describe('occupy', () => {
    it('should create tenant and update unit status', async () => {});
    it('should throw error if unit is already occupied', async () => {});
    it('should create occupation log entry', async () => {});
  });
});
```

## Backend Unit Tests

### Service Testing Pattern
```typescript
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { UnitService } from '@/services/UnitService';
import { Unit } from '@/models/Unit';

// Mock the model
vi.mock('@/models/Unit');

describe('UnitService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getAll', () => {
    it('should return all units when no filters provided', async () => {
      const mockUnits = [
        { unitNumber: 'A-101', status: 'vacant' },
        { unitNumber: 'A-102', status: 'occupied' },
      ];
      
      vi.mocked(Unit.find).mockReturnValue({
        populate: vi.fn().mockResolvedValue(mockUnits),
      } as any);

      const result = await UnitService.getAll({});
      
      expect(result).toEqual(mockUnits);
      expect(Unit.find).toHaveBeenCalledWith({});
    });

    it('should filter by status when provided', async () => {
      vi.mocked(Unit.find).mockReturnValue({
        populate: vi.fn().mockResolvedValue([]),
      } as any);

      await UnitService.getAll({ status: 'vacant' });
      
      expect(Unit.find).toHaveBeenCalledWith({ status: 'vacant' });
    });
  });
});
```

## Backend Integration Tests

### API Testing Pattern
```typescript
import { describe, it, expect, beforeAll, afterAll, beforeEach } from 'vitest';
import request from 'supertest';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import app from '@/app';
import { createUnit } from '../factories/unitFactory';

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri());
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

beforeEach(async () => {
  await mongoose.connection.dropDatabase();
});

describe('GET /api/units', () => {
  it('should return empty array when no units exist', async () => {
    const response = await request(app)
      .get('/api/units')
      .expect(200);

    expect(response.body.success).toBe(true);
    expect(response.body.data).toEqual([]);
  });

  it('should return all units', async () => {
    await createUnit({ unitNumber: 'A-101' });
    await createUnit({ unitNumber: 'A-102' });

    const response = await request(app)
      .get('/api/units')
      .expect(200);

    expect(response.body.data).toHaveLength(2);
  });
});

describe('POST /api/units/:id/occupy', () => {
  it('should occupy vacant unit successfully', async () => {
    const unit = await createUnit({ status: 'vacant' });

    const response = await request(app)
      .post(`/api/units/${unit._id}/occupy`)
      .send({
        tenantFirstName: 'John',
        tenantLastName: 'Doe',
        email: 'john@example.com',
        phone: '555-123-4567',
        moveInDate: '2024-01-15T00:00:00.000Z',
      })
      .expect(200);

    expect(response.body.data.status).toBe('occupied');
  });

  it('should return 409 if unit already occupied', async () => {
    const unit = await createUnit({ status: 'occupied' });

    await request(app)
      .post(`/api/units/${unit._id}/occupy`)
      .send({
        tenantFirstName: 'John',
        tenantLastName: 'Doe',
        email: 'john@example.com',
        phone: '555-123-4567',
        moveInDate: '2024-01-15T00:00:00.000Z',
      })
      .expect(409);
  });
});
```

## Frontend Component Tests

### Component Testing Pattern
```typescript
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { UnitCard } from '../UnitCard';

const mockUnit = {
  id: '1',
  unitNumber: 'A-101',
  size: 'large',
  status: 'vacant',
  monthlyRate: 150,
};

const renderWithProviders = (ui: React.ReactElement, preloadedState = {}) => {
  const store = configureStore({
    reducer: { /* your reducers */ },
    preloadedState,
  });

  return render(
    <Provider store={store}>
      {ui}
    </Provider>
  );
};

describe('UnitCard', () => {
  it('should display unit number and size', () => {
    renderWithProviders(<UnitCard unit={mockUnit} />);

    expect(screen.getByText('A-101')).toBeInTheDocument();
    expect(screen.getByText(/large/i)).toBeInTheDocument();
  });

  it('should show "Occupy" button for vacant units', () => {
    renderWithProviders(<UnitCard unit={mockUnit} />);

    expect(screen.getByRole('button', { name: /occupy/i })).toBeInTheDocument();
  });

  it('should show tenant info for occupied units', () => {
    const occupiedUnit = {
      ...mockUnit,
      status: 'occupied',
      currentTenant: { firstName: 'John', lastName: 'Doe' },
    };

    renderWithProviders(<UnitCard unit={occupiedUnit} />);

    expect(screen.getByText(/john doe/i)).toBeInTheDocument();
  });
});
```

## Redux Slice Tests

```typescript
import { describe, it, expect } from 'vitest';
import unitsReducer, { setFilter, clearFilters } from '../unitsSlice';

describe('unitsSlice', () => {
  const initialState = {
    filters: { size: 'all', status: 'all' },
  };

  it('should handle setFilter', () => {
    const state = unitsReducer(initialState, setFilter({ size: 'large' }));
    expect(state.filters.size).toBe('large');
  });

  it('should handle clearFilters', () => {
    const modifiedState = { filters: { size: 'small', status: 'occupied' } };
    const state = unitsReducer(modifiedState, clearFilters());
    expect(state.filters).toEqual({ size: 'all', status: 'all' });
  });
});
```

## Test Data Factories

### Factory Pattern
```typescript
// tests/factories/unitFactory.ts
import { Unit } from '@/models/Unit';

let counter = 0;

export const createUnit = async (overrides = {}) => {
  counter++;
  return Unit.create({
    unitNumber: `A-${String(counter).padStart(3, '0')}`,
    size: 'medium',
    dimensions: { width: 10, depth: 10, height: 10 },
    monthlyRate: 100,
    status: 'vacant',
    features: [],
    ...overrides,
  });
};

export const buildUnit = (overrides = {}) => ({
  unitNumber: `A-${String(++counter).padStart(3, '0')}`,
  size: 'medium',
  dimensions: { width: 10, depth: 10, height: 10 },
  monthlyRate: 100,
  status: 'vacant',
  features: [],
  ...overrides,
});
```

## MSW for API Mocking (Frontend)

```typescript
// tests/mocks/handlers.ts
import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get('/api/units', () => {
    return HttpResponse.json({
      success: true,
      data: [
        { id: '1', unitNumber: 'A-101', status: 'vacant' },
      ],
    });
  }),
  
  http.post('/api/units/:id/occupy', async ({ params, request }) => {
    const body = await request.json();
    return HttpResponse.json({
      success: true,
      data: { id: params.id, status: 'occupied', ...body },
    });
  }),
];
```

## Coverage Requirements

| Category | Minimum Coverage |
|----------|-----------------|
| Services | 90% |
| Controllers | 80% |
| Redux Slices | 90% |
| React Components | 70% |
| Utilities | 95% |
| Overall | 80% |

## CI Test Configuration

```yaml
# In GitHub Actions
- name: Run Tests
  run: npm test -- --coverage
  
- name: Check Coverage
  run: |
    npm test -- --coverage --coverageReporters=json-summary
    # Fail if below threshold
```
