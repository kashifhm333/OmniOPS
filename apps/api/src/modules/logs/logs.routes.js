import express from "express";
import { authMiddleware } from "../../middleware/auth-middleware.js";
import { requireScope } from "../../middleware/rbac-middleware.js";
import { maskSecrets } from "@omniops/shared";

const router = express.Router();

router.get("/query", authMiddleware, requireScope("read:logs"), async (req, res, next) => {
  try {
    const { q = "", level = "ALL", service } = req.query;

    const baseEvents = [
      { id: "log-1", ts: new Date(Date.now() - 1000 * 60 * 10).toISOString(), level: "INFO", service: "api-gateway", msg: "HTTP 200 GET /api/v1/healthz duration=1.2ms" },
      { id: "log-2", ts: new Date(Date.now() - 1000 * 60 * 8).toISOString(), level: "INFO", service: "auth-service", msg: "User login succeeded for user=alex@acme.com" },
      { id: "log-3", ts: new Date(Date.now() - 1000 * 60 * 5).toISOString(), level: "WARN", service: "billing-worker", msg: "Database query time exceeded 250ms threshold: query=SELECT * FROM transactions" },
      { id: "log-4", ts: new Date(Date.now() - 1000 * 60 * 2).toISOString(), level: "ERROR", service: "gateway-proxy", msg: "Connection refused to upstream pod billing-worker-67df8:8080" },
      { id: "log-5", ts: new Date(Date.now() - 1000 * 30).toISOString(), level: "INFO", service: "k8s-operator", msg: "Cluster state synchronized. Total 142 workloads monitored." }
    ];

    const filtered = baseEvents.filter(ev => {
      const matchLevel = level === "ALL" || ev.level === level;
      const matchService = !service || ev.service === service;
      const matchQuery = !q || ev.msg.toLowerCase().includes(q.toLowerCase());
      return matchLevel && matchService && matchQuery;
    });

    const sanitized = filtered.map(ev => ({
      ...ev,
      msg: maskSecrets(ev.msg)
    }));

    res.json(sanitized);
  } catch (error) {
    next(error);
  }
});

export default router;
