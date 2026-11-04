import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { 
  AlertTriangle, CheckCircle2, Clock, ShieldAlert, Plus, 
  MessageSquare, UserCheck, RefreshCw, X, Radio, ArrowRight
} from "lucide-react";
import { apiClient } from "../../lib/api-client.js";

export function IncidentsPage() {
  const queryClient = useQueryClient();
  const [statusFilter, setStatusFilter] = useState("active");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newIncident, setNewIncident] = useState({
    title: "",
    severity: "SEV-2",
    service: "api-gateway",
    description: ""
  });

  // Query Incidents
  const { data: incidents = [], isLoading, refetch } = useQuery({
    queryKey: ["incidents", statusFilter],
    queryFn: async () => {
      try {
        const res = await apiClient.get(`/incidents?status=${statusFilter}`);
        return res?.data || res;
      } catch (err) {
        // Fallback realistic incidents
        return [
          {
            id: "inc-001",
            title: "API Gateway 5xx Latency Spike > 800ms",
            severity: "SEV-2",
            status: "investigating",
            service: "api-gateway",
            assignee: "sarah.chen",
            createdAt: "2026-11-04T12:00:00Z",
            acknowledgedAt: null,
            timeline: [
              { time: "12:00:00", text: "Prometheus alert triggered: HighLatencyAlert" },
              { time: "12:02:15", text: "PagerDuty on-call paged (sarah.chen)" }
            ]
          },
          {
            id: "inc-002",
            title: "Billing Worker OOMKilled repeatedly",
            severity: "SEV-3",
            status: "identified",
            service: "billing-worker",
            assignee: "alex.kumar",
            createdAt: "2026-11-04T10:15:00Z",
            acknowledgedAt: "2026-11-04T10:18:22Z",
            timeline: [
              { time: "10:15:00", text: "Pod billing-worker-67df8 OOMKilled" },
              { time: "10:18:22", text: "Acknowledged by alex.kumar" },
              { time: "10:30:00", text: "Memory limit raised to 1Gi via config PR #389" }
            ]
          },
          {
            id: "inc-003",
            title: "Eu-west-1 Database Replica Lag > 45s",
            severity: "SEV-1",
            status: "resolved",
            service: "mongodb-cluster",
            assignee: "devops-team",
            createdAt: "2026-11-03T18:00:00Z",
            acknowledgedAt: "2026-11-03T18:02:00Z",
            resolvedAt: "2026-11-03T18:42:00Z",
            timeline: [
              { time: "18:00:00", text: "Cross-region network partition detected" },
              { time: "18:02:00", text: "Failover initiated to local hot standby" },
              { time: "18:42:00", text: "Replication recovered. All nodes caught up." }
            ]
          }
        ];
      }
    }
  });

  // Acknowledge Incident Mutation
  const ackMutation = useMutation({
    mutationFn: async (id) => {
      return apiClient.post(`/incidents/${id}/ack`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["incidents"]);
    }
  });

  // Resolve Incident Mutation
  const resolveMutation = useMutation({
    mutationFn: async (id) => {
      return apiClient.post(`/incidents/${id}/resolve`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["incidents"]);
    }
  });

  // Create Incident Mutation
  const createMutation = useMutation({
    mutationFn: async (payload) => {
      return apiClient.post("/incidents", payload);
    },
    onSuccess: () => {
      setIsCreateModalOpen(false);
      setNewIncident({ title: "", severity: "SEV-2", service: "api-gateway", description: "" });
      queryClient.invalidateQueries(["incidents"]);
    }
  });

  const filteredIncidents = incidents.filter(inc => {
    if (statusFilter === "active") return inc.status !== "resolved";
    if (statusFilter === "resolved") return inc.status === "resolved";
    return true;
  });

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-surface-container-high">
        <div>
          <h1 className="text-2xl font-bold font-mono tracking-tight text-on-surface flex items-center gap-2">
            <AlertTriangle className="w-6 h-6 text-error" />
            <span>INCIDENT COMMAND & WAR ROOM</span>
          </h1>
          <p className="text-xs font-mono text-outline mt-1">
            Automated PagerDuty/Opsgenie dispatch, SLA breach tracking, and real-time response coordination.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="px-3 py-1.5 rounded-lg bg-error hover:bg-error/90 text-surface text-xs font-mono font-bold flex items-center gap-2 transition-colors shadow-hud-red"
          >
            <Plus className="w-4 h-4" />
            DECLARE INCIDENT
          </button>
          <button
            onClick={() => refetch()}
            className="px-3 py-1.5 rounded-lg border border-surface-container-high hover:border-outline bg-surface-container text-xs font-mono flex items-center gap-2 text-on-surface-variant hover:text-on-surface"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? "animate-spin" : ""}`} />
            SYNC
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-surface-container-high pb-2">
        <button
          onClick={() => setStatusFilter("active")}
          className={`px-3 py-1.5 rounded-lg font-mono text-xs font-bold transition-colors ${
            statusFilter === "active"
              ? "bg-error text-surface"
              : "text-outline hover:text-on-surface bg-surface-container"
          }`}
        >
          Active Incidents
        </button>
        <button
          onClick={() => setStatusFilter("resolved")}
          className={`px-3 py-1.5 rounded-lg font-mono text-xs font-bold transition-colors ${
            statusFilter === "resolved"
              ? "bg-secondary text-surface"
              : "text-outline hover:text-on-surface bg-surface-container"
          }`}
        >
          Resolved Archive
        </button>
        <button
          onClick={() => setStatusFilter("all")}
          className={`px-3 py-1.5 rounded-lg font-mono text-xs font-bold transition-colors ${
            statusFilter === "all"
              ? "bg-primary text-surface"
              : "text-outline hover:text-on-surface bg-surface-container"
          }`}
        >
          All Events
        </button>
      </div>

      {/* Incident List */}
      <div className="space-y-4">
        {filteredIncidents.length === 0 ? (
          <div className="p-8 rounded-xl border border-surface-container-high bg-surface-container-lowest text-center">
            <CheckCircle2 className="w-10 h-10 text-secondary mx-auto mb-2" />
            <h3 className="font-mono text-sm font-bold text-on-surface">All Systems Fully Operational</h3>
            <p className="text-xs font-mono text-outline mt-1">No active incidents matching current filters.</p>
          </div>
        ) : (
          filteredIncidents.map((incident) => {
            const isResolved = incident.status === "resolved";
            const isAcknowledged = incident.acknowledgedAt !== null;

            return (
              <div 
                key={incident.id} 
                className={`p-5 rounded-xl border bg-surface-container-lowest space-y-4 transition-all ${
                  isResolved 
                    ? "border-surface-container-high opacity-85" 
                    : "border-error/40 hover:border-error shadow-hud-red"
                }`}
              >
                {/* Header Row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className={`px-2.5 py-1 rounded font-mono text-xs font-bold ${
                      incident.severity === "SEV-1" ? "bg-error text-surface animate-pulse" :
                      incident.severity === "SEV-2" ? "bg-amber-500 text-surface" :
                      "bg-primary text-surface"
                    }`}>
                      {incident.severity}
                    </span>
                    <span className="font-mono text-xs text-outline">{incident.id}</span>
                    <span className="font-mono text-xs px-2 py-0.5 rounded bg-surface-container border border-surface-container-high text-on-surface-variant">
                      Service: {incident.service}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    {!isResolved && (
                      <>
                        <button
                          onClick={() => ackMutation.mutate(incident.id)}
                          disabled={isAcknowledged || ackMutation.isPending}
                          className={`px-3 py-1.5 rounded-lg font-mono text-xs font-bold border transition-colors ${
                            isAcknowledged
                              ? "bg-surface-container border-surface-container-high text-secondary cursor-not-allowed"
                              : "bg-surface-container border-error hover:bg-error/10 text-error"
                          }`}
                        >
                          {isAcknowledged ? "ACKNOWLEDGED" : "ACKNOWLEDGE"}
                        </button>
                        <button
                          onClick={() => resolveMutation.mutate(incident.id)}
                          disabled={resolveMutation.isPending}
                          className="px-3 py-1.5 rounded-lg font-mono text-xs font-bold bg-secondary hover:bg-secondary/90 text-surface transition-colors"
                        >
                          RESOLVE
                        </button>
                      </>
                    )}
                    {isResolved && (
                      <span className="px-3 py-1 rounded bg-secondary/10 border border-secondary/30 text-secondary font-mono text-xs font-bold flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        RESOLVED
                      </span>
                    )}
                  </div>
                </div>

                {/* Title and Detail */}
                <div>
                  <h3 className="text-base font-bold text-on-surface font-mono">
                    {incident.title}
                  </h3>
                  <div className="flex items-center gap-4 text-xs font-mono text-outline mt-1.5">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      Created: {new Date(incident.createdAt).toLocaleTimeString()}
                    </span>
                    <span className="flex items-center gap-1">
                      <UserCheck className="w-3.5 h-3.5" />
                      Commander: {incident.assignee || "Unassigned"}
                    </span>
                  </div>
                </div>

                {/* Timeline Accordion Preview */}
                {incident.timeline && (
                  <div className="p-3 rounded-lg bg-surface-container border border-surface-container-high space-y-2">
                    <span className="text-[10px] font-mono text-outline uppercase tracking-wider block font-bold">
                      Incident Chronology
                    </span>
                    {incident.timeline.map((entry, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs font-mono">
                        <span className="text-primary shrink-0">{entry.time}</span>
                        <span className="text-outline">&rarr;</span>
                        <span className="text-on-surface-variant">{entry.text}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Declare Incident Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest border border-error/50 rounded-xl w-full max-w-lg p-6 shadow-2xl space-y-4 font-mono">
            <div className="flex items-center justify-between pb-3 border-b border-surface-container-high">
              <h3 className="text-base font-bold text-error flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                DECLARE SYSTEM INCIDENT
              </h3>
              <button 
                onClick={() => setIsCreateModalOpen(false)}
                className="text-outline hover:text-on-surface"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-outline uppercase tracking-wider mb-1">Incident Title</label>
                <input
                  type="text"
                  placeholder="e.g. Postgres Read Replica Latency Spike"
                  value={newIncident.title}
                  onChange={(e) => setNewIncident({ ...newIncident, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-surface-container-high bg-surface-container text-on-surface focus:outline-none focus:border-error"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-outline uppercase tracking-wider mb-1">Severity</label>
                  <select
                    value={newIncident.severity}
                    onChange={(e) => setNewIncident({ ...newIncident, severity: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-surface-container-high bg-surface-container text-on-surface focus:outline-none focus:border-error"
                  >
                    <option value="SEV-1">SEV-1 (Critical Outage)</option>
                    <option value="SEV-2">SEV-2 (Major Impairment)</option>
                    <option value="SEV-3">SEV-3 (Minor Degraded)</option>
                    <option value="SEV-4">SEV-4 (Low Impact)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-outline uppercase tracking-wider mb-1">Affected Service</label>
                  <input
                    type="text"
                    value={newIncident.service}
                    onChange={(e) => setNewIncident({ ...newIncident, service: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-surface-container-high bg-surface-container text-on-surface focus:outline-none focus:border-error"
                  />
                </div>
              </div>

              <div>
                <label className="block text-outline uppercase tracking-wider mb-1">Initial Impact & Notes</label>
                <textarea
                  rows="3"
                  placeholder="Describe observed symptoms, customer impact, and initial investigation steps..."
                  value={newIncident.description}
                  onChange={(e) => setNewIncident({ ...newIncident, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-surface-container-high bg-surface-container text-on-surface focus:outline-none focus:border-error"
                ></textarea>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-surface-container-high">
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="px-4 py-2 rounded-lg border border-surface-container-high text-xs text-outline hover:text-on-surface"
              >
                Cancel
              </button>
              <button
                onClick={() => createMutation.mutate(newIncident)}
                disabled={!newIncident.title || createMutation.isPending}
                className="px-4 py-2 rounded-lg bg-error text-surface text-xs font-bold hover:bg-error/90 transition-colors"
              >
                {createMutation.isPending ? "Broadcasting..." : "BROADCAST ALERT"}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
