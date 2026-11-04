import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { Lock, Mail, AlertCircle } from "lucide-react";
import { Card, Button, Input } from "../components/ui/index.js";

export function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const returnTo = queryParams.get("returnTo") || "/dashboard";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(email, password);
      navigate(returnTo);
    } catch (err) {
      setError(err?.message || "Invalid credentials. Please verify your email and password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center px-4 py-12">
      <Card accent="cyan" className="w-full max-w-md p-8 shadow-2xl text-left">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center text-primary mx-auto mb-3 shadow-hud-cyan">
            <span className="material-symbols-outlined text-[28px]">hub</span>
          </div>
          <h1 className="text-2xl font-bold text-on-surface tracking-tight">Sign in to OmniOPS</h1>
          <p className="text-xs text-on-surface-variant font-mono mt-1">Control Plane Authentication</p>
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
              EMAIL ADDRESS
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-outline absolute left-3 top-3 pointer-events-none" />
              <Input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="developer@company.com"
                mono
                className="pl-9 pr-3 py-2 text-sm"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-mono font-semibold text-on-surface">
                PASSWORD
              </label>
              <a href="#" className="text-xs text-primary hover:underline font-mono">Forgot?</a>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-outline absolute left-3 top-3 pointer-events-none" />
              <Input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                mono
                className="pl-9 pr-3 py-2 text-sm"
              />
            </div>
          </div>

          <Button
            type="submit"
            variant="primary"
            loading={loading}
            className="w-full py-2.5 mt-2 font-semibold text-sm"
          >
            Sign In
          </Button>
        </form>

        <div className="mt-6 pt-6 border-t border-surface-container-high text-center text-xs text-on-surface-variant">
          <span>Need an organization account? </span>
          <Link to="/register" className="text-primary hover:underline font-semibold">
            Create an organization
          </Link>
        </div>
      </Card>
    </div>
  );
}
