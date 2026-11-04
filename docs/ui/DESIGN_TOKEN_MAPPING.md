# OmniOPS Design Token Mapping (Dark & Light)

This document provides the bidirectional mapping between shared semantic token names and their exact extracted values in the authoritative dark (`UI/dark/`) and light (`UI/light/`) themes.

---

## 1. Surface & Canvas Tokens

| Semantic Token | Dark Theme (`.dark`) | Light Theme (`:root`) | Semantic Description |
| :--- | :--- | :--- | :--- |
| `--surface` | `#0f131c` | `#f8fafc` | Viewport root background canvas |
| `--surface-dim` | `#0f131c` | `#f1f5f9` | Subdued backdrop layer |
| `--surface-bright`| `#353942` | `#ffffff` | Elevated interactive hover highlights |
| `--surface-container-lowest` | `#0a0e16` | `#ffffff` | Deepest container panel or pure white card |
| `--surface-container-low` | `#181c24` | `#f8fafc` | Structural card background |
| `--surface-container` | `#1c2028` | `#ffffff` | Standard card panel, input field surface |
| `--surface-container-high` | `#262a33` | `#f1f5f9` | Elevated card layers, dropdown menus |
| `--surface-container-highest` | `#31353e` | `#e2e8f0` | Dividers, switch tracks, table header fills |

---

## 2. Text & Typography Tokens

| Semantic Token | Dark Theme (`.dark`) | Light Theme (`:root`) | Semantic Description |
| :--- | :--- | :--- | :--- |
| `--on-surface` | `#dfe2ee` | `#0f172a` | Primary headings, table text, high contrast |
| `--on-surface-variant` | `#bcc9cd` | `#334155` | Secondary text, descriptions, table column headers |
| `--outline` | `#869397` | `#64748b` | Muted metadata, timestamps, inactive borders |
| `--outline-variant` | `#3d494c` | `#cbd5e1` | Structural grid lines, card inner dividers |

---

## 3. Brand & Semantic Accent Tokens

| Semantic Token | Dark Theme (`.dark`) | Light Theme (`:root`) | Semantic Description |
| :--- | :--- | :--- | :--- |
| `--primary` | `#4cd7f6` | `#0284c7` | Brand cyan/sky, active focus ring, live conduits |
| `--primary-container` | `#06b6d4` | `#0284c7` | Primary action button fills, prominent badges |
| `--on-primary` | `#003640` | `#ffffff` | Text on primary fills |
| `--on-primary-container`| `#00424f` | `#ffffff` | Text on primary container fills |
| `--secondary` | `#4edea3` | `#059669` | Health indicator, operational workload success |
| `--secondary-container`| `#00a572` | `#d1fae5` | Passing test suites, synchronized cluster mesh |
| `--on-secondary` | `#003824` | `#065f46` | Text on secondary elements |
| `--tertiary` | `#d0bcff` | `#6366f1` | AI copilot, Terraform state engine, pipeline tags|
| `--tertiary-container` | `#b395ff` | `#e0e7ff` | Orchestration highlights, decorative orbit fills |
| `--on-tertiary` | `#3c0091` | `#3730a3` | Text on tertiary elements |
| `--error` | `#ffb4ab` | `#ef4444` | Critical errors, SEV alerts, crash-loop backoff |
| `--error-container` | `#93000a` | `#fee2e2` | Incident alert banner background fills |
| `--on-error` | `#690005` | `#991b1b` | Text on error elements |

---

## 4. Geometry & Radii Tokens

| Token Name | Value | Usage |
| :--- | :--- | :--- |
| `rounded-sm` | `0.125rem` (2px) | Micro-tags, inline code chips |
| `rounded` / `rounded-DEFAULT` | `0.25rem` (4px) | Buttons, inputs, search fields |
| `rounded-md` | `0.375rem` (6px) | Standard interactive buttons |
| `rounded-lg` | `0.5rem` (8px) | Telemetry cards, table containers |
| `rounded-xl` | `0.75rem` (12px) | Modal dialogs, HUD preview containers |
| `rounded-full` | `9999px` | State pips, environment tags, theme switcher pills |

---

## 5. Spacing Scale Tokens

| Token Name | Value | Implementation Context |
| :--- | :--- | :--- |
| `space-xs` | `0.25rem` (4px) | Tight icon-label gaps, badge inner padding |
| `space-sm` | `0.5rem` (8px) | Button padding, list item gaps |
| `space-md` | `0.75rem` (12px) | Card internal padding, table cell padding |
| `space-lg` | `1.25rem` (20px) | Container margins, header gutters |
| `space-xl` | `2rem` (32px) | Section vertical margins, hero gaps |
| `gutter` | `1rem` (16px) | Standard screen edge gutters |
| `gutter-dense`| `0.75rem` (12px) | High-density telemetry tables |

---

## 6. Luminescent & Elevation Shadow Tokens

| Token Name | Dark Mode (`.dark`) | Light Mode (`:root`) |
| :--- | :--- | :--- |
| `shadow-sm` | `0 1px 2px rgba(0, 0, 0, 0.4)` | `0 1px 2px rgba(15, 23, 42, 0.05)` |
| `shadow-md` | `0 4px 6px -1px rgba(0, 0, 0, 0.5)`| `0 4px 6px -1px rgba(15, 23, 42, 0.08)`|
| `shadow-lg` | `0 10px 15px -3px rgba(0, 0, 0, 0.6)`| `0 10px 15px -3px rgba(15, 23, 42, 0.1)`|
| `shadow-hud-cyan` | `0 0 16px rgba(6, 182, 212, 0.35)` | `0 4px 14px rgba(2, 132, 199, 0.25)` |
| `shadow-hud-emerald`| `0 0 12px rgba(16, 185, 129, 0.3)` | `0 4px 14px rgba(5, 150, 105, 0.2)` |
| `shadow-hud-red` | `0 0 16px rgba(239, 68, 68, 0.35)` | `0 4px 14px rgba(220, 38, 38, 0.2)` |
