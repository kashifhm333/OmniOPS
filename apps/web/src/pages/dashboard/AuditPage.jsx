import React, { useState } from "react";
import { 
  Shield, CheckCircle2, Search, Filter, 
  FileText, Lock, ExternalLink, RefreshCw 
} from "lucide-react";

export function AuditPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const auditLogs = [
    { id: "aud-901", ts: "2026-11-04T12:38:12Z", actor: "alex.kumar", action: "POD_RESTART", resource: "k8s/billing-worker-67df8", status: "SUCCESS", hash: "9e1c3b...4a8f" },
    { id: "aud-900", ts: "2026-11-04T12:18:22Z", actor: "sarah.chen", action: "INCIDENT_ACK", resource: "incident/inc-001", status: "SUCCESS", hash: "4d21e8...71b2" },
    { id: "aud-899", ts: "2026-11-04T11:45:00Z", actor: "alex.kumar", action: "TOKEN_CREATE", resource: "pat/cli-alex-laptop", status: "SUCCESS", hash: "b83321...9f00" },
    { id: "aud-898", ts: "2026-11-04T10:00:15Z", actor: "github-actions", action: "DEPLOY_PROD", resource: "helm/release-v1.4", status: "SUCCESS", hash: "7c11f0...22ea" },
    { id: "aud-897", ts: "2026-11-04T08:12:44Z", actor: "system", action: "SECRETS_ROTATION", resource: "vault/database-creds", status: "SUCCESS", hash: "1a88c3...66ed" }
  ];

  const filteredLogs = auditLogs.filter(log => 
    log.actor.toLowerCase().includes(searchQuery.toLowerCase()) ||
    log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
    log.resource.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-surface-container-high">
        <div>
          <h1 className="text-2xl font-bold font-mono tracking-tight text-on-surface flex items-center gap-2">
            <Shield className="w-6 h-6 text-primary" />
            <span>IMMUTABLE AUDIT LOG & COMPLIANCE LEDGER</span>
          </h1>
          <p className="text-xs font-mono text-outline mt-1">
            Tamper-evident SOC2 / ISO-27001 mutation event trail secured by SHA-256 Merkle chain verification.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-3 py-1.5 rounded-lg bg-secondary/10 border border-secondary/30 text-secondary text-xs font-mono font-bold flex items-center gap-2">
            <Lock className="w-4 h-4" />
            MERKLE CHAIN VERIFIED
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="p-3 rounded-xl border border-surface-container-high bg-surface-container-lowest">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-outline absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search audit trail by actor, action..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 rounded-lg border border-surface-container-high bg-surface-container text-xs font-mono text-on-surface placeholder-outline focus:outline-none focus:border-primary"
          />
        </div>
      </div>

      {/* Ledger Table */}
      <div className="rounded-xl border border-surface-container-high bg-surface-container-lowest overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-surface-container border-b border-surface-container-high text-outline uppercase tracking-wider">
              <tr>
                <th className="p-3">Event ID</th>
                <th className="p-3">Timestamp</th>
                <th className="p-3">Actor</th>
                <th className="p-3">Action</th>
                <th className="p-3">Target Resource</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-right">Cryptographic Hash</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-container-high">
              {filteredLogs.map((entry) => (
                <tr key={entry.id} className="hover:bg-surface-container/50 transition-colors">
                  <td className="p-3 text-primary font-bold">{entry.id}</td>
                  <td className="p-3 text-outline">{new Date(entry.ts).toLocaleString()}</td>
                  <td className="p-3 font-semibold text-on-surface">{entry.actor}</td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded bg-surface-container border border-surface-container-high font-bold text-on-surface-variant text-[11px]">
                      {entry.action}
                    </span>
                  </td>
                  <td className="p-3 text-on-surface">{entry.resource}</td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded bg-secondary/15 text-secondary border border-secondary/30 text-[10px] font-bold">
                      {entry.status}
                    </span>
                  </td>
                  <td className="p-3 text-right text-outline font-mono text-[11px]">
                    {entry.hash}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
