import express from "express";
import { authMiddleware } from "../../middleware/auth-middleware.js";
import { requireRole } from "../../middleware/rbac-middleware.js";
import { AuditEvent } from "../../models/AuditEvent.js";

const router = express.Router();

router.get("/logs", authMiddleware, requireRole("viewer"), async (req, res, next) => {
  try {
    const { limit = 50 } = req.query;

    const events = await AuditEvent.find({ organizationId: req.organizationId })
      .sort({ createdAt: -1 })
      .limit(Number(limit));

    res.json(
      events.map(ev => ({
        id: ev._id,
        ts: ev.createdAt,
        actor: ev.actor,
        action: ev.action,
        resource: ev.resource,
        status: ev.status,
        hash: `${ev.hash.substring(0, 8)}...${ev.hash.substring(ev.hash.length - 4)}`,
        fullHash: ev.hash,
        previousHash: ev.previousHash,
        ipAddress: ev.ipAddress
      }))
    );
  } catch (error) {
    next(error);
  }
});

export default router;
