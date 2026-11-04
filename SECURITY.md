# Security Policy & Vulnerability Disclosure

| Attribute | Details |
| :--- | :--- |
| **Status** | `Approved / Living Document` |
| **Security Contact** | `security@omniops.io` (Placeholder / Monitored Inbox) |
| **Last Updated** | 2026-11-04 (UTC) |

---

## 1. Supported Versions

Security updates and patches are provided for the following release branches:

| Version | Supported | Notes |
| :--- | :--- | :--- |
| `0.1.x` (Main / Active Dev) | :white_check_mark: | Active development branch; critical security patches applied directly. |
| `< 0.1.0` | :x: | Pre-alpha versions; not supported in production. |

---

## 2. Reporting a Vulnerability

The OmniOPS maintainers take platform and infrastructure security seriously. If you discover a security vulnerability, we request that you report it to us **confidentially** rather than disclosing it publicly.

### 2.1 Reporting Channel
- **Email**: Send detailed findings to **`security@omniops.io`**.
- **PGP Encryption**: If sending sensitive proofs-of-concept, please encrypt using the published maintainer PGP public key.
- **Do NOT**: Open public GitHub issues, discussions, or pull requests disclosing unpatched security vulnerabilities.

### 2.2 Information to Include in Your Report
To accelerate validation and remediation, please provide:
1. **Vulnerability Type**: (e.g., SSRF, Cross-Tenant Authorization Bypass, Authentication Replay, Injection).
2. **Affected Component**: (`apps/api`, `apps/web`, `packages/cli`, or specific module).
3. **Reproduction Steps**: Step-by-step instructions or minimal sanitized proof-of-concept script.
4. **Impact Assessment**: What data or infrastructure access could an attacker gain?
5. **Mitigation Proposal**: (Optional) Recommended code or configuration correction.

---

## 3. Vulnerability Response Timeline

Our security team commits to the following response targets:
- **Initial Acknowledgment**: Within **24 hours** of receiving the report.
- **Triage & Severity Assessment**: Within **72 hours**.
- **Remediation & Patch Delivery**: Priority-based resolution (Critical vulnerabilities targeted for patch release within 14 business days).
- **Public Disclosure**: Coordinated public disclosure following a standard **90-day embargo** or after customers have deployed the security update.

---

## 4. Safe Harbor for Security Researchers

OmniOPS considers security research conducted in good faith to be authorized and protected under safe harbor:
- Researchers must avoid accessing, modifying, or destroying customer data.
- Do not execute Denial of Service (DoS/DDoS) attacks against production infrastructure.
- If you encounter customer personal data or credentials, cease testing immediately and notify us.
- We will not pursue legal action against researchers who comply with these guidelines.

---

## 5. Related Documents

- [Security Architecture Specification](docs/06-security/SECURITY_ARCHITECTURE.md)
- [Threat Model Specification](docs/06-security/THREAT_MODEL.md)
- [Security & Compliance Specification](docs/06-security/SECURITY_AND_COMPLIANCE.md)
