import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { Lock, Mail, User, Building, AlertCircle, ArrowRight, Loader2 } from "lucide-react";

export function RegisterPage() {
  const [fullName, setFullName] = useState("");
  const [organizationName, setOrganizationName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await register({ fullName, organizationName, email, password });
      navigate("/dashboard");
    } catch (err) {
      setError(err?.message || "Failed to create organization account.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md p-8 rounded-2xl bg-surface-container border border-surface-container-high shadow-2xl text-left">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center text-primary mx-auto mb-3">
            <span className="material-symbols-outlined text-[24px]">hub</span>
          </div>
          <h1 className="text-2xl font-bold text-on-surface tracking-tight">Create Organization</h1>
          <p className="text-xs text-on-surface-variant font-mono mt-1">Deploy an OmniOPS Control Plane</p>
        </div>

        {error && (
          <div className="p-3 rounded-lg bg-error/10 border border-error/30 text-error text-xs flex items-center gap-2 mb-6">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-mono font-semibold text-on-surface mb-1.5">
              YOUR FULL NAME
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-outline absolute left-3 top-3" />
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Alex Mercer"
                className="w-full pl-9 pr-3 py-2 rounded bg-surface-container-lowest border border-surface-container-high text-on-surface text-sm focus:outline-none focus:border-primary transition-colors font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono font-semibold text-on-surface mb-1.5">
              ORGANIZATION NAME
            </label>
            <div className="relative">
              <Building className="w-4 h-4 text-outline absolute left-3 top-3" />
              <input
                type="text"
                required
                value={organizationName}
                onChange={(e) => setOrganizationName(e.target.value)}
                placeholder="Acme Cloud Corp"
                className="w-full pl-9 pr-3 py-2 rounded bg-surface-container-lowest border border-surface-container-high text-on-surface text-sm focus:outline-none focus:border-primary transition-colors font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono font-semibold text-on-surface mb-1.5">
              WORK EMAIL
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-outline absolute left-3 top-3" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="alex.devops@acme.com"
                className="w-full pl-9 pr-3 py-2 rounded bg-surface-container-lowest border border-surface-container-high text-on-surface text-sm focus:outline-none focus:border-primary transition-colors font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono font-semibold text-on-surface mb-1.5">
              SECURE PASSWORD
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-outline absolute left-3 top-3" />
              <input
                type="password"
                required
                minLength={8}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Minimum 8 characters"
                className="w-full pl-9 pr-3 py-2 rounded bg-surface-container-lowest border border-surface-container-high text-on-surface text-sm focus:outline-none focus:border-primary transition-colors font-mono"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 bg-primary-container hover:bg-primary text-on-primary-container hover:text-on-primary font-semibold text-sm rounded shadow-hud-cyan transition-all flex items-center justify-center gap-2 mt-2 disabled:opacity-50"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <span>Create Workspace</span>}
          </button>
        </form>

        <div className="mt-6 pt-6 border-t border-surface-container-high text-center text-xs text-on-surface-variant">
          <span>Already registered? </span>
          <Link to="/login" className="text-primary hover:underline font-semibold">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
