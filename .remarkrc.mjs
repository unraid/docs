// @ts-check
import remarkFrontmatter from 'remark-frontmatter'
import remarkGfm from 'remark-gfm'
import remarkMdx from 'remark-mdx'
import remarkPresetLintRecommended from 'remark-preset-lint-recommended'
import remarkLintListItemIndent from 'remark-lint-list-item-indent'
import remarkLintOrderedListMarkerStyle from 'remark-lint-ordered-list-marker-style'
import remarkLintNoUndefinedReferences from 'remark-lint-no-undefined-references'
import remarkLintNoDuplicateDefinitions from 'remark-lint-no-duplicate-definitions'
import remarkLintNoUnusedDefinitions from 'remark-lint-no-unused-definitions'
import remarkLintDefinitionCase from 'remark-lint-definition-case'
import remarkLintFencedCodeMarker from 'remark-lint-fenced-code-marker'
import remarkLintCodeBlockStyle from 'remark-lint-code-block-style'
import remarkLintHeadingStyle from 'remark-lint-heading-style'
import remarkLintLinkTitleStyle from 'remark-lint-link-title-style'
import remarkLintMaximumLineLength from 'remark-lint-maximum-line-length'
import remarkLintNoFileNameOuterDashes from 'remark-lint-no-file-name-outer-dashes'
import remarkLintNoHeadingPunctuation from 'remark-lint-no-heading-punctuation'
import remarkLintNoMultipleToplevelHeadings from 'remark-lint-no-multiple-toplevel-headings'
import remarkLintNoShellDollars from 'remark-lint-no-shell-dollars'
import jsxContentSpacing from './remark-jsx-spacing.js'

const plugins = [
    // MDX support
    remarkMdx,
    remarkFrontmatter,
    remarkGfm,

    // Base recommended rules
    remarkPresetLintRecommended,

    // Custom lint rule for Crowdin compatibility (reports missing newlines)
    jsxContentSpacing,

    // List formatting
    [remarkLintListItemIndent, 'one'],  // Consistent list indentation
    [remarkLintOrderedListMarkerStyle, '.'],  // Use . for ordered lists

    // Code formatting
    [remarkLintFencedCodeMarker, '`'],  // Use backticks for code blocks
    [remarkLintCodeBlockStyle, 'fenced'],  // Use fenced code blocks
    [remarkLintNoShellDollars, false],  // Allow $ in shell examples

    // Heading formatting
    [remarkLintHeadingStyle, 'atx'],  // Use # style headings
    [remarkLintNoHeadingPunctuation, false],  // Allow punctuation in headings (for questions)
    remarkLintNoMultipleToplevelHeadings,  // Only one # heading per file

    // Link and reference formatting
    [remarkLintLinkTitleStyle, '"'],  // Use double quotes for link titles
    [remarkLintNoUndefinedReferences, false],  // Disable to avoid conflicts with MDX admonitions
    remarkLintNoDuplicateDefinitions,
    remarkLintNoUnusedDefinitions,
    [remarkLintDefinitionCase, false],  // Don't enforce case for definitions

    // General formatting
    [remarkLintMaximumLineLength, false],  // Disable line length limit (tables need this)
    remarkLintNoFileNameOuterDashes,  // No leading/trailing dashes in filenames

    // Disable rules that conflict with MDX
    // Disable rules that conflict with MDX
    ['remark-lint-no-html', false],  // Allow HTML in MDX
    ['remark-lint-no-inline-padding', false],  // Allow padding in inline code
]

const remarkConfig = {
  plugins,
  settings: {
    bullet: '-',  // Use - for unordered lists
    emphasis: '*',  // Use * for emphasis
    // Note: strong is omitted to avoid MDX conflicts
    fences: true, // Use fenced code blocks
    listItemIndent: 'one',  // One space after list markers
    quote: '"',  // Use double quotes (standard for Docusaurus)
    rule: '-',  // Use - for horizontal rules (not ***)
    tightDefinitions: true,
    hardBreakEscape: false, // Avoid escaping hard breaks with trailing backslashes
  },
};

export default remarkConfig
