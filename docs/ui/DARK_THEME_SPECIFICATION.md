# OmniOPS Dark Theme Specification

**Authoritative Reference:** `/home/kashifhm333/Desktop/Project/omniOPS/UI/dark`  
**Files Inspected:** `UI/dark/DESIGN.md`, `UI/dark/code.html`, `UI/dark/screen.png`  
**Aesthetic:** Cyber-industrial Telemetry HUD / Mission-Critical Control Center  

---

## 1. Color Palette & Surface Tokens

The dark theme is the mission-critical primary operational mode of OmniOPS. It employs a deep obsidian foundation paired with high-contrast electric telemetry accents:

| Token Name | Hex Value | Purpose / Placement in Reference |
| :--- | :--- | :--- |
| `surface` / `background` | `#0f131c` | Root viewport canvas background |
| `surface-dim` | `#0f131c` | Dimmed backdrop foundation |
| `surface-bright` | `#353942` | Bright elevated highlights and button hovers |
| `surface-container-lowest` | `#0a0e16` | Pure deep obsidian panels (dashboard canvas, HUD container) |
| `surface-container-low` | `#181c24` | Primary structural cards, telemetry card bases |
| `surface-container` | `#1c2028` | Standard containers, input backgrounds, navigation items |
| `surface-container-high` | `#262a33` | Elevated card layers, dropdown menus, borders |
| `surface-container-highest` | `#31353e` | Hairline dividers, active toggle slots, subtle borders |
| `on-surface` | `#dfe2ee` | Primary headings, prominent body text, high legibility |
| `on-surface-variant` | `#bcc9cd` | Subtitles, secondary descriptions, table metadata |
| `outline` | `#869397` | Muted labels, secondary icons, inactive border strokes |
| `outline-variant` | `#3d494c` | Structural grid lines, card inner dividers |
| `primary` | `#4cd7f6` | Active telemetry conduits, primary focus rings, selected nodes |
| `primary-container` | `#06b6d4` | Primary action button fills, active conduit glows |
| `on-primary` | `#003640` | Text/icons rendered on top of `primary` fill |
| `on-primary-container` | `#00424f` | High-contrast text on primary container buttons |
| `secondary` | `#4edea3` | Operational health pips, passing test suites, synchronized cluster mesh |
| `secondary-container` | `#00a572` | Active secondary badges and health fills |
| `on-secondary` | `#003824` | Text on secondary fills |
| `tertiary` | `#d0bcff` | AI Copilot, Terraform state engine, orchestration tags |
| `tertiary-container` | `#b395ff` | Tertiary badge backgrounds, decorative orbits |
| `on-tertiary` | `#3c0091` | Text on tertiary fills |
| `error` | `#ffb4ab` | CrashLoop alerts, pipeline failures, SEV-1 notifications |
| `error-container` | `#93000a` | Incident alert banner backgrounds |
| `on-error` | `#690005` | High-contrast text on error elements |

---

## 2. Typography Specification

The dark theme pairs `Inter` for interface structure with `JetBrains Mono` for tabular metrics and machine telemetry:

| Style Class | Family | Size | Weight | Line Height | Tracking | Usage |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `headline-xl` | Inter | 32px (54px lg) | 700 | 40px (62px lg) | -0.02em | Hero headline |
| `headline-xl-mobile`| Inter | 26px | 700 | 32px | -0.015em | Mobile hero headline |
| `headline-lg` | Inter | 24px | 600 | 32px | -0.01em | Section header |
| `headline-md` | Inter | 20px | 600 | 28px | normal | Card titles, logo |
| `title-sm` | Inter | 16px | 600 | 24px | normal | Sub-section headers |
| `body-md` | Inter | 14px | 400 | 20px | normal | Standard UI body text |
| `body-sm` | Inter | 13px | 400 | 18px | normal | Supporting descriptive copy |
| `label-code` | JetBrains Mono| 13px | 400 | 18px | normal | Terminal syntax, CLI snippets |
| `label-telemetry` | JetBrains Mono| 12px | 500 | 16px | +0.02em | Health badges, latencies |
| `label-mono-sm` | JetBrains Mono| 11px | 500 | 14px | +0.04em | Micro-status flags, cluster IDs|
| `badge-caps` | Inter | 11px | 600 | 14px | +0.05em | Uppercase category badges |

---

## 3. Geometry & Spacing Rules

- **Border Radii:**
  - `sm`: `0.125rem` (2px) — Micro-dividers, small tags
  - `DEFAULT`: `0.25rem` (4px) — Buttons, inputs, inline badges
  - `lg`: `0.25rem` (4px in reference token) / `0.375rem` (6px) — Card corners
  - `xl`: `0.5rem` (8px) — Dashboard panels, modals
  - `full`: `9999px` — Telemetry status pips, pill tags
- **Spacing Scale:**
  - `gutter`: `1rem` (16px) — Page padding
  - `gutter-dense`: `0.75rem` (12px) — Table cells, telemetry matrix
  - `margin`: `1.5rem` (24px) — Section margins
  - `margin-mobile`: `1rem` (16px) — Mobile boundary margins
  - `space-xs`: `0.25rem` (4px)
  - `space-sm`: `0.5rem` (8px)
  - `space-md`: `0.75rem` (12px)
  - `space-lg`: `1.25rem` (20px)
  - `space-xl`: `2rem` (32px)

---

## 4. Atmospheric Depth & Luminescent Shadows

The dark theme avoids blurry diffuse black shadows, instead leveraging structural micro-borders and neon atmospheric glow effects:
- **Card Border:** `1px solid #262a33` (`surface-container-high`)
- **Active Primary Glow:** `0 0 12px rgba(6, 182, 212, 0.3)`
- **Hero CTA Button Glow:** `0 0 20px rgba(6, 182, 212, 0.35)`
- **Orbit Nucleus Glow:** `0 0 35px rgba(6, 182, 212, 0.4)`
- **Header Glass:** `bg-[#0f131c]/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.25)]`

---

## 5. Interactive States

- **Primary Button Hover:** `#06b6d4` (`primary-container`) shifts to `#4cd7f6` (`primary`) with `scale-[1.01]` and increased glow.
- **Secondary Button Hover:** Background `#262a33` with border `#4cd7f6`.
- **Navigation Dropdown:** Slides vertically (`translate-y-1` to `translate-y-0`) with opacity fade, 200ms duration.
- **Pulse Indicators:** `animate-pulse` on 6px circular emerald pips for live health monitoring.
