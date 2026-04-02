#!/usr/bin/env node

const { spawnSync } = require("node:child_process");

function normalizeLanguageCode(language) {
  if (!language) {
    return language;
  }

  const lowered = language.toLowerCase();
  if (lowered === "zh" || lowered === "zh-cn") {
    return "zh-CN";
  }

  return language;
}

const rawArgs = process.argv.slice(2);
const args = [];

for (let index = 0; index < rawArgs.length; index += 1) {
  const arg = rawArgs[index];

  if (arg === "--") {
    continue;
  }

  if (arg === "--language") {
    args.push(arg, normalizeLanguageCode(rawArgs[index + 1]));
    index += 1;
    continue;
  }

  if (arg.startsWith("--language=")) {
    const [, language] = arg.split("=", 2);
    args.push(`--language=${normalizeLanguageCode(language)}`);
    continue;
  }

  args.push(arg);
}

const result = spawnSync(
  "crowdin",
  ["upload", "translations", "--config", "crowdin.yml", ...args],
  {
    stdio: "inherit",
    shell: true,
  }
);

if (result.error) {
  throw result.error;
}

process.exit(result.status ?? 1);
