import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { PublicLayout } from "./components/layout/PublicLayout.jsx";
import { AppLayout } from "./components/layout/AppLayout.jsx";

// Public pages
import { HomePage } from "./pages/HomePage.jsx";
import { FeaturesPage } from "./pages/FeaturesPage.jsx";
import { CliPage } from "./pages/CliPage.jsx";
import { PricingPage } from "./pages/PricingPage.jsx";
import { IntegrationsPage } from "./pages/IntegrationsPage.jsx";
import { StatusPage } from "./pages/StatusPage.jsx";
import { DocsPage } from "./pages/DocsPage.jsx";
import { PrivacyPage } from "./pages/PrivacyPage.jsx";
import { TermsPage } from "./pages/TermsPage.jsx";
import { LoginPage } from "./pages/LoginPage.jsx";
import { RegisterPage } from "./pages/RegisterPage.jsx";
import { DevicePage } from "./pages/DevicePage.jsx";

// Dashboard pages
import { DashboardPage } from "./pages/dashboard/DashboardPage.jsx";
import { KubernetesPage } from "./pages/dashboard/KubernetesPage.jsx";
import { IncidentsPage } from "./pages/dashboard/IncidentsPage.jsx";
import { LogsPage } from "./pages/dashboard/LogsPage.jsx";
import { CicdPage } from "./pages/dashboard/CicdPage.jsx";
import { DockerPage } from "./pages/dashboard/DockerPage.jsx";
import { MonitoringPage } from "./pages/dashboard/MonitoringPage.jsx";
import { SettingsPage } from "./pages/dashboard/SettingsPage.jsx";
import { AuditPage } from "./pages/dashboard/AuditPage.jsx";

export function App() {
  return (
    <Routes>
      {/* Public routes wrapped in PublicLayout */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/features" element={<FeaturesPage />} />
        <Route path="/cli" element={<CliPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/integrations" element={<IntegrationsPage />} />
        <Route path="/status" element={<StatusPage />} />
        <Route path="/docs" element={<DocsPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/terms" element={<TermsPage />} />
      </Route>

      {/* Standalone Authentication & Onboarding pages */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/device" element={<DevicePage />} />

      {/* Authenticated Dashboard routes wrapped in AppLayout */}
      <Route path="/dashboard" element={<AppLayout />}>
        <Route index element={<DashboardPage />} />
        <Route path="kubernetes" element={<KubernetesPage />} />
        <Route path="incidents" element={<IncidentsPage />} />
        <Route path="logs" element={<LogsPage />} />
        <Route path="cicd" element={<CicdPage />} />
        <Route path="docker" element={<DockerPage />} />
        <Route path="monitoring" element={<MonitoringPage />} />
        <Route path="settings" element={<SettingsPage />} />
        <Route path="audit" element={<AuditPage />} />
      </Route>

      {/* Fallback to home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
