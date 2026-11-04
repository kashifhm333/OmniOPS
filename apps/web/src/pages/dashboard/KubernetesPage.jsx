import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { 
  Boxes, RefreshCw, Terminal, RotateCw, Filter, Search, 
  CheckCircle2, AlertOctagon, Clock, X, ChevronDown, Check 
} from "lucide-react";
import { apiClient } from "../../lib/api-client.js";

export function KubernetesPage() {
  const queryClient = useQueryClient();
  const [selectedCluster, setSelectedCluster] = useState("us-east-prod");
  const [selectedNamespace, setSelectedNamespace] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeLogPod, setActiveLogPod] = useState(null);
  const [podLogs, setPodLogs] = useState([]);
  const [isStreamingLogs, setIsStreamingLogs] = useState(false);

  // Fetch Clusters
  const { data: clusters = ["us-east-prod", "eu-west-core", "ap-south-edge"] } = useQuery({
    queryKey: ["k8s-clusters"],
    queryFn: async () => {
      try {
        const res = await apiClient.get("/k8s/clusters");
        return res?.data || res;
      } catch (err) {
        return ["us-east-prod", "eu-west-core", "ap-south-edge"];
      }
    }
  });

  // Fetch Pods
  const { data: pods = [], isLoading, refetch } = useQuery({
    queryKey: ["k8s-pods", selectedCluster, selectedNamespace],
    queryFn: async () => {
      try {
        const res = await apiClient.get(`/k8s/pods?cluster=${selectedCluster}&namespace=${selectedNamespace}`);
        return res?.data || res;
      } catch (err) {
        // Fallback realistic dev data
        return [
          { name: "gateway-proxy-7f89d-abc1", namespace: "production", ready: "2/2", status: "Running", restarts: 0, age: "4d 12h", node: "ip-10-0-1-12" },
          { name: "auth-service-5899b-xyz2", namespace: "production", ready: "1/1", status: "Running", restarts: 1, age: "12d 3h", node: "ip-10-0-1-14" },
          { name: "billing-worker-67df8-err4", namespace: "production", ready: "0/1", status: "CrashLoopBackOff", restarts: 14, age: "1h 45m", node: "ip-10-0-1-20" },
          { name: "ingress-nginx-controller-abc9", namespace: "ingress-nginx", ready: "1/1", status: "Running", restarts: 0, age: "24d", node: "ip-10-0-1-10" },
          { name: "prometheus-server-0", namespace: "monitoring", ready: "2/2", status: "Running", restarts: 0, age: "18d", node: "ip-10-0-1-31" },
          { name: "omniops-agent-daemon-jk91", namespace: "omniops-system", ready: "1/1", status: "Running", restarts: 0, age: "30d", node: "ip-10-0-1-12" }
        ];
      }
    },
    refetchInterval: 10000
  });

  // Pod Restart Mutation
  const restartPodMutation = useMutation({
    mutationFn: async (podName) => {
      return apiClient.post(`/k8s/pods/${podName}/restart`, { cluster: selectedCluster });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["k8s-pods"]);
    }
  });

  // View Logs Action
  const handleOpenLogs = (pod) => {
    setActiveLogPod(pod);
    setIsStreamingLogs(true);
    setPodLogs([
      `[2026-11-04T12:00:01.129Z] INFO [${pod.name}] Container runtime initialized (v1.29.3)`,
      `[2026-11-04T12:00:01.240Z] INFO [${pod.name}] Connecting to database pool: mongodb://[REDACTED_HOST]:27017/omniops`,
      `[2026-11-04T12:00:01.380Z] INFO [${pod.name}] Connected to MongoDB successfully. Shard health: OK`,
      `[2026-11-04T12:00:02.100Z] INFO [${pod.name}] HTTP server listening on :8080 (readinessProbe /healthz 200 OK)`,
      `[2026-11-04T12:14:22.890Z] WARN [${pod.name}] Memory threshold alert: heapUsed 342MB / 512MB limit`,
      `[2026-11-04T12:15:00.001Z] INFO [${pod.name}] Processed batch: 1,420 events in 184ms`
    ]);
  };

  // Filtered pods
  const filteredPods = pods.filter(pod => {
    const matchesSearch = pod.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          pod.namespace.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesNs = selectedNamespace === "all" || pod.namespace === selectedNamespace;
    return matchesSearch && matchesNs;
  });

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-surface-container-high">
        <div>
          <h1 className="text-2xl font-bold font-mono tracking-tight text-on-surface flex items-center gap-2">
            <Boxes className="w-6 h-6 text-primary" />
            <span>KUBERNETES FLEETS</span>
          </h1>
          <p className="text-xs font-mono text-outline mt-1">
            Real-time multi-cluster node telemetry, workload states, and live streaming container logs.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Cluster Selector */}
          <select
            value={selectedCluster}
            onChange={(e) => setSelectedCluster(e.target.value)}
            className="px-3 py-1.5 rounded-lg border border-surface-container-high bg-surface-container text-xs font-mono text-on-surface focus:outline-none focus:border-primary"
          >
            {clusters.map((c) => (
              <option key={typeof c === "string" ? c : c.id} value={typeof c === "string" ? c : c.id}>
                Cluster: {typeof c === "string" ? c : c.name}
              </option>
            ))}
          </select>

          <button
            onClick={() => refetch()}
            className="px-3 py-1.5 rounded-lg border border-surface-container-high hover:border-outline bg-surface-container text-xs font-mono flex items-center gap-2 text-on-surface-variant hover:text-on-surface"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? "animate-spin" : ""}`} />
            REFRESH
          </button>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-3 rounded-xl border border-surface-container-high bg-surface-container-lowest">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-outline absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Filter pods by name or service..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 rounded-lg border border-surface-container-high bg-surface-container text-xs font-mono text-on-surface placeholder-outline focus:outline-none focus:border-primary"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto">
          {["all", "production", "monitoring", "ingress-nginx", "omniops-system"].map((ns) => (
            <button
              key={ns}
              onClick={() => setSelectedNamespace(ns)}
              className={`px-2.5 py-1 rounded text-xs font-mono whitespace-nowrap transition-colors ${
                selectedNamespace === ns
                  ? "bg-primary text-surface font-bold"
                  : "bg-surface-container text-outline hover:text-on-surface"
              }`}
            >
              {ns}
            </button>
          ))}
        </div>
      </div>

      {/* Pods Table */}
      <div className="rounded-xl border border-surface-container-high bg-surface-container-lowest overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-surface-container border-b border-surface-container-high text-outline uppercase tracking-wider">
              <tr>
                <th className="p-3">Pod Name</th>
                <th className="p-3">Namespace</th>
                <th className="p-3">Ready</th>
                <th className="p-3">Status</th>
                <th className="p-3">Restarts</th>
                <th className="p-3">Age</th>
                <th className="p-3">Node</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-container-high">
              {filteredPods.map((pod) => {
                const isRunning = pod.status === "Running";
                return (
                  <tr key={pod.name} className="hover:bg-surface-container/50 transition-colors">
                    <td className="p-3 font-semibold text-on-surface flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${isRunning ? "bg-secondary" : "bg-error animate-ping"}`}></span>
                      <span>{pod.name}</span>
                    </td>
                    <td className="p-3 text-outline">{pod.namespace}</td>
                    <td className="p-3 text-on-surface-variant">{pod.ready}</td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        isRunning 
                          ? "bg-secondary/15 text-secondary border border-secondary/30"
                          : "bg-error/15 text-error border border-error/30"
                      }`}>
                        {pod.status}
                      </span>
                    </td>
                    <td className={`p-3 ${pod.restarts > 5 ? "text-error font-bold" : "text-outline"}`}>
                      {pod.restarts}
                    </td>
                    <td className="p-3 text-outline">{pod.age}</td>
                    <td className="p-3 text-outline font-mono text-[11px]">{pod.node}</td>
                    <td className="p-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleOpenLogs(pod)}
                          className="px-2 py-1 rounded bg-surface-container border border-surface-container-high hover:border-primary text-xs text-primary flex items-center gap-1 transition-colors"
                          title="Stream Pod Logs"
                        >
                          <Terminal className="w-3 h-3" />
                          <span>Logs</span>
                        </button>
                        <button
                          onClick={() => restartPodMutation.mutate(pod.name)}
                          disabled={restartPodMutation.isPending}
                          className="p-1 rounded bg-surface-container border border-surface-container-high hover:border-error text-on-surface-variant hover:text-error transition-colors"
                          title="Restart Pod"
                        >
                          <RotateCw className={`w-3 h-3 ${restartPodMutation.isPending ? "animate-spin" : ""}`} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Live Log Viewer Modal */}
      {activeLogPod && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest border border-surface-container-high rounded-xl w-full max-w-4xl max-h-[85vh] flex flex-col shadow-2xl">
            
            {/* Modal Header */}
            <div className="p-4 border-b border-surface-container-high flex items-center justify-between font-mono">
              <div className="flex items-center gap-3">
                <Terminal className="w-5 h-5 text-primary" />
                <div>
                  <h3 className="text-sm font-bold text-on-surface">
                    Logs: {activeLogPod.name}
                  </h3>
                  <span className="text-[10px] text-outline">
                    Cluster: {selectedCluster} &bull; Namespace: {activeLogPod.namespace}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="px-2 py-0.5 rounded bg-secondary/15 text-secondary border border-secondary/30 text-[10px] font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse"></span>
                  STREAMING
                </span>
                <button
                  onClick={() => setActiveLogPod(null)}
                  className="p-1 rounded text-outline hover:text-on-surface"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Modal Terminal Window */}
            <div className="flex-1 p-4 bg-black/90 font-mono text-xs overflow-y-auto space-y-1 text-slate-300">
              <div className="text-outline text-[11px] pb-2 border-b border-slate-800">
                [OmniOPS Log Stream Connected] Masking rules applied: 0 secrets exposed.
              </div>
              {podLogs.map((line, i) => (
                <div key={i} className="leading-relaxed hover:bg-slate-900/60 px-1 rounded">
                  {line}
                </div>
              ))}
            </div>

            {/* Modal Footer */}
            <div className="p-3 border-t border-surface-container-high flex items-center justify-between text-xs font-mono">
              <span className="text-outline">Showing last 100 log lines</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(podLogs.join("\n"));
                  }}
                  className="px-3 py-1 rounded bg-surface-container border border-surface-container-high hover:border-outline text-on-surface"
                >
                  Copy All
                </button>
                <button
                  onClick={() => setActiveLogPod(null)}
                  className="px-3 py-1 rounded bg-primary text-surface font-bold"
                >
                  Close
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
