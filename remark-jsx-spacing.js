// Custom remark plugin to check for blank lines when JSX elements directly follow list items
// This is required for Crowdin compatibility
const { visit } = require('unist-util-visit');

function jsxContentSpacing() {
  return (tree, file) => {
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
  };
}

module.exports = jsxContentSpacing;