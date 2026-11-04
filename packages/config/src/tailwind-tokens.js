// OmniOPS Centralized Design System Tokens
// Extracted from UI/dark/DESIGN.md and UI/light/DESIGN.md

export const omniopsTokens = {
  colors: {
    // Dark Telemetry Canvas & Surfaces
    surface: {
      DEFAULT: "var(--surface)",
      dim: "var(--surface-dim)",
      bright: "var(--surface-bright)",
      lowest: "var(--surface-container-lowest)",
      low: "var(--surface-container-low)",
      container: "var(--surface-container)",
      high: "var(--surface-container-high)",
      highest: "var(--surface-container-highest)"
    },
    "on-surface": {
      DEFAULT: "var(--on-surface)",
      variant: "var(--on-surface-variant)"
    },
    // Primary Cyan/Teal
    primary: {
      DEFAULT: "var(--primary)",
      container: "var(--primary-container)",
      "on-primary": "var(--on-primary)",
      "on-primary-container": "var(--on-primary-container)"
    },
    // Secondary Emerald
    secondary: {
      DEFAULT: "var(--secondary)",
      container: "var(--secondary-container)",
      "on-secondary": "var(--on-secondary)"
    },
    // Tertiary Violet
    tertiary: {
      DEFAULT: "var(--tertiary)",
      container: "var(--tertiary-container)",
      "on-tertiary": "var(--on-tertiary)"
    },
    // Critical / Error
    error: {
      DEFAULT: "var(--error)",
      container: "var(--error-container)",
      "on-error": "var(--on-error)"
    },
    // Outlines & Dividers
    outline: {
      DEFAULT: "var(--outline)",
      variant: "var(--outline-variant)"
    }
  },
  fontFamily: {
    sans: ["Inter", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
    mono: ["JetBrains Mono", "Menlo", "Monaco", "Consolas", "monospace"]
  },
  boxShadow: {
    "hud-glow-cyan": "0 0 16px rgba(6, 182, 212, 0.35)",
    "hud-glow-emerald": "0 0 12px rgba(16, 185, 129, 0.25)",
    "hud-glow-crimson": "0 0 16px rgba(239, 68, 68, 0.35)",
    "hud-surface": "0 1px 8px rgba(0, 0, 0, 0.25)"
  }
};
