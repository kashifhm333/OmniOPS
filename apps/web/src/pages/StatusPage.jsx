import React from "react";
import { CheckCircle2, Activity, Clock, ShieldCheck, AlertTriangle } from "lucide-react";

export function StatusPage() {
  const components = [
    { name: "Express REST API Gateway", status: "Operational", uptime: "99.99%", latency: "14ms" },
    { name: "MongoDB Core Datastore", status: "Operational", uptime: "99.99%", latency: "3ms" },
    { name: "Server-Sent Events (SSE) Mesh", status: "Operational", uptime: "99.98%", latency: "22ms" },
    { name: "Webhook Ingestion Receiver", status: "Operational", uptime: "100.0%", latency: "45ms" },
    { name: "Kubernetes Telemetry Scraper", status: "Operational", uptime: "99.95%", latency: "18ms" },
    { name: "CLI Authentication Gateway", status: "Operational", uptime: "100.0%", latency: "16ms" }
  ];

  return (
    <div className="w-full py-16 px-gutter max-w-5xl mx-auto text-left">
      <div className="p-8 rounded-2xl bg-surface-container border border-surface-container-high shadow-xl mb-12">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-secondary/20 border border-secondary flex items-center justify-center text-secondary shadow-[0_0_12px_rgba(78,222,163,0.5)]">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-on-surface">All Systems Operational</h1>
              <p className="text-xs text-on-surface-variant font-mono mt-0.5">Global operational score: 99.998%</p>
            </div>
          </div>
          <div className="text-right font-mono text-xs text-outline">
            <span>Refreshed: Continuous Live Ping</span>
          </div>
        </div>
      </div>

      {/* Services List */}
      <h2 className="text-xl font-bold text-on-surface mb-4">Core Infrastructure Status</h2>
      <div className="rounded-xl border border-surface-container-high bg-surface-container divide-y divide-surface-container-high overflow-hidden shadow-sm mb-12">
        {components.map((comp, idx) => (
          <div key={idx} className="p-4 flex items-center justify-between font-mono text-sm">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-secondary shadow-[0_0_6px_rgba(78,222,163,0.8)]"></span>
              <span className="font-semibold text-on-surface">{comp.name}</span>
            </div>
            <div className="flex items-center gap-6 text-xs">
              <span className="text-outline hidden sm:inline">Uptime: {comp.uptime}</span>
              <span className="text-outline hidden sm:inline">Latency: {comp.latency}</span>
              <span className="text-secondary font-bold uppercase">{comp.status}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Incident History */}
      <h2 className="text-xl font-bold text-on-surface mb-4">Recent Incident History</h2>
      <div className="p-6 rounded-xl bg-surface-container border border-surface-container-high shadow-sm font-mono text-xs text-on-surface-variant">
        <div className="flex items-center gap-2 text-secondary mb-2 font-bold text-sm">
          <ShieldCheck className="w-4 h-4" />
          <span>Zero Active Unresolved Incidents</span>
        </div>
        <p className="leading-relaxed">
          No critical outages reported in the past 90 days. All scheduled maintenance windows executed with zero customer downtime.
        </p>
      </div>
    </div>
  );
}

