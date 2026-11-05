import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import { 
  LayoutDashboard, GitBranch, Terminal, 
  Boxes, Server, AlertTriangle, Layers, Users, Sparkles, ChevronDown, LogOut,
  Activity, Cloud, Cpu
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

  const platformModules = [
    { title: "Command Center", desc: "Unified telemetry HUD", icon: LayoutDashboard, path: "/dashboard", color: "text-primary" },
    { title: "GitHub", desc: "Repo & sync webhooks", icon: GitBranch, path: "/dashboard/cicd", color: "text-secondary" },
    { title: "CI/CD", desc: "Pipeline automations", icon: Layers, path: "/dashboard/cicd", color: "text-tertiary" },
    { title: "Docker", desc: "Image registry & builds", icon: Server, path: "/dashboard/docker", color: "text-primary" },
    { title: "Kubernetes", desc: "Cluster mesh operator", icon: Boxes, path: "/dashboard/kubernetes", color: "text-primary" },
    { title: "Monitoring", desc: "APM & node matrix", icon: Activity, path: "/dashboard/monitoring", color: "text-secondary" },
    { title: "Logging", desc: "Log streamer console", icon: Terminal, path: "/dashboard/logs", color: "text-tertiary" },
    { title: "Cloud", desc: "Multi-region topology", icon: Cloud, path: "/features", color: "text-primary" },
    { title: "Incidents", desc: "SRE war room alerts", icon: AlertTriangle, path: "/dashboard/incidents", color: "text-error" },
    { title: "Terraform", desc: "Declarative state engine", icon: Cpu, path: "/features", color: "text-tertiary" },
    { title: "Teams", desc: "RBAC & security policies", icon: Users, path: "/dashboard/settings", color: "text-outline" },
    { title: "AI Assistant", desc: "Diagnostic copilot", icon: Sparkles, path: "/features", color: "text-secondary" },
  ];

  return (
    <header className="fixed top-0 w-full z-50 bg-surface/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.25)] transition-colors">
      <div className="h-16 w-full max-w-7xl mx-auto px-gutter flex items-center justify-between">
        {/* Left: Brand Logo & Nav */}
        <div className="flex items-center gap-space-lg">
          <Link to="/" className="flex items-center gap-space-sm group">
            <img 
              alt="OmniOPS Wordmark Logo" 
              className="h-8 w-auto object-contain" 
              src="https://lh3.googleusercontent.com/aida/AEtjO1UmXp1HmzYUKQ_xvS-kaVIzKPGVJWYP7JM0TT4jDBA7rHKkhizzhDhjMfnZWn9WBKQtmtqmTKEp_lyfEBpLxVWTFnaV9EzumUXSNgcZ0x2lxdcAGCSRzHDI4O-pEFC1gTP7b-I5XQgJRijX8jr4Ml39JOeo4-SmAX_kJQQ2eSsCe6JpcL5wMIzu5NLxKR-Zp-SemYn-WQLpfauakwpO-XhJBB2Tf6nTMOSw3K2aD2Qx"
            />
            <span className="font-headline-md text-headline-md text-primary font-bold tracking-tight">
              OmniOPS
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
                <div className="absolute top-full left-0 mt-1 w-[460px] p-space-md bg-surface-container-low shadow-[0_8px_24px_rgba(0,0,0,0.5)] rounded-xl z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                  <div className="grid grid-cols-2 gap-space-xs">
                    {platformModules.map((mod, idx) => {
                      const Icon = mod.icon;
                      return (
                        <Link 
                          key={idx} 
                          to={mod.path} 
                          className="p-space-sm rounded hover:bg-surface-container-high transition-colors flex items-start gap-2"
                        >
                          <Icon className={`w-4 h-4 ${mod.color} mt-0.5 shrink-0`} />
                          <div>
                            <span className="font-title-sm text-title-sm text-on-surface block">{mod.title}</span>
                            <span className="font-body-sm text-body-sm text-outline block">{mod.desc}</span>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            <Link to="/integrations" className="px-space-sm py-1.5 text-on-surface-variant font-body-md text-body-md hover:text-on-surface rounded transition-colors">
              Integrations
            </Link>
            <Link to="/cli" className="px-space-sm py-1.5 text-on-surface-variant font-body-md text-body-md hover:text-on-surface rounded transition-colors">
              CLI
            </Link>
            <Link to="/docs" className="px-space-sm py-1.5 text-on-surface-variant font-body-md text-body-md hover:text-on-surface rounded transition-colors">
              Docs
            </Link>
            <Link to="/pricing" className="px-space-sm py-1.5 text-on-surface-variant font-body-md text-body-md hover:text-on-surface rounded transition-colors">
              Pricing
            </Link>
          </nav>
        </div>

        {/* Right: Actions, Sliding Theme Switcher, Auth */}
        <div className="flex items-center gap-space-md">
          {/* Sliding Theme Toggle Switch */}
          <button 
            type="button" 
            aria-label="Toggle dark mode" 
            onClick={toggleTheme}
            className="h-8 px-space-xs py-1 rounded bg-surface-container flex items-center gap-1.5 hover:bg-surface-container-high transition-colors"
          >
            <span className="material-symbols-outlined text-[16px] text-outline dark:text-primary">dark_mode</span>
            <div className="w-7 h-4 rounded-full bg-surface-container-highest relative flex items-center p-0.5">
              <div className={`w-3 h-3 rounded-full bg-primary transform transition-transform duration-200 ${theme === "dark" ? "translate-x-3" : "translate-x-0"}`}></div>
            </div>
            <span className="material-symbols-outlined text-[16px] text-outline dark:text-outline-variant">light_mode</span>
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
                className="hidden sm:inline-flex px-space-sm py-1.5 text-on-surface-variant font-body-md text-body-md hover:text-on-surface transition-colors"
              >
                Login
              </Link>
              <Link 
                to="/register" 
                className="px-space-md py-1.5 bg-primary-container text-on-primary-container font-body-md text-body-md font-semibold rounded hover:bg-primary hover:text-on-primary shadow-[0_0_12px_rgba(6,182,212,0.3)] transition-all"
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
