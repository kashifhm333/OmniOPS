# OmniOPS — Production-Grade Documentation Prompt Pack

**Purpose:** Use this pack to generate every planned OmniOPS Markdown document consistently with an AI coding/research assistant.

> This pack contains 59 file-specific prompts: 58 Markdown documents (35 core engineering documents, 12 module specifications, 7 public-site specifications, and 4 root Markdown files) plus a prompt for `.env.example` (a configuration template, not a Markdown document).

## How to use this pack

1. Give the AI the **Global Production-Grade Documentation Authoring Contract** below.
2. Then give it **one file-specific prompt** from this pack.
3. Ask it to inspect the current repository and any already-approved decisions before drafting. If repository evidence conflicts with a proposed design, report the conflict instead of silently changing it.
4. Save the output at the exact file path. Review and approve it before generating dependent documents.
5. Generate in the recommended order at the end of this pack.

**Important:** Do not submit all file-specific prompts in one request if the model may truncate output. Generate one document at a time, or at most one tightly related group.

---

# OmniOPS — Global Production-Grade Documentation Authoring Contract

You are acting as a principal software architect, product manager, security architect, DevOps engineer, API designer, database designer, frontend architect, CLI maintainer, QA lead, and technical writer. Your task is to author ONE requested documentation file for the OmniOPS project. The requested file-specific brief follows this contract.

## 1. Product context — authoritative baseline

OmniOPS is planned as a unified DevOps command center with two first-class clients and one shared control plane:
- Public React website and authenticated React web application.
- Independently installable Node.js CLI distributed through npm (proposed command/package name: `omniops`; npm name availability MUST be checked before publication).
- Node.js + Express backend/API acting as the shared control plane.
- MongoDB as the primary database.
- TanStack Query and browser HTTP caching for frontend server-state/cache behavior.
- React with JavaScript (not TypeScript) unless a future, explicitly approved Architecture Decision Record changes this.
- Tailwind CSS and shadcn/ui/Radix primitives. Radix UI is not an icon library; document a separately selected icon library (e.g. Lucide) as a decision if not already approved.
- Monorepo using Turborepo or Nx; selection is an explicit ADR, not an assumption.
- Docker, Docker Compose, GitHub Actions (or an explicitly selected CI alternative), Terraform and AWS are planned engineering/deployment technologies.
- Security, testing, observability, documentation, accessibility, maintainability and cost awareness are non-negotiable engineering concerns.

The planned product modules are:
1. Command Center Dashboard
2. GitHub Integration
3. CI/CD Management
4. Docker Management
5. Kubernetes Management
6. Infrastructure Monitoring
7. Centralized Logging
8. Cloud Management
9. Incident Management
10. Terraform / Infrastructure-as-Code Management
11. Team & Access Management
12. Intelligent DevOps Assistant

The platform must use one shared, versioned Express API and one authorization model for both browser and CLI clients. The CLI must not become a separate backend or bypass server-side authorization.

## 2. Non-negotiable accuracy rules

- Do not claim a feature, integration, provider, deployment, certification, metric, customer, price, uptime, or implementation exists unless evidence is supplied.
- Distinguish clearly between: APPROVED DECISION, PROPOSED DESIGN, OPEN QUESTION, MVP, LATER PHASE, and OUT OF SCOPE.
- Do not invent dates, costs, credentials, account IDs, infrastructure IDs, domains, contact details, npm availability, or legal commitments.
- Where a decision is missing, create an explicit decision record/question with options, trade-offs, recommendation, owner placeholder and decision deadline placeholder. Do not silently resolve it.
- Use the chosen stack accurately. Do not introduce Next.js, TypeScript, PostgreSQL, Prisma relational migrations, Redis, microservices, or other technologies as mandatory without an approved ADR.
- For MongoDB, document MongoDB-appropriate schema/index/versioning/migration practices. Prisma's relational `migrate` workflow must not be copied blindly to MongoDB.
- Use JavaScript/JSX conventions. ESLint should enforce suitable JavaScript/React rules, not TypeScript-only rules.
- `next/image`, `next-themes`, and `NEXT_PUBLIC_` are Next.js-specific; do not prescribe them for a plain React app. Select the actual React build tool and public environment-variable prefix through an ADR.
- Better Auth vs Auth.js, Mongoose vs another MongoDB data layer, Turborepo vs Nx, job queue, WebSocket implementation, cloud hosting, and provider integration methods must be explicit decisions if unresolved.
- Treat `npm install -g omniops` as proposed until package availability and release ownership are verified.

## 3. Production-grade writing requirements

Write the requested file as a complete, implementation-ready Markdown document, not an outline or a shallow summary. Include, where relevant:
- Purpose, scope, audience, status, owner placeholder, version, last-updated placeholder and related documents.
- Definitions and assumptions.
- Requirements with stable IDs and priorities where applicable.
- Detailed workflows and edge cases.
- Responsibilities and boundaries.
- Data/API/security/performance/reliability implications.
- Failure modes, recovery, observability and operational considerations.
- Accessibility and UX requirements for user-facing features.
- Testing and measurable acceptance criteria.
- Examples, tables and Mermaid diagrams when they materially improve precision.
- Open questions, risks, dependencies and decision log.
- Cross-links to related OmniOPS documents using relative Markdown links.

Use precise, testable language (“MUST”, “SHOULD”, “MAY”) consistently. Explain acronyms on first use. Use UTC for stored timestamps and explicitly define display-time-zone behavior. Include sanitized examples only. Keep secrets and personal data out of examples.

## 4. Security baseline for this DevOps platform

OmniOPS can access sensitive infrastructure. Therefore:
- Default integrations to least-privilege and read-only access for the initial MVP.
- Never expose unrestricted shell execution, Docker socket access, kubeconfig, cloud credentials, or arbitrary Terraform execution through the web app.
- Never put secrets in browser bundles, URLs, logs, error messages, screenshots, or documentation examples.
- Store credentials using an explicit encryption/key-management or external secret-reference design; never plaintext by default.
- Enforce tenant isolation and authorization on the backend for every protected operation. Hiding a UI control is not authorization.
- Use HTTP-only, Secure, appropriately SameSite cookies for browser sessions and document CSRF protection.
- Define CLI token lifecycle, revocation, secure OS credential storage, and safe CI usage.
- Verify webhooks, prevent replay, deduplicate events, rate-limit sensitive endpoints and make mutations auditable.
- Require confirmation, policy checks, authorization and (where risk warrants) approval for destructive or infrastructure-changing operations.
- Treat repository content, issue text, logs, command output and external integration data as untrusted. Protect AI features against prompt injection and prohibit autonomous high-risk execution.
- Include audit events for security-sensitive actions.

## 5. Cross-document consistency rules

- Use the exact product name `OmniOPS`.
- Keep module names and route/API/CLI terminology consistent across files.
- API contracts, database schemas, RBAC permissions, UI behavior, CLI commands, event names and audit events must agree.
- If the requested document depends on another document not yet written, state the dependency and use a clearly marked proposed contract; do not fabricate certainty.
- Do not duplicate entire specifications. Summarize and link to the canonical document.
- Add a “Related documents” section with relative links where possible.
- Add a “Traceability” section mapping important requirements to related specs/tests when relevant.

## 6. Required output behavior

Return ONLY the complete Markdown content for the one requested file, ready to save at its specified path. Do not include preamble, commentary, fences around the entire document, or other files. Do not write source code or implement the product. Do not omit important sections just to be concise. Before finalizing, run a consistency review against this contract and the file-specific brief.

---

## 01. `docs/00-overview/PROJECT_OVERVIEW.md`

# PROMPT — Generate `docs/00-overview/PROJECT_OVERVIEW.md`

## Objective
Define the authoritative identity and high-level description of OmniOPS.

## File-specific authoring brief
Document the product vision, problem statement, target users, personas, primary use cases, product boundaries, terminology/glossary, core value proposition, web/CLI/control-plane relationship, assumptions, constraints, non-goals, and success measures. Distinguish confirmed decisions from proposals and unresolved decisions. Explain the 12 planned modules without pretending they are already implemented. Include a concise executive summary, product principles, system context, and links to related docs.

## Mandatory sections and quality bar
1. Document control: status (`Draft` until reviewed), owner placeholder, version, last-updated placeholder.
2. Purpose, audience, scope, non-goals and terminology.
3. Normative requirements and explicit assumptions.
4. Detailed specification appropriate to this document type.
5. Workflows, edge cases, failure modes and recovery.
6. Security, privacy, tenancy and authorization implications.
7. Performance, reliability, scalability and observability implications where relevant.
8. Testing strategy and measurable acceptance criteria.
9. Dependencies, risks and unresolved decisions.
10. Related documents and traceability.

Do not mechanically force irrelevant sections; mark them “Not applicable” only with a brief reason. Use tables, examples and Mermaid diagrams where they add precision. All examples must be sanitized and clearly illustrative.

## File path
`docs/00-overview/PROJECT_OVERVIEW.md`

## Completion criteria
The result must be detailed enough that an engineer can implement or review the subject without guessing at core behavior. It must be internally consistent with OmniOPS's global contract, explicitly label proposals and unresolved decisions, avoid unsupported claims, and be ready to commit as the exact Markdown file above.

## Final instruction
Follow the Global Production-Grade Documentation Authoring Contract supplied before this file-specific prompt. Output only the complete contents of this one file.

---

## 02. `docs/00-overview/PRODUCT_REQUIREMENTS.md`

# PROMPT — Generate `docs/00-overview/PRODUCT_REQUIREMENTS.md`

## Objective
Create the testable product requirements specification (PRD).

## File-specific authoring brief
Define functional and non-functional requirements with stable IDs (FR-xxx, NFR-xxx), priority (P0/P1/P2), rationale, actor, preconditions, main flow, alternate/error flows, and measurable acceptance criteria. Cover public website, signup/login, organizations/workspaces, RBAC, integrations, command center, all 12 modules, CLI, notifications, audit trail, operational approvals, and admin functions. Specify availability, performance, scalability, accessibility, usability, compatibility, maintainability, privacy, and security targets as proposed targets requiring validation. Include MVP scope, exclusions, dependencies, risks, assumptions, and traceability to tests.

## Mandatory sections and quality bar
1. Document control: status (`Draft` until reviewed), owner placeholder, version, last-updated placeholder.
2. Purpose, audience, scope, non-goals and terminology.
3. Normative requirements and explicit assumptions.
4. Detailed specification appropriate to this document type.
5. Workflows, edge cases, failure modes and recovery.
6. Security, privacy, tenancy and authorization implications.
7. Performance, reliability, scalability and observability implications where relevant.
8. Testing strategy and measurable acceptance criteria.
9. Dependencies, risks and unresolved decisions.
10. Related documents and traceability.

Do not mechanically force irrelevant sections; mark them “Not applicable” only with a brief reason. Use tables, examples and Mermaid diagrams where they add precision. All examples must be sanitized and clearly illustrative.

## File path
`docs/00-overview/PRODUCT_REQUIREMENTS.md`

## Completion criteria
The result must be detailed enough that an engineer can implement or review the subject without guessing at core behavior. It must be internally consistent with OmniOPS's global contract, explicitly label proposals and unresolved decisions, avoid unsupported claims, and be ready to commit as the exact Markdown file above.

## Final instruction
Follow the Global Production-Grade Documentation Authoring Contract supplied before this file-specific prompt. Output only the complete contents of this one file.

---

## 03. `docs/00-overview/PRODUCT_ROADMAP.md`

# PROMPT — Generate `docs/00-overview/PRODUCT_ROADMAP.md`

## Objective
Create a dependency-aware phased roadmap.

## File-specific authoring brief
Define discovery, architecture, foundation, MVP, module releases, beta, production readiness, and post-launch phases. For each milestone provide outcomes, deliverables, dependencies, exit criteria, risks, and measurable acceptance gates. Prioritize a safe read-only MVP before infrastructure-changing operations. Separate committed scope from candidate/future work; do not invent dates, staffing, budgets, or guarantees. Include roadmap governance and change-control process.

## Mandatory sections and quality bar
1. Document control: status (`Draft` until reviewed), owner placeholder, version, last-updated placeholder.
2. Purpose, audience, scope, non-goals and terminology.
3. Normative requirements and explicit assumptions.
4. Detailed specification appropriate to this document type.
5. Workflows, edge cases, failure modes and recovery.
6. Security, privacy, tenancy and authorization implications.
7. Performance, reliability, scalability and observability implications where relevant.
8. Testing strategy and measurable acceptance criteria.
9. Dependencies, risks and unresolved decisions.
10. Related documents and traceability.

Do not mechanically force irrelevant sections; mark them “Not applicable” only with a brief reason. Use tables, examples and Mermaid diagrams where they add precision. All examples must be sanitized and clearly illustrative.

## File path
`docs/00-overview/PRODUCT_ROADMAP.md`

## Completion criteria
The result must be detailed enough that an engineer can implement or review the subject without guessing at core behavior. It must be internally consistent with OmniOPS's global contract, explicitly label proposals and unresolved decisions, avoid unsupported claims, and be ready to commit as the exact Markdown file above.

## Final instruction
Follow the Global Production-Grade Documentation Authoring Contract supplied before this file-specific prompt. Output only the complete contents of this one file.

---

## 04. `docs/00-overview/SCOPE_AND_FEATURES.md`

# PROMPT — Generate `docs/00-overview/SCOPE_AND_FEATURES.md`

## Objective
Create a complete feature inventory and scope boundary.

## File-specific authoring brief
Inventory the 12 modules: Command Center Dashboard, GitHub Integration, CI/CD Management, Docker Management, Kubernetes Management, Infrastructure Monitoring, Centralized Logging, Cloud Management, Incident Management, Terraform Management, Team & Access Management, Intelligent DevOps Assistant. For each list capabilities, user roles, web screens, API domains, CLI commands (proposed vs approved), integrations, data, security level, dependencies, MVP/deferred status, and acceptance outcomes. Explicitly mark unsupported capabilities and non-goals. Avoid claiming integrations or features already exist.

## Mandatory sections and quality bar
1. Document control: status (`Draft` until reviewed), owner placeholder, version, last-updated placeholder.
2. Purpose, audience, scope, non-goals and terminology.
3. Normative requirements and explicit assumptions.
4. Detailed specification appropriate to this document type.
5. Workflows, edge cases, failure modes and recovery.
6. Security, privacy, tenancy and authorization implications.
7. Performance, reliability, scalability and observability implications where relevant.
8. Testing strategy and measurable acceptance criteria.
9. Dependencies, risks and unresolved decisions.
10. Related documents and traceability.

Do not mechanically force irrelevant sections; mark them “Not applicable” only with a brief reason. Use tables, examples and Mermaid diagrams where they add precision. All examples must be sanitized and clearly illustrative.

## File path
`docs/00-overview/SCOPE_AND_FEATURES.md`

## Completion criteria
The result must be detailed enough that an engineer can implement or review the subject without guessing at core behavior. It must be internally consistent with OmniOPS's global contract, explicitly label proposals and unresolved decisions, avoid unsupported claims, and be ready to commit as the exact Markdown file above.

## Final instruction
Follow the Global Production-Grade Documentation Authoring Contract supplied before this file-specific prompt. Output only the complete contents of this one file.

---

## 05. `docs/01-architecture/SYSTEM_ARCHITECTURE.md`

# PROMPT — Generate `docs/01-architecture/SYSTEM_ARCHITECTURE.md`

## Objective
Specify the end-to-end architecture and trust boundaries.

## File-specific authoring brief
Describe a modular-monolith Express control plane, React JavaScript web client, independently installable Node.js CLI npm package, MongoDB persistence, TanStack Query client caching, and external provider adapters. Include C4-style context/container/component views using Mermaid, request/event/data flows, trust boundaries, deployment topology, tenancy boundaries, failure domains, scaling strategy, sync vs async work, secrets flow, audit flow, and operational command execution model. Explain how web and CLI use the same versioned API and authorization rules. Do not assume microservices. Identify unresolved decisions and ADR references.

## Mandatory sections and quality bar
1. Document control: status (`Draft` until reviewed), owner placeholder, version, last-updated placeholder.
2. Purpose, audience, scope, non-goals and terminology.
3. Normative requirements and explicit assumptions.
4. Detailed specification appropriate to this document type.
5. Workflows, edge cases, failure modes and recovery.
6. Security, privacy, tenancy and authorization implications.
7. Performance, reliability, scalability and observability implications where relevant.
8. Testing strategy and measurable acceptance criteria.
9. Dependencies, risks and unresolved decisions.
10. Related documents and traceability.

Do not mechanically force irrelevant sections; mark them “Not applicable” only with a brief reason. Use tables, examples and Mermaid diagrams where they add precision. All examples must be sanitized and clearly illustrative.

## File path
`docs/01-architecture/SYSTEM_ARCHITECTURE.md`

## Completion criteria
The result must be detailed enough that an engineer can implement or review the subject without guessing at core behavior. It must be internally consistent with OmniOPS's global contract, explicitly label proposals and unresolved decisions, avoid unsupported claims, and be ready to commit as the exact Markdown file above.

## Final instruction
Follow the Global Production-Grade Documentation Authoring Contract supplied before this file-specific prompt. Output only the complete contents of this one file.

---

## 06. `docs/01-architecture/MONOREPO_ARCHITECTURE.md`

# PROMPT — Generate `docs/01-architecture/MONOREPO_ARCHITECTURE.md`

## Objective
Define a maintainable monorepo with clear application/package boundaries.

## File-specific authoring brief
Compare Turborepo and Nx briefly, then recommend one based on the stated stack without asserting a decision until approved. Specify workspace package manager, root scripts, task graph, caching, dependency constraints, package naming, versioning, build/test/lint pipelines, shared code boundaries, and CI affected-scope strategy. Keep apps/web, apps/api, packages/cli and narrowly scoped shared packages independent. Explain what must never be shared (server secrets, browser-only code, privileged integration code). Include example workspace configuration as illustrative and label decisions.

## Mandatory sections and quality bar
1. Document control: status (`Draft` until reviewed), owner placeholder, version, last-updated placeholder.
2. Purpose, audience, scope, non-goals and terminology.
3. Normative requirements and explicit assumptions.
4. Detailed specification appropriate to this document type.
5. Workflows, edge cases, failure modes and recovery.
6. Security, privacy, tenancy and authorization implications.
7. Performance, reliability, scalability and observability implications where relevant.
8. Testing strategy and measurable acceptance criteria.
9. Dependencies, risks and unresolved decisions.
10. Related documents and traceability.

Do not mechanically force irrelevant sections; mark them “Not applicable” only with a brief reason. Use tables, examples and Mermaid diagrams where they add precision. All examples must be sanitized and clearly illustrative.

## File path
`docs/01-architecture/MONOREPO_ARCHITECTURE.md`

## Completion criteria
The result must be detailed enough that an engineer can implement or review the subject without guessing at core behavior. It must be internally consistent with OmniOPS's global contract, explicitly label proposals and unresolved decisions, avoid unsupported claims, and be ready to commit as the exact Markdown file above.

## Final instruction
Follow the Global Production-Grade Documentation Authoring Contract supplied before this file-specific prompt. Output only the complete contents of this one file.

---

## 07. `docs/01-architecture/FOLDER_STRUCTURE.md`

# PROMPT — Generate `docs/01-architecture/FOLDER_STRUCTURE.md`

## Objective
Define exact folder structures for the complete repository.

## File-specific authoring brief
Provide concrete trees for React JavaScript frontend, Node.js/Express backend, CLI package, shared validation/types/constants where appropriate, configuration, tests, scripts, docs, and Terraform infrastructure. Explain responsibility and import direction for every major directory. Define naming conventions, module boundaries, test co-location, public/private exports, environment config placement, and forbidden dependency patterns. Do not introduce Next.js or TypeScript as project requirements. Use JavaScript and choose .js/.jsx consistently.

## Mandatory sections and quality bar
1. Document control: status (`Draft` until reviewed), owner placeholder, version, last-updated placeholder.
2. Purpose, audience, scope, non-goals and terminology.
3. Normative requirements and explicit assumptions.
4. Detailed specification appropriate to this document type.
5. Workflows, edge cases, failure modes and recovery.
6. Security, privacy, tenancy and authorization implications.
7. Performance, reliability, scalability and observability implications where relevant.
8. Testing strategy and measurable acceptance criteria.
9. Dependencies, risks and unresolved decisions.
10. Related documents and traceability.

Do not mechanically force irrelevant sections; mark them “Not applicable” only with a brief reason. Use tables, examples and Mermaid diagrams where they add precision. All examples must be sanitized and clearly illustrative.

## File path
`docs/01-architecture/FOLDER_STRUCTURE.md`

## Completion criteria
The result must be detailed enough that an engineer can implement or review the subject without guessing at core behavior. It must be internally consistent with OmniOPS's global contract, explicitly label proposals and unresolved decisions, avoid unsupported claims, and be ready to commit as the exact Markdown file above.

## Final instruction
Follow the Global Production-Grade Documentation Authoring Contract supplied before this file-specific prompt. Output only the complete contents of this one file.

---

## 08. `docs/01-architecture/DATA_FLOW.md`

# PROMPT — Generate `docs/01-architecture/DATA_FLOW.md`

## Objective
Document system interactions and data movement.

## File-specific authoring brief
Trace signup/login/session lifecycle, organization selection, browser API request, CLI login and API calls, integration OAuth/token exchange, webhook ingestion, polling/synchronization, WebSocket updates, background jobs, audit event creation, and infrastructure action approval/execution. Include sequence diagrams for key flows, payload ownership, retry/idempotency, data classification, failure paths, and tenant context propagation. Ensure secrets do not flow to browser clients or logs.

## Mandatory sections and quality bar
1. Document control: status (`Draft` until reviewed), owner placeholder, version, last-updated placeholder.
2. Purpose, audience, scope, non-goals and terminology.
3. Normative requirements and explicit assumptions.
4. Detailed specification appropriate to this document type.
5. Workflows, edge cases, failure modes and recovery.
6. Security, privacy, tenancy and authorization implications.
7. Performance, reliability, scalability and observability implications where relevant.
8. Testing strategy and measurable acceptance criteria.
9. Dependencies, risks and unresolved decisions.
10. Related documents and traceability.

Do not mechanically force irrelevant sections; mark them “Not applicable” only with a brief reason. Use tables, examples and Mermaid diagrams where they add precision. All examples must be sanitized and clearly illustrative.

## File path
`docs/01-architecture/DATA_FLOW.md`

## Completion criteria
The result must be detailed enough that an engineer can implement or review the subject without guessing at core behavior. It must be internally consistent with OmniOPS's global contract, explicitly label proposals and unresolved decisions, avoid unsupported claims, and be ready to commit as the exact Markdown file above.

## Final instruction
Follow the Global Production-Grade Documentation Authoring Contract supplied before this file-specific prompt. Output only the complete contents of this one file.

---

## 09. `docs/01-architecture/ARCHITECTURAL_DECISIONS.md`

# PROMPT — Generate `docs/01-architecture/ARCHITECTURAL_DECISIONS.md`

## Objective
Create an Architecture Decision Record register and decision process.

## File-specific authoring brief
Record decisions and open questions for React JavaScript, Tailwind/shadcn/Radix primitives and icon library, Express, MongoDB/data-access layer, TanStack Query, monorepo tool, auth provider, validation, logging, job queue, WebSockets, testing, deployment, and CLI packaging. Each ADR must include status, context, decision, alternatives, consequences, security/performance impact, and date placeholder. Do not silently choose unresolved products. Include an ADR template and supersession policy.

## Mandatory sections and quality bar
1. Document control: status (`Draft` until reviewed), owner placeholder, version, last-updated placeholder.
2. Purpose, audience, scope, non-goals and terminology.
3. Normative requirements and explicit assumptions.
4. Detailed specification appropriate to this document type.
5. Workflows, edge cases, failure modes and recovery.
6. Security, privacy, tenancy and authorization implications.
7. Performance, reliability, scalability and observability implications where relevant.
8. Testing strategy and measurable acceptance criteria.
9. Dependencies, risks and unresolved decisions.
10. Related documents and traceability.

Do not mechanically force irrelevant sections; mark them “Not applicable” only with a brief reason. Use tables, examples and Mermaid diagrams where they add precision. All examples must be sanitized and clearly illustrative.

## File path
`docs/01-architecture/ARCHITECTURAL_DECISIONS.md`

## Completion criteria
The result must be detailed enough that an engineer can implement or review the subject without guessing at core behavior. It must be internally consistent with OmniOPS's global contract, explicitly label proposals and unresolved decisions, avoid unsupported claims, and be ready to commit as the exact Markdown file above.

## Final instruction
Follow the Global Production-Grade Documentation Authoring Contract supplied before this file-specific prompt. Output only the complete contents of this one file.

---

## 10. `docs/02-frontend/FRONTEND_SPECIFICATION.md`

# PROMPT — Generate `docs/02-frontend/FRONTEND_SPECIFICATION.md`

## Objective
Specify the React JavaScript application architecture.

## File-specific authoring brief
Define SPA/build-tool assumptions as an explicit decision, React component architecture, feature-based modules, layouts, route guards, API client, TanStack Query integration, forms, validation, error/loading/empty states, accessibility, responsive behavior, theme handling, telemetry, and frontend testing. Cover public marketing site and authenticated product app as distinct experiences. Specify component ownership, code-splitting, lazy loading, environment exposure rules, and no secret-bearing client variables. Avoid Next.js-only features unless separately approved.

## Mandatory sections and quality bar
1. Document control: status (`Draft` until reviewed), owner placeholder, version, last-updated placeholder.
2. Purpose, audience, scope, non-goals and terminology.
3. Normative requirements and explicit assumptions.
4. Detailed specification appropriate to this document type.
5. Workflows, edge cases, failure modes and recovery.
6. Security, privacy, tenancy and authorization implications.
7. Performance, reliability, scalability and observability implications where relevant.
8. Testing strategy and measurable acceptance criteria.
9. Dependencies, risks and unresolved decisions.
10. Related documents and traceability.

Do not mechanically force irrelevant sections; mark them “Not applicable” only with a brief reason. Use tables, examples and Mermaid diagrams where they add precision. All examples must be sanitized and clearly illustrative.

## File path
`docs/02-frontend/FRONTEND_SPECIFICATION.md`

## Completion criteria
The result must be detailed enough that an engineer can implement or review the subject without guessing at core behavior. It must be internally consistent with OmniOPS's global contract, explicitly label proposals and unresolved decisions, avoid unsupported claims, and be ready to commit as the exact Markdown file above.

## Final instruction
Follow the Global Production-Grade Documentation Authoring Contract supplied before this file-specific prompt. Output only the complete contents of this one file.

---

## 11. `docs/02-frontend/UI_UX_DESIGN_SYSTEM.md`

# PROMPT — Generate `docs/02-frontend/UI_UX_DESIGN_SYSTEM.md`

## Objective
Define a consistent accessible design system.

## File-specific authoring brief
Specify design principles, tokens for color/type/spacing/radius/elevation/breakpoints, light/dark themes, typography hierarchy, component states, forms, tables, dialogs, menus, toasts, navigation, charts, terminal/code presentation, responsive behavior, focus states, contrast, keyboard interaction, and reduced motion. Use Tailwind CSS and shadcn/ui/Radix primitives where suitable. Clarify that Radix UI is a primitives library, not an icon set; select and document an icon library such as Lucide only as a proposed decision. Include token naming and component documentation templates.

## Mandatory sections and quality bar
1. Document control: status (`Draft` until reviewed), owner placeholder, version, last-updated placeholder.
2. Purpose, audience, scope, non-goals and terminology.
3. Normative requirements and explicit assumptions.
4. Detailed specification appropriate to this document type.
5. Workflows, edge cases, failure modes and recovery.
6. Security, privacy, tenancy and authorization implications.
7. Performance, reliability, scalability and observability implications where relevant.
8. Testing strategy and measurable acceptance criteria.
9. Dependencies, risks and unresolved decisions.
10. Related documents and traceability.

Do not mechanically force irrelevant sections; mark them “Not applicable” only with a brief reason. Use tables, examples and Mermaid diagrams where they add precision. All examples must be sanitized and clearly illustrative.

## File path
`docs/02-frontend/UI_UX_DESIGN_SYSTEM.md`

## Completion criteria
The result must be detailed enough that an engineer can implement or review the subject without guessing at core behavior. It must be internally consistent with OmniOPS's global contract, explicitly label proposals and unresolved decisions, avoid unsupported claims, and be ready to commit as the exact Markdown file above.

## Final instruction
Follow the Global Production-Grade Documentation Authoring Contract supplied before this file-specific prompt. Output only the complete contents of this one file.

---

## 12. `docs/02-frontend/ROUTING_AND_NAVIGATION.md`

# PROMPT — Generate `docs/02-frontend/ROUTING_AND_NAVIGATION.md`

## Objective
Define public, authentication, and protected application routes.

## File-specific authoring brief
Create a route inventory with path, page purpose, access level, layout, data dependencies, navigation placement, SEO/indexing policy, and unauthorized behavior. Cover homepage, platform/product pages, integrations, CLI, docs portal, pricing/contact/status/legal pages, login/signup/verification/password recovery, OAuth callback, and authenticated dashboard modules/settings. Define deep links, 404/403 handling, return-to behavior, route-level loading, breadcrumbs, sidebar navigation, and route permission mapping. Do not expose internal routes to search engines.

## Mandatory sections and quality bar
1. Document control: status (`Draft` until reviewed), owner placeholder, version, last-updated placeholder.
2. Purpose, audience, scope, non-goals and terminology.
3. Normative requirements and explicit assumptions.
4. Detailed specification appropriate to this document type.
5. Workflows, edge cases, failure modes and recovery.
6. Security, privacy, tenancy and authorization implications.
7. Performance, reliability, scalability and observability implications where relevant.
8. Testing strategy and measurable acceptance criteria.
9. Dependencies, risks and unresolved decisions.
10. Related documents and traceability.

Do not mechanically force irrelevant sections; mark them “Not applicable” only with a brief reason. Use tables, examples and Mermaid diagrams where they add precision. All examples must be sanitized and clearly illustrative.

## File path
`docs/02-frontend/ROUTING_AND_NAVIGATION.md`

## Completion criteria
The result must be detailed enough that an engineer can implement or review the subject without guessing at core behavior. It must be internally consistent with OmniOPS's global contract, explicitly label proposals and unresolved decisions, avoid unsupported claims, and be ready to commit as the exact Markdown file above.

## Final instruction
Follow the Global Production-Grade Documentation Authoring Contract supplied before this file-specific prompt. Output only the complete contents of this one file.

---

## 13. `docs/02-frontend/FRONTEND_STATE_MANAGEMENT.md`

# PROMPT — Generate `docs/02-frontend/FRONTEND_STATE_MANAGEMENT.md`

## Objective
Define client state and cache behavior.

## File-specific authoring brief
Separate server state, URL state, form state, and ephemeral UI state. Specify TanStack Query defaults, query-key conventions, staleTime/gcTime choices as tunable proposals, invalidation rules, mutations, optimistic update safeguards, pagination, polling, WebSocket cache updates, cancellation, retries, offline/error behavior, and cache isolation on logout/tenant switch. Define browser HTTP caching headers separately from TanStack Query caching. Never cache secrets or cross-tenant data.

## Mandatory sections and quality bar
1. Document control: status (`Draft` until reviewed), owner placeholder, version, last-updated placeholder.
2. Purpose, audience, scope, non-goals and terminology.
3. Normative requirements and explicit assumptions.
4. Detailed specification appropriate to this document type.
5. Workflows, edge cases, failure modes and recovery.
6. Security, privacy, tenancy and authorization implications.
7. Performance, reliability, scalability and observability implications where relevant.
8. Testing strategy and measurable acceptance criteria.
9. Dependencies, risks and unresolved decisions.
10. Related documents and traceability.

Do not mechanically force irrelevant sections; mark them “Not applicable” only with a brief reason. Use tables, examples and Mermaid diagrams where they add precision. All examples must be sanitized and clearly illustrative.

## File path
`docs/02-frontend/FRONTEND_STATE_MANAGEMENT.md`

## Completion criteria
The result must be detailed enough that an engineer can implement or review the subject without guessing at core behavior. It must be internally consistent with OmniOPS's global contract, explicitly label proposals and unresolved decisions, avoid unsupported claims, and be ready to commit as the exact Markdown file above.

## Final instruction
Follow the Global Production-Grade Documentation Authoring Contract supplied before this file-specific prompt. Output only the complete contents of this one file.

---

## 14. `docs/03-backend/BACKEND_SPECIFICATION.md`

# PROMPT — Generate `docs/03-backend/BACKEND_SPECIFICATION.md`

## Objective
Specify the Node.js Express backend as a modular monolith.

## File-specific authoring brief
Define runtime support, app bootstrap, config validation, routing, middleware order, controllers, services, repositories, provider adapters, domain modules, background workers, WebSocket gateway, webhook endpoints, error handling, shutdown, health checks, and dependency injection/testing seams. Define module boundaries and rules preventing controllers from containing business logic. Cover tenant context, authorization enforcement, idempotency, timeouts, concurrency, and safe infrastructure execution. Use JavaScript unless a future ADR approves TypeScript.

## Mandatory sections and quality bar
1. Document control: status (`Draft` until reviewed), owner placeholder, version, last-updated placeholder.
2. Purpose, audience, scope, non-goals and terminology.
3. Normative requirements and explicit assumptions.
4. Detailed specification appropriate to this document type.
5. Workflows, edge cases, failure modes and recovery.
6. Security, privacy, tenancy and authorization implications.
7. Performance, reliability, scalability and observability implications where relevant.
8. Testing strategy and measurable acceptance criteria.
9. Dependencies, risks and unresolved decisions.
10. Related documents and traceability.

Do not mechanically force irrelevant sections; mark them “Not applicable” only with a brief reason. Use tables, examples and Mermaid diagrams where they add precision. All examples must be sanitized and clearly illustrative.

## File path
`docs/03-backend/BACKEND_SPECIFICATION.md`

## Completion criteria
The result must be detailed enough that an engineer can implement or review the subject without guessing at core behavior. It must be internally consistent with OmniOPS's global contract, explicitly label proposals and unresolved decisions, avoid unsupported claims, and be ready to commit as the exact Markdown file above.

## Final instruction
Follow the Global Production-Grade Documentation Authoring Contract supplied before this file-specific prompt. Output only the complete contents of this one file.

---

## 15. `docs/03-backend/API_STANDARDS.md`

# PROMPT — Generate `docs/03-backend/API_STANDARDS.md`

## Objective
Define enforceable REST API conventions.

## File-specific authoring brief
Specify versioning, resource naming, HTTP methods/status codes, request IDs, response envelopes, error schema, validation errors, pagination/filter/sort/search, timestamps/time zones, idempotency keys, concurrency/ETags where appropriate, rate limits, authentication, authorization, CORS, deprecation, content types, and OpenAPI conventions. Include representative success/error examples and standards for backward compatibility. Avoid leaking stack traces, provider credentials, or internal infrastructure details.

## Mandatory sections and quality bar
1. Document control: status (`Draft` until reviewed), owner placeholder, version, last-updated placeholder.
2. Purpose, audience, scope, non-goals and terminology.
3. Normative requirements and explicit assumptions.
4. Detailed specification appropriate to this document type.
5. Workflows, edge cases, failure modes and recovery.
6. Security, privacy, tenancy and authorization implications.
7. Performance, reliability, scalability and observability implications where relevant.
8. Testing strategy and measurable acceptance criteria.
9. Dependencies, risks and unresolved decisions.
10. Related documents and traceability.

Do not mechanically force irrelevant sections; mark them “Not applicable” only with a brief reason. Use tables, examples and Mermaid diagrams where they add precision. All examples must be sanitized and clearly illustrative.

## File path
`docs/03-backend/API_STANDARDS.md`

## Completion criteria
The result must be detailed enough that an engineer can implement or review the subject without guessing at core behavior. It must be internally consistent with OmniOPS's global contract, explicitly label proposals and unresolved decisions, avoid unsupported claims, and be ready to commit as the exact Markdown file above.

## Final instruction
Follow the Global Production-Grade Documentation Authoring Contract supplied before this file-specific prompt. Output only the complete contents of this one file.

---

## 16. `docs/03-backend/API_ENDPOINTS.md`

# PROMPT — Generate `docs/03-backend/API_ENDPOINTS.md`

## Objective
Create the complete API contract inventory.

## File-specific authoring brief
For every endpoint define stable ID, method/path, purpose, authentication, permissions, tenant scope, request params/body, response schema, status codes, validation, rate limit, idempotency, side effects, audit event, and example. Group auth, users, organizations, teams, integrations, GitHub, CI/CD, Docker, Kubernetes, deployments, monitoring, logs, incidents, cloud, Terraform, CLI, notifications, audit logs, and health/readiness. Mark endpoints as proposed until implemented. Keep contracts consistent with API_STANDARDS and module specs; do not invent provider capabilities.

## Mandatory sections and quality bar
1. Document control: status (`Draft` until reviewed), owner placeholder, version, last-updated placeholder.
2. Purpose, audience, scope, non-goals and terminology.
3. Normative requirements and explicit assumptions.
4. Detailed specification appropriate to this document type.
5. Workflows, edge cases, failure modes and recovery.
6. Security, privacy, tenancy and authorization implications.
7. Performance, reliability, scalability and observability implications where relevant.
8. Testing strategy and measurable acceptance criteria.
9. Dependencies, risks and unresolved decisions.
10. Related documents and traceability.

Do not mechanically force irrelevant sections; mark them “Not applicable” only with a brief reason. Use tables, examples and Mermaid diagrams where they add precision. All examples must be sanitized and clearly illustrative.

## File path
`docs/03-backend/API_ENDPOINTS.md`

## Completion criteria
The result must be detailed enough that an engineer can implement or review the subject without guessing at core behavior. It must be internally consistent with OmniOPS's global contract, explicitly label proposals and unresolved decisions, avoid unsupported claims, and be ready to commit as the exact Markdown file above.

## Final instruction
Follow the Global Production-Grade Documentation Authoring Contract supplied before this file-specific prompt. Output only the complete contents of this one file.

---

## 17. `docs/03-backend/AUTHENTICATION_AND_AUTHORIZATION.md`

# PROMPT — Generate `docs/03-backend/AUTHENTICATION_AND_AUTHORIZATION.md`

## Objective
Specify identity, sessions, organizations, and RBAC.

## File-specific authoring brief
Evaluate Better Auth and Auth.js for a plain React plus Express architecture; state that the final provider must be approved in an ADR and do not assume Next.js. Define signup, email verification, login, logout, password reset, session lifecycle, refresh strategy if used, HTTP-only Secure SameSite cookies, CSRF defenses, OAuth callbacks, CLI device/token flow, organization membership, roles, permissions, resource-level authorization, service identities, account recovery, session revocation, and audit events. Never store long-lived CLI secrets in plaintext.

## Mandatory sections and quality bar
1. Document control: status (`Draft` until reviewed), owner placeholder, version, last-updated placeholder.
2. Purpose, audience, scope, non-goals and terminology.
3. Normative requirements and explicit assumptions.
4. Detailed specification appropriate to this document type.
5. Workflows, edge cases, failure modes and recovery.
6. Security, privacy, tenancy and authorization implications.
7. Performance, reliability, scalability and observability implications where relevant.
8. Testing strategy and measurable acceptance criteria.
9. Dependencies, risks and unresolved decisions.
10. Related documents and traceability.

Do not mechanically force irrelevant sections; mark them “Not applicable” only with a brief reason. Use tables, examples and Mermaid diagrams where they add precision. All examples must be sanitized and clearly illustrative.

## File path
`docs/03-backend/AUTHENTICATION_AND_AUTHORIZATION.md`

## Completion criteria
The result must be detailed enough that an engineer can implement or review the subject without guessing at core behavior. It must be internally consistent with OmniOPS's global contract, explicitly label proposals and unresolved decisions, avoid unsupported claims, and be ready to commit as the exact Markdown file above.

## Final instruction
Follow the Global Production-Grade Documentation Authoring Contract supplied before this file-specific prompt. Output only the complete contents of this one file.

---

## 18. `docs/03-backend/BACKGROUND_JOBS_AND_EVENTS.md`

# PROMPT — Generate `docs/03-backend/BACKGROUND_JOBS_AND_EVENTS.md`

## Objective
Specify asynchronous jobs, webhooks, and real-time events.

## File-specific authoring brief
Define job categories, queue technology as an ADR, worker lifecycle, retries/backoff, dead-letter handling, idempotency, scheduling, concurrency limits, cancellation, job status, and observability. Define webhook signature verification, replay protection, deduplication, event schemas/versioning, WebSocket authentication/authorization, tenant-scoped subscriptions, reconnect/resync behavior, event ordering expectations, and delivery guarantees. Include example event envelopes and failure scenarios.

## Mandatory sections and quality bar
1. Document control: status (`Draft` until reviewed), owner placeholder, version, last-updated placeholder.
2. Purpose, audience, scope, non-goals and terminology.
3. Normative requirements and explicit assumptions.
4. Detailed specification appropriate to this document type.
5. Workflows, edge cases, failure modes and recovery.
6. Security, privacy, tenancy and authorization implications.
7. Performance, reliability, scalability and observability implications where relevant.
8. Testing strategy and measurable acceptance criteria.
9. Dependencies, risks and unresolved decisions.
10. Related documents and traceability.

Do not mechanically force irrelevant sections; mark them “Not applicable” only with a brief reason. Use tables, examples and Mermaid diagrams where they add precision. All examples must be sanitized and clearly illustrative.

## File path
`docs/03-backend/BACKGROUND_JOBS_AND_EVENTS.md`

## Completion criteria
The result must be detailed enough that an engineer can implement or review the subject without guessing at core behavior. It must be internally consistent with OmniOPS's global contract, explicitly label proposals and unresolved decisions, avoid unsupported claims, and be ready to commit as the exact Markdown file above.

## Final instruction
Follow the Global Production-Grade Documentation Authoring Contract supplied before this file-specific prompt. Output only the complete contents of this one file.

---

## 19. `docs/04-cli/CLI_PRODUCT_SPECIFICATION.md`

# PROMPT — Generate `docs/04-cli/CLI_PRODUCT_SPECIFICATION.md`

## Objective
Define the user-facing product requirements for OmniOPS CLI.

## File-specific authoring brief
Specify target users, supported operating systems/shells, Node.js compatibility, npm global installation, upgrade/uninstall, command UX, interactive/non-interactive operation, help/version, configuration, authentication, output formats (human and JSON), exit codes, completion, accessibility, telemetry/privacy, offline behavior, and compatibility with server API versions. Treat `omniops` as a proposed package name pending npm availability verification. Distinguish planned commands from implemented commands.

## Mandatory sections and quality bar
1. Document control: status (`Draft` until reviewed), owner placeholder, version, last-updated placeholder.
2. Purpose, audience, scope, non-goals and terminology.
3. Normative requirements and explicit assumptions.
4. Detailed specification appropriate to this document type.
5. Workflows, edge cases, failure modes and recovery.
6. Security, privacy, tenancy and authorization implications.
7. Performance, reliability, scalability and observability implications where relevant.
8. Testing strategy and measurable acceptance criteria.
9. Dependencies, risks and unresolved decisions.
10. Related documents and traceability.

Do not mechanically force irrelevant sections; mark them “Not applicable” only with a brief reason. Use tables, examples and Mermaid diagrams where they add precision. All examples must be sanitized and clearly illustrative.

## File path
`docs/04-cli/CLI_PRODUCT_SPECIFICATION.md`

## Completion criteria
The result must be detailed enough that an engineer can implement or review the subject without guessing at core behavior. It must be internally consistent with OmniOPS's global contract, explicitly label proposals and unresolved decisions, avoid unsupported claims, and be ready to commit as the exact Markdown file above.

## Final instruction
Follow the Global Production-Grade Documentation Authoring Contract supplied before this file-specific prompt. Output only the complete contents of this one file.

---

## 20. `docs/04-cli/CLI_ARCHITECTURE.md`

# PROMPT — Generate `docs/04-cli/CLI_ARCHITECTURE.md`

## Objective
Design the CLI internals and package boundaries.

## File-specific authoring brief
Define executable entrypoint/bin mapping, command parser selection as an ADR, command registration, handlers, service layer, shared API client, auth/config providers, output renderers, prompts, error mapping, logging, retries/timeouts, cancellation, plugin/extension policy, test strategy, packaging and release. Define command module boundaries for auth, config, status, github, docker, k8s, monitor, logs, cloud, terraform, incidents and deployments. Prevent direct privileged execution unless a separately specified and secured local adapter is approved.

## Mandatory sections and quality bar
1. Document control: status (`Draft` until reviewed), owner placeholder, version, last-updated placeholder.
2. Purpose, audience, scope, non-goals and terminology.
3. Normative requirements and explicit assumptions.
4. Detailed specification appropriate to this document type.
5. Workflows, edge cases, failure modes and recovery.
6. Security, privacy, tenancy and authorization implications.
7. Performance, reliability, scalability and observability implications where relevant.
8. Testing strategy and measurable acceptance criteria.
9. Dependencies, risks and unresolved decisions.
10. Related documents and traceability.

Do not mechanically force irrelevant sections; mark them “Not applicable” only with a brief reason. Use tables, examples and Mermaid diagrams where they add precision. All examples must be sanitized and clearly illustrative.

## File path
`docs/04-cli/CLI_ARCHITECTURE.md`

## Completion criteria
The result must be detailed enough that an engineer can implement or review the subject without guessing at core behavior. It must be internally consistent with OmniOPS's global contract, explicitly label proposals and unresolved decisions, avoid unsupported claims, and be ready to commit as the exact Markdown file above.

## Final instruction
Follow the Global Production-Grade Documentation Authoring Contract supplied before this file-specific prompt. Output only the complete contents of this one file.

---

## 21. `docs/04-cli/CLI_COMMAND_REFERENCE.md`

# PROMPT — Generate `docs/04-cli/CLI_COMMAND_REFERENCE.md`

## Objective
Create a complete command grammar and user reference.

## File-specific authoring brief
For every planned command document syntax, description, subcommands, positional arguments, flags, defaults, examples, output examples, exit codes, required permissions, destructive-action behavior, interactive/noninteractive behavior, JSON schema, and error messages. Cover omniops --help, login/logout, status, dashboard, github, docker, k8s, deployments, monitor, logs, cloud, terraform, incidents and config. Clearly label examples as proposed. Ensure command naming and API endpoints agree with CLI and backend specs.

## Mandatory sections and quality bar
1. Document control: status (`Draft` until reviewed), owner placeholder, version, last-updated placeholder.
2. Purpose, audience, scope, non-goals and terminology.
3. Normative requirements and explicit assumptions.
4. Detailed specification appropriate to this document type.
5. Workflows, edge cases, failure modes and recovery.
6. Security, privacy, tenancy and authorization implications.
7. Performance, reliability, scalability and observability implications where relevant.
8. Testing strategy and measurable acceptance criteria.
9. Dependencies, risks and unresolved decisions.
10. Related documents and traceability.

Do not mechanically force irrelevant sections; mark them “Not applicable” only with a brief reason. Use tables, examples and Mermaid diagrams where they add precision. All examples must be sanitized and clearly illustrative.

## File path
`docs/04-cli/CLI_COMMAND_REFERENCE.md`

## Completion criteria
The result must be detailed enough that an engineer can implement or review the subject without guessing at core behavior. It must be internally consistent with OmniOPS's global contract, explicitly label proposals and unresolved decisions, avoid unsupported claims, and be ready to commit as the exact Markdown file above.

## Final instruction
Follow the Global Production-Grade Documentation Authoring Contract supplied before this file-specific prompt. Output only the complete contents of this one file.

---

## 22. `docs/04-cli/CLI_CONFIGURATION_AND_AUTH.md`

# PROMPT — Generate `docs/04-cli/CLI_CONFIGURATION_AND_AUTH.md`

## Objective
Specify safe CLI configuration and authentication.

## File-specific authoring brief
Define config file path per OS, precedence (flags/env/profile/config/default), profile and organization selection, login/logout, OAuth/device authorization or another approved flow, token storage using OS credential stores where available, fallback protections, expiry/refresh/revocation, headless CI authentication, environment variables, permissions, file modes, secret redaction, config validation, migration, and troubleshooting. Prohibit plaintext credential storage by default and document safe CI secret injection.

## Mandatory sections and quality bar
1. Document control: status (`Draft` until reviewed), owner placeholder, version, last-updated placeholder.
2. Purpose, audience, scope, non-goals and terminology.
3. Normative requirements and explicit assumptions.
4. Detailed specification appropriate to this document type.
5. Workflows, edge cases, failure modes and recovery.
6. Security, privacy, tenancy and authorization implications.
7. Performance, reliability, scalability and observability implications where relevant.
8. Testing strategy and measurable acceptance criteria.
9. Dependencies, risks and unresolved decisions.
10. Related documents and traceability.

Do not mechanically force irrelevant sections; mark them “Not applicable” only with a brief reason. Use tables, examples and Mermaid diagrams where they add precision. All examples must be sanitized and clearly illustrative.

## File path
`docs/04-cli/CLI_CONFIGURATION_AND_AUTH.md`

## Completion criteria
The result must be detailed enough that an engineer can implement or review the subject without guessing at core behavior. It must be internally consistent with OmniOPS's global contract, explicitly label proposals and unresolved decisions, avoid unsupported claims, and be ready to commit as the exact Markdown file above.

## Final instruction
Follow the Global Production-Grade Documentation Authoring Contract supplied before this file-specific prompt. Output only the complete contents of this one file.

---

## 23. `docs/05-database/DATABASE_DESIGN.md`

# PROMPT — Generate `docs/05-database/DATABASE_DESIGN.md`

## Objective
Design MongoDB persistence and tenancy.

## File-specific authoring brief
Define MongoDB deployment topology assumptions, collection ownership, tenant isolation strategy, indexes, unique constraints, validation, transactions where supported, consistency requirements, connection pooling, query patterns, retention, migrations, backups, and scaling. Compare Mongoose or another MongoDB access layer as an ADR; do not prescribe relational migrations. Include ER-style relationship diagrams adapted to document databases and explain embedding vs referencing decisions.

## Mandatory sections and quality bar
1. Document control: status (`Draft` until reviewed), owner placeholder, version, last-updated placeholder.
2. Purpose, audience, scope, non-goals and terminology.
3. Normative requirements and explicit assumptions.
4. Detailed specification appropriate to this document type.
5. Workflows, edge cases, failure modes and recovery.
6. Security, privacy, tenancy and authorization implications.
7. Performance, reliability, scalability and observability implications where relevant.
8. Testing strategy and measurable acceptance criteria.
9. Dependencies, risks and unresolved decisions.
10. Related documents and traceability.

Do not mechanically force irrelevant sections; mark them “Not applicable” only with a brief reason. Use tables, examples and Mermaid diagrams where they add precision. All examples must be sanitized and clearly illustrative.

## File path
`docs/05-database/DATABASE_DESIGN.md`

## Completion criteria
The result must be detailed enough that an engineer can implement or review the subject without guessing at core behavior. It must be internally consistent with OmniOPS's global contract, explicitly label proposals and unresolved decisions, avoid unsupported claims, and be ready to commit as the exact Markdown file above.

## Final instruction
Follow the Global Production-Grade Documentation Authoring Contract supplied before this file-specific prompt. Output only the complete contents of this one file.

---

## 24. `docs/05-database/DATA_MODELS_AND_SCHEMAS.md`

# PROMPT — Generate `docs/05-database/DATA_MODELS_AND_SCHEMAS.md`

## Objective
Specify all persistent entities and validation schemas.

## File-specific authoring brief
Define collections and fields for users, sessions, organizations, memberships, roles/permissions, integrations, encrypted credential references, provider resources, deployments, jobs, incidents, notifications, audit events, CLI sessions/devices, and preferences. For each provide field types, required/optional, defaults, validation, indexes, references, tenant key, retention, sensitivity classification, and sample sanitized documents. Avoid storing raw provider secrets in ordinary documents; use secret references/encryption design. Keep schemas consistent with API and module specs.

## Mandatory sections and quality bar
1. Document control: status (`Draft` until reviewed), owner placeholder, version, last-updated placeholder.
2. Purpose, audience, scope, non-goals and terminology.
3. Normative requirements and explicit assumptions.
4. Detailed specification appropriate to this document type.
5. Workflows, edge cases, failure modes and recovery.
6. Security, privacy, tenancy and authorization implications.
7. Performance, reliability, scalability and observability implications where relevant.
8. Testing strategy and measurable acceptance criteria.
9. Dependencies, risks and unresolved decisions.
10. Related documents and traceability.

Do not mechanically force irrelevant sections; mark them “Not applicable” only with a brief reason. Use tables, examples and Mermaid diagrams where they add precision. All examples must be sanitized and clearly illustrative.

## File path
`docs/05-database/DATA_MODELS_AND_SCHEMAS.md`

## Completion criteria
The result must be detailed enough that an engineer can implement or review the subject without guessing at core behavior. It must be internally consistent with OmniOPS's global contract, explicitly label proposals and unresolved decisions, avoid unsupported claims, and be ready to commit as the exact Markdown file above.

## Final instruction
Follow the Global Production-Grade Documentation Authoring Contract supplied before this file-specific prompt. Output only the complete contents of this one file.

---

## 25. `docs/05-database/DATA_LIFECYCLE_AND_BACKUPS.md`

# PROMPT — Generate `docs/05-database/DATA_LIFECYCLE_AND_BACKUPS.md`

## Objective
Define data retention, deletion, backup, and recovery.

## File-specific authoring brief
Document data classification, collection retention, legal hold considerations, account/tenant deletion, export, soft vs hard delete, TTL indexes, backup frequency and encryption, point-in-time recovery availability assumptions, restore drills, RPO/RTO targets as proposed values, disaster scenarios, integrity verification, access control, and operational runbooks. Distinguish MongoDB Atlas features from self-managed MongoDB capabilities and require environment-specific validation.

## Mandatory sections and quality bar
1. Document control: status (`Draft` until reviewed), owner placeholder, version, last-updated placeholder.
2. Purpose, audience, scope, non-goals and terminology.
3. Normative requirements and explicit assumptions.
4. Detailed specification appropriate to this document type.
5. Workflows, edge cases, failure modes and recovery.
6. Security, privacy, tenancy and authorization implications.
7. Performance, reliability, scalability and observability implications where relevant.
8. Testing strategy and measurable acceptance criteria.
9. Dependencies, risks and unresolved decisions.
10. Related documents and traceability.

Do not mechanically force irrelevant sections; mark them “Not applicable” only with a brief reason. Use tables, examples and Mermaid diagrams where they add precision. All examples must be sanitized and clearly illustrative.

## File path
`docs/05-database/DATA_LIFECYCLE_AND_BACKUPS.md`

## Completion criteria
The result must be detailed enough that an engineer can implement or review the subject without guessing at core behavior. It must be internally consistent with OmniOPS's global contract, explicitly label proposals and unresolved decisions, avoid unsupported claims, and be ready to commit as the exact Markdown file above.

## Final instruction
Follow the Global Production-Grade Documentation Authoring Contract supplied before this file-specific prompt. Output only the complete contents of this one file.

---

## 26. `docs/06-security/SECURITY_ARCHITECTURE.md`

# PROMPT — Generate `docs/06-security/SECURITY_ARCHITECTURE.md`

## Objective
Define the platform security architecture and secure execution model.

## File-specific authoring brief
Model trust boundaries across browser, CLI, Express API, workers, MongoDB, secrets store, provider APIs, Kubernetes clusters and cloud accounts. Specify identity, least privilege, tenant isolation, secret handling, encryption in transit/at rest, key rotation, service-to-service auth, secure webhooks, network controls, audit trails, safe command execution, approvals, policy checks, sandboxing, and incident response integration. Treat infrastructure-changing actions as high risk and default to read-only capabilities.

## Mandatory sections and quality bar
1. Document control: status (`Draft` until reviewed), owner placeholder, version, last-updated placeholder.
2. Purpose, audience, scope, non-goals and terminology.
3. Normative requirements and explicit assumptions.
4. Detailed specification appropriate to this document type.
5. Workflows, edge cases, failure modes and recovery.
6. Security, privacy, tenancy and authorization implications.
7. Performance, reliability, scalability and observability implications where relevant.
8. Testing strategy and measurable acceptance criteria.
9. Dependencies, risks and unresolved decisions.
10. Related documents and traceability.

Do not mechanically force irrelevant sections; mark them “Not applicable” only with a brief reason. Use tables, examples and Mermaid diagrams where they add precision. All examples must be sanitized and clearly illustrative.

## File path
`docs/06-security/SECURITY_ARCHITECTURE.md`

## Completion criteria
The result must be detailed enough that an engineer can implement or review the subject without guessing at core behavior. It must be internally consistent with OmniOPS's global contract, explicitly label proposals and unresolved decisions, avoid unsupported claims, and be ready to commit as the exact Markdown file above.

## Final instruction
Follow the Global Production-Grade Documentation Authoring Contract supplied before this file-specific prompt. Output only the complete contents of this one file.

---

## 27. `docs/06-security/THREAT_MODEL.md`

# PROMPT — Generate `docs/06-security/THREAT_MODEL.md`

## Objective
Perform a structured threat model for a DevOps control plane.

## File-specific authoring brief
Use STRIDE or an equivalent method. Identify assets, actors, entry points, trust boundaries, abuse cases and threats including account takeover, tenant escape, stolen CLI tokens, malicious integrations/webhooks, SSRF, command injection, secret exfiltration, compromised worker, supply-chain attack, privilege escalation, destructive cloud/Kubernetes action, log injection and AI prompt injection. Rate likelihood/impact, define mitigations, residual risk, detection and test cases. Do not claim certification or compliance.

## Mandatory sections and quality bar
1. Document control: status (`Draft` until reviewed), owner placeholder, version, last-updated placeholder.
2. Purpose, audience, scope, non-goals and terminology.
3. Normative requirements and explicit assumptions.
4. Detailed specification appropriate to this document type.
5. Workflows, edge cases, failure modes and recovery.
6. Security, privacy, tenancy and authorization implications.
7. Performance, reliability, scalability and observability implications where relevant.
8. Testing strategy and measurable acceptance criteria.
9. Dependencies, risks and unresolved decisions.
10. Related documents and traceability.

Do not mechanically force irrelevant sections; mark them “Not applicable” only with a brief reason. Use tables, examples and Mermaid diagrams where they add precision. All examples must be sanitized and clearly illustrative.

## File path
`docs/06-security/THREAT_MODEL.md`

## Completion criteria
The result must be detailed enough that an engineer can implement or review the subject without guessing at core behavior. It must be internally consistent with OmniOPS's global contract, explicitly label proposals and unresolved decisions, avoid unsupported claims, and be ready to commit as the exact Markdown file above.

## Final instruction
Follow the Global Production-Grade Documentation Authoring Contract supplied before this file-specific prompt. Output only the complete contents of this one file.

---

## 28. `docs/06-security/SECURITY_AND_COMPLIANCE.md`

# PROMPT — Generate `docs/06-security/SECURITY_AND_COMPLIANCE.md`

## Objective
Specify security controls and legal/privacy requirements.

## File-specific authoring brief
Define secure headers including CSP, HSTS, X-Content-Type-Options and frame protection; CORS allowlists; CSRF; XSS; injection prevention; output encoding; dependency scanning; secret scanning; SAST/DAST; container scanning; audit logging; vulnerability disclosure; cookie consent applicability; privacy notice and terms review. Explain that legal templates require qualified review and do not claim compliance with SOC 2, ISO 27001, GDPR or other regimes without evidence. Clarify free/OSS security-header options and implementation ownership.

## Mandatory sections and quality bar
1. Document control: status (`Draft` until reviewed), owner placeholder, version, last-updated placeholder.
2. Purpose, audience, scope, non-goals and terminology.
3. Normative requirements and explicit assumptions.
4. Detailed specification appropriate to this document type.
5. Workflows, edge cases, failure modes and recovery.
6. Security, privacy, tenancy and authorization implications.
7. Performance, reliability, scalability and observability implications where relevant.
8. Testing strategy and measurable acceptance criteria.
9. Dependencies, risks and unresolved decisions.
10. Related documents and traceability.

Do not mechanically force irrelevant sections; mark them “Not applicable” only with a brief reason. Use tables, examples and Mermaid diagrams where they add precision. All examples must be sanitized and clearly illustrative.

## File path
`docs/06-security/SECURITY_AND_COMPLIANCE.md`

## Completion criteria
The result must be detailed enough that an engineer can implement or review the subject without guessing at core behavior. It must be internally consistent with OmniOPS's global contract, explicitly label proposals and unresolved decisions, avoid unsupported claims, and be ready to commit as the exact Markdown file above.

## Final instruction
Follow the Global Production-Grade Documentation Authoring Contract supplied before this file-specific prompt. Output only the complete contents of this one file.

---

## 29. `docs/07-testing/TESTING_STRATEGY.md`

# PROMPT — Generate `docs/07-testing/TESTING_STRATEGY.md`

## Objective
Define test coverage across web, API, CLI, integrations, and infrastructure.

## File-specific authoring brief
Specify unit, component, integration, contract, API, end-to-end, CLI, security, load, resilience, accessibility and infrastructure tests. Recommend compatible tools such as Vitest, React Testing Library, Supertest and Playwright, subject to ADR. Define test pyramid, fixtures, seeded data, provider mocks/sandboxes, secrets handling, CI gates, flaky test policy, coverage targets as proposed thresholds, test data isolation, and acceptance traceability. Include critical journeys: signup, tenant isolation, CLI auth, read-only integrations, approvals, audit, and failure recovery.

## Mandatory sections and quality bar
1. Document control: status (`Draft` until reviewed), owner placeholder, version, last-updated placeholder.
2. Purpose, audience, scope, non-goals and terminology.
3. Normative requirements and explicit assumptions.
4. Detailed specification appropriate to this document type.
5. Workflows, edge cases, failure modes and recovery.
6. Security, privacy, tenancy and authorization implications.
7. Performance, reliability, scalability and observability implications where relevant.
8. Testing strategy and measurable acceptance criteria.
9. Dependencies, risks and unresolved decisions.
10. Related documents and traceability.

Do not mechanically force irrelevant sections; mark them “Not applicable” only with a brief reason. Use tables, examples and Mermaid diagrams where they add precision. All examples must be sanitized and clearly illustrative.

## File path
`docs/07-testing/TESTING_STRATEGY.md`

## Completion criteria
The result must be detailed enough that an engineer can implement or review the subject without guessing at core behavior. It must be internally consistent with OmniOPS's global contract, explicitly label proposals and unresolved decisions, avoid unsupported claims, and be ready to commit as the exact Markdown file above.

## Final instruction
Follow the Global Production-Grade Documentation Authoring Contract supplied before this file-specific prompt. Output only the complete contents of this one file.

---

## 30. `docs/07-testing/QUALITY_STANDARDS.md`

# PROMPT — Generate `docs/07-testing/QUALITY_STANDARDS.md`

## Objective
Define engineering quality gates and coding conventions.

## File-specific authoring brief
Specify JavaScript/JSX conventions, ESLint configuration (not TypeScript-only rules), Prettier, import ordering, naming, error handling, accessibility, documentation standards, code review checklist, Conventional Commits, branch/PR strategy, Husky/lint-staged, dependency policy, test requirements, complexity thresholds and release gates. Define strict quality checks without inventing numeric thresholds unless marked proposed and approved.

## Mandatory sections and quality bar
1. Document control: status (`Draft` until reviewed), owner placeholder, version, last-updated placeholder.
2. Purpose, audience, scope, non-goals and terminology.
3. Normative requirements and explicit assumptions.
4. Detailed specification appropriate to this document type.
5. Workflows, edge cases, failure modes and recovery.
6. Security, privacy, tenancy and authorization implications.
7. Performance, reliability, scalability and observability implications where relevant.
8. Testing strategy and measurable acceptance criteria.
9. Dependencies, risks and unresolved decisions.
10. Related documents and traceability.

Do not mechanically force irrelevant sections; mark them “Not applicable” only with a brief reason. Use tables, examples and Mermaid diagrams where they add precision. All examples must be sanitized and clearly illustrative.

## File path
`docs/07-testing/QUALITY_STANDARDS.md`

## Completion criteria
The result must be detailed enough that an engineer can implement or review the subject without guessing at core behavior. It must be internally consistent with OmniOPS's global contract, explicitly label proposals and unresolved decisions, avoid unsupported claims, and be ready to commit as the exact Markdown file above.

## Final instruction
Follow the Global Production-Grade Documentation Authoring Contract supplied before this file-specific prompt. Output only the complete contents of this one file.

---

## 31. `docs/08-devops/CONTAINERIZATION_AND_LOCAL_DEVELOPMENT.md`

# PROMPT — Generate `docs/08-devops/CONTAINERIZATION_AND_LOCAL_DEVELOPMENT.md`

## Objective
Specify reproducible local development and container builds.

## File-specific authoring brief
Define prerequisites, local environment setup, Docker multi-stage build strategy for web/API/CLI where applicable, non-root runtime, minimal images, health checks, Compose services, MongoDB, local object storage/emulators only when needed, volumes, networks, secrets, hot reload, seed data, troubleshooting, and cleanup. Explain LocalStack is optional and list only AWS services actually needed for local emulation. Ensure production and development configurations are distinct.

## Mandatory sections and quality bar
1. Document control: status (`Draft` until reviewed), owner placeholder, version, last-updated placeholder.
2. Purpose, audience, scope, non-goals and terminology.
3. Normative requirements and explicit assumptions.
4. Detailed specification appropriate to this document type.
5. Workflows, edge cases, failure modes and recovery.
6. Security, privacy, tenancy and authorization implications.
7. Performance, reliability, scalability and observability implications where relevant.
8. Testing strategy and measurable acceptance criteria.
9. Dependencies, risks and unresolved decisions.
10. Related documents and traceability.

Do not mechanically force irrelevant sections; mark them “Not applicable” only with a brief reason. Use tables, examples and Mermaid diagrams where they add precision. All examples must be sanitized and clearly illustrative.

## File path
`docs/08-devops/CONTAINERIZATION_AND_LOCAL_DEVELOPMENT.md`

## Completion criteria
The result must be detailed enough that an engineer can implement or review the subject without guessing at core behavior. It must be internally consistent with OmniOPS's global contract, explicitly label proposals and unresolved decisions, avoid unsupported claims, and be ready to commit as the exact Markdown file above.

## Final instruction
Follow the Global Production-Grade Documentation Authoring Contract supplied before this file-specific prompt. Output only the complete contents of this one file.

---

## 32. `docs/08-devops/CI_CD_AND_DEPLOYMENT.md`

# PROMPT — Generate `docs/08-devops/CI_CD_AND_DEPLOYMENT.md`

## Objective
Design secure CI/CD and release pipelines.

## File-specific authoring brief
Define GitHub Actions or GitLab CI as an ADR, PR validation, lint/format/test/build/security scans, artifact provenance, image tagging, registry, environment promotion, deployment approvals, rollback, database compatibility, secrets, npm CLI publishing with provenance/2FA where supported, semantic versioning, release notes, and post-deploy verification. Include branch protections and least-privilege workflow permissions. Never publish on untrusted pull_request code with secrets.

## Mandatory sections and quality bar
1. Document control: status (`Draft` until reviewed), owner placeholder, version, last-updated placeholder.
2. Purpose, audience, scope, non-goals and terminology.
3. Normative requirements and explicit assumptions.
4. Detailed specification appropriate to this document type.
5. Workflows, edge cases, failure modes and recovery.
6. Security, privacy, tenancy and authorization implications.
7. Performance, reliability, scalability and observability implications where relevant.
8. Testing strategy and measurable acceptance criteria.
9. Dependencies, risks and unresolved decisions.
10. Related documents and traceability.

Do not mechanically force irrelevant sections; mark them “Not applicable” only with a brief reason. Use tables, examples and Mermaid diagrams where they add precision. All examples must be sanitized and clearly illustrative.

## File path
`docs/08-devops/CI_CD_AND_DEPLOYMENT.md`

## Completion criteria
The result must be detailed enough that an engineer can implement or review the subject without guessing at core behavior. It must be internally consistent with OmniOPS's global contract, explicitly label proposals and unresolved decisions, avoid unsupported claims, and be ready to commit as the exact Markdown file above.

## Final instruction
Follow the Global Production-Grade Documentation Authoring Contract supplied before this file-specific prompt. Output only the complete contents of this one file.

---

## 33. `docs/08-devops/INFRASTRUCTURE_AS_CODE.md`

# PROMPT — Generate `docs/08-devops/INFRASTRUCTURE_AS_CODE.md`

## Objective
Specify Terraform-managed production infrastructure.

## File-specific authoring brief
Define AWS account/environment separation, network architecture, compute/runtime choice as an ADR, ingress/CDN, TLS/DNS, MongoDB hosting choice, secrets, IAM least privilege, logs/metrics, backups, state backend encryption/locking, module boundaries, variables/outputs, plan/apply approvals, drift detection, cost controls, disaster recovery and teardown safeguards. Do not invent resource IDs, account details, region, prices or production topology as finalized decisions.

## Mandatory sections and quality bar
1. Document control: status (`Draft` until reviewed), owner placeholder, version, last-updated placeholder.
2. Purpose, audience, scope, non-goals and terminology.
3. Normative requirements and explicit assumptions.
4. Detailed specification appropriate to this document type.
5. Workflows, edge cases, failure modes and recovery.
6. Security, privacy, tenancy and authorization implications.
7. Performance, reliability, scalability and observability implications where relevant.
8. Testing strategy and measurable acceptance criteria.
9. Dependencies, risks and unresolved decisions.
10. Related documents and traceability.

Do not mechanically force irrelevant sections; mark them “Not applicable” only with a brief reason. Use tables, examples and Mermaid diagrams where they add precision. All examples must be sanitized and clearly illustrative.

## File path
`docs/08-devops/INFRASTRUCTURE_AS_CODE.md`

## Completion criteria
The result must be detailed enough that an engineer can implement or review the subject without guessing at core behavior. It must be internally consistent with OmniOPS's global contract, explicitly label proposals and unresolved decisions, avoid unsupported claims, and be ready to commit as the exact Markdown file above.

## Final instruction
Follow the Global Production-Grade Documentation Authoring Contract supplied before this file-specific prompt. Output only the complete contents of this one file.

---

## 34. `docs/09-developer-experience/DEVELOPMENT_GUIDELINES.md`

# PROMPT — Generate `docs/09-developer-experience/DEVELOPMENT_GUIDELINES.md`

## Objective
Create the contributor and local developer handbook.

## File-specific authoring brief
Document prerequisites, clone/install/bootstrap, environment setup, local services, workspace commands, coding workflow, debugging, testing, branch/commit/PR rules, code review, release process, troubleshooting, architecture navigation and how to update docs. Include onboarding checklist and safe handling of secrets. Align commands with actual monorepo tool only after selected.

## Mandatory sections and quality bar
1. Document control: status (`Draft` until reviewed), owner placeholder, version, last-updated placeholder.
2. Purpose, audience, scope, non-goals and terminology.
3. Normative requirements and explicit assumptions.
4. Detailed specification appropriate to this document type.
5. Workflows, edge cases, failure modes and recovery.
6. Security, privacy, tenancy and authorization implications.
7. Performance, reliability, scalability and observability implications where relevant.
8. Testing strategy and measurable acceptance criteria.
9. Dependencies, risks and unresolved decisions.
10. Related documents and traceability.

Do not mechanically force irrelevant sections; mark them “Not applicable” only with a brief reason. Use tables, examples and Mermaid diagrams where they add precision. All examples must be sanitized and clearly illustrative.

## File path
`docs/09-developer-experience/DEVELOPMENT_GUIDELINES.md`

## Completion criteria
The result must be detailed enough that an engineer can implement or review the subject without guessing at core behavior. It must be internally consistent with OmniOPS's global contract, explicitly label proposals and unresolved decisions, avoid unsupported claims, and be ready to commit as the exact Markdown file above.

## Final instruction
Follow the Global Production-Grade Documentation Authoring Contract supplied before this file-specific prompt. Output only the complete contents of this one file.

---

## 35. `docs/09-developer-experience/API_DOCUMENTATION_GUIDELINES.md`

# PROMPT — Generate `docs/09-developer-experience/API_DOCUMENTATION_GUIDELINES.md`

## Objective
Define how API contracts are authored and maintained.

## File-specific authoring brief
Specify OpenAPI version, source-of-truth location, schema reuse, auth/security schemes, examples, error models, pagination, tags, versioning, deprecation, generated Swagger UI, validation in CI, contract tests, changelog, and review ownership. Explain how web and CLI consume the same contract. Avoid documenting endpoints that are not approved; mark planned endpoints clearly.

## Mandatory sections and quality bar
1. Document control: status (`Draft` until reviewed), owner placeholder, version, last-updated placeholder.
2. Purpose, audience, scope, non-goals and terminology.
3. Normative requirements and explicit assumptions.
4. Detailed specification appropriate to this document type.
5. Workflows, edge cases, failure modes and recovery.
6. Security, privacy, tenancy and authorization implications.
7. Performance, reliability, scalability and observability implications where relevant.
8. Testing strategy and measurable acceptance criteria.
9. Dependencies, risks and unresolved decisions.
10. Related documents and traceability.

Do not mechanically force irrelevant sections; mark them “Not applicable” only with a brief reason. Use tables, examples and Mermaid diagrams where they add precision. All examples must be sanitized and clearly illustrative.

## File path
`docs/09-developer-experience/API_DOCUMENTATION_GUIDELINES.md`

## Completion criteria
The result must be detailed enough that an engineer can implement or review the subject without guessing at core behavior. It must be internally consistent with OmniOPS's global contract, explicitly label proposals and unresolved decisions, avoid unsupported claims, and be ready to commit as the exact Markdown file above.

## Final instruction
Follow the Global Production-Grade Documentation Authoring Contract supplied before this file-specific prompt. Output only the complete contents of this one file.

---

## 36. `docs/10-modules/COMMAND_CENTER.md`

# PROMPT — Generate `docs/10-modules/COMMAND_CENTER.md`

## Objective
Specify the unified operational dashboard module.

## File-specific authoring brief
Define overview KPIs, environment/organization context, service health, recent deployments, incidents, alerts, activity feed, integration status, widgets, filters, time ranges, personalization, drill-downs, real-time updates, permissions, API/data requirements, loading/empty/error states, accessibility, audit implications and acceptance tests. Avoid fabricated metrics and define freshness/source metadata.

## Mandatory sections and quality bar
1. Document control: status (`Draft` until reviewed), owner placeholder, version, last-updated placeholder.
2. Purpose, audience, scope, non-goals and terminology.
3. Normative requirements and explicit assumptions.
4. Detailed specification appropriate to this document type.
5. Workflows, edge cases, failure modes and recovery.
6. Security, privacy, tenancy and authorization implications.
7. Performance, reliability, scalability and observability implications where relevant.
8. Testing strategy and measurable acceptance criteria.
9. Dependencies, risks and unresolved decisions.
10. Related documents and traceability.

Do not mechanically force irrelevant sections; mark them “Not applicable” only with a brief reason. Use tables, examples and Mermaid diagrams where they add precision. All examples must be sanitized and clearly illustrative.

## File path
`docs/10-modules/COMMAND_CENTER.md`

## Completion criteria
The result must be detailed enough that an engineer can implement or review the subject without guessing at core behavior. It must be internally consistent with OmniOPS's global contract, explicitly label proposals and unresolved decisions, avoid unsupported claims, and be ready to commit as the exact Markdown file above.

## Final instruction
Follow the Global Production-Grade Documentation Authoring Contract supplied before this file-specific prompt. Output only the complete contents of this one file.

---

## 37. `docs/10-modules/GITHUB_INTEGRATION.md`

# PROMPT — Generate `docs/10-modules/GITHUB_INTEGRATION.md`

## Objective
Specify secure GitHub integration.

## File-specific authoring brief
Define supported GitHub connection method(s), OAuth App/GitHub App decision, installation and repository selection, least-privilege permissions, webhook validation/replay protection, repository/branch/commit/PR/workflow data, sync strategy, rate limits, pagination, token rotation/revocation, organization mapping, UI, API, CLI, audit, failure handling and test strategy. Do not assume permissions or API availability without verification.

## Mandatory sections and quality bar
1. Document control: status (`Draft` until reviewed), owner placeholder, version, last-updated placeholder.
2. Purpose, audience, scope, non-goals and terminology.
3. Normative requirements and explicit assumptions.
4. Detailed specification appropriate to this document type.
5. Workflows, edge cases, failure modes and recovery.
6. Security, privacy, tenancy and authorization implications.
7. Performance, reliability, scalability and observability implications where relevant.
8. Testing strategy and measurable acceptance criteria.
9. Dependencies, risks and unresolved decisions.
10. Related documents and traceability.

Do not mechanically force irrelevant sections; mark them “Not applicable” only with a brief reason. Use tables, examples and Mermaid diagrams where they add precision. All examples must be sanitized and clearly illustrative.

## File path
`docs/10-modules/GITHUB_INTEGRATION.md`

## Completion criteria
The result must be detailed enough that an engineer can implement or review the subject without guessing at core behavior. It must be internally consistent with OmniOPS's global contract, explicitly label proposals and unresolved decisions, avoid unsupported claims, and be ready to commit as the exact Markdown file above.

## Final instruction
Follow the Global Production-Grade Documentation Authoring Contract supplied before this file-specific prompt. Output only the complete contents of this one file.

---

## 38. `docs/10-modules/CICD_MANAGEMENT.md`

# PROMPT — Generate `docs/10-modules/CICD_MANAGEMENT.md`

## Objective
Specify CI/CD visibility and controlled pipeline operations.

## File-specific authoring brief
Define supported CI providers as explicit scope decisions, pipeline discovery, run/job status, logs/artifacts metadata, deployment environments, approvals, rerun/cancel/rollback policy, webhook/polling sync, RBAC, audit, rate limits, UI, API, CLI, failure states and tests. Separate read-only visibility from write operations and require confirmation/approval for risky actions.

## Mandatory sections and quality bar
1. Document control: status (`Draft` until reviewed), owner placeholder, version, last-updated placeholder.
2. Purpose, audience, scope, non-goals and terminology.
3. Normative requirements and explicit assumptions.
4. Detailed specification appropriate to this document type.
5. Workflows, edge cases, failure modes and recovery.
6. Security, privacy, tenancy and authorization implications.
7. Performance, reliability, scalability and observability implications where relevant.
8. Testing strategy and measurable acceptance criteria.
9. Dependencies, risks and unresolved decisions.
10. Related documents and traceability.

Do not mechanically force irrelevant sections; mark them “Not applicable” only with a brief reason. Use tables, examples and Mermaid diagrams where they add precision. All examples must be sanitized and clearly illustrative.

## File path
`docs/10-modules/CICD_MANAGEMENT.md`

## Completion criteria
The result must be detailed enough that an engineer can implement or review the subject without guessing at core behavior. It must be internally consistent with OmniOPS's global contract, explicitly label proposals and unresolved decisions, avoid unsupported claims, and be ready to commit as the exact Markdown file above.

## Final instruction
Follow the Global Production-Grade Documentation Authoring Contract supplied before this file-specific prompt. Output only the complete contents of this one file.

---

## 39. `docs/10-modules/DOCKER_MANAGEMENT.md`

# PROMPT — Generate `docs/10-modules/DOCKER_MANAGEMENT.md`

## Objective
Specify Docker resource visibility and safe management.

## File-specific authoring brief
Define supported connection models (Docker Engine API, agent or remote endpoint) and their threat implications. Cover containers, images, networks, volumes, health/status, logs, resource metrics, filtering, start/stop/restart/remove policies, permissions, execution isolation, API, UI, CLI, audit, errors and tests. Never expose an unrestricted Docker socket or treat Docker group access as harmless.

## Mandatory sections and quality bar
1. Document control: status (`Draft` until reviewed), owner placeholder, version, last-updated placeholder.
2. Purpose, audience, scope, non-goals and terminology.
3. Normative requirements and explicit assumptions.
4. Detailed specification appropriate to this document type.
5. Workflows, edge cases, failure modes and recovery.
6. Security, privacy, tenancy and authorization implications.
7. Performance, reliability, scalability and observability implications where relevant.
8. Testing strategy and measurable acceptance criteria.
9. Dependencies, risks and unresolved decisions.
10. Related documents and traceability.

Do not mechanically force irrelevant sections; mark them “Not applicable” only with a brief reason. Use tables, examples and Mermaid diagrams where they add precision. All examples must be sanitized and clearly illustrative.

## File path
`docs/10-modules/DOCKER_MANAGEMENT.md`

## Completion criteria
The result must be detailed enough that an engineer can implement or review the subject without guessing at core behavior. It must be internally consistent with OmniOPS's global contract, explicitly label proposals and unresolved decisions, avoid unsupported claims, and be ready to commit as the exact Markdown file above.

## Final instruction
Follow the Global Production-Grade Documentation Authoring Contract supplied before this file-specific prompt. Output only the complete contents of this one file.

---

## 40. `docs/10-modules/KUBERNETES_MANAGEMENT.md`

# PROMPT — Generate `docs/10-modules/KUBERNETES_MANAGEMENT.md`

## Objective
Specify Kubernetes cluster connection and operations.

## File-specific authoring brief
Define cluster onboarding, kubeconfig/credential handling, supported auth methods, namespace/resource discovery, pods/deployments/services/events, health, logs, rollout status, scaling/restart/rollback actions, RBAC mapping, read-only default, approval gates, audit, API, UI, CLI, pagination, watch reconnect, version compatibility and tests. Do not store raw kubeconfig or cluster-admin credentials without an explicit secure design.

## Mandatory sections and quality bar
1. Document control: status (`Draft` until reviewed), owner placeholder, version, last-updated placeholder.
2. Purpose, audience, scope, non-goals and terminology.
3. Normative requirements and explicit assumptions.
4. Detailed specification appropriate to this document type.
5. Workflows, edge cases, failure modes and recovery.
6. Security, privacy, tenancy and authorization implications.
7. Performance, reliability, scalability and observability implications where relevant.
8. Testing strategy and measurable acceptance criteria.
9. Dependencies, risks and unresolved decisions.
10. Related documents and traceability.

Do not mechanically force irrelevant sections; mark them “Not applicable” only with a brief reason. Use tables, examples and Mermaid diagrams where they add precision. All examples must be sanitized and clearly illustrative.

## File path
`docs/10-modules/KUBERNETES_MANAGEMENT.md`

## Completion criteria
The result must be detailed enough that an engineer can implement or review the subject without guessing at core behavior. It must be internally consistent with OmniOPS's global contract, explicitly label proposals and unresolved decisions, avoid unsupported claims, and be ready to commit as the exact Markdown file above.

## Final instruction
Follow the Global Production-Grade Documentation Authoring Contract supplied before this file-specific prompt. Output only the complete contents of this one file.

---

## 41. `docs/10-modules/INFRASTRUCTURE_MONITORING.md`

# PROMPT — Generate `docs/10-modules/INFRASTRUCTURE_MONITORING.md`

## Objective
Specify metrics, alerts, and infrastructure health.

## File-specific authoring brief
Define supported metrics sources and integration decisions (for example Prometheus-compatible endpoints), metric naming/labels, collection interval, retention, aggregation, dashboards, alert rules, alert lifecycle, thresholds, time zones, query limits, permissions, API/UI/CLI, data freshness, outage handling, cardinality controls and tests. Do not promise Datadog/New Relic features unless integrated.

## Mandatory sections and quality bar
1. Document control: status (`Draft` until reviewed), owner placeholder, version, last-updated placeholder.
2. Purpose, audience, scope, non-goals and terminology.
3. Normative requirements and explicit assumptions.
4. Detailed specification appropriate to this document type.
5. Workflows, edge cases, failure modes and recovery.
6. Security, privacy, tenancy and authorization implications.
7. Performance, reliability, scalability and observability implications where relevant.
8. Testing strategy and measurable acceptance criteria.
9. Dependencies, risks and unresolved decisions.
10. Related documents and traceability.

Do not mechanically force irrelevant sections; mark them “Not applicable” only with a brief reason. Use tables, examples and Mermaid diagrams where they add precision. All examples must be sanitized and clearly illustrative.

## File path
`docs/10-modules/INFRASTRUCTURE_MONITORING.md`

## Completion criteria
The result must be detailed enough that an engineer can implement or review the subject without guessing at core behavior. It must be internally consistent with OmniOPS's global contract, explicitly label proposals and unresolved decisions, avoid unsupported claims, and be ready to commit as the exact Markdown file above.

## Final instruction
Follow the Global Production-Grade Documentation Authoring Contract supplied before this file-specific prompt. Output only the complete contents of this one file.

---

## 42. `docs/10-modules/CENTRALIZED_LOGGING.md`

# PROMPT — Generate `docs/10-modules/CENTRALIZED_LOGGING.md`

## Objective
Specify secure log collection, search, and analysis.

## File-specific authoring brief
Define supported log sources/agents, ingestion transport, parsing, indexing/storage decision, tenant isolation, retention, search/filter/time range, pagination, streaming, redaction, sensitive-data controls, log injection defenses, access control, export limits, API/UI/CLI, failure handling, observability and tests. Never log secrets or treat untrusted log content as instructions to an AI system.

## Mandatory sections and quality bar
1. Document control: status (`Draft` until reviewed), owner placeholder, version, last-updated placeholder.
2. Purpose, audience, scope, non-goals and terminology.
3. Normative requirements and explicit assumptions.
4. Detailed specification appropriate to this document type.
5. Workflows, edge cases, failure modes and recovery.
6. Security, privacy, tenancy and authorization implications.
7. Performance, reliability, scalability and observability implications where relevant.
8. Testing strategy and measurable acceptance criteria.
9. Dependencies, risks and unresolved decisions.
10. Related documents and traceability.

Do not mechanically force irrelevant sections; mark them “Not applicable” only with a brief reason. Use tables, examples and Mermaid diagrams where they add precision. All examples must be sanitized and clearly illustrative.

## File path
`docs/10-modules/CENTRALIZED_LOGGING.md`

## Completion criteria
The result must be detailed enough that an engineer can implement or review the subject without guessing at core behavior. It must be internally consistent with OmniOPS's global contract, explicitly label proposals and unresolved decisions, avoid unsupported claims, and be ready to commit as the exact Markdown file above.

## Final instruction
Follow the Global Production-Grade Documentation Authoring Contract supplied before this file-specific prompt. Output only the complete contents of this one file.

---

## 43. `docs/10-modules/CLOUD_MANAGEMENT.md`

# PROMPT — Generate `docs/10-modules/CLOUD_MANAGEMENT.md`

## Objective
Specify cloud account integration and inventory.

## File-specific authoring brief
Define initial cloud-provider scope as an explicit decision; cover account onboarding, role-based cross-account access, credential rotation, read-only inventory, regions/resources, cost visibility only if supported, permissions, sync, rate limits, API/UI/CLI, audit, error states and tests. Prefer short-lived role assumption over static keys where provider supports it. Do not invent pricing or provider API capabilities.

## Mandatory sections and quality bar
1. Document control: status (`Draft` until reviewed), owner placeholder, version, last-updated placeholder.
2. Purpose, audience, scope, non-goals and terminology.
3. Normative requirements and explicit assumptions.
4. Detailed specification appropriate to this document type.
5. Workflows, edge cases, failure modes and recovery.
6. Security, privacy, tenancy and authorization implications.
7. Performance, reliability, scalability and observability implications where relevant.
8. Testing strategy and measurable acceptance criteria.
9. Dependencies, risks and unresolved decisions.
10. Related documents and traceability.

Do not mechanically force irrelevant sections; mark them “Not applicable” only with a brief reason. Use tables, examples and Mermaid diagrams where they add precision. All examples must be sanitized and clearly illustrative.

## File path
`docs/10-modules/CLOUD_MANAGEMENT.md`

## Completion criteria
The result must be detailed enough that an engineer can implement or review the subject without guessing at core behavior. It must be internally consistent with OmniOPS's global contract, explicitly label proposals and unresolved decisions, avoid unsupported claims, and be ready to commit as the exact Markdown file above.

## Final instruction
Follow the Global Production-Grade Documentation Authoring Contract supplied before this file-specific prompt. Output only the complete contents of this one file.

---

## 44. `docs/10-modules/INCIDENT_MANAGEMENT.md`

# PROMPT — Generate `docs/10-modules/INCIDENT_MANAGEMENT.md`

## Objective
Specify incident lifecycle and collaboration.

## File-specific authoring brief
Define alert-to-incident flow, severity/priority, ownership, status lifecycle, deduplication, assignment, timeline, notes, notifications, escalation, acknowledgement, resolution, postmortem, integrations, RBAC, audit, API/UI/CLI, SLA/SLO terminology, failure behavior and tests. Do not claim integrations with paging/chat systems until selected.

## Mandatory sections and quality bar
1. Document control: status (`Draft` until reviewed), owner placeholder, version, last-updated placeholder.
2. Purpose, audience, scope, non-goals and terminology.
3. Normative requirements and explicit assumptions.
4. Detailed specification appropriate to this document type.
5. Workflows, edge cases, failure modes and recovery.
6. Security, privacy, tenancy and authorization implications.
7. Performance, reliability, scalability and observability implications where relevant.
8. Testing strategy and measurable acceptance criteria.
9. Dependencies, risks and unresolved decisions.
10. Related documents and traceability.

Do not mechanically force irrelevant sections; mark them “Not applicable” only with a brief reason. Use tables, examples and Mermaid diagrams where they add precision. All examples must be sanitized and clearly illustrative.

## File path
`docs/10-modules/INCIDENT_MANAGEMENT.md`

## Completion criteria
The result must be detailed enough that an engineer can implement or review the subject without guessing at core behavior. It must be internally consistent with OmniOPS's global contract, explicitly label proposals and unresolved decisions, avoid unsupported claims, and be ready to commit as the exact Markdown file above.

## Final instruction
Follow the Global Production-Grade Documentation Authoring Contract supplied before this file-specific prompt. Output only the complete contents of this one file.

---

## 45. `docs/10-modules/TERRAFORM_MANAGEMENT.md`

# PROMPT — Generate `docs/10-modules/TERRAFORM_MANAGEMENT.md`

## Objective
Specify Terraform visibility and controlled execution.

## File-specific authoring brief
Define workspace/state visibility, plan review, plan artifact handling, policy checks, approval, apply/destroy restrictions, drift detection, provider credentials, remote state access, locking, audit, command execution isolation, API/UI/CLI, logs, timeouts, cancellation and tests. Default to plan/read-only workflows; apply/destroy must require strict authorization and approval. Never expose arbitrary shell execution.

## Mandatory sections and quality bar
1. Document control: status (`Draft` until reviewed), owner placeholder, version, last-updated placeholder.
2. Purpose, audience, scope, non-goals and terminology.
3. Normative requirements and explicit assumptions.
4. Detailed specification appropriate to this document type.
5. Workflows, edge cases, failure modes and recovery.
6. Security, privacy, tenancy and authorization implications.
7. Performance, reliability, scalability and observability implications where relevant.
8. Testing strategy and measurable acceptance criteria.
9. Dependencies, risks and unresolved decisions.
10. Related documents and traceability.

Do not mechanically force irrelevant sections; mark them “Not applicable” only with a brief reason. Use tables, examples and Mermaid diagrams where they add precision. All examples must be sanitized and clearly illustrative.

## File path
`docs/10-modules/TERRAFORM_MANAGEMENT.md`

## Completion criteria
The result must be detailed enough that an engineer can implement or review the subject without guessing at core behavior. It must be internally consistent with OmniOPS's global contract, explicitly label proposals and unresolved decisions, avoid unsupported claims, and be ready to commit as the exact Markdown file above.

## Final instruction
Follow the Global Production-Grade Documentation Authoring Contract supplied before this file-specific prompt. Output only the complete contents of this one file.

---

## 46. `docs/10-modules/TEAM_AND_ACCESS_MANAGEMENT.md`

# PROMPT — Generate `docs/10-modules/TEAM_AND_ACCESS_MANAGEMENT.md`

## Objective
Specify organizations, teams, roles, and access governance.

## File-specific authoring brief
Define organization/workspace lifecycle, invitations, membership, teams, role templates, permission matrix, resource scopes, ownership, service accounts, CLI identities, session management, access reviews, offboarding, audit and tenant isolation. Include UI/API/CLI flows, edge cases, invitation expiry, duplicate membership, role changes and acceptance tests.

## Mandatory sections and quality bar
1. Document control: status (`Draft` until reviewed), owner placeholder, version, last-updated placeholder.
2. Purpose, audience, scope, non-goals and terminology.
3. Normative requirements and explicit assumptions.
4. Detailed specification appropriate to this document type.
5. Workflows, edge cases, failure modes and recovery.
6. Security, privacy, tenancy and authorization implications.
7. Performance, reliability, scalability and observability implications where relevant.
8. Testing strategy and measurable acceptance criteria.
9. Dependencies, risks and unresolved decisions.
10. Related documents and traceability.

Do not mechanically force irrelevant sections; mark them “Not applicable” only with a brief reason. Use tables, examples and Mermaid diagrams where they add precision. All examples must be sanitized and clearly illustrative.

## File path
`docs/10-modules/TEAM_AND_ACCESS_MANAGEMENT.md`

## Completion criteria
The result must be detailed enough that an engineer can implement or review the subject without guessing at core behavior. It must be internally consistent with OmniOPS's global contract, explicitly label proposals and unresolved decisions, avoid unsupported claims, and be ready to commit as the exact Markdown file above.

## Final instruction
Follow the Global Production-Grade Documentation Authoring Contract supplied before this file-specific prompt. Output only the complete contents of this one file.

---

## 47. `docs/10-modules/AI_DEVOPS_ASSISTANT.md`

# PROMPT — Generate `docs/10-modules/AI_DEVOPS_ASSISTANT.md`

## Objective
Specify a safe AI-assisted DevOps capability.

## File-specific authoring brief
Define supported user problems, input sources, retrieval/context boundaries, model-provider abstraction as an ADR, prompt/version management, privacy, data retention, tenant isolation, cost/latency limits, evaluation, hallucination handling, citations/evidence, prompt injection defense, tool permissions, human approval and audit. Start with explain/summarize/recommend; never autonomously execute infrastructure changes. Treat logs, issue text and repository content as untrusted input.

## Mandatory sections and quality bar
1. Document control: status (`Draft` until reviewed), owner placeholder, version, last-updated placeholder.
2. Purpose, audience, scope, non-goals and terminology.
3. Normative requirements and explicit assumptions.
4. Detailed specification appropriate to this document type.
5. Workflows, edge cases, failure modes and recovery.
6. Security, privacy, tenancy and authorization implications.
7. Performance, reliability, scalability and observability implications where relevant.
8. Testing strategy and measurable acceptance criteria.
9. Dependencies, risks and unresolved decisions.
10. Related documents and traceability.

Do not mechanically force irrelevant sections; mark them “Not applicable” only with a brief reason. Use tables, examples and Mermaid diagrams where they add precision. All examples must be sanitized and clearly illustrative.

## File path
`docs/10-modules/AI_DEVOPS_ASSISTANT.md`

## Completion criteria
The result must be detailed enough that an engineer can implement or review the subject without guessing at core behavior. It must be internally consistent with OmniOPS's global contract, explicitly label proposals and unresolved decisions, avoid unsupported claims, and be ready to commit as the exact Markdown file above.

## Final instruction
Follow the Global Production-Grade Documentation Authoring Contract supplied before this file-specific prompt. Output only the complete contents of this one file.

---

## 48. `docs/02-frontend/PUBLIC_WEBSITE_SPECIFICATION.md`

# PROMPT — Generate `docs/02-frontend/PUBLIC_WEBSITE_SPECIFICATION.md`

## Objective
Specify the public marketing and developer website.

## File-specific authoring brief
Define audience, information architecture, page inventory, navigation, responsive layouts, content hierarchy, CTA strategy, SEO, analytics/privacy, accessibility, performance budgets as proposed targets, legal pages and conversion flows. Distinguish public marketing routes from authenticated app routes. Include navbar, product/platform, integrations, CLI, docs, pricing, contact, status, login and signup entry points.

## Mandatory sections and quality bar
1. Document control: status (`Draft` until reviewed), owner placeholder, version, last-updated placeholder.
2. Purpose, audience, scope, non-goals and terminology.
3. Normative requirements and explicit assumptions.
4. Detailed specification appropriate to this document type.
5. Workflows, edge cases, failure modes and recovery.
6. Security, privacy, tenancy and authorization implications.
7. Performance, reliability, scalability and observability implications where relevant.
8. Testing strategy and measurable acceptance criteria.
9. Dependencies, risks and unresolved decisions.
10. Related documents and traceability.

Do not mechanically force irrelevant sections; mark them “Not applicable” only with a brief reason. Use tables, examples and Mermaid diagrams where they add precision. All examples must be sanitized and clearly illustrative.

## File path
`docs/02-frontend/PUBLIC_WEBSITE_SPECIFICATION.md`

## Completion criteria
The result must be detailed enough that an engineer can implement or review the subject without guessing at core behavior. It must be internally consistent with OmniOPS's global contract, explicitly label proposals and unresolved decisions, avoid unsupported claims, and be ready to commit as the exact Markdown file above.

## Final instruction
Follow the Global Production-Grade Documentation Authoring Contract supplied before this file-specific prompt. Output only the complete contents of this one file.

---

## 49. `docs/02-frontend/HOMEPAGE_SPECIFICATION.md`

# PROMPT — Generate `docs/02-frontend/HOMEPAGE_SPECIFICATION.md`

## Objective
Specify every homepage section and interaction.

## File-specific authoring brief
Define logo/navigation, hero, value proposition, primary/secondary CTAs, npm install snippet, product overview, 12 module highlights, integration logos, web-vs-CLI positioning, terminal preview, workflow/how-it-works, security trust section, documentation links, FAQ, final CTA and footer. For each section specify purpose, content requirements, components, interactions, responsive behavior, accessibility, analytics events and acceptance criteria. Avoid fabricated customer logos, testimonials, metrics, pricing or security certifications.

## Mandatory sections and quality bar
1. Document control: status (`Draft` until reviewed), owner placeholder, version, last-updated placeholder.
2. Purpose, audience, scope, non-goals and terminology.
3. Normative requirements and explicit assumptions.
4. Detailed specification appropriate to this document type.
5. Workflows, edge cases, failure modes and recovery.
6. Security, privacy, tenancy and authorization implications.
7. Performance, reliability, scalability and observability implications where relevant.
8. Testing strategy and measurable acceptance criteria.
9. Dependencies, risks and unresolved decisions.
10. Related documents and traceability.

Do not mechanically force irrelevant sections; mark them “Not applicable” only with a brief reason. Use tables, examples and Mermaid diagrams where they add precision. All examples must be sanitized and clearly illustrative.

## File path
`docs/02-frontend/HOMEPAGE_SPECIFICATION.md`

## Completion criteria
The result must be detailed enough that an engineer can implement or review the subject without guessing at core behavior. It must be internally consistent with OmniOPS's global contract, explicitly label proposals and unresolved decisions, avoid unsupported claims, and be ready to commit as the exact Markdown file above.

## Final instruction
Follow the Global Production-Grade Documentation Authoring Contract supplied before this file-specific prompt. Output only the complete contents of this one file.

---

## 50. `docs/02-frontend/AUTHENTICATION_PAGES_SPECIFICATION.md`

# PROMPT — Generate `docs/02-frontend/AUTHENTICATION_PAGES_SPECIFICATION.md`

## Objective
Specify login, signup, verification and recovery screens.

## File-specific authoring brief
Cover login, signup, email verification, forgot/reset password, OAuth callback, session expiry, MFA only if selected, error/loading/success states, field validation, password policy, abuse protection, accessibility, responsive layout, privacy notices, backend contracts, redirects and onboarding. Define organization/workspace creation and first integration onboarding as flows. Never expose whether an email exists where that enables account enumeration.

## Mandatory sections and quality bar
1. Document control: status (`Draft` until reviewed), owner placeholder, version, last-updated placeholder.
2. Purpose, audience, scope, non-goals and terminology.
3. Normative requirements and explicit assumptions.
4. Detailed specification appropriate to this document type.
5. Workflows, edge cases, failure modes and recovery.
6. Security, privacy, tenancy and authorization implications.
7. Performance, reliability, scalability and observability implications where relevant.
8. Testing strategy and measurable acceptance criteria.
9. Dependencies, risks and unresolved decisions.
10. Related documents and traceability.

Do not mechanically force irrelevant sections; mark them “Not applicable” only with a brief reason. Use tables, examples and Mermaid diagrams where they add precision. All examples must be sanitized and clearly illustrative.

## File path
`docs/02-frontend/AUTHENTICATION_PAGES_SPECIFICATION.md`

## Completion criteria
The result must be detailed enough that an engineer can implement or review the subject without guessing at core behavior. It must be internally consistent with OmniOPS's global contract, explicitly label proposals and unresolved decisions, avoid unsupported claims, and be ready to commit as the exact Markdown file above.

## Final instruction
Follow the Global Production-Grade Documentation Authoring Contract supplied before this file-specific prompt. Output only the complete contents of this one file.

---

## 51. `docs/02-frontend/DOCUMENTATION_PORTAL_SPECIFICATION.md`

# PROMPT — Generate `docs/02-frontend/DOCUMENTATION_PORTAL_SPECIFICATION.md`

## Objective
Specify the public documentation portal UX and information architecture.

## File-specific authoring brief
Define docs landing page, navigation tree, search, version selector if needed, breadcrumbs, previous/next, code blocks/copy, tabs, callouts, API reference integration, CLI command pages, guides, tutorials, troubleshooting, feedback, accessibility, responsive behavior and SEO. Define content frontmatter/metadata, URL conventions, broken-link checks, versioning and contribution workflow.

## Mandatory sections and quality bar
1. Document control: status (`Draft` until reviewed), owner placeholder, version, last-updated placeholder.
2. Purpose, audience, scope, non-goals and terminology.
3. Normative requirements and explicit assumptions.
4. Detailed specification appropriate to this document type.
5. Workflows, edge cases, failure modes and recovery.
6. Security, privacy, tenancy and authorization implications.
7. Performance, reliability, scalability and observability implications where relevant.
8. Testing strategy and measurable acceptance criteria.
9. Dependencies, risks and unresolved decisions.
10. Related documents and traceability.

Do not mechanically force irrelevant sections; mark them “Not applicable” only with a brief reason. Use tables, examples and Mermaid diagrams where they add precision. All examples must be sanitized and clearly illustrative.

## File path
`docs/02-frontend/DOCUMENTATION_PORTAL_SPECIFICATION.md`

## Completion criteria
The result must be detailed enough that an engineer can implement or review the subject without guessing at core behavior. It must be internally consistent with OmniOPS's global contract, explicitly label proposals and unresolved decisions, avoid unsupported claims, and be ready to commit as the exact Markdown file above.

## Final instruction
Follow the Global Production-Grade Documentation Authoring Contract supplied before this file-specific prompt. Output only the complete contents of this one file.

---

## 52. `docs/02-frontend/CLI_LANDING_PAGE_SPECIFICATION.md`

# PROMPT — Generate `docs/02-frontend/CLI_LANDING_PAGE_SPECIFICATION.md`

## Objective
Specify the CLI product landing page.

## File-specific authoring brief
Define positioning, supported platform list, installation instructions, package naming caveat, prerequisites, quickstart, command examples, terminal screenshots/demos, security/auth explanation, docs links, version information, release notes and CTA. Distinguish illustrative commands from shipped commands. Include copy-to-clipboard behavior, mobile layout, accessibility, SEO and acceptance criteria.

## Mandatory sections and quality bar
1. Document control: status (`Draft` until reviewed), owner placeholder, version, last-updated placeholder.
2. Purpose, audience, scope, non-goals and terminology.
3. Normative requirements and explicit assumptions.
4. Detailed specification appropriate to this document type.
5. Workflows, edge cases, failure modes and recovery.
6. Security, privacy, tenancy and authorization implications.
7. Performance, reliability, scalability and observability implications where relevant.
8. Testing strategy and measurable acceptance criteria.
9. Dependencies, risks and unresolved decisions.
10. Related documents and traceability.

Do not mechanically force irrelevant sections; mark them “Not applicable” only with a brief reason. Use tables, examples and Mermaid diagrams where they add precision. All examples must be sanitized and clearly illustrative.

## File path
`docs/02-frontend/CLI_LANDING_PAGE_SPECIFICATION.md`

## Completion criteria
The result must be detailed enough that an engineer can implement or review the subject without guessing at core behavior. It must be internally consistent with OmniOPS's global contract, explicitly label proposals and unresolved decisions, avoid unsupported claims, and be ready to commit as the exact Markdown file above.

## Final instruction
Follow the Global Production-Grade Documentation Authoring Contract supplied before this file-specific prompt. Output only the complete contents of this one file.

---

## 53. `docs/02-frontend/PRICING_AND_PLANS_SPECIFICATION.md`

# PROMPT — Generate `docs/02-frontend/PRICING_AND_PLANS_SPECIFICATION.md`

## Objective
Specify pricing page requirements without inventing commercial terms.

## File-specific authoring brief
Define pricing information architecture, plan comparison structure, feature entitlements, usage limits, billing assumptions, trials, FAQs, upgrade/contact CTAs and responsive behavior. If pricing, tiers, quotas or payment provider are undecided, create clearly marked placeholders and decision questions; do not invent prices, guarantees, or billing policies. Include accessibility, analytics/privacy and acceptance criteria.

## Mandatory sections and quality bar
1. Document control: status (`Draft` until reviewed), owner placeholder, version, last-updated placeholder.
2. Purpose, audience, scope, non-goals and terminology.
3. Normative requirements and explicit assumptions.
4. Detailed specification appropriate to this document type.
5. Workflows, edge cases, failure modes and recovery.
6. Security, privacy, tenancy and authorization implications.
7. Performance, reliability, scalability and observability implications where relevant.
8. Testing strategy and measurable acceptance criteria.
9. Dependencies, risks and unresolved decisions.
10. Related documents and traceability.

Do not mechanically force irrelevant sections; mark them “Not applicable” only with a brief reason. Use tables, examples and Mermaid diagrams where they add precision. All examples must be sanitized and clearly illustrative.

## File path
`docs/02-frontend/PRICING_AND_PLANS_SPECIFICATION.md`

## Completion criteria
The result must be detailed enough that an engineer can implement or review the subject without guessing at core behavior. It must be internally consistent with OmniOPS's global contract, explicitly label proposals and unresolved decisions, avoid unsupported claims, and be ready to commit as the exact Markdown file above.

## Final instruction
Follow the Global Production-Grade Documentation Authoring Contract supplied before this file-specific prompt. Output only the complete contents of this one file.

---

## 54. `docs/02-frontend/DASHBOARD_UI_SPECIFICATION.md`

# PROMPT — Generate `docs/02-frontend/DASHBOARD_UI_SPECIFICATION.md`

## Objective
Specify the authenticated OmniOPS application shell and dashboard UX.

## File-specific authoring brief
Define app shell, organization/environment selector, sidebar, topbar, global search, notifications, command palette if approved, breadcrumbs, responsive navigation, module entry points, overview widgets, empty/loading/error states, permission-aware rendering and theme. Include all 12 module destinations and consistent page templates. UI hiding is not authorization; backend permissions remain authoritative.

## Mandatory sections and quality bar
1. Document control: status (`Draft` until reviewed), owner placeholder, version, last-updated placeholder.
2. Purpose, audience, scope, non-goals and terminology.
3. Normative requirements and explicit assumptions.
4. Detailed specification appropriate to this document type.
5. Workflows, edge cases, failure modes and recovery.
6. Security, privacy, tenancy and authorization implications.
7. Performance, reliability, scalability and observability implications where relevant.
8. Testing strategy and measurable acceptance criteria.
9. Dependencies, risks and unresolved decisions.
10. Related documents and traceability.

Do not mechanically force irrelevant sections; mark them “Not applicable” only with a brief reason. Use tables, examples and Mermaid diagrams where they add precision. All examples must be sanitized and clearly illustrative.

## File path
`docs/02-frontend/DASHBOARD_UI_SPECIFICATION.md`

## Completion criteria
The result must be detailed enough that an engineer can implement or review the subject without guessing at core behavior. It must be internally consistent with OmniOPS's global contract, explicitly label proposals and unresolved decisions, avoid unsupported claims, and be ready to commit as the exact Markdown file above.

## Final instruction
Follow the Global Production-Grade Documentation Authoring Contract supplied before this file-specific prompt. Output only the complete contents of this one file.

---

## 55. `README.md`

# PROMPT — Generate `README.md`

## Objective
Create the repository's main entry-point documentation.

## File-specific authoring brief
Write a concise but complete README: OmniOPS overview, status disclaimer (planned/in development unless evidence says otherwise), architecture summary, features, repository layout, prerequisites, setup, environment configuration, local startup, tests, lint, build, CLI development/install from workspace, docs links, contribution/security links, troubleshooting and support. Do not invent working commands; label placeholders and verify commands against repository configuration if available.

## Mandatory sections and quality bar
1. Document control: status (`Draft` until reviewed), owner placeholder, version, last-updated placeholder.
2. Purpose, audience, scope, non-goals and terminology.
3. Normative requirements and explicit assumptions.
4. Detailed specification appropriate to this document type.
5. Workflows, edge cases, failure modes and recovery.
6. Security, privacy, tenancy and authorization implications.
7. Performance, reliability, scalability and observability implications where relevant.
8. Testing strategy and measurable acceptance criteria.
9. Dependencies, risks and unresolved decisions.
10. Related documents and traceability.

Do not mechanically force irrelevant sections; mark them “Not applicable” only with a brief reason. Use tables, examples and Mermaid diagrams where they add precision. All examples must be sanitized and clearly illustrative.

## File path
`README.md`

## Completion criteria
The result must be detailed enough that an engineer can implement or review the subject without guessing at core behavior. It must be internally consistent with OmniOPS's global contract, explicitly label proposals and unresolved decisions, avoid unsupported claims, and be ready to commit as the exact Markdown file above.

## Final instruction
Follow the Global Production-Grade Documentation Authoring Contract supplied before this file-specific prompt. Output only the complete contents of this one file.

---

## 56. `CONTRIBUTING.md`

# PROMPT — Generate `CONTRIBUTING.md`

## Objective
Create contributor workflow and governance documentation.

## File-specific authoring brief
Define code of conduct reference if one exists, issue workflow, branch naming, Conventional Commits, pull request template expectations, review requirements, tests, lint/format, documentation updates, security reporting, release responsibilities and monorepo-specific checks. Do not invent repository URLs or team contacts. Make instructions actionable and consistent with DEVELOPMENT_GUIDELINES.

## Mandatory sections and quality bar
1. Document control: status (`Draft` until reviewed), owner placeholder, version, last-updated placeholder.
2. Purpose, audience, scope, non-goals and terminology.
3. Normative requirements and explicit assumptions.
4. Detailed specification appropriate to this document type.
5. Workflows, edge cases, failure modes and recovery.
6. Security, privacy, tenancy and authorization implications.
7. Performance, reliability, scalability and observability implications where relevant.
8. Testing strategy and measurable acceptance criteria.
9. Dependencies, risks and unresolved decisions.
10. Related documents and traceability.

Do not mechanically force irrelevant sections; mark them “Not applicable” only with a brief reason. Use tables, examples and Mermaid diagrams where they add precision. All examples must be sanitized and clearly illustrative.

## File path
`CONTRIBUTING.md`

## Completion criteria
The result must be detailed enough that an engineer can implement or review the subject without guessing at core behavior. It must be internally consistent with OmniOPS's global contract, explicitly label proposals and unresolved decisions, avoid unsupported claims, and be ready to commit as the exact Markdown file above.

## Final instruction
Follow the Global Production-Grade Documentation Authoring Contract supplied before this file-specific prompt. Output only the complete contents of this one file.

---

## 57. `SECURITY.md`

# PROMPT — Generate `SECURITY.md`

## Objective
Create the root security reporting policy.

## File-specific authoring brief
Define supported versions policy as a proposal if unknown, vulnerability reporting channel placeholder (do not invent email), required report details, response expectations as targets not guarantees, disclosure coordination, safe harbor wording for review, and what not to include in public issues. Align with SECURITY_ARCHITECTURE and SECURITY_AND_COMPLIANCE. Clearly mark owner/contact fields requiring project maintainer input.

## Mandatory sections and quality bar
1. Document control: status (`Draft` until reviewed), owner placeholder, version, last-updated placeholder.
2. Purpose, audience, scope, non-goals and terminology.
3. Normative requirements and explicit assumptions.
4. Detailed specification appropriate to this document type.
5. Workflows, edge cases, failure modes and recovery.
6. Security, privacy, tenancy and authorization implications.
7. Performance, reliability, scalability and observability implications where relevant.
8. Testing strategy and measurable acceptance criteria.
9. Dependencies, risks and unresolved decisions.
10. Related documents and traceability.

Do not mechanically force irrelevant sections; mark them “Not applicable” only with a brief reason. Use tables, examples and Mermaid diagrams where they add precision. All examples must be sanitized and clearly illustrative.

## File path
`SECURITY.md`

## Completion criteria
The result must be detailed enough that an engineer can implement or review the subject without guessing at core behavior. It must be internally consistent with OmniOPS's global contract, explicitly label proposals and unresolved decisions, avoid unsupported claims, and be ready to commit as the exact Markdown file above.

## Final instruction
Follow the Global Production-Grade Documentation Authoring Contract supplied before this file-specific prompt. Output only the complete contents of this one file.

---

## 58. `CHANGELOG.md`

# PROMPT — Generate `CHANGELOG.md`

## Objective
Create a changelog policy and initial structure.

## File-specific authoring brief
Use Keep a Changelog conventions and Semantic Versioning where appropriate. Create an Unreleased section with Added/Changed/Deprecated/Removed/Fixed/Security headings. Do not fabricate historical releases or features. Explain release-note ownership and how CLI and platform version changes are recorded.

## Mandatory sections and quality bar
1. Document control: status (`Draft` until reviewed), owner placeholder, version, last-updated placeholder.
2. Purpose, audience, scope, non-goals and terminology.
3. Normative requirements and explicit assumptions.
4. Detailed specification appropriate to this document type.
5. Workflows, edge cases, failure modes and recovery.
6. Security, privacy, tenancy and authorization implications.
7. Performance, reliability, scalability and observability implications where relevant.
8. Testing strategy and measurable acceptance criteria.
9. Dependencies, risks and unresolved decisions.
10. Related documents and traceability.

Do not mechanically force irrelevant sections; mark them “Not applicable” only with a brief reason. Use tables, examples and Mermaid diagrams where they add precision. All examples must be sanitized and clearly illustrative.

## File path
`CHANGELOG.md`

## Completion criteria
The result must be detailed enough that an engineer can implement or review the subject without guessing at core behavior. It must be internally consistent with OmniOPS's global contract, explicitly label proposals and unresolved decisions, avoid unsupported claims, and be ready to commit as the exact Markdown file above.

## Final instruction
Follow the Global Production-Grade Documentation Authoring Contract supplied before this file-specific prompt. Output only the complete contents of this one file.

---

## 59. `.env.example`

# PROMPT — Generate `.env.example`

## Objective
Generate a safe, documented environment variable template (not a secret store).

## File-specific authoring brief
List only environment variables justified by approved architecture, with safe dummy placeholders or empty values, comments, purpose, required/optional status, format and environment scope. Include server-only and client-exposed variables in separate sections. Never include real credentials, tokens, private keys, production URLs or personal data. Use the selected React build tool's actual public prefix only after it is decided; do not assume VITE_ or NEXT_PUBLIC_ prematurely. Include validation expectations and point to configuration docs.

## Mandatory sections and quality bar
1. Document control: status (`Draft` until reviewed), owner placeholder, version, last-updated placeholder.
2. Purpose, audience, scope, non-goals and terminology.
3. Normative requirements and explicit assumptions.
4. Detailed specification appropriate to this document type.
5. Workflows, edge cases, failure modes and recovery.
6. Security, privacy, tenancy and authorization implications.
7. Performance, reliability, scalability and observability implications where relevant.
8. Testing strategy and measurable acceptance criteria.
9. Dependencies, risks and unresolved decisions.
10. Related documents and traceability.

Do not mechanically force irrelevant sections; mark them “Not applicable” only with a brief reason. Use tables, examples and Mermaid diagrams where they add precision. All examples must be sanitized and clearly illustrative.

## File path
`.env.example`

## Completion criteria
The result must be detailed enough that an engineer can implement or review the subject without guessing at core behavior. It must be internally consistent with OmniOPS's global contract, explicitly label proposals and unresolved decisions, avoid unsupported claims, and be ready to commit as the exact Markdown file above.

## Final instruction
Follow the Global Production-Grade Documentation Authoring Contract supplied before this file-specific prompt. Output only the complete contents of this one file.

---

## Recommended generation order

Generate and approve documents in this order so dependent specifications use stable decisions:

### A. Product foundation
- PROJECT_OVERVIEW.md
- PRODUCT_REQUIREMENTS.md
- SCOPE_AND_FEATURES.md
- PRODUCT_ROADMAP.md

### B. Architecture decisions
- ARCHITECTURAL_DECISIONS.md
- SYSTEM_ARCHITECTURE.md
- MONOREPO_ARCHITECTURE.md
- FOLDER_STRUCTURE.md
- DATA_FLOW.md

### C. Core technical contracts
- DATABASE_DESIGN.md
- DATA_MODELS_AND_SCHEMAS.md
- AUTHENTICATION_AND_AUTHORIZATION.md
- API_STANDARDS.md
- API_ENDPOINTS.md
- BACKEND_SPECIFICATION.md
- BACKGROUND_JOBS_AND_EVENTS.md

### D. Client specifications
- FRONTEND_SPECIFICATION.md
- UI_UX_DESIGN_SYSTEM.md
- ROUTING_AND_NAVIGATION.md
- FRONTEND_STATE_MANAGEMENT.md
- CLI_PRODUCT_SPECIFICATION.md
- CLI_ARCHITECTURE.md
- CLI_CONFIGURATION_AND_AUTH.md
- CLI_COMMAND_REFERENCE.md

### E. Module specifications
- COMMAND_CENTER.md
- GITHUB_INTEGRATION.md
- CICD_MANAGEMENT.md
- DOCKER_MANAGEMENT.md
- KUBERNETES_MANAGEMENT.md
- INFRASTRUCTURE_MONITORING.md
- CENTRALIZED_LOGGING.md
- CLOUD_MANAGEMENT.md
- INCIDENT_MANAGEMENT.md
- TERRAFORM_MANAGEMENT.md
- TEAM_AND_ACCESS_MANAGEMENT.md
- AI_DEVOPS_ASSISTANT.md

### F. Public website
- PUBLIC_WEBSITE_SPECIFICATION.md
- HOMEPAGE_SPECIFICATION.md
- AUTHENTICATION_PAGES_SPECIFICATION.md
- DOCUMENTATION_PORTAL_SPECIFICATION.md
- CLI_LANDING_PAGE_SPECIFICATION.md
- PRICING_AND_PLANS_SPECIFICATION.md
- DASHBOARD_UI_SPECIFICATION.md

### G. Security, quality and operations
- SECURITY_ARCHITECTURE.md
- THREAT_MODEL.md
- SECURITY_AND_COMPLIANCE.md
- TESTING_STRATEGY.md
- QUALITY_STANDARDS.md
- CONTAINERIZATION_AND_LOCAL_DEVELOPMENT.md
- CI_CD_AND_DEPLOYMENT.md
- INFRASTRUCTURE_AS_CODE.md
- DATA_LIFECYCLE_AND_BACKUPS.md

### H. Developer and repository docs
- DEVELOPMENT_GUIDELINES.md
- API_DOCUMENTATION_GUIDELINES.md
- README.md
- CONTRIBUTING.md
- SECURITY.md
- CHANGELOG.md
- .env.example

## Final documentation audit prompt

After all files are generated, give the AI this final instruction:

> Audit the complete OmniOPS documentation repository as a principal architect. Do not rewrite everything immediately. First produce a findings report identifying contradictions, missing requirements, duplicated or conflicting sources of truth, undefined decisions, inconsistent API paths, mismatched data models, inconsistent RBAC permissions, CLI/API drift, security gaps, missing acceptance criteria, broken relative links, unsupported claims, and implementation blockers. Cross-check all documents against the global contract. Classify each finding as Critical/High/Medium/Low, cite exact file and heading, explain impact, and propose the smallest safe correction. Then wait for approval before modifying files. Verify the final file inventory and report which documents are Draft, Approved, or Blocked.

## Important project-specific cautions

- The project stack is React + JavaScript, Tailwind/shadcn/Radix primitives, Node.js/Express, MongoDB and TanStack Query. Do not let generated documentation drift into Next.js, TypeScript, PostgreSQL or a different database without an approved ADR.
- Select the monorepo tool, React build tool, authentication provider, MongoDB data layer, job queue, icon library, cloud hosting and CI platform through explicit ADRs if they are not already decided.
- Keep the backend a modular monolith initially. The web app and CLI are separate clients of the same secured API.
- Start with read-only infrastructure integrations. Add write/destructive operations only with policy enforcement, least privilege, approvals where appropriate and audit trails.
- A documentation file is not proof that the feature is implemented. Keep status labels honest.
