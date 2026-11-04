import { describe, it, expect } from "vitest";
import { createProgram } from "../src/index.js";
import { saveCliConfig, getCliConfig, clearCliConfig } from "../src/lib/config.js";

describe("OmniOPS CLI Unit & Command Structure Tests", () => {
  it("createProgram registers all canonical commands", () => {
    const program = createProgram();
    const commandNames = program.commands.map(cmd => cmd.name());

    expect(commandNames).toContain("auth");
    expect(commandNames).toContain("status");
    expect(commandNames).toContain("k8s");
    expect(commandNames).toContain("incident");
    expect(commandNames).toContain("logs");
    expect(commandNames.length).toBeGreaterThanOrEqual(5);
  });

  it("auth command registers login, logout, and status subcommands", () => {
    const program = createProgram();
    const authCmd = program.commands.find(c => c.name() === "auth");
    expect(authCmd).toBeDefined();

    const subNames = authCmd.commands.map(c => c.name());
    expect(subNames).toContain("login");
    expect(subNames).toContain("logout");
    expect(subNames).toContain("status");
  });

  it("k8s command registers clusters, pods, and restart subcommands", () => {
    const program = createProgram();
    const k8sCmd = program.commands.find(c => c.name() === "k8s");
    expect(k8sCmd).toBeDefined();

    const subNames = k8sCmd.commands.map(c => c.name());
    expect(subNames).toContain("clusters");
    expect(subNames).toContain("pods");
    expect(subNames).toContain("restart");
  });

  it("incident command registers list, ack, and resolve subcommands", () => {
    const program = createProgram();
    const incCmd = program.commands.find(c => c.name() === "incident");
    expect(incCmd).toBeDefined();

    const subNames = incCmd.commands.map(c => c.name());
    expect(subNames).toContain("list");
    expect(subNames).toContain("ack");
    expect(subNames).toContain("resolve");
  });

  it("CLI configuration can save, read, and clear tokens", () => {
    saveCliConfig({
      token: "oop_live_unit_test_token_12345",
      activeOrg: "Acme Unit Test Org"
    });

    const config = getCliConfig();
    expect(config.token).toBe("oop_live_unit_test_token_12345");
    expect(config.activeOrg).toBe("Acme Unit Test Org");

    clearCliConfig();
    const cleared = getCliConfig();
    expect(cleared.token).toBeNull();
  });
});
