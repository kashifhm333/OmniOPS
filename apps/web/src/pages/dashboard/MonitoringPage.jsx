import React, { useState, useEffect } from "react";
import { 
  Activity, Cpu, HardDrive, Wifi, Bell, 
  CheckCircle2, AlertTriangle, RefreshCw 
} from "lucide-react";

export function MonitoringPage() {
  const [metrics, setMetrics] = useState({
    cpu: 42,
    memory: 64,
    disk: 52,
    networkIn: "1.24 GB/s",
    networkOut: "890 MB/s",
    requestRate: "14,250 req/s",
    p99Latency: "18.4 ms"
  });

  // Simulated live fluctuating telemetry
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        ...prev,
        cpu: Math.floor(40 + Math.random() * 8),
        memory: Math.floor(63 + Math.random() * 3),
        requestRate: `${Math.floor(14000 + Math.random() * 500)} req/s`,
        p99Latency: `${(17 + Math.random() * 3).toFixed(1)} ms`
      }));
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-surface-container-high">
        <div>
          <h1 className="text-2xl font-bold font-mono tracking-tight text-on-surface flex items-center gap-2">
            <Activity className="w-6 h-6 text-secondary" />
            <span>INFRASTRUCTURE METRICS & PROMETHEUS</span>
          </h1>
          <p className="text-xs font-mono text-outline mt-1">
            Real-time host system utilization, saturation thresholds, and SLO latency percentiles.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-3 py-1.5 rounded-lg bg-surface-container border border-surface-container-high text-xs font-mono text-outline">
            Scrape interval: <span className="text-secondary font-bold">5s</span>
          </div>
        </div>
      </div>

      {/* Main Gauges */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* CPU */}
        <div className="p-5 rounded-xl border border-surface-container-high bg-surface-container-lowest space-y-3">
          <div className="flex items-center justify-between text-outline text-xs font-mono">
            <span>CPU UTILIZATION</span>
            <Cpu className="w-4 h-4 text-primary" />
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-3xl font-bold font-mono text-on-surface">{metrics.cpu}%</span>
            <span className="text-xs font-mono text-outline">32 vCPUs</span>
          </div>
          <div className="w-full bg-surface-container rounded-full h-2 overflow-hidden">
            <div className="bg-primary h-2 rounded-full transition-all duration-500" style={{ width: `${metrics.cpu}%` }}></div>
          </div>
          <span className="text-[10px] font-mono text-outline block">Load average: 1.45, 1.28, 1.10</span>
        </div>

        {/* Memory */}
        <div className="p-5 rounded-xl border border-surface-container-high bg-surface-container-lowest space-y-3">
          <div className="flex items-center justify-between text-outline text-xs font-mono">
            <span>MEMORY (RAM)</span>
            <Activity className="w-4 h-4 text-secondary" />
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-3xl font-bold font-mono text-on-surface">{metrics.memory}%</span>
            <span className="text-xs font-mono text-outline">41 / 64 GB</span>
          </div>
          <div className="w-full bg-surface-container rounded-full h-2 overflow-hidden">
            <div className="bg-secondary h-2 rounded-full transition-all duration-500" style={{ width: `${metrics.memory}%` }}></div>
          </div>
          <span className="text-[10px] font-mono text-outline block">Cached: 8.2 GB &bull; Buffers: 2.1 GB</span>
        </div>

        {/* P99 Latency */}
        <div className="p-5 rounded-xl border border-surface-container-high bg-surface-container-lowest space-y-3">
          <div className="flex items-center justify-between text-outline text-xs font-mono">
            <span>P99 HTTP LATENCY</span>
            <Wifi className="w-4 h-4 text-tertiary" />
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-3xl font-bold font-mono text-on-surface">{metrics.p99Latency}</span>
            <span className="text-xs font-mono text-secondary font-bold">SLO: &lt;50ms</span>
          </div>
          <div className="w-full bg-surface-container rounded-full h-2 overflow-hidden">
            <div className="bg-tertiary h-2 rounded-full transition-all duration-500" style={{ width: "36%" }}></div>
          </div>
          <span className="text-[10px] font-mono text-outline block">Throughput: {metrics.requestRate}</span>
        </div>

        {/* Storage */}
        <div className="p-5 rounded-xl border border-surface-container-high bg-surface-container-lowest space-y-3">
          <div className="flex items-center justify-between text-outline text-xs font-mono">
            <span>NVMe STORAGE</span>
            <HardDrive className="w-4 h-4 text-outline" />
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-3xl font-bold font-mono text-on-surface">{metrics.disk}%</span>
            <span className="text-xs font-mono text-outline">1.2 TB / 2.4 TB</span>
          </div>
          <div className="w-full bg-surface-container rounded-full h-2 overflow-hidden">
            <div className="bg-primary h-2 rounded-full transition-all duration-500" style={{ width: `${metrics.disk}%` }}></div>
          </div>
          <span className="text-[10px] font-mono text-outline block">IOPS: 4,890 &bull; Read: 120 MB/s</span>
        </div>
      </div>

      {/* Alert Rules & SLO Status */}
      <div className="rounded-xl border border-surface-container-high bg-surface-container-lowest p-5 space-y-4">
        <h2 className="text-sm font-bold font-mono tracking-wider uppercase text-on-surface flex items-center gap-2">
          <Bell className="w-4 h-4 text-primary" />
          <span>Active Prometheus Alerting Rules</span>
        </h2>

        <div className="divide-y divide-surface-container-high border border-surface-container-high rounded-lg overflow-hidden text-xs font-mono">
          <div className="p-3 bg-surface-container flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-secondary" />
              <span className="font-bold text-on-surface">TargetDownAlert</span>
              <span className="text-outline text-[11px]">(expr: up == 0, for: 2m)</span>
            </div>
            <span className="px-2 py-0.5 rounded bg-secondary/15 text-secondary text-[10px] font-bold">OK</span>
          </div>

          <div className="p-3 bg-surface-container flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-secondary" />
              <span className="font-bold text-on-surface">HighPodMemoryUsage</span>
              <span className="text-outline text-[11px]">(expr: container_memory_usage &gt; 90%, for: 5m)</span>
            </div>
            <span className="px-2 py-0.5 rounded bg-secondary/15 text-secondary text-[10px] font-bold">OK</span>
          </div>

          <div className="p-3 bg-surface-container flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-500" />
              <span className="font-bold text-on-surface">ApiGatewayLatencyBreach</span>
              <span className="text-outline text-[11px]">(expr: http_request_duration_seconds &gt; 0.8s, for: 1m)</span>
            </div>
            <span className="px-2 py-0.5 rounded bg-amber-500/15 text-amber-400 text-[10px] font-bold">FIRING</span>
          </div>
        </div>
      </div>

    </div>
  );
}
