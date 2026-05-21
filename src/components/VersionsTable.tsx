import BrowserOnly from "@docusaurus/BrowserOnly";
import { useColorMode } from "@docusaurus/theme-common";
import React, { useEffect, useState } from "react";

type Release = {
  version: string;
  date: string;
  basefile?: string;
  url?: string;
  md5?: string;
  changelog_pretty: string;
  downloadable?: boolean;
};

type Minor = `${number}.${number}`;
type StatusFilter = "supported" | "eol";
type RowStatus = "Supported" | "Security updates" | "Superseded" | "EOL";

const minorOf = (version: string): Minor =>
  version.split(".").slice(0, 2).join(".") as Minor;

const parseVersion = (version: string): number[] => {
  const parts: number[] = [];

  for (const rawPart of version.split(/[-.]/)) {
    const part = rawPart.toLowerCase();
    const betaMatch = part.match(/^beta(\d+)$/);
    const rcMatch = part.match(/^rc(\d+)$/);

    if (part === "beta") {
      parts.push(-2);
    } else if (part === "rc") {
      parts.push(-1);
    } else if (betaMatch) {
      parts.push(-2, Number.parseInt(betaMatch[1], 10));
    } else if (rcMatch) {
      parts.push(-1, Number.parseInt(rcMatch[1], 10));
    } else {
      const parsed = Number.parseInt(part, 10);
      parts.push(Number.isNaN(parsed) ? 0 : parsed);
    }
  }

  return parts;
};

const compareVersions = (a: string, b: string) => {
  const aParts = parseVersion(a);
  const bParts = parseVersion(b);
  const length = Math.max(aParts.length, bParts.length);

  for (let index = 0; index < length; index += 1) {
    const diff = (bParts[index] ?? 0) - (aParts[index] ?? 0);
    if (diff !== 0) return diff;
  }

  return 0;
};

const getLatestRelease = (releases: Release[]) =>
  [...releases].sort((a, b) => compareVersions(a.version, b.version))[0];

const isDownloadableRelease = (
  release: Release,
): release is Release & { basefile: string; url: string; md5: string } =>
  release.downloadable !== false &&
  Boolean(release.basefile && release.url && release.md5);

const badge = (label: RowStatus) => {
  const cls =
    label === "Supported" || label === "Security updates"
      ? "badge--success"
      : label === "EOL"
        ? "badge--secondary"
        : "badge--warning";

  return <span className={`badge ${cls}`}>{label}</span>;
};

const getSupportPolicies = (currentMinor?: Minor, previousMinor?: Minor) => ({
  supported: {
    title: "Supported releases",
    description:
      currentMinor && previousMinor
        ? `Unraid ${currentMinor}.x is the current public minor series. Unraid ${previousMinor}.x receives security updates as appropriate.`
        : "Loading supported public minor series.",
    details: [
      "The latest patch or pre-release build in the current public minor series is supported.",
      "The latest patch in the previous public minor series receives security updates as appropriate.",
      "Older patch or pre-release builds in supported series are kept in the archive, but are superseded by the latest available build for that series.",
      "Production systems should normally use the latest stable build, even when a newer beta or RC is public.",
    ],
  },
  eol: {
    title: "End of Life (EOL) releases",
    description:
      "Older public minor series have reached End of Life and are kept here only for archive access.",
    details: [
      "EOL releases are not supported and no longer include bug fixes or security updates.",
      "If you are running an EOL release, review the supported release options before planning an update.",
      "See the licensing FAQ and release types page for the full support policy.",
    ],
  },
});

function Viewer() {
  const [releases, setReleases] = useState<Release[]>([]);
  const [filter, setFilter] = useState<StatusFilter>("supported");
  const { colorMode } = useColorMode();

  useEffect(() => {
    fetch("https://releases.unraid.net/json?includePublic=1")
      .then((response) => response.json())
      .then((data: Release[]) =>
        setReleases(
          [...data].sort((a, b) => compareVersions(a.version, b.version)),
        ),
      )
      .catch(console.error);
  }, []);

  const minors = Array.from(
    new Set(releases.map((release) => minorOf(release.version))),
  ).sort((a, b) => compareVersions(`${a}.0`, `${b}.0`));
  const currentMinor = minors[0];
  const previousMinor = minors[1];

  const groups = {
    current: releases.filter(
      (release) => minorOf(release.version) === currentMinor,
    ),
    previous: releases.filter(
      (release) => minorOf(release.version) === previousMinor,
    ),
    supported: releases.filter((release) =>
      [currentMinor, previousMinor].includes(minorOf(release.version)),
    ),
    eol: releases.filter(
      (release) =>
        ![currentMinor, previousMinor].includes(minorOf(release.version)),
    ),
  };

  const supportPolicies = getSupportPolicies(currentMinor, previousMinor);

  const latestCurrentRelease = getLatestRelease(groups.current);
  const latestPreviousRelease = getLatestRelease(groups.previous);

  const getRowStatus = (release: Release, statusFilter: StatusFilter) => {
    const releaseMinor = minorOf(release.version);

    if (statusFilter === "eol") return "EOL";
    if (releaseMinor === currentMinor) {
      return latestCurrentRelease?.version === release.version
        ? "Supported"
        : "Superseded";
    }
    if (releaseMinor === previousMinor) {
      return latestPreviousRelease?.version === release.version
        ? "Security updates"
        : "Superseded";
    }

    return "EOL";
  };

  const renderRows = (list: Release[], statusFilter: StatusFilter) =>
    list.map((release) => {
      const rowStatus = getRowStatus(release, statusFilter);
      const canDownload = isDownloadableRelease(release);

      return (
        <React.Fragment key={release.version}>
          <tr>
            <td>{badge(rowStatus)}</td>
            <td>{release.version}</td>
            <td>{release.date}</td>
            <td>
              {canDownload ? (
                <a download href={release.url}>
                  {release.basefile}
                </a>
              ) : (
                "Use account.unraid.net / USB Creator to download prereleases"
              )}
            </td>
            <td style={{ fontSize: "0.75rem" }}>
              {canDownload ? release.md5 : "N/A"}
            </td>
            <td>
              <a href={release.changelog_pretty}>Release notes</a>
            </td>
          </tr>
        </React.Fragment>
      );
    });

  return (
    <>
      {(["supported", "eol"] as const).map((key) => (
        <button
          key={key}
          className={`button button--sm ${
            filter === key ? "button--primary" : "button--secondary"
          }`}
          style={{ marginRight: "0.5rem" }}
          onClick={() => {
            setFilter(key);
          }}
        >
          {key === "supported" ? "Supported" : "EOL"}
        </button>
      ))}

      <div
        style={{
          background: colorMode === "dark" ? "#1b1b1d" : "#f9f9f9",
          border: `1px solid ${colorMode === "dark" ? "#444" : "#ddd"}`,
          borderRadius: "8px",
          padding: "1.5rem",
          marginTop: "1.5rem",
          marginBottom: "1.5rem",
        }}
      >
        <h3 style={{ marginTop: 0, marginBottom: "1rem" }}>
          {supportPolicies[filter].title}
        </h3>
        <p style={{ marginBottom: "1rem", fontWeight: "500" }}>
          {supportPolicies[filter].description}
        </p>
        <ul style={{ margin: 0, paddingLeft: "1.25rem" }}>
          {supportPolicies[filter].details.map((detail) => (
            <li key={detail} style={{ marginBottom: "0.5rem" }}>
              {detail}
            </li>
          ))}
        </ul>
      </div>

      <table
        className="table"
        style={{
          marginTop: "1rem",
          width: "100%",
          maxWidth: "100%",
          minWidth: "100%",
        }}
      >
        <thead>
          <tr>
            <th style={{ width: "12%" }}>Status</th>
            <th style={{ width: "15%" }}>Version</th>
            <th style={{ width: "15%" }}>Date</th>
            <th style={{ width: "35%" }}>Download</th>
            <th style={{ width: "18%" }}>MD5</th>
            <th style={{ width: "5%" }}>Changes</th>
          </tr>
        </thead>
        <tbody>{renderRows(groups[filter], filter)}</tbody>
      </table>
    </>
  );
}

export function VersionsTable() {
  return (
    <BrowserOnly fallback={<div>Loading...</div>}>
      {() => <Viewer />}
    </BrowserOnly>
  );
}
