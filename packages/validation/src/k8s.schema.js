import { z } from "zod";

export const k8sPodQuerySchema = z.object({
  namespace: z.string().trim().default("default"),
  status: z.enum(["Running", "CrashLoopBackOff", "Pending", "Failed"]).optional(),
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(20)
});

export const k8sPodLogsQuerySchema = z.object({
  container: z.string().trim().optional(),
  tailLines: z.coerce.number().int().positive().max(2000).default(100),
  since: z.string().optional()
});

