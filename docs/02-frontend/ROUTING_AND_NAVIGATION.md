# OmniOPS — Routing & Navigation Specification

| Attribute | Details |
| :--- | :--- |
| **Document ID** | `DOC-02-FRO-03` |
| **Status** | `Draft` (Pending Review) |
| **Version** | `0.1.0` |
| **Document Owner** | Lead Frontend Architect Placeholder |
| **Target Audience** | Frontend Engineers, Product Managers, SEO Engineers, QA Leads |
| **Last Updated** | 2026-11-04 (UTC) |

---

## 1. Document Control & Executive Summary

### 1.1 Executive Summary
This document specifies the routing architecture, layout nesting, authorization guards, navigation hierarchies, and indexing directives for the OmniOPS web client (`apps/web`). The application leverages **React Router v6** configured for declarative nested routing across two main realms:
1. **Public Marketing & Documentation Website**: Publicly accessible, SEO-indexed routes.
2. **Authenticated Operational Command Center**: Strictly authenticated, RBAC-protected, `noindex` internal workspace routes.

---

## 2. Route Topology & Layout Nesting

```mermaid
flowchart TD
    ROOT["Root Router (BrowserRouter)"] --> SPLIT{"Route Category"}

    SPLIT -->|Public Routes| PUB_SHELL["PublicLayout\n- Top Navbar\n- Marketing Hero / Content\n- Global Footer"]
    SPLIT -->|Auth Gateway| AUTH_SHELL["AuthLayout\n- Centered Auth Card\n- Brand Logo\n- Security Badges"]
    SPLIT -->|Authenticated| GUARD["RequireAuth Guard\n(Checks Active Session Cookie)"]

    GUARD -->|Valid Session| APP_SHELL["AppLayout\n- Header (Workspace Switcher & Profile)\n- Collapsible Nav Sidebar\n- Breadcrumb Bar\n- Main Viewport with Suspense"]
    GUARD -->|Unauthenticated| REDIR["Redirect to /login?returnTo=:path"]

    APP_SHELL --> RBAC_GUARD{"RequireRole Guard"}
    RBAC_GUARD -->|Authorized| FEAT["Feature View (Dashboard, K8s, Logs, Settings)"]
    RBAC_GUARD -->|Forbidden (e.g. Viewer on /settings/members)| FORBID["403 Forbidden View"]
```

---

## 3. Comprehensive Route Inventory

### 3.1 Public Website & Authentication Routes

| Route Path | Page Title / Purpose | Access Level | Layout Shell | SEO Indexing |
| :--- | :--- | :--- | :--- | :--- |
| `/` | OmniOPS Homepage & Platform Value Prop | Public | `PublicLayout` | `index, follow` |
| `/features` | Core 12 Modules Feature Deep Dive | Public | `PublicLayout` | `index, follow` |
| `/cli` | CLI Overview, Install Guide & Terminal Demos | Public | `PublicLayout` | `index, follow` |
| `/pricing` | Pricing Plans & Tier Comparison | Public | `PublicLayout` | `index, follow` |
| `/docs/*` | Public Developer Documentation Portal | Public | `DocsLayout` | `index, follow` |
| `/status` | Public System Status & Outage History | Public | `PublicLayout` | `index, follow` |
| `/login` | User Login Portal (Email / OAuth) | Public (Guest) | `AuthLayout` | `noindex, nofollow` |
| `/register` | Organization & User Account Creation | Public (Guest) | `AuthLayout` | `noindex, nofollow` |
| `/device` | CLI Device Authorization Code Entry | Authenticated | `AuthLayout` | `noindex, nofollow` |

---

### 3.2 Authenticated Command Center Routes

All authenticated routes enforce `noindex, nofollow` via HTTP header and HTML meta tags.

| Route Path | View Purpose | Required RBAC Role | Data Dependencies |
| :--- | :--- | :--- | :--- |
| `/dashboard` | Command Center Overview & Health Scores | `Viewer` or higher | `/api/v1/dashboard/summary` |
| `/kubernetes/clusters` | Multi-Cluster Fleet Overview | `Viewer` or higher | `/api/v1/k8s/clusters` |
| `/kubernetes/pods` | Cross-Namespace Pod Inspection & Logs | `Viewer` or higher | `/api/v1/k8s/pods` |
| `/incidents` | Incident Management & Alert Triage | `Viewer` or higher | `/api/v1/incidents` |
| `/incidents/:id` | Dedicated Incident Triage Room & Timeline | `Viewer` or higher | `/api/v1/incidents/:id` |
| `/logs` | Centralized Structured Log Explorer | `Viewer` or higher | `/api/v1/logs/query` |
| `/docker` | Container & Registry Overview | `Viewer` or higher | `/api/v1/docker/containers`|
| `/cicd` | CI/CD Pipeline Runs & Analytics | `Viewer` or higher | `/api/v1/cicd/runs` |
| `/settings/organization`| Organization Profile & Slug Settings | `Admin` or `Owner` | `/api/v1/team/organization`|
| `/settings/members` | Team Member Invitations & Role Updates | `Admin` or `Owner` | `/api/v1/team/members` |
| `/settings/tokens` | Personal Access Tokens (CLI Keys) | `Viewer` (Self) / `Admin` | `/api/v1/auth/tokens` |
| `/settings/audit-logs` | Immutable Compliance Audit Trail | `Admin` or `Owner` | `/api/v1/audit/logs` |

---

## 4. Navigation Hierarchies & UI Shell

### 4.1 Authenticated Sidebar Hierarchy
The left sidebar (`src/components/common/Sidebar.jsx`) provides categorized primary navigation:
- **Operations**:
  - Command Center (`/dashboard`, icon: `LayoutDashboard`)
  - Incidents (`/incidents`, icon: `AlertTriangle`, badge with active open count)
  - Logs Explorer (`/logs`, icon: `Terminal`)
- **Infrastructure**:
  - Kubernetes (`/kubernetes/clusters`, icon: `Boxes`)
  - Docker (`/docker`, icon: `Container`)
  - CI/CD Pipelines (`/cicd`, icon: `GitBranch`)
- **Administration**:
  - Integrations (`/settings/integrations`, icon: `Plug`)
  - Team & Access (`/settings/members`, icon: `Users`)
  - Audit Trail (`/settings/audit-logs`, icon: `ShieldCheck`)

### 4.2 Breadcrumb Resolution Standard
Every view renders dynamic breadcrumbs derived from the route hierarchy:
- Example: `/kubernetes/clusters/us-east-prod/pods/api-89`
- Renders: `Home > Kubernetes > us-east-prod > Pods > api-89`

---

## 5. Navigation State, Deep Linking & Error Handling

1. **Return-To Deep Linking**: When an unauthenticated user attempts to visit a deep link (e.g., `/incidents/inc-42`), the router redirects to `/login?returnTo=${encodeURIComponent(location.pathname)}`. Upon successful login, the user is immediately routed to their original destination.
2. **404 Not Found Handling**: Unrecognized routes inside `/` render the public 404 page; unrecognized routes inside `/dashboard/*` render the in-app 404 view retaining the navigation sidebar.
3. **403 Forbidden Handling**: If an operator attempts to access `/settings/members`, the `RequireRole` guard renders an inline permission warning without redirecting, preserving the user's navigational context.

---

## 6. Related Documents & Traceability

- [Frontend Architecture & Specification](FRONTEND_SPECIFICATION.md)
- [UI/UX Design System](UI_UX_DESIGN_SYSTEM.md)
- [Frontend State Management](FRONTEND_STATE_MANAGEMENT.md)
- [Authentication & Authorization](../03-backend/AUTHENTICATION_AND_AUTHORIZATION.md)
