import React, { useState, useEffect, useRef } from "react";
import { 
  Terminal, ShieldCheck, Play, Pause, 
  Trash2, Download, Copy, Check 
} from "lucide-react";
import { PageHeader, Card, Badge, Button, SearchInput } from "../../components/ui/index.js";

export function LogsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("ALL");
  const [isStreaming, setIsStreaming] = useState(true);
  const [copied, setCopied] = useState(false);
  const logsContainerRef = useRef(null);

  const initialLogs = [
    { id: 1, ts: "2026-11-04T12:45:01.001Z", level: "INFO", service: "api-gateway", msg: "HTTP 200 GET /api/v1/healthz from 10.0.1.12 duration=1.2ms" },
    { id: 2, ts: "2026-11-04T12:45:02.140Z", level: "INFO", service: "auth-service", msg: "PAT authenticated user=sarah.chen token_prefix=oop_live_8f7b" },
    { id: 3, ts: "2026-11-04T12:45:03.220Z", level: "WARN", service: "billing-worker", msg: "Downstream Stripe webhook timeout after 4000ms. Retrying batch 1/3..." },
    { id: 4, ts: "2026-11-04T12:45:04.550Z", level: "ERROR", service: "gateway-proxy", msg: "Upstream connection refused to pod billing-worker-67df8:8080 (CrashLoopBackOff)" },
    { id: 5, ts: "2026-11-04T12:45:05.100Z", level: "INFO", service: "security-auditor", msg: "Sanitizer scrubbed Bearer token in payload: Authorization: Bearer [REDACTED_SECRET]" },
    { id: 6, ts: "2026-11-04T12:45:06.312Z", level: "DEBUG", service: "k8s-operator", msg: "Reconciling CustomResourceDefinition omniops.io/v1alpha1 ClusterClaim" },
    { id: 7, ts: "2026-11-04T12:45:07.491Z", level: "INFO", service: "cicd-runner", msg: "Job completed: build-docker-amd64 in 142s with exit code 0" },
    { id: 8, ts: "2026-11-04T12:45:08.800Z", level: "ERROR", service: "gateway-proxy", msg: "502 Bad Gateway response returned to client 198.51.100.41" }
  ];

  const [logs, setLogs] = useState(initialLogs);

  // Simulated live log ingestion when isStreaming is on
  useEffect(() => {
    if (!isStreaming) return;
    const interval = setInterval(() => {
      const sampleEvents = [
        { level: "INFO", service: "api-gateway", msg: `HTTP 200 GET /api/v1/k8s/pods duration=${(Math.random() * 20 + 2).toFixed(1)}ms` },
        { level: "DEBUG", service: "k8s-operator", msg: `Syncing node health state: ip-10-0-1-${Math.floor(Math.random() * 30 + 10)} ready` },
        { level: "INFO", service: "auth-service", msg: "Session token validated for tenant=acme-corp" },
        { level: "WARN", service: "monitoring", msg: `High CPU throttle on pod prometheus-server-0 (${(Math.random() * 15 + 75).toFixed(0)}%)` }
      ];
      const randomEvent = sampleEvents[Math.floor(Math.random() * sampleEvents.length)];
      setLogs((prev) => [
        ...prev.slice(-100),
        {
          id: Date.now(),
          ts: new Date().toISOString(),
          ...randomEvent
        }
      ]);
    }, 3000);
    return () => clearInterval(interval);
  }, [isStreaming]);

  // Auto-scroll to bottom
  useEffect(() => {
    if (isStreaming && logsContainerRef.current) {
      logsContainerRef.current.scrollTop = logsContainerRef.current.scrollHeight;
    }
  }, [logs, isStreaming]);

  const filteredLogs = logs.filter(log => {
    const matchesLevel = selectedLevel === "ALL" || log.level === selectedLevel;
    const matchesQuery = !searchQuery || 
      log.msg.toLowerCase().includes(searchQuery.toLowerCase()) || 
      log.service.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesLevel && matchesQuery;
  });

  const handleCopy = () => {
    const text = filteredLogs.map(l => `[${l.ts}] [${l.level}] [${l.service}] ${l.msg}`).join("\n");
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="CENTRALIZED TELEMETRY LOGS"
        description="Zero-plaintext log aggregation with live regex masking for API tokens, passwords, and private keys."
        icon={Terminal}
        isLive={isStreaming}
        actions={
          <div className="flex items-center gap-3">
            <Badge variant="success">
              <ShieldCheck className="w-3.5 h-3.5 mr-1" />
              SECRET MASKING ACTIVE
            </Badge>

            <Button
              variant={isStreaming ? "primary" : "secondary"}
              size="sm"
              onClick={() => setIsStreaming(!isStreaming)}
              icon={isStreaming ? Pause : Play}
            >
              {isStreaming ? "PAUSE STREAM" : "RESUME STREAM"}
            </Button>
          </div>
        }
      />

      {/* Query Bar */}
      <Card className="p-3">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="w-full sm:w-96">
            <SearchInput
              placeholder="Search query (e.g. 502, CrashLoop, api-gateway)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto">
            {["ALL", "ERROR", "WARN", "INFO", "DEBUG"].map((lvl) => (
              <button
                key={lvl}
                onClick={() => setSelectedLevel(lvl)}
                className={`px-2.5 py-1 rounded text-xs font-mono whitespace-nowrap transition-colors ${
                  selectedLevel === lvl
                    ? "bg-primary text-on-primary font-bold shadow-hud-cyan"
                    : "bg-surface-container text-outline hover:text-on-surface"
                }`}
              >
                {lvl}
              </button>
            ))}
            <Button
              variant="secondary"
              size="sm"
              onClick={handleCopy}
              icon={copied ? Check : Copy}
            >
              {copied ? "COPIED" : "COPY"}
            </Button>
          </div>
        </div>
      </Card>

      {/* Terminal Display */}
      <div className="rounded-xl border border-surface-container-high bg-[#05080e] overflow-hidden shadow-2xl">
        {/* Terminal Header */}
        <div className="px-4 py-2.5 bg-[#090e17] border-b border-surface-container-high flex items-center justify-between text-xs font-mono text-outline">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-error/70"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/70"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-secondary/70"></span>
            <span className="ml-2 text-slate-200 font-semibold tracking-wider">omniops-telemetry-tail</span>
          </div>
          <div className="flex items-center gap-3">
            <span>Buffer: {filteredLogs.length} events</span>
            <button 
              onClick={() => setLogs([])}
              className="hover:text-slate-100 text-outline transition-colors"
              title="Clear terminal"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Logs Output */}
        <div 
          ref={logsContainerRef}
          className="p-4 font-mono text-xs overflow-y-auto max-h-[600px] min-h-[400px] space-y-1.5 text-slate-300"
        >
          {filteredLogs.length === 0 ? (
            <div className="text-center py-16 text-outline">
              No log messages matching filter criteria.
            </div>
          ) : (
            filteredLogs.map((item) => {
              const isError = item.level === "ERROR";
              const isWarn = item.level === "WARN";
              const isInfo = item.level === "INFO";

              return (
                <div key={item.id} className="flex items-start gap-2 hover:bg-slate-900/80 px-2 py-1 rounded transition-colors">
                  <span className="text-slate-500 shrink-0 text-[11px]">{item.ts.substring(11, 23)}</span>
                  <span className={`px-1.5 py-0.2 rounded text-[10px] font-bold shrink-0 ${
                    isError ? "bg-error/20 text-error border border-error/30" :
                    isWarn ? "bg-amber-500/20 text-amber-400 border border-amber-500/30" :
                    isInfo ? "bg-primary/20 text-primary border border-primary/30" :
                    "bg-slate-800 text-slate-400"
                  }`}>
                    {item.level}
                  </span>
                  <span className="text-secondary shrink-0 font-bold">[{item.service}]</span>
                  <span className="text-slate-200 flex-1 break-all">{item.msg}</span>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
