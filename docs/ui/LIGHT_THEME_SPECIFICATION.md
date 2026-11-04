# OmniOPS Light Theme Specification

**Authoritative Reference:** `/home/kashifhm333/Desktop/Project/omniOPS/UI/light`  
**Files Inspected:** `UI/light/DESIGN.md`, `UI/light/code.html`, `UI/light/screen.png`  
**Aesthetic:** Clean Anti-Glare Enterprise Cockpit with Architectural Clarity  

---

## 1. Color Palette & Surface Tokens

The light theme provides high-legibility daylight operations with crisp architectural borders and anti-glare slate backdrops:

| Token Name | Hex Value | Purpose / Placement in Reference |
| :--- | :--- | :--- |
| `surface` / `canvas` | `#F8FAFC` | Anti-glare slate background canvas |
| `surface-dim` | `#F1F5F9` | Sub-panels, secondary containers, code block backgrounds |
| `surface-card` | `#FFFFFF` | Primary card panels, modal dialogues, top navigation header |
| `surface-border` | `#E2E8F0` | Structural perimeter dividers, hairline separators |
| `surface-border-strong` | `#CBD5E1` | Interactive borders, input outlines |
| `text-primary` | `#0F172A` / `#1E293B` | Deep graphite headings and high-contrast titles |
| `text-body` | `#334155` | Standard readable paragraph copy |
| `text-muted` | `#64748B` | Secondary descriptions, timestamps, breadcrumbs |
| `text-subtle` | `#94A3B8` | Micro-labels, disabled placeholders |
| `primary` | `#0284C7` (Sky-600) | Primary brand blue, action buttons, active links |
| `primary-hover` | `#0369A1` (Sky-700) | Hover state for primary buttons |
| `primary-light` | `#E0F2FE` (Sky-100) | Active selection fills, highlighted tags |
| `secondary` | `#059669` (Emerald-600)| Healthy cluster status, passing build badges |
| `secondary-light`| `#D1FAE5` (Emerald-100) | Background for healthy status chips |
| `tertiary` | `#6366F1` / `#7C3AED` | Multi-cloud orchestrator, AI copilot badges |
| `error` | `#DC2626` / `#EF4444` | Incident alerts, crash notifications |
| `error-light` | `#FEE2E2` (Red-100) | Warning and error container highlights |

---

## 2. High-Contrast Embedded Terminal / Telemetry Rule

> [!IMPORTANT]
> As established in `UI/light/code.html` (lines 61–100), embedded telemetry HUDs, terminal windows, and live cluster orbit visualizers maintain high-contrast dark graphite (`#0F172A` / `#151F32` / `#05080E`) even within the light theme. This ensures that monospaced terminal logs, ANSI escape codes, and real-time streaming charts retain high contrast without washing out on bright monitors.

---

## 3. Typography Specification

The light theme leverages `Inter` with tight letter spacing for UI elements and `JetBrains Mono` for tabular metrics:

| Style Class | Family | Size | Weight | Line Height | Tracking | Usage |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `headline-xl` | Inter | 32px (56px lg) | 700 | 40px (64px lg) | -0.02em | Hero headline |
| `headline-lg` | Inter | 24px | 600 | 32px | -0.01em | Section headers |
| `headline-md` | Inter | 20px | 600 | 28px | normal | Card titles, brand logo |
| `title-sm` | Inter | 16px | 600 | 24px | normal | Sub-section headings |
| `body-md` | Inter | 14px | 400 | 20px | normal | Standard readable paragraphs |
| `body-sm` | Inter | 13px | 400 | 18px | normal | Secondary descriptions |
| `label-code` | JetBrains Mono| 13px | 400 | 18px | normal | Terminal syntax, CLI snippets |
| `label-telemetry` | JetBrains Mono| 12px | 500 | 16px | +0.02em | Health badges, cluster metrics |
| `label-mono-sm` | JetBrains Mono| 11px | 500 | 14px | +0.04em | Micro-status flags, latency tags|

---

## 4. Geometry & Elevation

- **Borders:** Crisp 1px solid `#E2E8F0` (slate-200) on white cards and containers.
- **Border Radii:**
  - `rounded-md`: `0.375rem` (6px) — Buttons, inputs, search bars
  - `rounded-lg`: `0.5rem` (8px) — Cards, dropdown menus
  - `rounded-xl`: `0.75rem` (12px) — HUD containers, modals
  - `rounded-full`: `9999px` — Status pills, toggle switches
- **Shadows:**
  - Header Glass: `0 1px 3px rgba(0,0,0,0.03)`
  - Cards: `0 1px 3px rgba(15, 23, 42, 0.06)`
  - Elevated Popovers & Dropdowns: `0 10px 25px -5px rgba(15, 23, 42, 0.1)`
  - Hero Primary Button: `0 4px 14px rgba(2, 132, 199, 0.3)`

---

## 5. Interactive States

- **Primary Button Hover:** `#0284c7` shifts to `#0369a1` with crisp drop-shadow expansion.
- **Secondary Button Hover:** Background shifts from `#FFFFFF` to `#F8FAFC` with border `#94A3B8`.
- **Navigation Links:** Text `#334155` shifts to `#0F172A` with `#F1F5F9` background pill hover.
