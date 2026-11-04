import React from "react";
import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="w-full bg-surface-container-lowest border-t border-surface-container-high pt-space-xl pb-space-lg transition-colors">
      <div className="w-full max-w-7xl mx-auto px-gutter">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-space-lg mb-space-xl">
          {/* Brand info */}
          <div className="col-span-2">
            <div className="flex items-center gap-space-sm mb-space-md">
              <div className="w-6 h-6 rounded bg-primary-container/20 border border-primary flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-[16px]">hub</span>
              </div>
              <span className="font-headline-md text-headline-md text-primary font-bold tracking-tight">
                Omni<span className="text-on-surface">OPS</span>
              </span>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant max-w-sm mb-space-md">
              Autonomous site reliability &amp; mission-critical orchestration platform engineered for distributed cloud infrastructure.
            </p>
            <div className="inline-flex items-center gap-space-xs px-space-sm py-1 rounded bg-surface-container-high border border-surface-container-highest">
              <span className="w-2 h-2 rounded-full bg-secondary shadow-[0_0_8px_rgba(78,222,163,0.5)] animate-pulse"></span>
              <span className="font-label-telemetry text-label-telemetry text-secondary uppercase font-semibold">All Systems Operational</span>
              <span className="font-label-mono-sm text-label-mono-sm text-outline font-mono">99.998% SLA</span>
            </div>
          </div>

          {/* Solutions Column */}
          <div>
            <h4 className="font-badge-caps text-badge-caps uppercase tracking-wider text-outline mb-space-md font-semibold">
              Solutions
            </h4>
            <ul className="space-y-space-xs font-body-sm text-body-sm">
              <li><Link to="/features" className="text-on-surface-variant hover:text-on-surface transition-colors">SRE Automation</Link></li>
              <li><Link to="/features" className="text-on-surface-variant hover:text-on-surface transition-colors">Multi-Cloud Mesh</Link></li>
              <li><Link to="/features" className="text-on-surface-variant hover:text-on-surface transition-colors">Kubernetes Fabric</Link></li>
              <li><Link to="/features" className="text-on-surface-variant hover:text-on-surface transition-colors">Incident Command</Link></li>
            </ul>
          </div>

          {/* Developers Column */}
          <div>
            <h4 className="font-badge-caps text-badge-caps uppercase tracking-wider text-outline mb-space-md font-semibold">
              Developers
            </h4>
            <ul className="space-y-space-xs font-body-sm text-body-sm">
              <li><Link to="/cli" className="text-on-surface-variant hover:text-on-surface transition-colors">Omni CLI</Link></li>
              <li><Link to="/docs" className="text-on-surface-variant hover:text-on-surface transition-colors">REST &amp; SSE API</Link></li>
              <li><Link to="/integrations" className="text-on-surface-variant hover:text-on-surface transition-colors">Integrations</Link></li>
              <li><Link to="/docs" className="text-on-surface-variant hover:text-on-surface transition-colors">Architecture Docs</Link></li>
            </ul>
          </div>

          {/* System Column */}
          <div>
            <h4 className="font-badge-caps text-badge-caps uppercase tracking-wider text-outline mb-space-md font-semibold">
              System
            </h4>
            <ul className="space-y-space-xs font-body-sm text-body-sm">
              <li><Link to="/status" className="text-on-surface-variant hover:text-on-surface transition-colors">Platform Status</Link></li>
              <li><Link to="/pricing" className="text-on-surface-variant hover:text-on-surface transition-colors">Pricing Plans</Link></li>
              <li><Link to="/privacy" className="text-on-surface-variant hover:text-on-surface transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-on-surface-variant hover:text-on-surface transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between pt-space-lg border-t border-surface-container-high/60 gap-space-sm text-xs font-mono text-outline">
          <p>© 2026 OmniOPS Inc. Aerospace-grade telemetry architecture.</p>
          <div className="flex items-center gap-space-lg">
            <Link to="/status" className="hover:text-secondary transition-colors">Global Nodes: 1,024 Online</Link>
            <Link to="/docs" className="hover:text-primary transition-colors">v0.1.0-stable</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
