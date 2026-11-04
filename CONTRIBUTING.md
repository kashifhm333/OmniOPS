# Contributing to OmniOPS

| Attribute | Details |
| :--- | :--- |
| **Status** | `Approved / Living Document` |
| **Document Owner** | OmniOPS Open Source Steering Committee Placeholder |
| **Last Updated** | 2026-11-04 (UTC) |

---

## 1. Code of Conduct & Welcome

Thank you for your interest in contributing to **OmniOPS**! We are building an open, secure, and production-grade DevOps command center. All contributors, maintainers, and community members are expected to uphold a respectful, inclusive, and collaborative environment free of harassment.

---

## 2. Issue Tracking & Feature Proposals

Before writing significant code:
1. **Search Existing Issues**: Ensure a similar issue or discussion is not already open.
2. **File an Issue**:
   - **Bug Report**: Provide reproduction steps, expected behavior, terminal output / logs, OS version, and Node.js version.
   - **Feature Request / Proposal**: Detail the problem statement, proposed architectural solution, and reference any relevant [ADRs](docs/01-architecture/ARCHITECTURAL_DECISIONS.md).

---

## 3. Git Workflow & Conventional Commits

### 3.1 Branching Model
OmniOPS uses a trunk-based development flow with protected `main`:
1. Fork and clone the repository.
2. Create a focused branch from the latest `main`:
   - `feat/<short-title>`: New features or UI components.
   - `fix/<issue-id>-<title>`: Bug fixes.
   - `docs/<title>`: Documentation updates.
   - `test/<title>`: Test suite additions.

### 3.2 Commit Standards
All commits **MUST** follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:
```text
feat(k8s): stream live container logs to web terminal
fix(auth): prevent session cookie replay on revoked tokens
docs(api): update OpenAPI 3.1 response schemas for incidents
```

---

## 4. Local Verification & Quality Checklist

Before submitting a Pull Request, verify that all local checks pass:

```bash
# 1. Run static lint checks
npm run lint

# 2. Check code formatting
npm run format

# 3. Execute all unit and integration test suites
npm run test

# 4. Verify monorepo build pipelines
npm run build
```

---

## 5. Pull Request Submission & Review Process

1. **Pull Request Description**:
   - Summarize the motivation, architectural changes, and test evidence.
   - Link related issue(s) using closing keywords (e.g., `Closes #123`).
2. **Automated CI Gates**:
   - Gitleaks secret scanning, ESLint, unit/integration tests, and container builds must all pass.
3. **Review & Approval**:
   - At least one approving review from a Core Maintainer is required.
   - Merges are performed via Squash & Merge to maintain clean linear history.

---

## 6. Security Vulnerability Reporting

Do **NOT** report security vulnerabilities via public GitHub issues. Please review and adhere to the confidential reporting guidelines detailed in [`SECURITY.md`](SECURITY.md).

---

## 7. Related Documents

- [Development Guidelines](docs/09-developer-experience/DEVELOPMENT_GUIDELINES.md)
- [Quality Standards](docs/07-testing/QUALITY_STANDARDS.md)
- [Testing Strategy](docs/07-testing/TESTING_STRATEGY.md)
- [Architecture Decision Records](docs/01-architecture/ARCHITECTURAL_DECISIONS.md)
