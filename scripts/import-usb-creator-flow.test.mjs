import { createHash } from 'node:crypto';
import { mkdtemp, mkdir, readFile, rename, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import test from 'node:test';
import assert from 'node:assert/strict';
import { importBundle } from './import-usb-creator-flow.mjs';

const repository = path.resolve(import.meta.dirname, '..');
const importer = path.join(repository, 'scripts/import-usb-creator-flow.mjs');

function digest(bytes) {
  return createHash('sha256').update(bytes).digest('hex');
}

async function bundleFixture() {
  const root = await mkdtemp(path.join(tmpdir(), 'usb-creator-bundle-'));
  const imageDirectory = path.join(root, 'images/unraid-os/create-unraid-usb');
  await mkdir(imageDirectory, { recursive: true });
  const image = Buffer.from('accepted screenshot fixture');
  const imagePath = 'images/unraid-os/create-unraid-usb/01-select-release.png';
  await writeFile(path.join(root, imagePath), image);
  const guide = {
    schemaVersion: 2,
    categoryCount: 1,
    flowCount: 1,
    categories: [
      {
        category: 'unraid-os',
        slug: 'unraid-os',
        flowCount: 1,
        flows: [
          {
            flow: 'create-unraid-usb',
            slug: 'create-unraid-usb',
            stepCount: 1,
            publicationIdentity: {
              publicationKey: 'usb-creator:linux:create-unraid-usb',
              captureId: 'test-capture',
            },
            steps: [
              {
                order: 1,
                image: imagePath,
                publicationKey: 'usb-creator:linux:create-unraid-usb',
                captureId: 'test-capture',
                sha256: digest(image),
              },
            ],
          },
        ],
      },
    ],
  };
  await writeFile(path.join(root, 'guide-input.json'), `${JSON.stringify(guide)}\n`);
  return { root, guide };
}

test('imports the verified image set and removes stale images', async () => {
  const fixture = await bundleFixture();
  const testRoot = await mkdtemp(path.join(tmpdir(), 'usb-creator-import-'));
  const destination = path.join(testRoot, 'published');
  await mkdir(destination, { recursive: true });
  await writeFile(path.join(destination, 'stale.png'), 'stale');

  try {
    await importBundle(fixture.root, { destination });
    assert.equal(
      await readFile(path.join(destination, '01-select-release.png'), 'utf8'),
      'accepted screenshot fixture',
    );
    await assert.rejects(readFile(path.join(destination, 'stale.png')));
  } finally {
    await rm(fixture.root, { recursive: true, force: true });
    await rm(testRoot, { recursive: true, force: true });
  }
});

test('rejects a screenshot whose bytes do not match the accepted digest', async () => {
  const fixture = await bundleFixture();
  fixture.guide.categories[0].flows[0].steps[0].sha256 = '0'.repeat(64);
  await writeFile(
    path.join(fixture.root, 'guide-input.json'),
    `${JSON.stringify(fixture.guide)}\n`,
  );

  try {
    const result = spawnSync(process.execPath, [importer, fixture.root], {
      cwd: repository,
      encoding: 'utf8',
    });
    assert.notEqual(result.status, 0);
    assert.match(result.stderr, /does not match its accepted digest/);
  } finally {
    await rm(fixture.root, { recursive: true, force: true });
  }
});

test('restores the previous image set when publication fails', async () => {
  const fixture = await bundleFixture();
  const testRoot = await mkdtemp(path.join(tmpdir(), 'usb-creator-rollback-'));
  const destination = path.join(testRoot, 'published');
  await mkdir(destination, { recursive: true });
  await writeFile(path.join(destination, 'previous.png'), 'previous screenshot');
  let renameCount = 0;

  try {
    await assert.rejects(
      importBundle(fixture.root, {
        destination,
        renameDirectory: async (source, target) => {
          renameCount += 1;
          if (renameCount === 2) throw new Error('simulated publication failure');
          await rename(source, target);
        },
      }),
      /simulated publication failure/,
    );
    assert.equal(
      await readFile(path.join(destination, 'previous.png'), 'utf8'),
      'previous screenshot',
    );
  } finally {
    await rm(fixture.root, { recursive: true, force: true });
    await rm(testRoot, { recursive: true, force: true });
  }
});
