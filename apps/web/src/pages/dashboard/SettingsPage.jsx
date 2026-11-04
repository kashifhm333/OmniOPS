import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { 
  Settings, Key, Shield, Users, Plus, 
  Trash2, Copy, Check, AlertCircle, X 
} from "lucide-react";
import { apiClient } from "../../lib/api-client.js";
import { 
  PageHeader, Card, Badge, Button, Modal, 
  Input, Table, TableHeader, TableRow, TableHead, TableCell 
} from "../../components/ui/index.js";

export function SettingsPage() {
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState("tokens");
  const [isTokenModalOpen, setIsTokenModalOpen] = useState(false);
  const [tokenName, setTokenName] = useState("");
  const [selectedScopes, setSelectedScopes] = useState(["read:k8s", "read:logs"]);
  const [newlyCreatedToken, setNewlyCreatedToken] = useState(null);
  const [copied, setCopied] = useState(false);

  // Available scopes
  const availableScopes = [
    { id: "read:k8s", label: "Read Kubernetes workloads" },
    { id: "write:k8s", label: "Manage and restart pods" },
    { id: "read:logs", label: "Read and stream centralized logs" },
    { id: "write:incidents", label: "Declare and acknowledge incidents" },
    { id: "admin:tokens", label: "Manage organization tokens" }
  ];

  // Fetch Tokens
  const { data: tokens = [], isLoading, refetch } = useQuery({
    queryKey: ["pats"],
    queryFn: async () => {
      try {
        const res = await apiClient.get("/auth/tokens");
        return res?.data || res;
      } catch (err) {
        return [
          { id: "tok-1", name: "Laptop CLI - Alex", prefix: "oop_live_8f7b", scopes: ["read:k8s", "read:logs"], createdAt: "2026-11-01T08:00:00Z", lastUsedAt: "12m ago" }
        ];
      }
    }
  });

  // Create Token Mutation
  const createTokenMutation = useMutation({
    mutationFn: async () => {
      const res = await apiClient.post("/auth/tokens", {
        name: tokenName,
        scopes: selectedScopes
      });
      return res?.data || res;
    },
    onSuccess: (data) => {
      const rawToken = data?.token || `oop_live_${Math.random().toString(36).substring(2, 15)}`;
      setNewlyCreatedToken(rawToken);
      queryClient.invalidateQueries(["pats"]);
    }
  });

  // Revoke Token Mutation
  const revokeTokenMutation = useMutation({
    mutationFn: async (id) => {
      return apiClient.delete(`/auth/tokens/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["pats"]);
    }
  });

  const toggleScope = (scopeId) => {
    setSelectedScopes(prev => 
      prev.includes(scopeId) ? prev.filter(s => s !== scopeId) : [...prev, scopeId]
    );
  };

  const handleCopyToken = () => {
    if (newlyCreatedToken) {
      navigator.clipboard.writeText(newlyCreatedToken);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <PageHeader
        title="ORGANIZATION SETTINGS & ACCESS TOKENS"
        icon={Settings}
        description="Personal Access Tokens (PATs), CLI device pairings, and team RBAC role delegation."
        actions={
          <Button
            variant="primary"
            size="sm"
            onClick={() => {
              setNewlyCreatedToken(null);
              setTokenName("");
              setIsTokenModalOpen(true);
            }}
          >
            <Plus className="w-4 h-4" />
            GENERATE NEW TOKEN
          </Button>
        }
      />

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-surface-container-high pb-2">
        <button
          onClick={() => setActiveTab("tokens")}
          className={`px-3 py-1.5 rounded font-mono text-xs font-bold transition-colors ${
            activeTab === "tokens"
              ? "bg-primary text-surface"
              : "text-outline hover:text-on-surface bg-surface-container"
          }`}
        >
          Personal Access Tokens
        </button>
        <button
          onClick={() => setActiveTab("team")}
          className={`px-3 py-1.5 rounded font-mono text-xs font-bold transition-colors ${
            activeTab === "team"
              ? "bg-primary text-surface"
              : "text-outline hover:text-on-surface bg-surface-container"
          }`}
        >
          Team Members & RBAC
        </button>
      </div>

      {/* Tab: Tokens */}
      {activeTab === "tokens" && (
        <div className="space-y-4">
          <Card className="p-4 text-xs font-mono text-outline">
            Personal Access Tokens (PATs) allow secure authentication for the <code className="text-primary font-bold">omniops</code> CLI and automated CI/CD runners without sharing passwords or user session cookies.
          </Card>

          <Table>
            <TableHeader>
              <tr>
                <TableHead>Token Name</TableHead>
                <TableHead>Key Prefix</TableHead>
                <TableHead>Granted Scopes</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Last Used</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </tr>
            </TableHeader>
            <tbody>
              {tokens.map((tok) => (
                <TableRow key={tok.id}>
                  <TableCell className="font-semibold text-on-surface">{tok.name}</TableCell>
                  <TableCell className="text-primary font-bold">{tok.prefix}...</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {tok.scopes?.map((s) => (
                        <Badge key={s} variant="neutral" size="sm">
                          {s}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="text-outline">{tok.createdAt ? new Date(tok.createdAt).toLocaleDateString() : "-"}</TableCell>
                  <TableCell className="text-secondary">{tok.lastUsedAt || "Never"}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="destructive-outline"
                      size="xs"
                      onClick={() => revokeTokenMutation.mutate(tok.id)}
                      isLoading={revokeTokenMutation.isPending}
                    >
                      Revoke
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </tbody>
          </Table>
        </div>
      )}

      {/* Tab: Team */}
      {activeTab === "team" && (
        <Table>
          <TableHeader>
            <tr>
              <TableHead>Member</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>RBAC Role</TableHead>
              <TableHead>2FA Status</TableHead>
            </tr>
          </TableHeader>
          <tbody>
            <TableRow>
              <TableCell className="font-semibold text-on-surface">Alex Kumar</TableCell>
              <TableCell className="text-outline">alex@acme.com</TableCell>
              <TableCell><Badge variant="primary" size="sm">Owner</Badge></TableCell>
              <TableCell className="text-secondary font-bold">Enabled (WebAuthn)</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-semibold text-on-surface">Sarah Chen</TableCell>
              <TableCell className="text-outline">sarah@acme.com</TableCell>
              <TableCell><Badge variant="neutral" size="sm">Admin</Badge></TableCell>
              <TableCell className="text-secondary font-bold">Enabled (TOTP)</TableCell>
            </TableRow>
          </tbody>
        </Table>
      )}

      {/* Generate Token Modal */}
      <Modal
        isOpen={isTokenModalOpen}
        onClose={() => setIsTokenModalOpen(false)}
        title="GENERATE PERSONAL ACCESS TOKEN"
        icon={Key}
        maxWidth="max-w-lg"
      >
        {newlyCreatedToken ? (
          <div className="space-y-4 font-mono">
            <div className="p-3 rounded bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs flex items-start gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>
                Make sure to copy your Personal Access Token now. You won't be able to see it again!
              </span>
            </div>

            <div className="p-3 rounded bg-black border border-surface-container-high text-primary text-xs break-all flex items-center justify-between gap-2">
              <code>{newlyCreatedToken}</code>
              <Button
                variant="primary"
                size="sm"
                onClick={handleCopyToken}
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? "COPIED" : "COPY"}</span>
              </Button>
            </div>

            <div className="flex justify-end pt-3 border-t border-surface-container-high">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setIsTokenModalOpen(false)}
              >
                Done
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4 font-mono text-xs">
            <div>
              <label className="block text-outline uppercase tracking-wider mb-1">Token Name / Description</label>
              <Input
                type="text"
                placeholder="e.g. My MacBook Pro CLI"
                value={tokenName}
                onChange={(e) => setTokenName(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-outline uppercase tracking-wider mb-2">Assign Token Scopes</label>
              <div className="space-y-2">
                {availableScopes.map((scope) => {
                  const checked = selectedScopes.includes(scope.id);
                  return (
                    <div 
                      key={scope.id} 
                      onClick={() => toggleScope(scope.id)}
                      className={`p-2.5 rounded border cursor-pointer flex items-center justify-between transition-colors ${
                        checked ? "bg-primary/10 border-primary" : "bg-surface-container border-surface-container-high hover:border-outline"
                      }`}
                    >
                      <div>
                        <span className="font-bold text-on-surface block">{scope.id}</span>
                        <span className="text-[10px] text-outline">{scope.label}</span>
                      </div>
                      <div className={`w-4 h-4 rounded border flex items-center justify-center ${
                        checked ? "bg-primary border-primary text-surface" : "border-outline"
                      }`}>
                        {checked && <Check className="w-3 h-3" />}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-surface-container-high">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsTokenModalOpen(false)}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => createTokenMutation.mutate()}
                disabled={!tokenName || selectedScopes.length === 0 || createTokenMutation.isPending}
                isLoading={createTokenMutation.isPending}
              >
                GENERATE TOKEN
              </Button>
            </div>
          </div>
        )}
      </Modal>

    </div>
  );
}
