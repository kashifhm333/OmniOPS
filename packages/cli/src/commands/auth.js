import chalk from "chalk";
import ora from "ora";
import { getCliConfig, saveCliConfig, clearCliConfig } from "../lib/config.js";
import { cliRequest } from "../lib/api.js";

export function registerAuthCommands(program) {
  const auth = program.command("auth").description("Authenticate CLI with OmniOPS Control Plane");

  // omniops auth login
  auth
    .command("login")
    .description("Log in to OmniOPS via Personal Access Token or browser device pairing")
    .option("-t, --token <pat>", "Personal Access Token (oop_live_...)")
    .action(async (opts) => {
      // 1. Direct PAT login
      if (opts.token) {
        const spinner = ora("Validating Personal Access Token...").start();
        try {
          const res = await cliRequest("/auth/me", { token: opts.token });
          saveCliConfig({
            token: opts.token,
            activeOrg: res.organization?.name || "Default Org"
          });
          spinner.succeed(chalk.green(`Authenticated successfully as ${chalk.bold(res.user.email)} (${res.organization?.name})`));
        } catch (err) {
          spinner.fail(chalk.red(`Authentication failed: ${err.message}`));
          process.exit(1);
        }
        return;
      }

      // 2. Interactive RFC 8628 Device Pairing
      const spinner = ora("Requesting device code from OmniOPS Control Plane...").start();
      try {
        const grant = await cliRequest("/auth/device/code", { method: "POST" });
        spinner.stop();

        console.log("\n" + chalk.cyan.bold("=== OmniOPS CLI Device Pairing ==="));
        console.log(`1. Open your browser at: ${chalk.underline.bold(grant.verification_uri)}`);
        console.log(`2. Enter pairing code:   ${chalk.yellow.bold(grant.user_code)}`);
        console.log("\nWaiting for browser authorization in the background (press Ctrl+C to abort)...\n");

        const pollSpinner = ora("Waiting for confirmation...").start();
        const pollInterval = (grant.interval || 3) * 1000;

        const checkAuth = async () => {
          try {
            const tokenRes = await cliRequest("/auth/device/token", {
              method: "POST",
              body: { device_code: grant.device_code }
            });

            if (tokenRes.access_token) {
              const me = await cliRequest("/auth/me", { token: tokenRes.access_token });
              saveCliConfig({
                token: tokenRes.access_token,
                activeOrg: me.organization?.name || "Default Org"
              });
              pollSpinner.succeed(chalk.green(`Device paired successfully! Logged in as ${chalk.bold(me.user.email)}`));
              process.exit(0);
            }
          } catch (err) {
            if (err.data?.error === "authorization_pending") {
              setTimeout(checkAuth, pollInterval);
              return;
            }
            pollSpinner.fail(chalk.red(`Device authorization failed: ${err.message}`));
            process.exit(1);
          }
        };

        setTimeout(checkAuth, pollInterval);
      } catch (err) {
        spinner.fail(chalk.red(`Failed to initiate device pairing: ${err.message}`));
        process.exit(1);
      }
    });

  // omniops auth logout
  auth
    .command("logout")
    .description("Remove stored credentials and log out")
    .action(() => {
      clearCliConfig();
      console.log(chalk.green("Logged out. Local credentials removed."));
    });

  // omniops auth status
  auth
    .command("status")
    .description("Check current CLI authentication status")
    .action(async () => {
      const config = getCliConfig();
      if (!config.token) {
        console.log(chalk.yellow("Not logged in. Run 'omniops auth login' to authenticate."));
        return;
      }

      const spinner = ora("Checking authentication status...").start();
      try {
        const res = await cliRequest("/auth/me");
        spinner.succeed(chalk.green("Authenticated"));
        console.log(`  User:         ${chalk.bold(res.user.fullName)} (${res.user.email})`);
        console.log(`  Role:         ${chalk.cyan(res.user.role)}`);
        console.log(`  Organization: ${chalk.bold(res.organization?.name)} (${res.organization?.slug})`);
        console.log(`  Endpoint:     ${chalk.gray(config.endpoint)}`);
      } catch (err) {
        spinner.fail(chalk.red(`Authentication error: ${err.message}`));
      }
    });
}

