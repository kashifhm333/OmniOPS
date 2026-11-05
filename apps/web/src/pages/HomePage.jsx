import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext.jsx";

export function HomePage() {
  const [openFaq, setOpenFaq] = useState(null);
  const [copiedCli, setCopiedCli] = useState(false);
  const { setTheme } = useTheme();

  // Enforce dark mode on homepage to match UI/dark/screen.png
  useEffect(() => {
    setTheme("dark");
    document.documentElement.classList.add("dark");
  }, [setTheme]);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const handleCopyCli = () => {
    navigator.clipboard.writeText("npm install -g omniops");
    setCopiedCli(true);
    setTimeout(() => setCopiedCli(false), 2000);
  };

  const modules = [
    {
      title: "Command Center",
      badge: "HUD 60fps",
      badgeColor: "text-primary",
      icon: "space_dashboard",
      iconBg: "bg-primary/10 text-primary",
      desc: "Live multi-region telemetry heads-up display. High-density overview of cluster health, incidents, and node status.",
      path: "/dashboard"
    },
    {
      title: "GitHub Sync",
      badge: "Webhooks 0ms",
      badgeColor: "text-secondary",
      icon: "code_blocks",
      iconBg: "bg-surface-container-highest text-on-surface",
      desc: "Deep repository tracking, branch-level environment dispatch, PR status verification, and automated commit hooks.",
      path: "/dashboard/cicd"
    },
    {
      title: "CI/CD Engine",
      badge: "Pipelines · 98.9%",
      badgeColor: "text-secondary",
      icon: "alt_route",
      iconBg: "bg-secondary/10 text-secondary",
      desc: "Automated build graph execution, parallelized test matrix, zero-downtime rolling releases, and canary gates.",
      path: "/dashboard/cicd"
    },
    {
      title: "Docker Registry",
      badge: "Registry v2",
      badgeColor: "text-outline",
      icon: "view_in_ar",
      iconBg: "bg-primary/10 text-primary",
      desc: "Multi-architecture container image builds, layer vulnerability audits, automated CVE flagging, and image prune tasks.",
      path: "/dashboard/docker"
    },
    {
      title: "Kubernetes Mesh",
      badge: "14 Clusters",
      badgeColor: "text-primary",
      icon: "token",
      iconBg: "bg-primary/10 text-primary",
      desc: "Visual pod topology explorer, helm release manager, ingress debugger, and cluster autoscale configuration.",
      path: "/dashboard/kubernetes"
    },
    {
      title: "APM & Monitoring",
      badge: "12.4k req/s",
      badgeColor: "text-secondary",
      icon: "monitoring",
      iconBg: "bg-secondary/10 text-secondary",
      desc: "Sub-second metrics collection, SLO/SLA burn rates, p99 latency heatmaps, and synthetic endpoint monitors.",
      path: "/dashboard/monitoring"
    },
    {
      title: "Log Streamer",
      badge: "Live Tail",
      badgeColor: "text-tertiary",
      icon: "terminal",
      iconBg: "bg-tertiary/10 text-tertiary",
      desc: "Indexed elastic search across all container stdout/stderr. Regex filters, saved queries, and automated stack-trace parsing.",
      path: "/dashboard/logs"
    },
    {
      title: "Cloud Topology",
      badge: "Multi-Region",
      badgeColor: "text-outline",
      icon: "cloud",
      iconBg: "bg-primary/10 text-primary",
      desc: "Unified control plane across AWS, GCP, and bare metal nodes. Ingress mapping and global egress cost intelligence.",
      path: "/features"
    },
    {
      title: "Incident Command",
      badge: "0 Active P0",
      badgeColor: "text-secondary",
      icon: "crisis_alert",
      iconBg: "bg-error/10 text-error",
      desc: "On-call paging, automated war-room orchestration, post-mortem generation, and cross-channel Slack timeline sync.",
      path: "/dashboard/incidents"
    },
    {
      title: "Terraform State",
      badge: "State Locked",
      badgeColor: "text-tertiary",
      icon: "reorder",
      iconBg: "bg-tertiary/10 text-tertiary",
      desc: "Remote state management, drift detection, speculative plans on pull requests, and automated IaC cost projections.",
      path: "/features"
    },
    {
      title: "Teams & RBAC",
      badge: "SAML / SCIM",
      badgeColor: "text-outline",
      icon: "admin_panel_settings",
      iconBg: "bg-primary/10 text-primary",
      desc: "Granular access control down to namespace and secret keys. Temporary break-glass access credentials with full audit log.",
      path: "/dashboard/settings"
    },
    {
      title: "Diagnostic AI Assistant",
      badge: "Copilot AI",
      badgeColor: "text-secondary",
      icon: "psychology",
      iconBg: "bg-secondary/10 text-secondary",
      desc: "SRE Copilot trained on Kubernetes primitives and cloud logs. Ask questions in natural language and receive executable fixes.",
      path: "/features"
    }
  ];

  const faqs = [
    {
      q: "Can OmniOPS be deployed on-premise or air-gapped?",
      a: "Yes. OmniOPS Enterprise includes self-hosted Helm charts that can be installed on private Kubernetes clusters, AWS GovCloud, or isolated bare-metal servers with no external outbound connectivity requirements."
    },
    {
      q: "Is the OmniOPS CLI free for developers?",
      a: "Yes! The CLI client is 100% free and open-source. Any individual developer can link their local Docker daemon, minikube or GitHub repos directly without a paid subscription."
    },
    {
      q: "Does OmniOPS replace GitHub Actions or ArgoCD?",
      a: "No, it acts as an intelligent orchestration layer on top of them. You can continue running your existing GitHub Actions, GitLab CI, or ArgoCD workflows; OmniOPS unifies their triggers, statuses, logs, and canary controls in one interface."
    },
    {
      q: "How does the Diagnostic AI Assistant ensure security?",
      a: "The AI engine analyzes abstracted telemetry, anonymized stack traces, and cluster topology without sending customer PII or sensitive secret payloads to third parties. Dedicated private model VPC options are available."
    }
  ];

  return (
    <div className="flex flex-col w-full bg-surface text-on-surface font-body-md antialiased transition-colors">
      
      {/* =========================================================================
          SECTION 1: HERO & INTERACTIVE NUCLEUS HUD
          ========================================================================= */}
      <div className="relative w-full overflow-hidden">
        {/* Interactive Background Glow & Ambient Grid */}
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[480px] bg-gradient-to-b from-primary/15 via-tertiary/10 to-transparent blur-3xl pointer-events-none rounded-full"></div>
        <div className="absolute top-96 right-10 w-96 h-96 bg-secondary/10 blur-[120px] pointer-events-none rounded-full"></div>

        {/* Hero Section */}
        <section className="relative w-full px-gutter pt-space-xl pb-16 md:pb-24 max-w-7xl mx-auto flex flex-col items-center text-center">
          
          {/* Main Headline & Subtitle */}
          <h1 className="font-headline-xl text-headline-xl md:text-[54px] md:leading-[62px] text-on-surface tracking-tight max-w-4xl mx-auto font-bold">
            A Single Command Center Built for{" "}
            <span className="bg-gradient-to-r from-primary via-primary-container to-tertiary bg-clip-text text-transparent">
              Developers and DevOps
            </span>
          </h1>
          <p className="font-body-md text-body-md md:text-title-sm text-on-surface-variant max-w-2xl mt-space-md mx-auto leading-relaxed">
            Unify Kubernetes, Docker, CI/CD, Terraform, Cloud, and observability into one intelligent control plane. Operate from your terminal or browser seamlessly.
          </p>

          {/* Primary CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-space-md mt-space-xl z-10">
            <Link
              to="/register"
              className="px-6 py-3 bg-primary-container hover:bg-primary text-on-primary-container hover:text-on-primary font-title-sm text-title-sm rounded shadow-[0_0_20px_rgba(6,182,212,0.35)] transition-all flex items-center gap-space-xs font-semibold"
            >
              <span>Try for Free</span>
              <span className="material-symbols-outlined text-[20px]">bolt</span>
            </Link>
            <a
              href="#cli-synergy"
              className="px-6 py-3 bg-surface-container-high hover:bg-surface-bright text-on-surface font-title-sm text-title-sm rounded shadow-sm transition-all flex items-center gap-space-xs font-medium"
            >
              <span className="material-symbols-outlined text-[20px] text-outline">terminal</span>
              <span>Explore CLI</span>
            </a>
            <Link
              to="/pricing"
              className="px-6 py-3 bg-surface-container hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface font-title-sm text-title-sm rounded transition-all font-medium"
            >
              Schedule Demo
            </Link>
          </div>

          {/* Quick Trust Indicators */}
          <div className="flex flex-wrap items-center justify-center gap-space-lg mt-space-lg text-outline font-label-telemetry text-label-telemetry z-10">
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px] text-secondary">verified</span> Zero Agent Lock-in
            </span>
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px] text-primary">speed</span> 40ms Global Telemetry Mesh
            </span>
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px] text-tertiary">lock</span> SOC2 Type II Certified
            </span>
          </div>

          {/* Interactive Nucleus HUD Diagram (No white borders - pure tonal depth) */}
          <div className="w-full max-w-5xl mt-14 relative bg-surface-container-lowest rounded-xl shadow-2xl p-space-md md:p-space-lg overflow-hidden text-left">
            
            {/* Dashboard Top Control Header */}
            <div className="flex flex-wrap items-center justify-between gap-space-sm pb-space-md mb-space-md bg-surface-container-lowest">
              <div className="flex items-center gap-space-sm">
                <span className="w-3 h-3 rounded-full bg-error"></span>
                <span className="w-3 h-3 rounded-full bg-tertiary-container"></span>
                <span className="w-3 h-3 rounded-full bg-secondary"></span>
                <span className="ml-2 font-label-code text-label-code text-on-surface-variant font-medium">
                  omniops-core-mesh-prod // us-east-1 // cluster-prod-08
                </span>
              </div>
              <div className="flex items-center gap-space-md">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded bg-surface-container-high font-label-mono-sm text-label-mono-sm text-secondary font-label-code">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse"></span> 99.8% HEALTH
                </span>
                <span className="font-label-mono-sm text-label-mono-sm text-outline font-label-code">LATENCY: 12ms</span>
              </div>
            </div>

            {/* Central Orbit Visualization & SRE Telemetry */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-md items-center">
              
              {/* Left Column: Developer Capabilities */}
              <div className="lg:col-span-3 flex flex-col gap-space-md text-left">
                <div className="p-space-md rounded bg-surface-container-low shadow-sm">
                  <span className="font-badge-caps text-badge-caps uppercase tracking-wider text-primary font-semibold block mb-1">
                    Developer Stream
                  </span>
                  <p className="font-title-sm text-title-sm text-on-surface font-semibold">Self-Service Environments</p>
                  <p className="font-body-sm text-body-sm text-outline mt-0.5">
                    Ephemeral staging per Git branch with synthetic seed mock databases.
                  </p>
                </div>

                <div className="p-space-md rounded bg-surface-container-low shadow-sm">
                  <div className="flex items-center justify-between">
                    <span className="font-badge-caps text-badge-caps uppercase tracking-wider text-secondary font-semibold">
                      Active CI Workflows
                    </span>
                    <span className="font-label-mono-sm text-label-mono-sm text-secondary font-label-code">14 Running</span>
                  </div>
                  <p className="font-title-sm text-title-sm text-on-surface mt-1 font-semibold">GitHub Actions + ArgoCD</p>
                  <div className="w-full bg-surface-container-high h-1.5 rounded-full mt-2 overflow-hidden">
                    <div className="bg-secondary h-full rounded-full transition-all duration-500" style={{ width: "78%" }}></div>
                  </div>
                </div>

                <div className="p-space-md rounded bg-surface-container-low shadow-sm">
                  <span className="font-badge-caps text-badge-caps uppercase tracking-wider text-outline font-semibold block mb-1">
                    Developer CLI Sync
                  </span>
                  <p className="font-label-code text-label-code text-primary font-mono">omniops env checkout dev-44</p>
                  <span className="font-label-mono-sm text-label-mono-sm text-on-surface-variant block mt-1">
                    Linked to pod-auth-service-7f
                  </span>
                </div>
              </div>

              {/* Middle Orbit Core Canvas (Concentric rotating circles matching manifest) */}
              <div className="lg:col-span-6 relative flex flex-col items-center justify-center py-6 min-h-[340px]">
                {/* Decorative concentric circles with 60s slow spin */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-[320px] h-[320px] rounded-full bg-surface-container-low/40 animate-[spin_60s_linear_infinite] flex items-center justify-center">
                    <div className="w-[240px] h-[240px] rounded-full bg-surface-container/60 flex items-center justify-center">
                      <div className="w-[160px] h-[160px] rounded-full bg-surface-container-high/80"></div>
                    </div>
                  </div>
                </div>

                {/* Central Hex / Core Node */}
                <div className="relative z-10 p-5 rounded-full bg-gradient-to-br from-primary-container via-surface-container-high to-tertiary-container shadow-[0_0_35px_rgba(6,182,212,0.4)] flex flex-col items-center justify-center w-36 h-36 text-center">
                  <span className="material-symbols-outlined text-[36px] text-on-primary">hub</span>
                  <span className="font-headline-md text-headline-md text-on-primary font-bold mt-1">OMNI</span>
                  <span className="font-label-mono-sm text-label-mono-sm text-on-primary font-label-code tracking-wider uppercase">
                    Fabric Mesh
                  </span>
                </div>

                {/* Orbiting Badges */}
                <div className="relative z-10 w-full flex items-center justify-between px-2 mt-6">
                  <div className="px-3 py-1.5 rounded bg-surface-container-high text-center shadow-md">
                    <span className="font-label-telemetry text-label-telemetry text-secondary block font-semibold">BUILD</span>
                    <span className="font-label-mono-sm text-label-mono-sm text-outline font-label-code">0m 42s avg</span>
                  </div>
                  <div className="px-3 py-1.5 rounded bg-surface-container-high text-center shadow-md">
                    <span className="font-label-telemetry text-label-telemetry text-primary block font-semibold">DEPLOY</span>
                    <span className="font-label-mono-sm text-label-mono-sm text-outline font-label-code">Canary 10%</span>
                  </div>
                  <div className="px-3 py-1.5 rounded bg-surface-container-high text-center shadow-md">
                    <span className="font-label-telemetry text-label-telemetry text-tertiary block font-semibold">OPERATE</span>
                    <span className="font-label-mono-sm text-label-mono-sm text-outline font-label-code">K8s Mesh 3.2</span>
                  </div>
                </div>
              </div>

              {/* Right Column: DevOps Capabilities */}
              <div className="lg:col-span-3 flex flex-col gap-space-md text-left">
                <div className="p-space-md rounded bg-surface-container-low shadow-sm">
                  <span className="font-badge-caps text-badge-caps uppercase tracking-wider text-tertiary font-semibold block mb-1">
                    DevOps Control
                  </span>
                  <p className="font-title-sm text-title-sm text-on-surface font-semibold">Centralized Configs &amp; State</p>
                  <p className="font-body-sm text-body-sm text-outline mt-0.5">
                    Terraform drift reconciliation running continuously every 15 min.
                  </p>
                </div>

                <div className="p-space-md rounded bg-surface-container-low shadow-sm">
                  <div className="flex items-center justify-between">
                    <span className="font-badge-caps text-badge-caps uppercase tracking-wider text-primary font-semibold">
                      Multi-Cloud Mesh
                    </span>
                    <span className="font-label-mono-sm text-label-mono-sm text-primary font-label-code">AWS + GCP</span>
                  </div>
                  <p className="font-title-sm text-title-sm text-on-surface mt-1 font-semibold">Resource Pool &amp; Quotas</p>
                  <div className="flex items-center gap-space-sm mt-2 text-outline font-label-mono-sm text-label-mono-sm font-label-code">
                    <span>CPU: 42%</span>
                    <span>•</span>
                    <span>MEM: 61%</span>
                    <span>•</span>
                    <span>IOPS: 4.2k</span>
                  </div>
                </div>

                <div className="p-space-md rounded bg-surface-container-low shadow-sm">
                  <span className="font-badge-caps text-badge-caps uppercase tracking-wider text-secondary font-semibold block mb-1">
                    Instant Recovery
                  </span>
                  <p className="font-title-sm text-title-sm text-on-surface font-semibold">Auto-Rollback Triggered</p>
                  <span className="font-label-mono-sm text-label-mono-sm text-secondary font-label-code block mt-0.5">
                    0.00% Error Budget Lost
                  </span>
                </div>
              </div>
            </div>

            {/* Real-time Terminal Log Streamer Footprint */}
            <div className="mt-space-md p-space-md rounded bg-surface-container text-left font-label-code text-label-code">
              <div className="flex items-center justify-between pb-2 mb-2 text-outline font-label-telemetry text-label-telemetry">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-secondary"></span> STREAMING ENGINE · WS CONNECTED
                </span>
                <span className="text-xs">BUFFER: 100 LINES</span>
              </div>
              <div className="space-y-1 text-on-surface-variant font-label-code text-xs">
                <p>
                  <span className="text-outline">16:42:01.102</span> <span className="text-secondary font-bold">[INFO]</span> [K8s-Operator] Pod rollout `billing-gateway-v4` scaled to 12 replicas across us-east-1a, 1b.
                </p>
                <p>
                  <span className="text-outline">16:42:02.481</span> <span className="text-primary font-bold">[TRACE]</span> [ArgoCD] Sync completed with Git commit hash <span className="text-primary underline">#8f3a09c</span> (author: devops-lead).
                </p>
                <p>
                  <span className="text-outline">16:42:03.914</span> <span className="text-secondary font-bold">[INFO]</span> [Terraform-Agent] Spec reconciled without drift in 1.48s. Multi-cloud ingress rules updated.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* =========================================================================
          SECTION 2: INTEGRATION ECOSYSTEM RIBBON
          ========================================================================= */}
      <section className="w-full bg-surface-container-lowest py-space-lg px-gutter shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-space-lg">
          <div className="text-left">
            <span className="font-badge-caps text-badge-caps uppercase text-outline tracking-wider font-semibold">
              Integrations
            </span>
            <p className="font-title-sm text-title-sm text-on-surface font-semibold">
              Native connectivity across your modern stack
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-space-md sm:gap-space-lg text-outline">
            <Link to="/integrations" className="flex items-center gap-1.5 font-label-telemetry text-label-telemetry hover:text-primary transition-colors">
              <span className="material-symbols-outlined text-[20px]">code</span> GitHub
            </Link>
            <Link to="/integrations" className="flex items-center gap-1.5 font-label-telemetry text-label-telemetry hover:text-primary transition-colors">
              <span className="material-symbols-outlined text-[20px]">view_in_ar</span> Docker
            </Link>
            <Link to="/integrations" className="flex items-center gap-1.5 font-label-telemetry text-label-telemetry hover:text-primary transition-colors">
              <span className="material-symbols-outlined text-[20px]">grid_view</span> Kubernetes
            </Link>
            <Link to="/integrations" className="flex items-center gap-1.5 font-label-telemetry text-label-telemetry hover:text-primary transition-colors">
              <span className="material-symbols-outlined text-[20px]">cloud_queue</span> AWS &amp; GCP
            </Link>
            <Link to="/integrations" className="flex items-center gap-1.5 font-label-telemetry text-label-telemetry hover:text-primary transition-colors">
              <span className="material-symbols-outlined text-[20px]">layers</span> Terraform
            </Link>
            <Link to="/integrations" className="flex items-center gap-1.5 font-label-telemetry text-label-telemetry hover:text-primary transition-colors">
              <span className="material-symbols-outlined text-[20px]">monitoring</span> Datadog &amp; Prometheus
            </Link>
            <Link to="/integrations" className="flex items-center gap-1.5 font-label-telemetry text-label-telemetry hover:text-primary transition-colors">
              <span className="material-symbols-outlined text-[20px]">chat</span> Slack
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3: PLATFORM OVERVIEW (4-STEP OPERATIONAL FLOW)
          ========================================================================= */}
      <section className="w-full px-gutter py-20 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="font-badge-caps text-badge-caps uppercase tracking-wider text-primary font-semibold">
            Continuous Reliability Lifecycle
          </span>
          <h2 className="font-headline-lg text-headline-lg md:text-headline-xl text-on-surface mt-space-xs font-bold">
            Connect → Monitor → Analyze → Operate
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant mt-space-sm">
            Eliminate the fog of multi-tool fragmentation. OmniOPS provides automated synchronicity across every tier of deployment and operational response.
          </p>
        </div>

        {/* 4 Cards Flow (Pure tonal elevation - no white borders) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-space-md text-left">
          {/* Step 1 */}
          <div className="p-space-lg rounded-xl bg-surface-container hover:bg-surface-container-high transition-all shadow-md flex flex-col justify-between group">
            <div>
              <div className="w-10 h-10 rounded bg-primary/10 text-primary flex items-center justify-center font-label-mono-sm text-label-mono-sm font-label-code font-bold mb-space-md group-hover:bg-primary group-hover:text-on-primary transition-colors">
                01
              </div>
              <h3 className="font-title-sm text-title-sm text-on-surface font-semibold">Connect</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-2 leading-relaxed">
                One-line cluster hook or CLI login. Automatically ingests manifests, state files, registries, and IAM policies.
              </p>
            </div>
            <div className="mt-space-lg pt-space-sm font-label-telemetry text-label-telemetry text-primary flex items-center gap-1 font-semibold">
              Auto-Discovery <span className="material-symbols-outlined text-[16px]">chevron_right</span>
            </div>
          </div>

          {/* Step 2 */}
          <div className="p-space-lg rounded-xl bg-surface-container hover:bg-surface-container-high transition-all shadow-md flex flex-col justify-between group">
            <div>
              <div className="w-10 h-10 rounded bg-secondary/10 text-secondary flex items-center justify-center font-label-mono-sm text-label-mono-sm font-label-code font-bold mb-space-md group-hover:bg-secondary group-hover:text-on-secondary transition-colors">
                02
              </div>
              <h3 className="font-title-sm text-title-sm text-on-surface font-semibold">Monitor</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-2 leading-relaxed">
                High-cadence Prometheus matrix aggregation, container heartbeat tracking, and sub-second distributed trace sampling.
              </p>
            </div>
            <div className="mt-space-lg pt-space-sm font-label-telemetry text-label-telemetry text-secondary flex items-center gap-1 font-semibold">
              40ms Telemetry <span className="material-symbols-outlined text-[16px]">chevron_right</span>
            </div>
          </div>

          {/* Step 3 */}
          <div className="p-space-lg rounded-xl bg-surface-container hover:bg-surface-container-high transition-all shadow-md flex flex-col justify-between group">
            <div>
              <div className="w-10 h-10 rounded bg-tertiary/10 text-tertiary flex items-center justify-center font-label-mono-sm text-label-mono-sm font-label-code font-bold mb-space-md group-hover:bg-tertiary group-hover:text-on-tertiary transition-colors">
                03
              </div>
              <h3 className="font-title-sm text-title-sm text-on-surface font-semibold">Analyze</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-2 leading-relaxed">
                Autonomous anomaly detector isolates cascading pod failures and infrastructure bottlenecks before customers notice.
              </p>
            </div>
            <div className="mt-space-lg pt-space-sm font-label-telemetry text-label-telemetry text-tertiary flex items-center gap-1 font-semibold">
              AI Diagnostics <span className="material-symbols-outlined text-[16px]">chevron_right</span>
            </div>
          </div>

          {/* Step 4 */}
          <div className="p-space-lg rounded-xl bg-surface-container hover:bg-surface-container-high transition-all shadow-md flex flex-col justify-between group">
            <div>
              <div className="w-10 h-10 rounded bg-primary-container/20 text-primary-container flex items-center justify-center font-label-mono-sm text-label-mono-sm font-label-code font-bold mb-space-md group-hover:bg-primary-container group-hover:text-on-primary-container transition-colors">
                04
              </div>
              <h3 className="font-title-sm text-title-sm text-on-surface font-semibold">Operate</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-2 leading-relaxed">
                Instant remediation runs, rollbacks, blue/green canary promotions, and cluster scaling from web UI or local terminal.
              </p>
            </div>
            <div className="mt-space-lg pt-space-sm font-label-telemetry text-label-telemetry text-primary flex items-center gap-1 font-semibold">
              Instant Action <span className="material-symbols-outlined text-[16px]">chevron_right</span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 4: COMPLETE 12-MODULE FEATURE SHOWCASE GRID
          ========================================================================= */}
      <section className="w-full px-gutter py-16 bg-surface-container-lowest shadow-inner">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-space-md text-left">
            <div>
              <span className="font-badge-caps text-badge-caps uppercase tracking-wider text-primary font-semibold">
                Platform Architecture
              </span>
              <h2 className="font-headline-lg text-headline-lg md:text-headline-xl text-on-surface mt-1 font-bold">
                12 Mission-Critical Modules
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant mt-1 max-w-xl">
                Engineered as an interconnected operational matrix. Launch individual tools or power your full infrastructure mesh.
              </p>
            </div>
            <div className="flex items-center gap-space-sm">
              <span className="font-label-mono-sm text-label-mono-sm text-outline font-label-code">
                ALL MODULES ACTIVE · V2.4-READY
              </span>
            </div>
          </div>

          {/* 12 Modules Bento Grid (No white borders) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-md text-left">
            {modules.map((mod, idx) => (
              <Link
                key={idx}
                to={mod.path}
                className="p-space-lg rounded-xl bg-surface-container hover:bg-surface-container-high transition-all shadow-md flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-space-md">
                    <span className={`w-10 h-10 rounded ${mod.iconBg} flex items-center justify-center`}>
                      <span className="material-symbols-outlined text-[24px]">{mod.icon}</span>
                    </span>
                    <span className={`px-2 py-0.5 rounded bg-surface-container-highest font-label-mono-sm text-label-mono-sm font-label-code ${mod.badgeColor}`}>
                      {mod.badge}
                    </span>
                  </div>
                  <h3 className="font-title-sm text-title-sm text-on-surface font-semibold group-hover:text-primary transition-colors">
                    {mod.title}
                  </h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mt-1.5 leading-relaxed">
                    {mod.desc}
                  </p>
                </div>
                <div className="mt-space-md pt-space-xs flex items-center text-primary font-body-sm text-body-sm font-medium">
                  Explore module <span className="material-symbols-outlined text-[16px] ml-1 group-hover:translate-x-1 transition-transform">arrow_forward</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 5: WEB + CLI SYNERGY (LIVE INTERACTIVE TERMINAL WIDGET)
          ========================================================================= */}
      <section className="w-full px-gutter py-20 max-w-7xl mx-auto" id="cli-synergy">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-center">
          
          {/* Text Description */}
          <div className="lg:col-span-6 text-left">
            <span className="font-badge-caps text-badge-caps uppercase tracking-wider text-primary font-semibold">
              Web + CLI Synergy
            </span>
            <h2 className="font-headline-lg text-headline-lg md:text-headline-xl text-on-surface mt-space-xs font-bold leading-tight">
              Two Interfaces. One Unified Operational Brain.
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant mt-space-md leading-relaxed">
              Never choose between the convenience of a modern browser HUD and the blazing speed of terminal keybindings. What you dispatch via terminal updates on your team's command board instantaneously.
            </p>

            <div className="space-y-space-md mt-space-lg">
              <div className="flex items-start gap-space-sm">
                <span className="material-symbols-outlined text-primary text-[22px] mt-0.5">sync_alt</span>
                <div>
                  <p className="font-title-sm text-title-sm text-on-surface font-semibold">Bidirectional State Streaming</p>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    CLI commands broadcast SSE notifications to browser sessions in less than 20 milliseconds.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-space-sm">
                <span className="material-symbols-outlined text-secondary text-[22px] mt-0.5">lock_clock</span>
                <div>
                  <p className="font-title-sm text-title-sm text-on-surface font-semibold">Zero Token Expiry Hassles</p>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    SSO device authentication connects your terminal using hardware security keys seamlessly.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-space-xl flex flex-wrap items-center gap-space-md">
              <Link
                to="/cli"
                className="px-5 py-2.5 bg-primary-container hover:bg-primary text-on-primary-container font-title-sm text-title-sm rounded font-medium shadow-md transition-all font-semibold"
              >
                Read CLI Documentation
              </Link>
              <span className="font-label-mono-sm text-label-mono-sm text-outline font-label-code">
                Supports macOS, Linux &amp; Windows
              </span>
            </div>
          </div>

          {/* Live Interactive Terminal Widget (No white borders - pure tonal depth) */}
          <div className="lg:col-span-6 bg-surface-container-lowest rounded-xl shadow-2xl p-space-md md:p-space-lg overflow-hidden text-left">
            <div className="flex items-center justify-between pb-space-sm mb-space-sm">
              <div className="flex items-center gap-space-xs">
                <span className="w-3 h-3 rounded-full bg-error"></span>
                <span className="w-3 h-3 rounded-full bg-tertiary-container"></span>
                <span className="w-3 h-3 rounded-full bg-secondary"></span>
                <span className="ml-2 font-label-code text-label-code text-outline">bash — omniops-cli</span>
              </div>
              <button
                type="button"
                onClick={handleCopyCli}
                className="flex items-center gap-1 px-2.5 py-1 rounded bg-surface-container-high hover:bg-surface-bright text-primary font-label-mono-sm text-label-mono-sm font-label-code transition-colors"
              >
                <span className="material-symbols-outlined text-[14px]">
                  {copiedCli ? "check" : "content_copy"}
                </span>
                <span>{copiedCli ? "Copied!" : "Copy"}</span>
              </button>
            </div>

            {/* Terminal Body */}
            <div className="font-label-code text-label-code space-y-2 py-2 text-xs">
              {/* Install line */}
              <div className="flex items-center gap-2">
                <span className="text-secondary font-bold">$</span>
                <span className="text-primary font-semibold">npm install -g omniops</span>
              </div>
              <p className="text-outline text-xs">+ omniops@2.4.0 installed in 1.82s</p>

              {/* Login line */}
              <div className="pt-2 flex items-center gap-2">
                <span className="text-secondary font-bold">$</span>
                <span className="text-on-surface">omniops login --sso</span>
              </div>
              <p className="text-secondary text-xs">✔ Authenticated as architect@acme-corp.io via Okta SSO</p>

              {/* Cluster status */}
              <div className="pt-2 flex items-center gap-2">
                <span className="text-secondary font-bold">$</span>
                <span className="text-on-surface">omniops cluster status</span>
              </div>
              <div className="text-on-surface-variant text-xs space-y-0.5 bg-surface-container p-2.5 rounded font-mono">
                <p className="text-outline font-semibold">CLUSTER           STATUS    NODES   PODS    LOAD    REGION</p>
                <p><span className="text-primary font-bold">prod-us-east-1</span>    HEALTHY   24      180     0.42    us-east-1</p>
                <p><span className="text-primary font-bold">prod-eu-west-1</span>    HEALTHY   18      124     0.38    eu-west-1</p>
                <p><span className="text-primary font-bold">prod-ap-east-1</span>    HEALTHY   12      86      0.29    ap-east-1</p>
              </div>

              {/* Pipeline watch */}
              <div className="pt-2 flex items-center gap-2">
                <span className="text-secondary font-bold">$</span>
                <span className="text-on-surface">omniops pipeline watch --latest</span>
              </div>
              <p className="text-primary text-xs flex items-center gap-1.5 font-semibold">
                <span className="w-2 h-2 rounded-full bg-primary animate-ping"></span> Live watching #4088: release-v2.4 [DEPLOY_CANARY: 60%]
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 6: ENTERPRISE SECURITY & COMPLIANCE
          ========================================================================= */}
      <section className="w-full bg-surface-container py-16 px-gutter shadow-sm">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="font-badge-caps text-badge-caps uppercase tracking-wider text-secondary font-semibold">
              Battle-Tested Governance
            </span>
            <h2 className="font-headline-lg text-headline-lg text-on-surface mt-1 font-bold">
              Enterprise Security &amp; Compliance
            </h2>
            <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
              Architected for sensitive government, financial, and healthcare workloads with zero compromise on agility.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-space-md text-left">
            <div className="p-space-md rounded-xl bg-surface-container-low shadow-sm">
              <span className="material-symbols-outlined text-[28px] text-primary mb-2">verified_user</span>
              <h4 className="font-title-sm text-title-sm text-on-surface font-semibold">SOC2 Type II</h4>
              <p className="font-body-sm text-body-sm text-outline mt-1 leading-relaxed">
                Annual third-party attestation reports available under mutual NDA.
              </p>
            </div>

            <div className="p-space-md rounded-xl bg-surface-container-low shadow-sm">
              <span className="material-symbols-outlined text-[28px] text-secondary mb-2">policy</span>
              <h4 className="font-title-sm text-title-sm text-on-surface font-semibold">ISO 27001</h4>
              <p className="font-body-sm text-body-sm text-outline mt-1 leading-relaxed">
                Strict information security management and continuous automated audits.
              </p>
            </div>

            <div className="p-space-md rounded-xl bg-surface-container-low shadow-sm">
              <span className="material-symbols-outlined text-[28px] text-tertiary mb-2">key</span>
              <h4 className="font-title-sm text-title-sm text-on-surface font-semibold">E2E Encryption</h4>
              <p className="font-body-sm text-body-sm text-outline mt-1 leading-relaxed">
                mTLS in transit and AES-256 GCM envelope encryption for all secrets.
              </p>
            </div>

            <div className="p-space-md rounded-xl bg-surface-container-low shadow-sm">
              <span className="material-symbols-outlined text-[28px] text-primary mb-2">shield_person</span>
              <h4 className="font-title-sm text-title-sm text-on-surface font-semibold">Zero-Trust RBAC</h4>
              <p className="font-body-sm text-body-sm text-outline mt-1 leading-relaxed">
                Least-privilege by default with instant revocations and IP fences.
              </p>
            </div>

            <div className="p-space-md rounded-xl bg-surface-container-low shadow-sm">
              <span className="material-symbols-outlined text-[28px] text-on-surface mb-2">history</span>
              <h4 className="font-title-sm text-title-sm text-on-surface font-semibold">Audit Trails</h4>
              <p className="font-body-sm text-body-sm text-outline mt-1 leading-relaxed">
                Immutable tamper-proof write log of all human and automated actions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 7: FREQUENTLY ASKED QUESTIONS (ACCORDION)
          ========================================================================= */}
      <section className="w-full px-gutter py-20 max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <span className="font-badge-caps text-badge-caps uppercase tracking-wider text-primary font-semibold">
            Have Questions?
          </span>
          <h2 className="font-headline-lg text-headline-lg text-on-surface mt-1 font-bold">
            Frequently Asked Questions
          </h2>
          <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
            Everything you need to know about adopting OmniOPS.
          </p>
        </div>

        <div className="space-y-space-md text-left">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                onClick={() => toggleFaq(idx)}
                className="rounded-xl bg-surface-container p-space-md shadow-sm cursor-pointer transition-colors hover:bg-surface-container-high"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-title-sm text-title-sm text-on-surface font-semibold">
                    {faq.q}
                  </h3>
                  <span className={`material-symbols-outlined text-outline text-[20px] transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}>
                    expand_more
                  </span>
                </div>
                {isOpen && (
                  <div className="mt-3 pt-3 font-body-sm text-body-sm text-on-surface-variant border-t border-surface-container-highest leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* =========================================================================
          SECTION 8: FINAL CALL TO ACTION BANNER
          ========================================================================= */}
      <section className="w-full px-gutter py-16 bg-gradient-to-b from-surface to-surface-container-lowest">
        <div className="max-w-5xl mx-auto rounded-2xl bg-surface-container-high p-8 md:p-14 shadow-2xl relative overflow-hidden text-center">
          <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-primary/20 blur-3xl pointer-events-none rounded-full"></div>
          <div className="absolute -left-20 -top-20 w-80 h-80 bg-secondary/15 blur-3xl pointer-events-none rounded-full"></div>

          <span className="font-badge-caps text-badge-caps uppercase tracking-wider text-primary font-semibold">
            Start In 5 Minutes
          </span>
          <h2 className="font-headline-xl text-headline-xl md:text-[42px] md:leading-[48px] text-on-surface mt-2 font-bold max-w-2xl mx-auto">
            Transform Your Infrastructure Into an Autonomous Command Engine
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant mt-3 max-w-xl mx-auto leading-relaxed">
            Join hundreds of high-growth engineering teams who have simplified their SRE stack with OmniOPS.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-space-md mt-8 z-10 relative">
            <Link
              to="/register"
              className="px-8 py-3.5 bg-primary-container hover:bg-primary text-on-primary-container hover:text-on-primary font-title-sm text-title-sm rounded font-bold shadow-[0_0_24px_rgba(6,182,212,0.4)] transition-all"
            >
              Deploy OmniOPS Free
            </Link>
            <Link
              to="/pricing"
              className="px-6 py-3.5 bg-surface-container hover:bg-surface-bright text-on-surface font-title-sm text-title-sm rounded font-medium transition-all"
            >
              Book Architecture Review
            </Link>
          </div>

          <div className="mt-6 font-label-mono-sm text-label-mono-sm text-outline font-label-code">
            Free 14-day Enterprise trial · No credit card required · Instant GitHub OAuth
          </div>
        </div>
      </section>

    </div>
  );
}
