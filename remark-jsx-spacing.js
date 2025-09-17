// Custom remark plugin to check for proper spacing and indentation for Crowdin compatibility
const { visit } = require('unist-util-visit');

function jsxContentSpacing() {
  return (tree, file) => {
    // Get the raw file content for checking context
    const fileContent = file.toString();
    const lines = fileContent.split('\n');

    // List of markdown content node types that should be separated from JSX
    const markdownContentTypes = [
      'paragraph',
      'heading',
      'list',
      'code',
      'blockquote',
      'thematicBreak',
      'table',
      'definition',
      'html',
      'yaml'
    ];

    // JSX element types
    const jsxTypes = ['mdxJsxFlowElement', 'mdxjsEsm'];

    // Check each parent node for markdown->JSX and JSX->markdown patterns
    visit(tree, (parent) => {
      if (!parent.children || parent.children.length < 2) return;

      // Look through consecutive children
      for (let i = 0; i < parent.children.length - 1; i++) {
        const current = parent.children[i];
        const next = parent.children[i + 1];

        // Check if we have markdown content followed by JSX
        if (markdownContentTypes.includes(current.type) && jsxTypes.includes(next.type)) {
          if (current.position && next.position) {
            const currentEndLine = current.position.end.line;
            const nextStartLine = next.position.start.line;

            // If JSX starts immediately on the next line (no blank line), warn
            if (nextStartLine === currentEndLine + 1) {
              file.message(
                `Missing blank line between ${current.type} and <${next.name || next.type}> element`,
                next.position,
                'remark-lint:jsx-content-spacing'
              );
            }
          }
        }

        // Check if we have JSX followed by markdown content
        if (jsxTypes.includes(current.type) && markdownContentTypes.includes(next.type)) {
          if (current.position && next.position) {
            const currentEndLine = current.position.end.line;
            const nextStartLine = next.position.start.line;

            // If markdown starts immediately on the next line (no blank line), warn
            if (nextStartLine === currentEndLine + 1) {
              file.message(
                `Missing blank line between <${current.name || current.type}> element and ${next.type}`,
                next.position,
                'remark-lint:jsx-content-spacing'
              );
            }
          }
        }
      }
    });

    // Special check for lists followed by closing directives at root level
    // This is the main issue that breaks Crowdin
    visit(tree, 'list', (node, index, parent) => {
      if (!node.position || !parent || !parent.children) return;

      const listEndLine = node.position.end.line;
      const nextSibling = parent.children[index + 1];

      // Check if the next line after the list is a closing ::: at root level
      // Only warn if we're at the document root or in a non-JSX container
      const isRootLevel = !parent.type || parent.type === 'root';

      if (isRootLevel && listEndLine < lines.length) {
        const nextLineIndex = listEndLine;
        if (nextLineIndex < lines.length) {
          const nextLine = lines[nextLineIndex];

          // Check if the next line is an indented closing :::
          // This specifically breaks Crowdin at the root level
          if (nextLine && /^\s+:::$/.test(nextLine)) {
            file.message(
              `Missing blank line between list and closing directive (:::). The closing ::: should not be indented.`,
              {
                start: { line: listEndLine + 1, column: 1 },
                end: { line: listEndLine + 1, column: nextLine.length + 1 }
              },
              'remark-lint:jsx-content-spacing'
            );
          }
        }
      }
    });
  };
}

module.exports = jsxContentSpacing;