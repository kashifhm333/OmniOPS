// Canonical System Constants for OmniOPS

export const ROLES = {
  OWNER: "Owner",
  ADMIN: "Admin",
  OPERATOR: "Operator",
  VIEWER: "Viewer"
};

export const ROLE_HIERARCHY = {
  [ROLES.OWNER]: 4,
  [ROLES.ADMIN]: 3,
  [ROLES.OPERATOR]: 2,
  [ROLES.VIEWER]: 1
};

export const INCIDENT_SEVERITY = {
  SEV1: "SEV-1", // Critical Outage / Data Loss
  SEV2: "SEV-2", // Major Degradation / Partial Outage
  SEV3: "SEV-3", // Minor Issue / Threshold Warning
  SEV4: "SEV-4"  // Informational / Non-urgent
};

export const INCIDENT_STATUS = {
  OPEN: "OPEN",
  ACKNOWLEDGED: "ACKNOWLEDGED",
  RESOLVED: "RESOLVED"
};

export const INTEGRATION_PROVIDERS = {
  GITHUB: "GITHUB",
  KUBERNETES: "KUBERNETES",
  DOCKER: "DOCKER",
  AWS: "AWS",
  TERRAFORM: "TERRAFORM"
};

export const INTEGRATION_STATUS = {
  ACTIVE: "ACTIVE",
  PENDING: "PENDING",
  ERROR: "ERROR",
  DISCONNECTED: "DISCONNECTED"
};

export const MODULE_NAMES = {
  COMMAND_CENTER: "Command Center Dashboard",
  GITHUB: "GitHub Integration",
  CICD: "CI/CD Management",
  DOCKER: "Docker Management",
  KUBERNETES: "Kubernetes Management",
  MONITORING: "Infrastructure Monitoring",
  LOGGING: "Centralized Logging",
  CLOUD: "Cloud Management",
  INCIDENTS: "Incident Management",
  TERRAFORM: "Terraform Management",
  TEAMS: "Team & Access Management",
  ASSISTANT: "Intelligent DevOps Assistant"
};

export const SESSION_COOKIE_NAME = "omniops_session";

export const AUTH_SCOPES = [
  "read:k8s",
  "write:k8s",
  "read:logs",
  "write:incidents",
  "admin:tokens",
  "*"
];
