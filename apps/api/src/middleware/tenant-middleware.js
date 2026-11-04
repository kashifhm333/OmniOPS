import { ForbiddenError } from "@omniops/shared";
import { Membership } from "../models/Membership.js";

export async function tenantMiddleware(req, res, next) {
  try {
    const requestedOrgId = req.headers["x-organization-id"];

    if (requestedOrgId && req.user) {
      const membership = await Membership.findOne({
        userId: req.user._id,
        organizationId: requestedOrgId
      });

      if (!membership) {
        throw new ForbiddenError("You are not a member of the requested organization");
      }

      req.organizationId = requestedOrgId;
      req.userRole = membership.role;
    }

    if (!req.organizationId) {
      throw new ForbiddenError("No tenant context could be resolved for this request");
    }

    next();
  } catch (error) {
    next(error);
  }
}
