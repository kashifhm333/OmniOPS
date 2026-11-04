import express from "express";
import { authMiddleware } from "../../middleware/auth-middleware.js";
import { requireScope } from "../../middleware/rbac-middleware.js";
import { logAuditMutation } from "../../middleware/audit-middleware.js";
import { Cluster } from "../../models/Cluster.js";
import { NotFoundError } from "@omniops/shared";
import { maskSecrets } from "@omniops/shared";

const router = express.Router();

// GET /clusters
router.get("/clusters", authMiddleware, requireScope("read:k8s"), async (req, res, next) => {
  try {
    const clusters = await Cluster.find({ organizationId: req.organizationId });
    res.json(clusters.map(c => ({
      id: c._id,
      name: c.name,
      provider: c.provider,
      version: c.version,
      health: c.health,
      nodeCount: c.nodeCount,
      podCount: c.pods.length
    })));
  } catch (error) {
    next(error);
  }
});

// GET /pods
router.get("/pods", authMiddleware, requireScope("read:k8s"), async (req, res, next) => {
  try {
    const { cluster, namespace } = req.query;

    const clusterFilter = { organizationId: req.organizationId };
    if (cluster) {
      clusterFilter.$or = [{ name: cluster }, { _id: cluster.match(/^[0-9a-fA-F]{24}$/) ? cluster : null }];
    }

    const clusters = await Cluster.find(clusterFilter);
    let allPods = [];

    clusters.forEach(c => {
      c.pods.forEach(p => {
        if (!namespace || namespace === "all" || p.namespace === namespace) {
          allPods.push({
            name: p.name,
            namespace: p.namespace,
            cluster: c.name,
            ready: p.ready,
            status: p.status,
            restarts: p.restarts,
            age: p.age,
            node: p.node
          });
        }
      });
    });

    res.json(allPods);
  } catch (error) {
    next(error);
  }
});

// POST /pods/:name/restart
router.post(
  "/pods/:name/restart",
  authMiddleware,
  requireScope("write:k8s"),
  logAuditMutation("POD_RESTART", (req) => `pod/${req.params.name}`),
  async (req, res, next) => {
    try {
      const { name } = req.params;

      const cluster = await Cluster.findOne({
        organizationId: req.organizationId,
        "pods.name": name
      });

      if (!cluster) {
        throw new NotFoundError(`Pod ${name} not found in any connected cluster`);
      }

      const podIndex = cluster.pods.findIndex(p => p.name === name);
      if (podIndex >= 0) {
        cluster.pods[podIndex].restarts += 1;
        cluster.pods[podIndex].status = "Running";
        await cluster.save();
      }

      res.json({
        message: `Pod ${name} restart triggered successfully`,
        pod: cluster.pods[podIndex]
      });
    } catch (error) {
      next(error);
    }
  }
);

// GET /logs/stream - Server Sent Events (SSE) or chunked stream
router.get("/logs/stream", authMiddleware, requireScope("read:logs"), (req, res) => {
  const { pod = "gateway-proxy" } = req.query;

  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  const initialMessages = [
    `[INFO] [${pod}] Runtime initialized. Connecting to mongodb://admin:REDACTED@mongo:27017/omniops`,
    `[INFO] [${pod}] Established connection pool. Healthcheck probe: 200 OK`,
    `[INFO] [${pod}] Request listener active on :8080`
  ];

  initialMessages.forEach(msg => {
    res.write(`data: ${JSON.stringify({ timestamp: new Date().toISOString(), line: maskSecrets(msg) })}\n\n`);
  });

  const interval = setInterval(() => {
    const rawLine = `[INFO] [${pod}] Request processed: latency=${(Math.random() * 15 + 2).toFixed(1)}ms status=200`;
    res.write(`data: ${JSON.stringify({ timestamp: new Date().toISOString(), line: maskSecrets(rawLine) })}\n\n`);
  }, 3000);

  req.on("close", () => {
    clearInterval(interval);
  });
});

export default router;
