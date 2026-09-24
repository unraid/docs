import { createHash } from "node:crypto";
import {
  mkdtemp,
  mkdir,
  readFile,
  rename,
  rm,
  writeFile,
} from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import test from "node:test";
import assert from "node:assert/strict";
import { importBundle } from "./import-account-license-transfer-flow.mjs";

function digest(bytes) {
  return createHash("sha256").update(bytes).digest("hex");
}

async function bundleFixture() {
  const root = await mkdtemp(
    path.join(tmpdir(), "account-license-transfer-bundle-"),
  );
  const imageDirectory = path.join(
    root,
    "images/unraid-account/move-license-to-new-server",
  );
  await mkdir(imageDirectory, { recursive: true });
  const image = Buffer.from("accepted account screenshot fixture");
  const imagePath =
    "images/unraid-account/move-license-to-new-server/01-open-license-move-option.png";
  await writeFile(path.join(root, imagePath), image);
  const guide = {
    schemaVersion: 2,
    categoryCount: 1,
    flowCount: 1,
    categories: [
      {
        category: "unraid-account",
        slug: "unraid-account",
        flowCount: 1,
        flows: [
          {
            flow: "move-license-to-new-server",
            slug: "move-license-to-new-server",
            stepCount: 1,
            publicationIdentity: {
              publicationKey:
                "account:license-transfer:move-license-to-new-server",
              captureId: "test-capture",
            },
            steps: [
              {
                order: 1,
                image: imagePath,
                publicationKey:
                  "account:license-transfer:move-license-to-new-server",
                captureId: "test-capture",
                sha256: digest(image),
              },
            ],
          },
        ],
      },
    ],
  };
  await writeFile(
    path.join(root, "guide-input.json"),
    `${JSON.stringify(guide)}\n`,
  );
  return { root, guide };
}

test("imports the verified image set and removes stale images", async () => {
  const fixture = await bundleFixture();
  const testRoot = await mkdtemp(
    path.join(tmpdir(), "account-license-transfer-import-"),
  );
  const destination = path.join(testRoot, "published");
  await mkdir(destination, { recursive: true });
  await writeFile(path.join(destination, "stale.png"), "stale");

  try {
    await importBundle(fixture.root, { destination });
    assert.equal(
      await readFile(
        path.join(destination, "01-open-license-move-option.png"),
        "utf8",
      ),
      "accepted account screenshot fixture",
    );
    await assert.rejects(readFile(path.join(destination, "stale.png")));
  } finally {
    await rm(fixture.root, { recursive: true, force: true });
    await rm(testRoot, { recursive: true, force: true });
  }
});

test("rejects a screenshot whose bytes do not match the accepted digest", async () => {
  const fixture = await bundleFixture();
  fixture.guide.categories[0].flows[0].steps[0].sha256 = "0".repeat(64);
  await writeFile(
    path.join(fixture.root, "guide-input.json"),
    `${JSON.stringify(fixture.guide)}\n`,
  );

  try {
    await assert.rejects(
      importBundle(fixture.root, {
        destination: path.join(fixture.root, "published"),
      }),
      /does not match its accepted digest/,
    );
  } finally {
    await rm(fixture.root, { recursive: true, force: true });
  }
});

test("restores the previous image set when publication fails", async () => {
  const fixture = await bundleFixture();
  const testRoot = await mkdtemp(
    path.join(tmpdir(), "account-license-transfer-rollback-"),
  );
  const destination = path.join(testRoot, "published");
  await mkdir(destination, { recursive: true });
  await writeFile(
    path.join(destination, "previous.png"),
    "previous screenshot",
  );
  let renameCount = 0;

  try {
    await assert.rejects(
      importBundle(fixture.root, {
        destination,
        renameDirectory: async (source, target) => {
          renameCount += 1;
          if (renameCount === 2)
            throw new Error("simulated publication failure");
          await rename(source, target);
        },
      }),
      /simulated publication failure/,
    );
    assert.equal(
      await readFile(path.join(destination, "previous.png"), "utf8"),
      "previous screenshot",
    );
  } finally {
    await rm(fixture.root, { recursive: true, force: true });
    await rm(testRoot, { recursive: true, force: true });
  }
});
