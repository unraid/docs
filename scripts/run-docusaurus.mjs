#!/usr/bin/env node

import { spawn } from "node:child_process";

const commandName = process.argv[2];
const defaultPorts = {
  serve: "3000",
  start: "3001",
};

if (!Object.hasOwn(defaultPorts, commandName)) {
  console.error("Usage: node scripts/run-docusaurus.mjs <start|serve>");
  process.exit(1);
}

// Docusaurus defaults to localhost, which is right for direct local runs.
// Dev containers set DOCUSAURUS_BIND_HOST=0.0.0.0 so VS Code/Docker can
// forward container ports for both the dev server and static preview server.
const host = process.env.DOCUSAURUS_BIND_HOST || "localhost";
const port = process.env.DOCUSAURUS_PORT || defaultPorts[commandName];
const command = process.platform === "win32" ? "pnpm.cmd" : "pnpm";

console.log(`Starting Docusaurus ${commandName} on ${host}:${port}`);

const child = spawn(
  command,
  ["exec", "docusaurus", commandName, "--host", host, "--port", port],
  {
    stdio: "inherit",
  },
);

for (const signal of ["SIGINT", "SIGTERM"]) {
  process.on(signal, () => {
    if (!child.killed) {
      child.kill(signal);
    }
  });
}

child.on("exit", (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
    return;
  }

  process.exit(code ?? 1);
});
