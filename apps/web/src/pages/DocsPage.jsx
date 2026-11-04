import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BookOpen, Terminal, Shield, Boxes, Layers, CheckCircle2 } from "lucide-react";

export function DocsPage() {
  const sections = [
    {
      category: "00. Product Overview",
      docs: [
        { title: "Project Overview", path: "/docs/00-overview/PROJECT_OVERVIEW.md", desc: "Foundational identity, personas, and system boundaries" },
        { title: "Product Requirements (PRD)", path: "/docs/00-overview/PRODUCT_REQUIREMENTS.md", desc: "Stable requirement IDs (FR-xxx, NFR-xxx)" },
        { title: "Product Roadmap", path: "/docs/00-overview/PRODUCT_ROADMAP.md", desc: "Phased delivery gates and dependency graph" },
        { title: "Scope & Features Catalog", path: "/docs/00-overview/SCOPE_AND_FEATURES.md", desc: "Detailed breakdown of all 12 modules" }
      ]
    },
    {
      category: "01. Architecture & Design",
      docs: [
        { title: "System Architecture", path: "/docs/01-architecture/SYSTEM_ARCHITECTURE.md", desc: "C4 context, container, and component models" },
        { title: "Monorepo Architecture", path: "/docs/01-architecture/MONOREPO_ARCHITECTURE.md", desc: "Turborepo workspace and package separation" },
        { title: "Folder Structure Spec", path: "/docs/01-architecture/FOLDER_STRUCTURE.md", desc: "Directory trees and forbidden import rules" },
        { title: "Data Flow Specification", path: "/docs/01-architecture/DATA_FLOW.md", desc: "End-to-end data transit and secret isolation" },
        { title: "ADR Register", path: "/docs/01-architecture/ARCHITECTURAL_DECISIONS.md", desc: "Architectural Decision Records (ADR-0001 - 0010)" }
      ]
    },
    {
      category: "02. Frontend & UI System",
      docs: [
        { title: "Frontend Architecture", path: "/docs/02-frontend/FRONTEND_SPECIFICATION.md", desc: "React SPA, Vite, and Radix UI primitives" },
        { title: "UI/UX Design System", path: "/docs/02-frontend/UI_UX_DESIGN_SYSTEM.md", desc: "Design tokens, dark/light themes, and WCAG AA rules" },
        { title: "Routing & Navigation", path: "/docs/02-frontend/ROUTING_AND_NAVIGATION.md", desc: "Public vs authenticated route hierarchies" },
        { title: "State Management", path: "/docs/02-frontend/FRONTEND_STATE_MANAGEMENT.md", desc: "TanStack Query v5 cache and optimistic rollbacks" }
      ]
    },
    {
      category: "03. Backend & APIs",
      docs: [
        { title: "Backend Architecture", path: "/docs/03-backend/BACKEND_SPECIFICATION.md", desc: "Modular monolith Express server structure" },
        { title: "API Standards & Guidelines", path: "/docs/03-backend/API_STANDARDS.md", desc: "Enforceable REST conventions and error models" },
        { title: "API Endpoints Reference", path: "/docs/03-backend/API_ENDPOINTS.md", desc: "Complete endpoint contracts, schemas, and codes" },
        { title: "Authentication & RBAC", path: "/docs/03-backend/AUTHENTICATION_AND_AUTHORIZATION.md", desc: "Session cookies, CLI PATs, and role matrices" }
      ]
    },
    {
      category: "04. CLI & Tools",
      docs: [
        { title: "CLI Product Specification", path: "/docs/04-cli/CLI_PRODUCT_SPECIFICATION.md", desc: "Node.js npm CLI product requirements" },
        { title: "CLI Architecture", path: "/docs/04-cli/CLI_ARCHITECTURE.md", desc: "Commander.js internals and execution layers" },
        { title: "CLI Command Reference", path: "/docs/04-cli/CLI_COMMAND_REFERENCE.md", desc: "Complete command grammar and syntax manual" },
        { title: "CLI Configuration & Keyring", path: "/docs/04-cli/CLI_CONFIGURATION_AND_AUTH.md", desc: "OS native credential vault storage" }
      ]
    }
  ];

  return (
    <div className="w-full py-16 px-gutter max-w-7xl mx-auto text-left">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="font-mono text-xs uppercase tracking-wider text-primary font-semibold block mb-2">
          ENGINEERING SPECIFICATIONS
        </span>
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-on-surface">
          Documentation Portal
        </h1>
        <p className="text-base sm:text-lg text-on-surface-variant mt-4">
          Authoritative technical specifications, API contracts, database schemas, and architectural decision records.
        </p>
      </div>

      <div className="space-y-12">
        {sections.map((sec, idx) => (
          <div key={idx} className="space-y-4">
            <h2 className="text-xl font-bold text-on-surface font-mono border-b border-surface-container-high pb-2">
              {sec.category}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {sec.docs.map((doc, dIdx) => (
                <div key={dIdx} className="p-4 rounded-xl bg-surface-container border border-surface-container-high hover:border-primary/50 transition-all flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-base text-on-surface mb-1">{doc.title}</h3>
                    <p className="text-xs text-on-surface-variant mb-3">{doc.desc}</p>
                  </div>
                  <span className="text-[11px] font-mono text-primary flex items-center gap-1 font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5 text-secondary" /> Read Specification
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

