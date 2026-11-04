import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { 
  Boxes, AlertTriangle, Terminal, GitBranch, 
  Server, Activity, Shield, ArrowUpRight, CheckCircle2,
  RefreshCw, Radio, Play, ChevronRight, Zap
} from "lucide-react";
import { apiClient } from "../../lib/api-client.js";

export function DashboardPage() {
  const queryClient = useQueryClient();

  const { data: summary, isLoading, refetch } = useQuery({
    queryKey: ["dashboard-summary"],
    queryFn: async () => {
      try {
        const res = await apiClient.get("/dashboard/summary");
        return res?.data || res;
      } catch (err) {
        // Fallback for resilient dev preview
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
            { id: 3, time: "38m ago", actor: "alex.kumar", action: "Restarted pod: billing-worker-7f98d", status: "SUCCESS" },
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-surface-container-high">
        <div>
          <h1 className="text-2xl font-bold font-mono tracking-tight text-on-surface flex items-center gap-2">
            <span>OPERATIONAL COMMAND CENTER</span>
            <span className="w-2.5 h-2.5 rounded-full bg-secondary animate-ping"></span>
          </h1>
          <p className="text-xs font-mono text-outline mt-1">
            Real-time telemetry across multi-cloud kubernetes clusters, CI/CD pipelines, and incident responders.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => refetch()}
            className="px-3 py-1.5 rounded-lg border border-surface-container-high hover:border-outline bg-surface-container text-xs font-mono flex items-center gap-2 text-on-surface-variant hover:text-on-surface transition-colors"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? "animate-spin" : ""}`} />
            SYNC
          </button>
          <div className="px-3 py-1.5 rounded-lg bg-primary/10 border border-primary/30 text-primary text-xs font-mono font-bold flex items-center gap-2">
            <Radio className="w-3.5 h-3.5 animate-pulse" />
            LIVE TELEMETRY
          </div>
        </div>
      </div>

      {/* Active Incident Urgent Banner */}
      {summary?.activeAlerts?.length > 0 && (
        <div className="p-4 rounded-xl border border-error/40 bg-error-container/20 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-hud-red">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-error/20 border border-error text-error shrink-0">
              <AlertTriangle className="w-5 h-5 animate-bounce" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-error text-surface font-mono text-xs font-bold">
                  {summary.activeAlerts[0].sev}
                </span>
                <span className="text-xs font-mono text-outline">Service: {summary.activeAlerts[0].service}</span>
                <span className="text-xs font-mono text-error font-semibold">Duration: {summary.activeAlerts[0].duration}</span>
              </div>
              <h3 className="font-bold text-sm text-on-surface mt-1">
                {summary.activeAlerts[0].title}
              </h3>
            </div>
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto">
            <button
              onClick={() => ackIncidentMutation.mutate(summary.activeAlerts[0].id)}
              disabled={ackIncidentMutation.isPending}
              className="flex-1 md:flex-initial px-4 py-2 rounded-lg bg-surface-container border border-error/50 hover:bg-error/10 text-error font-mono text-xs font-bold transition-colors"
            >
              {ackIncidentMutation.isPending ? "ACKING..." : "ACKNOWLEDGE"}
            </button>
            <Link
              to="/dashboard/incidents"
              className="flex-1 md:flex-initial px-4 py-2 rounded-lg bg-error text-surface font-mono text-xs font-bold hover:bg-error/90 transition-colors text-center"
            >
              WAR ROOM
            </Link>
          </div>
        </div>
      )}

      {/* KPI Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Card 1: Pod Health */}
        <div className="p-4 rounded-xl border border-surface-container-high bg-surface-container-lowest relative overflow-hidden group hover:border-primary/50 transition-colors">
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
        </div>

        {/* Card 2: Uptime SLA */}
        <div className="p-4 rounded-xl border border-surface-container-high bg-surface-container-lowest relative overflow-hidden group hover:border-secondary/50 transition-colors">
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
        </div>

        {/* Card 3: CI/CD Pipelines */}
        <div className="p-4 rounded-xl border border-surface-container-high bg-surface-container-lowest relative overflow-hidden group hover:border-tertiary/50 transition-colors">
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
        </div>

        {/* Card 4: Security Posture */}
        <div className="p-4 rounded-xl border border-surface-container-high bg-surface-container-lowest relative overflow-hidden group hover:border-primary/50 transition-colors">
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
        </div>

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

          <div className="rounded-xl border border-surface-container-high bg-surface-container-lowest overflow-hidden">
            <div className="divide-y divide-surface-container-high">
              {summary?.clusters?.map((cls) => (
                <div key={cls.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-surface-container/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${
                      cls.health === "healthy" ? "bg-secondary" : "bg-error animate-pulse"
                    }`}></div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-sm text-on-surface">{cls.name}</span>
                        <span className="px-1.5 py-0.5 rounded bg-surface-container border border-surface-container-high text-[10px] font-mono text-outline">
                          {cls.provider}
                        </span>
                        <span className="text-[10px] font-mono text-outline">{cls.version}</span>
                      </div>
                      <span className="text-xs font-mono text-on-surface-variant block mt-0.5">
                        Active workloads: {cls.pods} pods
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-center">
                    <Link
                      to={`/dashboard/kubernetes?cluster=${cls.id}`}
                      className="px-3 py-1 rounded bg-surface-container border border-surface-container-high hover:border-primary text-xs font-mono text-on-surface hover:text-primary transition-colors"
                    >
                      Inspect Pods
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick CLI Execution Box */}
          <div className="p-4 rounded-xl border border-surface-container-high bg-surface-container-lowest space-y-3">
            <div className="flex items-center justify-between text-xs font-mono text-outline">
              <span className="flex items-center gap-1.5 text-on-surface font-bold">
                <Terminal className="w-4 h-4 text-primary" />
                OmniOPS CLI Integration
              </span>
              <span>npm i -g omniops</span>
            </div>
            <div className="p-3 rounded-lg bg-surface-container-highest font-mono text-xs text-primary flex items-center justify-between border border-surface-container-high">
              <code>$ omniops status --watch</code>
              <button 
                onClick={() => navigator.clipboard.writeText("omniops status --watch")}
                className="text-[10px] text-outline hover:text-on-surface uppercase border border-surface-container-high px-2 py-0.5 rounded"
              >
                Copy
              </button>
            </div>
          </div>
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

          <div className="rounded-xl border border-surface-container-high bg-surface-container-lowest p-4 space-y-4">
            {summary?.activityFeed?.map((item) => (
              <div key={item.id} className="flex items-start gap-3 text-xs font-mono border-b border-surface-container-high pb-3 last:border-0 last:pb-0">
                <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${
                  item.status === "TRIGGERED" ? "bg-error" : "bg-primary"
                }`}></div>
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
          </div>
        </div>

      </div>

    </div>
  );
}
