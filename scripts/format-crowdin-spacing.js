#!/usr/bin/env node

/**
 * Format MDX files for Crowdin compatibility
 *
 * This script ensures proper spacing between markdown content and JSX elements,
 * and fixes indentation issues that can break Crowdin's translation system.
 *
 * Run this after linting to fix spacing issues:
 *   npm run lint:fix && node scripts/format-crowdin-spacing.js
 */

const fs = require('fs');
const path = require('path');
const glob = require('glob');

// ANSI color codes for terminal output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[36m',
};

function formatCrowdinSpacing() {
  console.log(`${colors.blue}${colors.bright}🔧 Formatting MDX files for Crowdin compatibility...${colors.reset}\n`);

  // Find all .mdx files
  const files = glob.sync('docs/**/*.mdx');
  let totalFixed = 0;
  const fixedFiles = [];

  files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let modified = false;

    // Fix 1: Remove indentation from closing ::: directives at root level
    const lines = content.split('\n');
    const newLines = [];

    let jsxStack = []; // Track nested JSX elements

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const trimmedLine = line.trim();

      // Track JSX element nesting
      // Opening tags (including cards elements)
      const openingMatch = line.match(/<(TabItem|tabItem|Card|card|cards|Tabs|tabs|details|Details|Tabs|TabItem)(?:\s+[^>]*)?>(?!\/)/);
      if (openingMatch) {
        const indent = line.match(/^(\s*)/)[1].length;
        jsxStack.push({ tag: openingMatch[1], indent: indent });
      }

      // Self-closing tags don't affect the stack
      // Closing tags
      const closingMatch = line.match(/<\/(TabItem|tabItem|Card|card|cards|Tabs|tabs|details|Details|Tabs|TabItem)>/);
      if (closingMatch) {
        // Pop from stack if it matches
        if (jsxStack.length > 0 && jsxStack[jsxStack.length - 1].tag === closingMatch[1]) {
          jsxStack.pop();
        }
      }

      // Handle closing ::: directives
      if (trimmedLine === ':::') {
        if (jsxStack.length > 0) {
          // Inside JSX: preserve indentation matching the opening directive
          let openingIndent = 0;

          // Look back to find the opening directive to match its indentation
          for (let j = i - 1; j >= 0; j--) {
            if (/^\s*:::(tip|note|warning|caution|info|important)\b/.test(lines[j])) {
              openingIndent = lines[j].match(/^(\s*)/)[1].length;
              break;
            }
          }

          const correctIndent = ' '.repeat(openingIndent);
          if (line !== correctIndent + ':::') {
            newLines.push(correctIndent + ':::');
            modified = true;
          } else {
            newLines.push(line);
          }
        } else {
          // Outside JSX: should not be indented
          if (line !== ':::') {
            newLines.push(':::');
            modified = true;
          } else {
            newLines.push(line);
          }
        }
      } else {
        newLines.push(line);
      }
    }

    content = newLines.join('\n');

    // Fix 2: Add blank lines between markdown content and JSX elements

    // Pattern: numbered or bullet list followed directly by closing JSX tag
    content = content.replace(/^([ \t]*(?:\d+\.|-)\s+.+)$\n([ \t]*<\/\w+>)/gm, (_, listItem, jsxTag) => {
      modified = true;
      return `${listItem}\n\n${jsxTag}`;
    });

    // Pattern: Any non-empty line followed directly by closing JSX tag (but not another JSX tag)
    content = content.replace(/^([ \t]*[^<\s].*)$\n([ \t]*<\/\w+>)/gm, (match, contentLine, jsxTag) => {
      // Skip if the content line is already a closing tag or empty
      if (contentLine.trim().endsWith('>') || contentLine.trim() === '') {
        return match;
      }
      // Also check if it's inside specific JSX elements where we want spacing
      const tagName = jsxTag.match(/<\/(\w+)>/)[1];
      if (['card', 'Card', 'tabItem', 'TabItem', 'details', 'Details'].includes(tagName)) {
        modified = true;
        return `${contentLine}\n\n${jsxTag}`;
      }
      return match;
    });

    // Pattern: JSX opening tag followed directly by markdown content
    content = content.replace(/^([ \t]*<\w+[^>]*>)$\n([ \t]*(?:#{1,6}\s|(?:\d+\.|-)\s+|\w))/gm, (_, jsxTag, markdownContent) => {
      modified = true;
      return `${jsxTag}\n\n${markdownContent}`;
    });

    // Pattern: closing JSX tag followed directly by markdown
    content = content.replace(/^([ \t]*<\/\w+>)$\n([ \t]*(?:#{1,6}\s|(?:\d+\.|-)\s+|\w))/gm, (_, jsxTag, markdownContent) => {
      modified = true;
      return `${jsxTag}\n\n${markdownContent}`;
    });

    // Pattern: markdown content followed directly by opening JSX tag
    content = content.replace(/^(.*\S.*)$\n([ \t]*<\w+[^>]*>)$/gm, (match, markdownContent, jsxTag) => {
      // Skip if the markdown content is already a JSX tag
      if (markdownContent.trim().endsWith('>')) return match;
      // Skip if there's already a blank line
      if (markdownContent === '') return match;
      modified = true;
      return `${markdownContent}\n\n${jsxTag}`;
    });

    // Pattern: List item followed by closing directive (:::)
    content = content.replace(/^([ \t]*(?:\d+\.|-)\s+.+)$\n([ \t]*:::)$/gm, (match, listItem, directive) => {
      // Only add blank line if not inside JSX (check indentation)
      const listIndent = listItem.match(/^(\s*)/)[1].length;
      const directiveIndent = directive.match(/^(\s*)/)[1].length;

      // If directive has same or more indentation as list, they're likely both inside JSX
      if (directiveIndent >= listIndent && listIndent > 0) {
        return match; // Keep as is
      }

      // At root level, add blank line
      if (directiveIndent === 0) {
        modified = true;
        return `${listItem}\n\n:::`;
      }

      return match;
    });

    // Pattern: Closing directive followed directly by opening directive
    // E.g., :::important\n...\n:::\n:::note should have blank line between them
    content = content.replace(/(^[ \t]*:::)$\n(^[ \t]*:::(tip|note|warning|caution|info|important)\b)/gm, (_, closingDirective, openingDirective) => {
      modified = true;
      return `${closingDirective}\n\n${openingDirective}`;
    });

    if (modified) {
      fs.writeFileSync(file, content, 'utf8');
      const relativePath = path.relative(process.cwd(), file);
      fixedFiles.push(relativePath);
      totalFixed++;
    }
  });

  // Print summary
  if (totalFixed > 0) {
    console.log(`${colors.green}✅ Fixed spacing in ${totalFixed} file${totalFixed === 1 ? '' : 's'}:${colors.reset}\n`);
    fixedFiles.forEach(file => {
      console.log(`   ${colors.yellow}•${colors.reset} ${file}`);
    });
    console.log(`\n${colors.blue}Run ${colors.bright}npm run lint${colors.reset}${colors.blue} to verify all issues are resolved.${colors.reset}`);
  } else {
    console.log(`${colors.green}✅ All files already have proper spacing for Crowdin compatibility!${colors.reset}`);
  }

  return totalFixed;
}

// Run if called directly
if (require.main === module) {
  const filesFixed = formatCrowdinSpacing();
  process.exit(filesFixed > 0 ? 0 : 0);
}

module.exports = formatCrowdinSpacing;