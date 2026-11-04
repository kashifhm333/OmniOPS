import express from "express";
import { authMiddleware } from "../../middleware/auth-middleware.js";
import { Cluster } from "../../models/Cluster.js";
import { Incident } from "../../models/Incident.js";
import { AuditEvent } from "../../models/AuditEvent.js";

const router = express.Router();

router.get("/summary", authMiddleware, async (req, res, next) => {
  try {
    const orgId = req.organizationId;

    // Fetch clusters
    const clusters = await Cluster.find({ organizationId: orgId });
    
    let totalPods = 0;
    let healthyPods = 0;
    let failingPods = 0;

    const clusterSummaries = clusters.map(c => {
      let clusterHealthy = 0;
      let clusterFailing = 0;

      c.pods.forEach(p => {
        totalPods++;
        if (p.status === "Running") {
          healthyPods++;
          clusterHealthy++;
        } else {
          failingPods++;
          clusterFailing++;
        }
      });

      return {
        id: c._id,
        name: c.name,
        provider: c.provider,
        version: c.version,
        health: c.health,
        pods: `${clusterHealthy}/${c.pods.length}`
      };
    });

    // Active incidents
    const activeIncidents = await Incident.find({
      organizationId: orgId,
      status: { $ne: "resolved" }
    }).sort({ severity: 1, createdAt: -1 });

    const activeAlerts = activeIncidents.map(inc => ({
      id: inc._id,
      sev: inc.severity,
      title: inc.title,
      service: inc.service,
      duration: `${Math.floor((Date.now() - new Date(inc.createdAt)) / 60000)}m`
    }));

    // Recent audit events for activity feed
    const recentAudits = await AuditEvent.find({ organizationId: orgId })
      .sort({ createdAt: -1 })
      .limit(6);

    const activityFeed = recentAudits.map((a, i) => ({
      id: a._id,
      time: `${Math.max(1, Math.floor((Date.now() - new Date(a.createdAt)) / 60000))}m ago`,
      actor: a.actor,
      action: `${a.action}: ${a.resource}`,
      status: a.status
    }));

    res.json({
      clusterHealth: failingPods > 0 ? "DEGRADED" : "HEALTHY",
      activeClusters: clusters.length,
      totalPods,
      healthyPods,
      failingPods,
      activeIncidents: activeIncidents.length,
      uptime: "99.98%",
      recentDeployments: 14,
      activeAlerts,
      clusters: clusterSummaries,
      activityFeed
    });
  } catch (error) {
    next(error);
  }
});

export default router;
