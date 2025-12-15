# Self-Storage Management System

A production-ready self-storage unit management system built with React, Redux Toolkit, Node.js/Express, and MongoDB.

## Project Structure

This is a monorepo managed with npm workspaces:

```
storage-manager/
├── client/          # React frontend (Vite + TypeScript)
├── server/          # Express backend (Node.js + TypeScript)
├── shared/          # Shared TypeScript types and constants
└── package.json     # Workspace root
```

## Prerequisites

- Node.js >= 20.0.0
- npm >= 10.0.0
- MongoDB (local or Atlas)

## Getting Started

### Installation

Install all dependencies for all workspaces:

```bash
npm install
```

### Development

Run both client and server concurrently:

```bash
npm run dev
```

Or run them separately:

```bash
npm run dev:client  # Start React dev server (http://localhost:3000)
npm run dev:server  # Start Express server (http://localhost:3001)
```

### Building

Build all workspaces:

```bash
npm run build
```

Or build individually:

```bash
npm run build:client
npm run build:server
```

### Testing

Run all tests:

```bash
npm test
```

Run tests for specific workspace:

```bash
npm run test:client
npm run test:server
```

### Linting & Type Checking

```bash
npm run lint       # Lint all workspaces
npm run typecheck  # Type check all workspaces
```

## Environment Variables

Create `.env` files in the server directory:

```env
NODE_ENV=development
PORT=3001
MONGODB_URI=mongodb://localhost:27017/storage-dev
CLIENT_URL=http://localhost:3000
```

## Docker

### Development

Run the full stack with Docker Compose:

```bash
docker-compose up
```

Stop and remove containers:

```bash
docker-compose down
```

### Production

The production setup uses pre-built Docker images from GitHub Container Registry and connects to MongoDB Atlas.

1. Copy the production environment template:

```bash
cp .env.production.example .env.production
```

2. Edit `.env.production` with your actual values:
   - `GITHUB_REPOSITORY`: Your GitHub repository (e.g., `username/storage-manager`)
   - `IMAGE_TAG`: Docker image tag (e.g., `latest`, `v1.0.0`, or commit SHA)
   - `MONGODB_URI`: MongoDB Atlas connection string
   - `CLIENT_URL`: Your production frontend URL

3. Deploy with production compose file:

```bash
docker-compose -f docker-compose.prod.yml --env-file .env.production up -d
```

4. View logs:

```bash
docker-compose -f docker-compose.prod.yml logs -f
```

5. Stop production deployment:

```bash
docker-compose -f docker-compose.prod.yml down
```

**Note**: The production configuration:

- Uses pre-built images from GitHub Container Registry
- Connects to external MongoDB Atlas (no local MongoDB container)
- Includes resource limits and security hardening
- Enables automatic restarts
- Implements log rotation

## Features

- **Unit Management**: Track storage units by size, status, and occupancy
- **Tenant Management**: Manage tenant information and rental history
- **Payment Tracking**: Monitor late payments and overdue accounts
- **Dashboard**: Real-time facility metrics and occupancy rates

## Tech Stack

### Frontend

- React 18
- Redux Toolkit + RTK Query
- React Router v6
- Tailwind CSS
- TypeScript

### Backend

- Node.js 20
- Express.js
- MongoDB + Mongoose
- TypeScript

### DevOps

- Docker
- GitHub Actions
- Vitest

## License

MIT
