import React from "react";

export function TermsPage() {
  return (
    <div className="w-full py-16 px-gutter max-w-4xl mx-auto text-left leading-relaxed">
      <h1 className="text-3xl font-bold text-on-surface mb-6">Terms of Service</h1>
      <p className="text-xs font-mono text-outline mb-8">Last Updated: November 4, 2026</p>

      <div className="space-y-6 text-sm text-on-surface-variant">
        <section>
          <h2 className="text-lg font-bold text-on-surface mb-2">1. Acceptance of Terms</h2>
          <p>
            By accessing or operating the OmniOPS platform or installing the <code>omniops</code> CLI, you agree to comply with these terms and our security governance baseline.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-on-surface mb-2">2. Acceptable Use &amp; Infrastructure Access</h2>
          <p>
            You agree not to use OmniOPS to conduct unauthorized penetration testing, vulnerability scanning against third-party endpoints, or bypass tenant isolation barriers. Destructive infrastructure actions are performed at the operator&apos;s sole risk.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-on-surface mb-2">3. Open Source Licensing</h2>
          <p>
            The core OmniOPS codebase is licensed under the MIT Open Source License. Enterprise hosting modules, support packages, and managed cloud deployments are subject to commercial master services agreements.
          </p>
        </section>
      </div>
    </div>
  );
}

