import React from "react";

export function Card({
  children,
  className = "",
  accent = null, // "cyan" | "emerald" | "violet" | "red" | null
  interactive = false,
  ...props
}) {
  const accentBorders = {
    cyan: "border-t-2 border-t-primary",
    emerald: "border-t-2 border-t-secondary",
    violet: "border-t-2 border-t-tertiary",
    red: "border-t-2 border-t-error"
  };

  const interactiveStyles = interactive 
    ? "hover:border-outline/50 hover:bg-surface-container/60 transition-colors cursor-pointer" 
    : "";

  return (
    <div
      className={`rounded-xl border border-surface-container-high bg-surface-container-lowest overflow-hidden transition-all duration-200 ${
        accent ? accentBorders[accent] : ""
      } ${interactiveStyles} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, className = "", ...props }) {
  return (
    <div
      className={`p-4 border-b border-surface-container-high flex items-center justify-between gap-3 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardTitle({ children, className = "", ...props }) {
  return (
    <h3
      className={`font-sans font-semibold text-sm text-on-surface tracking-tight flex items-center gap-2 ${className}`}
      {...props}
    >
      {children}
    </h3>
  );
}

export function CardContent({ children, className = "", ...props }) {
  return (
    <div className={`p-4 ${className}`} {...props}>
      {children}
    </div>
  );
}

export function CardFooter({ children, className = "", ...props }) {
  return (
    <div
      className={`p-3 border-t border-surface-container-high bg-surface-container-low/50 flex items-center justify-between text-xs font-mono ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
