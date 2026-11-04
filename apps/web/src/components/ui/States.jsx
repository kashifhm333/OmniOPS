import React from "react";
import { AlertCircle, Loader2, Inbox } from "lucide-react";
import { Button } from "./Button.jsx";

export function EmptyState({
  icon: Icon = Inbox,
  title = "No resources found",
  description = "No items match your current filter criteria.",
  action = null
}) {
  return (
    <div className="p-12 text-center rounded-xl border border-surface-container-high bg-surface-container-lowest flex flex-col items-center justify-center">
      <div className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center text-outline mb-3 border border-surface-container-high">
        <Icon className="w-6 h-6 text-outline" />
      </div>
      <h3 className="font-sans font-bold text-sm text-on-surface mb-1">
        {title}
      </h3>
      <p className="font-mono text-xs text-outline max-w-sm mb-4">
        {description}
      </p>
      {action && <div>{action}</div>}
    </div>
  );
}

export function LoadingState({ message = "Synchronizing live telemetry..." }) {
  return (
    <div className="p-12 text-center rounded-xl border border-surface-container-high bg-surface-container-lowest flex flex-col items-center justify-center">
      <Loader2 className="w-6 h-6 text-primary animate-spin mb-3" />
      <span className="font-mono text-xs text-outline tracking-wider uppercase">
        {message}
      </span>
    </div>
  );
}

export function ErrorState({
  message = "Failed to load telemetry from control plane",
  onRetry = null
}) {
  return (
    <div className="p-8 text-center rounded-xl border border-error/40 bg-error/5 flex flex-col items-center justify-center">
      <AlertCircle className="w-8 h-8 text-error mb-2" />
      <h3 className="font-sans font-bold text-sm text-on-surface mb-1">
        Operational Telemetry Error
      </h3>
      <p className="font-mono text-xs text-error max-w-md mb-4">
        {message}
      </p>
      {onRetry && (
        <Button variant="secondary" size="sm" onClick={onRetry}>
          Retry Connection
        </Button>
      )}
    </div>
  );
}
