import React, { useState } from "react";
import { 
  GitBranch, Play, CheckCircle2, XCircle, Clock, 
  RotateCw, GitCommit, User 
} from "lucide-react";
import { PageHeader, Card, Badge, Button } from "../../components/ui/index.js";

export function CicdPage() {
  const [isTriggering, setIsTriggering] = useState(false);

  const initialPipelines = [
    {
      id: "run-1092",
      repo: "omniops/core-api",
      branch: "main",
      commit: "7e9a4f2",
      message: "feat(auth): add device grant flow for CLI pairing",
      author: "sarah.chen",
      status: "SUCCESS",
      duration: "3m 42s",
      startedAt: "18m ago",
      stages: [
        { name: "Lint & Format", status: "passed", duration: "18s" },
        { name: "Unit Tests", status: "passed", duration: "45s" },
        { name: "Docker Build", status: "passed", duration: "1m 12s" },
        { name: "Trivy CVE Scan", status: "passed", duration: "32s" },
        { name: "Deploy Prod", status: "passed", duration: "55s" }
      ]
    },
    {
      id: "run-1091",
      repo: "omniops/web-dashboard",
      branch: "release-v1.4",
      commit: "4b81c20",
      message: "fix(theme): eliminate flash of unstyled content on toggle",
      author: "alex.kumar",
      status: "RUNNING",
      duration: "1m 20s",
      startedAt: "2m ago",
      stages: [
        { name: "Lint & Format", status: "passed", duration: "12s" },
        { name: "Unit Tests", status: "passed", duration: "34s" },
        { name: "Docker Build", status: "running", duration: "34s" },
        { name: "Trivy CVE Scan", status: "pending", duration: "-" },
        { name: "Deploy Prod", status: "pending", duration: "-" }
      ]
    },
    {
      id: "run-1090",
      repo: "omniops/cli",
      branch: "fix-keychain-fallback",
      commit: "91d37a8",
      message: "fix(cli): gracefully fall back to file storage when keytar fails",
      author: "devops-team",
      status: "FAILED",
      duration: "1m 05s",
      startedAt: "1h ago",
      stages: [
        { name: "Lint & Format", status: "passed", duration: "15s" },
        { name: "Unit Tests", status: "failed", duration: "50s" },
        { name: "Docker Build", status: "skipped", duration: "-" },
        { name: "Trivy CVE Scan", status: "skipped", duration: "-" },
        { name: "Deploy Prod", status: "skipped", duration: "-" }
      ]
    }
  ];

  const [pipelines, setPipelines] = useState(initialPipelines);

  const handleTriggerPipeline = () => {
    setIsTriggering(true);
    setTimeout(() => {
      const newRun = {
        id: `run-${Date.now().toString().slice(-4)}`,
        repo: "omniops/core-api",
        branch: "main",
        commit: "a09df1c",
        message: "Manual trigger: production sync",
        author: "admin (you)",
        status: "RUNNING",
        duration: "0m 10s",
        startedAt: "Just now",
        stages: [
          { name: "Lint & Format", status: "running", duration: "10s" },
          { name: "Unit Tests", status: "pending", duration: "-" },
          { name: "Docker Build", status: "pending", duration: "-" },
          { name: "Trivy CVE Scan", status: "pending", duration: "-" },
          { name: "Deploy Prod", status: "pending", duration: "-" }
        ]
      };
      setPipelines([newRun, ...pipelines]);
      setIsTriggering(false);
    }, 600);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="CONTINUOUS INTEGRATION & DELIVERY"
        description="Automated quality gates, container image vulnerability scanning, and zero-downtime rollouts."
        icon={GitBranch}
        actions={
          <Button
            variant="primary"
            onClick={handleTriggerPipeline}
            disabled={isTriggering}
            icon={Play}
          >
            {isTriggering ? "DISPATCHING..." : "TRIGGER PIPELINE"}
          </Button>
        }
      />

      {/* Pipeline Cards */}
      <div className="space-y-4">
        {pipelines.map((run) => {
          const isSuccess = run.status === "SUCCESS";
          const isRunning = run.status === "RUNNING";
          const isFailed = run.status === "FAILED";

          return (
            <Card key={run.id} className="p-5 space-y-4 hover:border-outline/50 transition-colors">
              {/* Top Row */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <Badge 
                    variant={isSuccess ? "success" : isRunning ? "primary" : "danger"} 
                    dot={isRunning}
                  >
                    {isSuccess && <CheckCircle2 className="w-3.5 h-3.5 mr-1" />}
                    {isRunning && <RotateCw className="w-3.5 h-3.5 animate-spin mr-1" />}
                    {isFailed && <XCircle className="w-3.5 h-3.5 mr-1" />}
                    {run.status}
                  </Badge>
                  <span className="font-mono text-sm font-bold text-on-surface">{run.repo}</span>
                  <span className="font-mono text-xs text-outline flex items-center gap-1">
                    <GitBranch className="w-3 h-3 text-tertiary" />
                    {run.branch}
                  </span>
                </div>

                <div className="flex items-center gap-4 text-xs font-mono text-outline">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {run.duration}
                  </span>
                  <span>{run.startedAt}</span>
                </div>
              </div>

              {/* Commit info */}
              <div className="flex items-center gap-3 text-xs font-mono">
                <span className="px-2 py-0.5 rounded bg-surface-container text-primary font-bold flex items-center gap-1 border border-surface-container-high">
                  <GitCommit className="w-3 h-3" />
                  {run.commit}
                </span>
                <span className="text-on-surface flex-1 truncate">{run.message}</span>
                <span className="text-outline flex items-center gap-1 shrink-0">
                  <User className="w-3 h-3" />
                  {run.author}
                </span>
              </div>

              {/* Pipeline Stages */}
              <div className="pt-2 border-t border-surface-container-high grid grid-cols-2 sm:grid-cols-5 gap-2">
                {run.stages.map((stage, idx) => {
                  const stageSuccess = stage.status === "passed";
                  const stageRunning = stage.status === "running";
                  const stageFailed = stage.status === "failed";

                  return (
                    <div 
                      key={idx}
                      className={`p-2.5 rounded-lg border text-xs font-mono transition-colors ${
                        stageSuccess ? "bg-secondary/10 border-secondary/30 text-secondary" :
                        stageRunning ? "bg-primary/10 border-primary/40 text-primary animate-pulse" :
                        stageFailed ? "bg-error/10 border-error/30 text-error" :
                        "bg-surface-container border-surface-container-high text-outline"
                      }`}
                    >
                      <div className="flex items-center justify-between font-bold">
                        <span className="truncate">{stage.name}</span>
                        {stageSuccess && <CheckCircle2 className="w-3 h-3 shrink-0" />}
                        {stageRunning && <RotateCw className="w-3 h-3 animate-spin shrink-0" />}
                        {stageFailed && <XCircle className="w-3 h-3 shrink-0" />}
                      </div>
                      <div className="text-[10px] opacity-75 mt-1">{stage.duration}</div>
                    </div>
                  );
                })}
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
