import React from "react";
import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="w-full bg-surface-container-lowest shadow-[0_-1px_8px_rgba(0,0,0,0.3)] pt-space-xl pb-space-lg transition-colors">
      <div className="w-full max-w-7xl mx-auto px-gutter">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-space-lg mb-space-xl">
          {/* Brand info */}
          <div className="col-span-2">
            <div className="flex items-center gap-space-sm mb-space-md">
              <img 
                alt="OmniOPS Wordmark Logo" 
                className="h-6 w-auto object-contain" 
                src="https://lh3.googleusercontent.com/aida/AEtjO1UmXp1HmzYUKQ_xvS-kaVIzKPGVJWYP7JM0TT4jDBA7rHKkhizzhDhjMfnZWn9WBKQtmtqmTKEp_lyfEBpLxVWTFnaV9EzumUXSNgcZ0x2lxdcAGCSRzHDI4O-pEFC1gTP7b-I5XQgJRijX8jr4Ml39JOeo4-SmAX_kJQQ2eSsCe6JpcL5wMIzu5NLxKR-Zp-SemYn-WQLpfauakwpO-XhJBB2Tf6nTMOSw3K2aD2Qx"
              />
              <span className="font-headline-md text-headline-md text-primary tracking-tight font-bold">
                OmniOPS
              </span>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant max-w-sm mb-space-md leading-relaxed">
              Autonomous site reliability &amp; mission-critical orchestration platform engineered for distributed cloud infrastructure.
            </p>
            <div className="inline-flex items-center gap-space-xs px-space-sm py-1 rounded bg-surface-container-high">
              <span className="w-2 h-2 rounded-full bg-secondary shadow-[0_0_8px_rgba(78,222,163,0.5)] animate-pulse"></span>
              <span className="font-label-telemetry text-label-telemetry text-secondary uppercase font-semibold">
                All Systems Operational
              </span>
              <span className="font-label-mono-sm text-label-mono-sm text-outline font-label-code">
                99.998% SLA
              </span>
            </div>
          </div>

          {/* Solutions Column */}
          <div>
            <h4 className="font-badge-caps text-badge-caps uppercase text-outline mb-space-md font-semibold">
              Solutions
            </h4>
            <ul className="space-y-space-xs font-body-sm text-body-sm">
              <li className="text-on-surface-variant">SRE Automation</li>
              <li className="text-on-surface-variant">Multi-Cloud Mesh</li>
              <li className="text-on-surface-variant">Kubernetes Fabric</li>
              <li className="text-on-surface-variant">Incident Command</li>
            </ul>
          </div>

          {/* Developers Column */}
          <div>
            <h4 className="font-badge-caps text-badge-caps uppercase text-outline mb-space-md font-semibold">
              Developers
            </h4>
            <ul className="space-y-space-xs font-body-sm text-body-sm">
              <li><Link to="/cli" className="text-on-surface-variant hover:text-on-surface transition-colors">Omni CLI</Link></li>
              <li><Link to="/docs" className="text-on-surface-variant hover:text-on-surface transition-colors">REST &amp; gRPC API</Link></li>
              <li><Link to="/integrations" className="text-on-surface-variant hover:text-on-surface transition-colors">GitHub Integration</Link></li>
              <li><Link to="/docs" className="text-on-surface-variant hover:text-on-surface transition-colors">Terraform Provider</Link></li>
            </ul>
          </div>

          {/* System Column */}
          <div>
            <h4 className="font-badge-caps text-badge-caps uppercase text-outline mb-space-md font-semibold">
              System
            </h4>
            <ul className="space-y-space-xs font-body-sm text-body-sm">
              <li><Link to="/status" className="text-on-surface-variant hover:text-on-surface transition-colors">Platform Status</Link></li>
              <li><Link to="/pricing" className="text-on-surface-variant hover:text-on-surface transition-colors">Pricing Tiers</Link></li>
              <li><Link to="/privacy" className="text-on-surface-variant hover:text-on-surface transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-on-surface-variant hover:text-on-surface transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between pt-space-lg bg-surface-container-lowest/50 gap-space-sm">
          <p className="font-label-mono-sm text-label-mono-sm text-outline font-label-code">
            © 2026 OmniOPS Inc. Aerospace-grade telemetry architecture.
          </p>
          <div className="flex items-center gap-space-lg">
            <Link to="/status" className="font-label-telemetry text-label-telemetry text-outline hover:text-secondary transition-colors">
              Global Nodes: 1,024 Online
            </Link>
            <Link to="/docs" className="font-label-telemetry text-label-telemetry text-outline hover:text-primary transition-colors">
              v3.18.4-stable
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
