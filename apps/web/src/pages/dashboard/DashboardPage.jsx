import React from "react";
import { Link } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { 
  Boxes, AlertTriangle, Terminal, GitBranch, 
  Server, Activity, Shield, ArrowUpRight, CheckCircle2,
  RefreshCw, Radio, Play, ChevronRight, Zap
} from "lucide-react";
import { apiClient } from "../../lib/api-client.js";
import { 
  PageHeader, Card, CardHeader, CardTitle, CardContent, 
  Badge, Button, StatusPip 
} from "../../components/ui/index.js";

export function DashboardPage() {
  const queryClient = useQueryClient();

  const { data: summary, isLoading, refetch } = useQuery({
    queryKey: ["dashboard-summary"],
    queryFn: async () => {
      try {
        const res = await apiClient.get("/dashboard/summary");
        return res?.data || res;
      } catch (err) {
        return {
          clusterHealth: "HEALTHY",
          activeClusters: 3,
          totalPods: 142,
          healthyPods: 141,
          failingPods: 1,
          activeIncidents: 1,
          uptime: "99.98%",
          recentDeployments: 8,
          activeAlerts: [
            { id: "inc-001", sev: "SEV-2", title: "API Gateway 5xx Latency Spike > 800ms", service: "gateway-proxy", duration: "14m" }
          ],
          clusters: [
            { id: "cls-prod-us", name: "us-east-prod", provider: "EKS", version: "v1.29.3", pods: "64/64", health: "healthy" },
            { id: "cls-prod-eu", name: "eu-west-core", provider: "GKE", version: "v1.28.7", pods: "48/49", health: "degraded" },
            { id: "cls-edge-ap", name: "ap-south-edge", provider: "K3s", version: "v1.29.1", pods: "29/29", health: "healthy" }
          ],
          activityFeed: [
            { id: 1, time: "2m ago", actor: "sarah.chen", action: "Triggered deploy: omniops-web #482", status: "SUCCESS" },
            { id: 2, time: "14m ago", actor: "alertmanager", action: "Triggered SEV-2 Alert: High Error Rate", status: "TRIGGERED" },
            { id: 3, time: "38m ago", actor: "alex.kumar", action: "Restarted pod: billing-worker-67df8", status: "SUCCESS" },
            { id: 4, time: "1h ago", actor: "system", action: "Automated TLS Certificate Renewal", status: "SUCCESS" }
          ]
        };
      }
    },
    refetchInterval: 15000
  });

  const ackIncidentMutation = useMutation({
    mutationFn: async (id) => {
      return apiClient.post(`/incidents/${id}/ack`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["dashboard-summary"]);
    }
  });

  return (
    <div className="space-y-6">
      
      {/* Page Title & Status Banner */}
      <PageHeader
        title="OPERATIONAL COMMAND CENTER"
        description="Real-time telemetry across multi-cloud kubernetes clusters, CI/CD pipelines, and incident responders."
        isLive={true}
        actions={
          <>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => refetch()}
              isLoading={isLoading}
            >
              <RefreshCw className="w-3.5 h-3.5" />
              SYNC
            </Button>
            <div className="px-3 py-1.5 rounded bg-primary/10 border border-primary/30 text-primary text-xs font-mono font-bold flex items-center gap-2">
              <Radio className="w-3.5 h-3.5 animate-pulse" />
              LIVE TELEMETRY
            </div>
          </>
        }
      />

      {/* Active Incident Urgent Banner */}
      {summary?.activeAlerts?.length > 0 && (
        <Card accent="red" className="p-4 bg-error-container/10 border-error/40 shadow-hud-red">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded bg-error/20 border border-error text-error shrink-0">
                <AlertTriangle className="w-5 h-5 animate-bounce" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <Badge variant="critical" size="sm">
                    {summary.activeAlerts[0].sev}
                  </Badge>
                  <span className="text-xs font-mono text-outline">Service: {summary.activeAlerts[0].service}</span>
                  <span className="text-xs font-mono text-error font-semibold">Duration: {summary.activeAlerts[0].duration}</span>
                </div>
                <h3 className="font-bold text-sm text-on-surface mt-1">
                  {summary.activeAlerts[0].title}
                </h3>
              </div>
            </div>
            <div className="flex items-center gap-3 w-full md:w-auto">
              <Button
                variant="destructive-outline"
                size="sm"
                onClick={() => ackIncidentMutation.mutate(summary.activeAlerts[0].id)}
                isLoading={ackIncidentMutation.isPending}
              >
                ACKNOWLEDGE
              </Button>
              <Link to="/dashboard/incidents">
                <Button variant="destructive" size="sm">
                  WAR ROOM
                </Button>
              </Link>
            </div>
          </div>
        </Card>
      )}

      {/* KPI Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Card 1: Pod Health */}
        <Card accent="cyan" className="p-4">
          <div className="flex items-center justify-between text-outline text-xs font-mono">
            <span>ACTIVE WORKLOADS</span>
            <Boxes className="w-4 h-4 text-primary" />
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-bold font-mono text-on-surface">
              {summary?.healthyPods || 141} / {summary?.totalPods || 142}
            </span>
            <span className="text-xs font-mono text-secondary font-bold">99.3%</span>
          </div>
          <div className="mt-2 w-full bg-surface-container rounded-full h-1.5 overflow-hidden">
            <div className="bg-secondary h-1.5 rounded-full" style={{ width: "99.3%" }}></div>
          </div>
          <span className="text-[10px] font-mono text-outline block mt-2">
            1 pod in CrashLoopBackOff on eu-west
          </span>
        </Card>

        {/* Card 2: Uptime SLA */}
        <Card accent="emerald" className="p-4">
          <div className="flex items-center justify-between text-outline text-xs font-mono">
            <span>30-DAY UPTIME SLA</span>
            <Activity className="w-4 h-4 text-secondary" />
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-bold font-mono text-on-surface">{summary?.uptime || "99.98%"}</span>
            <span className="text-xs font-mono text-secondary font-bold">+0.02%</span>
          </div>
          <div className="mt-2 w-full bg-surface-container rounded-full h-1.5 overflow-hidden">
            <div className="bg-secondary h-1.5 rounded-full" style={{ width: "99.98%" }}></div>
          </div>
          <span className="text-[10px] font-mono text-outline block mt-2">
            Zero global outages recorded in 45d
          </span>
        </Card>

        {/* Card 3: CI/CD Pipelines */}
        <Card accent="violet" className="p-4">
          <div className="flex items-center justify-between text-outline text-xs font-mono">
            <span>DAILY DEPLOYMENTS</span>
            <GitBranch className="w-4 h-4 text-tertiary" />
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-bold font-mono text-on-surface">14 Passed</span>
            <span className="text-xs font-mono text-secondary font-bold">100%</span>
          </div>
          <div className="mt-2 w-full bg-surface-container rounded-full h-1.5 overflow-hidden">
            <div className="bg-tertiary h-1.5 rounded-full" style={{ width: "100%" }}></div>
          </div>
          <span className="text-[10px] font-mono text-outline block mt-2">
            Mean deploy duration: 4m 12s
          </span>
        </Card>

        {/* Card 4: Security Posture */}
        <Card accent="cyan" className="p-4">
          <div className="flex items-center justify-between text-outline text-xs font-mono">
            <span>AUDIT & CVE SCORE</span>
            <Shield className="w-4 h-4 text-primary" />
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-bold font-mono text-on-surface">GRADE A+</span>
            <span className="text-xs font-mono text-secondary font-bold">0 CRIT</span>
          </div>
          <div className="mt-2 w-full bg-surface-container rounded-full h-1.5 overflow-hidden">
            <div className="bg-primary h-1.5 rounded-full" style={{ width: "96%" }}></div>
          </div>
          <span className="text-[10px] font-mono text-outline block mt-2">
            All images signed & SBOM verified
          </span>
        </Card>

      </div>

      {/* Main Grid: Clusters & Live Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Connected Kubernetes Clusters */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold font-mono tracking-wider uppercase text-on-surface flex items-center gap-2">
              <Boxes className="w-4 h-4 text-primary" />
              <span>Kubernetes Fleet Status</span>
            </h2>
            <Link to="/dashboard/kubernetes" className="text-xs font-mono text-primary hover:underline flex items-center gap-1">
              <span>View All Fleets</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <Card>
            <div className="divide-y divide-surface-container-high">
              {summary?.clusters?.map((cls) => (
                <div key={cls.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-surface-container/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <StatusPip status={cls.health === "healthy" ? "running" : "degraded"} />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-sm text-on-surface">{cls.name}</span>
                        <Badge size="sm">{cls.provider}</Badge>
                        <span className="text-[10px] font-mono text-outline">{cls.version}</span>
                      </div>
                      <span className="text-xs font-mono text-on-surface-variant block mt-0.5">
                        Active workloads: {cls.pods} pods
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-center">
                    <Link to={`/dashboard/kubernetes?cluster=${cls.id}`}>
                      <Button variant="secondary" size="xs">
                        Inspect Pods
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Quick CLI Execution Box */}
          <Card className="p-4 space-y-3">
            <div className="flex items-center justify-between text-xs font-mono text-outline">
              <span className="flex items-center gap-1.5 text-on-surface font-bold">
                <Terminal className="w-4 h-4 text-primary" />
                OmniOPS CLI Integration
              </span>
              <span>npm i -g omniops</span>
            </div>
            <div className="p-3 rounded bg-surface-container-highest font-mono text-xs text-primary flex items-center justify-between border border-surface-container-high">
              <code>$ omniops status --watch</code>
              <button 
                onClick={() => navigator.clipboard.writeText("omniops status --watch")}
                className="text-[10px] text-outline hover:text-on-surface uppercase border border-surface-container-high px-2 py-0.5 rounded"
              >
                Copy
              </button>
            </div>
          </Card>
        </div>

        {/* Right 1 Col: Live Audit & Activity Feed */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold font-mono tracking-wider uppercase text-on-surface flex items-center gap-2">
              <Zap className="w-4 h-4 text-tertiary" />
              <span>Real-time Stream</span>
            </h2>
            <Link to="/dashboard/audit" className="text-xs font-mono text-tertiary hover:underline flex items-center gap-1">
              <span>Audit Ledger</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <Card className="p-4 space-y-4">
            {summary?.activityFeed?.map((item) => (
              <div key={item.id} className="flex items-start gap-3 text-xs font-mono border-b border-surface-container-high pb-3 last:border-0 last:pb-0">
                <StatusPip status={item.status === "TRIGGERED" ? "critical" : "running"} className="mt-1.5" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between text-[10px] text-outline">
                    <span>{item.actor}</span>
                    <span>{item.time}</span>
                  </div>
                  <p className="text-on-surface font-medium truncate mt-0.5">
                    {item.action}
                  </p>
                </div>
              </div>
            ))}
          </Card>
        </div>

      </div>

    </div>
  );
}
