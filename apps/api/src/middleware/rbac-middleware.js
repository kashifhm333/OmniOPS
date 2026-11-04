import { ForbiddenError } from "@omniops/shared";

const ROLE_HIERARCHY = {
  viewer: 1,
  member: 2,
  admin: 3,
  owner: 4
};

export function requireRole(minimumRole) {
  return (req, res, next) => {
    const userRole = req.userRole || "viewer";
    const userLevel = ROLE_HIERARCHY[userRole] || 0;
    const requiredLevel = ROLE_HIERARCHY[minimumRole] || 0;

    if (userLevel < requiredLevel) {
      return next(
        new ForbiddenError(
          `Insufficient permissions. Requires minimum role '${minimumRole}', your role is '${userRole}'`
        )
      );
    }
    next();
  };
}

export function requireScope(requiredScope) {
  return (req, res, next) => {
    if (req.authType === "session") {
      // Interactive browser sessions inherit RBAC role permissions
      return next();
    }

    const scopes = req.scopes || [];
    if (scopes.includes("*") || scopes.includes(requiredScope)) {
      return next();
    }

    return next(
      new ForbiddenError(
        `Personal Access Token missing required scope: '${requiredScope}'`
      )
    );
  };
}

