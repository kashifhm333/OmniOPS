# OmniOPS — Containerization & Local Development Guide

| Attribute | Details |
| :--- | :--- |
| **Document ID** | `DOC-08-OPS-01` |
| **Status** | `Draft` (Pending Review) |
| **Version** | `0.1.0` |
| **Document Owner** | Lead DevOps Engineer Placeholder |
| **Target Audience** | All Software Engineers, DevOps Engineers, SREs |
| **Last Updated** | 2026-11-04 (UTC) |

---

## 1. Document Control & Executive Summary

### 1.1 Executive Summary
This document specifies the local development workflow, containerization standards, multi-stage Docker build configurations, and local orchestration topologies for OmniOPS. It provides reproducible, zero-friction developer setup instructions ensuring parity between local engineering laptops and production cloud environments.

---

## 2. Prerequisites & Environment Setup

### 2.1 Required Developer Tooling
- **Node.js**: v18.0.0+ LTS (Managed via `nvm` or `fnm`).
- **Package Manager**: `npm` (v9+) or `pnpm`.
- **Docker Engine & Docker Compose**: Docker Desktop or Docker Engine v24+.
- **Git**: v2.38+ with SSH authentication configured.

---

## 3. Docker Multi-Stage Build Strategies

### 3.1 Backend API Production Dockerfile (`infrastructure/docker/Dockerfile.api`)
The API container uses multi-stage builds on `node:18-alpine`, executing as an unprivileged `node` user:

```dockerfile
# Stage 1: Build & Dependencies
FROM node:18-alpine AS builder
WORKDIR /app
RUN apk add --no-cache libc6-compat
COPY package.json turbo.json package-lock.json ./
COPY apps/api/package.json ./apps/api/
COPY packages/ ./packages/
RUN npm ci

COPY apps/api ./apps/api
RUN npx turbo run build --filter=@omniops/api

# Stage 2: Minimal Production Runtime
FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
RUN addgroup --system --gid 1001 nodejs && adduser --system --uid 1001 nodejs

COPY --from=builder /app/package.json ./
COPY --from=builder --chown=nodejs:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=nodejs:nodejs /app/apps/api ./apps/api
COPY --from=builder --chown=nodejs:nodejs /app/packages ./packages

USER nodejs
EXPOSE 4000
ENV PORT=4000

HEALTHCHECK --interval=15s --timeout=3s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:4000/api/v1/health || exit 1

CMD ["node", "apps/api/src/server.js"]
```

---

## 4. Local Development Orchestration (`docker-compose.dev.yml`)

Developers can spin up the complete local backing service stack using Docker Compose:

```yaml
version: '3.8'

services:
  mongodb:
    image: mongo:6.0
    container_name: omniops-mongodb
    restart: always
    ports:
      - "27017:27017"
    environment:
      MONGO_INITDB_DATABASE: omniops
    volumes:
      - mongo-data:/data/db

volumes:
  mongo-data:
```

### 4.1 Running the Monorepo Locally
1. **Clone & Install Dependencies**:
   ```bash
   git clone git@github.com:omniops/omniops.git
   cd omniops
   npm install
   ```
2. **Start Backing Databases**:
   ```bash
   docker compose -f infrastructure/docker/docker-compose.dev.yml up -d
   ```
3. **Seed Development Data**:
   ```bash
   npm run seed --workspace=apps/api
   ```
4. **Start Development Servers (Hot Reloading)**:
   ```bash
   npm run dev
   ```
   - Web application runs at: `http://localhost:3000`
   - Express API runs at: `http://localhost:4000`

---

## 5. Related Documents & Traceability

- [CI/CD & Deployment Strategy](CI_CD_AND_DEPLOYMENT.md)
- [Infrastructure as Code](INFRASTRUCTURE_AS_CODE.md)
- [Monorepo Architecture](../01-architecture/MONOREPO_ARCHITECTURE.md)
- [Development Guidelines](../09-developer-experience/DEVELOPMENT_GUIDELINES.md)
