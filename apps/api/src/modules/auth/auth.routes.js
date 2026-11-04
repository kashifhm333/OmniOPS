import express from "express";
import crypto from "crypto";
import bcrypt from "bcryptjs";
import { registerSchema, loginSchema } from "@omniops/validation";
import { 
  BadRequestError, UnauthorizedError, NotFoundError, 
  ConflictError, SESSION_COOKIE_NAME, AUTH_SCOPES 
} from "@omniops/shared";
import { User } from "../../models/User.js";
import { Organization } from "../../models/Organization.js";
import { Membership } from "../../models/Membership.js";
import { Session } from "../../models/Session.js";
import { ApiKey } from "../../models/ApiKey.js";
import { DeviceGrant } from "../../models/DeviceGrant.js";
import { authMiddleware } from "../../middleware/auth-middleware.js";
import { logAuditMutation } from "../../middleware/audit-middleware.js";

const router = express.Router();

// Helper to create session and cookie
async function createSession(res, user, organizationId, req) {
  const rawSessionToken = crypto.randomBytes(32).toString("hex");
  const sessionTokenHash = crypto.createHash("sha256").update(rawSessionToken).digest("hex");
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days

  await Session.create({
    sessionTokenHash,
    userId: user._id,
    organizationId,
    expiresAt,
    ipAddress: req.ip || "127.0.0.1",
    userAgent: req.headers["user-agent"] || ""
  });

  res.cookie(SESSION_COOKIE_NAME, rawSessionToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    expires: expiresAt
  });

  return rawSessionToken;
}

// ---------------------------------------------------------------------------
// POST /register
// ---------------------------------------------------------------------------
router.post("/register", async (req, res, next) => {
  try {
    const data = registerSchema.parse(req.body);

    const existingUser = await User.findOne({ email: data.email });
    if (existingUser) {
      throw new ConflictError("An account with this email address already exists");
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(data.password, salt);

    const user = await User.create({
      email: data.email,
      fullName: data.fullName,
      passwordHash
    });

    const orgName = data.organizationName || `${data.fullName}'s Team`;
    const slug = orgName.toLowerCase().replace(/[^a-z0-9]/g, "-").slice(0, 32);

    const org = await Organization.create({
      name: orgName,
      slug: `${slug}-${Math.random().toString(36).substring(2, 6)}`
    });

    await Membership.create({
      userId: user._id,
      organizationId: org._id,
      role: "owner"
    });

    await createSession(res, user, org._id, req);

    res.status(201).json({
      user: {
        id: user._id,
        email: user.email,
        fullName: user.fullName,
        role: "owner"
      },
      organization: {
        id: org._id,
        name: org.name,
        slug: org.slug
      }
    });
  } catch (error) {
    next(error);
  }
});

// ---------------------------------------------------------------------------
// POST /login
// ---------------------------------------------------------------------------
router.post("/login", async (req, res, next) => {
  try {
    const data = loginSchema.parse(req.body);

    const user = await User.findOne({ email: data.email });
    if (!user) {
      throw new UnauthorizedError("Invalid email or password");
    }

    const isMatch = await bcrypt.compare(data.password, user.passwordHash);
    if (!isMatch) {
      throw new UnauthorizedError("Invalid email or password");
    }

    const membership = await Membership.findOne({ userId: user._id }).populate("organizationId");
    if (!membership || !membership.organizationId) {
      throw new UnauthorizedError("User is not assigned to any active organization");
    }

    const org = membership.organizationId;
    await createSession(res, user, org._id, req);

    res.json({
      user: {
        id: user._id,
        email: user.email,
        fullName: user.fullName,
        role: membership.role
      },
      organization: {
        id: org._id,
        name: org.name,
        slug: org.slug
      }
    });
  } catch (error) {
    next(error);
  }
});

// ---------------------------------------------------------------------------
// POST /logout
// ---------------------------------------------------------------------------
router.post("/logout", async (req, res, next) => {
  try {
    const rawToken = req.cookies?.[SESSION_COOKIE_NAME];
    if (rawToken) {
      const sessionTokenHash = crypto.createHash("sha256").update(rawToken).digest("hex");
      await Session.deleteOne({ sessionTokenHash });
    }

    res.clearCookie(SESSION_COOKIE_NAME, {
      path: "/",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax"
    });

    res.json({ message: "Successfully signed out" });
  } catch (error) {
    next(error);
  }
});

// ---------------------------------------------------------------------------
// GET /me
// ---------------------------------------------------------------------------
router.get("/me", authMiddleware, async (req, res, next) => {
  try {
    const org = await Organization.findById(req.organizationId);

    res.json({
      user: {
        id: req.user._id,
        email: req.user.email,
        fullName: req.user.fullName,
        role: req.userRole
      },
      organization: org ? {
        id: org._id,
        name: org.name,
        slug: org.slug
      } : null
    });
  } catch (error) {
    next(error);
  }
});

// ---------------------------------------------------------------------------
// RFC 8628 Device Authorization Flow (for CLI)
// ---------------------------------------------------------------------------

// 1. CLI requests user code & device code
router.post("/device/code", async (req, res, next) => {
  try {
    const deviceCode = crypto.randomBytes(24).toString("hex");
    // Generate 8-character human-readable code: e.g. "ABCD-1234"
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let userCode = "";
    for (let i = 0; i < 8; i++) {
      if (i === 4) userCode += "-";
      userCode += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 mins

    await DeviceGrant.create({
      deviceCode,
      userCode,
      status: "pending",
      expiresAt
    });

    res.json({
      device_code: deviceCode,
      user_code: userCode,
      verification_uri: "http://localhost:3000/device",
      expires_in: 900,
      interval: 3
    });
  } catch (error) {
    next(error);
  }
});

// 2. Web browser authorizes the user_code
router.post("/device/verify", authMiddleware, async (req, res, next) => {
  try {
    const { user_code } = req.body;
    if (!user_code) {
      throw new BadRequestError("User code is required");
    }

    const grant = await DeviceGrant.findOne({ 
      userCode: user_code.trim().toUpperCase(),
      status: "pending"
    });

    if (!grant || grant.expiresAt < new Date()) {
      throw new BadRequestError("Invalid or expired device code");
    }

    // Generate a fresh Personal Access Token for the paired CLI
    const rawToken = `oop_live_${crypto.randomBytes(24).toString("hex")}`;
    const prefix = rawToken.substring(0, 12);
    const keyHash = crypto.createHash("sha256").update(rawToken).digest("hex");

    await ApiKey.create({
      name: `CLI Session (${new Date().toLocaleDateString()})`,
      prefix,
      keyHash,
      userId: req.user._id,
      organizationId: req.organizationId,
      scopes: ["*"]
    });

    grant.status = "authorized";
    grant.userId = req.user._id;
    grant.organizationId = req.organizationId;
    grant.token = rawToken;
    await grant.save();

    res.json({ message: "Device successfully authorized! You can return to your terminal." });
  } catch (error) {
    next(error);
  }
});

// 3. CLI polls for completion
router.post("/device/token", async (req, res, next) => {
  try {
    const { device_code } = req.body;
    if (!device_code) {
      throw new BadRequestError("Device code is required");
    }

    const grant = await DeviceGrant.findOne({ deviceCode: device_code });
    if (!grant) {
      throw new BadRequestError("Invalid device code");
    }

    if (grant.expiresAt < new Date()) {
      throw new BadRequestError("Device code has expired");
    }

    if (grant.status === "pending") {
      return res.status(400).json({ error: "authorization_pending" });
    }

    if (grant.status === "authorized") {
      const token = grant.token;
      grant.status = "consumed";
      await grant.save();

      return res.json({
        access_token: token,
        token_type: "Bearer"
      });
    }

    throw new BadRequestError("Device grant already consumed");
  } catch (error) {
    next(error);
  }
});

// ---------------------------------------------------------------------------
// Personal Access Tokens (PATs) Management
// ---------------------------------------------------------------------------

// List tokens
router.get("/tokens", authMiddleware, async (req, res, next) => {
  try {
    const tokens = await ApiKey.find({
      organizationId: req.organizationId,
      userId: req.user._id
    }).sort({ createdAt: -1 });

    res.json(
      tokens.map(t => ({
        id: t._id,
        name: t.name,
        prefix: t.prefix,
        scopes: t.scopes,
        createdAt: t.createdAt,
        lastUsedAt: t.lastUsedAt ? `${Math.floor((Date.now() - new Date(t.lastUsedAt)) / 60000)}m ago` : "Never"
      }))
    );
  } catch (error) {
    next(error);
  }
});

// Create token
router.post(
  "/tokens", 
  authMiddleware, 
  logAuditMutation("TOKEN_CREATE", (req) => `pat/${req.body.name || "new-token"}`),
  async (req, res, next) => {
    try {
      const { name, scopes } = req.body;
      if (!name) {
        throw new BadRequestError("Token name is required");
      }

      const rawToken = `oop_live_${crypto.randomBytes(24).toString("hex")}`;
      const prefix = rawToken.substring(0, 12);
      const keyHash = crypto.createHash("sha256").update(rawToken).digest("hex");

      const apiKey = await ApiKey.create({
        name,
        prefix,
        keyHash,
        userId: req.user._id,
        organizationId: req.organizationId,
        scopes: Array.isArray(scopes) && scopes.length > 0 ? scopes : ["read:k8s", "read:logs"]
      });

      res.status(201).json({
        id: apiKey._id,
        name: apiKey.name,
        prefix: apiKey.prefix,
        token: rawToken, // Returned strictly once!
        scopes: apiKey.scopes
      });
    } catch (error) {
      next(error);
    }
  }
);

// Revoke token
router.delete(
  "/tokens/:id", 
  authMiddleware, 
  logAuditMutation("TOKEN_REVOKE", (req) => `pat/${req.params.id}`),
  async (req, res, next) => {
    try {
      const apiKey = await ApiKey.findOneAndDelete({
        _id: req.params.id,
        organizationId: req.organizationId
      });

      if (!apiKey) {
        throw new NotFoundError("Personal Access Token not found");
      }

      res.json({ message: "Token successfully revoked" });
    } catch (error) {
      next(error);
    }
  }
);

export default router;

