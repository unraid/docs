const { appendFile } = require("node:fs/promises");

const SITE = "https://docs.unraid.net";
const CHECK_NAME = "Workers Builds: unraid-docs";
const APP = "cloudflare-workers-and-pages";

module.exports = async function track({
  github,
  context,
  core,
  fetchSite = globalThis.fetch,
  sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms)),
  now = Date.now,
  buildTimeout = 25 * 60_000,
  siteTimeout = 5 * 60_000,
}) {
  const repo = context.repo;
  const sha = context.sha;
  const logUrl = `${context.serverUrl}/${repo.owner}/${repo.repo}/actions/runs/${context.runId}`;
  const { data: deployment } = await github.rest.repos.createDeployment({
    ...repo,
    ref: sha,
    environment: "Production",
    task: "track-cloudflare",
    auto_merge: false,
    required_contexts: [],
    production_environment: true,
    description: "Track Cloudflare build and verify the public commit.",
  });
  core.setOutput("deployment_id", deployment.id);
  const status = (state, description) =>
    github.rest.repos.createDeploymentStatus({
      ...repo,
      deployment_id: deployment.id,
      state,
      description,
      environment_url: SITE,
      log_url: logUrl,
      // Only verified production success can retire earlier deployments.
      auto_inactive: state === "success",
    });
  let buildUrl = logUrl;
  try {
    await status("queued", "Waiting for Cloudflare to build this commit.");
    const buildDeadline = now() + buildTimeout;
    let check;
    let building = false;
    while (now() < buildDeadline) {
      const checks = await github.paginate(github.rest.checks.listForRef, {
        ...repo,
        ref: sha,
        check_name: CHECK_NAME,
        filter: "latest",
        per_page: 100,
      });
      check = checks
        .filter(
          (item) =>
            item.name === CHECK_NAME &&
            item.head_sha === sha &&
            item.app?.slug === APP,
        )
        .sort((a, b) => b.id - a.id)[0];
      if (check) {
        buildUrl = check.details_url;
        if (check.status === "completed") break;
        if (check.status === "in_progress" && !building) {
          await status("in_progress", "Cloudflare is building this commit.");
          building = true;
        }
      }
      await sleep(30_000);
    }
    if (check?.status !== "completed") {
      throw new Error("Timed out waiting for Cloudflare's build result.");
    }
    core.info(`Cloudflare build: ${buildUrl}`);
    if (check.conclusion !== "success") {
      await status(
        "failure",
        `Cloudflare build concluded: ${check.conclusion}.`,
      );
      core.setFailed(`Cloudflare build concluded: ${check.conclusion}`);
      return;
    }
    const buildId = new URL(buildUrl).pathname.split("/").pop();
    if (!/^[a-f0-9-]{36}$/.test(buildId))
      throw new Error("Invalid Cloudflare build URL.");
    await status(
      "in_progress",
      "Cloudflare succeeded; verifying the public commit.",
    );
    const siteDeadline = now() + siteTimeout;
    let observation = "No response";
    while (now() < siteDeadline) {
      let marker;
      try {
        const response = await fetchSite(
          `${SITE}/deployment.json?build=${buildId}`,
          {
            headers: {
              "Cache-Control": "no-cache",
              Accept: "application/json",
            },
            signal: AbortSignal.timeout(15_000),
            redirect: "error",
          },
        );
        observation = `HTTP ${response.status}`;
        if (response.ok) {
          marker = await response.json();
          observation =
            "Public build identity does not match this commit and build";
        }
      } catch {
        observation = "Public metadata request failed or returned invalid JSON";
      }
      if (
        marker?.sha === sha &&
        marker.buildId === buildId &&
        marker.branch === "main"
      ) {
        await status(
          "success",
          "Cloudflare build passed and this commit is live.",
        );
        if (process.env.GITHUB_STEP_SUMMARY) {
          await appendFile(
            process.env.GITHUB_STEP_SUMMARY,
            `Production verified: \`${sha}\` at [docs.unraid.net](${SITE}).\n\n[Cloudflare build](${buildUrl})\n`,
          );
        }
        return;
      }
      core.info(observation);
      await sleep(15_000);
    }
    throw new Error(`Public commit verification timed out. ${observation}.`);
  } catch (error) {
    await status(
      "error",
      "Deployment could not be verified. See the tracking log.",
    );
    core.setFailed(error.message);
  }
};
