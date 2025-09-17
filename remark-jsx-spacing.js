// Custom remark plugin to check for blank lines around JSX content for Crowdin compatibility
const { visit } = require('unist-util-visit');

function jsxContentSpacing() {
  return (tree, file) => {
    visit(tree, 'mdxJsxFlowElement', (node) => {
      if (!node.children || node.children.length === 0) return;

      // Helper to check if a node has meaningful content
      const hasMeaningfulContent = (child) => {
        if (!child) return false;

        // These are content nodes
        if (child.type === 'paragraph' ||
            child.type === 'list' ||
            child.type === 'code' ||
            child.type === 'heading' ||
            child.type === 'blockquote' ||
            child.type === 'mdxJsxFlowElement') {
          return true;
        }

        // Text nodes need non-whitespace content to be meaningful
        if (child.type === 'text') {
          return child.value.trim().length > 0;
        }

        return false;
      }

      // Find first and last meaningful content
      let firstContentIdx = -1;
      let lastContentIdx = -1;

      for (let i = 0; i < node.children.length; i++) {
        if (hasMeaningfulContent(node.children[i])) {
          if (firstContentIdx === -1) firstContentIdx = i;
          lastContentIdx = i;
        }
      }

      // No content to check
      if (firstContentIdx === -1) return;

      // Check for leading blank line
      let hasLeadingNewline = false;
      if (firstContentIdx > 0) {
        const prevNode = node.children[firstContentIdx - 1];
        if (prevNode.type === 'text' && prevNode.value.includes('\n')) {
          hasLeadingNewline = true;
        }
      }

      if (!hasLeadingNewline && firstContentIdx === 0) {
        file.message(
          `Missing blank line after opening <${node.name}> tag`,
          node.position,
          'remark-lint:jsx-content-spacing'
        );
      }

      // Check for trailing blank line
      let hasTrailingNewline = false;
      if (lastContentIdx < node.children.length - 1) {
        const nextNode = node.children[lastContentIdx + 1];
        if (nextNode.type === 'text' && nextNode.value.includes('\n')) {
          hasTrailingNewline = true;
        }
      }

      if (!hasTrailingNewline && lastContentIdx === node.children.length - 1) {
        file.message(
          `Missing blank line before closing </${node.name}> tag`,
          node.position,
          'remark-lint:jsx-content-spacing'
        );
      }
    });
  }
}

module.exports = jsxContentSpacing;