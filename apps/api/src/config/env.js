import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const envSchema = z.object({
  PORT: z.coerce.number().default(4000),
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  MONGODB_URI: z.string().default("mongodb://localhost:27017/omniops"),
  SESSION_SECRET: z.string().default("dev-omniops-session-secret-key-32charsmin"),
  CORS_ORIGIN: z.string().default("http://localhost:3000"),
  LOG_LEVEL: z.string().default("info")
});

export const env = envSchema.parse(process.env);

