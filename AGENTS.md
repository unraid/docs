# AGENTS.md

## Validation

- Do not validate changes in this repo by running the full build unless the user explicitly asks for it.
- The build is intentionally considered too expensive and inefficient for routine validation.
- Prefer targeted verification instead, such as reviewing the changed files, running narrow checks relevant to the edit, or using lightweight local validation where available.

## Markdown and Localization

- For explicit heading anchors in MDX, especially translated docs, prefer Docusaurus's MDX-safe comment syntax: `### Heading {/* #stable-anchor */}`.
- Do not use classic heading IDs like `### Heading {#stable-anchor}` in translated MDX files; Crowdin's MDX import parser can reject them even though Docusaurus accepts them during site builds.
- Do not work around heading anchors with standalone `<span id="stable-anchor"></span>` elements unless there is a specific reason the heading comment syntax cannot be used.
