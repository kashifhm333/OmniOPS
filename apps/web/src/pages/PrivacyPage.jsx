import React from "react";

export function PrivacyPage() {
  return (
    <div className="w-full py-16 px-gutter max-w-4xl mx-auto text-left leading-relaxed">
      <h1 className="text-3xl font-bold text-on-surface mb-6">Privacy Policy</h1>
      <p className="text-xs font-mono text-outline mb-8">Last Updated: November 4, 2026</p>

      <div className="space-y-6 text-sm text-on-surface-variant">
        <section>
          <h2 className="text-lg font-bold text-on-surface mb-2">1. Data Ingestion &amp; Telemetry Boundary</h2>
          <p>
            OmniOPS operates under a strict Zero Data Retention policy for customer application payloads. Infrastructure telemetry (pod statuses, CPU/memory quotas, and sanitized log streams) is aggregated solely to render operational health dashboards.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-on-surface mb-2">2. Zero Secret Storage</h2>
          <p>
            Third-party cloud credentials and integration tokens are protected using AES-256-GCM envelope encryption. Decrypted tokens reside exclusively in ephemeral server worker memory and are never written to disk logs or client responses.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-on-surface mb-2">3. User Rights &amp; Data Deletion</h2>
          <p>
            Organization owners may delete their workspace data at any time via the administration console. Account deletion executes a cascading hard purge across all associated MongoDB collections within 30 days.
          </p>
        </section>
      </div>
    </div>
  );
}

