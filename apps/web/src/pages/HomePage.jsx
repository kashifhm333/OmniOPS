import React, { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Terminal, Shield, Zap, Boxes, ArrowRight, CheckCircle2, Play, 
  Copy, Check, Layers, Server, Activity, Database, AlertCircle, Sparkles, RefreshCw
} from "lucide-react";

export function HomePage() {
  const [activeCliTab, setActiveCliTab] = useState("status");
  const [copiedCli, setCopiedCli] = useState(false);

  const copyCommand = (cmd) => {
    navigator.clipboard.writeText(cmd);
    setCopiedCli(true);
    setTimeout(() => setCopiedCli(false), 2000);
  };

  return (
    <div className="w-full flex flex-col items-center overflow-x-hidden bg-surface text-on-surface transition-colors">
      
      {/* =========================================================================
          SECTION 1: HERO & CENTRAL ORBIT TELEMETRY HUD
          ========================================================================= */}
      <section className="relative w-full px-gutter pt-12 pb-16 md:pb-24 max-w-7xl mx-auto flex flex-col items-center text-center">
        {/* Ambient Top Glow */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[720px] h-[360px] bg-gradient-to-b from-primary/20 via-primary-container/10 to-transparent blur-3xl pointer-events-none rounded-full"></div>

        {/* Status Pill Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container-high border border-surface-container-highest shadow-sm mb-6 animate-in fade-in duration-300">
          <span className="w-2 h-2 rounded-full bg-secondary shadow-[0_0_8px_rgba(78,222,163,0.7)] animate-pulse"></span>
          <span className="font-label-telemetry text-xs uppercase tracking-wider text-secondary font-semibold">
            OMNI FABRIC MESH 3.14 ONLINE
          </span>
          <span className="text-outline text-xs">•</span>
          <span className="font-mono text-xs text-on-surface-variant">40ms Global Telemetry</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-3xl sm:text-5xl lg:text-[56px] lg:leading-[64px] font-bold tracking-tight max-w-4xl mx-auto text-on-surface">
          A Single Command Center Built for{" "}
          <span className="text-primary bg-clip-text">Developers and DevOps</span>
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg text-on-surface-variant max-w-2xl mt-5 mx-auto leading-relaxed">
          Unify Kubernetes, Docker, CI/CD, Terraform, Cloud, and observability into one intelligent control plane. Operate from your terminal or browser seamlessly.
        </p>

        {/* Primary CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mt-8 z-10">
          <Link
            to="/register"
            className="px-6 py-3 bg-primary-container hover:bg-primary text-on-primary-container hover:text-on-primary font-semibold text-sm sm:text-base rounded shadow-hud-cyan transition-all flex items-center gap-2"
          >
            <span>Try for Free</span>
            <span className="material-symbols-outlined text-[18px]">bolt</span>
          </Link>
          <a
            href="#cli-synergy"
            className="px-6 py-3 bg-surface-container hover:bg-surface-container-high text-on-surface border border-surface-container-highest font-medium text-sm sm:text-base rounded transition-all flex items-center gap-2"
          >
            <Terminal className="w-4 h-4 text-primary" />
            <span>Explore CLI</span>
          </a>
          <Link
            to="/pricing"
            className="px-6 py-3 bg-surface-container-low hover:bg-surface-container text-on-surface-variant hover:text-on-surface font-medium text-sm sm:text-base rounded transition-all"
          >
            Pricing &amp; Plans
          </Link>
        </div>

        {/* Quick Trust Indicators */}
        <div className="flex flex-wrap items-center justify-center gap-6 mt-7 text-on-surface-variant font-mono text-xs z-10">
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-secondary" /> Zero Agent Lock-in
          </span>
          <span className="flex items-center gap-1.5">
            <Zap className="w-4 h-4 text-primary" /> 40ms Telemetry Mesh
          </span>
          <span className="flex items-center gap-1.5">
            <Shield className="w-4 h-4 text-tertiary" /> Read-Only Least Privilege
          </span>
        </div>

        {/* =========================================================================
            ORBIT TELEMETRY HUD CONTAINER (MATCHING UI/dark/code.html)
            ========================================================================= */}
        <div className="w-full mt-14 p-space-md md:p-6 rounded-xl bg-surface-container-lowest/80 border border-surface-container-high shadow-2xl backdrop-blur-md relative overflow-hidden">
          
          {/* Top HUD Telemetry Bar */}
          <div className="flex items-center justify-between border-b border-surface-container-high pb-3 mb-6 font-mono text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-error"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-secondary"></span>
              <span className="text-on-surface-variant ml-2 font-semibold">CLUSTER: prod-us-east-1</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="px-2 py-0.5 rounded bg-surface-container-high text-secondary flex items-center gap-1 font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse"></span> 99.8% HEALTH
              </span>
              <span className="text-outline hidden sm:inline">LATENCY: 12ms</span>
            </div>
          </div>

          {/* Central Grid: Dev Stream | Orbit Canvas | DevOps Control */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-md items-center">
            
            {/* Left Column: Developer Stream */}
            <div className="lg:col-span-3 flex flex-col gap-space-md text-left">
              <div className="p-space-md rounded bg-surface-container-low border border-surface-container-high shadow-sm">
                <span className="font-badge-caps text-xs uppercase tracking-wider text-primary font-semibold block mb-1">
                  Developer Stream
                </span>
                <p className="font-title-sm text-sm font-semibold text-on-surface">Self-Service Environments</p>
                <p className="font-body-sm text-xs text-on-surface-variant mt-0.5">
                  Ephemeral staging per Git branch with synthetic seed mock databases.
                </p>
              </div>

              <div className="p-space-md rounded bg-surface-container-low border border-surface-container-high shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="font-badge-caps text-xs uppercase tracking-wider text-secondary font-semibold">
                    Active CI Workflows
                  </span>
                  <span className="font-mono text-xs text-secondary font-semibold">14 Running</span>
                </div>
                <p className="font-title-sm text-sm font-semibold text-on-surface mt-1">GitHub Actions + ArgoCD</p>
                <div className="w-full bg-surface-container-high h-1.5 rounded-full mt-2 overflow-hidden">
                  <div className="bg-secondary h-full rounded-full transition-all duration-500" style={{ width: "78%" }}></div>
                </div>
              </div>

              <div className="p-space-md rounded bg-surface-container-low border border-surface-container-high shadow-sm">
                <span className="font-badge-caps text-xs uppercase tracking-wider text-outline font-semibold block mb-1">
                  Developer CLI Sync
                </span>
                <p className="font-mono text-xs text-primary font-semibold">omniops env checkout dev-44</p>
                <span className="font-mono text-[11px] text-on-surface-variant block mt-1">Linked to pod-auth-service-7f</span>
              </div>
            </div>

            {/* Middle Column: Orbit Core Canvas */}
            <div className="lg:col-span-6 relative flex flex-col items-center justify-center py-6 min-h-[340px]">
              {/* Concentric rings */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-[300px] h-[300px] rounded-full border border-surface-container-high/60 animate-[spin_60s_linear_infinite] flex items-center justify-center">
                  <div className="w-[220px] h-[220px] rounded-full border border-surface-container-high/80 flex items-center justify-center">
                    <div className="w-[140px] h-[140px] rounded-full border border-primary/20"></div>
                  </div>
                </div>
              </div>

              {/* Central Hex Hub */}
              <div className="relative z-10 p-5 rounded-full bg-gradient-to-br from-primary-container via-surface-container-high to-tertiary-container shadow-[0_0_35px_rgba(6,182,212,0.4)] flex flex-col items-center justify-center w-36 h-36 text-center">
                <span className="material-symbols-outlined text-[36px] text-on-primary">hub</span>
                <span className="font-headline-md text-base text-on-primary font-bold mt-1">OMNI</span>
                <span className="font-mono text-[10px] text-on-primary tracking-wider uppercase">Fabric Mesh</span>
              </div>

              {/* Orbiting Badges */}
              <div className="relative z-10 w-full flex items-center justify-between px-2 mt-8">
                <div className="px-3 py-1.5 rounded bg-surface-container-high border border-surface-container-highest text-center shadow-md">
                  <span className="font-mono text-xs text-secondary block font-semibold">BUILD</span>
                  <span className="font-mono text-[11px] text-outline">0m 42s avg</span>
                </div>
                <div className="px-3 py-1.5 rounded bg-surface-container-high border border-surface-container-highest text-center shadow-md">
                  <span className="font-mono text-xs text-primary block font-semibold">DEPLOY</span>
                  <span className="font-mono text-[11px] text-outline">Canary 10%</span>
                </div>
                <div className="px-3 py-1.5 rounded bg-surface-container-high border border-surface-container-highest text-center shadow-md">
                  <span className="font-mono text-xs text-tertiary block font-semibold">OPERATE</span>
                  <span className="font-mono text-[11px] text-outline">K8s Mesh 3.2</span>
                </div>
              </div>
            </div>

            {/* Right Column: DevOps Control */}
            <div className="lg:col-span-3 flex flex-col gap-space-md text-left">
              <div className="p-space-md rounded bg-surface-container-low border border-surface-container-high shadow-sm">
                <span className="font-badge-caps text-xs uppercase tracking-wider text-tertiary font-semibold block mb-1">
                  DevOps Control
                </span>
                <p className="font-title-sm text-sm font-semibold text-on-surface">Centralized Configs &amp; State</p>
                <p className="font-body-sm text-xs text-on-surface-variant mt-0.5">
                  Terraform drift reconciliation running continuously every 15 min.
                </p>
              </div>

              <div className="p-space-md rounded bg-surface-container-low border border-surface-container-high shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="font-badge-caps text-xs uppercase tracking-wider text-primary font-semibold">
                    Multi-Cloud Fleet
                  </span>
                  <span className="font-mono text-xs text-primary font-semibold">38 Nodes</span>
                </div>
                <p className="font-title-sm text-sm font-semibold text-on-surface mt-1">AWS EKS + GCP Cloud Run</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-surface-container-high text-on-surface-variant">CPU: 42%</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-surface-container-high text-on-surface-variant">MEM: 58%</span>
                </div>
              </div>

              <div className="p-space-md rounded bg-surface-container-low border border-surface-container-high shadow-sm">
                <span className="font-badge-caps text-xs uppercase tracking-wider text-error font-semibold block mb-1">
                  Incident Stream
                </span>
                <p className="font-mono text-xs text-error font-semibold">INC-8892 SEV-2 High Pod Memory</p>
                <span className="font-mono text-[11px] text-secondary block mt-1">✔ Auto-remediated via scale policy</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2: INTEGRATION LOGO ECOSYSTEM STRIP
          ========================================================================= */}
      <section className="w-full bg-surface-container-lowest py-8 px-gutter border-y border-surface-container-high">
        <div className="max-w-7xl mx-auto flex flex-col items-center">
          <p className="font-mono text-xs text-outline uppercase tracking-wider mb-6">
            Engineered to unify your existing cloud-native toolchain
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-14 text-on-surface-variant font-mono text-sm">
            <span className="flex items-center gap-2 hover:text-primary transition-colors cursor-pointer">
              <span className="material-symbols-outlined text-[20px]">terminal</span> GitHub Actions
            </span>
            <span className="flex items-center gap-2 hover:text-primary transition-colors cursor-pointer">
              <Boxes className="w-5 h-5 text-primary" /> Kubernetes
            </span>
            <span className="flex items-center gap-2 hover:text-primary transition-colors cursor-pointer">
              <Server className="w-5 h-5 text-secondary" /> Docker Registries
            </span>
            <span className="flex items-center gap-2 hover:text-primary transition-colors cursor-pointer">
              <Layers className="w-5 h-5 text-tertiary" /> Terraform IaC
            </span>
            <span className="flex items-center gap-2 hover:text-primary transition-colors cursor-pointer">
              <Activity className="w-5 h-5 text-amber-400" /> Prometheus &amp; CloudWatch
            </span>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3: 12 FIRST-CLASS MODULES SHOWCASE
          ========================================================================= */}
      <section className="w-full px-gutter py-20 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="font-mono text-xs uppercase tracking-wider text-primary font-semibold block mb-2">
            COMPLETE OPERATIONAL COCKPIT
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-on-surface">
            12 Integrated Modules. One Unified Control Plane.
          </h2>
          <p className="text-on-surface-variant text-base mt-4">
            Eliminate cross-tab browser sprawl. Every critical DevOps domain accessible in seconds with consistent RBAC and zero secret exposure.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Card 1: Command Center */}
          <div className="p-6 rounded-xl bg-surface-container border border-surface-container-high hover:border-primary/50 transition-all group">
            <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center text-primary mb-4 group-hover:scale-105 transition-transform">
              <span className="material-symbols-outlined text-[24px]">space_dashboard</span>
            </div>
            <h3 className="text-lg font-bold text-on-surface mb-2">1. Command Center HUD</h3>
            <p className="text-sm text-on-surface-variant mb-4">
              Cross-cluster operational health index, active deployment streams, and urgent incident banners in one cockpit.
            </p>
            <span className="font-mono text-xs text-primary flex items-center gap-1 font-semibold">
              Live Health Ingestion <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>

          {/* Card 2: Kubernetes */}
          <div className="p-6 rounded-xl bg-surface-container border border-surface-container-high hover:border-primary/50 transition-all group">
            <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center text-primary mb-4 group-hover:scale-105 transition-transform">
              <Boxes className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-on-surface mb-2">2. Kubernetes Fleet Mesh</h3>
            <p className="text-sm text-on-surface-variant mb-4">
              Multi-cluster namespace resource partitioning, pod restart histories, container CPU/RAM quotas, and SSE log streaming.
            </p>
            <span className="font-mono text-xs text-primary flex items-center gap-1 font-semibold">
              Read-Only ServiceAccounts <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>

          {/* Card 3: Centralized Logs */}
          <div className="p-6 rounded-xl bg-surface-container border border-surface-container-high hover:border-primary/50 transition-all group">
            <div className="w-10 h-10 rounded-lg bg-secondary/10 border border-secondary/30 flex items-center justify-center text-secondary mb-4 group-hover:scale-105 transition-transform">
              <Terminal className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-on-surface mb-2">3. Redacted Log Explorer</h3>
            <p className="text-sm text-on-surface-variant mb-4">
              Sub-second full-text structured log querying with automated regex redaction of JWTs, passwords, and AWS keys.
            </p>
            <span className="font-mono text-xs text-secondary flex items-center gap-1 font-semibold">
              Zero Secret Egress <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>

          {/* Card 4: Incident Triage */}
          <div className="p-6 rounded-xl bg-surface-container border border-surface-container-high hover:border-primary/50 transition-all group">
            <div className="w-10 h-10 rounded-lg bg-error/10 border border-error/30 flex items-center justify-center text-error mb-4 group-hover:scale-105 transition-transform">
              <AlertCircle className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-on-surface mb-2">4. Incident Command</h3>
            <p className="text-sm text-on-surface-variant mb-4">
              Webhook alert deduplication from Prometheus &amp; PagerDuty. SEV-1 to SEV-4 escalation rooms with audited resolution notes.
            </p>
            <span className="font-mono text-xs text-error flex items-center gap-1 font-semibold">
              Operator Ack Leases <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>

          {/* Card 5: GitHub & CI/CD */}
          <div className="p-6 rounded-xl bg-surface-container border border-surface-container-high hover:border-primary/50 transition-all group">
            <div className="w-10 h-10 rounded-lg bg-tertiary/10 border border-tertiary/30 flex items-center justify-center text-tertiary mb-4 group-hover:scale-105 transition-transform">
              <span className="material-symbols-outlined text-[24px]">account_tree</span>
            </div>
            <h3 className="text-lg font-bold text-on-surface mb-2">5. CI/CD &amp; GitHub Sync</h3>
            <p className="text-sm text-on-surface-variant mb-4">
              Real-time webhook ingestion for GitHub Actions &amp; GitLab pipelines. Duration analytics and failure root-cause traces.
            </p>
            <span className="font-mono text-xs text-tertiary flex items-center gap-1 font-semibold">
              HMAC Signature Verified <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>

          {/* Card 6: Docker Registries */}
          <div className="p-6 rounded-xl bg-surface-container border border-surface-container-high hover:border-primary/50 transition-all group">
            <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center text-primary mb-4 group-hover:scale-105 transition-transform">
              <Server className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-on-surface mb-2">6. Docker &amp; Containers</h3>
            <p className="text-sm text-on-surface-variant mb-4">
              Container registry catalog (Docker Hub, AWS ECR), image layer inspection, and vulnerability CVE severity metrics.
            </p>
            <span className="font-mono text-xs text-primary flex items-center gap-1 font-semibold">
              Registry API V2 <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>

        </div>

        <div className="text-center mt-12">
          <Link
            to="/features"
            className="inline-flex items-center gap-2 px-6 py-3 rounded bg-surface-container-high hover:bg-surface-container-highest border border-surface-container-highest font-mono text-sm font-semibold text-on-surface transition-colors"
          >
            <span>View All 12 Module Specifications</span>
            <ArrowRight className="w-4 h-4 text-primary" />
          </Link>
        </div>
      </section>

      {/* =========================================================================
          SECTION 4: CLI SYNERGY SHOWCASE (INTERACTIVE TERMINAL)
          ========================================================================= */}
      <section id="cli-synergy" className="w-full px-gutter py-20 bg-surface-container-lowest border-y border-surface-container-high">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text */}
          <div className="lg:col-span-5 text-left">
            <span className="font-mono text-xs uppercase tracking-wider text-primary font-semibold block mb-2">
              DEVELOPER TERMINAL PARITY
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-on-surface mb-4">
              Everything in the UI. Now in your Terminal.
            </h2>
            <p className="text-on-surface-variant text-base mb-6 leading-relaxed">
              Install the independently packageable Node.js CLI <code className="text-primary font-mono font-semibold">omniops</code>. Consume the exact same versioned Express API with OS native keyring security.
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-sm text-on-surface">Secure Device Authorization Grant</h4>
                  <p className="text-xs text-on-surface-variant">Log in with a single browser code without ever exposing passwords in your terminal.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-sm text-on-surface">Dual Format Output (Human &amp; JSON)</h4>
                  <p className="text-xs text-on-surface-variant">Rich ANSI tables for humans, raw JSON output via <code className="text-primary">--json</code> for scripting with jq.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-sm text-on-surface">Zero Plaintext Token Storage</h4>
                  <p className="text-xs text-on-surface-variant">Personal Access Tokens are encrypted inside macOS Keychain and Linux Secret Service.</p>
                </div>
              </div>
            </div>

            {/* Quick Install Box */}
            <div className="p-3 rounded bg-surface-container border border-surface-container-high flex items-center justify-between font-mono text-xs">
              <span className="text-primary">$ npm install -g omniops</span>
              <button
                onClick={() => copyCommand("npm install -g omniops")}
                className="p-1.5 rounded hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface transition-colors"
                title="Copy install command"
              >
                {copiedCli ? <Check className="w-4 h-4 text-secondary" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Right Interactive Terminal Component */}
          <div className="lg:col-span-7">
            <div className="w-full rounded-xl bg-black border border-surface-container-high shadow-2xl overflow-hidden font-mono text-xs text-left">
              
              {/* Terminal Header & Tabs */}
              <div className="bg-[#11141c] px-4 py-2.5 border-b border-surface-container-high flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-error"></span>
                  <span className="w-3 h-3 rounded-full bg-amber-400"></span>
                  <span className="w-3 h-3 rounded-full bg-secondary"></span>
                  <span className="text-outline text-[11px] ml-2">omniops-cli — v0.1.0</span>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setActiveCliTab("status")}
                    className={`px-2.5 py-1 rounded text-[11px] transition-colors ${
                      activeCliTab === "status"
                        ? "bg-primary-container text-on-primary-container font-semibold"
                        : "text-on-surface-variant hover:text-on-surface"
                    }`}
                  >
                    status
                  </button>
                  <button
                    onClick={() => setActiveCliTab("k8s")}
                    className={`px-2.5 py-1 rounded text-[11px] transition-colors ${
                      activeCliTab === "k8s"
                        ? "bg-primary-container text-on-primary-container font-semibold"
                        : "text-on-surface-variant hover:text-on-surface"
                    }`}
                  >
                    k8s pods
                  </button>
                  <button
                    onClick={() => setActiveCliTab("logs")}
                    className={`px-2.5 py-1 rounded text-[11px] transition-colors ${
                      activeCliTab === "logs"
                        ? "bg-primary-container text-on-primary-container font-semibold"
                        : "text-on-surface-variant hover:text-on-surface"
                    }`}
                  >
                    logs tail
                  </button>
                </div>
              </div>

              {/* Terminal Body */}
              <div className="p-5 min-h-[300px] text-gray-300 leading-relaxed overflow-x-auto">
                {activeCliTab === "status" && (
                  <div>
                    <p className="text-primary font-bold mb-3">$ omniops status</p>
                    <div className="text-outline">┌──────────────────────────────────────────────────────────────┐</div>
                    <div className="text-outline">│ <span className="text-white font-bold">OmniOPS Operational Status</span> — Acme Cloud Corp (acme-cloud)    │</div>
                    <div className="text-outline">├──────────────────────────────────────────────────────────────┤</div>
                    <div>│ Health Score:        <span className="text-secondary font-bold">99.8% [HEALTHY]</span>                         │</div>
                    <div>│ Active Incidents:    <span className="text-amber-400">1</span> (INC-8892: SEV-2 Pod Memory Threshold)    │</div>
                    <div>│ Kubernetes Fleets:   <span className="text-secondary">3 / 3 Clusters Healthy</span>                  │</div>
                    <div>│ Total Running Pods:  <span className="text-primary font-bold">312</span>                                     │</div>
                    <div>│ CI/CD Pipelines:     <span className="text-secondary">14 Active / 0 Failed</span>                     │</div>
                    <div className="text-outline">└──────────────────────────────────────────────────────────────┘</div>
                    <p className="text-secondary mt-3">✔ All systems operational. Last sync: 12ms ago.</p>
                  </div>
                )}

                {activeCliTab === "k8s" && (
                  <div>
                    <p className="text-primary font-bold mb-3">$ omniops k8s pods -n production</p>
                    <table className="w-full text-left">
                      <thead>
                        <tr className="text-outline border-b border-surface-container-high">
                          <th className="pb-1">NAME</th>
                          <th className="pb-1">NAMESPACE</th>
                          <th className="pb-1">STATUS</th>
                          <th className="pb-1">RESTARTS</th>
                          <th className="pb-1">CPU</th>
                          <th className="pb-1">MEMORY</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-surface-container-high/40">
                        <tr>
                          <td className="py-1 text-white">api-gateway-7b9c-xyz</td>
                          <td>production</td>
                          <td className="text-secondary font-semibold">Running</td>
                          <td>0</td>
                          <td>120m</td>
                          <td>240Mi</td>
                        </tr>
                        <tr>
                          <td className="py-1 text-white">auth-service-5c4d-abc</td>
                          <td>production</td>
                          <td className="text-secondary font-semibold">Running</td>
                          <td>1</td>
                          <td>85m</td>
                          <td>180Mi</td>
                        </tr>
                        <tr>
                          <td className="py-1 text-white">worker-telemetry-8f2e</td>
                          <td>production</td>
                          <td className="text-secondary font-semibold">Running</td>
                          <td>0</td>
                          <td>450m</td>
                          <td>890Mi</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                )}

                {activeCliTab === "logs" && (
                  <div>
                    <p className="text-primary font-bold mb-3">$ omniops logs tail --service api-gateway -n production</p>
                    <p className="text-outline mb-2">Streaming real-time SSE log events [redaction filter active]:</p>
                    <div className="space-y-1">
                      <p><span className="text-outline">12:00:01.102</span> <span className="text-primary font-bold">[INFO]</span> HTTP Ingress GET /api/v1/health from 10.0.12.4 (200 OK - 2ms)</p>
                      <p><span className="text-outline">12:00:01.420</span> <span className="text-primary font-bold">[INFO]</span> Auth token verified for Bearer <span className="text-amber-400">[REDACTED_JWT]</span></p>
                      <p><span className="text-outline">12:00:02.001</span> <span className="text-secondary font-bold">[INFO]</span> Telemetry batch sync 402 items committed to MongoDB</p>
                      <p className="text-amber-300"><span className="text-outline">12:00:02.812</span> <span className="text-amber-400 font-bold">[WARN]</span> Pod worker-telemetry memory at 82% threshold</p>
                      <p className="animate-pulse text-primary">_</p>
                    </div>
                  </div>
                )}
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 5: READY TO OPERATE CTA
          ========================================================================= */}
      <section className="w-full px-gutter py-20 max-w-4xl mx-auto text-center">
        <div className="p-8 md:p-12 rounded-2xl bg-gradient-to-b from-surface-container to-surface-container-lowest border border-surface-container-high shadow-2xl relative overflow-hidden">
          <div className="absolute -right-16 -top-16 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>

          <h2 className="text-3xl sm:text-4xl font-bold text-on-surface tracking-tight mb-4">
            Ready to Take Command of Your DevOps Stack?
          </h2>
          <p className="text-base text-on-surface-variant max-w-xl mx-auto mb-8">
            Deploy in minutes with Docker Compose or connect your Kubernetes clusters with read-only ServiceAccounts.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/register"
              className="px-8 py-3.5 bg-primary-container hover:bg-primary text-on-primary-container hover:text-on-primary font-semibold rounded shadow-hud-cyan transition-all text-sm flex items-center gap-2"
            >
              <span>Get Started Free</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/docs"
              className="px-8 py-3.5 bg-surface-container-low hover:bg-surface-container text-on-surface border border-surface-container-highest font-medium rounded text-sm transition-all"
            >
              Read Architecture Specs
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}

