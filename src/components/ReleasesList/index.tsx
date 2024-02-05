import BrowserOnly from "@docusaurus/BrowserOnly";

import React, { useEffect, useState } from "react";

export function ReleasesListViewer() {
  const [releases, setReleases] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://releases.unraid.net/json?archived=true"
        );
        const data = await response.json();
        setReleases(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
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
          <tr>
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
  );
}

export function ReleasesList(props) {
  return (
    <BrowserOnly fallback={<div>Loading...</div>}>
      {() => <ReleasesListViewer />}
    </BrowserOnly>
  );
}
