import React from "react";
import { Search } from "lucide-react";

export function Input({
  className = "",
  mono = false,
  error = false,
  ...props
}) {
  const fontClass = mono ? "font-mono" : "font-sans";
  const errorStyles = error ? "border-error focus:border-error focus:ring-error/40" : "border-surface-container-high focus:border-primary focus:ring-primary/40";

  return (
    <input
      className={`w-full px-3 py-1.5 rounded-lg border bg-surface-container text-xs ${fontClass} text-on-surface placeholder-outline focus:outline-none focus:ring-1 transition-all ${errorStyles} ${className}`}
      {...props}
    />
  );
}

export function Textarea({
  className = "",
  mono = false,
  error = false,
  rows = 3,
  ...props
}) {
  const fontClass = mono ? "font-mono" : "font-sans";
  const errorStyles = error ? "border-error focus:border-error focus:ring-error/40" : "border-surface-container-high focus:border-primary focus:ring-primary/40";

  return (
    <textarea
      rows={rows}
      className={`w-full px-3 py-2 rounded-lg border bg-surface-container text-xs ${fontClass} text-on-surface placeholder-outline focus:outline-none focus:ring-1 transition-all ${errorStyles} ${className}`}
      {...props}
    />
  );
}

export function Select({
  children,
  className = "",
  mono = true,
  ...props
}) {
  const fontClass = mono ? "font-mono" : "font-sans";

  return (
    <select
      className={`px-3 py-1.5 rounded-lg border border-surface-container-high bg-surface-container text-xs ${fontClass} text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/40 transition-colors ${className}`}
      {...props}
    >
      {children}
    </select>
  );
}

export function SearchInput({
  value,
  onChange,
  placeholder = "Search resources...",
  className = "",
  ...props
}) {
  return (
    <div className={`relative ${className}`}>
      <Search className="w-4 h-4 text-outline absolute left-3 top-2.5 pointer-events-none" />
      <Input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        mono
        className="pl-9 pr-3"
        {...props}
      />
    </div>
  );
}

