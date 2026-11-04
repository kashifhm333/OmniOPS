# OmniOPS — End-to-End Data Flow Specification

| Attribute | Details |
| :--- | :--- |
| **Document ID** | `DOC-01-ARC-04` |
| **Status** | `Draft` (Pending Review) |
| **Version** | `0.1.0` |
| **Document Owner** | Principal Data Architect Placeholder |
| **Target Audience** | Backend Engineers, Security Engineers, Frontend/CLI Developers, Auditors |
| **Last Updated** | 2026-11-04 (UTC) |

---

## 1. Document Control & Executive Summary

### 1.1 Executive Summary
This document specifies the lifecycle, transit paths, transformation pipelines, and isolation mechanisms for all data flowing through OmniOPS. It details both client-to-control-plane communication (Web and CLI) and control-plane-to-external-provider interactions (GitHub, Kubernetes, Cloud Providers, Registries).

The core tenet of OmniOPS data engineering is **Zero Secret Egress**: sensitive credentials and private keys are decrypted exclusively in server worker memory and never emitted to client responses, log streams, or error payloads.

---

## 2. Data Classification Matrix

| Data Classification Tier | Examples | Storage Standard | Egress Restrictions |
| :--- | :--- | :--- | :--- |
| **Tier 1: Secrets & Credentials** | GitHub App Private Keys, AWS Secret Access Keys, Kubeconfig tokens, User password hashes | AES-256-GCM Envelope Encrypted; Argon2id for passwords | **Zero Egress**: Never sent to Web or CLI clients. |
| **Tier 2: Tenant Configuration & PII** | User emails, workspace names, team membership, integration endpoints | MongoDB with tenant scoping & TLS in transit | Sent only to authenticated members of that organization. |
| **Tier 3: Infrastructure Telemetry** | Pod names, replica counts, container statuses, CI/CD run durations | Staged in MongoDB collections with TTL indexing | Accessible via RBAC (Viewer and above). |
| **Tier 4: Logs & Events** | Application stdout/stderr logs, cluster event messages | Redaction engine masks PII & API keys before storage | Masked by default; unmasking requires Owner role & audit log. |
| **Tier 5: Audit Records** | Actor ID, mutation action, timestamp, target resource ID, IP | Append-only immutable MongoDB collection | Read-only; cannot be updated or deleted by any user. |

---

## 3. Core Lifecycle Data Flows

### 3.1 Flow 1: Web Client Authentication & Workspace Context Binding

```mermaid
sequenceDiagram
    autonumber
    actor User as User (Browser)
    participant UI as React Web App
    participant API as Express API Control Plane
    participant DB as MongoDB

    User->>UI: Inputs email & password
    UI->>API: POST /api/v1/auth/login { email, password }
    API->>DB: Query user by email
    DB-->>API: User record + password hash
    API->>API: Verify password (Argon2id)
    API->>DB: Create session record { userId, activeOrgId, expiresAt }
    API-->>UI: Set-Cookie: omniops_session (HttpOnly, Secure, SameSite=Lax)<br/>Payload: { user: { id, email, name }, activeOrg: { id, name, role } }
    UI->>UI: Initialize TanStack Query cache with user profile
    UI-->>User: Render Command Center Dashboard
```

---

### 3.2 Flow 2: CLI Authentication & API Invocation

```mermaid
sequenceDiagram
    autonumber
    actor Dev as Developer (Terminal)
    participant CLI as omniops CLI
    participant Vault as OS Credential Keyring
    participant API as Express API
    participant DB as MongoDB

    Dev->>CLI: omniops auth login
    CLI->>API: POST /api/v1/auth/cli/initiate
    API-->>CLI: Return verification URL + Device Code
    CLI-->>Dev: "Open https://app.omniops.io/device?code=ABCD-1234"
    Dev->>API: Authorizes device in browser
    API->>DB: Generate PAT (omni_pat_xyz) & store SHA-256 hash
    CLI->>API: Polls POST /api/v1/auth/cli/poll
    API-->>CLI: Returns PAT token
    CLI->>Vault: Store PAT securely in OS Keyring
    CLI-->>Dev: "Login successful!"

    Dev->>CLI: omniops k8s pods -n production
    CLI->>Vault: Retrieve PAT
    CLI->>API: GET /api/v1/k8s/namespaces/production/pods<br/>Authorization: Bearer omni_pat_xyz
    API->>DB: Lookup PAT hash & verify tenant scope
    API->>DB: Query current pod snapshot
    DB-->>API: Pod list
    API-->>CLI: HTTP 200 OK (JSON Array)
    CLI-->>Dev: Formatted terminal table
```

---

### 3.3 Flow 3: External Webhook Ingestion & Deduplication Pipeline

```mermaid
sequenceDiagram
    autonumber
    participant Ext as GitHub / External Provider
    participant Ingress as API Webhook Receiver
    participant Worker as Background Ingest Worker
    participant DB as MongoDB

    Ext->>Ingress: POST /api/v1/webhooks/github (HMAC Signature Header)
    Ingress->>Ingress: Verify HMAC-SHA256 signature against stored webhook secret
    alt Signature Invalid
        Ingress-->>Ext: HTTP 401 Unauthorized (Drop request)
    else Signature Valid
        Ingress->>DB: Check webhook event idempotency key (Delivery ID)
        alt Duplicate Event
            Ingress-->>Ext: HTTP 200 OK (Ignored duplicate)
        else Fresh Event
            Ingress->>DB: Record event as 'PENDING'
            Ingress-->>Ext: HTTP 202 Accepted
            Ingress->>Worker: Dispatch event to processing worker
            Worker->>Worker: Parse deployment status / workflow run
            Worker->>DB: Update Deployment entity & mark webhook 'PROCESSED'
            Worker->>DB: Create Audit / Activity event
        end
    end
```

---

### 3.4 Flow 4: Real-Time Pod Log Streaming & Redaction Pipeline

```mermaid
sequenceDiagram
    autonumber
    actor User as User / SRE
    participant Web as React Web App
    participant API as Express API Control Plane
    participant Cluster as Kubernetes Cluster API
    participant Redact as Redaction Engine

    User->>Web: Opens Pod Log Viewer
    Web->>API: GET /api/v1/k8s/pods/:id/logs/stream (Accept: text/event-stream)
    API->>API: Verify session & RBAC role (Viewer or above)
    API->>Cluster: Open streaming request to Pod log endpoint
    loop Log Chunk Streaming
        Cluster-->>API: Raw log line
        API->>Redact: Scan for secrets (tokens, JWTs, private keys)
        Redact-->>API: Sanitized log line
        API-->>Web: event: log\ndata: {"timestamp":"...","text":"..."}\n\n
        Web-->>User: Append line to virtualized terminal viewer
    end
```

---

## 4. Tenant Context Propagation & Database Query Scoping

Every protected API request goes through tenant isolation middleware before reaching business logic:
1. **Identification**: The tenant context (`organizationId` and active `workspaceId`) is extracted from the session cookie or the PAT token.
2. **Context Binding**: The Express request object is decorated: `req.tenant = { orgId, workspaceId, role }`.
3. **Database Scoping**:
   - All Mongoose schema queries automatically attach `{ organizationId: req.tenant.orgId }`.
   - Direct database queries that omit `organizationId` throw an unhandled assertion error in development and return HTTP 500 in production, preventing accidental cross-tenant data leaks.

---

## 5. Audit Event Ingestion & Immutability Guarantee

```mermaid
flowchart LR
    REQ["State Mutating Request\n(POST / PUT / DELETE)"] --> CONTROLLER["Module Controller"]
    CONTROLLER --> SERVICE["Business Logic Execution"]
    SERVICE --> DB_MUTATE["MongoDB State Mutation"]
    SERVICE --> AUDIT_SVC["Audit Logging Service"]
    AUDIT_SVC --> AUDIT_DOC["Append to 'audit_events' Collection\n- Actor ID & Type\n- Action Name\n- Resource ID\n- Client IP & User Agent\n- Timestamp (UTC)"]
    AUDIT_DOC -.->|Immutable| LOCK["Database Role: Write-Once / No Update / No Delete"]
```

---

## 6. Failure Modes, Retries & Idempotency

1. **Provider Rate Limiting**: If an external API returns HTTP 429, the worker pauses the synchronization queue for that specific provider using the `Retry-After` header value, preventing IP bans.
2. **Idempotency Keys**: All mutation endpoints (e.g., incident acknowledgment, rollback triggers) accept an `Idempotency-Key` header. Duplicate submissions within 60 seconds return the cached response without re-executing.
3. **Worker Crashing**: Background workers utilize atomic locking (`status: "PROCESSING"`, `lockedAt: Date`) with a 5-minute timeout. If a worker dies mid-task, another worker node reclaims the task.

---

## 7. Related Documents & Traceability

- [System Architecture](SYSTEM_ARCHITECTURE.md)
- [Monorepo Architecture](MONOREPO_ARCHITECTURE.md)
- [Folder Structure](FOLDER_STRUCTURE.md)
- [Database Design](../05-database/DATABASE_DESIGN.md)
- [API Endpoints Reference](../03-backend/API_ENDPOINTS.md)
- [Security Architecture](../06-security/SECURITY_ARCHITECTURE.md)
