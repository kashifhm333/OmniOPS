import crypto from "crypto";
import { AuditEvent } from "../models/AuditEvent.js";

export function logAuditMutation(action, resourceExtractor) {
  return async (req, res, next) => {
    // Only capture on successful completion
    const originalJson = res.json.bind(res);

    res.json = async function (data) {
      try {
        if (req.organizationId && req.user) {
          const resource = typeof resourceExtractor === "function" 
            ? resourceExtractor(req, data) 
            : resourceExtractor;

          // Find the last audit event to compute previousHash
          const lastEvent = await AuditEvent.findOne({ organizationId: req.organizationId })
            .sort({ createdAt: -1 })
            .lean();

          const previousHash = lastEvent ? lastEvent.hash : "0000000000000000000000000000000000000000000000000000000000000000";
          const timestamp = new Date().toISOString();
          const actor = req.user.email || "system";

          const payloadToHash = `${previousHash}|${req.organizationId}|${actor}|${action}|${resource}|${timestamp}`;
          const hash = crypto.createHash("sha256").update(payloadToHash).digest("hex");

          await AuditEvent.create({
            organizationId: req.organizationId,
            actor,
            action,
            resource,
            status: "SUCCESS",
            hash,
            previousHash,
            ipAddress: req.ip || req.headers["x-forwarded-for"] || "127.0.0.1",
            userAgent: req.headers["user-agent"] || "",
            details: {
              body: req.body,
              params: req.params,
              query: req.query
            }
          });
        }
      } catch (err) {
        console.error("[AuditLog] Failed to record mutation audit log:", err.message);
      }
      return originalJson(data);
    };

    next();
  };
}
