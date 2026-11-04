import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().trim().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters")
});

export const registerSchema = z.object({
  email: z.string().trim().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  fullName: z.string().trim().min(2, "Full name must be at least 2 characters"),
  organizationName: z.string().trim().min(2, "Organization name must be at least 2 characters")
});

export const createTokenSchema = z.object({
  name: z.string().trim().min(1, "Token name is required").max(60),
  scopes: z.array(z.string()).default(["read:*"]),
  expiresInDays: z.coerce.number().int().positive().default(30)
});

export const deviceCodeVerifySchema = z.object({
  userCode: z.string().trim().regex(/^[A-Z0-9]{4}-[A-Z0-9]{4}$/, "Code format must be ABCD-1234")
});
