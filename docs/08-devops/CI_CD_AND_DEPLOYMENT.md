# OmniOPS — CI/CD Pipeline & Deployment Strategy

| Attribute | Details |
| :--- | :--- |
| **Document ID** | `DOC-08-OPS-02` |
| **Status** | `Draft` (Pending Review) |
| **Version** | `0.1.0` |
| **Document Owner** | Lead CI/CD Architect / Release Engineer Placeholder |
| **Target Audience** | DevOps Engineers, SREs, Release Managers, Software Engineers |
| **Last Updated** | 2026-11-04 (UTC) |

---

## 1. Document Control & Executive Summary

### 1.1 Executive Summary
This document specifies the Continuous Integration (CI), Continuous Delivery (CD), environment promotion, and release management pipelines for OmniOPS. Implemented using **GitHub Actions**, the pipeline enforces rigorous automated quality gates, secret leak detection, container image vulnerability scanning, and cryptographic artifact provenance before promoting builds across Staging and Production environments.

---

## 2. CI Pipeline Architecture & Quality Gates

Every Pull Request and commit to `main` triggers automated validation:

```mermaid
flowchart TD
    PR["Pull Request Created / Updated"] --> GATE_SECRET["1. Secret Detection (Gitleaks)"]
    GATE_SECRET --> GATE_STATIC["2. Lint & Format (ESLint & Prettier)"]
    GATE_STATIC --> GATE_TEST["3. Automated Tests (Vitest & Supertest)"]
    GATE_TEST --> GATE_BUILD["4. Monorepo Build (Turbo affected scope)"]
    GATE_BUILD --> GATE_IMAGE["5. Docker Build & CVE Scan (Trivy)"]

    GATE_IMAGE --> PR_CHECK{"All Gates Green?"}
    PR_CHECK -->|Yes| MERGE_OK["Permit PR Merge (Requires 1 Human Approval)"]
    PR_CHECK -->|No| BLOCK["Block Merge & Notify Author"]
```

### 2.1 Branch Protection Rules on `main`
- Direct commits or pushes to `main` are strictly blocked.
- Merges require a minimum of 1 approved code review from a designated code owner.
- All status checks (Lint, Unit Tests, Integration Tests, Gitleaks, Trivy) must pass.
- Linear git history is enforced via squash-and-merge.

---

## 3. Cloud Deployment Pipeline & Environment Promotion

```mermaid
sequenceDiagram
    autonumber
    actor Dev as Engineer
    participant GH as GitHub Actions CI/CD
    participant ECR as AWS ECR Container Registry
    participant STG as Staging Environment (ECS/K8s)
    participant PROD as Production Environment (ECS/K8s)
    actor Lead as Release Manager / SRE

    Dev->>GH: Merge PR to main
    GH->>GH: Build Production Docker Images
    GH->>ECR: Push image tagged with Git SHA (sha-a1b2c3d)
    GH->>STG: Deploy sha-a1b2c3d to Staging
    STG->>STG: Run automated Smoke Tests & Health Probes
    Note over STG: Health Probes Pass (HTTP 200)
    GH->>Lead: Request Production Promotion Approval
    Lead->>GH: Authorize Production Release
    GH->>PROD: Rolling Update Deployment (sha-a1b2c3d)
    alt Health Check Fails
        PROD-->>GH: Health Probe Failure (Timeout / 500)
        GH->>PROD: Automated Rollback to Previous Stable Image
        GH-->>Lead: Emit P1 Deployment Alert
    else Health Check Passes
        PROD-->>GH: Deployment Succeeded
    end
```

---

## 4. OIDC Cloud Authentication & Secrets Management

To prevent secret leakage, GitHub Actions **MUST NOT** store long-lived AWS IAM access keys or cloud credentials:
- **OpenID Connect (OIDC)**: GitHub Actions authenticates to AWS using short-lived STS tokens exchanged via OIDC (`aws-actions/configure-aws-credentials`).
- **Least-Privilege Roles**: The CI role is strictly restricted to pushing images to Amazon ECR and triggering ECS task updates.

---

## 5. NPM CLI Release Pipeline (`omniops`)

When a new semantic version tag (`v*.*.*`) is pushed to `main`:
1. Automated CI asserts clean test suite across Linux, macOS, and Windows runners.
2. Generates npm package provenance using GitHub's signed attestation.
3. Publishes package to public npm registry via scoped automated publish token.
4. Generates GitHub Release notes based on Conventional Commit history.

---

## 6. Related Documents & Traceability

- [Containerization & Local Development](CONTAINERIZATION_AND_LOCAL_DEVELOPMENT.md)
- [Infrastructure as Code](INFRASTRUCTURE_AS_CODE.md)
- [Testing Strategy](../07-testing/TESTING_STRATEGY.md)
- [Quality Standards](../07-testing/QUALITY_STANDARDS.md)
