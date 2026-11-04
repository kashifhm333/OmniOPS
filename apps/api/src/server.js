import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import { env } from "./config/env.js";
import { connectDatabase, disconnectDatabase } from "./config/database.js";
import { errorHandler } from "./middleware/error-handler.js";

// Domain route modules
import authRoutes from "./modules/auth/auth.routes.js";
import dashboardRoutes from "./modules/dashboard/dashboard.routes.js";
import k8sRoutes from "./modules/k8s/k8s.routes.js";
import incidentsRoutes from "./modules/incidents/incidents.routes.js";
import logsRoutes from "./modules/logs/logs.routes.js";
import auditRoutes from "./modules/audit/audit.routes.js";

const app = express();

// Security & Parsing Middleware
app.use(helmet({
  contentSecurityPolicy: false // Allows API to serve dashboard clients without restrictive CSP conflicts
}));

app.use(cors({
  origin: [env.CORS_ORIGIN, "http://localhost:3000", "http://127.0.0.1:3000"],
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "x-organization-id"]
}));

app.use(cookieParser());
app.use(express.json());

// Healthcheck endpoints
app.get("/healthz", (req, res) => res.status(200).json({ status: "UP", timestamp: new Date() }));
app.get("/api/v1/healthz", (req, res) => res.status(200).json({ status: "UP", service: "omniops-control-plane" }));

// Mount Versioned API Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/dashboard", dashboardRoutes);
app.use("/api/v1/k8s", k8sRoutes);
app.use("/api/v1/incidents", incidentsRoutes);
app.use("/api/v1/logs", logsRoutes);
app.use("/api/v1/audit", auditRoutes);

// 404 handler for unknown API routes
app.use("/api/*", (req, res) => {
  res.status(404).json({
    error: {
      code: "ROUTE_NOT_FOUND",
      message: `Endpoint ${req.method} ${req.baseUrl} does not exist`
    }
  });
});

// Centralized Error Handling Middleware
app.use(errorHandler);

// Server initialization
let server = null;

export async function startServer() {
  await connectDatabase();
  server = app.listen(env.PORT, () => {
    console.log(`🚀 OmniOPS API Control Plane listening on http://localhost:${env.PORT}`);
  });
  return server;
}

// Graceful Shutdown
async function gracefulShutdown(signal) {
  console.log(`\nReceived ${signal}. Shutting down gracefully...`);
  if (server) {
    server.close(async () => {
      console.log("HTTP server closed.");
      await disconnectDatabase();
      console.log("Database disconnected. Exiting process.");
      process.exit(0);
    });
  } else {
    process.exit(0);
  }
}

process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
process.on("SIGINT", () => gracefulShutdown("SIGINT"));

// Automatically start if executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  startServer().catch(err => {
    console.error("Fatal startup error:", err);
    process.exit(1);
  });
}

export default app;

