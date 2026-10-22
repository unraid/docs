const { writeFile } = require("node:fs/promises");
const path = require("node:path");

module.exports = function deploymentMetadata(context) {
  return {
    name: "deployment-metadata",
    async postBuild({ outDir }) {
      if (
        process.env.WORKERS_CI !== "1" ||
        context.i18n.currentLocale !== context.i18n.defaultLocale
      )
        return;
      const sha = process.env.WORKERS_CI_COMMIT_SHA;
      const buildId = process.env.WORKERS_CI_BUILD_UUID;
      if (
        !/^[a-f0-9]{40}$/.test(sha || "") ||
        !/^[a-f0-9-]{36}$/.test(buildId || "")
      ) {
        throw new Error("Cloudflare build identity is missing or invalid");
      }
      await writeFile(
        path.join(outDir, "deployment.json"),
        JSON.stringify({
          sha,
          buildId,
          branch: process.env.WORKERS_CI_BRANCH,
        }) + "\n",
      );
    },
  };
};
