import { getCliConfig } from "./config.js";
import chalk from "chalk";

export async function cliRequest(endpointPath, options = {}) {
  const config = getCliConfig();
  const baseUrl = options.endpoint || config.endpoint;
  const token = options.token || config.token;

  const url = `${baseUrl.replace(/\/$/, "")}${endpointPath.startsWith("/") ? "" : "/"}${endpointPath}`;

  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {})
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(url, {
    method: options.method || "GET",
    headers,
    body: options.body ? JSON.stringify(options.body) : undefined
  });

  const contentType = response.headers.get("content-type") || "";
  const isJson = contentType.includes("application/json");
  const data = isJson ? await response.json() : await response.text();

  if (!response.ok) {
    const errorMsg = data?.error?.message || data?.message || `HTTP ${response.status} ${response.statusText}`;
    const err = new Error(errorMsg);
    err.status = response.status;
    err.data = data;
    throw err;
  }

  return data;
}

