import BrowserOnly from "@docusaurus/BrowserOnly";

import React, { useEffect, useState } from "react";

interface Release extends Object {
  tags: string[];
  version: string;
  date: string;
  basefile: string;
  url: string;
  md5: string;
  sha256: string;
  changelog_pretty: string;
}

type ParsedReleaseObject = {
  featured?: { releases: Release[]; title: string; description: string };
  archive?: { releases: Release[]; title: string; description: string };
};
type Releases = Release[];

export function ReleasesListViewer() {
  const [releases, setReleases] = useState<ParsedReleaseObject>({
    featured: {
      releases: [],
      title: "Featured",
      description: "Recommended Releases",
    },
    archive: {
      releases: [],
      title: "Archive",
      description: "Older / Non-Recommended Releases",
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://releases.unraid.net/json");
        const data: Release[] = await response.json();
        const parsedReleases = data.reduce<{
          featured: Release[];
          archive: Release[];
        }>(
          (acc, releases) => {
            if (releases.tags.includes("featured")) {
              acc.featured.push(releases);
            } else {
              acc.archive.push(releases);
            }
            return acc;
          },
          { featured: [], archive: [] }
        );

        setReleases({
          ...(parsedReleases.featured.length
            ? {
                featured: {
                  ...releases.featured,
                  releases: parsedReleases.featured,
                },
              }
            : {}),
          ...(parsedReleases.archive.length
            ? {
                archive: {
                  ...releases.archive,
                  releases: parsedReleases.archive,
                },
              }
            : {}),
        });
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {Object.values(releases).map(({ title, description, releases }) => (
        <div
          key={title}
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
          }}
        >
          <h2>{title}</h2>
          <p>{description}</p>
          <table>
            <thead>
              <th>Version</th>
              <th>Created</th>
              <th>Download</th>
              <th>Changelog</th>
              <th>MD5</th>
            </thead>
            <tbody>
              {releases.map((release) => (
                <tr key={release.version}>
                  <td>{release.version}</td>
                  <td>{release.date}</td>
                  <td>
                    <a download href={release.url}>
                      {release.basefile}
                    </a>
                  </td>
                  <td>
                    <a href={release.changelog_pretty}>Changelog</a>
                  </td>
                  <td>{release.md5}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </>
  );
}

export function ReleasesList(props) {
  return (
    <BrowserOnly fallback={<div>Loading...</div>}>
      {() => <ReleasesListViewer />}
    </BrowserOnly>
  );
}
