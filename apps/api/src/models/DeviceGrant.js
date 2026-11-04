import mongoose from "mongoose";

const deviceGrantSchema = new mongoose.Schema(
  {
    deviceCode: {
      type: String,
      required: true,
      unique: true,
      index: true
    },
    userCode: {
      type: String,
      required: true,
      unique: true,
      index: true
    },
    status: {
      type: String,
      enum: ["pending", "authorized", "consumed"],
      default: "pending"
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    organizationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Organization"
    },
    token: {
      type: String
    },
    expiresAt: {
      type: Date,
      required: true,
      index: { expires: 0 } // auto-cleanup after expiry
    }
  },
  {
    timestamps: true
  }
);

export const DeviceGrant = mongoose.model("DeviceGrant", deviceGrantSchema);

