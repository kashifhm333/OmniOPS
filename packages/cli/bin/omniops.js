#!/usr/bin/env node

import { runCli } from "../src/index.js";

runCli().catch((err) => {
  console.error("Fatal CLI Error:", err.message);
  process.exit(1);
});

