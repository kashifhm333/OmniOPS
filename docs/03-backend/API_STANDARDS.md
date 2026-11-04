# OmniOPS — API Standards & Design Guidelines

| Attribute | Details |
| :--- | :--- |
| **Document ID** | `DOC-03-BAK-02` |
| **Status** | `Approved / Living Document` |
| **Version** | `1.0.0` |
| **Document Owner** | Lead API Architect Placeholder |
| **Target Audience** | Backend Engineers, Frontend Engineers, CLI Maintainers, QA Engineers |
| **Last Updated** | 2026-11-04 (UTC) |

---

## 1. Document Control & Executive Summary

### 1.1 Executive Summary
This document establishes the mandatory architectural conventions, HTTP interfaces, error serialization schemas, request tracing, and pagination standards for the OmniOPS REST API. The API serves as the single source of truth for both the React Web UI and the `omniops` CLI.

Adherence to these standards is strictly validated in CI/CD via OpenAPI 3.1 contract testing and linting.

---

## 2. Core REST Design Principles

1. **Uniform Resource URIs**: Resources use lowercase, plural nouns (e.g., `/api/v1/incidents`, `/api/v1/k8s/clusters`). Verbs in URIs are strictly forbidden except for state transition actions (e.g., `POST /api/v1/incidents/:id/ack`).
2. **Explicit Versioning**: All routes are prefixed with `/api/v1/`. Breaking changes mandate an increment to `/api/v2/`.
3. **UTC Timestamps**: All timestamps sent to or received from the API **MUST** use the ISO-8601 format with explicit `Z` UTC zone indicator (`YYYY-MM-DDTHH:mm:ss.sssZ`).
4. **Header Conventions**:
   - `Content-Type`: `application/json` (except SSE streams: `text/event-stream`).
   - `X-Request-ID`: UUIDv4 attached to every inbound request and reflected in every response for distributed tracing.
   - `Idempotency-Key`: Mandatory for state-mutating requests (`POST`, `PUT`).

---

## 3. Standard Response Envelopes

### 3.1 Single Entity Response Envelope

```json
{
  "success": true,
  "data": {
    "id": "64f1a2b3c4d5e6f7a8b9c0e2",
    "name": "Production Cluster",
    "status": "HEALTHY",
    "createdAt": "2026-11-04T12:00:00.000Z"
  },
  "meta": {
    "requestId": "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
    "timestamp": "2026-11-04T12:00:01.123Z"
  }
}
```

### 3.2 Paginated List Response Envelope

Pagination uses the standard cursor or page/limit pattern:

```json
{
  "success": true,
  "data": [
    { "id": "inc-101", "title": "High memory on pod api-77", "severity": "SEV-2" }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "totalCount": 142,
    "totalPages": 8,
    "hasNextPage": true,
    "hasPrevPage": false
  },
  "meta": {
    "requestId": "a2c3d4e5-f6a7-4b8c-9d0e-1f2a3b4c5d6e",
    "timestamp": "2026-11-04T12:01:00.000Z"
  }
}
```

---

## 4. Standard Error Schema & Error Codes

Error responses **MUST NEVER** emit raw stack traces, SQL/Mongo internal syntax errors, or server file paths in production.

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_FAILED",
    "message": "The request body failed schema validation.",
    "details": [
      {
        "field": "severity",
        "issue": "Invalid enum value. Expected 'SEV-1' | 'SEV-2' | 'SEV-3' | 'SEV-4', received 'CRITICAL'"
      }
    ]
  },
  "meta": {
    "requestId": "e7b8c9d0-1f2a-4b3c-9d4e-5f6a7b8c9d0e",
    "timestamp": "2026-11-04T12:02:00.000Z"
  }
}
```

### 4.1 Canonical HTTP Status Code Mapping

| Status Code | Code Identifier | Description / When to Use |
| :--- | :--- | :--- |
| **200 OK** | `OK` | Successful GET, PUT, or PATCH operation. |
| **201 Created** | `CREATED` | Resource successfully created via POST. |
| **202 Accepted** | `ACCEPTED` | Asynchronous task enqueued (e.g., webhook ingestion). |
| **204 No Content** | `NO_CONTENT` | Successful DELETE operation with empty body. |
| **400 Bad Request** | `BAD_REQUEST` | Malformed JSON or generic client error. |
| **401 Unauthorized** | `UNAUTHORIZED` | Missing or expired session cookie / Bearer token. |
| **403 Forbidden** | `FORBIDDEN` | Valid token, but RBAC role lacks required permission. |
| **404 Not Found** | `NOT_FOUND` | Target resource does not exist in active workspace. |
| **409 Conflict** | `CONFLICT` | Unique key violation (e.g., organization slug already taken). |
| **422 Unprocessable** | `VALIDATION_FAILED`| Body fails Zod validation schema. |
| **429 Too Many Requests**| `RATE_LIMITED` | Exceeded rate limit bucket. |
| **500 Internal Error** | `INTERNAL_SERVER_ERROR`| Unhandled server exception (logged with stack trace internally). |
| **503 Service Unavailable**|`EXTERNAL_OUTAGE` | Third-party provider (GitHub/AWS) circuit breaker open. |

---

## 5. Rate Limiting & Protection Headers

The API enforces tenant-aware rate limits using the standard IETF draft headers:
- `RateLimit-Limit`: Maximum requests permitted per window (e.g., `1000`).
- `RateLimit-Remaining`: Requests remaining in current window.
- `RateLimit-Reset`: Seconds remaining until bucket reset.
- `Retry-After`: Returned on HTTP 429 indicating seconds to wait.

Rate limits are stratified:
- **Public Endpoints (`/api/v1/auth/login`)**: 10 requests per minute per IP.
- **Authenticated Queries (`/api/v1/dashboard/*`)**: 300 requests per minute per user.
- **Telemetry Streaming (`/api/v1/logs/stream`)**: 5 concurrent SSE connections per user.

---

## 6. Deprecation & Breaking Change Policy

When an API route or field is marked for deprecation:
1. Include `Sunset` header specifying the UTC retirement date (minimum 6 months notice).
2. Include `Deprecation: true` header on all responses.
3. Emit deprecation warning log lines to client terminal when called via `omniops` CLI.

---

## 7. Related Documents & Traceability

- [API Endpoints Reference](API_ENDPOINTS.md)
- [Backend Specification](BACKEND_SPECIFICATION.md)
- [Authentication & Authorization](AUTHENTICATION_AND_AUTHORIZATION.md)
- [Zod Schemas Specification](../../packages/validation/src/index.js)
