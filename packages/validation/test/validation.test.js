import { describe, it, expect } from "vitest";
import { registerSchema, loginSchema, createIncidentSchema } from "../src/index.js";

describe("@omniops/validation Unit Tests", () => {
  it("registerSchema validates correct payload", () => {
    const valid = {
      email: "alex@acme.com",
      password: "Password123!",
      fullName: "Alex Kumar",
      organizationName: "Acme Corp"
    };

    const parsed = registerSchema.parse(valid);
    expect(parsed.email).toBe("alex@acme.com");
  });

  it("registerSchema rejects weak passwords", () => {
    const invalid = {
      email: "alex@acme.com",
      password: "weak",
      fullName: "Alex Kumar"
    };

    expect(() => registerSchema.parse(invalid)).toThrow();
  });

  it("loginSchema parses valid credentials", () => {
    const valid = {
      email: "alex@acme.com",
      password: "Password123!"
    };

    const parsed = loginSchema.parse(valid);
    expect(parsed.email).toBe("alex@acme.com");
  });

  it("createIncidentSchema requires service and title", () => {
    const valid = {
      title: "Elevated Ingress 502 Rate",
      severity: "SEV-2",
      service: "api-gateway"
    };

    const parsed = createIncidentSchema.parse(valid);
    expect(parsed.title).toBe("Elevated Ingress 502 Rate");
    expect(parsed.severity).toBe("SEV-2");
  });
});

