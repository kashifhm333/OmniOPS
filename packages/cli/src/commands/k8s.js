import chalk from "chalk";
import Table from "cli-table3";
import ora from "ora";
import { cliRequest } from "../lib/api.js";

export function registerK8sCommands(program) {
  const k8s = program.command("k8s").description("Inspect and manage Kubernetes fleet workloads");

  // omniops k8s clusters
  k8s
    .command("clusters")
    .description("List connected Kubernetes clusters")
    .option("--json", "Output results in JSON format")
    .action(async (opts) => {
      const spinner = ora("Fetching Kubernetes clusters...").start();
      try {
        const clusters = await cliRequest("/k8s/clusters");
        spinner.stop();

        if (opts.json) {
          console.log(JSON.stringify(clusters, null, 2));
          return;
        }

        const table = new Table({
          head: [chalk.cyan("Name"), chalk.cyan("Provider"), chalk.cyan("Version"), chalk.cyan("Health"), chalk.cyan("Nodes"), chalk.cyan("Pods")],
          style: { head: [], border: [] }
        });

        clusters.forEach(c => {
          const health = c.health === "healthy" ? chalk.green("HEALTHY") : chalk.red(c.health.toUpperCase());
          table.push([chalk.bold(c.name), c.provider, c.version, health, c.nodeCount, c.podCount]);
        });

        console.log(table.toString());
      } catch (err) {
        spinner.fail(chalk.red(`Failed to list clusters: ${err.message}`));
        process.exit(1);
      }
    });

  // omniops k8s pods
  k8s
    .command("pods")
    .description("List pods across clusters and namespaces")
    .option("-c, --cluster <name>", "Filter by cluster name")
    .option("-n, --namespace <ns>", "Filter by namespace (default: all)", "all")
    .option("--json", "Output results in JSON format")
    .action(async (opts) => {
      const spinner = ora("Fetching pods...").start();
      try {
        const query = new URLSearchParams();
        if (opts.cluster) query.set("cluster", opts.cluster);
        if (opts.namespace) query.set("namespace", opts.namespace);

        const pods = await cliRequest(`/k8s/pods?${query.toString()}`);
        spinner.stop();

        if (opts.json) {
          console.log(JSON.stringify(pods, null, 2));
          return;
        }

        const table = new Table({
          head: [chalk.cyan("Pod Name"), chalk.cyan("Namespace"), chalk.cyan("Ready"), chalk.cyan("Status"), chalk.cyan("Restarts"), chalk.cyan("Age"), chalk.cyan("Node")],
          style: { head: [], border: [] }
        });

        pods.forEach(p => {
          const isRunning = p.status === "Running";
          const statusStr = isRunning ? chalk.green("Running") : chalk.red.bold(p.status);
          table.push([p.name, p.namespace, p.ready, statusStr, p.restarts, p.age, chalk.gray(p.node)]);
        });

        console.log(table.toString());
      } catch (err) {
        spinner.fail(chalk.red(`Failed to list pods: ${err.message}`));
        process.exit(1);
      }
    });

  // omniops k8s restart <name>
  k8s
    .command("restart <podName>")
    .description("Restart a pod workload")
    .action(async (podName) => {
      const spinner = ora(`Triggering restart for pod ${chalk.bold(podName)}...`).start();
      try {
        const res = await cliRequest(`/k8s/pods/${podName}/restart`, {
          method: "POST"
        });
        spinner.succeed(chalk.green(res.message || `Pod ${podName} restarted successfully`));
      } catch (err) {
        spinner.fail(chalk.red(`Failed to restart pod: ${err.message}`));
        process.exit(1);
      }
    });
}
