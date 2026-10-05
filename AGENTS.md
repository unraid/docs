# AGENTS.md

## Documentation writing

Before writing or reviewing documentation, read these repository references:

- [Unraid Docs style guide](docs/contribute/style-guide.mdx): audience, tone, accuracy, brevity, clarity, UI formatting, lists, tables, links, and glossary syntax.
- [Repository-local Simple English skill](.agents/skills/limetech-simple-english/SKILL.md): apply the final clarity pass to English documentation and contributor guidance.
- [Documentation profile](.agents/skills/limetech-simple-english/references/documentation.md): apply the shared writing conventions with the complete rules in the skill.
- [Contributor setup and commands](README.md): use the documented development workflow, subject to the validation rules below.
- [Glossary](glossary.yaml): reuse established terms and preserve `%%Term|GlossaryTerm%%` references.

The docs style guide owns repository tone, formatting, and terminology.
The local skill is available without a personal or shared skill installation.
Write complete, plain-English sentences for beginners, experts, and readers
who use English as a second language. Use direct instructions for procedures
and friendly explanations for context. Preserve verified facts, exact UI labels,
commands, warnings, and uncertainty during the clarity pass.

Do not apply English word-choice or spelling rules to translated target text.
Use the locale's conventions and preserve localization tokens and stable anchors.

## Validation

- Do not validate changes in this repo by running the full build unless the user explicitly asks for it.
- `pnpm lint` also runs a full build. Do not use it for routine validation.
- For Markdown-only edits, run Remark on the changed files, for example `pnpm exec remark AGENTS.md --quiet --frail`.
- The build is intentionally considered too expensive and inefficient for routine validation.
- Prefer targeted verification instead, such as reviewing the changed files, running narrow checks relevant to the edit, or using lightweight local validation where available.

## Markdown and Localization

- For explicit heading anchors in MDX, especially translated docs, prefer Docusaurus's MDX-safe comment syntax: `### Heading {/* #stable-anchor */}`.
- Do not use classic heading IDs like `### Heading {#stable-anchor}` in translated MDX files; Crowdin's MDX import parser can reject them even though Docusaurus accepts them during site builds.
- Do not work around heading anchors with standalone `<span id="stable-anchor"></span>` elements unless there is a specific reason the heading comment syntax cannot be used.
