# OmniOPS — API Endpoints Reference Specification

| Attribute | Details |
| :--- | :--- |
| **Document ID** | `DOC-03-BAK-03` |
| **Status** | `Draft / Proposed Contracts` |
| **Version** | `0.1.0` |
| **Document Owner** | Lead API Architect Placeholder |
| **Target Audience** | Backend Engineers, Frontend Engineers, CLI Developers, QA Leads |
| **Last Updated** | 2026-11-04 (UTC) |

---

## 1. Document Control & Executive Summary

### 1.1 Executive Summary
This document provides the definitive, comprehensive endpoint catalog for the OmniOPS REST API (`/api/v1/*`). Each endpoint specification details the HTTP method, route path, authentication mechanism, required RBAC permissions, request parameters, payload schemas, response status codes, audit event generation, and sanitized request/response examples.

All endpoints adhere strictly to the conventions established in [API Standards](API_STANDARDS.md).

---

## 2. API Endpoint Catalog by Domain

### 2.1 System Health & Observability

#### `EP-SYS-001`: Health & Readiness Check
- **Method & Path**: `GET /api/v1/health`
- **Purpose**: Liveness and readiness probe for load balancers and container orchestrators.
- **Authentication**: None (Public)
- **RBAC Scope**: Public
- **Response**: `200 OK`
```json
{
  "success": true,
  "data": {
    "status": "HEALTHY",
    "uptimeSeconds": 14205,
    "timestamp": "2026-11-04T12:00:00.000Z",
    "services": {
      "database": "CONNECTED",
      "cache": "CONNECTED"
    }
  }
}
```

---

### 2.2 Authentication & Identity Management

#### `EP-AUTH-002`: User Login
- **Method & Path**: `POST /api/v1/auth/login`
- **Purpose**: Authenticates user via email/password, sets secure session cookies.
- **Authentication**: None (Public)
- **Rate Limit**: 10 req/min per IP
- **Audit Event**: `user.login.success` or `user.login.failure`
- **Request Body**:
```json
{
  "email": "alex.devops@example.com",
  "password": "Password123!"
}
```
- **Response**: `200 OK` (Sets `omniops_session` cookie)

#### `EP-AUTH-003`: CLI Personal Access Token Creation
- **Method & Path**: `POST /api/v1/auth/tokens`
- **Purpose**: Issues a revokable Bearer Personal Access Token for the `omniops` CLI.
- **Authentication**: Session Cookie (Admin, Owner, or Operator)
- **Audit Event**: `auth.token.create`
- **Request Body**:
```json
{
  "name": "Dev-MacBook-CLI",
  "scopes": ["read:k8s", "read:logs", "write:incidents"],
  "expiresInDays": 30
}
```
- **Response**: `201 Created`
```json
{
  "success": true,
  "data": {
    "id": "64f1a2b3c4d5e6f7a8b9c0f4",
    "name": "Dev-MacBook-CLI",
    "token": "omni_pat_9a8b7c6d5e4f3a2b1c0d",
    "expiresAt": "2026-12-04T12:00:00.000Z"
  }
}
```

---

### 2.3 Command Center Dashboard

#### `EP-DASH-004`: Get Global Summary Metrics
- **Method & Path**: `GET /api/v1/dashboard/summary`
- **Purpose**: Returns high-level operational health score, active incident count, and cluster summaries.
- **Authentication**: Session Cookie or Bearer PAT
- **RBAC Permission**: `dashboard:read` (`Viewer` or higher)
- **Response**: `200 OK`
```json
{
  "success": true,
  "data": {
    "healthScore": 98.4,
    "activeIncidents": 2,
    "healthyClusters": 4,
    "totalPodsRunning": 312,
    "failedPipelinesPast24h": 1
  }
}
```

---

### 2.4 Kubernetes Management

#### `EP-K8S-005`: List Pods in Namespace
- **Method & Path**: `GET /api/v1/k8s/clusters/:clusterId/namespaces/:namespace/pods`
- **Purpose**: Retrieves pod status, restart counts, and container specs for a namespace.
- **Authentication**: Session Cookie or Bearer PAT
- **RBAC Permission**: `k8s:pod:read` (`Viewer` or higher)
- **Query Parameters**:
  - `status` (Optional): Filter by `Running`, `CrashLoopBackOff`, `Pending`.
  - `page`, `limit` (Optional): Pagination parameters.
- **Response**: `200 OK`
```json
{
  "success": true,
  "data": [
    {
      "podName": "api-gateway-7b9c-xyz",
      "namespace": "production",
      "status": "Running",
      "restarts": 0,
      "cpuUtilization": "120m",
      "memoryUsageMb": 245,
      "startTime": "2026-11-04T08:00:00.000Z"
    }
  ],
  "pagination": { "page": 1, "limit": 20, "totalCount": 1 }
}
```

#### `EP-K8S-006`: Stream Pod Logs
- **Method & Path**: `GET /api/v1/k8s/clusters/:clusterId/pods/:podName/logs/stream`
- **Purpose**: Server-Sent Events stream for live pod container stdout/stderr.
- **Authentication**: Session Cookie or Bearer PAT
- **RBAC Permission**: `logs:read` (`Viewer` or higher)
- **Query Parameters**:
  - `container` (Optional): Specific container name in multi-container pods.
  - `tailLines` (Default: 100): Initial backlog lines to fetch.
- **Response**: `200 OK` with `Content-Type: text/event-stream`
```http
event: log
data: {"timestamp":"2026-11-04T12:00:01.000Z","level":"INFO","text":"Worker listening on port 4000"}

event: log
data: {"timestamp":"2026-11-04T12:00:02.000Z","level":"INFO","text":"Processed telemetry batch 14"}
```

---

### 2.5 Incident Management

#### `EP-INC-007`: List Active Incidents
- **Method & Path**: `GET /api/v1/incidents`
- **Purpose**: Lists open and acknowledged incidents with severity filters.
- **Authentication**: Session Cookie or Bearer PAT
- **RBAC Permission**: `incident:read` (`Viewer` or higher)
- **Query Parameters**: `status` (Enum: `OPEN`, `ACKNOWLEDGED`, `RESOLVED`), `severity`.
- **Response**: `200 OK`

#### `EP-INC-008`: Acknowledge Incident
- **Method & Path**: `POST /api/v1/incidents/:id/ack`
- **Purpose**: Assigns the incident to the requesting user and updates status to `ACKNOWLEDGED`.
- **Authentication**: Session Cookie or Bearer PAT
- **RBAC Permission**: `incident:acknowledge` (`Operator`, `Admin`, `Owner`)
- **Headers**: `Idempotency-Key` (UUIDv4)
- **Audit Event**: `incident.acknowledge`
- **Response**: `200 OK`
```json
{
  "success": true,
  "data": {
    "id": "64f1a2b3c4d5e6f7a8b9c0e7",
    "incidentNumber": 42,
    "status": "ACKNOWLEDGED",
    "acknowledgedBy": "Alex Mercer",
    "acknowledgedAt": "2026-11-04T12:15:00.000Z"
  }
}
```

---

### 2.6 Immutable Audit Logs

#### `EP-AUD-009`: Query Organization Audit Trail
- **Method & Path**: `GET /api/v1/audit/logs`
- **Purpose**: Historical audit log inspection for compliance and incident investigations.
- **Authentication**: Session Cookie or Bearer PAT
- **RBAC Permission**: `audit:read` (`Admin`, `Owner`)
- **Query Parameters**: `actorId`, `action`, `startDate`, `endDate`, `page`, `limit`.
- **Response**: `200 OK` (Paginated list of immutable audit documents).

---

## 3. Related Documents & Traceability

- [API Standards](API_STANDARDS.md)
- [Backend Specification](BACKEND_SPECIFICATION.md)
- [Authentication & Authorization](AUTHENTICATION_AND_AUTHORIZATION.md)
- [CLI Command Reference](../04-cli/CLI_COMMAND_REFERENCE.md)
