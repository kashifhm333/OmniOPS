# OmniOPS — Requirement Traceability Matrix (RTM)

| Attribute | Details |
| :--- | :--- |
| **Document ID** | `RTM-IMP-001` |
| **Status** | `Living Document` |
| **Version** | `1.0.0` |
| **Author** | QA Automation Lead & Systems Architect |
| **Last Updated** | 2026-11-04 (UTC) |

---

## 1. Traceability Matrix Overview

This matrix maps every functional requirement (`FR-xxx`), non-functional requirement (`NFR-xxx`), and architectural standard established in the OmniOPS documentation to its corresponding code implementation location, API/database dependencies, security controls, and verification test suites.

---

## 2. Master Traceability Register

| Req ID | Document Source | Expected Behavior | Implementation Location | API & DB Dependencies | Security Controls | Test Verification | Status |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **`FR-AUTH-001`** | `PRODUCT_REQUIREMENTS.md` | User registration, login, logout, password hashing | `apps/api/src/modules/auth/`, `apps/web/src/features/auth/` | `POST /api/v1/auth/login`, MongoDB `users`, `sessions` | Argon2id/bcrypt hashing, `HttpOnly` cookie, CSRF token | Supertest auth suite, Vitest hook tests | `IN_PROGRESS` |
| **`FR-TENANT-002`** | `PRODUCT_REQUIREMENTS.md` | Multi-tenant organization & workspace partitioning | `apps/api/src/middleware/tenant-middleware.js`, `apps/web/src/components/common/Header.jsx` | `organizations`, `workspaces`, Mongoose plugin | Mandatory `organizationId` query filter injection | Tenant isolation negative security test | `IN_PROGRESS` |
| **`FR-RBAC-003`** | `AUTHENTICATION_AND_AUTHORIZATION.md` | Role enforcement (`Owner`, `Admin`, `Operator`, `Viewer`) | `apps/api/src/middleware/rbac-middleware.js` | `memberships` collection, Express middleware | Server-side role check; 403 Forbidden on violation | RBAC permission matrix unit & route tests | `IN_PROGRESS` |
| **`FR-CMD-004`** | `SCOPE_AND_FEATURES.md` | Unified command center health score, incident feed, cluster counts | `apps/web/src/features/dashboard/`, `apps/api/src/modules/dashboard/` | `GET /api/v1/dashboard/summary`, `GET /api/v1/dashboard/feed` | Read-only aggregation, tenant scoped | Dashboard component test, Supertest route | `IN_PROGRESS` |
| **`FR-K8S-005`** | `SCOPE_AND_FEATURES.md` | Kubernetes cluster overview, pod telemetry, streaming logs | `apps/web/src/features/k8s/`, `apps/api/src/modules/k8s/` | `GET /api/v1/k8s/clusters`, `GET /api/v1/k8s/pods`, SSE logs | Read-only ServiceAccount, secret redaction | K8s service tests, SSE integration test | `IN_PROGRESS` |
| **`FR-LOG-006`** | `SCOPE_AND_FEATURES.md` | Centralized structured log query, severity filters, masking | `apps/web/src/features/logs/`, `apps/api/src/modules/logs/` | `GET /api/v1/logs/query`, `GET /api/v1/logs/stream` | Regex PII / secret redaction pipeline | Log sanitizer unit tests | `IN_PROGRESS` |
| **`FR-INC-007`** | `SCOPE_AND_FEATURES.md` | Incident triage, severity assignment, acknowledgment | `apps/web/src/features/incidents/`, `apps/api/src/modules/incidents/` | `GET/POST /api/v1/incidents`, `POST /api/v1/incidents/:id/ack` | Operator role required for ack, audit log created | Incident workflow integration test | `IN_PROGRESS` |
| **`FR-CLI-008`** | `CLI_PRODUCT_SPECIFICATION.md` | Standalone CLI client (`omniops`) with API parity | `packages/cli/bin/omniops.js`, `packages/cli/src/` | Express REST API (`/api/v1/*`), Bearer PAT | OS Keyring storage, zero plaintext disk storage | CLI execution test suite against mock API | `IN_PROGRESS` |
| **`FR-AUD-009`** | `SECURITY_ARCHITECTURE.md` | Immutable write-once audit log recording | `apps/api/src/modules/audit/`, `apps/web/src/features/settings/` | `GET /api/v1/audit/logs`, MongoDB `audit_events` | Database permissions prevent update/delete | Audit interceptor middleware tests | `IN_PROGRESS` |
| **`FR-UI-010`** | `UI_UX_DESIGN_SYSTEM.md` | Dual theme (Dark / Light) cyber-industrial HUD | `apps/web/src/styles/`, `apps/web/src/components/` | Tailwind CSS, Radix UI primitives, Lucide icons | WCAG 2.1 AA color contrast compliance | Chrome MCP visual & interaction test | `IN_PROGRESS` |
| **`FR-DOCKER-011`**| `SCOPE_AND_FEATURES.md` | Container registry catalog & container runtime status | `apps/web/src/features/docker/`, `apps/api/src/modules/docker/` | `GET /api/v1/docker/containers` | No raw Docker socket exposed to client | Docker module route tests | `IN_PROGRESS` |
| **`FR-CICD-012`** | `SCOPE_AND_FEATURES.md` | CI/CD pipeline runs, step durations, build logs | `apps/web/src/features/cicd/`, `apps/api/src/modules/cicd/` | `GET /api/v1/cicd/runs` | Read-only webhook/API scopes | Pipeline telemetry unit & integration tests | `IN_PROGRESS` |
| **`FR-MON-013`** | `SCOPE_AND_FEATURES.md` | Host & cluster telemetry (CPU, Memory, Disk, Net) | `apps/web/src/features/monitoring/`, `apps/api/src/modules/metrics/` | `GET /api/v1/metrics/timeseries` | Scaled time-series indexing | Timeseries aggregator tests | `IN_PROGRESS` |
| **`FR-CLOUD-014`**| `SCOPE_AND_FEATURES.md` | Multi-cloud inventory & cost burn rate | `apps/web/src/features/cloud/`, `apps/api/src/modules/cloud/` | `GET /api/v1/cloud/resources` | Read-only AWS IAM AssumeRole | Cloud adapter tests | `IN_PROGRESS` |
| **`FR-IAC-015`** | `SCOPE_AND_FEATURES.md` | Terraform state metadata & drift detection | `apps/web/src/features/terraform/`, `apps/api/src/modules/iac/` | `GET /api/v1/iac/workspaces` | Encrypted state metadata handling | IaC module tests | `IN_PROGRESS` |
| **`FR-AI-016`** | `SCOPE_AND_FEATURES.md` | Context-aware intelligent DevOps assistant | `apps/web/src/features/assistant/`, `apps/api/src/modules/assistant/`| `POST /api/v1/assistant/query` | Strict human confirmation; sanitized queries | AI prompt guardrail tests | `IN_PROGRESS` |
| **`NFR-SEC-001`** | `SECURITY_ARCHITECTURE.md` | AES-256-GCM Envelope Encryption for credentials | `apps/api/src/utils/encryption.js` | Cloud KMS / local master key | Zero plaintext credential storage at rest | Cryptographic encryption/decryption tests | `IN_PROGRESS` |
| **`NFR-PERF-001`**| `PRODUCT_REQUIREMENTS.md` | P95 latency < 250ms for aggregated read queries | `apps/api/src/`, `apps/web/src/lib/query-client.js`| MongoDB compound indexing, TanStack Query cache | Rate limiting & caching headers | k6 benchmark load suite | `IN_PROGRESS` |
| **`NFR-A11Y-001`**| `UI_UX_DESIGN_SYSTEM.md` | WCAG 2.1 AA accessibility & keyboard navigation | `apps/web/src/components/ui/` | Radix UI primitives, high-contrast focus rings | Screen-reader aria attributes, reduced motion | Chrome MCP accessibility audit | `IN_PROGRESS` |

---

## 3. Status Definitions
- `NOT_STARTED`: Scaffolding pending.
- `IN_PROGRESS`: Currently under active implementation and local verification.
- `VERIFIED`: Implemented, automated tests passed, and validated via real browser or CLI.

