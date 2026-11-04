import React from "react";
import { Radio } from "lucide-react";

export function PageHeader({
  title,
  description,
  icon: Icon = null,
  actions = null,
  isLive = false
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-surface-container-high">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold font-mono tracking-tight text-on-surface flex items-center gap-2.5">
          {Icon && <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary shrink-0" />}
          <span>{title}</span>
          {isLive && (
            <span className="w-2 h-2 rounded-full bg-secondary animate-ping ml-1" />
          )}
        </h1>
        {description && (
          <p className="text-xs font-mono text-outline mt-1 max-w-3xl">
            {description}
          </p>
        )}
      </div>

      {actions && (
        <div className="flex items-center gap-3 shrink-0">
          {actions}
        </div>
      )}
    </div>
  );
}

