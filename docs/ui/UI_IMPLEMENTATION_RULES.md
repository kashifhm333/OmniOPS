# OmniOPS UI Implementation Rules & Design Consistency Mandates

This document sets the architectural rules that every developer and component in the OmniOPS repository must strictly follow.

---

## 1. Zero Hardcoded Colors Rule

> [!CAUTION]
> **Never use arbitrary raw hex codes or ad-hoc Tailwind color classes** (e.g. `text-[#123456]`, `bg-purple-900`, `text-zinc-400`) within individual page views or components.

All colors must reference the centralized semantic tokens:
- Use `bg-surface` / `bg-surface-container` / `bg-surface-container-lowest`
- Use `text-on-surface` / `text-on-surface-variant` / `text-outline`
- Use `border-surface-container-high` / `border-outline-variant`
- Use `text-primary` / `bg-primary` / `bg-primary-container`
- Use `text-secondary` / `text-tertiary` / `text-error`

This guarantees that toggling between dark and light themes works instantly across every route without hardcoded visual regressions.

---

## 2. Typography Rules

1. **Interface Copy:** Headings, button labels, modal titles, and navigation text must use `font-sans` (`Inter`).
2. **Machine Telemetry:** Any number, timestamp, cluster name, namespace, pod name, commit SHA, IP address, latency, or log line must use `font-mono` (`JetBrains Mono`).
3. **Micro-Labels:** Metadata categories and status badges must use uppercase rendering with positive letter spacing (`tracking-wider` / `tracking-widest`).

---

## 3. Geometry & Border-Radius Standards

To maintain the aerospace cockpit aesthetic:
- **Buttons & Inputs:** `rounded` (4px) or `rounded-md` (6px).
- **Cards & Data Tables:** `rounded-lg` (8px) or `rounded-xl` (12px).
- **Status Indicators & Tags:** `rounded-full` (9999px).
- Avoid round, bubbly border radii (`rounded-3xl` or `rounded-2xl` on small widgets).

---

## 4. High-Contrast Embedded Terminal Rule

Terminal logs, pod streaming windows, and telemetry visualizers must preserve dark obsidian backgrounds (`#05080E` / `#0F172A`) across both dark and light modes. In light mode, the enclosing frame uses a clean slate border, while the terminal viewport maintains high dark contrast for color-coded ANSI outputs.

---

## 5. Interaction & Focus Conformance

1. Every clickable element must provide a visible hover state, active click feedback, and an accessible focus ring (`focus-visible:ring-1 focus-visible:ring-primary`).
2. Async actions must display loading indicators (spinners or animated skeleton bars).
3. Modals must provide keyboard dismissal via the `Escape` key and click-outside dismissal.

---

## 6. Viewport Adaptations

- **Desktop (1024px+):** Full multi-column dashboard grid, expanded navigation rail (240px) or top mega-menu.
- **Tablet (768px – 1023px):** Collapsible sidebar rail (64px), stacked 2-column grids.
- **Mobile (< 768px):** Single-column layout, bottom navigation or collapsible mobile sheet, horizontal table scrolling with pinned labels, fluid margins (`px-4`).
