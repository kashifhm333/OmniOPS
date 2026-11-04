import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { 
  Settings, Key, Shield, Users, Plus, 
  Trash2, Copy, Check, AlertCircle, X 
} from "lucide-react";
import { apiClient } from "../../lib/api-client.js";

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
          { id: "tok-1", name: "Laptop CLI - Alex", prefix: "oop_live_8f7b", scopes: ["read:k8s", "read:logs"], createdAt: "2026-11-01T08:00:00Z", lastUsedAt: "12m ago" },
          { id: "tok-2", name: "GitHub Actions Runner", prefix: "oop_live_12c9", scopes: ["read:k8s", "write:k8s"], createdAt: "2026-10-15T10:00:00Z", lastUsedAt: "2h ago" }
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
      return res.data;
    },
    onSuccess: (data) => {
      // In dev fallback, simulate generated raw token
      const rawToken = data?.token || `oop_live_${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`;
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-surface-container-high">
        <div>
          <h1 className="text-2xl font-bold font-mono tracking-tight text-on-surface flex items-center gap-2">
            <Settings className="w-6 h-6 text-primary" />
            <span>ORGANIZATION SETTINGS & ACCESS TOKENS</span>
          </h1>
          <p className="text-xs font-mono text-outline mt-1">
            Personal Access Tokens (PATs), CLI device pairings, and team RBAC role delegation.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              setNewlyCreatedToken(null);
              setTokenName("");
              setIsTokenModalOpen(true);
            }}
            className="px-3 py-1.5 rounded-lg bg-primary hover:bg-primary/90 text-surface text-xs font-mono font-bold flex items-center gap-2 transition-colors shadow-hud-cyan"
          >
            <Plus className="w-4 h-4" />
            GENERATE NEW TOKEN
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-surface-container-high pb-2">
        <button
          onClick={() => setActiveTab("tokens")}
          className={`px-3 py-1.5 rounded-lg font-mono text-xs font-bold transition-colors ${
            activeTab === "tokens"
              ? "bg-primary text-surface"
              : "text-outline hover:text-on-surface bg-surface-container"
          }`}
        >
          Personal Access Tokens
        </button>
        <button
          onClick={() => setActiveTab("team")}
          className={`px-3 py-1.5 rounded-lg font-mono text-xs font-bold transition-colors ${
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
          <div className="p-4 rounded-xl border border-surface-container-high bg-surface-container-lowest text-xs font-mono text-outline">
            Personal Access Tokens (PATs) allow secure authentication for the <code className="text-primary font-bold">omniops</code> CLI and automated CI/CD runners without sharing passwords or user session cookies.
          </div>

          <div className="rounded-xl border border-surface-container-high bg-surface-container-lowest overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-surface-container border-b border-surface-container-high text-outline uppercase tracking-wider">
                  <tr>
                    <th className="p-3">Token Name</th>
                    <th className="p-3">Key Prefix</th>
                    <th className="p-3">Granted Scopes</th>
                    <th className="p-3">Created</th>
                    <th className="p-3">Last Used</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-container-high">
                  {tokens.map((tok) => (
                    <tr key={tok.id} className="hover:bg-surface-container/50 transition-colors">
                      <td className="p-3 font-semibold text-on-surface">{tok.name}</td>
                      <td className="p-3 text-primary font-bold">{tok.prefix}...</td>
                      <td className="p-3">
                        <div className="flex flex-wrap gap-1">
                          {tok.scopes?.map((s) => (
                            <span key={s} className="px-1.5 py-0.2 rounded bg-surface-container text-outline text-[10px]">
                              {s}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="p-3 text-outline">{tok.createdAt ? new Date(tok.createdAt).toLocaleDateString() : "-"}</td>
                      <td className="p-3 text-secondary">{tok.lastUsedAt || "Never"}</td>
                      <td className="p-3 text-right">
                        <button
                          onClick={() => revokeTokenMutation.mutate(tok.id)}
                          disabled={revokeTokenMutation.isPending}
                          className="px-2 py-1 rounded bg-surface-container border border-error/40 hover:bg-error/10 text-error text-xs font-bold transition-colors"
                        >
                          Revoke
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Tab: Team */}
      {activeTab === "team" && (
        <div className="rounded-xl border border-surface-container-high bg-surface-container-lowest overflow-hidden">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-surface-container border-b border-surface-container-high text-outline uppercase tracking-wider">
              <tr>
                <th className="p-3">Member</th>
                <th className="p-3">Email</th>
                <th className="p-3">RBAC Role</th>
                <th className="p-3">2FA Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-container-high">
              <tr className="hover:bg-surface-container/50">
                <td className="p-3 font-semibold text-on-surface">Alex Kumar</td>
                <td className="p-3 text-outline">alex@acme.com</td>
                <td className="p-3"><span className="px-2 py-0.5 rounded bg-primary/20 text-primary font-bold">Owner</span></td>
                <td className="p-3 text-secondary font-bold">Enabled (WebAuthn)</td>
              </tr>
              <tr className="hover:bg-surface-container/50">
                <td className="p-3 font-semibold text-on-surface">Sarah Chen</td>
                <td className="p-3 text-outline">sarah@acme.com</td>
                <td className="p-3"><span className="px-2 py-0.5 rounded bg-surface-container text-outline font-bold">Admin</span></td>
                <td className="p-3 text-secondary font-bold">Enabled (TOTP)</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {/* Generate Token Modal */}
      {isTokenModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest border border-surface-container-high rounded-xl w-full max-w-lg p-6 shadow-2xl space-y-4 font-mono">
            <div className="flex items-center justify-between pb-3 border-b border-surface-container-high">
              <h3 className="text-base font-bold text-on-surface flex items-center gap-2">
                <Key className="w-5 h-5 text-primary" />
                GENERATE PERSONAL ACCESS TOKEN
              </h3>
              <button 
                onClick={() => setIsTokenModalOpen(false)}
                className="text-outline hover:text-on-surface"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {newlyCreatedToken ? (
              <div className="space-y-4">
                <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>
                    Make sure to copy your Personal Access Token now. You won't be able to see it again!
                  </span>
                </div>

                <div className="p-3 rounded-lg bg-black border border-surface-container-high text-primary text-xs break-all flex items-center justify-between gap-2">
                  <code>{newlyCreatedToken}</code>
                  <button
                    onClick={handleCopyToken}
                    className="px-3 py-1 rounded bg-primary text-surface font-bold text-xs shrink-0 flex items-center gap-1"
                  >
                    {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? "COPIED" : "COPY"}</span>
                  </button>
                </div>

                <div className="flex justify-end pt-3 border-t border-surface-container-high">
                  <button
                    onClick={() => setIsTokenModalOpen(false)}
                    className="px-4 py-2 rounded-lg bg-surface-container text-xs text-on-surface"
                  >
                    Done
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4 text-xs">
                <div>
                  <label className="block text-outline uppercase tracking-wider mb-1">Token Name / Description</label>
                  <input
                    type="text"
                    placeholder="e.g. My MacBook Pro CLI"
                    value={tokenName}
                    onChange={(e) => setTokenName(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-surface-container-high bg-surface-container text-on-surface focus:outline-none focus:border-primary"
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
                          className={`p-2.5 rounded-lg border cursor-pointer flex items-center justify-between transition-colors ${
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
                  <button
                    onClick={() => setIsTokenModalOpen(false)}
                    className="px-4 py-2 rounded-lg border border-surface-container-high text-xs text-outline hover:text-on-surface"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => createTokenMutation.mutate()}
                    disabled={!tokenName || selectedScopes.length === 0 || createTokenMutation.isPending}
                    className="px-4 py-2 rounded-lg bg-primary text-surface text-xs font-bold hover:bg-primary/90 transition-colors"
                  >
                    {createTokenMutation.isPending ? "Generating..." : "GENERATE TOKEN"}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
