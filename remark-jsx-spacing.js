// Custom remark plugin to check for blank lines when JSX elements or directive closings directly follow list items
// This is required for Crowdin compatibility
const { visit } = require('unist-util-visit');

function jsxContentSpacing() {
  return (tree, file) => {
    // Get the raw file content for checking indented closing directives
    const fileContent = file.toString();
    const lines = fileContent.split('\n');

    // We need to check each parent node for list->JSX patterns
    visit(tree, (parent) => {
      if (!parent.children || parent.children.length < 2) return;

      // Look through consecutive children
      for (let i = 0; i < parent.children.length - 1; i++) {
        const current = parent.children[i];
        const next = parent.children[i + 1];

        // Check if current is a list and next is JSX
        if (current.type === 'list' && next.type === 'mdxJsxFlowElement') {
          // Check the actual source positions to determine if there's a blank line
          // If the list ends at line N and JSX starts at line N+1, there's no blank line
          // If JSX starts at line N+2 or later, there's at least one blank line
          if (current.position && next.position) {
            const listEndLine = current.position.end.line;
            const jsxStartLine = next.position.start.line;

            // If JSX starts immediately on the next line, warn
            if (jsxStartLine === listEndLine + 1) {
              file.message(
                `Missing blank line between list and <${next.name}> element`,
                next.position,
                'remark-lint:jsx-content-spacing'
              );
            }
          }
        }
      }
    });

    // Check for lists that might be followed by indented closing directives
    visit(tree, 'list', (node) => {
      if (!node.position) return;

      const listEndLine = node.position.end.line;

      // Check if the next line after the list has an indented ::: (which breaks Crowdin)
      if (listEndLine <= lines.length) {
        const nextLineIndex = listEndLine - 1; // Convert to 0-based index
        const nextLine = lines[nextLineIndex];

        // Check if the line that ends the list has trailing spaces followed by :::
        // or if the next line starts with spaces/tabs followed by :::
        if (nextLine && /^\s+:::/.test(nextLine)) {
          file.message(
            `Missing blank line between list and closing directive (:::). The closing ::: should not be indented.`,
            {
              start: { line: listEndLine, column: 1 },
              end: { line: listEndLine, column: nextLine.length + 1 }
            },
            'remark-lint:jsx-content-spacing'
          );
        }
      }
    });
  };
}

module.exports = jsxContentSpacing;