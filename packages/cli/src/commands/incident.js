import chalk from "chalk";
import Table from "cli-table3";
import ora from "ora";
import { cliRequest } from "../lib/api.js";

export function registerIncidentCommands(program) {
  const inc = program.command("incident").description("Coordinate and resolve active incidents");

  // omniops incident list
  inc
    .command("list")
    .description("List active or resolved incidents")
    .option("-s, --status <status>", "Filter by status: active, resolved, or all", "active")
    .option("--json", "Output results in JSON format")
    .action(async (opts) => {
      const spinner = ora("Fetching incidents...").start();
      try {
        const incidents = await cliRequest(`/incidents?status=${opts.status}`);
        spinner.stop();

        if (opts.json) {
          console.log(JSON.stringify(incidents, null, 2));
          return;
        }

        if (incidents.length === 0) {
          console.log(chalk.green("No active incidents found. All systems normal."));
          return;
        }

        const table = new Table({
          head: [chalk.red("ID"), chalk.red("Severity"), chalk.red("Service"), chalk.red("Status"), chalk.red("Title"), chalk.red("Assignee")],
          style: { head: [], border: [] }
        });

        incidents.forEach(i => {
          table.push([
            chalk.bold(i.id),
            chalk.bold(i.severity),
            i.service,
            i.status.toUpperCase(),
            i.title,
            i.assignee || "Unassigned"
          ]);
        });

        console.log(table.toString());
      } catch (err) {
        spinner.fail(chalk.red(`Failed to list incidents: ${err.message}`));
        process.exit(1);
      }
    });

  // omniops incident ack <id>
  inc
    .command("ack <id>")
    .description("Acknowledge an incident")
    .action(async (id) => {
      const spinner = ora(`Acknowledging incident ${chalk.bold(id)}...`).start();
      try {
        await cliRequest(`/incidents/${id}/ack`, { method: "POST" });
        spinner.succeed(chalk.green(`Incident ${id} acknowledged successfully`));
      } catch (err) {
        spinner.fail(chalk.red(`Failed to acknowledge incident: ${err.message}`));
        process.exit(1);
      }
    });

  // omniops incident resolve <id>
  inc
    .command("resolve <id>")
    .description("Resolve an incident")
    .action(async (id) => {
      const spinner = ora(`Resolving incident ${chalk.bold(id)}...`).start();
      try {
        await cliRequest(`/incidents/${id}/resolve`, { method: "POST" });
        spinner.succeed(chalk.green(`Incident ${id} resolved successfully`));
      } catch (err) {
        spinner.fail(chalk.red(`Failed to resolve incident: ${err.message}`));
        process.exit(1);
      }
    });
}

