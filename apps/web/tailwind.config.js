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
          "on-primary-container": "var(--on-primary-container)",
          fixed: "#acedff",
          "fixed-dim": "#4cd7f6"
        },
        // Health / Success (Emerald)
        secondary: {
          DEFAULT: "var(--secondary)",
          container: "var(--secondary-container)",
          "on-secondary": "var(--on-secondary)",
          fixed: "#6ffbbe",
          "fixed-dim": "#4edea3"
        },
        // AI / Orchestration (Violet)
        tertiary: {
          DEFAULT: "var(--tertiary)",
          container: "var(--tertiary-container)",
          "on-tertiary": "var(--on-tertiary)",
          fixed: "#e9ddff",
          "fixed-dim": "#d0bcff"
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
        "headline-xl": ["Inter", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
        "headline-lg": ["Inter", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
        "headline-md": ["Inter", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
        "title-sm": ["Inter", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
        "body-md": ["Inter", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
        "body-sm": ["Inter", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
        "label-code": ["JetBrains Mono", "Menlo", "Monaco", "Consolas", "monospace"],
        "label-telemetry": ["JetBrains Mono", "Menlo", "Monaco", "Consolas", "monospace"],
        "label-mono-sm": ["JetBrains Mono", "Menlo", "Monaco", "Consolas", "monospace"],
        "badge-caps": ["Inter", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"]
      },
      fontSize: {
        "headline-xl": ["32px", { lineHeight: "40px", letterSpacing: "-0.02em", fontWeight: "700" }],
        "headline-xl-mobile": ["26px", { lineHeight: "32px", letterSpacing: "-0.015em", fontWeight: "700" }],
        "headline-lg": ["24px", { lineHeight: "32px", letterSpacing: "-0.01em", fontWeight: "600" }],
        "headline-md": ["20px", { lineHeight: "28px", fontWeight: "600" }],
        "title-sm": ["16px", { lineHeight: "24px", fontWeight: "600" }],
        "body-md": ["14px", { lineHeight: "20px", fontWeight: "400" }],
        "body-sm": ["13px", { lineHeight: "18px", fontWeight: "400" }],
        "label-code": ["13px", { lineHeight: "18px", fontWeight: "400" }],
        "label-telemetry": ["12px", { lineHeight: "16px", letterSpacing: "0.02em", fontWeight: "500" }],
        "label-mono-sm": ["11px", { lineHeight: "14px", letterSpacing: "0.04em", fontWeight: "500" }],
        "badge-caps": ["11px", { lineHeight: "14px", letterSpacing: "0.05em", fontWeight: "600" }]
      },
      borderRadius: {
        DEFAULT: "0.125rem",
        sm: "0.125rem",
        md: "0.25rem",
        lg: "0.25rem",
        xl: "0.5rem",
        "2xl": "0.75rem",
        full: "0.75rem"
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
