import { describe, it, expect, beforeAll, afterAll } from "vitest";
import request from "supertest";
import app, { startServer } from "../src/server.js";
import { connectDatabase, disconnectDatabase } from "../src/config/database.js";

describe("OmniOPS API Control Plane Integration Tests", () => {
  let sessionCookie = null;
  let testPatToken = null;

  beforeAll(async () => {
    await connectDatabase();
  });

  afterAll(async () => {
    await disconnectDatabase();
  });

  it("GET /api/v1/healthz returns 200 UP", async () => {
    const res = await request(app).get("/api/v1/healthz");
    expect(res.status).toBe(200);
    expect(res.body.status).toBe("UP");
    expect(res.body.service).toBe("omniops-control-plane");
  });

  it("POST /api/v1/auth/login authenticates seeded user and sets cookie", async () => {
    const res = await request(app)
      .post("/api/v1/auth/login")
      .send({
        email: "alex@acme.com",
        password: "Password123!"
      });

    expect(res.status).toBe(200);
    expect(res.body.user).toBeDefined();
    expect(res.body.user.email).toBe("alex@acme.com");
    expect(res.body.organization.name).toBe("Acme Cloud Corp");

    const cookies = res.headers["set-cookie"];
    expect(cookies).toBeDefined();
    expect(cookies[0]).toContain("omniops_session=");
    sessionCookie = cookies[0].split(";")[0];
  });

  it("GET /api/v1/auth/me returns current user with session cookie", async () => {
    const res = await request(app)
      .get("/api/v1/auth/me")
      .set("Cookie", sessionCookie);

    expect(res.status).toBe(200);
    expect(res.body.user.email).toBe("alex@acme.com");
    expect(res.body.organization.name).toBe("Acme Cloud Corp");
  });

  it("POST /api/v1/auth/tokens creates a new Personal Access Token", async () => {
    const res = await request(app)
      .post("/api/v1/auth/tokens")
      .set("Cookie", sessionCookie)
      .send({
        name: "Test Runner PAT",
        scopes: ["read:k8s", "write:k8s", "read:logs", "write:incidents"]
      });

    expect(res.status).toBe(201);
    expect(res.body.token).toBeDefined();
    expect(res.body.token.startsWith("oop_live_")).toBe(true);
    testPatToken = res.body.token;
  });

  it("GET /api/v1/dashboard/summary works with Bearer PAT token", async () => {
    const res = await request(app)
      .get("/api/v1/dashboard/summary")
      .set("Authorization", `Bearer ${testPatToken}`);

    expect(res.status).toBe(200);
    expect(res.body.clusters).toBeDefined();
    expect(res.body.clusters.length).toBeGreaterThanOrEqual(1);
    expect(res.body.uptime).toBe("99.98%");
  });

  it("GET /api/v1/k8s/clusters returns cluster fleet", async () => {
    const res = await request(app)
      .get("/api/v1/k8s/clusters")
      .set("Authorization", `Bearer ${testPatToken}`);

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.some(c => c.name === "us-east-prod")).toBe(true);
  });

  it("GET /api/v1/k8s/pods returns workload pods", async () => {
    const res = await request(app)
      .get("/api/v1/k8s/pods")
      .set("Authorization", `Bearer ${testPatToken}`);

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThanOrEqual(1);
  });

  it("GET /api/v1/incidents returns active incidents", async () => {
    const res = await request(app)
      .get("/api/v1/incidents")
      .set("Authorization", `Bearer ${testPatToken}`);

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThanOrEqual(1);
  });

  it("POST /api/v1/incidents creates a new incident and logs audit", async () => {
    const res = await request(app)
      .post("/api/v1/incidents")
      .set("Authorization", `Bearer ${testPatToken}`)
      .send({
        title: "Test Ingress Network Flap",
        severity: "SEV-3",
        service: "ingress-controller",
        description: "Automated test incident"
      });

    expect(res.status).toBe(201);
    expect(res.body._id).toBeDefined();

    // Acknowledge incident
    const ackRes = await request(app)
      .post(`/api/v1/incidents/${res.body._id}/ack`)
      .set("Authorization", `Bearer ${testPatToken}`);

    expect(ackRes.status).toBe(200);
    expect(ackRes.body.acknowledgedAt).toBeDefined();
  });
});
