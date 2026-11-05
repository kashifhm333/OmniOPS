import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { 
  AlertTriangle, CheckCircle2, Clock, ShieldAlert, Plus, 
  MessageSquare, UserCheck, RefreshCw, X, Radio, ArrowRight
} from "lucide-react";
import { apiClient } from "../../lib/api-client.js";
import { 
  PageHeader, Card, Badge, Button, Modal, 
  Input, Textarea, Select, StatusPip, EmptyState 
} from "../../components/ui/index.js";

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
      <PageHeader
        title="INCIDENT COMMAND & WAR ROOM"
        icon={AlertTriangle}
        description="Automated PagerDuty/Opsgenie dispatch, SLA breach tracking, and real-time response coordination."
        actions={
          <>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => setIsCreateModalOpen(true)}
            >
              <Plus className="w-4 h-4" />
              DECLARE INCIDENT
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => refetch()}
              isLoading={isLoading}
            >
              <RefreshCw className="w-3.5 h-3.5" />
              SYNC
            </Button>
          </>
        }
      />

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-surface-container-high pb-2">
        <button
          onClick={() => setStatusFilter("active")}
          className={`px-3 py-1.5 rounded font-mono text-xs font-bold transition-colors ${
            statusFilter === "active"
              ? "bg-error text-surface"
              : "text-outline hover:text-on-surface bg-surface-container"
          }`}
        >
          Active Incidents
        </button>
        <button
          onClick={() => setStatusFilter("resolved")}
          className={`px-3 py-1.5 rounded font-mono text-xs font-bold transition-colors ${
            statusFilter === "resolved"
              ? "bg-secondary text-surface"
              : "text-outline hover:text-on-surface bg-surface-container"
          }`}
        >
          Resolved Archive
        </button>
        <button
          onClick={() => setStatusFilter("all")}
          className={`px-3 py-1.5 rounded font-mono text-xs font-bold transition-colors ${
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
          <EmptyState
            icon={CheckCircle2}
            title="All Systems Fully Operational"
            description="Zero active incidents matching current filter criteria."
          />
        ) : (
          filteredIncidents.map((incident) => {
            const isResolved = incident.status === "resolved";
            const isAcknowledged = incident.acknowledgedAt !== null;

            return (
              <Card 
                key={incident.id}
                accent={isResolved ? null : (incident.severity === "SEV-1" || incident.severity === "SEV-2" ? "red" : "cyan")}
                className={`p-5 space-y-4 ${
                  isResolved ? "opacity-85" : "shadow-hud-red"
                }`}
              >
                {/* Header Row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <Badge 
                      variant={incident.severity === "SEV-1" ? "critical" : incident.severity === "SEV-2" ? "warning" : "primary"}
                      size="md"
                    >
                      {incident.severity}
                    </Badge>
                    <span className="font-mono text-xs text-outline">{incident.id}</span>
                    <Badge variant="neutral" size="sm">
                      Service: {incident.service}
                    </Badge>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    {!isResolved && (
                      <>
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => ackMutation.mutate(incident.id)}
                          disabled={isAcknowledged || ackMutation.isPending}
                        >
                          {isAcknowledged ? "ACKNOWLEDGED" : "ACKNOWLEDGE"}
                        </Button>
                        <Button
                          variant="secondary"
                          size="sm"
                          className="bg-secondary text-surface hover:bg-secondary/90 border-0"
                          onClick={() => resolveMutation.mutate(incident.id)}
                          disabled={resolveMutation.isPending}
                        >
                          RESOLVE
                        </Button>
                      </>
                    )}
                    {isResolved && (
                      <Badge variant="healthy" size="md">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        RESOLVED
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Title and Detail */}
                <div>
                  <h3 className="text-base font-bold text-on-surface">
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
                  <div className="p-3 rounded bg-surface-container border border-surface-container-high space-y-2">
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
              </Card>
            );
          })
        )}
      </div>

      {/* Declare Incident Modal */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="DECLARE SYSTEM INCIDENT"
        icon={AlertTriangle}
        maxWidth="max-w-lg"
      >
        <div className="space-y-4 font-mono text-xs">
          <div>
            <label className="block text-outline uppercase tracking-wider mb-1">Incident Title</label>
            <Input
              type="text"
              placeholder="e.g. Postgres Read Replica Latency Spike"
              value={newIncident.title}
              onChange={(e) => setNewIncident({ ...newIncident, title: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-outline uppercase tracking-wider mb-1">Severity</label>
              <Select
                value={newIncident.severity}
                onChange={(e) => setNewIncident({ ...newIncident, severity: e.target.value })}
                className="w-full"
              >
                <option value="SEV-1">SEV-1 (Critical Outage)</option>
                <option value="SEV-2">SEV-2 (Major Impairment)</option>
                <option value="SEV-3">SEV-3 (Minor Degraded)</option>
                <option value="SEV-4">SEV-4 (Low Impact)</option>
              </Select>
            </div>

            <div>
              <label className="block text-outline uppercase tracking-wider mb-1">Affected Service</label>
              <Input
                type="text"
                value={newIncident.service}
                onChange={(e) => setNewIncident({ ...newIncident, service: e.target.value })}
              />
            </div>
          </div>

          <div>
            <label className="block text-outline uppercase tracking-wider mb-1">Initial Impact & Notes</label>
            <Textarea
              rows={3}
              placeholder="Describe observed symptoms, customer impact, and initial investigation steps..."
              value={newIncident.description}
              onChange={(e) => setNewIncident({ ...newIncident, description: e.target.value })}
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-surface-container-high">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsCreateModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => createMutation.mutate(newIncident)}
              disabled={!newIncident.title || createMutation.isPending}
              isLoading={createMutation.isPending}
            >
              BROADCAST ALERT
            </Button>
          </div>
        </div>
      </Modal>

    </div>
  );
}
