# OmniOPS — Architectural Decision Records (ADRs)

| Attribute | Details |
| :--- | :--- |
| **Document ID** | `DOC-01-ARC-05` |
| **Status** | `Approved / Living Document` |
| **Version** | `1.0.0` |
| **Document Owner** | Principal Architect & Engineering Steering Committee |
| **Target Audience** | All Software Engineers, Systems Architects, Security Engineers, DevOps Leads |
| **Last Updated** | 2026-11-04 (UTC) |

---

## 1. Document Control & Governance

### 1.1 Purpose & Scope
This document maintains the canonical Architecture Decision Record (ADR) register for OmniOPS. It records significant architectural, technical, and structural decisions along with their context, trade-offs, security and performance implications, and status.

### 1.2 ADR Lifecycle & Status Definitions
- `PROPOSED`: Under active evaluation and discussion. Cannot be assumed in production code without formal review.
- `APPROVED`: Formally accepted by the Architectural Review Board. Mandatory for all team implementations.
- `SUPERSEDED`: Replaced by a subsequent approved ADR (cross-referenced with the new record).
- `REJECTED`: Formally declined with explicit documented rationale.

### 1.3 ADR Template & Supersession Policy
New decisions or changes to existing decisions **MUST** submit an ADR update following the template defined in [Section 4](#4-adr-submission-template--policy). An existing decision cannot be quietly altered; it must be marked `SUPERSEDED` by a new record.

---

## 2. ADR Register Summary

| ADR ID | Title | Status | Primary Technology / Pattern | Decision Date |
| :--- | :--- | :--- | :--- | :--- |
| **ADR-0001** | Monorepo Build Tooling | `PROPOSED` | Turborepo (Recommended) vs Nx | 2026-11-04 |
| **ADR-0002** | Frontend Framework & Language | `APPROVED` | React (JavaScript / JSX) + Vite + Tailwind + Radix | 2026-11-04 |
| **ADR-0003** | Backend Architecture & Runtime | `APPROVED` | Node.js (LTS) + Express (Modular Monolith) | 2026-11-04 |
| **ADR-0004** | Primary Database & Data Layer | `APPROVED` | MongoDB with Schema Validation (Mongoose Recommended) | 2026-11-04 |
| **ADR-0005** | Frontend Server-State Management | `APPROVED` | TanStack Query (v5) + Browser HTTP Caching | 2026-11-04 |
| **ADR-0006** | Authentication & Session Management | `PROPOSED` | Better Auth vs Custom Dual-Token Engine | 2026-11-04 |
| **ADR-0007** | Schema Validation Engine | `APPROVED` | Zod (Shared across API, Web, and CLI) | 2026-11-04 |
| **ADR-0008** | Real-Time Telemetry Streaming | `PROPOSED` | Server-Sent Events (SSE) for Telemetry / Logs | 2026-11-04 |
| **ADR-0009** | Background Job & Queue Processing | `PROPOSED` | BullMQ (Redis) vs MongoDB-Backed Worker | 2026-11-04 |
| **ADR-0010** | CLI Runtime & Credential Storage | `APPROVED` | Node.js CLI (`omniops`) + OS Native Keyring | 2026-11-04 |

---

## 3. Individual Architectural Decision Records

### ADR-0001: Monorepo Build Tooling (Turborepo vs Nx)
- **Status**: `PROPOSED` (Recommendation: Turborepo)
- **Context**:
  OmniOPS requires a monorepo structure orchestrating two applications (`apps/web`, `apps/api`) and four shared packages (`packages/cli`, `packages/shared`, `packages/config`, `packages/validation`). We require fast dependency resolution, cached task execution, and lightweight configuration without heavy framework overhead.
- **Alternatives Considered**:
  1. *Nx*: Feature-rich, deep computation caching, but brings higher configuration complexity and steeper learning curve.
  2. *Turborepo*: Minimal configuration (`turbo.json`), native integration with npm/pnpm workspaces, fast Rust-based pipeline caching.
  3. *Lerna / Plain npm workspaces*: Lacks intelligent incremental task caching.
- **Recommendation & Decision**:
  Recommend **Turborepo** with npm/pnpm workspaces. Turborepo provides the simplest setup for plain JavaScript/JSX and Node.js without forcing proprietary generators.
- **Consequences**:
  - Positive: Rapid build and lint caching; clear pipeline definitions (`build`, `lint`, `test`).
  - Trade-off: Less deep AST-level dependency analysis than Nx.
- **Security & Performance**: Enables isolated scope builds in CI (`turbo run build --filter=apps/api...`).

---

### ADR-0002: Frontend Framework, Styling, and Language
- **Status**: `APPROVED`
- **Context**:
  The user interface must be fast, highly accessible, maintainable, and responsive. Architectural baseline explicitly dictates React with JavaScript (`.jsx`), avoiding TypeScript unless explicitly authorized by a future ADR.
- **Decision**:
  1. **Framework**: React (v18+) using modern functional components and hooks.
  2. **Language**: Modern ECMAScript (JavaScript / JSX) with strict ESLint enforcement.
  3. **Build Tool**: Vite for lightning-fast HMR and clean standard ESM bundling. (Next.js is explicitly rejected for the authenticated portal to prevent backend/frontend coupling).
  4. **Styling & Primitives**: Tailwind CSS for utility styling paired with Radix UI headless accessible primitives (`@radix-ui/react-*`) and Lucide React (`lucide-react`) for icons.
- **Consequences**:
  - Positive: Extreme UI rendering speed, zero bundle bloat from Next.js SSR servers, WCAG 2.1 AA accessibility out of the box via Radix.
  - Strict Boundary: Next.js-specific constructs (`next/image`, `next-themes`, `NEXT_PUBLIC_`) are prohibited. Client environment variables must use `VITE_` prefix.

---

### ADR-0003: Backend Architecture & Runtime
- **Status**: `APPROVED`
- **Context**:
  The platform needs a high-throughput, predictable control plane API that serves both Web and CLI clients with 100% authorization parity.
- **Decision**:
  Adopt a **Modular Monolith** architecture built on **Node.js (LTS)** and **Express**.
  - Internal domains (Auth, K8s, GitHub, Docker, Logs, Incidents) are partitioned as distinct internal modules with clean service boundaries.
  - Microservices are explicitly rejected for the MVP to prevent premature distributed network complexity, cross-service transactions, and operational cost overhead.
- **Consequences**:
  - Single deployment artifact simplify CI/CD, local Docker development, and operational debugging.
  - Requires disciplined internal module decoupling to allow future extraction if specific domains require independent scaling.

---

### ADR-0004: Primary Database & Data Layer
- **Status**: `APPROVED`
- **Context**:
  OmniOPS ingests heterogeneous, semi-structured infrastructure telemetry (Kubernetes pod specs, GitHub webhook payloads, CloudWatch metrics, audit trails). Relational table schemas with fixed migrations would impede agility.
- **Decision**:
  Adopt **MongoDB** as the canonical datastore.
  - Use **Mongoose** as the object modeling layer to provide strict schema validation, type casting, lifecycle hooks, and tenant-scoping middleware.
  - Relational SQL migrations and Prisma relational migrations are explicitly rejected. Schema versioning is managed via application-level evolution scripts.
- **Consequences**:
  - Document model matches JSON webhook payloads natively.
  - Complex multi-document joins require careful compound indexing and denormalization.

---

### ADR-0005: Frontend Server-State Management
- **Status**: `APPROVED`
- **Context**:
  DevOps dashboards display high-frequency, stale-prone infrastructure telemetry. Traditional global Redux stores create immense boilerplate and struggle with cache invalidation.
- **Decision**:
  Adopt **TanStack Query (v5)** for all asynchronous server-state fetching, caching, and synchronization.
  - Local UI state (sidebar toggles, modal open/close) is handled via React Context or lightweight Zustand.
  - Global Redux is prohibited.
- **Consequences**:
  - Declarative polling, background refetching on window focus, and out-of-the-box optimistic updates.

---

### ADR-0006: Authentication & Session Management
- **Status**: `PROPOSED` (Recommendation: Hybrid Dual-Auth)
- **Context**:
  OmniOPS must support two completely different client interaction patterns:
  1. Browser Web UI: Requires secure protection against XSS and CSRF.
  2. Terminal CLI / CI: Requires long-lived, revokable, bearer Personal Access Tokens (PAT).
- **Decision / Proposal**:
  - **Web Client**: Secure `HttpOnly`, `SameSite=Lax`, `Secure` session cookies backed by a database session store.
  - **CLI Client**: Cryptographically random Personal Access Tokens (`omni_pat_...`) hashed with SHA-256 before storage in MongoDB.
  - Auth Layer: Evaluate `Better Auth` for unified session/token management, or implement a clean custom Express auth module.
- **Consequences**:
  - Eliminates local-storage token vulnerabilities in the browser.
  - Enables granular token scoping (e.g., `read:k8s`, `write:incidents`) for CLI usage.

---

### ADR-0007: Schema Validation Engine
- **Status**: `APPROVED`
- **Context**:
  Input validation must occur at the API boundary, the CLI argument parsing boundary, and the frontend form boundary.
- **Decision**:
  Adopt **Zod** as the universal schema declaration and validation library across all monorepo packages (`packages/validation`).
- **Consequences**:
  - Shared schemas ensure runtime validation parity between CLI flags, Web forms, and Express request bodies.

---

### ADR-0008: Real-Time Telemetry Streaming
- **Status**: `PROPOSED` (Recommendation: Server-Sent Events)
- **Context**:
  Users need real-time updates for active incidents, deployment progress, and pod log streaming.
- **Alternatives**:
  1. *WebSockets*: Full duplex, but requires custom connection heartbeats, complicates HTTP load balancers, and has higher connection state overhead.
  2. *Server-Sent Events (SSE)*: Native HTTP/2 streaming, unidirectional server-to-client, automatic browser reconnection, works seamlessly through standard reverse proxies.
- **Recommendation**:
  Use **Server-Sent Events (SSE)** for log streaming and dashboard telemetry updates; client mutations remain standard REST POST/PUT requests.
- **Consequences**:
  - Simple, robust firewall and proxy traversal. Unidirectional architecture fits 95% of DevOps telemetry needs.

---

### ADR-0009: Background Job & Queue Processing
- **Status**: `PROPOSED`
- **Context**:
  Provider synchronization (polling GitHub, scraping cluster health, running synthetic health probes) cannot block the HTTP request thread.
- **Alternatives**:
  1. *BullMQ + Redis*: Industry standard for Node.js, low latency, robust retry logic, but introduces Redis as a mandatory operational dependency.
  2. *MongoDB-based Worker (e.g., Agenda)*: Leverages existing MongoDB database, zero new infrastructure dependencies, but higher database read/write load under extreme queue volume.
- **Recommendation**:
  For MVP, evaluate a lightweight MongoDB worker or BullMQ if Redis is already provisioned in the deployment target. Mark as pending final deployment architecture review.

---

### ADR-0010: CLI Runtime & Credential Storage
- **Status**: `APPROVED`
- **Context**:
  The CLI (`omniops`) must run seamlessly across macOS, Linux, and Windows terminal environments and securely handle credentials.
- **Decision**:
  - Implemented in Node.js with Commander.js.
  - Credentials **MUST** be stored in the OS native credential vault (using `keytar` / native platform keyring) or securely permissioned files (`~/.omniops/config.json` with `chmod 0600`) as fallback.
  - Plaintext credential exposure in shared environment variables or global files is prohibited.
- **Consequences**:
  - High developer trust, resistance to credential scraping malware.

---

## 4. ADR Submission Template & Policy

Any engineer proposing an architectural shift must copy this template and create a PR:

```markdown
### ADR-XXXX: [Title]
- **Status**: `PROPOSED` | `APPROVED` | `SUPERSEDED` | `REJECTED`
- **Context**: [Describe the problem, driving forces, and constraints]
- **Alternatives Considered**: [List options with pros and cons]
- **Decision**: [The chosen option and justification]
- **Consequences**: [Positive, negative, and neutral impacts]
- **Security & Performance Impact**: [Cryptographic, isolation, and latency considerations]
```

---

## 5. Related Documents & Traceability

- [Project Overview](../00-overview/PROJECT_OVERVIEW.md)
- [System Architecture](SYSTEM_ARCHITECTURE.md)
- [Monorepo Architecture](MONOREPO_ARCHITECTURE.md)
- [Database Design](../05-database/DATABASE_DESIGN.md)
- [Security Architecture](../06-security/SECURITY_ARCHITECTURE.md)
