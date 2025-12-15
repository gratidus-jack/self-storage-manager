# Self-Storage Management System - Implementation Tasks

## Phase 1: Project Setup & Infrastructure

### Task 1.1: Initialize Monorepo Structure
- [x] Create root directory with package.json for workspace management
- [x] Initialize `/client` directory with Vite + React + TypeScript
- [x] Initialize `/server` directory with Node.js + TypeScript
- [x] Configure shared TypeScript types in `/shared` directory
- [x] Set up path aliases for clean imports
- [x] Add root-level scripts for running both client and server

**Expected Outcome:** Working monorepo with `npm run dev` starting both frontend and backend

---

### Task 1.2: Configure ESLint & Prettier
- [x] Install ESLint with TypeScript support for both client and server
- [x] Configure React-specific ESLint rules for client
- [x] Configure Node.js-specific ESLint rules for server
- [x] Set up Prettier with consistent formatting rules
- [x] Add pre-commit hooks with Husky and lint-staged
- [x] Create `.editorconfig` for IDE consistency

**Expected Outcome:** Linting runs on save and pre-commit, consistent code style enforced

---

### Task 1.3: Set Up MongoDB Connection
- [ ] Install Mongoose in server package
- [ ] Create database configuration module with connection handling
- [ ] Implement connection retry logic with exponential backoff
- [ ] Add graceful shutdown handling for database connections
- [ ] Create environment variable schema with validation (using zod or joi)
- [ ] Add seed script for initial unit data

**Expected Outcome:** Server connects to MongoDB on startup with proper error handling

---

### Task 1.4: Configure Redux Store
- [ ] Install Redux Toolkit and React-Redux
- [ ] Create store configuration with proper TypeScript typing
- [ ] Set up RTK Query API slice with base configuration
- [ ] Create typed hooks (useAppDispatch, useAppSelector)
- [ ] Configure Redux DevTools for development
- [ ] Add store provider to React app entry point

**Expected Outcome:** Redux store initialized with DevTools visible, typed hooks available

---

### Task 1.5: Docker Configuration
- [ ] Create Dockerfile for React frontend (multi-stage build)
- [ ] Create Dockerfile for Node.js backend
- [ ] Create docker-compose.yml for local development
- [ ] Add MongoDB service to docker-compose
- [ ] Create docker-compose.prod.yml for production
- [ ] Add .dockerignore files

**Expected Outcome:** `docker-compose up` starts full stack locally

---

## Phase 2: Backend API Development

### Task 2.1: Create Mongoose Models
- [ ] Implement Unit model with schema validation
- [ ] Implement Tenant model with required fields and indexes
- [ ] Implement Payment model with date handling
- [ ] Implement OccupationLog model for audit trail
- [ ] Add virtual fields and instance methods where needed
- [ ] Create model index file for clean exports

**Expected Outcome:** All four models defined with proper TypeScript types exported

---

### Task 2.2: Implement Unit Service & Routes
- [ ] Create UnitService class with CRUD operations
- [ ] Implement `getAllUnits` with filtering (size, status)
- [ ] Implement `getUnitById` with tenant population
- [ ] Implement `occupyUnit` with tenant creation and logging
- [ ] Implement `vacateUnit` with status update and logging
- [ ] Implement `getUnitHistory` for occupation logs
- [ ] Create unit routes with validation middleware
- [ ] Add unit controller connecting routes to service

**Expected Outcome:** All unit endpoints functional, tested via Postman/curl

---

### Task 2.3: Implement Tenant Service & Routes
- [ ] Create TenantService class
- [ ] Implement `getAllTenants` with pagination
- [ ] Implement `getTenantById`
- [ ] Implement `createTenant` (called from occupy flow)
- [ ] Implement `updateTenant` for contact info changes
- [ ] Create tenant routes and controller

**Expected Outcome:** Tenant CRUD operations functional

---

### Task 2.4: Implement Payment Service & Routes
- [ ] Create PaymentService class
- [ ] Implement `getPayments` with date range filtering
- [ ] Implement `getLatePayments` with days overdue calculation
- [ ] Implement `markPaymentPaid` with timestamp
- [ ] Add scheduled job consideration for payment status updates
- [ ] Create payment routes and controller

**Expected Outcome:** Late payments query returns accurate overdue accounts

---

### Task 2.5: Implement Dashboard Service & Routes
- [ ] Create DashboardService class
- [ ] Implement `getSummary` aggregating all metrics
- [ ] Use MongoDB aggregation pipeline for efficient queries
- [ ] Calculate occupancy rate, revenue breakdown
- [ ] Create dashboard routes and controller

**Expected Outcome:** Single endpoint returns all dashboard metrics

---

### Task 2.6: Add Health Check Endpoints
- [ ] Implement `/api/health` basic liveness probe
- [ ] Implement `/api/health/ready` with database connectivity check
- [ ] Add response time tracking to health endpoint
- [ ] Include version information in health response

**Expected Outcome:** Health endpoints return proper status for orchestration

---

### Task 2.7: Implement Error Handling Middleware
- [ ] Create custom ApiError class with status codes
- [ ] Implement global error handling middleware
- [ ] Add request validation middleware using zod
- [ ] Implement async handler wrapper utility
- [ ] Add request logging middleware (morgan or custom)
- [ ] Configure different error responses for dev vs prod

**Expected Outcome:** All errors return consistent JSON format with appropriate status codes

---

## Phase 3: Frontend Development

### Task 3.1: Set Up Routing & Layout
- [ ] Install and configure React Router v6
- [ ] Create main layout component with navigation
- [ ] Set up route structure (Dashboard, Units, Late Accounts)
- [ ] Add 404 page handling
- [ ] Implement navigation active states

**Expected Outcome:** Navigation between all pages working

---

### Task 3.2: Implement RTK Query API Slices
- [ ] Create unitsApi with all unit endpoints
- [ ] Create tenantsApi with tenant endpoints
- [ ] Create paymentsApi with payment endpoints
- [ ] Create dashboardApi with summary endpoint
- [ ] Configure caching and invalidation tags
- [ ] Set up optimistic updates for status changes

**Expected Outcome:** All API calls go through RTK Query with caching

---

### Task 3.3: Create Units Feature Slice & Components
- [ ] Create unitsSlice for filter state management
- [ ] Implement UnitList component with grid layout
- [ ] Implement UnitCard showing status, size, tenant info
- [ ] Implement UnitFilters component (size, status dropdowns)
- [ ] Add loading and error states
- [ ] Style components with Tailwind CSS

**Expected Outcome:** Units page displays all units with working filters

---

### Task 3.4: Implement Occupy/Vacate Flow
- [ ] Create OccupyUnitModal component
- [ ] Implement tenant information form with validation
- [ ] Add form submission with optimistic update
- [ ] Create VacateUnitModal with confirmation
- [ ] Handle success/error notifications
- [ ] Implement UnitHistory drawer/modal component

**Expected Outcome:** Full occupy/vacate workflow functional from UI

---

### Task 3.5: Create Late Accounts Feature
- [ ] Create paymentsSlice for filter state
- [ ] Implement LateAccountsList component
- [ ] Implement LateAccountCard with overdue styling
- [ ] Add "Mark Paid" button with confirmation
- [ ] Implement days overdue filter
- [ ] Add critical account highlighting (30+ days)

**Expected Outcome:** Late accounts page shows overdue accounts with actions

---

### Task 3.6: Create Dashboard Feature
- [ ] Implement Dashboard page layout
- [ ] Create MetricCard component (reusable)
- [ ] Display occupancy metrics with click-through
- [ ] Display late accounts summary
- [ ] Display revenue breakdown
- [ ] Add loading skeleton states

**Expected Outcome:** Dashboard displays all metrics, cards link to detail views

---

### Task 3.7: Implement Common UI Components
- [ ] Create Button component with variants
- [ ] Create Modal component (reusable)
- [ ] Create Card component
- [ ] Create LoadingSpinner component
- [ ] Create Toast/Notification system
- [ ] Create form input components with error states

**Expected Outcome:** Consistent UI component library used throughout app

---

## Phase 4: Testing

### Task 4.1: Set Up Testing Infrastructure
- [ ] Configure Vitest for both client and server
- [ ] Set up React Testing Library for component tests
- [ ] Configure test database for integration tests
- [ ] Add test coverage reporting
- [ ] Create test utilities and mocks

**Expected Outcome:** Test commands run and report coverage

---

### Task 4.2: Write Backend Unit Tests
- [ ] Test UnitService methods
- [ ] Test TenantService methods
- [ ] Test PaymentService methods (especially late calculation)
- [ ] Test DashboardService aggregation
- [ ] Test validation middleware
- [ ] Achieve 80%+ coverage on services

**Expected Outcome:** All service methods have test coverage

---

### Task 4.3: Write Backend Integration Tests
- [ ] Test unit API endpoints end-to-end
- [ ] Test occupy/vacate flow integration
- [ ] Test late payments query accuracy
- [ ] Test dashboard summary calculation
- [ ] Test error responses

**Expected Outcome:** All API routes have integration test coverage

---

### Task 4.4: Write Frontend Tests
- [ ] Test Redux slices (reducers and selectors)
- [ ] Test UnitCard component rendering
- [ ] Test UnitFilters interaction
- [ ] Test LateAccountCard rendering and actions
- [ ] Test form validation in OccupyUnitModal
- [ ] Test dashboard metric display

**Expected Outcome:** Critical UI components and Redux logic tested

---

## Phase 5: CI/CD & Production Readiness

### Task 5.1: Create GitHub Actions Test Workflow
- [ ] Create `.github/workflows/test.yml`
- [ ] Configure Node.js matrix testing (18, 20)
- [ ] Add MongoDB service container for tests
- [ ] Run lint, type check, and tests
- [ ] Upload coverage to Codecov
- [ ] Configure status checks for PRs

**Expected Outcome:** PRs show pass/fail status, coverage reports

---

### Task 5.2: Create GitHub Actions Build Workflow
- [ ] Create build job for frontend
- [ ] Create build job for backend
- [ ] Build Docker images
- [ ] Push images to GitHub Container Registry
- [ ] Tag images with commit SHA and branch

**Expected Outcome:** Docker images built and pushed on every push to main

---

### Task 5.3: Create GitHub Actions Deploy Workflow
- [ ] Create deployment workflow triggered on main
- [ ] Add manual approval gate for production
- [ ] Configure secrets for deployment credentials
- [ ] Add smoke test step post-deployment
- [ ] Implement rollback capability

**Expected Outcome:** Merging to main triggers deployment pipeline

---

### Task 5.4: Production Environment Configuration
- [ ] Set up MongoDB Atlas cluster (free tier for demo)
- [ ] Configure production environment variables
- [ ] Set up CORS for production domain
- [ ] Configure rate limiting middleware
- [ ] Add helmet.js for security headers
- [ ] Set up request compression

**Expected Outcome:** Production config complete and secure

---

### Task 5.5: Documentation
- [ ] Write README.md with setup instructions
- [ ] Document API endpoints (consider OpenAPI/Swagger)
- [ ] Add architecture decision records (ADRs)
- [ ] Document environment variables
- [ ] Add contributing guidelines

**Expected Outcome:** New developers can onboard from README

---

## Phase 6: Final Polish

### Task 6.1: Seed Data & Demo Setup
- [ ] Create comprehensive seed script with realistic data
- [ ] Include mix of occupied/vacant units
- [ ] Include late accounts at various stages
- [ ] Add npm script for easy seeding
- [ ] Create reset script for demo purposes

**Expected Outcome:** `npm run seed` populates database with demo data

---

### Task 6.2: Performance Optimization
- [ ] Add database indexes for common queries
- [ ] Implement React.memo on list item components
- [ ] Add pagination to unit and tenant lists
- [ ] Configure proper caching headers
- [ ] Lazy load route components

**Expected Outcome:** App handles 500 units without performance issues

---

### Task 6.3: Final Review & Cleanup
- [ ] Remove console.logs and debug code
- [ ] Review and update all TypeScript types
- [ ] Ensure all environment variables documented
- [ ] Verify all tests pass
- [ ] Test full CI/CD pipeline end-to-end
- [ ] Create release tag v1.0.0

**Expected Outcome:** Production-ready application with clean codebase
