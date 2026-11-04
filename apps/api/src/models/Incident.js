import mongoose from "mongoose";

const timelineEntrySchema = new mongoose.Schema(
  {
    time: { type: String, required: true },
    text: { type: String, required: true }
  },
  { _id: false }
);

const incidentSchema = new mongoose.Schema(
  {
    organizationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Organization",
      required: true,
      index: true
    },
    title: {
      type: String,
      required: true,
      trim: true
    },
    severity: {
      type: String,
      enum: ["SEV-1", "SEV-2", "SEV-3", "SEV-4"],
      default: "SEV-2",
      index: true
    },
    status: {
      type: String,
      enum: ["investigating", "identified", "monitoring", "resolved"],
      default: "investigating",
      index: true
    },
    service: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      default: ""
    },
    assignee: {
      type: String,
      default: "Unassigned"
    },
    acknowledgedAt: {
      type: Date,
      default: null
    },
    resolvedAt: {
      type: Date,
      default: null
    },
    timeline: [timelineEntrySchema]
  },
  {
    timestamps: true
  }
);

export const Incident = mongoose.model("Incident", incidentSchema);
