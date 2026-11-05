# OmniOPS — Typography & Font System Implementation Audit

| Attribute | Specification Details |
| :--- | :--- |
| **Document Purpose** | Comprehensive audit of existing font configurations, font loading methods, and typography tokens across the OmniOPS codebase |
| **Audit Target** | `apps/web/`, `packages/config/`, `docs/ui/` |
| **Audit Date** | November 5, 2026 |
| **Auditor Role** | Senior Frontend Engineer, Design Systems Engineer & UI QA Specialist |
| **Implementation Scope** | Strictly limited typography-only update: Inter (Primary UI) & JetBrains Mono (Technical/Monospace) |

---

## 1. Executive Summary

This audit assesses the current typography implementation in OmniOPS prior to applying production-grade font system refinements. The objective is to ensure that **Inter** serves as the universal primary UI font and **JetBrains Mono** serves strictly for technical, machine-readable, and monospace content, while preserving 100% of the existing layout, geometry, theme colors, and component functionality.

---

## 2. Current Font Inventory & Loading Architecture

### 2.1 Current Font Families
1. **Primary UI Font**: `Inter`
   - Target scope: Headings, page titles, body copy, navigation, buttons, inputs, dropdowns, dialogs, cards, tables, notifications.
   - Current fallback stack: `['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif']`.
2. **Technical / Monospace Font**: `JetBrains Mono`
   - Target scope: Terminal components, CLI command previews, logs, code blocks, JSON/YAML viewers, Kubernetes/Docker resources, technical IDs.
   - Current fallback stack: `['JetBrains Mono', 'Menlo', 'Monaco', 'Consolas', 'monospace']`.
3. **Iconography Font**: `Material Symbols Outlined`
   - Target scope: Google Material Symbols icon glyphs via `.material-symbols-outlined` utility class.

### 2.2 Font Loading Method
- **Source**: Google Fonts CDN (`https://fonts.googleapis.com` & `https://fonts.gstatic.com`).
- **Loading Location**: [`apps/web/index.html`](../../apps/web/index.html) lines 9–12:
  ```html
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet" />
  <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
  ```
- **Observations**:
  - `preconnect` hints are already properly configured.
  - `display=swap` is correctly utilized to avoid render-blocking text.
  - **Weight Gap**: `JetBrains Mono` currently only requests weights `400;500;600`. Several dashboard headers, settings tokens, and terminal labels pair `font-mono` with `font-bold` (700). Adding weight `700` avoids synthetic bolding by the browser engine.

---

## 3. Global Font Configuration Audit

### 3.1 CSS Custom Properties (`globals.css`)
- **File**: [`apps/web/src/styles/globals.css`](../../apps/web/src/styles/globals.css)
- **Current Declaration**:
  ```css
  body {
    background-color: var(--surface);
    color: var(--on-surface);
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
  }
  ```
- **Observation**:
  - CSS variables for `--font-sans` and `--font-mono` are not currently defined under `:root`.
  - Adding semantic tokens `--font-sans` and `--font-mono` directly on `:root` will provide a standard CSS variable hook while keeping system fallbacks consistent.

### 3.2 Tailwind CSS Configuration (`tailwind.config.js`)
- **File**: [`apps/web/tailwind.config.js`](../../apps/web/tailwind.config.js)
- **Current Declarations**:
  ```javascript
  fontFamily: {
    sans: ["Inter", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
    mono: ["JetBrains Mono", "Menlo", "Monaco", "Consolas", "monospace"],
    "headline-xl": ["Inter", "sans-serif"],
    "headline-lg": ["Inter", "sans-serif"],
    "headline-md": ["Inter", "sans-serif"],
    "title-sm": ["Inter", "sans-serif"],
    "body-md": ["Inter", "sans-serif"],
    "body-sm": ["Inter", "sans-serif"],
    "label-code": ["JetBrains Mono", "monospace"],
    "label-telemetry": ["JetBrains Mono", "monospace"],
    "label-mono-sm": ["JetBrains Mono", "monospace"],
    "badge-caps": ["Inter", "sans-serif"]
  }
  ```
- **Observation**:
  - All font family scale utilities map explicitly to `Inter` (sans) and `JetBrains Mono` (mono).
  - Standard `font-sans` and `font-mono` classes have robust fallback stacks.

### 3.3 Shared Monorepo Config (`packages/config/src/tailwind-tokens.js`)
- **File**: [`packages/config/src/tailwind-tokens.js`](../../packages/config/src/tailwind-tokens.js)
- **Current Declaration**:
  ```javascript
  fontFamily: {
    sans: ["Inter", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
    mono: ["JetBrains Mono", "Menlo", "Monaco", "Consolas", "monospace"]
  }
  ```
- **Observation**: Fully aligned with `apps/web/tailwind.config.js`.

---

## 4. Component Typography Audit & Font Overrides

### 4.1 UI Primitives ([`apps/web/src/components/ui/`](../../apps/web/src/components/ui/))
- **`Button.jsx`**: Explicitly defines `font-sans font-semibold`. Correctly inherits Inter.
- **`Input.jsx` / `Textarea.jsx`**: Accepts `mono` boolean prop: switches between `font-mono` (for CLI inputs/tokens) and `font-sans` (for standard form fields).
- **`Badge.jsx` / `StatusPip`**: Uses clean badge labels with standard font inheritance.
- **`Table.jsx`**: Inherits `font-sans` with high-density tabular numbers.
- **`Modal.jsx`**: Modal headers and descriptions inherit `font-sans`.

### 4.2 Application Shell & Layout
- **`AppLayout.jsx`**: Sidebar uses `font-sans` for navigation links and `font-mono` for workspace badges, cluster tags, and build hashes.
- **`Header.jsx`**: Navigation items, dropdown mega-menu, and actions use `font-sans`.
- **`Footer.jsx`**: Footer links and legal text use `font-sans`; live operational SLA badge uses `font-label-telemetry` (JetBrains Mono).

### 4.3 Technical Content Verification (JetBrains Mono Scope)
The following components correctly apply `font-mono`:
- **Web + CLI Synergy Widget** (`HomePage.jsx`): Command prompt and ASCII cluster table.
- **Log Viewer & Streaming** (`LogsPage.jsx`): Timestamped telemetry logs.
- **Terminal Simulator** (`TerminalPage.jsx`): Interactive pseudo-shell.
- **Kubernetes Pod/Container Lists** (`KubernetesPage.jsx`): Pod IDs, namespaces, restart counters.
- **Personal Access Tokens** (`SettingsPage.jsx`): Token hashes and prefix previews.
- **Terraform Plan / HCL Viewer** (`TerraformPage.jsx`): Infrastructure state definitions.
- **Docker Container Inspection** (`DockerPage.jsx`): Image IDs and ports.

---

## 5. Required Changes & Action Plan

1. **Font Weights Enhancement**:
   - Update `apps/web/index.html` Google Fonts stylesheet link to include weight `700` for `JetBrains Mono`:
     `family=JetBrains+Mono:wght@400;500;600;700`
   - Ensure `Inter` continues loading weights `400;500;600;700`.
2. **Semantic CSS Variable Tokens**:
   - Add semantic tokens to `:root` in `apps/web/src/styles/globals.css`:
     ```css
     --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
     --font-mono: 'JetBrains Mono', Menlo, Monaco, Consolas, monospace;
     ```
   - Reference `var(--font-sans)` on `body`.
3. **Tailwind Config Fallback Synchronization**:
   - Verify that `tailwind.config.js` and `packages/config/src/tailwind-tokens.js` continue providing the exact same fallback chains.
4. **No Unrelated Code Modifications**:
   - Zero changes to colors, backgrounds, borders, radii, layouts, spacing, routes, or backend code.

---

## 6. Potential Compatibility Risks & Mitigation

| Potential Risk | Severity | Mitigation Strategy |
| :--- | :--- | :--- |
| **Synthetic Bolding on Monospace** | Low | Explicitly request weight `700` in Google Fonts URL for JetBrains Mono. |
| **FOUT / Layout Shift** | Low | Maintain `font-display: swap` and matching fallback font metric chains (`-apple-system`, `BlinkMacSystemFont`, `Roboto`, `Menlo`, `Monaco`). |
| **Unintended Global Monospace Leak** | Critical | Enforce `font-sans` at the `body` root level; apply `font-mono` strictly via utility classes on designated technical elements. |
| **Theme Switching Typography Glitch** | None | Font declarations are theme-agnostic; both light and dark themes share identical font stacks. |
