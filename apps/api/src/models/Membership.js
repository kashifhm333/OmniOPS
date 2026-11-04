import mongoose from "mongoose";

const membershipSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true
    },
    organizationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Organization",
      required: true,
      index: true
    },
    role: {
      type: String,
      enum: ["owner", "admin", "member", "viewer"],
      default: "member"
    }
  },
  {
    timestamps: true
  }
);

membershipSchema.index({ userId: 1, organizationId: 1 }, { unique: true });

export const Membership = mongoose.model("Membership", membershipSchema);
