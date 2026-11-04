import React, { useState, useEffect } from "react";
import { 
  Activity, Cpu, HardDrive, Wifi, Bell, 
  CheckCircle2, AlertTriangle 
} from "lucide-react";
import { PageHeader, Card, Badge } from "../../components/ui/index.js";

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
      <PageHeader
        title="INFRASTRUCTURE METRICS & PROMETHEUS"
        description="Real-time host system utilization, saturation thresholds, and SLO latency percentiles."
        icon={Activity}
        isLive={true}
        actions={
          <Badge variant="neutral">
            Scrape interval: <span className="text-secondary font-bold ml-1">5s</span>
          </Badge>
        }
      />

      {/* Main Gauges */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* CPU */}
        <Card accent="cyan" className="p-5 space-y-3">
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
        </Card>

        {/* Memory */}
        <Card accent="emerald" className="p-5 space-y-3">
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
        </Card>

        {/* P99 Latency */}
        <Card accent="violet" className="p-5 space-y-3">
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
        </Card>

        {/* Storage */}
        <Card className="p-5 space-y-3">
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
        </Card>
      </div>

      {/* Alert Rules & SLO Status */}
      <Card className="p-5 space-y-4">
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
            <Badge variant="success">OK</Badge>
          </div>

          <div className="p-3 bg-surface-container flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-secondary" />
              <span className="font-bold text-on-surface">KubePodCrashLooping</span>
              <span className="text-outline text-[11px]">(expr: rate(kube_pod_container_status_restarts_total[5m]) &gt; 0)</span>
            </div>
            <Badge variant="success">OK</Badge>
          </div>

          <div className="p-3 bg-surface-container flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              <span className="font-bold text-on-surface">HighP99Latency</span>
              <span className="text-outline text-[11px]">(expr: histogram_quantile(0.99, rate(http_req_duration_seconds_bucket[5m])) &gt; 0.05)</span>
            </div>
            <Badge variant="warning">WATCHING</Badge>
          </div>
        </div>
      </Card>
    </div>
  );
}
