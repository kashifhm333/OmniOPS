import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema(
  {
    sessionTokenHash: {
      type: String,
      required: true,
      unique: true,
      index: true
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true
    },
    organizationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Organization",
      required: true
    },
    expiresAt: {
      type: Date,
      required: true,
      index: { expires: 0 } // MongoDB TTL index for automatic expiration
    },
    ipAddress: String,
    userAgent: String
  },
  {
    timestamps: true
  }
);

export const Session = mongoose.model("Session", sessionSchema);

