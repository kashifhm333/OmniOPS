import mongoose from "mongoose";

const auditEventSchema = new mongoose.Schema(
  {
    organizationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Organization",
      required: true,
      index: true
    },
    actor: {
      type: String,
      required: true
    },
    action: {
      type: String,
      required: true,
      index: true
    },
    resource: {
      type: String,
      required: true
    },
    status: {
      type: String,
      enum: ["SUCCESS", "FAILED"],
      default: "SUCCESS"
    },
    hash: {
      type: String,
      required: true
    },
    previousHash: {
      type: String,
      default: "0000000000000000000000000000000000000000000000000000000000000000"
    },
    ipAddress: {
      type: String,
      default: "127.0.0.1"
    },
    userAgent: {
      type: String,
      default: ""
    },
    details: {
      type: mongoose.Schema.Types.Mixed,
      default: {}
    }
  },
  {
    timestamps: true
  }
);

export const AuditEvent = mongoose.model("AuditEvent", auditEventSchema);

