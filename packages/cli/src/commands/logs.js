import chalk from "chalk";
import ora from "ora";
import { cliRequest } from "../lib/api.js";

export function registerLogsCommand(program) {
  program
    .command("logs")
    .description("Query centralized logs with automated secret masking")
    .option("-q, --query <text>", "Filter query text")
    .option("-l, --level <level>", "Log level (INFO, WARN, ERROR, DEBUG, ALL)", "ALL")
    .option("-s, --service <service>", "Filter by service name")
    .action(async (opts) => {
      const spinner = ora("Querying logs...").start();
      try {
        const query = new URLSearchParams();
        if (opts.query) query.set("q", opts.query);
        if (opts.level) query.set("level", opts.level);
        if (opts.service) query.set("service", opts.service);

        const logs = await cliRequest(`/logs/query?${query.toString()}`);
        spinner.stop();

        if (logs.length === 0) {
          console.log(chalk.gray("No logs matching filter criteria."));
          return;
        }

        console.log(chalk.gray(`Showing ${logs.length} events [Secret masking active]:`));
        logs.forEach(log => {
          const ts = chalk.gray(log.ts?.substring(11, 19) || "00:00:00");
          let levelStr = chalk.blue(log.level);
          if (log.level === "ERROR") levelStr = chalk.red.bold(log.level);
          if (log.level === "WARN") levelStr = chalk.yellow(log.level);
          const svc = chalk.cyan(`[${log.service}]`);

          console.log(`${ts} ${levelStr} ${svc} ${log.msg}`);
        });
      } catch (err) {
        spinner.fail(chalk.red(`Failed to query logs: ${err.message}`));
        process.exit(1);
      }
    });
}

