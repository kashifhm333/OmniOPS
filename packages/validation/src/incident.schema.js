import { z } from "zod";

export const createIncidentSchema = z.object({
  title: z.string().trim().min(5, "Title must be at least 5 characters").max(200),
  severity: z.enum(["SEV-1", "SEV-2", "SEV-3", "SEV-4"]).default("SEV-3"),
  serviceName: z.string().trim().optional(),
  service: z.string().trim().optional(),
  description: z.string().trim().optional()
}).refine(data => data.serviceName || data.service, {
  message: "Service name is required (pass 'service' or 'serviceName')",
  path: ["service"]
});

export const acknowledgeIncidentSchema = z.object({
  note: z.string().trim().max(500).optional()
});

export const resolveIncidentSchema = z.object({
  resolutionNote: z.string().trim().min(5, "Resolution note must be at least 5 characters").max(1000)
});
