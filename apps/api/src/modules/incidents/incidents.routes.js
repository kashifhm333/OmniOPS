import express from "express";
import { authMiddleware } from "../../middleware/auth-middleware.js";
import { requireScope } from "../../middleware/rbac-middleware.js";
import { logAuditMutation } from "../../middleware/audit-middleware.js";
import { Incident } from "../../models/Incident.js";
import { createIncidentSchema } from "@omniops/validation";
import { NotFoundError, BadRequestError } from "@omniops/shared";

const router = express.Router();

// GET /incidents
router.get("/", authMiddleware, async (req, res, next) => {
  try {
    const { status } = req.query;
    const filter = { organizationId: req.organizationId };

    if (status === "active") {
      filter.status = { $ne: "resolved" };
    } else if (status === "resolved") {
      filter.status = "resolved";
    }

    const incidents = await Incident.find(filter).sort({ createdAt: -1 });

    res.json(incidents.map(inc => ({
      id: inc._id,
      title: inc.title,
      severity: inc.severity,
      status: inc.status,
      service: inc.service,
      description: inc.description,
      assignee: inc.assignee,
      createdAt: inc.createdAt,
      acknowledgedAt: inc.acknowledgedAt,
      resolvedAt: inc.resolvedAt,
      timeline: inc.timeline
    })));
  } catch (error) {
    next(error);
  }
});

// POST /incidents
router.post(
  "/",
  authMiddleware,
  requireScope("write:incidents"),
  logAuditMutation("INCIDENT_DECLARE", (req) => `incident/${req.body.title || "new"}`),
  async (req, res, next) => {
    try {
      const data = createIncidentSchema.parse(req.body);

      const incident = await Incident.create({
        organizationId: req.organizationId,
        title: data.title,
        severity: data.severity,
        service: data.service || data.serviceName,
        description: data.description || "",
        assignee: req.user.fullName || req.user.email,
        timeline: [
          {
            time: new Date().toLocaleTimeString(),
            text: `Incident declared by ${req.user.fullName || req.user.email}`
          }
        ]
      });

      res.status(201).json(incident);
    } catch (error) {
      next(error);
    }
  }
);

// POST /incidents/:id/ack
router.post(
  "/:id/ack",
  authMiddleware,
  requireScope("write:incidents"),
  logAuditMutation("INCIDENT_ACK", (req) => `incident/${req.params.id}`),
  async (req, res, next) => {
    try {
      const incident = await Incident.findOne({
        _id: req.params.id,
        organizationId: req.organizationId
      });

      if (!incident) {
        throw new NotFoundError("Incident not found");
      }

      incident.acknowledgedAt = new Date();
      incident.status = "identified";
      incident.timeline.push({
        time: new Date().toLocaleTimeString(),
        text: `Acknowledged by ${req.user.fullName || req.user.email}`
      });

      await incident.save();
      res.json(incident);
    } catch (error) {
      next(error);
    }
  }
);

// POST /incidents/:id/resolve
router.post(
  "/:id/resolve",
  authMiddleware,
  requireScope("write:incidents"),
  logAuditMutation("INCIDENT_RESOLVE", (req) => `incident/${req.params.id}`),
  async (req, res, next) => {
    try {
      const incident = await Incident.findOne({
        _id: req.params.id,
        organizationId: req.organizationId
      });

      if (!incident) {
        throw new NotFoundError("Incident not found");
      }

      incident.resolvedAt = new Date();
      incident.status = "resolved";
      incident.timeline.push({
        time: new Date().toLocaleTimeString(),
        text: `Resolved by ${req.user.fullName || req.user.email}`
      });

      await incident.save();
      res.json(incident);
    } catch (error) {
      next(error);
    }
  }
);

export default router;
