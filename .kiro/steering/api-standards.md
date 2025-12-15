# API Standards

## REST Conventions

### URL Structure
- Base path: `/api`
- Resource names: plural nouns (e.g., `/api/units`, `/api/tenants`)
- Nested resources for relationships: `/api/units/:id/history`
- Use kebab-case for multi-word resources: `/api/late-accounts`

### HTTP Methods
| Method | Usage | Example |
|--------|-------|---------|
| GET | Retrieve resource(s) | `GET /api/units` |
| POST | Create resource or trigger action | `POST /api/units/:id/occupy` |
| PUT | Full update of resource | `PUT /api/units/:id` |
| PATCH | Partial update | `PATCH /api/tenants/:id` |
| DELETE | Remove resource | `DELETE /api/tenants/:id` |

### Status Codes
| Code | Usage |
|------|-------|
| 200 | Successful GET, PUT, PATCH, DELETE |
| 201 | Successful POST creating resource |
| 204 | Successful request with no content |
| 400 | Bad request / validation error |
| 401 | Unauthorized (not authenticated) |
| 403 | Forbidden (authenticated but not allowed) |
| 404 | Resource not found |
| 409 | Conflict (e.g., unit already occupied) |
| 500 | Server error |

## Request Format

### Query Parameters
- Filtering: `?status=occupied&size=large`
- Pagination: `?page=1&limit=20`
- Sorting: `?sort=createdAt&order=desc`
- Date ranges: `?startDate=2024-01-01&endDate=2024-01-31`

### Request Body
```json
{
  "tenantFirstName": "John",
  "tenantLastName": "Doe",
  "email": "john@example.com",
  "phone": "555-123-4567",
  "moveInDate": "2024-01-15"
}
```

- Use camelCase for all field names
- Dates in ISO 8601 format: `2024-01-15T00:00:00.000Z`
- Monetary values as numbers (not strings): `150.00`

## Response Format

### Success Response (Single Resource)
```json
{
  "success": true,
  "data": {
    "id": "65abc123...",
    "unitNumber": "A-101",
    "size": "large",
    "status": "occupied"
  }
}
```

### Success Response (Collection)
```json
{
  "success": true,
  "data": [
    { "id": "65abc123...", "unitNumber": "A-101" },
    { "id": "65abc124...", "unitNumber": "A-102" }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 45,
    "totalPages": 3
  }
}
```

### Error Response
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid request data",
    "details": [
      {
        "field": "email",
        "message": "Invalid email format"
      }
    ]
  }
}
```

### Error Codes
| Code | HTTP Status | Description |
|------|-------------|-------------|
| `VALIDATION_ERROR` | 400 | Request body validation failed |
| `NOT_FOUND` | 404 | Resource does not exist |
| `UNIT_ALREADY_OCCUPIED` | 409 | Cannot occupy an occupied unit |
| `UNIT_NOT_OCCUPIED` | 409 | Cannot vacate a vacant unit |
| `DATABASE_ERROR` | 500 | Database operation failed |
| `INTERNAL_ERROR` | 500 | Unexpected server error |

## Validation

### Using Zod Schemas
```typescript
// validators/unitSchemas.ts
import { z } from 'zod';

export const occupyUnitSchema = z.object({
  tenantFirstName: z.string().min(1).max(50),
  tenantLastName: z.string().min(1).max(50),
  email: z.string().email(),
  phone: z.string().regex(/^\d{3}-\d{3}-\d{4}$/),
  moveInDate: z.string().datetime(),
});

export type OccupyUnitRequest = z.infer<typeof occupyUnitSchema>;
```

### Validation Middleware
```typescript
// middleware/validateRequest.ts
export const validateRequest = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      throw new ApiError(400, 'VALIDATION_ERROR', result.error.errors);
    }
    req.body = result.data;
    next();
  };
};
```

## Controller Pattern

```typescript
// controllers/unitController.ts
export const occupyUnit = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const data = req.body as OccupyUnitRequest;
  
  const unit = await UnitService.occupy(id, data);
  
  res.status(200).json({
    success: true,
    data: unit,
  });
});
```

## Health Endpoints

### Liveness Probe
```
GET /api/health
Response: { "status": "ok", "timestamp": "..." }
```

### Readiness Probe
```
GET /api/health/ready
Response: { "status": "ok", "database": "connected", "timestamp": "..." }
```

## CORS Configuration

```typescript
const corsOptions = {
  origin: process.env.CLIENT_URL,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};
```
