# OmniOPS — CLI Command Reference & Manual

| Attribute | Details |
| :--- | :--- |
| **Document ID** | `DOC-04-CLI-04` |
| **Status** | `Draft / Proposed Grammar` |
| **Version** | `0.1.0` |
| **Document Owner** | Lead CLI Maintainer Placeholder |
| **Target Audience** | Software Engineers, DevOps Engineers, SREs, Automation Developers |
| **Last Updated** | 2026-11-04 (UTC) |

---

## 1. Document Control & Executive Summary

### 1.1 Executive Summary
This document serves as the complete operational manual, syntax grammar, and command reference for the OmniOPS Command-Line Interface (`omniops`). It covers global flags, argument definitions, output examples (both human-readable ANSI tables and machine-readable JSON), exit codes, and permission constraints across all supported subcommands.

---

## 2. Global Flags & Invocation Syntax

All `omniops` commands inherit the following global options:

| Flag | Short | Default | Description |
| :--- | :--- | :--- | :--- |
| `--json` | `-j` | `false` | Outputs raw JSON payload to stdout (suppresses interactive styling). |
| `--verbose`| `-v` | `false` | Enables verbose HTTP network debug logs to stderr. |
| `--profile`| `-p` | `"default"`| Selects a specific configuration profile from `~/.omniops/config.json`.|
| `--help` | `-h` | None | Displays contextual help for the active command or subcommand. |
| `--version`| `-V` | None | Prints the installed CLI version string. |

---

## 3. Command Grammar & Subcommand Inventory

### 3.1 Authentication & Configuration Commands

#### `omniops auth login`
- **Description**: Authenticates the CLI with the OmniOPS control plane via the interactive Device Authorization Grant.
- **Syntax**: `omniops auth login [flags]`
- **Flags**:
  - `--token <pat>`: Directly pass a Personal Access Token instead of browser flow.
- **Example**:
  ```bash
  $ omniops auth login
  Initiating login...
  Please visit: https://app.omniops.io/device
  And enter confirmation code: ABCD-8821
  Waiting for authorization...
  ✔ Successfully authenticated as alex@example.com (Org: acme-cloud)
  ```

#### `omniops auth status`
- **Description**: Displays current authentication status, active user email, active organization, and token expiration.
- **Syntax**: `omniops auth status`
- **Output Example**:
  ```text
  Logged in:      Yes
  User:           alex.devops@example.com
  Active Org:     Acme Cloud Corp (acme-cloud)
  Role:           Operator
  Token Expiry:   2026-12-04 (in 30 days)
  ```

---

### 3.2 Command Center Status (`omniops status`)

- **Description**: Displays the high-level health summary across all monitored infrastructure clusters, incidents, and pipelines.
- **Syntax**: `omniops status [flags]`
- **Flags**: `--json`
- **Human Output Example**:
  ```text
  ┌──────────────────────────────────────────────────────────────┐
  │ OmniOPS Operational Status — Acme Cloud Corp (acme-cloud)    │
  ├──────────────────────────────────────────────────────────────┤
  │ Health Score:        98.4% [HEALTHY]                         │
  │ Active Incidents:    1 (INC-42: SEV-2 High Pod Memory)       │
  │ Kubernetes Fleets:   3 / 3 Clusters Healthy                  │
  │ Total Running Pods:  312                                     │
  │ CI/CD Pipelines:     4 Active / 0 Failed                     │
  └──────────────────────────────────────────────────────────────┘
  ```
- **JSON Output Example (`--json`)**:
  ```json
  {
    "healthScore": 98.4,
    "status": "HEALTHY",
    "activeIncidents": 1,
    "healthyClusters": 3,
    "totalPodsRunning": 312
  }
  ```

---

### 3.3 Kubernetes Management (`omniops k8s`)

#### `omniops k8s clusters`
- **Description**: Lists all integrated Kubernetes clusters, cloud regions, and node counts.
- **Syntax**: `omniops k8s clusters [flags]`

#### `omniops k8s pods`
- **Description**: Lists pods across clusters with status, restart count, and memory quotas.
- **Syntax**: `omniops k8s pods [flags]`
- **Flags**:
  - `-n, --namespace <ns>`: Target namespace (defaults to `default`).
  - `-c, --cluster <id>`: Specific cluster identifier.
  - `-s, --status <status>`: Filter by `Running`, `CrashLoopBackOff`, `Pending`.
- **Output Example**:
  ```text
  NAME                       NAMESPACE   STATUS    RESTARTS   CPU    MEMORY
  api-gateway-7b9c-xyz       prod        Running   0          120m   240Mi
  auth-service-5c4d-abc      prod        Running   1          85m    180Mi
  worker-ingest-8f2e-qwe     prod        Running   0          450m   890Mi
  ```

#### `omniops k8s logs`
- **Description**: Streams live stdout/stderr logs from a specific pod.
- **Syntax**: `omniops k8s logs <pod-name> [flags]`
- **Flags**:
  - `-n, --namespace <ns>`: Target namespace.
  - `--tail <lines>`: Number of initial backlog lines (default: 100).
  - `-f, --follow`: Stream real-time events via Server-Sent Events (default: true).

---

### 3.4 Incident Management (`omniops incident`)

#### `omniops incident list`
- **Description**: Lists active incidents with severity, duration, and owner.
- **Syntax**: `omniops incident list [--status <OPEN|ACKNOWLEDGED|RESOLVED>]`

#### `omniops incident ack <id>`
- **Description**: Acknowledges an active incident and assigns ownership to the current user.
- **Syntax**: `omniops incident ack <id>`
- **Permissions**: Requires `Operator`, `Admin`, or `Owner` role.
- **Output**:
  ```text
  ✔ Incident INC-42 successfully acknowledged by Alex Mercer.
  ```

#### `omniops incident resolve <id>`
- **Description**: Marks an incident as resolved with mandatory post-mortem notes.
- **Syntax**: `omniops incident resolve <id> --note "<resolution text>"`
- **Permissions**: Requires `Operator`, `Admin`, or `Owner` role.

---

### 3.5 Centralized Logs (`omniops logs`)

#### `omniops logs search`
- **Description**: Searches structured logs across integrated services.
- **Syntax**: `omniops logs search --query "<query>" [flags]`
- **Flags**:
  - `--service <name>`: Filter by service name.
  - `--since <duration>`: Duration filter (e.g., `1h`, `24h`).
  - `--level <level>`: Filter by `INFO`, `WARN`, `ERROR`.

---

## 4. Exit Code Mapping Reference

| Code | Condition | Example Scenario |
| :--- | :--- | :--- |
| `0` | Success | Command executed and rendered correctly. |
| `1` | General Error | Server returned 500 or unknown operational error. |
| `2` | Usage Error | Missing required argument: `omniops k8s logs` without pod name. |
| `3` | Auth Error | Missing or expired token (returns "Please run `omniops auth login`"). |
| `4` | Network Error | Could not reach `api.omniops.io` within 10-second timeout. |
| `5` | Forbidden | Viewer role attempting `omniops incident resolve`. |

---

## 5. Related Documents & Traceability

- [CLI Product Specification](CLI_PRODUCT_SPECIFICATION.md)
- [CLI Architecture](CLI_ARCHITECTURE.md)
- [CLI Configuration & Authentication](CLI_CONFIGURATION_AND_AUTH.md)
- [API Endpoints Reference](../03-backend/API_ENDPOINTS.md)
