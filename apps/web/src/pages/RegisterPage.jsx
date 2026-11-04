import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { Lock, Mail, User, Building, AlertCircle } from "lucide-react";
import { Card, Button, Input } from "../components/ui/index.js";

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
      <Card accent="emerald" className="w-full max-w-md p-8 shadow-2xl text-left">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-xl bg-secondary/10 border border-secondary/30 flex items-center justify-center text-secondary mx-auto mb-3 shadow-hud-emerald">
            <span className="material-symbols-outlined text-[28px]">hub</span>
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
              <User className="w-4 h-4 text-outline absolute left-3 top-3 pointer-events-none" />
              <Input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Alex Mercer"
                mono
                className="pl-9 pr-3 py-2 text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono font-semibold text-on-surface mb-1.5">
              ORGANIZATION NAME
            </label>
            <div className="relative">
              <Building className="w-4 h-4 text-outline absolute left-3 top-3 pointer-events-none" />
              <Input
                type="text"
                required
                value={organizationName}
                onChange={(e) => setOrganizationName(e.target.value)}
                placeholder="Acme Cloud Corp"
                mono
                className="pl-9 pr-3 py-2 text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono font-semibold text-on-surface mb-1.5">
              WORK EMAIL
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-outline absolute left-3 top-3 pointer-events-none" />
              <Input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="alex.devops@acme.com"
                mono
                className="pl-9 pr-3 py-2 text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono font-semibold text-on-surface mb-1.5">
              SECURE PASSWORD
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-outline absolute left-3 top-3 pointer-events-none" />
              <Input
                type="password"
                required
                minLength={8}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Minimum 8 characters"
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
            Create Workspace
          </Button>
        </form>

        <div className="mt-6 pt-6 border-t border-surface-container-high text-center text-xs text-on-surface-variant">
          <span>Already registered? </span>
          <Link to="/login" className="text-primary hover:underline font-semibold">
            Sign in
          </Link>
        </div>
      </Card>
    </div>
  );
}
