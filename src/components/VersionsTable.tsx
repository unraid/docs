/* src/components/VersionsTable.tsx
   
   PURPOSE: Automatically displays Unraid release versions in categorized tables
   - Fetches live data from https://releases.unraid.net/json
   - Auto-categorizes releases: Stable (current minor), Previous (last minor), Legacy (older)
   - No manual updates needed when new versions are released
   
   WHAT YOU CAN UPDATE:
   1. The "What's Next" section below (add/remove upcoming features)
   2. Category names if you want different terminology
   3. Styling colors if you want different appearance
*/

import BrowserOnly from "@docusaurus/BrowserOnly";
import React, {useEffect, useState} from "react";
import {useColorMode} from "@docusaurus/theme-common";

type Release = {
  version: string;           
  date: string;
  basefile: string;
  url: string;
  md5: string;
  changelog_pretty: string;
};

type Minor = `${number}.${number}`;

/* 
   EDIT THIS SECTION: Update "What's Next" content manually
   Add or remove items as needed for future release planning
   This is the ONLY section you need to maintain manually
*/
const upcoming = [
  {
    version: "7.2.x",
    status:  "In development – target Q4 2025",
    highlights: [
      "• Built-in WireGuard GUI v2",
      "• UI dark-mode scheduler", 
      "• ZFS automatic pool trimming",
    ],
  },
  // Add more upcoming versions here if needed:
  // {
  //   version: "8.0.x",
  //   status: "Planning phase – target 2026",
  //   highlights: ["• New feature X", "• Improvement Y"],
  // },
];

/* 
   AUTOMATIC FUNCTIONS: These handle version categorization
   No editing needed - they automatically detect the newest versions
*/
const minorOf = (v: string): Minor =>
  v.split(".").slice(0, 2).join(".") as Minor;

const badge = (label: "Stable" | "Previous" | "Legacy") => {
  const cls =
    label === "Stable"
      ? "badge--success"      // Green badge
      : label === "Previous"
      ? "badge--primary"      // Blue badge  
      : "badge--secondary";   // Gray badge
  return <span className={`badge ${cls}`}>{label}</span>;
};

/* 
   CHANGELOG CLEANER: Removes navigation elements from release notes
   This ensures only the actual release content shows up in the expandable sections
*/
const stripChrome = (html: string) => {
  const dom = new DOMParser().parseFromString(html, "text/html");
  dom.querySelectorAll(
    "nav, .navbar, .sidebar, .breadcrumbs, .theme-doc-breadcrumbs," +
      ".theme-doc-toc-desktop, .theme-doc-toc-mobile, .pagination-nav"
  ).forEach((el) => el.remove());
  const main =
    dom.querySelector("main .markdown, main article, main") ?? dom.body;
  return main.innerHTML;
};

/* 
   MAIN COMPONENT: Handles the entire version table display
   This automatically updates when new releases are published
*/
function Viewer() {
  const [releases, setReleases] = useState<Release[]>([]);
  const [open, setOpen] = useState<string | null>(null);
  const [logs, setLogs] = useState<Record<string, string>>({});
  const [filter, setFilter] =
    useState<"stable" | "previous" | "legacy">("stable");
  const {colorMode} = useColorMode();

  /* 
     DATA FETCHING: Gets latest release info automatically
     This runs every time someone visits the page
  */
  useEffect(() => {
    fetch("https://releases.unraid.net/json")
      .then((r) => r.json())
      .then((d: Release[]) => setReleases(d))
      .catch(console.error);
  }, []);

  /* 
     AUTOMATIC CATEGORIZATION: Sorts versions into Stable/Previous/Legacy
     - Stable: All versions in the newest minor release (e.g., all 7.1.x)
     - Previous: All versions in the second-newest minor (e.g., all 7.0.x)  
     - Legacy: Everything older than that
     
     This automatically updates when new minor versions are released
  */
  const minors = Array.from(new Set(releases.map((r) => minorOf(r.version))))
    .sort((a, b) => (b > a ? 1 : -1));

  const currentMinor = minors[0];   // e.g., "7.1"
  const previousMinor = minors[1];  // e.g., "7.0"

  const groups = {
    stable:   releases.filter((r) => minorOf(r.version) === currentMinor),
    previous: releases.filter((r) => minorOf(r.version) === previousMinor),
    legacy:   releases.filter(
      (r) => ![currentMinor, previousMinor].includes(minorOf(r.version))
    ),
  };

  /* 
     CHANGELOG DISPLAY: Loads release notes when user clicks "Show notes"
     Each changelog is fetched only once and cached for performance
  */
  const toggle = async (rel: Release) => {
    if (open === rel.version) return setOpen(null);
    if (!logs[rel.version]) {
      try {
        const raw = await (await fetch(rel.changelog_pretty)).text();
        setLogs((p) => ({...p, [rel.version]: stripChrome(raw)}));
      } catch {
        setLogs((p) => ({
          ...p,
          [rel.version]: "<em>Unable to load changelog.</em>",
        }));
      }
    }
    setOpen(rel.version);
  };

  /* 
     THEME SUPPORT: Automatically matches your site's dark/light mode
     The changelog boxes will match whatever theme the user has selected
  */
  const noteBox = {
    background: colorMode === "dark" ? "#1b1b1d" : "#f9f9f9",
    color:       colorMode === "dark" ? "#e3e3e3" : "#333",
    border:      `1px solid ${colorMode === "dark" ? "#444" : "#ddd"}`,
    borderRadius: "4px",
    padding: "1rem",
    fontSize: "0.9rem",
    lineHeight: 1.5,
  } as const;

  /* 
     TABLE ROW GENERATOR: Creates the actual table rows for each release
     This handles the download links, version info, and expandable changelogs
  */
  const renderRows = (list: Release[], label: "Stable"|"Previous"|"Legacy") =>
    list.map((rel) => (
      <React.Fragment key={rel.version}>
        <tr>
          <td>{badge(label)}</td>
          <td>{rel.version}</td>
          <td>{rel.date}</td>
          <td><a download href={rel.url}>{rel.basefile}</a></td>
          <td style={{fontSize:"0.75rem"}}>{rel.md5}</td>
          <td>
            <button
              className="button button--link button--sm"
              onClick={() => toggle(rel)}
            >
              {open === rel.version ? "Hide" : "Show"} notes
            </button>
          </td>
        </tr>
        {open === rel.version && (
          <tr>
            <td colSpan={6}><div style={noteBox}
              dangerouslySetInnerHTML={{__html: logs[rel.version] ?? "Loading…"}}
            /></td>
          </tr>
        )}
      </React.Fragment>
    ));

  return (
    <>
      {/* 
          UPCOMING FEATURES SECTION
          Edit the 'upcoming' array at the top of this file to modify this section
          You can add, remove, or update items as your roadmap changes
      */}
      {upcoming.length > 0 && (
        <>
          <h2>What's Next?</h2>
          {upcoming.map((u) => (
            <div key={u.version} style={{marginBottom:"1.5rem"}}>
              <h3>{u.version}</h3>
              <p>{u.status}</p>
              <ul>{u.highlights.map((h) => <li key={h}>{h}</li>)}</ul>
            </div>
          ))}
        </>
      )}

      {/* 
          FILTER BUTTONS
          Users can click these to show only Stable, Previous, or Legacy releases
          You can rename these categories by changing the text below
      */}
      {(["stable","previous","legacy"] as const).map((k) => (
        <button
          key={k}
          className={`button button--sm ${
            filter === k ? "button--primary" : "button--secondary"
          }`}
          style={{marginRight:"0.5rem"}}
          onClick={() => {setFilter(k); setOpen(null);}}
        >
          {k === "stable" ? "Stable"           
           : k === "previous" ? "Previous"       
           : "Legacy"}                         
        </button>
      ))}

      {/* 
          MAIN RELEASES TABLE
          This automatically populates with data from releases.unraid.net
          No manual updates needed when new versions are published
      */}
      <table className="table" style={{marginTop:"1rem"}}>
        <thead>
          <tr>
            <th>Status</th><th>Version</th><th>Date</th>
            <th>Download</th><th>MD5</th><th></th>
          </tr>
        </thead>
        <tbody>
          {renderRows(groups[filter], filter === "stable" ? "Stable"
                                 : filter === "previous" ? "Previous"
                                 : "Legacy")}
        </tbody>
      </table>
    </>
  );
}

/* 
   BROWSER WRAPPER: Ensures this component only runs in the browser
   This is required for the live data fetching to work properly
   DO NOT MODIFY this section
*/
export function VersionsTable() {
  return (
    <BrowserOnly fallback={<div>Loading…</div>}>
      {() => <Viewer />}
    </BrowserOnly>
  );
}
