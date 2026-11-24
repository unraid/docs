const { test } = require("node:test");
const assert = require("node:assert/strict");
const { mkdtemp, readFile, rm, access } = require("node:fs/promises");
const os = require("node:os");
const path = require("node:path");
const track = require("./track-production-deployment.cjs");
const metadata = require("../plugins/deployment-metadata/index.cjs");

const sha = "a".repeat(40);
const buildId = "12345678-abcd-abcd-abcd-123456789abc";
const buildUrl = `https://dash.cloudflare.com/account/workers/services/view/unraid-docs/production/builds/${buildId}`;
const check = {
  id: 1,
  name: "Workers Builds: unraid-docs",
  head_sha: sha,
  app: { slug: "cloudflare-workers-and-pages" },
  status: "completed",
  conclusion: "success",
  details_url: buildUrl,
};
const marker = { sha, buildId, branch: "main" };

function harness({ checks = [[check]], responses = [marker], apiError } = {}) {
  const statuses = [],
    failures = [],
    requests = [],
    queries = [],
    deployments = [];
  let elapsed = 0;
  const args = {
    github: {
      rest: {
        repos: {
          createDeployment: async (data) => {
            deployments.push(data);
            return { data: { id: 12 } };
          },
          createDeploymentStatus: async (data) => {
            statuses.push(data);
          },
        },
        checks: { listForRef: () => {} },
      },
      paginate: async (_method, query) => {
        queries.push(query);
        if (apiError) throw new Error("GitHub unavailable");
        return checks.length > 1 ? checks.shift() : checks[0];
      },
    },
    context: {
      repo: { owner: "example", repo: "docs" },
      sha,
      serverUrl: "https://github.com",
      runId: 1,
    },
    core: {
      setOutput: () => {},
      setFailed: (message) => failures.push(message),
      info: () => {},
    },
    now: () => elapsed,
    sleep: async (ms) => {
      elapsed += ms;
    },
    buildTimeout: 60_000,
    siteTimeout: 60_000,
    fetchSite: async (url, options) => {
      requests.push({ url, options });
      const data = responses.length > 1 ? responses.shift() : responses[0];
      if (data instanceof Error) throw data;
      if (data === "blocked") return { ok: false, status: 403 };
      if (data === "html")
        return {
          ok: true,
          status: 200,
          json: async () => {
            throw new Error("HTML");
          },
        };
      return { ok: true, status: 200, json: async () => data };
    },
  };
  return { args, statuses, failures, requests, queries, deployments };
}

test("waits for the exact Cloudflare check, then verifies the public build", async () => {
  const h = harness({
    checks: [[], [{ ...check, status: "in_progress" }], [check]],
  });
  h.args.buildTimeout = 120_000;
  await track(h.args);
  assert.deepEqual(
    h.statuses.map((s) => s.state),
    ["queued", "in_progress", "in_progress", "success"],
  );
  assert.equal(h.failures.length, 0);
  assert.equal(h.deployments[0].ref, sha);
  assert.equal(h.deployments[0].auto_merge, false);
  assert.deepEqual(h.deployments[0].required_contexts, []);
  assert.ok(h.queries.every((q) => q.ref === sha));
  assert.equal(
    h.requests[0].url,
    `https://docs.unraid.net/deployment.json?build=${buildId}`,
  );
  assert.equal(h.requests[0].options.redirect, "error");
  assert.equal(
    h.statuses.at(-1).log_url,
    "https://github.com/example/docs/actions/runs/1",
  );
  assert.equal(h.statuses.at(-1).auto_inactive, true);
});

for (const conclusion of [
  "failure",
  "cancelled",
  "skipped",
  "timed_out",
  "neutral",
]) {
  test(`Cloudflare ${conclusion} cannot produce a successful deployment`, async () => {
    const h = harness({ checks: [[{ ...check, conclusion }]] });
    await track(h.args);
    assert.equal(h.statuses.at(-1).state, "failure");
    assert.equal(h.statuses.at(-1).auto_inactive, false);
    assert.equal(h.requests.length, 0);
    assert.equal(h.failures.length, 1);
  });
}

test("ignores checks from other apps, workers, or commits", async () => {
  const h = harness({
    checks: [
      [
        { ...check, app: { slug: "someone-else" } },
        { ...check, name: "Workers Builds: preview" },
        { ...check, head_sha: "b".repeat(40) },
      ],
    ],
  });
  await track(h.args);
  assert.equal(h.statuses.at(-1).state, "error");
  assert.match(h.failures[0], /Timed out/);
  assert.equal(h.requests.length, 0);
});

test("uses the newest check when a build is retried", async () => {
  const h = harness({
    checks: [[check, { ...check, id: 2, conclusion: "failure" }]],
  });
  await track(h.args);
  assert.equal(h.statuses.at(-1).state, "failure");
});

for (const stale of [
  { ...marker, sha: "b".repeat(40) },
  { ...marker, buildId: "87654321-abcd-abcd-abcd-123456789abc" },
  { ...marker, branch: "preview" },
  null,
  "blocked",
  "html",
  new Error("Network failure"),
]) {
  test(`does not report success for an unverified public response: ${JSON.stringify(stale)}`, async () => {
    const h = harness({ responses: [stale] });
    await track(h.args);
    assert.equal(h.statuses.at(-1).state, "error");
    assert.match(h.failures[0], /verification timed out/);
    assert.ok(h.statuses.every((s) => !s.auto_inactive));
  });
}

test("allows propagation delay before the exact public build appears", async () => {
  const h = harness({
    responses: ["blocked", { ...marker, sha: "b".repeat(40) }, marker],
  });
  await track(h.args);
  assert.equal(h.statuses.at(-1).state, "success");
  assert.equal(h.requests.length, 3);
});

test("GitHub API errors leave production unverified", async () => {
  const h = harness({ apiError: true });
  await track(h.args);
  assert.equal(h.statuses.at(-1).state, "error");
  assert.match(h.failures[0], /GitHub unavailable/);
});

test("rejects a successful check without a valid build identity", async () => {
  const h = harness({
    checks: [
      [{ ...check, details_url: "https://dash.cloudflare.com/builds/unknown" }],
    ],
  });
  await track(h.args);
  assert.equal(h.statuses.at(-1).state, "error");
  assert.equal(h.requests.length, 0);
});

test("Docusaurus writes Cloudflare metadata only for the default locale", async () => {
  const directory = await mkdtemp(path.join(os.tmpdir(), "docs-deployment-"));
  const keys = [
    "WORKERS_CI",
    "WORKERS_CI_COMMIT_SHA",
    "WORKERS_CI_BUILD_UUID",
    "WORKERS_CI_BRANCH",
  ];
  const original = Object.fromEntries(
    keys.map((key) => [key, process.env[key]]),
  );
  const plugin = (locale) =>
    metadata({ i18n: { currentLocale: locale, defaultLocale: "en" } });
  try {
    delete process.env.WORKERS_CI;
    await plugin("en").postBuild({ outDir: directory });
    await assert.rejects(access(path.join(directory, "deployment.json")));
    Object.assign(process.env, {
      WORKERS_CI: "1",
      WORKERS_CI_COMMIT_SHA: sha,
      WORKERS_CI_BUILD_UUID: buildId,
      WORKERS_CI_BRANCH: "main",
    });
    await plugin("fr").postBuild({ outDir: directory });
    await assert.rejects(access(path.join(directory, "deployment.json")));
    await plugin("en").postBuild({ outDir: directory });
    assert.deepEqual(
      JSON.parse(await readFile(path.join(directory, "deployment.json"))),
      marker,
    );
    delete process.env.WORKERS_CI_COMMIT_SHA;
    await assert.rejects(
      plugin("en").postBuild({ outDir: directory }),
      /identity is missing/,
    );
  } finally {
    for (const key of keys) {
      if (original[key] === undefined) delete process.env[key];
      else process.env[key] = original[key];
    }
    await rm(directory, { recursive: true, force: true });
  }
});
