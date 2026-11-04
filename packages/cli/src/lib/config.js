import fs from "fs";
import path from "path";
import os from "os";

const CONFIG_DIR = path.join(os.homedir(), ".omniops");
const CONFIG_FILE = path.join(CONFIG_DIR, "config.json");

export function getCliConfig() {
  const envEndpoint = process.env.OMNIOPS_API_URL;
  const envToken = process.env.OMNIOPS_TOKEN;

  let fileConfig = {};
  try {
    if (fs.existsSync(CONFIG_FILE)) {
      fileConfig = JSON.parse(fs.readFileSync(CONFIG_FILE, "utf-8"));
    }
  } catch (err) {
    // Ignore read errors
  }

  return {
    endpoint: envEndpoint || fileConfig.endpoint || "http://localhost:4000/api/v1",
    token: envToken || fileConfig.token || null,
    activeOrg: fileConfig.activeOrg || null
  };
}

export function saveCliConfig(updates) {
  try {
    if (!fs.existsSync(CONFIG_DIR)) {
      fs.mkdirSync(CONFIG_DIR, { recursive: true, mode: 0o700 });
    }

    const current = getCliConfig();
    const merged = { ...current, ...updates };

    fs.writeFileSync(CONFIG_FILE, JSON.stringify(merged, null, 2), { mode: 0o600 });
    return merged;
  } catch (err) {
    console.error("Failed to save CLI configuration:", err.message);
    throw err;
  }
}

export function clearCliConfig() {
  try {
    if (fs.existsSync(CONFIG_FILE)) {
      fs.unlinkSync(CONFIG_FILE);
    }
  } catch (err) {
    // Ignore
  }
}
