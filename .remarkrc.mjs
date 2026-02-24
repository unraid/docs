// @ts-check
import remarkFrontmatter from "remark-frontmatter";
import remarkGfm from "remark-gfm";
import remarkMdx from "remark-mdx";
import remarkDirective from "remark-directive";
import remarkComment from "@slorber/remark-comment";
import remarkPresetLintRecommended from "remark-preset-lint-recommended";
import remarkLintListItemIndent from "remark-lint-list-item-indent";
import remarkLintOrderedListMarkerStyle from "remark-lint-ordered-list-marker-style";
import remarkLintNoUndefinedReferences from "remark-lint-no-undefined-references";
import remarkLintNoDuplicateDefinitions from "remark-lint-no-duplicate-definitions";
import remarkLintNoUnusedDefinitions from "remark-lint-no-unused-definitions";
import remarkLintDefinitionCase from "remark-lint-definition-case";
import remarkLintFencedCodeMarker from "remark-lint-fenced-code-marker";
import remarkLintCodeBlockStyle from "remark-lint-code-block-style";
import remarkLintHeadingStyle from "remark-lint-heading-style";
import remarkLintLinkTitleStyle from "remark-lint-link-title-style";
import remarkLintMaximumLineLength from "remark-lint-maximum-line-length";
import remarkLintNoFileNameOuterDashes from "remark-lint-no-file-name-outer-dashes";
import remarkLintNoHeadingPunctuation from "remark-lint-no-heading-punctuation";
import remarkLintNoMultipleToplevelHeadings from "remark-lint-no-multiple-toplevel-headings";
import remarkLintNoShellDollars from "remark-lint-no-shell-dollars";

const plugins = [
  // MDX support
  remarkMdx,
  remarkDirective,
  remarkFrontmatter,
  remarkGfm,
  remarkComment,

  // Base recommended rules
  remarkPresetLintRecommended,

  // List formatting
  [remarkLintListItemIndent, "one"],
  [remarkLintOrderedListMarkerStyle, "."],

  // Code formatting
  [remarkLintFencedCodeMarker, "`"],
  [remarkLintCodeBlockStyle, "fenced"],
  [remarkLintNoShellDollars, false],

  // Heading formatting
  [remarkLintHeadingStyle, "atx"],
  [remarkLintNoHeadingPunctuation, false],
  remarkLintNoMultipleToplevelHeadings,

  // Link and reference formatting
  [remarkLintLinkTitleStyle, '"'],
  [remarkLintNoUndefinedReferences, false],
  remarkLintNoDuplicateDefinitions,
  remarkLintNoUnusedDefinitions,
  [remarkLintDefinitionCase, false],

  // General formatting
  [remarkLintMaximumLineLength, false],
  remarkLintNoFileNameOuterDashes,

  // Disable rules that conflict with MDX/JSX
  ["remark-lint-no-html", false],
  ["remark-lint-no-inline-padding", false],
];

export const remarkConfig = {
  plugins,
  settings: {
    bullet: "-",
    emphasis: "*",
    fences: true,
    listItemIndent: "one",
    quote: '"',
    rule: "-",
    tightDefinitions: true,
    hardBreakEscape: false,
  },
};

export default remarkConfig;
