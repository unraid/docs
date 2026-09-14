#!/usr/bin/env node

import { createHash, randomUUID } from "node:crypto";
import {
  lstat,
  mkdir,
  readFile,
  realpath,
  rename,
  rm,
  writeFile,
} from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const EXPECTED_CATEGORY = "unraid-account";
const EXPECTED_FLOW = "move-license-to-new-server";
const EXPECTED_PUBLICATION_KEY =
  "account:license-transfer:move-license-to-new-server";
const REPOSITORY = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
);
const DESTINATION = path.join(
  REPOSITORY,
  "static/img/unraid-account/move-license-to-new-server",
);

function fail(message) {
  throw new Error(
    `Account license-transfer screenshot import failed: ${message}`,
  );
}

function safeSlug(value, label) {
  if (typeof value !== "string" || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value)) {
    fail(`${label} is not a safe slug`);
  }
  return value;
}

function safeCaptureId(value) {
  if (
    typeof value !== "string" ||
    !/^[A-Za-z0-9][A-Za-z0-9._-]{0,127}$/.test(value)
  ) {
    fail("flow captureId is not a safe capture identifier");
  }
  return value;
}

function sha256(bytes) {
  return createHash("sha256").update(bytes).digest("hex");
}

function isInside(root, candidate) {
  const relative = path.relative(root, candidate);
  return (
    relative === "" ||
    (!relative.startsWith("..") && !path.isAbsolute(relative))
  );
}

async function sourceImage(bundleRoot, relativeImage) {
  if (
    typeof relativeImage !== "string" ||
    relativeImage.trim() === "" ||
    path.isAbsolute(relativeImage) ||
    relativeImage.split(/[\\/]/).includes("..")
  ) {
    fail("step image must be a safe relative path");
  }

  const candidate = path.resolve(bundleRoot, relativeImage);
  if (!isInside(bundleRoot, candidate)) {
    fail(`step image escapes the bundle: ${relativeImage}`);
  }

  const metadata = await lstat(candidate);
  if (!metadata.isFile() || metadata.isSymbolicLink()) {
    fail(`step image is not a regular file: ${relativeImage}`);
  }

  const resolved = await realpath(candidate);
  if (!isInside(bundleRoot, resolved)) {
    fail(`step image resolves outside the bundle: ${relativeImage}`);
  }
  return resolved;
}

async function publishDirectory(
  staging,
  destination,
  renameDirectory = rename,
) {
  const backup = `${destination}.previous-${process.pid}-${Date.now()}`;
  let hadDestination = false;
  try {
    await lstat(destination);
    hadDestination = true;
  } catch (error) {
    if (error.code !== "ENOENT") throw error;
  }

  if (hadDestination) await renameDirectory(destination, backup);
  try {
    await renameDirectory(staging, destination);
  } catch (error) {
    if (hadDestination) await renameDirectory(backup, destination);
    throw error;
  }
  if (hadDestination) await rm(backup, { recursive: true, force: true });
}

function parseArguments(argumentsList) {
  if (argumentsList[0] === "--") argumentsList = argumentsList.slice(1);
  const options = {
    bundle: undefined,
    section: EXPECTED_CATEGORY,
    flow: EXPECTED_FLOW,
  };

  for (let index = 0; index < argumentsList.length; index += 1) {
    const argument = argumentsList[index];
    if (
      argument === "--bundle" ||
      argument === "--section" ||
      argument === "--flow"
    ) {
      const value = argumentsList[index + 1];
      if (!value || value.startsWith("--")) {
        fail(`${argument} requires a value`);
      }
      options[argument.slice(2)] = value;
      index += 1;
    } else {
      fail(`unknown argument: ${argument}`);
    }
  }

  if (!options.bundle) {
    fail(
      "usage: import-account-license-transfer-flow.mjs --bundle <bundle-directory>",
    );
  }
  return options;
}

function validateCounts(input) {
  if (
    !input ||
    typeof input !== "object" ||
    input.schemaVersion !== 2 ||
    !Array.isArray(input.categories) ||
    input.categoryCount !== input.categories.length
  ) {
    fail(
      "guide-input.json must use schemaVersion 2 with matching category counts",
    );
  }

  const flowCount = input.categories.reduce(
    (count, category) =>
      count + (Array.isArray(category?.flows) ? category.flows.length : 0),
    0,
  );
  if (input.flowCount !== flowCount) {
    fail("guide-input.json has a mismatched flow count");
  }
}

export async function importBundle(
  bundleArgument,
  {
    destination = DESTINATION,
    section = EXPECTED_CATEGORY,
    flow: flowName = EXPECTED_FLOW,
    renameDirectory = rename,
  } = {},
) {
  const bundleRoot = await realpath(path.resolve(bundleArgument));
  const input = JSON.parse(
    await readFile(path.join(bundleRoot, "guide-input.json"), "utf8"),
  );
  validateCounts(input);

  const category = input.categories.find(
    (candidate) => candidate?.slug === section,
  );
  if (!category) fail(`unexpected category: ${section}`);
  safeSlug(category.slug, "category slug");
  if (!Array.isArray(category.flows)) fail("category flows must be an array");

  const matchingFlows = category.flows.filter(
    (candidate) => candidate?.slug === flowName,
  );
  if (matchingFlows.length !== 1) {
    fail(`expected exactly one ${section}/${flowName} flow`);
  }
  const flow = matchingFlows[0];
  safeSlug(flow.slug, "flow slug");
  if (!Array.isArray(flow.steps) || flow.steps.length === 0) {
    fail("flow must contain at least one step");
  }
  if (flow.stepCount !== flow.steps.length)
    fail("stepCount does not match steps");

  const identity = flow.publicationIdentity;
  if (identity?.publicationKey !== EXPECTED_PUBLICATION_KEY) {
    fail("flow publication identity is incomplete");
  }
  const captureId = safeCaptureId(identity?.captureId);

  const resolvedDestination = path.resolve(destination);
  const parent = path.dirname(resolvedDestination);
  await mkdir(parent, { recursive: true });
  const staging = path.join(
    parent,
    `.move-license-to-new-server-${process.pid}-${Date.now()}-${randomUUID()}`,
  );
  await mkdir(staging);

  try {
    const names = new Set();
    for (const [index, step] of flow.steps.entries()) {
      if (step.order !== index + 1) fail("steps must have contiguous order");
      if (
        step.publicationKey !== identity.publicationKey ||
        step.captureId !== captureId
      ) {
        fail(`step ${step.order} does not match the flow publication identity`);
      }
      if (
        typeof step.sha256 !== "string" ||
        !/^[a-f0-9]{64}$/.test(step.sha256)
      ) {
        fail(`step ${step.order} has an invalid SHA-256 digest`);
      }

      const filename = path.basename(step.image ?? "");
      if (!/^\d{2}-[a-z0-9]+(?:-[a-z0-9]+)*\.png$/.test(filename)) {
        fail(`step ${step.order} has an unsafe public filename`);
      }
      if (names.has(filename)) fail(`duplicate public filename: ${filename}`);
      names.add(filename);

      const source = await sourceImage(bundleRoot, step.image);
      const bytes = await readFile(source);
      if (sha256(bytes) !== step.sha256) {
        fail(`step ${step.order} does not match its accepted digest`);
      }
      await writeFile(path.join(staging, filename), bytes);
    }

    await publishDirectory(staging, resolvedDestination, renameDirectory);
  } catch (error) {
    await rm(staging, { recursive: true, force: true });
    throw error;
  }

  return {
    category: section,
    flow: flowName,
    captureId,
    stepCount: flow.steps.length,
    destination: resolvedDestination,
  };
}

if (
  process.argv[1] &&
  path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)
) {
  try {
    const options = parseArguments(process.argv.slice(2));
    const result = await importBundle(options.bundle, options);
    console.log(
      `Imported ${result.stepCount} accepted Account license-transfer screenshots from ${result.captureId}`,
    );
  } catch (error) {
    console.error(error?.message ?? error);
    process.exitCode = 1;
  }
}
