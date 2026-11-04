import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { 
  GitBranch, Play, CheckCircle2, XCircle, Clock, 
  ExternalLink, RotateCw, GitCommit, User, ShieldCheck
} from "lucide-react";
import { apiClient } from "../../lib/api-client.js";

export function CicdPage() {
  const queryClient = useQueryClient();
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
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-surface-container-high">
        <div>
          <h1 className="text-2xl font-bold font-mono tracking-tight text-on-surface flex items-center gap-2">
            <GitBranch className="w-6 h-6 text-tertiary" />
            <span>CONTINUOUS INTEGRATION & DELIVERY</span>
          </h1>
          <p className="text-xs font-mono text-outline mt-1">
            Automated quality gates, container image vulnerability scanning, and zero-downtime rollouts.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleTriggerPipeline}
            disabled={isTriggering}
            className="px-3 py-1.5 rounded-lg bg-tertiary hover:bg-tertiary/90 text-surface text-xs font-mono font-bold flex items-center gap-2 transition-colors shadow-hud-cyan"
          >
            <Play className={`w-3.5 h-3.5 ${isTriggering ? "animate-spin" : ""}`} />
            {isTriggering ? "DISPATCHING..." : "TRIGGER PIPELINE"}
          </button>
        </div>
      </div>

      {/* Pipeline Cards */}
      <div className="space-y-4">
        {pipelines.map((run) => {
          const isSuccess = run.status === "SUCCESS";
          const isRunning = run.status === "RUNNING";
          const isFailed = run.status === "FAILED";

          return (
            <div 
              key={run.id}
              className="p-5 rounded-xl border border-surface-container-high bg-surface-container-lowest space-y-4 hover:border-outline/50 transition-colors"
            >
              {/* Top Row */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className={`px-2.5 py-1 rounded font-mono text-xs font-bold flex items-center gap-1.5 ${
                    isSuccess ? "bg-secondary/15 text-secondary border border-secondary/30" :
                    isRunning ? "bg-primary/15 text-primary border border-primary/30 animate-pulse" :
                    "bg-error/15 text-error border border-error/30"
                  }`}>
                    {isSuccess && <CheckCircle2 className="w-3.5 h-3.5" />}
                    {isRunning && <RotateCw className="w-3.5 h-3.5 animate-spin" />}
                    {isFailed && <XCircle className="w-3.5 h-3.5" />}
                    {run.status}
                  </span>

                  <span className="font-mono text-xs font-bold text-on-surface">{run.repo}</span>
                  <span className="font-mono text-xs px-2 py-0.5 rounded bg-surface-container text-outline">
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
              <div className="flex items-center gap-2 text-xs font-mono">
                <GitCommit className="w-3.5 h-3.5 text-primary" />
                <span className="text-primary font-semibold">{run.commit}</span>
                <span className="text-on-surface font-medium truncate">{run.message}</span>
                <span className="text-outline ml-auto hidden md:inline">by {run.author}</span>
              </div>

              {/* Stages Visualizer */}
              <div className="pt-2 border-t border-surface-container-high">
                <span className="text-[10px] font-mono text-outline uppercase tracking-wider block mb-2">
                  Pipeline Stages
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                  {run.stages.map((stg, i) => (
                    <div 
                      key={i}
                      className={`p-2 rounded-lg border text-xs font-mono flex flex-col justify-between ${
                        stg.status === "passed" ? "bg-secondary/5 border-secondary/20 text-on-surface" :
                        stg.status === "running" ? "bg-primary/10 border-primary text-primary" :
                        stg.status === "failed" ? "bg-error/10 border-error text-error" :
                        "bg-surface-container border-surface-container-high text-outline"
                      }`}
                    >
                      <div className="flex items-center justify-between text-[11px] mb-1">
                        <span className="font-semibold truncate">{stg.name}</span>
                        {stg.status === "passed" && <CheckCircle2 className="w-3 h-3 text-secondary shrink-0" />}
                        {stg.status === "running" && <RotateCw className="w-3 h-3 animate-spin shrink-0" />}
                        {stg.status === "failed" && <XCircle className="w-3 h-3 text-error shrink-0" />}
                      </div>
                      <span className="text-[10px] text-outline">{stg.duration}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
}
