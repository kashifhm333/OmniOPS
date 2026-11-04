import React, { useState } from "react";
import { Shield, Lock } from "lucide-react";
import { 
  PageHeader, Card, Table, TableHeader, TableRow, 
  TableHead, TableCell, Badge, SearchInput 
} from "../../components/ui/index.js";

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
      <PageHeader
        title="IMMUTABLE AUDIT LOG & COMPLIANCE LEDGER"
        description="Tamper-evident SOC2 / ISO-27001 mutation event trail secured by SHA-256 Merkle chain verification."
        icon={Shield}
        actions={
          <Badge variant="success">
            <Lock className="w-3.5 h-3.5 mr-1" />
            MERKLE CHAIN VERIFIED
          </Badge>
        }
      />

      {/* Search Bar */}
      <Card className="p-3">
        <div className="w-full sm:w-80">
          <SearchInput
            placeholder="Search audit trail by actor, action..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </Card>

      {/* Ledger Table */}
      <Card className="overflow-hidden p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Event ID</TableHead>
              <TableHead>Timestamp</TableHead>
              <TableHead>Actor</TableHead>
              <TableHead>Action</TableHead>
              <TableHead>Target Resource</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Cryptographic Hash</TableHead>
            </TableRow>
          </TableHeader>
          <tbody>
            {filteredLogs.map((entry) => (
              <TableRow key={entry.id}>
                <TableCell className="text-primary font-bold">{entry.id}</TableCell>
                <TableCell className="text-outline">{new Date(entry.ts).toLocaleString()}</TableCell>
                <TableCell className="font-semibold text-on-surface">{entry.actor}</TableCell>
                <TableCell>
                  <span className="px-2 py-0.5 rounded bg-surface-container border border-surface-container-high font-bold text-on-surface-variant text-[11px]">
                    {entry.action}
                  </span>
                </TableCell>
                <TableCell className="text-on-surface">{entry.resource}</TableCell>
                <TableCell>
                  <Badge variant="success">
                    {entry.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right text-outline font-mono text-[11px]">
                  {entry.hash}
                </TableCell>
              </TableRow>
            ))}
          </tbody>
        </Table>
      </Card>
    </div>
  );
}
