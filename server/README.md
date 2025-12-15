# Storage Management API Server

Backend API for the self-storage management system.

## Tech Stack

- **Node.js 20** - Runtime
- **Express.js** - Web framework
- **TypeScript** - Type safety
- **MongoDB** - Database
- **Mongoose** - ODM
- **Zod** - Validation
- **Vitest** - Testing

## Getting Started

### Prerequisites

- Node.js 20+
- MongoDB running locally or MongoDB Atlas connection string

### Installation

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Edit .env with your MongoDB connection string
```

### Development

```bash
# Start development server with hot reload
npm run dev

# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Type check
npm run typecheck

# Lint
npm run lint

# Build for production
npm run build

# Start production server
npm start
```

## Project Structure

```
server/
├── src/
│   ├── config/          # Configuration (env, database, constants)
│   ├── models/          # Mongoose models
│   ├── services/        # Business logic
│   ├── controllers/     # Request handlers
│   ├── routes/          # API routes
│   ├── middleware/      # Express middleware
│   ├── utils/           # Utility functions
│   ├── validators/      # Zod schemas
│   ├── app.ts           # Express app setup
│   └── index.ts         # Entry point
├── tests/
│   ├── unit/            # Unit tests
│   ├── integration/     # Integration tests
│   └── factories/       # Test data factories
└── package.json
```

## API Endpoints

### Health
- `GET /api/health` - Basic health check
- `GET /api/health/ready` - Readiness probe with DB check

### Units (Coming Soon)
- `GET /api/units` - List all units
- `GET /api/units/:id` - Get unit details
- `POST /api/units/:id/occupy` - Occupy a unit
- `POST /api/units/:id/vacate` - Vacate a unit

### Tenants (Coming Soon)
- `GET /api/tenants` - List all tenants
- `GET /api/tenants/:id` - Get tenant details

### Payments (Coming Soon)
- `GET /api/payments/late` - Get late payments

### Dashboard (Coming Soon)
- `GET /api/dashboard/summary` - Get dashboard metrics

## Environment Variables

See `.env.example` for required environment variables.

## Testing

```bash
# Run all tests
npm test

# Run with coverage
npm test -- --coverage

# Run specific test file
npm test -- tests/unit/services/UnitService.test.ts
```
