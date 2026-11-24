# Technical Writing Use Cases

Apply the composition contract in `SKILL.md` to every use case. The owning
workflow establishes facts and required structure. Simple English performs the
final prose pass.

## Documentation and contributor guides

Read `references/documentation.md` and apply the complete structural rule
catalog. Preserve commands, code, headings, links, and required contribution
steps. Split mixed explanatory and procedural passages. Keep local product,
glossary, UI, MDX, frontmatter, anchor, and localization rules authoritative.

## Error messages and CLI output

State what happened, state the cause when known, and then give the corrective
action. Preserve quoted upstream errors and identifiers.

> **Before:** The database connection failed because the password for user `app` was not correct. Set `DB_PASSWORD` to the correct password and try again.
>
> **After:** The database connection failed because the password for user `app` was not correct. Set `DB_PASSWORD` to the correct password. Then try again.

## Runbooks and procedures

Read `references/documentation.md`. Use procedural text. Give one imperative
step per sentence. Put conditions and warnings before commands. Preserve safety
levels and exact commands.

## Architecture decisions and technical explanations

Read `references/documentation.md`. Use descriptive text. Preserve
architectural terms and tradeoffs. Do not turn a rejected option into a
prohibition or a recommendation into a requirement.

If a new reader needs system ownership, data boundaries, current behavior, or
tradeoff context to understand the explanation, establish that context from verified product evidence before this final prose pass.

## Incident reports

Use simple past for the timeline. State measured impact when the source
contains measurements. Remove empty phrases, but preserve timestamps,
uncertainty, and the distinction between known facts and hypotheses. Do not
infer measurements that the source omits.

If the incident explanation depends on how products or connected systems
divide responsibility, establish that context from verified product evidence before this final prose
pass. Keep the incident workflow authoritative for the timeline, severity, and
cause status.

> **Before:** Between 14:02 and 14:31 UTC, an issue caused 12% of requests to fail.
>
> **After:** An issue caused 12% of requests to fail between 14:02 and 14:31 UTC.

## Pull-request descriptions and commit messages

Preserve the repository's required PR template and Conventional Commit shape.
Use an imperative commit subject. Apply the 25-word limit to descriptive prose.
Do not delete reviewer considerations, verification details, issue links, or
required headings.

## Release notes and changelogs

Read `references/documentation.md`. Preserve release tooling, categories,
compatibility statements, and migration requirements. State the change and user
action directly. Treat breaking changes as safety instructions: give the
required action before the consequence.

If a reader needs current product behavior or connected-system context to
understand a behavior change, establish that context from verified product evidence before this final
prose pass.

## Agent instructions

Use one independently actionable instruction per sentence. Put each condition
before its action. Preserve exact tool names, routes, priority rules, and
authorization boundaries. Do not replace `should` with `must` unless the policy
already makes the instruction mandatory.

## Comments and docstrings

Read this section for comments and docstrings. Do not apply the documentation
profile unless the user explicitly requests it.

Explain intent, constraints, and externally observable behavior. Preserve code
syntax, type names, parameter names, return contracts, and generated-document
formats.

## Support and status text

State the observed condition, its impact, and the next action. Keep necessary
empathy, but remove generic apology filler that hides the facts.

## Translation and localization inputs

Read this section for localization inputs and localized target content. Preserve
the locale owner's terminology, grammar, plural rules, and review process. Do
not apply English STE rules to localized target text.

Use consistent terminology and complete grammar. Preserve localization tokens,
message identifiers, plural rules, and interpolation syntax.

## UI guidance

Use short procedural text when it helps users understand a control, choose an
option, complete a task, avoid a problem, or understand a visible result. If it
does not serve one of those purposes, omit it. Prefer no helper text, tooltip,
note, or description over text that repeats a label, fills space, or explains an
implementation detail.

Keep text that users need for accessibility, instructions, warnings, errors,
status, or visible consequences. Preserve established product terminology,
control labels, accessibility names, and the owning design system's voice.

## Excluded voices

Do not apply this skill automatically to marketing, intentional brand voice,
legal text, or user-provided quotations. Apply it only when the user explicitly
requests Simple English for that text.
