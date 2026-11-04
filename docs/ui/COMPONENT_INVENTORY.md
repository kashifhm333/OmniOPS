# OmniOPS Component Inventory & Architectural Blueprint

This document specifies the complete inventory of standardized, theme-aware React UI components required to achieve total design consistency across all public, authentication, and authenticated dashboard surfaces in OmniOPS.

---

## 1. Core Primitives (`apps/web/src/components/ui/`)

| Component | Variants / States | Supported Themes | Purpose |
| :--- | :--- | :--- | :--- |
| `Button` | `primary`, `secondary`, `destructive`, `ghost`, `outline` (sizes: `sm`, `md`, `lg`) | Both | Standard action triggers, forms, hero CTAs |
| `IconButton` | `ghost`, `outline`, `filled` (sizes: `sm`, `md`) | Both | Toolbar actions, copy, refresh, icon triggers |
| `Card` | `default`, `elevated`, `hud-terminal`, `interactive` | Both | Workload containers, stat summaries |
| `Badge` | `healthy` (emerald), `warning` (amber), `critical` (red), `neutral` (slate), `info` (cyan), `ai` (violet) | Both | Pod statuses, SEV levels, version tags |
| `StatusPip` | `running` (pulsing green), `degraded` (amber), `error` (pulsing red), `stopped` (gray) | Both | 6px boolean live health indicators |
| `Input` | `default`, `monospace` (telemetry/code), `error` | Both | Form fields, search bars |
| `Textarea` | `default`, `monospace` | Both | Incident notes, YAML configs |
| `Select` | `default`, `compact` | Both | Cluster selectors, namespace filters |
| `Switch` | `checked`, `unchecked`, `disabled` | Both | Theme switchers, live streaming toggles |
| `Tooltip` | `top`, `bottom`, `left`, `right` | Both | Contextual explanations for micro-metrics |

---

## 2. Overlays & Dialogue Primitives

| Component | Features | Purpose |
| :--- | :--- | :--- |
| `Modal` / `Dialog` | Backdrop blur, header with icon, body, footer actions | Pod log stream, declare incident, generate PAT |
| `Dropdown` | Animated popover, item shortcuts, divider | Platform navigation menu, cluster actions |
| `Notification` / `Toast` | Dismissible, auto-timeout, severity styling | Action confirmations, socket alerts |

---

## 3. Structural & Navigation Layout Components

| Component | Features | Purpose |
| :--- | :--- | :--- |
| `Header` | Sticky glass blur, wordmark logo, mega-menu, theme toggle | Public website and documentation header |
| `Sidebar` | Collapsible rail (64px to 256px), active route indicator, workspace badge | Authenticated DevOps Command Center navigation |
| `PageHeader` | Title, description, action toolbar, live sync indicator | Consistent header row across all 12 modules |
| `Tabs` | Horizontal pill tabs, underline active indicator | Incident filter tabs, Settings sections |
| `Breadcrumb` | Monospaced trail with chevron separators | Contextual location in hierarchy |
| `Footer` | Categorized links, legal copyright, system status indicator | Public website footer |

---

## 4. High-Density Telemetry & Module Displays

| Component | Features | Purpose |
| :--- | :--- | :--- |
| `Table` | Monospaced columns, responsive scroll, sticky header, hover rows | Kubernetes pods, container lists, audit ledger |
| `LogStreamer` | Dark terminal (`#05080E`), line numbers, secret masking badge, auto-scroll | Real-time container logs, centralized query |
| `MetricGauge` | Big numeric readout, delta percentage, mini progress track | CPU, Memory, Disk, P99 Latency cards |
| `PipelineVisualizer`| Linear node progression connected by bezier lines | CI/CD build stages and test gates |
| `EmptyState` | Icon illustration, title, description, primary CTA | Zero active incidents, empty cluster states |
| `LoadingState` | Animated spinner, skeleton tracks, monospaced sync text | Data fetching and async mutations |
| `ErrorState` | Red icon, retry button, technical error trace toggle | Failed network queries, offline control plane |
