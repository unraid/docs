/* src/components/VersionsTable.tsx
   
   PURPOSE: Automatically displays Unraid release versions in categorized tables
   - Fetches live data from https://releases.unraid.net/json
   - Auto-categorizes releases: Stable (current minor), Previous (last minor), Legacy (older)
   - No manual updates needed when new versions are released
   
   ================================================================================
   COMPREHENSIVE MAINTENANCE GUIDE FOR DOCUMENTATION MAINTAINERS
   ================================================================================
   
   WHEN TO UPDATE: Update this content when a NEW MAJOR VERSION is released (e.g., 7.2.0, 8.0.0, etc.)
   
   STEP-BY-STEP UPDATE PROCESS:
   
   Step 1: Copy "stable" → "previous"
   - Find the supportPolicies.stable section below
   - Copy the entire content (title, description, and all details)
   - Paste it into supportPolicies.previous
   - Update any version references (e.g., change "7.1.x" to "7.0.x" if moving from 7.1.x to 7.2.x)
   
   Step 2: Copy "previous" → "legacy"
   - Find the supportPolicies.previous section
   - Copy the entire content
   - Paste it into supportPolicies.legacy
   - Update version references and dates as needed
   
   Step 3: Update "stable" with new version info
   - Update the title and description for the new version
   - Update all version references in the details
   - Update dates and license eligibility information
   - Update kernel and feature information
   
   Step 4: Update "upcoming" section
   - Remove items that have become current stable releases
   - Add new upcoming versions
   - Update target dates and feature lists
   
   Step 5: Update "Future Release Information" section
   - Update the version number mentioned in the text
   - Update any other version-specific references
   
   EXAMPLE TRANSITION: From 7.1.x to 7.2.x
   
   Before (Current State):
   - stable: 7.1.x info
   - previous: 7.0.x info
   - legacy: 6.x series info
   
   After (New State):
   - stable: 7.2.x info (new)
   - previous: 7.1.x info (was stable)
   - legacy: 7.0.x info (was previous)
   
   WHAT TO UPDATE IN EACH SECTION:
   
   Stable (Current Release):
   - Version numbers (e.g., "7.2.x", "7.2.0")
   - Kernel information (e.g., "Linux 6.12 LTS")
   - License eligibility dates
   - Bug fix and security update version references
   - Feature descriptions
   
   Previous Release:
   - Version numbers (e.g., "7.1.x", "7.1.0")
   - Security update version references
   - Any version-specific details
   
   Legacy (EOL):
   - Version numbers in description
   - Any version-specific details
   
   Upcoming Features:
   - Version numbers
   - Target dates
   - Feature lists
   - Remove items that become current
   
   IMPORTANT NOTES:
   - Keep the structure: Don't change the object names (stable, previous, legacy)
   - Update all references: Make sure version numbers are consistent throughout
   - Test the page: After making changes, verify the page displays correctly
   - Backup: Consider backing up the file before making major changes
   
   QUICK REFERENCE COMMANDS:
   - Copy: Ctrl+C (Windows) or Cmd+C (Mac)
   - Paste: Ctrl+V (Windows) or Cmd+V (Mac)
   - Select All: Ctrl+A (Windows) or Cmd+A (Mac)
   - Find: Ctrl+F (Windows) or Cmd+F (Mac)
   - Replace: Ctrl+H (Windows) or Cmd+H (Mac)
   
   MAINTENANCE CHECKLIST:
   - [ ] Copied stable → previous
   - [ ] Copied previous → legacy
   - [ ] Updated stable with new version info
   - [ ] Updated upcoming features
   - [ ] Updated future release information
   - [ ] Verified all version references are consistent
   - [ ] Tested the page displays correctly
   
   NEED HELP?
   - Check that all brackets {} and quotes "" are properly matched
   - Verify that commas separate all items in arrays and objects
   - Ensure version numbers are consistent throughout the file
   - Test the page after making changes
   
   ================================================================================
   WHAT YOU CAN UPDATE (NON-VERSION RELATED):
   ================================================================================
   1. The "What's Next" section below (add/remove upcoming features)
   2. Category names if you want different terminology
   3. Styling colors if you want different appearance
   4. Support policy information for each version category
   
   ================================================================================
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
   ================================================================================
   EDITABLE SECTION: Support Policy Information
   ================================================================================
   
   ⚠️  CRITICAL: This is the main section that needs updating when new versions are released!
   
   UPDATE PROCESS (when new major version like 7.2.0 is released):
   
   1. COPY "stable" → "previous" (copy the entire stable object)
   2. COPY "previous" → "legacy" (copy the entire previous object)  
   3. UPDATE "stable" with new version information
   4. UPDATE "upcoming" section for next version
   5. UPDATE dates and version references
   
   Example transition from 7.1.x to 7.2.x:
   - stable: 7.2.x info (new)
   - previous: 7.1.x info (was stable)
   - legacy: 7.0.x info (was previous)
   
   FORMATTING IS AUTOMATIC - just type plain text!
   No HTML tags needed - just update the text in quotes!
   
   ================================================================================
 */
const supportPolicies = {
  stable: {
    title: "Current/Stable Release",
    description: "The 7.1.x series is our current/stable release",
    details: [
      { type: "header", content: "Kernel: Linux 6.12 LTS" },
      { type: "header", content: "ZFS Version: OpenZFS 2.1.x" },
      { type: "text", content: "Primary features are detailed in the 7.1.0 Release Notes." },
      { type: "header", content: "License Information:" },
      { type: "bullet", content: "If your license extension expires on or after 2025-05-05, you are eligible for all releases in this series." },
      { type: "header", content: "Update Recommendations:" },
      { type: "bullet", content: "If you are experiencing issues with earlier releases, we recommend updating to the latest release as it may resolve the issue." },
      { type: "header", content: "Release Status:" },
      { type: "bullet", content: "This series is feature complete; no new features are expected." },
      { type: "bullet", content: "Bug fixes will be backported to 7.1.x as appropriate until the release of 7.2.0." },
      { type: "bullet", content: "Security updates will be provided for 7.1.x as appropriate until the release of 7.3.0." },
      { type: "header", content: "Future Releases:" },
      { type: "bullet", content: "Additional public beta/RC releases for 7.1.x are unlikely, but any announcements will be made in the prerelease forum." },
      { type: "bullet", content: "New stable releases of 7.1.x will be announced in the forum." }
    ]
  },
  previous: {
    title: "Previous Release",
    description: "The 7.0.x series is no longer being actively developed",
    details: [
      { type: "header", content: "Kernel: Linux 6.6 LTS" },
      { type: "text", content: "Primary features are detailed in the 7.0.0 Release Notes." },
      { type: "header", content: "License Information:" },
      { type: "bullet", content: "If your license extension expires on or after 2025-01-09, you are eligible for all releases in this series." },
      { type: "header", content: "Update Recommendations:" },
      { type: "bullet", content: "Until Unraid 7.2.0 is released, 7.0.x will only receive updates for serious security issues, with no bug fixes or new features." },
      { type: "bullet", content: "All users are encouraged to upgrade to the current release." },
      { type: "header", content: "Future Releases:" },
      { type: "bullet", content: "Additional public beta/RC releases for 7.0.x are unlikely, but any announcements will be made in the prerelease forum." },
      { type: "bullet", content: "Any new stable releases of 7.0.x will be announced in the forum." }
    ]
  },
  legacy: {
    title: "End of Life (EOL) Releases",
    description: "Unraid 6.12.x, 6.11.x, 6.10.x, and earlier have reached End of Life (EOL)",
    details: [
      { type: "header", content: "Support Status:" },
      { type: "bullet", content: "These versions have reached End of Life (EOL) and are not supported." },
      { type: "bullet", content: "No further updates will be provided." },
      { type: "bullet", content: "Users are encouraged to upgrade to the current release as soon as possible." }
    ]
  }
};

/* 
   ================================================================================
   EDITABLE SECTION: Upcoming Features
   ================================================================================
   
   ⚠️  UPDATE THIS SECTION when planning new releases!
   
   - Add new upcoming versions with target dates and feature highlights
   - Remove items when they become current stable releases
   - Update version numbers, dates, and feature lists as needed
   
   ================================================================================
 */
const upcoming = [
  {
    version: "7.2.x",
    status:  "In development – target Q4 2025",
    highlights: [
      "Built-in WireGuard GUI v2",
      "UI dark-mode scheduler", 
      "ZFS automatic pool trimming",
    ],
  },
  // Add more upcoming versions here if needed:
  // {
  //   version: "8.0.x",
  //   status: "Planning phase – target 2026",
  //   highlights: ["New feature X", "Improvement Y"],
  // },
];





/* 
   SUPPORT POLICY INFORMATION
   This section explains what users can expect for each version category
   The information is dynamically generated based on detected versions
*/
const getSupportInfo = (currentMinor: string, previousMinor: string) => ({
  stable: {
    title: "Current/Stable Release",
    description: `The ${currentMinor}.x series is our current/stable release`,
    details: [
      `The primary features are listed in the ${currentMinor}.0 release notes`,
      "This series uses the Linux 6.12 LTS kernel with OpenZFS 2.1.x",
      "If your license extension expires on or after 2025-05-05 you are eligible for all releases in this series",
      "If you are having issues with earlier releases, we generally recommend updating to the latest release as it may resolve the issue",
      "While there may be additional releases in this series, no new features are expected; this series is feature complete",
      `Until ${getNextMinor(currentMinor)}.0 is released we will backport bug fixes to ${currentMinor}.x as appropriate`,
      `Until ${getNextMinor(getNextMinor(currentMinor))}.0 is released we will provide security updates to ${currentMinor}.x as appropriate`,
      `There probably won't be additional public beta/rc releases for ${currentMinor}.x, but if there are they will be announced in the prerelease forum`,
      `New stable releases of ${currentMinor}.x will be announced in the forum`
    ]
  },
  previous: {
    title: "Previous Release",
    description: `The ${previousMinor}.x series is no longer being actively developed`,
    details: [
      `The primary features are listed in the ${previousMinor}.0 release notes`,
      "This series uses the Linux 6.6 LTS kernel",
      "If your license extension expires on or after 2025-01-09 you are eligible for all releases in this series",
      `Until Unraid ${getNextMinor(currentMinor)}.0 is released, ${previousMinor}.x will get updates for serious security issues only, no bug fixes or new features`,
      "All users are encouraged to upgrade to the current release",
      "For more information about license extensions, see the <a href='https://docs.unraid.net/unraid-os/faq/licensing-faq/#what-happens-if-i-dont-extend-my-starter-or-unleashed-license'>licensing FAQ</a>",
      `There probably won't be additional public beta/rc releases for ${previousMinor}.x, but if there are they will be announced in the prerelease forum`,
      `Any new stable releases of ${previousMinor}.x will be announced in the forum`
    ]
  },
  legacy: {
    title: "End of Life (EOL) Releases",
    description: `Unraid ${previousMinor}.x and earlier have reached End of Life (EOL)`,
    details: [
      "They are not supported and will receive no further updates",
      "Users should upgrade to the current release ASAP"
    ]
  }
});

// Helper function to get the next minor version
const getNextMinor = (minor: string): string => {
  const [major, minorNum] = minor.split(".");
  return `${major}.${parseInt(minorNum) + 1}`;
};

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
  
  // Remove navigation and layout elements
  dom.querySelectorAll(
    "nav, .navbar, .sidebar, .breadcrumbs, .theme-doc-breadcrumbs," +
      ".theme-doc-toc-desktop, .theme-doc-toc-mobile, .pagination-nav," +
      "header, footer, .header, .footer"
  ).forEach((el) => el.remove());
  
  // Clean up any problematic CSS that might cause alignment issues
  dom.querySelectorAll("*").forEach((el) => {
    if (el instanceof HTMLElement && el.style) {
      // Remove positioning that might cause cutoff
      el.style.position = "";
      el.style.left = "";
      el.style.right = "";
      el.style.marginLeft = "";
      el.style.marginRight = "";
      el.style.paddingLeft = "";
      el.style.paddingRight = "";
      el.style.width = "";
      el.style.maxWidth = "";
      el.style.overflow = "";
      el.style.textAlign = "";
      el.style.float = "";
      el.style.display = "";
    }
  });
  
  const main = dom.querySelector("main .markdown, main article, main") ?? dom.body;
  const content = main.innerHTML;
  const css = `
    <style>
      .release-notes{width:100%;max-width:100%;margin:0;padding:0;box-sizing:border-box;text-align:left;display:block;min-width:100%}
      .release-notes *{box-sizing:border-box;max-width:100%;margin-left:0!important;left:auto!important;right:auto!important;float:none!important;position:static!important;width:auto!important;min-width:0!important}
      .release-notes article{margin:0!important;padding:0!important;width:100%!important;max-width:100%!important;min-width:100%!important;display:block!important;box-sizing:border-box!important}
      .release-notes article *{width:100%!important;max-width:100%!important;min-width:0!important;box-sizing:border-box!important}
      .release-notes h1,.release-notes h2,.release-notes h3,.release-notes h4,.release-notes h5,.release-notes h6{margin:0 0 0.5rem 0;padding:0;text-align:left;width:100%!important;max-width:100%!important;min-width:0!important}
      .release-notes p{margin:0 0 0.5rem 0;padding:0;text-align:left;width:100%!important;max-width:100%!important;min-width:0!important}
      .release-notes ul,.release-notes ol{margin:0 0 0.5rem 0;padding-left:1.5rem;text-align:left;width:100%!important;max-width:100%!important;min-width:0!important}
      .release-notes li{margin:0 0 0.25rem 0;padding:0;text-align:left;width:100%!important;max-width:100%!important;min-width:0!important}
      .release-notes .hash-link,.release-notes a.anchor,.release-notes .header-anchor{display:none}
      .release-notes table{width:100%;max-width:100%;margin:0 0 0.5rem 0;min-width:0}
      .release-notes pre{max-width:100%;overflow-x:auto;white-space:pre-wrap;word-wrap:break-word;width:100%!important;min-width:0!important}
      .release-notes blockquote{margin:0 0 0.5rem 0;padding:0.5rem 1rem;border-left:3px solid #ccc;width:100%!important;min-width:0!important}
      .release-notes code{background:#f5f5f5;padding:0.2rem 0.4rem;border-radius:3px;font-size:0.9em}
      .release-notes img{max-width:100%;height:auto;min-width:0}
      .release-notes hr{margin:1rem 0;border:none;border-top:1px solid #ddd;width:100%!important;min-width:0!important}
      .release-notes div{width:100%!important;max-width:100%!important;min-width:100%!important}
      .release-notes section{width:100%!important;max-width:100%!important;min-width:100%!important}
      @media (max-width: 768px) {
        .release-notes{width:100%;max-width:100%;min-width:100%}
        .release-notes *{width:100%!important;max-width:100%!important;min-width:0!important}
      }
    </style>`;
  return `${css}<div class="release-notes">${content}</div>`;
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
    padding: "1.5rem",
    fontSize: "0.9rem",
    lineHeight: 1.6,
    overflow: "visible",
    wordWrap: "break-word",
    width: "100%",
    maxWidth: "100%",
    boxSizing: "border-box",
    textAlign: "left",
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
            <td colSpan={6} style={{
              padding: "0",
              border: "none",
              backgroundColor: "transparent",
              textAlign: "center",
              width: "100%",
              maxWidth: "100%",
              minWidth: "100%"
            }}>
              <div style={{
                ...noteBox,
                width: "100%",
                maxWidth: "100%",
                minWidth: "100%",
                margin: "0",
                padding: "1.5rem",
                boxSizing: "border-box"
              }}>
                <div 
                  style={{
                    margin: "0",
                    padding: "0",
                    width: "100%",
                    maxWidth: "100%",
                    minWidth: "100%",
                    boxSizing: "border-box",
                  }}
                  dangerouslySetInnerHTML={{__html: logs[rel.version] ?? "Loading…"}}
                />
              </div>
            </td>
          </tr>
        )}
      </React.Fragment>
    ));

  return (
    <>


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
          SUPPORT POLICY INFORMATION
          Shows different support information based on the selected tab
          This helps users understand what to expect for each version category
      */}
      <div style={{
        background: colorMode === "dark" ? "#1b1b1d" : "#f9f9f9",
        border: `1px solid ${colorMode === "dark" ? "#444" : "#ddd"}`,
        borderRadius: "8px",
        padding: "1.5rem",
        marginTop: "1.5rem",
        marginBottom: "1.5rem"
      }}>
        <h3 style={{marginTop: 0, marginBottom: "1rem"}}>
          {supportPolicies[filter].title}
        </h3>
        <p style={{marginBottom: "1rem", fontWeight: "500"}}>
          {supportPolicies[filter].description}
        </p>
        <ul style={{margin: 0, paddingLeft: "0"}}>
          {supportPolicies[filter].details.map((detail, index) => {
            if (detail.type === "bullet") {
              return (
                <li key={index} style={{
                  marginBottom: "0.5rem",
                  listStyle: "none",
                  position: "relative",
                  paddingLeft: "1.5rem"
                }}>
                  <span style={{
                    position: "absolute",
                    left: "0",
                    top: "0"
                  }}>•</span>
                  <span>{detail.content}</span>
                </li>
              );
            } else if (detail.type === "header") {
              return (
                <div key={index} style={{
                  marginTop: index > 0 ? "1.5rem" : "0",
                  marginBottom: "0.75rem",
                  paddingLeft: "0",
                  fontWeight: "600",
                  fontSize: "1rem"
                }}>
                  {detail.content}
                </div>
              );
            } else {
              return (
                <div key={index} style={{
                  marginBottom: "0.5rem",
                  paddingLeft: "0"
                }}>
                  {detail.content}
                </div>
              );
            }
          })}
        </ul>
      </div>

      {/* 
          MAIN RELEASES TABLE
          This automatically populates with data from releases.unraid.net
          No manual updates needed when new versions are published
      */}
      <table className="table" style={{
        marginTop:"1rem",
        width: "100%",
        maxWidth: "100%",
        minWidth: "100%"
      }}>
        <thead>
          <tr>
            <th style={{width: "12%"}}>Status</th>
            <th style={{width: "15%"}}>Version</th>
            <th style={{width: "15%"}}>Date</th>
            <th style={{width: "35%"}}>Download</th>
            <th style={{width: "18%"}}>MD5</th>
            <th style={{width: "5%"}}></th>
          </tr>
        </thead>
        <tbody>
          {renderRows(groups[filter], filter === "stable" ? "Stable"
                                 : filter === "previous" ? "Previous"
                                 : "Legacy")}
        </tbody>
      </table>

      {/* 
          UPCOMING FEATURES SECTION
          Edit the 'upcoming' array at the top of this file to modify this section
          You can add, remove, or update items as your roadmap changes
      */}
      {upcoming.length > 0 && (
        <>
          <h2 style={{marginTop: "2rem", marginBottom: "1rem"}}>What's Next?</h2>
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
          FUTURE RELEASE INFORMATION
          Collapsible section with general information about beta/RC testing
          This can be expanded/collapsed by users
      */}
      <div style={{marginTop:"2rem"}}>
        <details style={{
          background: colorMode === "dark" ? "#1b1b1d" : "#f9f9f9",
          border: `1px solid ${colorMode === "dark" ? "#444" : "#ddd"}`,
          borderRadius: "8px",
          padding: "1rem"
        }}>
          <summary style={{
            cursor: "pointer",
            fontWeight: "600",
            fontSize: "1.1rem",
            marginBottom: "0.5rem"
          }}>
            Future release information
          </summary>
          <div style={{marginTop: "1rem"}}>
            <p>We are currently working on Unraid 7.2.x and will announce features as we get closer to a public beta, which will be announced in the <a href='https://forums.unraid.net/'>prerelease forum</a>.</p>
            <p>If you are interested in running betas and RCs, check the <a href='https://forums.unraid.net/'>prerelease forum</a> for upgrade instructions and support. We appreciate the community's involvement in testing on a wide range of hardware and with varied use cases to help identify potential issues.</p>
            <ul>
              <li>If you find an issue in a beta or RC, please start a new thread in the <a href='https://forums.unraid.net/'>prerelease forum</a>, providing as much detail as you can for us to be able to reproduce the problem. Please include your diagnostics.</li>
              <li>For more information about pre-releases, see the <a href="../troubleshooting/licensing-faq.md">licensing FAQ</a>.</li>
            </ul>
          </div>
        </details>
      </div>
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
