# Technology Stack

## Overview
This project is a production-ready self-storage management system using a modern JavaScript/TypeScript stack with emphasis on DevOps best practices.

## Frontend

### Core
- **React 18** - UI library with hooks and functional components only
- **TypeScript 5** - Strict mode enabled, no `any` types allowed
- **Vite** - Build tool and dev server

### State Management
- **Redux Toolkit** - State management with modern patterns
- **RTK Query** - API data fetching and caching (part of Redux Toolkit)

### Styling
- **Tailwind CSS 3** - Utility-first CSS framework
- No CSS-in-JS libraries (styled-components, emotion)
- No component libraries (MUI, Chakra) - custom components only

### Routing
- **React Router v6** - Client-side routing

### Forms
- **React Hook Form** - Form state management
- **Zod** - Schema validation (shared with backend)

## Backend

### Core
- **Node.js 20 LTS** - Runtime
- **Express.js 4** - Web framework
- **TypeScript 5** - Strict mode enabled

### Database
- **MongoDB** - Document database
- **Mongoose 8** - ODM for schema validation and queries
- **MongoDB Atlas** - Managed hosting for production

### Validation
- **Zod** - Request validation (shared schemas with frontend)

### Security
- **helmet** - Security headers
- **cors** - Cross-origin configuration
- **express-rate-limit** - Rate limiting

## Testing

### Frontend
- **Vitest** - Test runner
- **React Testing Library** - Component testing
- **MSW (Mock Service Worker)** - API mocking

### Backend
- **Vitest** - Test runner
- **Supertest** - HTTP assertions
- **mongodb-memory-server** - In-memory MongoDB for tests

## DevOps

### CI/CD
- **GitHub Actions** - Automation
- **Docker** - Containerization
- **GitHub Container Registry** - Image storage

### Code Quality
- **ESLint** - Linting
- **Prettier** - Formatting
- **Husky** - Git hooks
- **lint-staged** - Pre-commit checks

## Constraints

### Do NOT Use
- Class components in React
- Redux Saga or Redux Thunk (use RTK Query instead)
- Axios (use native fetch via RTK Query)
- Jest (use Vitest)
- Any ORM other than Mongoose
- Environment variables without validation
