import crypto from "crypto";
import bcrypt from "bcryptjs";
import { connectDatabase, disconnectDatabase } from "../config/database.js";
import { User } from "../models/User.js";
import { Organization } from "../models/Organization.js";
import { Membership } from "../models/Membership.js";
import { Cluster } from "../models/Cluster.js";
import { Incident } from "../models/Incident.js";
import { ApiKey } from "../models/ApiKey.js";
import { AuditEvent } from "../models/AuditEvent.js";

async function seed() {
  console.log("🌱 Starting OmniOPS Database Seeding...");
  await connectDatabase();

  // Clear existing collections for a clean idempotent start
  await Promise.all([
    User.deleteMany({}),
    Organization.deleteMany({}),
    Membership.deleteMany({}),
    Cluster.deleteMany({}),
    Incident.deleteMany({}),
    ApiKey.deleteMany({}),
    AuditEvent.deleteMany({})
  ]);

  // 1. Create Default Admin User
  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash("Password123!", salt);

  const user = await User.create({
    email: "alex@acme.com",
    fullName: "Alex Kumar",
    passwordHash,
    status: "active"
  });

  // 2. Create Default Organization
  const org = await Organization.create({
    name: "Acme Cloud Corp",
    slug: "acme-corp",
    plan: "enterprise",
    settings: {
      allowedDomains: ["acme.com"],
      requireMfa: false
    }
  });

  // 3. Create Owner Membership
  await Membership.create({
    userId: user._id,
    organizationId: org._id,
    role: "owner"
  });

  // 4. Create Kubernetes Clusters
  await Cluster.create([
    {
      organizationId: org._id,
      name: "us-east-prod",
      provider: "EKS",
      version: "v1.29.3",
      health: "healthy",
      nodeCount: 6,
      podCount: 64,
      pods: [
        { name: "gateway-proxy-7f89d-abc1", namespace: "production", ready: "2/2", status: "Running", restarts: 0, age: "4d 12h", node: "ip-10-0-1-12" },
        { name: "auth-service-5899b-xyz2", namespace: "production", ready: "1/1", status: "Running", restarts: 1, age: "12d 3h", node: "ip-10-0-1-14" },
        { name: "billing-worker-67df8-err4", namespace: "production", ready: "0/1", status: "CrashLoopBackOff", restarts: 14, age: "1h 45m", node: "ip-10-0-1-20" },
        { name: "ingress-nginx-controller-abc9", namespace: "ingress-nginx", ready: "1/1", status: "Running", restarts: 0, age: "24d", node: "ip-10-0-1-10" }
      ]
    },
    {
      organizationId: org._id,
      name: "eu-west-core",
      provider: "GKE",
      version: "v1.28.7",
      health: "degraded",
      nodeCount: 4,
      podCount: 49,
      pods: [
        { name: "eu-gateway-89ab-01", namespace: "production", ready: "1/1", status: "Running", restarts: 0, age: "8d", node: "gke-node-1" },
        { name: "eu-cache-redis-0", namespace: "production", ready: "1/1", status: "Running", restarts: 0, age: "19d", node: "gke-node-2" }
      ]
    },
    {
      organizationId: org._id,
      name: "ap-south-edge",
      provider: "K3s",
      version: "v1.29.1",
      health: "healthy",
      nodeCount: 2,
      podCount: 29,
      pods: [
        { name: "edge-router-ap-01", namespace: "edge", ready: "1/1", status: "Running", restarts: 0, age: "15d", node: "k3s-edge-node" }
      ]
    }
  ]);

  // 5. Create Active & Historical Incidents
  await Incident.create([
    {
      organizationId: org._id,
      title: "API Gateway 5xx Latency Spike > 800ms",
      severity: "SEV-2",
      status: "investigating",
      service: "api-gateway",
      description: "Elevated 502/504 responses detected on us-east ingress during peak load.",
      assignee: "Alex Kumar",
      createdAt: new Date(Date.now() - 14 * 60 * 1000),
      timeline: [
        { time: "12:00:00", text: "Prometheus alert triggered: HighLatencyAlert" },
        { time: "12:02:15", text: "PagerDuty on-call paged (Alex Kumar)" }
      ]
    },
    {
      organizationId: org._id,
      title: "Billing Worker OOMKilled repeatedly",
      severity: "SEV-3",
      status: "identified",
      service: "billing-worker",
      description: "Pod memory leak during transaction reconciliation.",
      assignee: "Sarah Chen",
      createdAt: new Date(Date.now() - 120 * 60 * 1000),
      acknowledgedAt: new Date(Date.now() - 110 * 60 * 1000),
      timeline: [
        { time: "10:15:00", text: "Pod billing-worker-67df8 OOMKilled" },
        { time: "10:18:22", text: "Acknowledged by Sarah Chen" }
      ]
    }
  ]);

  // 6. Create Seed Personal Access Token (for CLI test convenience)
  const seedRawToken = "oop_live_seed_dev_pat_token_alex_2026";
  const seedKeyHash = crypto.createHash("sha256").update(seedRawToken).digest("hex");

  await ApiKey.create({
    name: "Alex Dev Laptop",
    prefix: "oop_live_seed",
    keyHash: seedKeyHash,
    userId: user._id,
    organizationId: org._id,
    scopes: ["*"]
  });

  // 7. Seed Initial Cryptographic Audit Log Chain
  const seedHash = crypto.createHash("sha256").update("genesis-block|omniops").digest("hex");
  await AuditEvent.create({
    organizationId: org._id,
    actor: "system",
    action: "SYSTEM_GENESIS",
    resource: "workspace/acme-corp",
    status: "SUCCESS",
    hash: seedHash,
    previousHash: "0000000000000000000000000000000000000000000000000000000000000000",
    details: { message: "OmniOPS production control plane initialized." }
  });

  console.log("✅ Seed completed successfully!");
  console.log("-----------------------------------------------------------------");
  console.log("Demo Credentials:");
  console.log("  Email:    alex@acme.com");
  console.log("  Password: Password123!");
  console.log("  CLI PAT:  oop_live_seed_dev_pat_token_alex_2026");
  console.log("-----------------------------------------------------------------");

  await disconnectDatabase();
}

seed().catch(err => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});

