import React from "react";
import { Link } from "react-router-dom";
import { Check, ArrowRight, Shield, Zap, Sparkles } from "lucide-react";

export function PricingPage() {
  const plans = [
    {
      name: "Starter / Community",
      price: "$0",
      period: "forever open source",
      desc: "For individual platform engineers, homelab operators, and small development teams.",
      highlight: false,
      badge: "Open Source",
      features: [
        "Self-hosted via Docker Compose",
        "Up to 3 Kubernetes clusters",
        "Full Node.js CLI ('omniops') access",
        "Basic RBAC (Owner & Member)",
        "Read-only least-privilege integrations",
        "Community GitHub support"
      ],
      ctaText: "Deploy Locally Free",
      ctaLink: "/docs"
    },
    {
      name: "Team & Growth",
      price: "$49",
      period: "per user / month (draft plan)",
      desc: "For fast-scaling engineering teams requiring unified incident triage and automated multi-cluster auditing.",
      highlight: true,
      badge: "Most Popular",
      features: [
        "Unlimited Kubernetes clusters & namespaces",
        "Automated webhook alert deduplication",
        "Full RBAC (Owner, Admin, Operator, Viewer)",
        "Centralized log stream redaction (30-day retention)",
        "Audit trail ledger with export capabilities",
        "Standard SLA & dedicated support channel"
      ],
      ctaText: "Start 14-Day Trial",
      ctaLink: "/register"
    },
    {
      name: "Enterprise Dedicated",
      price: "Custom",
      period: "annual commitment",
      desc: "For regulated industries, financial institutions, and global platform engineering organizations.",
      highlight: false,
      badge: "Enterprise",
      features: [
        "Single-tenant dedicated VPC deployment",
        "AWS KMS Customer Managed Keys (CMK)",
        "SSO / SAML 2.0 & Okta integration",
        "Two-person approval rule for destructive mutations",
        "99.99% Uptime SLA guarantee",
        "Dedicated Technical Account Manager"
      ],
      ctaText: "Contact Sales",
      ctaLink: "/status"
    }
  ];

  return (
    <div className="w-full py-16 px-gutter max-w-7xl mx-auto text-left">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="font-mono text-xs uppercase tracking-wider text-primary font-semibold block mb-2">
          TRANSPARENT VALUE
        </span>
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-on-surface">
          Simple, Predictable Plans for Every Scale
        </h1>
        <p className="text-base sm:text-lg text-on-surface-variant mt-4">
          Start for free with the open-source self-hosted edition. Scale seamlessly into automated incident triage and enterprise multi-tenant control planes.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {plans.map((p, idx) => (
          <div
            key={idx}
            className={`p-8 rounded-2xl bg-surface-container border transition-all flex flex-col justify-between ${
              p.highlight
                ? "border-primary shadow-hud-cyan relative"
                : "border-surface-container-high"
            }`}
          >
            {p.highlight && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-primary text-on-primary font-mono text-[11px] font-bold uppercase tracking-wider">
                {p.badge}
              </span>
            )}

            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-on-surface">{p.name}</h3>
                {!p.highlight && (
                  <span className="text-xs font-mono text-outline px-2 py-0.5 rounded bg-surface-container-high">
                    {p.badge}
                  </span>
                )}
              </div>

              <div className="mb-4">
                <span className="text-4xl font-extrabold text-on-surface tracking-tight">{p.price}</span>
                <span className="text-xs text-on-surface-variant ml-2 font-mono">/ {p.period}</span>
              </div>

              <p className="text-sm text-on-surface-variant mb-6 leading-relaxed">
                {p.desc}
              </p>

              <div className="space-y-3 border-t border-surface-container-high pt-6 mb-8">
                {p.features.map((feat, fIdx) => (
                  <div key={fIdx} className="flex items-start gap-2.5 text-xs text-on-surface">
                    <Check className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <Link
              to={p.ctaLink}
              className={`w-full py-3 rounded text-center text-sm font-semibold transition-all flex items-center justify-center gap-2 ${
                p.highlight
                  ? "bg-primary-container hover:bg-primary text-on-primary-container hover:text-on-primary shadow-hud-cyan"
                  : "bg-surface-container-high hover:bg-surface-container-highest text-on-surface border border-surface-container-highest"
              }`}
            >
              <span>{p.ctaText}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
