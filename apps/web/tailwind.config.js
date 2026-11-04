/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
    "../../packages/*/src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        // Semantic surfaces
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
        "inverse-surface": "var(--inverse-surface)",
        "inverse-on-surface": "var(--inverse-on-surface)",

        // Brand colors (Teal / Cyan)
        primary: {
          DEFAULT: "var(--primary)",
          container: "var(--primary-container)",
          "on-primary": "var(--on-primary)",
          "on-primary-container": "var(--on-primary-container)"
        },
        // Health / Success (Emerald)
        secondary: {
          DEFAULT: "var(--secondary)",
          container: "var(--secondary-container)",
          "on-secondary": "var(--on-secondary)"
        },
        // AI / Orchestration (Violet)
        tertiary: {
          DEFAULT: "var(--tertiary)",
          container: "var(--tertiary-container)",
          "on-tertiary": "var(--on-tertiary)"
        },
        // Error / Alert (Rose)
        error: {
          DEFAULT: "var(--error)",
          container: "var(--error-container)",
          "on-error": "var(--on-error)"
        },
        // Outlines
        outline: {
          DEFAULT: "var(--outline)",
          variant: "var(--outline-variant)"
        }
      },
      fontFamily: {
        sans: ["Inter", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
        mono: ["JetBrains Mono", "Menlo", "Monaco", "Consolas", "monospace"],
        "headline-xl": ["Inter", "sans-serif"],
        "label-code": ["JetBrains Mono", "monospace"],
        "label-telemetry": ["JetBrains Mono", "monospace"],
        "label-mono-sm": ["JetBrains Mono", "monospace"],
        "badge-caps": ["Inter", "sans-serif"]
      },
      borderRadius: {
        DEFAULT: "0.125rem",
        sm: "0.125rem",
        md: "0.25rem",
        lg: "0.375rem",
        xl: "0.5rem",
        "2xl": "0.75rem",
        full: "9999px"
      },
      spacing: {
        gutter: "1rem",
        "gutter-dense": "0.75rem",
        margin: "1.5rem",
        "margin-mobile": "1rem",
        "space-xs": "0.25rem",
        "space-sm": "0.5rem",
        "space-md": "0.75rem",
        "space-lg": "1.25rem",
        "space-xl": "2rem"
      },
      boxShadow: {
        "hud-cyan": "0 0 16px rgba(6, 182, 212, 0.35)",
        "hud-emerald": "0 0 12px rgba(16, 185, 129, 0.25)",
        "hud-crimson": "0 0 16px rgba(239, 68, 68, 0.35)",
        "hud-surface": "0 1px 8px rgba(0, 0, 0, 0.25)"
      }
    }
  },
  plugins: []
};
