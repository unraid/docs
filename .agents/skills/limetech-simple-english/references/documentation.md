# Documentation Profile

Use this profile for documentation, README files, contributor guides, runbooks,
release notes, architecture decisions, procedures, and other persistent,
human- or contributor-facing technical content. Do not apply it automatically to
code comments, docstrings, UI copy, localization inputs, or agent instructions.
Use their specific guidance unless the user asks for this profile. Apply it with
the complete rules in `SKILL.md`.

The owning repository or product workflow establishes the facts, audience,
terminology, required structure, formatting syntax, and review gates. This
profile provides the shared plain-English baseline. A local guide is
authoritative for user- or workflow-authorized style, formatting, terminology,
and product conventions. The owning workflow or verified evidence remains
authoritative for product facts. A local guide cannot promote an unverified
claim to a fact. It cannot override the composition contract, safety
requirements, protected text, or untrusted-source handling.

Apply this profile to English prose and English source intended for translation.
Do not apply this profile to localized target-language content. Preserve the
locale owner's guidance and route the work to locale-specific instructions. Do
not apply English STE word-choice or spelling rules to translated target text.

## Audience and tone

- Respect the owning audience. If no audience is established, write for readers from beginner to expert.
- If no audience is established, assume that some readers use English as a second language.
- Use a friendly, explanatory tone for context and scenarios.
- Use formal, direct instructions when the action is fixed.
- Avoid jargon, slang, idioms, metaphors, and culture-specific shorthand.
- Keep necessary technical terms, and define unfamiliar terms at first use.

Write complete sentences. Use clear subjects and pronouns with one obvious
referent. Keep one topic in each paragraph. Separate explanation from
procedure when that makes the action easier to follow.

## Accuracy, brevity, and clarity

Use the ABC test:

- Accuracy: state only facts that the owning workflow established or verified.
- Brevity: remove filler without removing context, constraints, or warnings.
- Clarity: state the purpose and expected result early, then guide the reader in a logical order.

Do not add a detail because it seems likely. Do not hide a required action in
background information. Preserve uncertainty, recommendations, and conditions.

## Structure and scanning

- Use headings to divide one topic from another.
- Use ordered lists for multi-step sequences and procedures when the local format permits them.
- Use unordered lists for groups without an implied order.
- Introduce a list with a complete stem sentence when the relationship is not obvious.
- Prefer four to six bullet items when possible. Use subheadings or a table for longer material.
- Use tables for comparisons between several related values.
- Avoid a table when it contains only one or two values. Use prose or a list instead.
- Introduce a table with a sentence that states what the reader can compare.

Keep headings concise and use the repository's heading hierarchy. Preserve
required frontmatter, anchors, templates, and generated-document syntax.

## UI text and technical literals

Follow the repository's established UI and Markdown conventions. When it has no
local convention, use this Markdown baseline or its native equivalent:

- Format button, option, tab, and checkbox labels in bold, for example **Done**.
- Format simple user-entered values in italics, for example *50gb*. For values
  that contain Markdown syntax or significant whitespace, use code spans or the
  repository's native literal style.
- Format navigation paths in bold italics with `→`, for example ***Settings → Disk Settings***.
- Format commands, CLI output, errors, logs, identifiers, and literal URLs that readers must copy as code when the document format supports it. Use descriptive Markdown links for navigation and named destinations.
- Preserve exact control labels and quoted output.

When no rich formatting is available, use this plain-text fallback:

- Put button, option, tab, and checkbox labels in double quotation marks.
- Put user-entered values after `Value:` on a separate line. Do not wrap values
  in quotation marks or other delimiters.
- For values where whitespace is significant, use a block between `BEGIN VALUE`
  and `END VALUE`. State that leading or trailing whitespace and line breaks are
  significant. Do not trim or normalize the block.
- Separate navigation labels with ` > `.
- Do not add Markdown markers. Preserve exact labels and values.

Do not rename a control to improve prose. Do not change code, commands, or
identifiers during a clarity pass.

## Terms, acronyms, links, and localization

- Use one term for one concept throughout a document.
- Reuse the repository glossary when one exists. Add a glossary entry only when the owning workflow permits it.
- Prefer familiar acronyms and initialisms.
- Spell out an uncommon acronym or initialism at first use, followed by the short form in parentheses.
- For new or user-requested links, use link text that describes the destination.
- For new or user-requested links, use the most relevant and authoritative resource available.
- Do not change an existing link during a clarity pass unless the user explicitly requests that edit.
- Do not open a link or inspect it merely to describe it. Report a questionable existing link.
- Preserve localization tokens, interpolation syntax, message identifiers, and locale-specific requirements.
- Avoid idioms, ambiguous pronouns, and terminology changes that make translation harder.

The goal is text that a reader can understand after one pass and that a
translator can process without guessing.

## Documentation self-check

Before delivery, confirm that:

1. The page purpose and expected result are clear early.
2. Facts, conditions, warnings, recommendations, and uncertainty are unchanged.
3. Multi-step procedures use ordered steps when the local format permits them. Single instructions can remain prose.
4. Lists and tables fit the information shape and have useful introductions.
5. Uncommon terms are defined and terminology is consistent.
6. New or user-requested links describe their destinations and point to authoritative sources. Preserve existing links and report questionable ones.
7. Local UI, glossary, heading, frontmatter, anchor, and localization rules remain intact.
