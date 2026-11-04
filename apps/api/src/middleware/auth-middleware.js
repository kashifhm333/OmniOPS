import crypto from "crypto";
import { UnauthorizedError, ForbiddenError } from "@omniops/shared";
import { Session } from "../models/Session.js";
import { ApiKey } from "../models/ApiKey.js";
import { User } from "../models/User.js";
import { Membership } from "../models/Membership.js";

export async function authMiddleware(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    const sessionCookie = req.cookies?.omniops_session;

    let token = null;
    let isBearer = false;

    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.substring(7).trim();
      isBearer = true;
    } else if (sessionCookie) {
      token = sessionCookie;
    }

    if (!token) {
      throw new UnauthorizedError("Authentication required. Please provide a session cookie or Bearer token.");
    }

    // 1. Personal Access Token (PAT) flow
    if (token.startsWith("oop_")) {
      const keyHash = crypto.createHash("sha256").update(token).digest("hex");
      const apiKey = await ApiKey.findOne({ keyHash });

      if (!apiKey) {
        throw new UnauthorizedError("Invalid or revoked Personal Access Token");
      }

      if (apiKey.expiresAt && apiKey.expiresAt < new Date()) {
        throw new UnauthorizedError("Personal Access Token has expired");
      }

      // Update lastUsedAt asynchronously
      ApiKey.updateOne({ _id: apiKey._id }, { lastUsedAt: new Date() }).exec().catch(() => {});

      const user = await User.findById(apiKey.userId);
      if (!user || user.status !== "active") {
        throw new UnauthorizedError("User associated with this token is inactive or deleted");
      }

      const membership = await Membership.findOne({
        userId: user._id,
        organizationId: apiKey.organizationId
      });

      req.user = user;
      req.organizationId = apiKey.organizationId;
      req.userRole = membership ? membership.role : "member";
      req.scopes = apiKey.scopes || [];
      req.authType = "pat";

      return next();
    }

    // 2. Cookie / Session Token flow
    const sessionTokenHash = crypto.createHash("sha256").update(token).digest("hex");
    const session = await Session.findOne({ sessionTokenHash });

    if (!session || session.expiresAt < new Date()) {
      throw new UnauthorizedError("Session has expired or is invalid. Please log in again.");
    }

    const user = await User.findById(session.userId);
    if (!user || user.status !== "active") {
      throw new UnauthorizedError("User session is inactive or deleted");
    }

    const membership = await Membership.findOne({
      userId: user._id,
      organizationId: session.organizationId
    });

    req.user = user;
    req.organizationId = session.organizationId;
    req.userRole = membership ? membership.role : "member";
    req.scopes = ["*"]; // Session users have role-based scopes
    req.authType = "session";

    next();
  } catch (error) {
    next(error);
  }
}
