import React from "react";
import { Link } from "react-router-dom";
import { 
  LayoutDashboard, GitBranch, Terminal, Shield, Boxes, Server, 
  AlertTriangle, Layers, Users, Sparkles, Activity, Cloud, ArrowRight, CheckCircle2
} from "lucide-react";

export function FeaturesPage() {
  const modules = [
    {
      id: "command-center",
      name: "1. Command Center Dashboard",
      icon: LayoutDashboard,
      color: "text-primary",
      status: "Committed MVP",
      desc: "Single-pane-of-glass operational health scoring, active deployment event streaming, and urgent incident banners across all workspaces.",
      features: [
        "Dynamic operational health index calculation",
        "Cross-cluster real-time alert tickers",
        "One-click incident triage navigation",
        "Role-based widget visibility"
      ]
    },
    {
      id: "kubernetes",
      name: "2. Kubernetes Management",
      icon: Boxes,
      color: "text-primary",
      status: "Committed MVP",
      desc: "Multi-cluster namespace resource partitioning, pod restart histories, container CPU/RAM quotas, and SSE log streaming.",
      features: [
        "Multi-cluster fleet topology overview",
        "Pod state tracking (Running, CrashLoopBackOff, Pending)",
        "Zero-privilege ServiceAccount token access",
        "Real-time streaming pod log tailing with ANSI preservation"
      ]
    },
    {
      id: "logging",
      name: "3. Centralized Logging",
      icon: Terminal,
      color: "text-secondary",
      status: "Committed MVP",
      desc: "Sub-second full-text structured log querying with automated regex redaction of JWTs, passwords, and AWS credentials.",
      features: [
        "Instantaneous structured log filtering by service and level",
        "Automated PII, secret, and bearer token redaction pipeline",
        "Export to JSON / raw format for external analytics",
        "Server-Sent Events streaming with auto-reconnect"
      ]
    },
    {
      id: "incidents",
      name: "4. Incident Management",
      icon: AlertTriangle,
      color: "text-error",
      status: "Committed MVP",
      desc: "Webhook alert deduplication from Prometheus, Grafana, and PagerDuty. SEV-1 to SEV-4 triage rooms with audited timeline notes.",
      features: [
        "Automated 15-minute sliding alert deduplication window",
        "Operator acknowledgment with time-bound execution leases",
        "Post-mortem resolution notes recorded in audit trail",
        "CLI incident parity (`omniops incident ack/resolve`)"
      ]
    },
    {
      id: "github-cicd",
      name: "5. GitHub & CI/CD Management",
      icon: GitBranch,
      color: "text-tertiary",
      status: "Committed MVP",
      desc: "Real-time webhook ingestion for GitHub Actions and GitLab CI. Duration analytics, failed step traces, and PR review statuses.",
      features: [
        "HMAC-SHA256 verified webhook ingestion",
        "Step-by-step pipeline run duration breakdowns",
        "Pull Request build check status badges",
        "Repository synchronization and cataloging"
      ]
    },
    {
      id: "docker",
      name: "6. Docker Container Management",
      icon: Server,
      color: "text-primary",
      status: "Committed MVP",
      desc: "Registry cataloging for Docker Hub and AWS ECR, image layer inspection, and vulnerability CVE severity metrics.",
      features: [
        "Vulnerability severity breakdown by CVE score",
        "Staging and production container runtime status",
        "AES-256-GCM encrypted registry credentials",
        "Zero host Docker daemon socket exposure"
      ]
    },
    {
      id: "monitoring",
      name: "7. Infrastructure Monitoring",
      icon: Activity,
      color: "text-amber-400",
      status: "Committed MVP",
      desc: "Host and cluster telemetry ingestion proxies for Prometheus and CloudWatch with high-density charts.",
      features: [
        "CPU, memory, disk I/O, and network ingress/egress graphs",
        "Threshold breach indicators and alerts",
        "Multi-node comparative telemetry matrix",
        "Historical trend aggregation"
      ]
    },
    {
      id: "cloud",
      name: "8. Cloud Management (AWS / GCP)",
      icon: Cloud,
      color: "text-primary",
      status: "Phase 4 (Deferred)",
      desc: "Multi-cloud asset inventory, daily burn rate tracking, and automated cost anomaly alerts.",
      features: [
        "AWS STS AssumeRole read-only cross-account audit",
        "Daily cost expenditure and anomaly detection",
        "Unattached volume and idle resource detection",
        "Multi-region health mapping"
      ]
    },
    {
      id: "terraform",
      name: "9. Terraform & IaC Management",
      icon: Layers,
      color: "text-tertiary",
      status: "Phase 4 (Deferred)",
      desc: "State file metadata inspection, speculative PR plan reviews, and continuous drift detection.",
      features: [
        "Encrypted state file metadata tracking",
        "Automated 15-minute drift reconciliation checks",
        "Speculative plan review diff viewer",
        "Policy-as-code validation gates"
      ]
    },
    {
      id: "teams",
      name: "10. Team & Access Management",
      icon: Users,
      color: "text-secondary",
      status: "Committed MVP",
      desc: "Multi-tenant organizations, granular RBAC (Owner, Admin, Operator, Viewer), and revokable Personal Access Tokens.",
      features: [
        "Organization workspace partitioning",
        "Fine-grained RBAC permission matrix",
        "Scoped CLI Personal Access Token creation and revocation",
        "Write-once immutable audit log explorer"
      ]
    },
    {
      id: "audit",
      name: "11. Tamper-Evident Audit Trails",
      icon: Shield,
      color: "text-secondary",
      status: "Committed MVP",
      desc: "Comprehensive append-only recording of all state mutations, credential views, and operational queries.",
      features: [
        "Actor ID, actor type, client IP, and action tracking",
        "Database roles prevent update or deletion of records",
        "Compliance search and forensic date filtering",
        "Zero secret exposure in audit payloads"
      ]
    },
    {
      id: "ai-copilot",
      name: "12. Intelligent DevOps Assistant",
      icon: Sparkles,
      color: "text-tertiary",
      status: "Phase 5 (Deferred)",
      desc: "Context-aware log analysis, root cause hypotheses during active outages, and human-in-the-loop remediation advice.",
      features: [
        "Sanitized query submission with zero telemetry model training",
        "Prompt injection defenses conforming to OWASP LLM Top 10",
        "Automated SEV-1 incident summary drafts",
        "Strict human-in-the-loop: no autonomous destructive commands"
      ]
    }
  ];

  return (
    <div className="w-full py-16 px-gutter max-w-7xl mx-auto text-left">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="font-mono text-xs uppercase tracking-wider text-primary font-semibold block mb-2">
          ARCHITECTURE SPECIFICATION
        </span>
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-on-surface">
          12 Documented DevOps Modules
        </h1>
        <p className="text-base sm:text-lg text-on-surface-variant mt-4">
          Every capability is built as a first-class feature of the unified control plane, accessible via web dashboard and CLI with identical authorization.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {modules.map((m) => {
          const Icon = m.icon;
          return (
            <div 
              key={m.id}
              className="p-6 rounded-xl bg-surface-container border border-surface-container-high hover:border-primary/50 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-lg bg-surface-container-high border border-surface-container-highest">
                      <Icon className={`w-6 h-6 ${m.color}`} />
                    </div>
                    <h3 className="text-lg font-bold text-on-surface">{m.name}</h3>
                  </div>
                  <span className={`text-[11px] font-mono font-semibold px-2 py-0.5 rounded ${
                    m.status.includes("MVP") 
                      ? "bg-secondary/10 text-secondary border border-secondary/30"
                      : "bg-surface-container-high text-outline border border-surface-container-highest"
                  }`}>
                    {m.status}
                  </span>
                </div>

                <p className="text-sm text-on-surface-variant mb-5 leading-relaxed">
                  {m.desc}
                </p>

                <div className="space-y-2 border-t border-surface-container-high pt-4">
                  {m.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-on-surface">
                      <CheckCircle2 className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-surface-container-high flex items-center justify-between text-xs font-mono">
                <span className="text-outline">Contract: RFC 2119 Verified</span>
                <Link to="/register" className="text-primary hover:underline flex items-center gap-1 font-semibold">
                  Launch Module <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

