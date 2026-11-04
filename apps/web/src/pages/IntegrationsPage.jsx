import React from "react";
import { Link } from "react-router-dom";
import { Boxes, Server, GitBranch, Layers, Activity, Cloud, ArrowRight, ShieldCheck } from "lucide-react";

export function IntegrationsPage() {
  const integrations = [
    {
      name: "Kubernetes Fleets",
      category: "Container Orchestration",
      icon: Boxes,
      color: "text-primary",
      desc: "Connect multi-cloud Kubernetes clusters with scoped read-only ServiceAccounts. Stream pod logs, monitor restarts, and track namespace quotas.",
      status: "Supported (MVP)",
      authType: "Kubeconfig / In-Cluster ServiceAccount"
    },
    {
      name: "GitHub Workflows",
      category: "Source Control & CI",
      icon: GitBranch,
      color: "text-secondary",
      desc: "Synchronize repositories, review PR build check statuses, and receive deployment webhook events with HMAC signature verification.",
      status: "Supported (MVP)",
      authType: "GitHub App / Webhook Secret"
    },
    {
      name: "Docker Registries",
      category: "Image Repositories",
      icon: Server,
      color: "text-primary",
      desc: "Catalog Docker Hub, AWS ECR, and private registries. Inspect image manifests, layers, and vulnerability scan CVE classifications.",
      status: "Supported (MVP)",
      authType: "Registry V2 Token / Basic Auth (AES Encrypted)"
    },
    {
      name: "Prometheus & CloudWatch",
      category: "Infrastructure Monitoring",
      icon: Activity,
      color: "text-amber-400",
      desc: "Ingestion proxies for metrics telemetry. Graph CPU, memory, network, and disk I/O with automated threshold anomaly detection.",
      status: "Supported (MVP)",
      authType: "PromQL HTTP API / AWS IAM Role"
    },
    {
      name: "AWS Cloud Governance",
      category: "Cloud Provider",
      icon: Cloud,
      color: "text-tertiary",
      desc: "Multi-region asset inventory across EC2, RDS, and EKS. Daily cost expenditure analysis and unattached volume cleanup alerts.",
      status: "Phase 4 (Planned)",
      authType: "Cross-Account IAM AssumeRole"
    },
    {
      name: "Terraform Cloud & IaC",
      category: "Infrastructure as Code",
      icon: Layers,
      color: "text-tertiary",
      desc: "State file metadata tracking, speculative pull request plan reviews, and automated 15-minute drift detection notifications.",
      status: "Phase 4 (Planned)",
      authType: "Terraform Cloud API Token"
    }
  ];

  return (
    <div className="w-full py-16 px-gutter max-w-7xl mx-auto text-left">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="font-mono text-xs uppercase tracking-wider text-primary font-semibold block mb-2">
          PLUG &amp; PLAY ECOSYSTEM
        </span>
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-on-surface">
          Integrations Directory
        </h1>
        <p className="text-base sm:text-lg text-on-surface-variant mt-4">
          Seamlessly connect your infrastructure with zero agent lock-in. All credentials encrypted with AES-256-GCM envelope encryption.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {integrations.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div key={idx} className="p-6 rounded-xl bg-surface-container border border-surface-container-high hover:border-primary/50 transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2.5 rounded-lg bg-surface-container-high border border-surface-container-highest">
                    <Icon className={`w-6 h-6 ${item.color}`} />
                  </div>
                  <span className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded bg-secondary/10 text-secondary border border-secondary/30">
                    {item.status}
                  </span>
                </div>

                <span className="text-[11px] font-mono uppercase tracking-wider text-outline block mb-1">
                  {item.category}
                </span>
                <h3 className="text-lg font-bold text-on-surface mb-2">{item.name}</h3>
                <p className="text-sm text-on-surface-variant mb-4 leading-relaxed">
                  {item.desc}
                </p>

                <div className="p-2.5 rounded bg-surface-container-low border border-surface-container-high text-[11px] font-mono text-outline mb-4">
                  Auth: {item.authType}
                </div>
              </div>

              <div className="pt-3 border-t border-surface-container-high flex items-center justify-between text-xs">
                <span className="text-secondary flex items-center gap-1 font-mono font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5" /> Least Privilege
                </span>
                <Link to="/register" className="text-primary hover:underline flex items-center gap-1 font-semibold">
                  Connect <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

