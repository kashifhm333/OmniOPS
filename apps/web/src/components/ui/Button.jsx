import React from "react";
import { Loader2 } from "lucide-react";

export function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  isLoading = false,
  disabled = false,
  type = "button",
  ...props
}) {
  const baseStyles = "inline-flex items-center justify-center font-sans font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary disabled:opacity-50 disabled:cursor-not-allowed select-none";

  const variants = {
    primary: "bg-primary-container text-on-primary-container hover:bg-primary hover:text-on-primary shadow-hud-cyan rounded",
    secondary: "bg-surface-container hover:bg-surface-container-high text-on-surface border border-surface-container-high hover:border-outline shadow-sm rounded",
    outline: "bg-transparent hover:bg-surface-container text-on-surface border border-surface-container-high hover:border-outline rounded",
    ghost: "bg-transparent hover:bg-surface-container text-on-surface-variant hover:text-on-surface rounded",
    destructive: "bg-error text-surface hover:bg-error/90 font-bold shadow-hud-red rounded",
    "destructive-outline": "bg-surface-container border border-error/40 hover:bg-error/10 text-error font-bold rounded"
  };

  const sizes = {
    xs: "px-2 py-0.5 text-[11px] gap-1",
    sm: "px-2.5 py-1 text-xs gap-1.5",
    md: "px-4 py-2 text-xs font-semibold gap-2",
    lg: "px-6 py-3 text-sm font-semibold gap-2"
  };

  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      className={`${baseStyles} ${variants[variant] || variants.primary} ${sizes[size] || sizes.md} ${className}`}
      {...props}
    >
      {isLoading && <Loader2 className="w-3.5 h-3.5 animate-spin shrink-0" />}
      {children}
    </button>
  );
}

export function IconButton({
  children,
  variant = "ghost",
  size = "md",
  className = "",
  ...props
}) {
  const sizes = {
    sm: "p-1 rounded",
    md: "p-1.5 rounded",
    lg: "p-2 rounded-lg"
  };

  return (
    <Button
      variant={variant}
      className={`${sizes[size] || sizes.md} ${className}`}
      {...props}
    >
      {children}
    </Button>
  );
}
