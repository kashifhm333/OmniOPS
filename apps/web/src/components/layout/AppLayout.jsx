import React, { useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import { useTheme } from "../../context/ThemeContext.jsx";
import { 
  LayoutDashboard, Boxes, Terminal, AlertTriangle, GitBranch, 
  Server, Activity, Shield, Users, Settings, Sun, Moon, LogOut, 
  ChevronRight, ChevronDown, Bell, Layers, Sparkles
} from "lucide-react";

export function AppLayout() {
  const { user, activeOrg, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  const navItems = [
    { label: "Command Center", path: "/dashboard", icon: LayoutDashboard },
    { label: "Kubernetes Fleets", path: "/dashboard/kubernetes", icon: Boxes },
    { label: "Incident Command", path: "/dashboard/incidents", icon: AlertTriangle, badge: "1 Active" },
    { label: "Centralized Logs", path: "/dashboard/logs", icon: Terminal },
    { label: "CI/CD Pipelines", path: "/dashboard/cicd", icon: GitBranch },
    { label: "Docker Containers", path: "/dashboard/docker", icon: Server },
    { label: "Infra Monitoring", path: "/dashboard/monitoring", icon: Activity },
    { label: "Team & Tokens", path: "/dashboard/settings", icon: Settings },
    { label: "Audit Ledger", path: "/dashboard/audit", icon: Shield }
  ];

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <div className="min-h-screen flex bg-surface text-on-surface antialiased transition-colors">
      
      {/* =========================================================================
          LEFT NAVIGATION SIDEBAR
          ========================================================================= */}
      <aside className={`h-screen sticky top-0 flex flex-col justify-between border-r border-surface-container-high bg-surface-container-lowest/90 backdrop-blur-md transition-all duration-200 z-40 ${
        collapsed ? "w-16" : "w-64"
      }`}>
        <div>
          {/* Brand header */}
          <div className="h-16 px-4 flex items-center justify-between border-b border-surface-container-high">
            {!collapsed ? (
              <Link to="/dashboard" className="flex items-center gap-2 group">
                <div className="w-7 h-7 rounded bg-primary-container/20 border border-primary flex items-center justify-center text-primary shadow-[0_0_10px_rgba(6,182,212,0.3)]">
                  <span className="material-symbols-outlined text-[18px]">hub</span>
                </div>
                <span className="font-bold text-base text-primary tracking-tight font-mono">
                  Omni<span className="text-on-surface">OPS</span>
                </span>
              </Link>
            ) : (
              <div className="w-7 h-7 rounded bg-primary-container/20 border border-primary flex items-center justify-center text-primary mx-auto">
                <span className="material-symbols-outlined text-[18px]">hub</span>
              </div>
            )}
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="text-on-surface-variant hover:text-on-surface p-1 rounded hidden lg:block"
              title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              <ChevronRight className={`w-4 h-4 transition-transform duration-200 ${collapsed ? "" : "rotate-180"}`} />
            </button>
          </div>

          {/* Org selector widget */}
          {!collapsed && (
            <div className="p-3 border-b border-surface-container-high">
              <div className="p-2 rounded-lg bg-surface-container border border-surface-container-high flex items-center justify-between text-xs">
                <div>
                  <span className="text-[10px] font-mono text-outline block uppercase tracking-wider">WORKSPACE</span>
                  <span className="font-bold text-on-surface block truncate max-w-[140px]">
                    {activeOrg?.name || "Acme Cloud Corp"}
                  </span>
                </div>
                <span className="px-1.5 py-0.5 rounded bg-primary/10 text-primary font-mono text-[10px] font-semibold">
                  PROD
                </span>
              </div>
            </div>
          )}

          {/* Navigation Links */}
          <nav className="p-3 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                    isActive
                      ? "bg-primary-container text-on-primary-container shadow-hud-cyan font-bold"
                      : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container"
                  }`}
                  title={collapsed ? item.label : undefined}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  {!collapsed && (
                    <div className="flex-1 flex items-center justify-between">
                      <span>{item.label}</span>
                      {item.badge && (
                        <span className="px-1.5 py-0.5 rounded bg-error/20 text-error text-[10px] font-mono">
                          {item.badge}
                        </span>
                      )}
                    </div>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="p-3 border-t border-surface-container-high">
          {!collapsed ? (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 overflow-hidden">
                <div className="w-7 h-7 rounded-full bg-surface-container-high border border-surface-container-highest flex items-center justify-center font-bold text-xs text-primary font-mono">
                  {user?.fullName?.[0] || "U"}
                </div>
                <div className="overflow-hidden">
                  <span className="text-xs font-semibold text-on-surface block truncate">
                    {user?.fullName || "DevOps Engineer"}
                  </span>
                  <span className="text-[10px] text-outline font-mono block truncate">
                    {user?.email || "alex@acme.com"}
                  </span>
                </div>
              </div>
              <button
                onClick={handleLogout}
                title="Sign out"
                className="p-1.5 text-on-surface-variant hover:text-error rounded hover:bg-surface-container"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={handleLogout}
              title="Sign out"
              className="w-full flex justify-center p-2 text-on-surface-variant hover:text-error"
            >
              <LogOut className="w-4 h-4" />
            </button>
          )}
        </div>
      </aside>

      {/* =========================================================================
          MAIN APPLICATION VIEWPORT
          ========================================================================= */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Top Header Bar */}
        <header className="h-16 border-b border-surface-container-high bg-surface-container-lowest/80 backdrop-blur-md px-6 flex items-center justify-between sticky top-0 z-30">
          {/* Breadcrumb / Title */}
          <div className="flex items-center gap-2 font-mono text-xs">
            <Link to="/dashboard" className="text-outline hover:text-on-surface">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-outline" />
            <span className="text-primary font-bold uppercase">
              {location.pathname.replace("/dashboard", "").replace("/", "") || "OVERVIEW"}
            </span>
          </div>

          {/* Quick Actions & Status */}
          <div className="flex items-center gap-4">
            {/* Live Mesh Status Pill */}
            <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container border border-surface-container-high text-xs font-mono">
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
              <span className="text-secondary font-semibold">MESH HEALTHY</span>
              <span className="text-outline">12ms</span>
            </div>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-surface-container border border-surface-container-high hover:border-outline text-on-surface-variant hover:text-on-surface transition-colors"
              title="Toggle theme"
            >
              {theme === "dark" ? <Moon className="w-4 h-4 text-primary" /> : <Sun className="w-4 h-4 text-amber-500" />}
            </button>
          </div>
        </header>

        {/* Content Outlet */}
        <main className="flex-1 p-6 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>

    </div>
  );
}
