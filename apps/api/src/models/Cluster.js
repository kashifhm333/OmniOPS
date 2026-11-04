import mongoose from "mongoose";

const podSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    namespace: { type: String, required: true },
    ready: { type: String, default: "1/1" },
    status: { type: String, default: "Running" },
    restarts: { type: Number, default: 0 },
    age: { type: String, default: "1d" },
    node: { type: String, default: "ip-10-0-1-12" }
  },
  { _id: false }
);

const clusterSchema = new mongoose.Schema(
  {
    organizationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Organization",
      required: true,
      index: true
    },
    name: {
      type: String,
      required: true,
      trim: true
    },
    provider: {
      type: String,
      default: "EKS"
    },
    version: {
      type: String,
      default: "v1.29.3"
    },
    health: {
      type: String,
      enum: ["healthy", "degraded", "unreachable"],
      default: "healthy"
    },
    nodeCount: {
      type: Number,
      default: 3
    },
    podCount: {
      type: Number,
      default: 24
    },
    namespaces: {
      type: [String],
      default: ["default", "production", "monitoring", "ingress-nginx", "omniops-system"]
    },
    pods: [podSchema]
  },
  {
    timestamps: true
  }
);

export const Cluster = mongoose.model("Cluster", clusterSchema);

