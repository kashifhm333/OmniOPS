import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Terminal, Copy, Check, CheckCircle2, Shield, Zap, ArrowRight } from "lucide-react";

export function CliPage() {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState("quickstart");

  const copyCode = (code) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full py-16 px-gutter max-w-7xl mx-auto text-left">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="font-mono text-xs uppercase tracking-wider text-primary font-semibold block mb-2">
          INDEPENDENT NPM CLIENT
        </span>
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-on-surface">
          OmniOPS CLI (<code className="text-primary font-mono font-bold">omniops</code>)
        </h1>
        <p className="text-base sm:text-lg text-on-surface-variant mt-4">
          A first-class terminal experience providing 100% API parity with the web dashboard. Designed for developers, automated shell scripts, and headless CI/CD pipelines.
        </p>

        {/* Global Install Box */}
        <div className="mt-8 max-w-xl mx-auto p-4 rounded-xl bg-black border border-surface-container-high shadow-2xl flex items-center justify-between font-mono text-sm">
          <span className="text-primary">$ npm install -g omniops</span>
          <button
            onClick={() => copyCode("npm install -g omniops")}
            className="p-2 rounded bg-surface-container hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface transition-colors flex items-center gap-1.5 text-xs"
          >
            {copied ? <Check className="w-4 h-4 text-secondary" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? "Copied" : "Copy"}</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-4xl mx-auto mb-12">
        <div className="flex border-b border-surface-container-high font-mono text-sm">
          <button
            onClick={() => setActiveTab("quickstart")}
            className={`px-6 py-3 font-semibold border-b-2 transition-colors ${
              activeTab === "quickstart"
                ? "border-primary text-primary"
                : "border-transparent text-on-surface-variant hover:text-on-surface"
            }`}
          >
            Quick Start Guide
          </button>
          <button
            onClick={() => setActiveTab("commands")}
            className={`px-6 py-3 font-semibold border-b-2 transition-colors ${
              activeTab === "commands"
                ? "border-primary text-primary"
                : "border-transparent text-on-surface-variant hover:text-on-surface"
            }`}
          >
            Command Reference
          </button>
          <button
            onClick={() => setActiveTab("security")}
            className={`px-6 py-3 font-semibold border-b-2 transition-colors ${
              activeTab === "security"
                ? "border-primary text-primary"
                : "border-transparent text-on-surface-variant hover:text-on-surface"
            }`}
          >
            Keyring &amp; Security
          </button>
        </div>

        <div className="p-6 rounded-b-xl bg-surface-container border-x border-b border-surface-container-high">
          {activeTab === "quickstart" && (
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-on-surface">3 Steps to Terminal Bliss</h3>
              <div className="space-y-4">
                <div className="p-4 rounded bg-surface-container-low border border-surface-container-high">
                  <h4 className="text-sm font-semibold text-primary mb-1">1. Authenticate with Device Grant</h4>
                  <pre className="p-2.5 rounded bg-black text-gray-300 font-mono text-xs overflow-x-auto">
                    $ omniops auth login
                  </pre>
                  <p className="text-xs text-on-surface-variant mt-2">
                    Opens your browser to confirm a one-time verification code. Secure token is saved directly to your OS keyring.
                  </p>
                </div>

                <div className="p-4 rounded bg-surface-container-low border border-surface-container-high">
                  <h4 className="text-sm font-semibold text-primary mb-1">2. Check Cluster Status</h4>
                  <pre className="p-2.5 rounded bg-black text-gray-300 font-mono text-xs overflow-x-auto">
                    $ omniops status
                  </pre>
                  <p className="text-xs text-on-surface-variant mt-2">
                    Renders an operational health table across all your Kubernetes clusters, active alerts, and CI workflows.
                  </p>
                </div>

                <div className="p-4 rounded bg-surface-container-low border border-surface-container-high">
                  <h4 className="text-sm font-semibold text-primary mb-1">3. Tail Pod Logs with Redaction</h4>
                  <pre className="p-2.5 rounded bg-black text-gray-300 font-mono text-xs overflow-x-auto">
                    $ omniops k8s logs api-gateway -n production --tail 50
                  </pre>
                  <p className="text-xs text-on-surface-variant mt-2">
                    Real-time SSE log tailing with automated client-side and server-side secret masking.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "commands" && (
            <div className="space-y-4 text-sm font-mono">
              <div className="p-3 rounded bg-surface-container-low border border-surface-container-high flex justify-between items-center">
                <span><code className="text-primary font-bold">omniops status [--json]</code></span>
                <span className="text-xs text-on-surface-variant">Displays command center summary</span>
              </div>
              <div className="p-3 rounded bg-surface-container-low border border-surface-container-high flex justify-between items-center">
                <span><code className="text-primary font-bold">omniops k8s pods [-n namespace]</code></span>
                <span className="text-xs text-on-surface-variant">Lists active cluster pods</span>
              </div>
              <div className="p-3 rounded bg-surface-container-low border border-surface-container-high flex justify-between items-center">
                <span><code className="text-primary font-bold">omniops incident list</code></span>
                <span className="text-xs text-on-surface-variant">Lists active SEV incidents</span>
              </div>
              <div className="p-3 rounded bg-surface-container-low border border-surface-container-high flex justify-between items-center">
                <span><code className="text-primary font-bold">omniops incident ack &lt;id&gt;</code></span>
                <span className="text-xs text-on-surface-variant">Acknowledges incident (Operator role)</span>
              </div>
              <div className="p-3 rounded bg-surface-container-low border border-surface-container-high flex justify-between items-center">
                <span><code className="text-primary font-bold">omniops logs search --query &quot;timeout&quot;</code></span>
                <span className="text-xs text-on-surface-variant">Full-text structured log search</span>
              </div>
            </div>
          )}

          {activeTab === "security" && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-on-surface">Operating System Native Keyring Integration</h3>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                OmniOPS adheres to a strict Zero-Plaintext default. Tokens generated during login are never saved in cleartext inside user home folders or unencrypted history files.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
                <div className="p-4 rounded bg-surface-container-low border border-surface-container-high">
                  <h4 className="font-bold text-sm text-on-surface">macOS</h4>
                  <p className="text-xs text-on-surface-variant mt-1">Apple Keychain Services API with hardware Secure Enclave integration.</p>
                </div>
                <div className="p-4 rounded bg-surface-container-low border border-surface-container-high">
                  <h4 className="font-bold text-sm text-on-surface">Linux</h4>
                  <p className="text-xs text-on-surface-variant mt-1">Freedesktop Secret Service (GNOME Keyring / KWallet via DBus).</p>
                </div>
                <div className="p-4 rounded bg-surface-container-low border border-surface-container-high">
                  <h4 className="font-bold text-sm text-on-surface">Windows</h4>
                  <p className="text-xs text-on-surface-variant mt-1">Windows Credential Manager with Data Protection API (DPAPI).</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

