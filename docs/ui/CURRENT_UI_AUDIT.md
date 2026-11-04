# OmniOPS Current UI Audit & Refactoring Plan

**Audit Date:** 2026-11-04  
**Scope:** `apps/web/` and shared styling packages  

---

## 1. Current Architecture & Route Inventory

The current frontend is a React 18 Single-Page Application (SPA) bundled with Vite, styled with Tailwind CSS, and powered by TanStack Query and React Router.

### Existing Routes
- **Public Website:**
  - `/`: Landing page (`HomePage.jsx`)
  - `/features`: Feature matrix (`FeaturesPage.jsx`)
  - `/cli`: CLI overview (`CliPage.jsx`)
  - `/pricing`: Pricing plans (`PricingPage.jsx`)
  - `/integrations`: Integrations list (`IntegrationsPage.jsx`)
  - `/status`: System status page (`StatusPage.jsx`)
  - `/docs`: Documentation portal (`DocsPage.jsx`)
  - `/privacy` & `/terms`: Legal documents (`PrivacyPage.jsx`, `TermsPage.jsx`)
- **Authentication:**
  - `/login`: User login (`LoginPage.jsx`)
  - `/register`: User onboarding (`RegisterPage.jsx`)
  - `/device`: RFC 8628 CLI pairing (`DevicePage.jsx`)
- **DevOps Dashboard (`/dashboard/*`):**
  - `/dashboard`: Command Center overview (`DashboardPage.jsx`)
  - `/dashboard/kubernetes`: Fleet clusters & pods (`KubernetesPage.jsx`)
  - `/dashboard/incidents`: War room triage (`IncidentsPage.jsx`)
  - `/dashboard/logs`: Centralized telemetry (`LogsPage.jsx`)
  - `/dashboard/cicd`: CI/CD pipelines (`CicdPage.jsx`)
  - `/dashboard/docker`: Container engine (`DockerPage.jsx`)
  - `/dashboard/monitoring`: Host metrics (`MonitoringPage.jsx`)
  - `/dashboard/settings`: PAT management & RBAC (`SettingsPage.jsx`)
  - `/dashboard/audit`: Immutable audit ledger (`AuditPage.jsx`)

---

## 2. Inconsistencies & Hardcoded Style Audit

| Component / File | Identified Issue | Corrective Action |
| :--- | :--- | :--- |
| `apps/web/src/pages/dashboard/*.jsx` | Scattered inline card borders and button heights | Replace with standardized `Card`, `Button`, `Badge` components from design system |
| `apps/web/src/components/layout/AppLayout.jsx` | Fixed header height and sidebar styles with mixed CSS classes | Align with exact `UI/dark` rail specifications (`w-16` / `w-64`) and semantic tokens |
| `apps/web/src/pages/LoginPage.jsx` | Hardcoded shadow and border radius classes | Standardize with `Card` and `Input` design primitives |
| Multiple pages | Manual SVG icon styling and mixed Lucide / Material Symbols | Consolidate onto unified icon wrappers |

---

## 3. Component Action Plan

### Retain & Standardize
- `Header.jsx`: Retain navigation structure and dropdown mega-menu, refine with exact token classes.
- `Footer.jsx`: Retain semantic footer links, ensure dual theme tokens are applied.
- `AppLayout.jsx`: Retain collapsible sidebar and top status bar, integrate shared design system primitives.

### Consolidate & Extract to `apps/web/src/components/ui/`
- `Button.jsx`: Universal button supporting `primary`, `secondary`, `destructive`, `ghost`, `outline`.
- `Card.jsx`: Standard container with optional top accent border (cyan, emerald, violet, red).
- `Badge.jsx`: Unified status chip with optional pulsing status pip.
- `Input.jsx` & `Textarea.jsx`: Standardized form controls with dark/light focus rings and monospaced mode.
- `Modal.jsx` / `Dialog.jsx`: Unified overlay container for log streams, incident declarations, and PAT generation.
- `Table.jsx`: Monospaced data table with sticky headers and responsive horizontal scrolling.
- `StatusPip.jsx`: Reusable 6px pulsing health indicator.
- `PageHeader.jsx`: Unified page title row with status pill and action toolbar.

### Deprecate & Replace
- Ad-hoc custom card implementations scattered across dashboard pages will be replaced by the shared `Card` primitive.
- Hardcoded table layouts replaced by the standardized `Table` component.

