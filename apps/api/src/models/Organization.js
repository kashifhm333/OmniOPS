import mongoose from "mongoose";

const organizationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true
    },
    plan: {
      type: String,
      enum: ["starter", "pro", "enterprise"],
      default: "pro"
    },
    settings: {
      allowedDomains: [String],
      requireMfa: { type: Boolean, default: false }
    }
  },
  {
    timestamps: true
  }
);

export const Organization = mongoose.model("Organization", organizationSchema);

