---
name: OmniOPS Industrial Command
colors:
  surface: '#0f131c'
  surface-dim: '#0f131c'
  surface-bright: '#353942'
  surface-container-lowest: '#0a0e16'
  surface-container-low: '#181c24'
  surface-container: '#1c2028'
  surface-container-high: '#262a33'
  surface-container-highest: '#31353e'
  on-surface: '#dfe2ee'
  on-surface-variant: '#bcc9cd'
  inverse-surface: '#dfe2ee'
  inverse-on-surface: '#2c3039'
  outline: '#869397'
  outline-variant: '#3d494c'
  surface-tint: '#4cd7f6'
  primary: '#4cd7f6'
  on-primary: '#003640'
  primary-container: '#06b6d4'
  on-primary-container: '#00424f'
  inverse-primary: '#00687a'
  secondary: '#4edea3'
  on-secondary: '#003824'
  secondary-container: '#00a572'
  on-secondary-container: '#00311f'
  tertiary: '#d0bcff'
  on-tertiary: '#3c0091'
  tertiary-container: '#b395ff'
  on-tertiary-container: '#4900ae'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#acedff'
  primary-fixed-dim: '#4cd7f6'
  on-primary-fixed: '#001f26'
  on-primary-fixed-variant: '#004e5c'
  secondary-fixed: '#6ffbbe'
  secondary-fixed-dim: '#4edea3'
  on-secondary-fixed: '#002113'
  on-secondary-fixed-variant: '#005236'
  tertiary-fixed: '#e9ddff'
  tertiary-fixed-dim: '#d0bcff'
  on-tertiary-fixed: '#23005c'
  on-tertiary-fixed-variant: '#5516be'
  background: '#0f131c'
  on-background: '#dfe2ee'
  surface-variant: '#31353e'
typography:
  headline-xl:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-xl-mobile:
    fontFamily: Inter
    fontSize: 26px
    fontWeight: '700'
    lineHeight: 32px
    letterSpacing: -0.015em
  headline-lg:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  title-sm:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 24px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 18px
  label-code:
    fontFamily: JetBrains Mono
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 18px
  label-telemetry:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.02em
  label-mono-sm:
    fontFamily: JetBrains Mono
    fontSize: 11px
    fontWeight: '500'
    lineHeight: 14px
    letterSpacing: 0.04em
  badge-caps:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 14px
    letterSpacing: 0.05em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  gutter: 1rem
  gutter-dense: 0.75rem
  margin: 1.5rem
  margin-mobile: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 0.75rem
  space-lg: 1.25rem
  space-xl: 2rem
---

## Brand & Style

This design system embodies a cyber-industrial, telemetry-driven design aesthetic tailored for high-stakes platform engineering, site reliability engineering (SRE), and mission-critical cloud operations. The interface must communicate uncompromised reliability, immediate situational awareness, and surgical precision under heavy cognitive loads. 

Targeting platform architects, DevOps engineers, and technical incident commanders, the visual language draws heavily from modern industrial control rooms and aerospace heads-up displays (HUDs). The system favors dense, structured data organization over frivolous decoration, anchoring technical clarity through crisp structural gridlines, subtle luminescence for active states, micro-animations on telemetry status changes, and monospaced alignment for high-density diagnostics. The design must feel hyper-responsive, authoritative, and frictionless whether triaging an active multi-region outage or configuring complex declarative infrastructure pipelines.

## Colors

The color architecture is built for extreme contrast and rapid semantic parsing across dark and light environments, with dark mode operating as the mission-critical default.

### Dark Mode (Telemetry Base)
- **Canvas Base (`#0B0F17`):** Pure deep obsidian canvas minimizing eye strain across 24/7 operations.
- **Surface Elevation 1 (`#111827`):** Muted navy slate for primary structural cards, dashboards, and split panes.
- **Surface Elevation 2 (`#1E293B`):** Interactive card layers, table rows, and nested telemetry blocks.
- **Surface Border (`#334155`):** Subdued low-opacity slate dividers and container borders.
- **Primary Teal/Cyan (`#06B6D4`):** Active telemetry conduits, primary focus rings, selected nodes, and active pipeline branches.
- **Secondary Emerald (`#10B981`):** Operational health pips, passing test suites, synchronized states, and healthy cluster quotas.
- **Tertiary Violet (`#8B5CF6`):** Orchestration layers, AI assistant modules, infrastructure provisioning, and Terraform state hooks.
- **Warning Amber (`#F59E0B`):** Pod threshold warnings, throttling flags, degraded cluster states.
- **Critical Crimson (`#EF4444`):** Pipeline failures, crash-loop backoffs, and memory exhaustion alerts.

### Light Mode Counterpart
- **Canvas Base (`#F8FAFC`):** Crisp, anti-glare high-clarity background slate.
- **Surface Elevation 1 (`#FFFFFF`):** Pure white modular cards and container panels.
- **Surface Elevation 2 (`#F1F5F9`):** Sub-panels, code block backgrounds, and hover fills.
- **Surface Border (`#E2E8F0`):** Sharp, architectural low-contrast perimeter dividers.
- **Text & Contrast (`#0F172A`):** Deep graphite text tokens guaranteeing AAA legibility.
- **Semantic Accents:** Retain identical hue ranges (`#0891B2` cyan, `#059669` emerald, `#7C3AED` violet) calibrated for proper contrast against light backdrops.

## Typography

The typographic hierarchy pairs `Inter` for interface structure with `JetBrains Mono` for data-dense telemetry, git hashes, terminal output, and system metrics. 

- **Structure and UI:** Headings and primary copy leverage `Inter` at tight tracking values (`-0.02em` to `-0.01em`) to create a compact, modern engineering cockpit atmosphere.
- **Telemetry & Machine Output:** All machine-generated labels, pod IDs, IP addresses, latencies, CPU percentages, and log timestamps strictly mandate `JetBrains Mono`. Monospaced characters ensure tabular numbers stack vertically without jitter during continuous real-time streaming updates.
- **Labels & Micro-Data:** Micro-labels utilize uppercase rendering paired with positive letter spacing (`0.04em` to `0.05em`) to maintain sharp readability even on lower-resolution auxiliary monitors.

## Layout & Spacing

The layout philosophy uses a compact fluid-grid architecture engineered for ultra-dense operational dashboards and multi-monitor multi-pane split workflows.

- **Grid Mechanics:** A flexible 12-column foundation supported by a collapsible global rail (64px collapsed, 240px expanded). Primary grids utilize `1rem` (16px) gutters by default, dropping to `gutter-dense` (`0.75rem` / 12px) within telemetry tables and node topologies to maximize screen real estate.
- **Rhythm & Padding:** Spacing tokens run strictly on a 4px/8px modular scale. Card inner-padding favors `space-md` (12px) for high-density monitor configurations and `space-lg` (20px) for high-level summary overview cards.
- **Responsive Adaptations:**
  - **Desktop (1440px+):** Multi-column dashboard layouts with simultaneous log streaming, topology graphs, and node matrix tables.
  - **Tablet / Laptop (768px - 1439px):** Dynamic card wrapping; terminal panels collapse into bottom drawers with toggle hotkeys (`Cmd+~`).
  - **Mobile (<768px):** Stacks metric cards vertically, swaps multi-column pipeline flowcharts into progressive vertical timeline step indicators, and clamps padding to `margin-mobile` (`1rem`).

## Elevation & Depth

This design system avoids excessive skeuomorphic drop shadows, relying on structural tonal layering, crisp micro-borders, and targeted neon luminescence for active telemetry.

- **Tonal Layering:** Visual depth is formed by stepping up the surface brightness. Ground level starts at the dark obsidian canvas (`#0B0F17`), container cards sit on `#111827`, and elevated popovers/dropdowns utilize `#1E293B`.
- **Micro-Borders:** Panels use a uniform 1px solid border (`#1E293B` or `#334155` in dark mode; `#E2E8F0` in light mode). This produces clean, CAD-like delineation between parallel streams of data.
- **Luminescent Accent Shadows:** Shadows are reserved strictly for illuminated status indicators, warning pips, and focused system nodes. These employ subtle atmospheric blurs rather than black cast shadows:
  - *Healthy Pulse:* `0 0 12px rgba(16, 185, 129, 0.25)`
  - *Active Conduit / Focus:* `0 0 16px rgba(6, 182, 212, 0.3)`
  - *Critical Alert:* `0 0 16px rgba(239, 68, 68, 0.35)`
- **Light Mode Elevation:** Light mode swaps neon glows for crisp 1px neutral graphite borders alongside subtle, diffuse ambient drop shadows (`0 1px 3px rgba(15, 23, 42, 0.08)`).

## Shapes

The shape system adopts a low roundedness level (`1` - Soft: base radius of `0.25rem` / 4px to `0.5rem` / 8px). This disciplined geometry echoes hardware rack units, enterprise terminal emulators, and industrial server interfaces.

- **Inputs, Buttons, and Badges:** `rounded-sm` (4px to 6px) to maintain rigid geometric alignment against log lines and data tables.
- **Cards and Telemetry Panels:** Standardized to `rounded-lg` (8px). 
- **Status Indicator Pips:** Perfect circles (`50%` / 9999px) to distinctly isolate boolean states (online/offline/building) against rectangular cards.
- **Pill Tags:** Kept strictly for isolated state chips and environment selectors (e.g., `prod-us-east-1`), rounded to full pill form factor (9999px) to contrast against modular architectural cards.

## Components

### Buttons
- **Primary:** Solid Cyan (`#06B6D4`) background with deep obsidian text (`#0B0F17`) in dark mode; high hover brightness shift with subtle cyan glow (`0 0 12px rgba(6, 182, 212, 0.35)`).
- **Secondary / Ghost:** Transparent background enclosed by 1px slate border (`#334155`), with hover elevation shifting to `#1E293B`.
- **Destructive:** Crimson tint (`#EF4444`) with low-opacity red surface hover for critical cluster teardowns and pod termination actions.

### Cards & Telemetry Containers
- Enclosed with 1px `#1E293B` borders, flat dark obsidian surface `#111827`, and an optional subtle 2px top accent line matching the module's category (Cyan for Network/CI, Violet for AI/Orchestration, Emerald for Health).
- Header bars separate titles from body content with a hairline 1px divider, featuring monospaced count badges on the top right.

### Chips & Status Badges
- **Structure:** Pill or soft-rectangle with `0.25rem` border radius, padding `2px 8px`.
- **Healthy Badge:** Translucent green background (`rgba(16, 185, 129, 0.12)`), solid emerald text (`#10B981`), and a pulsing 6px circular pip.
- **Warning/Error Badges:** Saturated amber and red pairings with monospaced latency/error code counters.

### Inputs & Terminal Fields
- Dark graphite background (`#0B0F17`), 1px structural border (`#334155`), and monospaced font family for filter inputs.
- Active focus state features zero outline offset and a sharp 1px primary cyan ring with subtle luminescent halo.

### Specialized Telemetry Components
- **Sparklines:** Real-time mini SVG path graphs with glowing 1.5px stroke and vertical gradient fill fading to zero opacity at the base.
- **CI/CD Pipeline Flow Node:** Modular horizontal node sequence connected by 1px directional bezier curves, rendering live animated pulse pips through running stages.
- **Log Streamer Console:** Pure terminal black background (`#05080E`) with synchronized line numbers in muted slate (`#475569`), color-coded log levels (`[INFO]`, `[WARN]`, `[ERR]`), and instantaneous search regex filtering.