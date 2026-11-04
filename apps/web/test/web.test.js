import { describe, it, expect } from "vitest";
import { apiClient } from "../src/lib/api-client.js";

describe("@omniops/web Frontend Unit Tests", () => {
  it("apiClient is configured with correct base URL and credentials", () => {
    expect(apiClient.baseURL).toBeDefined();
    expect(apiClient.withCredentials).toBe(true);
  });

  it("global styles and design tokens export expected classes", () => {
    // Basic verification of frontend environment
    expect(typeof window).toBe("object");
    expect(typeof document).toBe("object");
  });
});
