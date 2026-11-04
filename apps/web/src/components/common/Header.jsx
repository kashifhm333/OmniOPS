import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import { 
  Sun, Moon, LayoutDashboard, GitBranch, Terminal, Shield, 
  Boxes, Server, AlertTriangle, Layers, Users, Sparkles, ChevronDown, LogOut
} from "lucide-react";

export function Header() {
  const { theme, toggleTheme } = useTheme();
  const { user, activeOrg, isAuthenticated, logout } = useAuth();
  const [platformOpen, setPlatformOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <header className="fixed top-0 w-full z-50 bg-surface/90 backdrop-blur-xl border-b border-surface-container-high shadow-hud-surface transition-colors">
      <div className="h-16 w-full max-w-7xl mx-auto px-gutter flex items-center justify-between">
        {/* Left: Brand Logo & Nav */}
        <div className="flex items-center gap-space-lg">
          <Link to="/" className="flex items-center gap-space-sm group">
            <div className="w-8 h-8 rounded bg-primary-container/20 border border-primary flex items-center justify-center text-primary shadow-[0_0_12px_rgba(6,182,212,0.3)]">
              <span className="material-symbols-outlined text-[20px]">hub</span>
            </div>
            <span className="font-headline-md text-headline-md text-primary font-bold tracking-tight">
              Omni<span className="text-on-surface">OPS</span>
            </span>
          </Link>

          <div className="h-5 w-px bg-surface-container-highest hidden lg:block"></div>

          <nav className="hidden lg:flex items-center gap-space-xs">
            {/* Platform Dropdown */}
            <div 
              className="relative group" 
              onMouseEnter={() => setPlatformOpen(true)}
              onMouseLeave={() => setPlatformOpen(false)}
            >
              <button 
                type="button" 
                className="flex items-center gap-1 px-space-sm py-1.5 text-on-surface-variant font-body-md hover:text-on-surface rounded transition-colors"
              >
                Platform
                <ChevronDown className={`w-4 h-4 text-outline transition-transform duration-200 ${platformOpen ? "rotate-180" : ""}`} />
              </button>

              {platformOpen && (
                <div className="absolute top-full left-0 mt-1 w-[480px] p-space-md bg-surface-container-low border border-surface-container-high shadow-[0_8px_24px_rgba(0,0,0,0.5)] rounded-xl z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                  <div className="grid grid-cols-2 gap-1.5">
                    <Link to="/features" className="p-2.5 rounded-lg hover:bg-surface-container transition-colors flex items-start gap-2">
                      <LayoutDashboard className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                      <div>
                        <span className="text-xs font-semibold text-on-surface block">Command Center</span>
                        <span className="text-[11px] text-on-surface-variant block">Unified telemetry HUD</span>
                      </div>
                    </Link>
                    <Link to="/features" className="p-2.5 rounded-lg hover:bg-surface-container transition-colors flex items-start gap-2">
                      <GitBranch className="w-4 h-4 text-secondary mt-0.5 shrink-0" />
                      <div>
                        <span className="text-xs font-semibold text-on-surface block">GitHub &amp; CI/CD</span>
                        <span className="text-[11px] text-on-surface-variant block">Pipeline &amp; PR sync</span>
                      </div>
                    </Link>
                    <Link to="/features" className="p-2.5 rounded-lg hover:bg-surface-container transition-colors flex items-start gap-2">
                      <Boxes className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                      <div>
                        <span className="text-xs font-semibold text-on-surface block">Kubernetes</span>
                        <span className="text-[11px] text-on-surface-variant block">Multi-cluster mesh</span>
                      </div>
                    </Link>
                    <Link to="/features" className="p-2.5 rounded-lg hover:bg-surface-container transition-colors flex items-start gap-2">
                      <Terminal className="w-4 h-4 text-tertiary mt-0.5 shrink-0" />
                      <div>
                        <span className="text-xs font-semibold text-on-surface block">Centralized Logs</span>
                        <span className="text-[11px] text-on-surface-variant block">Redacted real-time streams</span>
                      </div>
                    </Link>
                    <Link to="/features" className="p-2.5 rounded-lg hover:bg-surface-container transition-colors flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-error mt-0.5 shrink-0" />
                      <div>
                        <span className="text-xs font-semibold text-on-surface block">Incident Command</span>
                        <span className="text-[11px] text-on-surface-variant block">SEV triage rooms</span>
                      </div>
                    </Link>
                    <Link to="/features" className="p-2.5 rounded-lg hover:bg-surface-container transition-colors flex items-start gap-2">
                      <Sparkles className="w-4 h-4 text-tertiary mt-0.5 shrink-0" />
                      <div>
                        <span className="text-xs font-semibold text-on-surface block">AI DevOps Copilot</span>
                        <span className="text-[11px] text-on-surface-variant block">Root cause diagnostics</span>
                      </div>
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <Link to="/features" className="px-space-sm py-1.5 text-on-surface-variant font-body-md hover:text-on-surface rounded transition-colors">
              Features
            </Link>
            <Link to="/integrations" className="px-space-sm py-1.5 text-on-surface-variant font-body-md hover:text-on-surface rounded transition-colors">
              Integrations
            </Link>
            <Link to="/cli" className="px-space-sm py-1.5 text-on-surface-variant font-body-md hover:text-on-surface rounded transition-colors">
              CLI
            </Link>
            <Link to="/pricing" className="px-space-sm py-1.5 text-on-surface-variant font-body-md hover:text-on-surface rounded transition-colors">
              Pricing
            </Link>
            <Link to="/docs" className="px-space-sm py-1.5 text-on-surface-variant font-body-md hover:text-on-surface rounded transition-colors">
              Docs
            </Link>
            <Link to="/status" className="px-space-sm py-1.5 text-on-surface-variant font-body-md hover:text-on-surface rounded transition-colors">
              Status
            </Link>
          </nav>
        </div>

        {/* Right: Actions, Theme Switcher, Auth */}
        <div className="flex items-center gap-space-sm">
          {/* Theme Toggle Button */}
          <button 
            type="button" 
            aria-label="Toggle dark/light mode" 
            onClick={toggleTheme}
            className="h-8 px-2.5 py-1 rounded-full bg-surface-container border border-surface-container-high flex items-center gap-1.5 hover:border-outline text-on-surface-variant hover:text-on-surface transition-all"
          >
            {theme === "dark" ? (
              <>
                <Moon className="w-3.5 h-3.5 text-primary" />
                <span className="text-xs font-mono font-medium hidden sm:inline">DARK</span>
              </>
            ) : (
              <>
                <Sun className="w-3.5 h-3.5 text-amber-500" />
                <span className="text-xs font-mono font-medium hidden sm:inline">LIGHT</span>
              </>
            )}
          </button>

          {isAuthenticated ? (
            <div className="flex items-center gap-space-sm">
              <Link 
                to="/dashboard" 
                className="px-space-md py-1.5 bg-primary-container text-on-primary-container font-body-md font-semibold rounded hover:bg-primary hover:text-on-primary shadow-hud-cyan transition-all text-xs flex items-center gap-1.5"
              >
                <LayoutDashboard className="w-3.5 h-3.5" />
                <span>Command Center</span>
              </Link>
              <button 
                onClick={handleLogout}
                title="Sign out"
                className="p-1.5 rounded text-on-surface-variant hover:text-error hover:bg-surface-container transition-colors"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-space-xs">
              <Link 
                to="/login" 
                className="hidden sm:inline-flex px-space-sm py-1.5 text-on-surface-variant hover:text-on-surface font-body-md text-sm transition-colors"
              >
                Login
              </Link>
              <Link 
                to="/register" 
                className="px-space-md py-1.5 bg-primary-container text-on-primary-container font-body-md text-sm font-semibold rounded hover:bg-primary hover:text-on-primary shadow-hud-cyan transition-all"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
