# OmniOPS UI Asset & Font Inventory

This document details all visual assets, logos, iconography, and font dependencies extracted from `UI/dark` and `UI/light`.

---

## 1. Brand Identity & Logos

| Asset Name | Format / Origin | Dark Mode Rendering | Light Mode Rendering | Usage |
| :--- | :--- | :--- | :--- | :--- |
| **OmniOPS Wordmark** | Inline SVG / Text | `Omni` (Cyan `#4CD7F6`) + `OPS` (`#DFE2EE`) | `Omni` (Slate `#0F172A`) + `OPS` (Brand `#0284C7`) | Header brand mark, footer |
| **Hub Hex Nucleus** | SVG & Material Symbols `hub` | Glowing Cyan box with border `#4CD7F6` | Crisp Blue box with border `#0284C7` | Favicon, app launcher, sidebar brand |

---

## 2. Web Fonts & Typographic Resources

The following fonts are linked in `index.html` as mandated by both design references:

```html
<!-- Google Fonts: Inter & JetBrains Mono -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">

<!-- Material Symbols Outlined for Specialized Control Room Glyphs -->
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet">
```

### Font Roles
- **`Inter` (`font-sans` / `font-body`):** Primary UI headings, button labels, navigation copy, dialog titles.
- **`JetBrains Mono` (`font-mono`):** Pod names, timestamps, error codes, commit SHAs, terminal output, latencies, cryptographic hashes.
- **`Material Symbols Outlined` & `Lucide React`:** Iconography across toolbar buttons, telemetry cards, and navigation links.

---

## 3. Specialized Visual Artifacts

### 3.1 Central Orbit Nucleus Visualization (from `UI/dark/code.html` & `UI/light/code.html`)
- **Structure:** Concentric rotating rings with dashed stroke (`animate-[spin_60s_linear_infinite]`)
- **Core Node:** Gradient circular badge (`from-primary-container via-surface-container-high to-tertiary-container` in dark; `from-sky-500 to-indigo-600` in light)
- **Pulse Indicators:** 6px circular pips with `animate-pulse` and ambient atmospheric blur (`shadow-hud-emerald` / `shadow-hud-cyan`).

### 3.2 Terminal Stream Glass Effect
- **Dark Theme:** `#05080E` base with `1px solid #1E293B`, subtle scanline effect.
- **Light Theme:** Preserves dark container `#0F172A` with `1px solid #1E293B` for maximal readability of colored log levels (`[INFO]`, `[WARN]`, `[ERROR]`).
