import chalk from "chalk";
import Table from "cli-table3";
import ora from "ora";
import { cliRequest } from "../lib/api.js";

export function registerStatusCommand(program) {
  program
    .command("status")
    .description("Show operational status across Kubernetes clusters, active incidents, and telemetry")
    .option("--json", "Output results in JSON format")
    .action(async (opts) => {
      const spinner = ora("Fetching operational summary...").start();
      try {
        const data = await cliRequest("/dashboard/summary");
        spinner.stop();

        if (opts.json) {
          console.log(JSON.stringify(data, null, 2));
          return;
        }

        console.log("\n" + chalk.cyan.bold("=== OmniOPS Control Plane Status ==="));
        console.log(`Cluster Mesh Health: ${data.clusterHealth === "HEALTHY" ? chalk.green.bold("HEALTHY") : chalk.red.bold("DEGRADED")}`);
        console.log(`Global Uptime SLA:   ${chalk.green.bold(data.uptime)}`);
        console.log(`Total Workloads:     ${chalk.bold(data.healthyPods)} / ${data.totalPods} pods operational`);
        console.log(`Active Incidents:    ${data.activeIncidents > 0 ? chalk.red.bold(data.activeIncidents + " Active") : chalk.green("0 Active")}`);

        // Clusters Table
        if (data.clusters && data.clusters.length > 0) {
          console.log("\n" + chalk.bold("Kubernetes Clusters:"));
          const clusterTable = new Table({
            head: [chalk.cyan("Cluster Name"), chalk.cyan("Provider"), chalk.cyan("Version"), chalk.cyan("Health"), chalk.cyan("Pods")],
            style: { head: [], border: [] }
          });

          data.clusters.forEach(c => {
            const healthStr = c.health === "healthy" ? chalk.green("HEALTHY") : chalk.red("DEGRADED");
            clusterTable.push([c.name, c.provider, c.version, healthStr, c.pods]);
          });
          console.log(clusterTable.toString());
        }

        // Active Alerts Table
        if (data.activeAlerts && data.activeAlerts.length > 0) {
          console.log("\n" + chalk.red.bold("Active Incidents:"));
          const alertTable = new Table({
            head: [chalk.red("Severity"), chalk.red("Service"), chalk.red("Title"), chalk.red("Duration")],
            style: { head: [], border: [] }
          });

          data.activeAlerts.forEach(a => {
            alertTable.push([chalk.bold(a.sev), a.service, a.title, a.duration]);
          });
          console.log(alertTable.toString());
        }

        console.log("");
      } catch (err) {
        spinner.fail(chalk.red(`Failed to retrieve operational status: ${err.message}`));
        process.exit(1);
      }
    });
}

