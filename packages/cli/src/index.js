import { Command } from "commander";
import { registerAuthCommands } from "./commands/auth.js";
import { registerStatusCommand } from "./commands/status.js";
import { registerK8sCommands } from "./commands/k8s.js";
import { registerIncidentCommands } from "./commands/incident.js";
import { registerLogsCommand } from "./commands/logs.js";

export function createProgram() {
  const program = new Command();

  program
    .name("omniops")
    .description("OmniOPS Unified DevOps Command Center CLI")
    .version("0.1.0");

  registerAuthCommands(program);
  registerStatusCommand(program);
  registerK8sCommands(program);
  registerIncidentCommands(program);
  registerLogsCommand(program);

  return program;
}

export async function runCli(argv = process.argv) {
  const program = createProgram();
  await program.parseAsync(argv);
}
