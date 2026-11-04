import React from "react";

export function StatusPip({ status = "running", className = "" }) {
  const pips = {
    running: "bg-secondary shadow-hud-emerald",
    healthy: "bg-secondary shadow-hud-emerald",
    warning: "bg-amber-500",
    error: "bg-error animate-ping",
    degraded: "bg-amber-500 animate-pulse",
    critical: "bg-error animate-pulse",
    stopped: "bg-outline"
  };

  return (
    <span
      className={`inline-block w-2 h-2 rounded-full shrink-0 ${pips[status] || pips.running} ${className}`}
    />
  );
}

export function Badge({
  children,
  variant = "neutral",
  size = "md",
  hasPip = false,
  pipStatus = "running",
  className = "",
  ...props
}) {
  const variants = {
    neutral: "bg-surface-container text-outline border border-surface-container-high",
    healthy: "bg-secondary/15 text-secondary border border-secondary/30 font-semibold",
    warning: "bg-amber-500/15 text-amber-400 border border-amber-500/30 font-semibold",
    critical: "bg-error/15 text-error border border-error/30 font-bold",
    primary: "bg-primary/15 text-primary border border-primary/30 font-semibold",
    tertiary: "bg-tertiary/15 text-tertiary border border-tertiary/30 font-semibold"
  };

  const sizes = {
    sm: "px-1.5 py-0.2 text-[10px]",
    md: "px-2 py-0.5 text-xs",
    lg: "px-2.5 py-1 text-xs"
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-mono rounded select-none ${variants[variant] || variants.neutral} ${sizes[size] || sizes.md} ${className}`}
      {...props}
    >
      {hasPip && <StatusPip status={pipStatus} />}
      {children}
    </span>
  );
}
