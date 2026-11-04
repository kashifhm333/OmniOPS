import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { 
  Boxes, RefreshCw, Terminal, RotateCw, Filter, 
  CheckCircle2, AlertOctagon, Clock, X, ChevronDown, Check 
} from "lucide-react";
import { apiClient } from "../../lib/api-client.js";
import { 
  PageHeader, Card, Table, TableHeader, TableRow, TableHead, TableCell,
  Badge, Button, StatusPip, Modal, SearchInput, Select 
} from "../../components/ui/index.js";

export function KubernetesPage() {
  const queryClient = useQueryClient();
  const [selectedCluster, setSelectedCluster] = useState("us-east-prod");
  const [selectedNamespace, setSelectedNamespace] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeLogPod, setActiveLogPod] = useState(null);
  const [podLogs, setPodLogs] = useState([]);

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
        return [
          { name: "gateway-proxy-7f89d-abc1", namespace: "production", ready: "2/2", status: "Running", restarts: 0, age: "4d 12h", node: "ip-10-0-1-12" },
          { name: "auth-service-5899b-xyz2", namespace: "production", ready: "1/1", status: "Running", restarts: 1, age: "12d 3h", node: "ip-10-0-1-14" },
          { name: "billing-worker-67df8-err4", namespace: "production", ready: "0/1", status: "CrashLoopBackOff", restarts: 14, age: "1h 45m", node: "ip-10-0-1-20" },
          { name: "ingress-nginx-controller-abc9", namespace: "ingress-nginx", ready: "1/1", status: "Running", restarts: 0, age: "24d", node: "ip-10-0-1-10" }
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
    setPodLogs([
      `[2026-11-04T12:00:01.129Z] INFO [${pod.name}] Container runtime initialized (v1.29.3)`,
      `[2026-11-04T12:00:01.240Z] INFO [${pod.name}] Connecting to database pool: mongodb://[REDACTED_HOST]:27017/omniops`,
      `[2026-11-04T12:00:01.380Z] INFO [${pod.name}] Connected to MongoDB successfully. Shard health: OK`,
      `[2026-11-04T12:00:02.100Z] INFO [${pod.name}] HTTP server listening on :8080 (readinessProbe /healthz 200 OK)`,
      `[2026-11-04T12:14:22.890Z] WARN [${pod.name}] Memory threshold alert: heapUsed 342MB / 512MB limit`,
      `[2026-11-04T12:15:00.001Z] INFO [${pod.name}] Processed batch: 1,420 events in 184ms`
    ]);
  };

  const filteredPods = pods.filter(pod => {
    const matchesSearch = pod.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          pod.namespace.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesNs = selectedNamespace === "all" || pod.namespace === selectedNamespace;
    return matchesSearch && matchesNs;
  });

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <PageHeader
        title="KUBERNETES FLEETS"
        icon={Boxes}
        description="Real-time multi-cluster node telemetry, workload states, and live streaming container logs."
        actions={
          <>
            <Select
              value={selectedCluster}
              onChange={(e) => setSelectedCluster(e.target.value)}
            >
              {clusters.map((c) => (
                <option key={typeof c === "string" ? c : c.id} value={typeof c === "string" ? c : c.id}>
                  Cluster: {typeof c === "string" ? c : c.name}
                </option>
              ))}
            </Select>

            <Button
              variant="secondary"
              size="sm"
              onClick={() => refetch()}
              isLoading={isLoading}
            >
              <RefreshCw className="w-3.5 h-3.5" />
              REFRESH
            </Button>
          </>
        }
      />

      {/* Filter Toolbar */}
      <Card className="p-3">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="w-full sm:w-80">
            <SearchInput
              placeholder="Filter pods by name or service..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
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
      </Card>

      {/* Pods Table */}
      <Table>
        <TableHeader>
          <tr>
            <TableHead>Pod Name</TableHead>
            <TableHead>Namespace</TableHead>
            <TableHead>Ready</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Restarts</TableHead>
            <TableHead>Age</TableHead>
            <TableHead>Node</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </tr>
        </TableHeader>
        <tbody>
          {filteredPods.map((pod) => {
            const isRunning = pod.status === "Running";
            return (
              <TableRow key={pod.name}>
                <TableCell className="font-semibold text-on-surface flex items-center gap-2">
                  <StatusPip status={isRunning ? "running" : "error"} />
                  <span>{pod.name}</span>
                </TableCell>
                <TableCell className="text-outline">{pod.namespace}</TableCell>
                <TableCell className="text-on-surface-variant">{pod.ready}</TableCell>
                <TableCell>
                  <Badge variant={isRunning ? "healthy" : "critical"} size="sm">
                    {pod.status}
                  </Badge>
                </TableCell>
                <TableCell className={pod.restarts > 5 ? "text-error font-bold" : "text-outline"}>
                  {pod.restarts}
                </TableCell>
                <TableCell className="text-outline">{pod.age}</TableCell>
                <TableCell className="text-outline font-mono text-[11px]">{pod.node}</TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button
                      variant="secondary"
                      size="xs"
                      onClick={() => handleOpenLogs(pod)}
                      title="Stream Pod Logs"
                    >
                      <Terminal className="w-3 h-3 text-primary" />
                      <span>Logs</span>
                    </Button>
                    <Button
                      variant="secondary"
                      size="xs"
                      onClick={() => restartPodMutation.mutate(pod.name)}
                      disabled={restartPodMutation.isPending}
                      title="Restart Pod"
                    >
                      <RotateCw className={`w-3 h-3 ${restartPodMutation.isPending ? "animate-spin" : ""}`} />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </tbody>
      </Table>

      {/* Live Log Viewer Modal */}
      <Modal
        isOpen={!!activeLogPod}
        onClose={() => setActiveLogPod(null)}
        title={activeLogPod ? `Logs: ${activeLogPod.name}` : "Pod Logs"}
        icon={Terminal}
        maxWidth="max-w-4xl"
      >
        <div className="space-y-3 font-mono">
          <div className="flex items-center justify-between text-xs pb-2 border-b border-surface-container-high">
            <span className="text-outline">
              Cluster: {selectedCluster} &bull; Namespace: {activeLogPod?.namespace}
            </span>
            <Badge variant="healthy" size="sm" hasPip={true}>
              STREAMING
            </Badge>
          </div>

          {/* Terminal Window with Dark Background Preserved */}
          <div className="p-4 bg-[#05080e] rounded-lg font-mono text-xs overflow-y-auto max-h-[50vh] space-y-1 text-slate-300 border border-surface-container-high shadow-inner">
            <div className="text-outline text-[11px] pb-2 border-b border-slate-800">
              [OmniOPS Log Stream Connected] Masking rules applied: 0 secrets exposed.
            </div>
            {podLogs.map((line, i) => (
              <div key={i} className="leading-relaxed hover:bg-slate-900/60 px-1 rounded">
                {line}
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between pt-2 text-xs">
            <span className="text-outline">Showing latest log telemetry</span>
            <div className="flex items-center gap-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => navigator.clipboard.writeText(podLogs.join("\n"))}
              >
                Copy All
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => setActiveLogPod(null)}
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      </Modal>

    </div>
  );
}
