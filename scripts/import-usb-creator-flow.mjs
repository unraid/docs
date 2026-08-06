#!/usr/bin/env node

import { createHash } from 'node:crypto';
import {
  copyFile,
  lstat,
  mkdir,
  readFile,
  realpath,
  rename,
  rm,
} from 'node:fs/promises';
import path from 'node:path';

const EXPECTED_CATEGORY = 'unraid-os';
const EXPECTED_FLOW = 'create-unraid-usb';
const DESTINATION = path.resolve(
  'static/img/unraid-os/getting-started/create-unraid-usb',
);

function fail(message) {
  throw new Error(`USB Creator screenshot import failed: ${message}`);
}

function safeSlug(value, label) {
  if (typeof value !== 'string' || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value)) {
    fail(`${label} is not a safe slug`);
  }
  return value;
}

function sha256(bytes) {
  return createHash('sha256').update(bytes).digest('hex');
}

async function sourceImage(bundleRoot, relativeImage) {
  if (typeof relativeImage !== 'string' || path.isAbsolute(relativeImage)) {
    fail('step image must be a relative path');
  }

  const candidate = path.resolve(bundleRoot, relativeImage);
  const relative = path.relative(bundleRoot, candidate);
  if (relative.startsWith('..') || path.isAbsolute(relative)) {
    fail(`step image escapes the bundle: ${relativeImage}`);
  }

  const metadata = await lstat(candidate);
  if (!metadata.isFile() || metadata.isSymbolicLink()) {
    fail(`step image is not a regular file: ${relativeImage}`);
  }

  const resolved = await realpath(candidate);
  const resolvedRelative = path.relative(bundleRoot, resolved);
  if (resolvedRelative.startsWith('..') || path.isAbsolute(resolvedRelative)) {
    fail(`step image resolves outside the bundle: ${relativeImage}`);
  }
  return resolved;
}

async function main() {
  const bundleArgument = process.argv[2];
  if (!bundleArgument || process.argv.length !== 3) {
    fail('usage: import-usb-creator-flow.mjs <bundle-directory>');
  }

  const bundleRoot = await realpath(path.resolve(bundleArgument));
  const input = JSON.parse(
    await readFile(path.join(bundleRoot, 'guide-input.json'), 'utf8'),
  );

  if (input.schemaVersion !== 2) fail('schemaVersion must be 2');
  if (input.categoryCount !== 1 || input.categories?.length !== 1) {
    fail('bundle must contain exactly one category');
  }

  const category = input.categories[0];
  if (safeSlug(category.slug, 'category slug') !== EXPECTED_CATEGORY) {
    fail(`unexpected category: ${category.slug}`);
  }
  if (category.flowCount !== 1 || category.flows?.length !== 1) {
    fail('bundle must contain exactly one flow');
  }

  const flow = category.flows[0];
  if (safeSlug(flow.slug, 'flow slug') !== EXPECTED_FLOW) {
    fail(`unexpected flow: ${flow.slug}`);
  }
  if (!Array.isArray(flow.steps) || flow.steps.length === 0) {
    fail('flow must contain at least one step');
  }
  if (flow.stepCount !== flow.steps.length) fail('stepCount does not match steps');

  const identity = flow.publicationIdentity;
  if (
    typeof identity?.publicationKey !== 'string' ||
    identity.publicationKey.length === 0 ||
    typeof identity?.captureId !== 'string' ||
    identity.captureId.length === 0
  ) {
    fail('flow publication identity is incomplete');
  }

  const parent = path.dirname(DESTINATION);
  await mkdir(parent, { recursive: true });
  const staging = path.join(
    parent,
    `.create-unraid-usb-${process.pid}-${Date.now()}`,
  );
  await mkdir(staging);

  try {
    const names = new Set();
    for (const [index, step] of flow.steps.entries()) {
      if (step.order !== index + 1) fail('steps must have contiguous order');
      if (
        step.publicationKey !== identity.publicationKey ||
        step.captureId !== identity.captureId
      ) {
        fail(`step ${step.order} does not match the flow publication identity`);
      }
      if (typeof step.sha256 !== 'string' || !/^[a-f0-9]{64}$/.test(step.sha256)) {
        fail(`step ${step.order} has an invalid SHA-256 digest`);
      }

      const source = await sourceImage(bundleRoot, step.image);
      const bytes = await readFile(source);
      if (sha256(bytes) !== step.sha256) {
        fail(`step ${step.order} does not match its accepted digest`);
      }

      const filename = path.basename(step.image);
      if (!/^\d{2}-[a-z0-9]+(?:-[a-z0-9]+)*\.png$/.test(filename)) {
        fail(`step ${step.order} has an unsafe public filename`);
      }
      if (names.has(filename)) fail(`duplicate public filename: ${filename}`);
      names.add(filename);
      await copyFile(source, path.join(staging, filename));
    }

    await rm(DESTINATION, { recursive: true, force: true });
    await rename(staging, DESTINATION);
  } catch (error) {
    await rm(staging, { recursive: true, force: true });
    throw error;
  }

  console.log(
    `Imported ${flow.steps.length} accepted USB Creator screenshots from ${identity.captureId}`,
  );
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
