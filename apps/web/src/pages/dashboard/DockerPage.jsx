import React, { useState } from "react";
import { 
  Server, Play, Square, RotateCw, Terminal, 
  ShieldCheck, AlertTriangle, RefreshCw, Cpu 
} from "lucide-react";

export function DockerPage() {
  const [containers, setContainers] = useState([
    { id: "c18df9a80e", name: "omniops-mongo-dev", image: "mongo:6.0", status: "Up 12 minutes", state: "running", ports: "27017:27017", cpu: "1.2%", mem: "142 MB" },
    { id: "a49cb712e0", name: "omniops-api-gateway", image: "node:22-alpine", status: "Up 4 hours", state: "running", ports: "4000:4000", cpu: "0.8%", mem: "84 MB" },
    { id: "f091c349d1", name: "omniops-redis-cache", image: "redis:7-alpine", status: "Up 2 days", state: "running", ports: "6379:6379", cpu: "0.2%", mem: "32 MB" },
    { id: "d88b4301ef", name: "worker-batch-runner", image: "omniops/worker:v1.2", status: "Exited (0) 3 hours ago", state: "stopped", ports: "-", cpu: "0.0%", mem: "0 MB" }
  ]);

  const toggleContainer = (id) => {
    setContainers(prev => prev.map(c => {
      if (c.id === id) {
        const isRunning = c.state === "running";
        return {
          ...c,
          state: isRunning ? "stopped" : "running",
          status: isRunning ? "Exited (0) Just now" : "Up 2 seconds",
          cpu: isRunning ? "0.0%" : "0.5%",
          mem: isRunning ? "0 MB" : "45 MB"
        };
      }
      return c;
    }));
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-surface-container-high">
        <div>
          <h1 className="text-2xl font-bold font-mono tracking-tight text-on-surface flex items-center gap-2">
            <Server className="w-6 h-6 text-primary" />
            <span>CONTAINER ENGINE ORCHESTRATION</span>
          </h1>
          <p className="text-xs font-mono text-outline mt-1">
            Local & remote Docker daemon socket inspection, runtime health, and resource isolation.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-3 py-1.5 rounded-lg bg-surface-container border border-surface-container-high text-xs font-mono text-outline">
            Docker Engine <span className="text-primary font-bold">v29.9.2</span>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl border border-surface-container-high bg-surface-container-lowest">
          <span className="text-xs font-mono text-outline">RUNNING CONTAINERS</span>
          <div className="text-2xl font-bold font-mono text-secondary mt-1">
            {containers.filter(c => c.state === "running").length} Active
          </div>
        </div>
        <div className="p-4 rounded-xl border border-surface-container-high bg-surface-container-lowest">
          <span className="text-xs font-mono text-outline">TOTAL MEMORY ALLOCATED</span>
          <div className="text-2xl font-bold font-mono text-on-surface mt-1">
            258 MB / 16 GB
          </div>
        </div>
        <div className="p-4 rounded-xl border border-surface-container-high bg-surface-container-lowest">
          <span className="text-xs font-mono text-outline">VULNERABILITY SCAN</span>
          <div className="text-2xl font-bold font-mono text-secondary mt-1 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-secondary" />
            <span>0 CRITICAL CVEs</span>
          </div>
        </div>
      </div>

      {/* Containers Table */}
      <div className="rounded-xl border border-surface-container-high bg-surface-container-lowest overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-surface-container border-b border-surface-container-high text-outline uppercase tracking-wider">
              <tr>
                <th className="p-3">Container ID</th>
                <th className="p-3">Name</th>
                <th className="p-3">Image</th>
                <th className="p-3">Status</th>
                <th className="p-3">Ports</th>
                <th className="p-3">CPU / Mem</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-container-high">
              {containers.map((c) => {
                const isRunning = c.state === "running";
                return (
                  <tr key={c.id} className="hover:bg-surface-container/50 transition-colors">
                    <td className="p-3 text-primary font-bold">{c.id}</td>
                    <td className="p-3 font-semibold text-on-surface">{c.name}</td>
                    <td className="p-3 text-outline">{c.image}</td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        isRunning 
                          ? "bg-secondary/15 text-secondary border border-secondary/30"
                          : "bg-surface-container text-outline border border-surface-container-high"
                      }`}>
                        {c.status}
                      </span>
                    </td>
                    <td className="p-3 text-outline">{c.ports}</td>
                    <td className="p-3 text-on-surface-variant">{c.cpu} / {c.mem}</td>
                    <td className="p-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => toggleContainer(c.id)}
                          className={`p-1.5 rounded transition-colors ${
                            isRunning 
                              ? "bg-surface-container border border-error/40 hover:bg-error/10 text-error"
                              : "bg-secondary text-surface"
                          }`}
                          title={isRunning ? "Stop container" : "Start container"}
                        >
                          {isRunning ? <Square className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
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

    </div>
  );
}
