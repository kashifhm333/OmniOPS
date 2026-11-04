import { describe, it, expect } from "vitest";
import { 
  maskSecrets, 
  AppError, 
  NotFoundError, 
  UnauthorizedError, 
  ForbiddenError, 
  ConflictError,
  ROLES, 
  INCIDENT_SEVERITY 
} from "../src/index.js";

describe("@omniops/shared Unit Tests", () => {
  it("maskSecrets masks Bearer tokens", () => {
    const raw = "Authorization: Bearer oop_live_abcdef1234567890secret";
    const masked = maskSecrets(raw);
    expect(masked).toBe("Authorization: Bearer [REDACTED]");
  });

  it("maskSecrets masks passwords in connection strings and payloads", () => {
    const rawUri = "mongodb://admin:SuperSecret123@mongo:27017/omniops";
    const maskedUri = maskSecrets(rawUri);
    expect(maskedUri).toBe("mongodb://admin:[REDACTED]@mongo:27017/omniops");

    const rawJson = '{"email":"alex@acme.com","password":"MySecretPassword"}';
    const maskedJson = maskSecrets(rawJson);
    expect(maskedJson).toContain('"password":"[REDACTED]"');
  });

  it("AppError sub-classes contain correct status codes and error codes", () => {
    const notFound = new NotFoundError("Cluster not found");
    expect(notFound.statusCode).toBe(404);
    expect(notFound.code).toBe("NOT_FOUND");

    const unauth = new UnauthorizedError("Session expired");
    expect(unauth.statusCode).toBe(401);
    expect(unauth.code).toBe("UNAUTHORIZED");

    const forbidden = new ForbiddenError("Requires Owner role");
    expect(forbidden.statusCode).toBe(403);
    expect(forbidden.code).toBe("FORBIDDEN");

    const conflict = new ConflictError("Email already in use");
    expect(conflict.statusCode).toBe(409);
    expect(conflict.code).toBe("CONFLICT");
  });

  it("constants provide canonical definitions", () => {
    expect(ROLES.OWNER).toBe("Owner");
    expect(INCIDENT_SEVERITY.SEV1).toBe("SEV-1");
  });
});
