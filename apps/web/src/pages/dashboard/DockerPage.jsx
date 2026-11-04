import React, { useState } from "react";
import { 
  Server, Play, Square, ShieldCheck 
} from "lucide-react";
import { 
  PageHeader, Card, Table, TableHeader, TableRow, 
  TableHead, TableCell, Badge, Button, IconButton 
} from "../../components/ui/index.js";

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

  const activeCount = containers.filter(c => c.state === "running").length;

  return (
    <div className="space-y-6">
      <PageHeader
        title="CONTAINER ENGINE ORCHESTRATION"
        description="Local & remote Docker daemon socket inspection, runtime health, and resource isolation."
        icon={Server}
        actions={
          <Badge variant="neutral">
            Docker Engine <span className="text-primary font-bold ml-1">v29.9.2</span>
          </Badge>
        }
      />

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card accent="emerald" className="p-4">
          <span className="text-xs font-mono text-outline">RUNNING CONTAINERS</span>
          <div className="text-2xl font-bold font-mono text-secondary mt-1">
            {activeCount} Active
          </div>
        </Card>
        <Card accent="cyan" className="p-4">
          <span className="text-xs font-mono text-outline">TOTAL MEMORY ALLOCATED</span>
          <div className="text-2xl font-bold font-mono text-on-surface mt-1">
            258 MB / 16 GB
          </div>
        </Card>
        <Card accent="emerald" className="p-4">
          <span className="text-xs font-mono text-outline">VULNERABILITY SCAN</span>
          <div className="text-2xl font-bold font-mono text-secondary mt-1 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-secondary" />
            <span>0 CRITICAL CVEs</span>
          </div>
        </Card>
      </div>

      {/* Containers Table */}
      <Card className="overflow-hidden p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Container ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Image</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Ports</TableHead>
              <TableHead>CPU / Mem</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <tbody>
            {containers.map((c) => {
              const isRunning = c.state === "running";
              return (
                <TableRow key={c.id}>
                  <TableCell className="text-primary font-bold">{c.id}</TableCell>
                  <TableCell className="font-semibold text-on-surface">{c.name}</TableCell>
                  <TableCell className="text-outline">{c.image}</TableCell>
                  <TableCell>
                    <Badge variant={isRunning ? "success" : "neutral"} dot={isRunning}>
                      {c.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-outline">{c.ports}</TableCell>
                  <TableCell className="text-on-surface-variant">{c.cpu} / {c.mem}</TableCell>
                  <TableCell className="text-right">
                    <IconButton
                      variant={isRunning ? "destructive" : "secondary"}
                      size="sm"
                      icon={isRunning ? Square : Play}
                      onClick={() => toggleContainer(c.id)}
                      title={isRunning ? "Stop container" : "Start container"}
                      ariaLabel={isRunning ? "Stop container" : "Start container"}
                    />
                  </TableCell>
                </TableRow>
              );
            })}
          </tbody>
        </Table>
      </Card>
    </div>
  );
}
