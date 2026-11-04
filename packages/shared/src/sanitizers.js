// Sensitive Data Masking & Log Redaction Utility

const REDACTION_PATTERNS = [
  // AWS Access Key ID
  { regex: /(A3T[A-Z0-9]|AKIA|AGPA|AIDA|AROA|AIPA|ANPA|ANVA|ASIA)[A-Z0-9]{16}/g, replacement: "[REDACTED_AWS_KEY]" },
  // Bearer Token & JWTs
  { regex: /Bearer\s+[A-Za-z0-9\-_]+\.[A-Za-z0-9\-_]+\.[A-Za-z0-9\-_]+/gi, replacement: "Bearer [REDACTED_JWT]" },
  // OmniOPS PATs
  { regex: /(omni_pat_|oop_live_)[a-zA-Z0-9_\-]+/g, replacement: "[REDACTED]" },
  // Bearer tokens generic
  { regex: /Bearer\s+([A-Za-z0-9_\-\.]+)/gi, replacement: "Bearer [REDACTED]" },
  // Database connection passwords: mongodb://user:pass@host
  { regex: /(mongodb(?:\+srv)?:\/\/[^:]+:)([^@]+)(@)/gi, replacement: "$1[REDACTED]$3" },
  // Generic password fields in JSON or key-value pairs
  { regex: /(["']?password["']?\s*[:=]\s*["'])([^"']+)(["'])/gi, replacement: "$1[REDACTED]$3" },
  // Generic secret / token fields in JSON
  { regex: /(["']?(?:secret|token|api_key|apiKey)["']?\s*[:=]\s*["'])([^"']+)(["'])/gi, replacement: "$1[REDACTED]$3" }
];

export function maskSecrets(text) {
  return sanitizeText(text);
}

export function sanitizeText(text) {
  if (typeof text !== "string") return text;
  let sanitized = text;
  for (const { regex, replacement } of REDACTION_PATTERNS) {
    sanitized = sanitized.replace(regex, replacement);
  }
  return sanitized;
}

export function sanitizeObject(obj) {
  if (!obj || typeof obj !== "object") return obj;
  if (Array.isArray(obj)) {
    return obj.map((item) => sanitizeObject(item));
  }
  const copy = {};
  for (const [key, val] of Object.entries(obj)) {
    if (typeof val === "string") {
      copy[key] = sanitizeText(val);
    } else if (typeof val === "object" && val !== null) {
      copy[key] = sanitizeObject(val);
    } else {
      copy[key] = val;
    }
  }
  return copy;
}
