# OmniOPS — Data Models & Schemas Specification

| Attribute | Details |
| :--- | :--- |
| **Document ID** | `DOC-05-DAT-02` |
| **Status** | `Draft` (Pending Review) |
| **Version** | `0.1.0` |
| **Document Owner** | Principal Data Architect / Backend Lead Placeholder |
| **Target Audience** | Backend Engineers, API Designers, Database Administrators |
| **Last Updated** | 2026-11-04 (UTC) |

---

## 1. Document Control & Executive Summary

### 1.1 Executive Summary
This document provides the definitive field-level specifications, validation constraints, data classifications, and sanitized JSON schema representations for all persistent MongoDB collections in OmniOPS. 

All schemas are enforced at the application tier via Mongoose and Zod validation, with zero raw plaintext secret storage.

---

## 2. Collection Inventory & Schema Specifications

### 2.1 Collection: `users`
- **Purpose**: Stores global user identities and baseline profile credentials.
- **Tenant Key**: Global entity (users can belong to multiple organizations via `memberships`).
- **Data Classification**: `Confidential (PII)`
- **Retention**: Indefinite until formal account deletion request.

| Field Name | Type | Required | Default | Validation / Constraints | Description |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `_id` | `ObjectId` | Yes | Auto | Unique MongoDB ObjectId | Primary Key |
| `email` | `String` | Yes | None | Lowercase, valid RFC 5322 email regex, unique | Primary login identifier |
| `passwordHash` | `String` | Yes | None | Min length 60, Argon2id hash format | Salted and hashed password |
| `fullName` | `String` | Yes | None | Trimmed, 1-100 characters | User display name |
| `isEmailVerified` | `Boolean` | Yes | `false` | Boolean flag | Account verification status |
| `createdAt` | `Date` | Yes | `Date.now` | ISO-8601 UTC timestamp | Creation time |
| `updatedAt` | `Date` | Yes | `Date.now` | ISO-8601 UTC timestamp | Last modification time |

```json
// Sanitized Document Example: users
{
  "_id": "64f1a2b3c4d5e6f7a8b9c0d1",
  "email": "alex.devops@example.com",
  "passwordHash": "$argon2id$v=19$m=65536,t=3,p=4$c29tZXNhbHQ$dGVzdGhhc2g",
  "fullName": "Alex Mercer",
  "isEmailVerified": true,
  "createdAt": "2026-11-04T12:00:00.000Z",
  "updatedAt": "2026-11-04T12:00:00.000Z"
}
```

---

### 2.2 Collection: `organizations`
- **Purpose**: Top-level multi-tenant boundary.
- **Tenant Key**: `_id` (Self)
- **Data Classification**: `Confidential`
- **Retention**: Indefinite until organization deletion.

| Field Name | Type | Required | Default | Validation / Constraints | Description |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `_id` | `ObjectId` | Yes | Auto | Unique MongoDB ObjectId | Primary Key |
| `name` | `String` | Yes | None | Trimmed, 2-60 characters | Organization legal or company name |
| `slug` | `String` | Yes | None | Regex `^[a-z0-9-]+$`, unique | URL-friendly unique identifier |
| `plan` | `String` | Yes | `"starter"` | Enum: `["starter", "team", "enterprise"]` | Current subscription tier |
| `createdAt` | `Date` | Yes | `Date.now` | UTC timestamp | Creation date |

```json
// Sanitized Document Example: organizations
{
  "_id": "64f1a2b3c4d5e6f7a8b9c0e2",
  "name": "Acme Cloud Corp",
  "slug": "acme-cloud",
  "plan": "team",
  "createdAt": "2026-11-04T12:05:00.000Z"
}
```

---

### 2.3 Collection: `memberships`
- **Purpose**: Maps user identities to organizations with designated RBAC roles.
- **Tenant Key**: `organizationId`
- **Data Classification**: `Confidential`

| Field Name | Type | Required | Default | Validation / Constraints | Description |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `_id` | `ObjectId` | Yes | Auto | Unique MongoDB ObjectId | Primary Key |
| `organizationId` | `ObjectId` | Yes | None | References `organizations._id`, Indexed | Tenant partition key |
| `userId` | `ObjectId` | Yes | None | References `users._id`, Indexed | Member user reference |
| `role` | `String` | Yes | `"Viewer"` | Enum: `["Owner", "Admin", "Operator", "Viewer"]` | Assigned RBAC role |
| `joinedAt` | `Date` | Yes | `Date.now` | UTC timestamp | Membership acceptance date |

*Compound Index*: `{ organizationId: 1, userId: 1 }` (Unique).

---

### 2.4 Collection: `personal_access_tokens` (CLI & CI Auth)
- **Purpose**: Scoped authentication tokens utilized by the `omniops` CLI and automated scripts.
- **Tenant Key**: `organizationId`
- **Data Classification**: `Restricted (Security Credential Hash)`

| Field Name | Type | Required | Default | Constraints | Description |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `_id` | `ObjectId` | Yes | Auto | Unique ObjectId | Primary Key |
| `organizationId` | `ObjectId` | Yes | None | References `organizations._id` | Bound organization |
| `userId` | `ObjectId` | Yes | None | References `users._id` | Token owner |
| `name` | `String` | Yes | None | 1-50 characters | User-provided token label |
| `tokenHash` | `String` | Yes | None | SHA-256 hash of plaintext token, Unique | Never plaintext |
| `tokenPrefix` | `String` | Yes | None | Format `omni_pat_[8 chars]` | Safe display identifier |
| `scopes` | `[String]` | Yes | `["read:*"]` | Enum list of allowed capabilities | Scoped permissions |
| `lastUsedAt` | `Date` | No | `null` | UTC timestamp | Activity tracker |
| `expiresAt` | `Date` | Yes | None | UTC timestamp, TTL Indexed | Auto-expiry |

```json
// Sanitized Document Example: personal_access_tokens
{
  "_id": "64f1a2b3c4d5e6f7a8b9c0f4",
  "organizationId": "64f1a2b3c4d5e6f7a8b9c0e2",
  "userId": "64f1a2b3c4d5e6f7a8b9c0d1",
  "name": "Alex-MacBook-CLI",
  "tokenHash": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
  "tokenPrefix": "omni_pat_a1b2c3d4",
  "scopes": ["read:k8s", "read:logs", "write:incidents"],
  "lastUsedAt": "2026-11-04T12:30:00.000Z",
  "expiresAt": "2026-12-04T12:00:00.000Z"
}
```

---

### 2.5 Collection: `integrations` (External Providers)
- **Purpose**: Stores configurations and encrypted credential references for GitHub, AWS, Kubernetes, etc.
- **Tenant Key**: `organizationId`
- **Data Classification**: `Restricted (Encrypted Secrets)`

| Field Name | Type | Required | Default | Validation / Constraints | Description |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `_id` | `ObjectId` | Yes | Auto | Unique ObjectId | Primary Key |
| `organizationId` | `ObjectId` | Yes | None | References `organizations._id` | Tenant Key |
| `provider` | `String` | Yes | None | Enum: `["GITHUB", "KUBERNETES", "AWS", "DOCKER"]` | Integration type |
| `status` | `String` | Yes | `"PENDING"` | Enum: `["ACTIVE", "ERROR", "DISCONNECTED", "PENDING"]` | Health status |
| `encryptedCredentials`| `Object`| Yes | None | Schema: `{ iv: String, ciphertext: String, tag: String, keyVersion: Number }` | AES-256-GCM Envelope |
| `metadata` | `Object` | No | `{}` | Key-value store (e.g., cluster name, region) | Public configuration |

---

### 2.6 Collection: `incidents`
- **Purpose**: Tracks operational triage rooms, severity, and resolution statuses.
- **Tenant Key**: `organizationId`
- **Data Classification**: `Internal Operational`

| Field Name | Type | Required | Default | Validation / Constraints | Description |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `_id` | `ObjectId` | Yes | Auto | Unique ObjectId | Primary Key |
| `organizationId` | `ObjectId` | Yes | None | References `organizations._id`, Indexed | Tenant Key |
| `incidentNumber` | `Number` | Yes | Auto-increment | Unique within organization | Human-readable ID (e.g., INC-42) |
| `title` | `String` | Yes | None | 5-200 characters | Brief incident summary |
| `severity` | `String` | Yes | `"SEV-3"` | Enum: `["SEV-1", "SEV-2", "SEV-3", "SEV-4"]` | Urgency classification |
| `status` | `String` | Yes | `"OPEN"` | Enum: `["OPEN", "ACKNOWLEDGED", "RESOLVED"]` | Triage state |
| `acknowledgedBy` | `ObjectId` | No | `null` | References `users._id` | Triage owner |
| `acknowledgedAt` | `Date` | No | `null` | UTC timestamp | Acknowledgment time |
| `timeline` | `[Object]`| Yes | `[]` | Embedded array of timestamped activity notes | Audit events & notes |

---

### 2.7 Collection: `audit_events` (Immutable Audit Trail)
- **Purpose**: System-wide, write-once ledger of all state mutations.
- **Tenant Key**: `organizationId`
- **Data Classification**: `Audit / Regulatory Compliance`
- **Retention**: Minimum 365 days; append-only (no update/delete permissions).

| Field Name | Type | Required | Default | Description |
| :--- | :--- | :--- | :--- | :--- |
| `_id` | `ObjectId` | Yes | Auto | Unique ObjectId |
| `organizationId` | `ObjectId` | Yes | None | Tenant isolation key |
| `actorId` | `ObjectId` | Yes | None | References `users._id` or system principal |
| `actorType` | `String` | Yes | `"USER"` | Enum: `["USER", "CLI", "SYSTEM", "WEBHOOK"]` |
| `action` | `String` | Yes | None | Formal verb (e.g., `k8s.pod.restart_attempt`, `token.create`) |
| `resourceType` | `String` | Yes | None | Target entity type (`incident`, `integration`, `user`) |
| `resourceId` | `String` | Yes | None | Target entity identifier |
| `ipAddress` | `String` | Yes | None | Client source IPv4/IPv6 address |
| `userAgent` | `String` | Yes | None | Browser user-agent or CLI version string |
| `status` | `String` | Yes | None | Enum: `["SUCCESS", "FAILURE", "BLOCKED"]` |
| `timestamp` | `Date` | Yes | `Date.now` | Strict UTC timestamp (Indexed descending) |

---

## 3. Related Documents & Traceability

- [Database Architecture & Design](DATABASE_DESIGN.md)
- [Data Lifecycle & Backups](DATA_LIFECYCLE_AND_BACKUPS.md)
- [API Endpoints Reference](../03-backend/API_ENDPOINTS.md)
- [Security Architecture](../06-security/SECURITY_ARCHITECTURE.md)
