# Deployment Workflow

## Overview
This project uses GitHub Actions for CI/CD with a multi-stage pipeline: Test → Build → Deploy.

## Branch Strategy

| Branch | Purpose | Auto-Deploy |
|--------|---------|-------------|
| `main` | Production-ready code | Yes (staging, then prod) |
| `develop` | Integration branch | No |
| `feature/*` | Feature development | No |
| `fix/*` | Bug fixes | No |

## Workflow Triggers

### Test Workflow (`test.yml`)
- **Triggers**: All pull requests, all pushes
- **Purpose**: Validate code quality and tests

### Build Workflow (`build.yml`)
- **Triggers**: Push to `main` branch
- **Purpose**: Build Docker images and push to registry

### Deploy Workflow (`deploy.yml`)
- **Triggers**: Successful build on `main`
- **Purpose**: Deploy to staging, then production

## GitHub Actions Workflows

### Test Workflow
```yaml
# .github/workflows/test.yml
name: Test

on:
  push:
    branches: ['*']
  pull_request:
    branches: [main, develop]

jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - run: npm ci
      - run: npm run lint
      - run: npm run typecheck

  test-server:
    runs-on: ubuntu-latest
    services:
      mongodb:
        image: mongo:7
        ports:
          - 27017:27017
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - run: npm ci
      - run: npm run test:server -- --coverage
        env:
          MONGODB_URI: mongodb://localhost:27017/test
      - uses: codecov/codecov-action@v4
        with:
          files: ./server/coverage/lcov.info
          flags: server

  test-client:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - run: npm ci
      - run: npm run test:client -- --coverage
      - uses: codecov/codecov-action@v4
        with:
          files: ./client/coverage/lcov.info
          flags: client
```

### Build Workflow
```yaml
# .github/workflows/build.yml
name: Build

on:
  push:
    branches: [main]

env:
  REGISTRY: ghcr.io
  IMAGE_NAME: ${{ github.repository }}

jobs:
  build-client:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      packages: write
    steps:
      - uses: actions/checkout@v4
      
      - name: Log in to Container Registry
        uses: docker/login-action@v3
        with:
          registry: ${{ env.REGISTRY }}
          username: ${{ github.actor }}
          password: ${{ secrets.GITHUB_TOKEN }}
      
      - name: Build and push client image
        uses: docker/build-push-action@v5
        with:
          context: ./client
          push: true
          tags: |
            ${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}-client:${{ github.sha }}
            ${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}-client:latest

  build-server:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      packages: write
    steps:
      - uses: actions/checkout@v4
      
      - name: Log in to Container Registry
        uses: docker/login-action@v3
        with:
          registry: ${{ env.REGISTRY }}
          username: ${{ github.actor }}
          password: ${{ secrets.GITHUB_TOKEN }}
      
      - name: Build and push server image
        uses: docker/build-push-action@v5
        with:
          context: ./server
          push: true
          tags: |
            ${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}-server:${{ github.sha }}
            ${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}-server:latest
```

### Deploy Workflow
```yaml
# .github/workflows/deploy.yml
name: Deploy

on:
  workflow_run:
    workflows: [Build]
    types: [completed]
    branches: [main]

jobs:
  deploy-staging:
    if: ${{ github.event.workflow_run.conclusion == 'success' }}
    runs-on: ubuntu-latest
    environment: staging
    steps:
      - name: Deploy to staging
        run: |
          # Deploy commands here (depends on hosting platform)
          echo "Deploying to staging..."
      
      - name: Run smoke tests
        run: |
          # Verify deployment is healthy
          curl -f ${{ vars.STAGING_URL }}/api/health || exit 1

  deploy-production:
    needs: deploy-staging
    runs-on: ubuntu-latest
    environment: production  # Requires manual approval
    steps:
      - name: Deploy to production
        run: |
          echo "Deploying to production..."
      
      - name: Verify deployment
        run: |
          curl -f ${{ vars.PRODUCTION_URL }}/api/health || exit 1
```

## Docker Configuration

### Client Dockerfile
```dockerfile
# client/Dockerfile
FROM node:20-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### Server Dockerfile
```dockerfile
# server/Dockerfile
FROM node:20-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY package*.json ./

USER node
EXPOSE 3001
CMD ["node", "dist/index.js"]
```

### Docker Compose (Development)
```yaml
# docker-compose.yml
version: '3.8'

services:
  client:
    build: ./client
    ports:
      - "3000:80"
    depends_on:
      - server

  server:
    build: ./server
    ports:
      - "3001:3001"
    environment:
      - NODE_ENV=development
      - MONGODB_URI=mongodb://mongo:27017/storage-dev
      - CLIENT_URL=http://localhost:3000
    depends_on:
      - mongo

  mongo:
    image: mongo:7
    ports:
      - "27017:27017"
    volumes:
      - mongo-data:/data/db

volumes:
  mongo-data:
```

## Environment Variables

### Required Secrets (GitHub)
| Secret | Description |
|--------|-------------|
| `MONGODB_URI` | MongoDB Atlas connection string |
| `STAGING_DEPLOY_KEY` | SSH key for staging deployment |
| `PRODUCTION_DEPLOY_KEY` | SSH key for production deployment |

### Environment-Specific Variables
```
# Staging
STAGING_URL=https://staging.storage-app.example.com
NODE_ENV=staging

# Production
PRODUCTION_URL=https://storage-app.example.com
NODE_ENV=production
```

## Health Check Endpoints

Used by deployment pipelines to verify successful deployment:

```
GET /api/health
Response: { "status": "ok" }

GET /api/health/ready
Response: { "status": "ok", "database": "connected" }
```

## Rollback Procedure

1. Identify failing commit SHA
2. Manually trigger deploy workflow with previous SHA
3. Or revert commit and push to main

```bash
# Revert last commit
git revert HEAD --no-commit
git commit -m "Revert: [description]"
git push origin main
```

## Monitoring

### Post-Deployment Checks
- Health endpoint returns 200
- Database connectivity verified
- Critical endpoints respond within 2s

### Alerting
- Configure alerts for deployment failures
- Monitor health endpoint uptime
- Track error rates post-deployment
