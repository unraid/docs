// @ts-check
import remarkFrontmatter from "remark-frontmatter";
import remarkGfm from "remark-gfm";
import remarkMdx from "remark-mdx";
import remarkDirective from "remark-directive";
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
import { visit, SKIP } from "unist-util-visit";
import jsxContentSpacing from "./remark-jsx-spacing.js";

const plugins = [
  // MDX support
  remarkMdx,
  remarkDirective,
  directiveColonSafe,
  stripDanglingDirectiveClosings,
  remarkFrontmatter,
  remarkGfm,

  // Base recommended rules
  remarkPresetLintRecommended,

  // Custom lint rule for Crowdin compatibility (reports missing newlines)
  jsxContentSpacing,

  // List formatting
  [remarkLintListItemIndent, "one"], // Consistent list indentation
  [remarkLintOrderedListMarkerStyle, "."], // Use . for ordered lists

  // Code formatting
  [remarkLintFencedCodeMarker, "`"], // Use backticks for code blocks
  [remarkLintCodeBlockStyle, "fenced"], // Use fenced code blocks
  [remarkLintNoShellDollars, false], // Allow $ in shell examples

  // Heading formatting
  [remarkLintHeadingStyle, "atx"], // Use # style headings
  [remarkLintNoHeadingPunctuation, false], // Allow punctuation in headings (for questions)
  remarkLintNoMultipleToplevelHeadings, // Only one # heading per file

  // Link and reference formatting
  [remarkLintLinkTitleStyle, '"'], // Use double quotes for link titles
  [remarkLintNoUndefinedReferences, false], // Disable to avoid conflicts with MDX admonitions
  remarkLintNoDuplicateDefinitions,
  remarkLintNoUnusedDefinitions,
  [remarkLintDefinitionCase, false], // Don't enforce case for definitions

  // General formatting
  [remarkLintMaximumLineLength, false], // Disable line length limit (tables need this)
  remarkLintNoFileNameOuterDashes, // No leading/trailing dashes in filenames

  // Disable rules that conflict with MDX
  // Disable rules that conflict with MDX
  ["remark-lint-no-html", false], // Allow HTML in MDX
  ["remark-lint-no-inline-padding", false], // Allow padding in inline code
];

const remarkConfig = {
  plugins,
  settings: {
    bullet: "-", // Use - for unordered lists
    emphasis: "*", // Use * for emphasis
    // Note: strong is omitted to avoid MDX conflicts
    fences: true, // Use fenced code blocks
    listItemIndent: "one", // One space after list markers
    quote: '"', // Use double quotes (standard for Docusaurus)
    rule: "-", // Use - for horizontal rules (not ***)
    tightDefinitions: true,
    hardBreakEscape: false, // Avoid escaping hard breaks with trailing backslashes
  },
};

export default remarkConfig;

function directiveColonSafe() {
  const data = this.data();
  const extensions =
    data.toMarkdownExtensions || (data.toMarkdownExtensions = []);

  for (const extension of extensions) {
    if (
      extension &&
      typeof extension === "object" &&
      "handlers" in extension &&
      extension.handlers &&
      "containerDirective" in extension.handlers &&
      Array.isArray(extension.unsafe)
    ) {
      extension.unsafe = extension.unsafe.filter(
        (rule) => rule.character !== ":"
      );

      wrapContainerDirectiveHandler(extension);
    }
  }

  data.toMarkdownExtensions = extensions;
}

function wrapContainerDirectiveHandler(extension) {
  const { containerDirective } = extension.handlers;

  if (typeof containerDirective !== "function") {
    return;
  }

  extension.handlers.containerDirective = function wrappedContainerDirective(
    node,
    parent,
    state,
    info
  ) {
    const previous = state.bulletLastUsed;
    state.bulletLastUsed = undefined;

    try {
      const output = containerDirective(node, parent, state, info);
      return collapseDirectivePadding(normalizeDirectiveFences(output));
    } finally {
      state.bulletLastUsed = previous;
    }
  };
}

function collapseDirectivePadding(value) {
  return value
    .replace(/(^|\n)([ \t]*:::[^\n]*?)\n\n/g, "$1$2\n")
    .replace(/\n\n([ \t]*:::)/g, "\n$1");
}

function normalizeDirectiveFences(value) {
  const lines = value.split("\n");
  /** @type {{indent: string, count: number}[]} */
  const stack = [];

  const normalized = lines.map((/** @type {string} */ line) => {
    const openMatch = line.match(/^([ \t]*)(:{3,})([A-Za-z[{].*)$/);
    if (openMatch) {
      const [, indent, colons, rest] = openMatch;
      const count = colons.length;
      stack.push({ indent, count });
      return `${indent}${":".repeat(count)}${rest}`;
    }

    const closeMatch = line.match(/^([ \t]*)(:{3,})([ \t]*)$/);
    if (closeMatch) {
      const [, indent, colons, trailing = ""] = closeMatch;
      let count = colons.length;
      let matched = false;

      for (let i = stack.length - 1; i >= 0; i--) {
        if (stack[i].indent === indent) {
          count = stack[i].count;
          // Truncate the stack at the match index (remove the matched and any deeper entries).
          // Using splice is clearer than setting .length directly.
          stack.splice(i);
          matched = true;
          break;
        }
      }

      if (!matched && stack.length > 0) {
        const entry = stack.pop();
        if (entry) {
          count = entry.count;
          matched = true;
        }
      }

      if (!matched) {
        // Unmatched closing fence: omit this line from output rather than
        // returning an empty string (which would create an unwanted blank
        // line when the array is later joined).
        return null;
      }

      return `${indent}${":".repeat(count)}${trailing}`;
    }

    return line;
  });

  // Filter out any null/undefined entries (unmatched closers) before joining
  // so we don't introduce blank lines into the output.
  return normalized.filter(Boolean).join("\n");
}

function stripDanglingDirectiveClosings() {
  return /** @type {(tree: any) => any} */ (
    (tree) => {
      visit(tree, (node, index, parent) => {
        if (
          !parent ||
          typeof index !== "number" ||
          node.type !== "paragraph" ||
          !node.children ||
          node.children.length !== 1
        ) {
          return;
        }

        const child = node.children[0];

        if (child.type !== "text" || !/^:{3,}$/.test(child.value.trim())) {
          return;
        }

        const previous = parent.children[index - 1];
        if (!previous || previous.type !== "containerDirective") {
          return;
        }

        parent.children.splice(index, 1);
        return [SKIP, index];
      });
    }
  );
}
