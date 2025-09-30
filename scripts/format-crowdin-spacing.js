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

const canonicalAdmonitionTypes = new Set(['note', 'tip', 'info', 'warning', 'caution', 'danger', 'important']);

const admonitionSynonyms = new Map([
  ['nota', 'note'],
  ['nota:', 'note'],
  ['notiz', 'note'],
  ['notiz:', 'note'],
  ['hinweis', 'note'],
  ['hinweis:', 'note'],
  ['consejo', 'tip'],
  ['sugerencia', 'tip'],
  ['astuce', 'tip'],
  ['tipp', 'tip'],
  ['tipp:', 'tip'],
  ['小贴士', 'tip'],
  ['提示', 'tip'],
  ['attention', 'caution'],
  ['prudence', 'caution'],
  ['vorsicht', 'caution'],
  ['vorsicht:', 'caution'],
  ['precaucion', 'caution'],
  ['precaución', 'caution'],
  ['注意', 'caution'],
  ['重要', 'important'],
  ['importante', 'important'],
  ['importante:', 'important'],
  ['wichtig', 'important'],
  ['wichtig:', 'important'],
  ['advertencia', 'warning'],
  ['advertencia:', 'warning'],
  ['avertissement', 'warning'],
  ['avertissement:', 'warning'],
  ['warnung', 'warning'],
  ['warnung:', 'warning'],
  ['警告', 'warning'],
  ['informacion', 'info'],
  ['informacion:', 'info'],
  ['información', 'info'],
  ['información:', 'info'],
  ['信息', 'info'],
  ['de advertencia', 'warning']
]);

function stripDiacritics(value) {
  if (typeof value !== 'string') {
    return value;
  }
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

function getCanonicalAdmonition(type) {
  if (!type) {
    return undefined;
  }
  const lower = type.toLowerCase().trim();
  if (!lower) {
    return undefined;
  }

  if (canonicalAdmonitionTypes.has(lower)) {
    return lower;
  }
  if (admonitionSynonyms.has(lower)) {
    return admonitionSynonyms.get(lower);
  }

  const stripped = stripDiacritics(lower);
  if (stripped !== lower) {
    if (canonicalAdmonitionTypes.has(stripped)) {
      return stripped;
    }
    if (admonitionSynonyms.has(stripped)) {
      return admonitionSynonyms.get(stripped);
    }
  }

  return undefined;
}

function normalizeAdmonitionDirectives(content) {
  const lines = content.split('\n');
  let modified = false;

  for (let index = 0; index < lines.length; index++) {
    const originalLine = lines[index];
    const match = originalLine.match(/^(\s*)(:{3,})(\s*)(.*)$/);
    if (!match) {
      continue;
    }

    const indent = match[1] || '';
    let colons = match[2];
    const rest = match[4] || '';
    let lineModified = false;

    if (colons !== ':::') {
      colons = ':::';
      lineModified = true;
    }

    if (rest.trim().length === 0) {
      const normalized = indent + colons;
      if (normalized !== originalLine || lineModified) {
        lines[index] = normalized;
        modified = true;
      }
      continue;
    }

    const leadingSpacesMatch = rest.match(/^\s*/);
    const leadingSpaces = leadingSpacesMatch ? leadingSpacesMatch[0] : '';
    let trimmedRest = rest.slice(leadingSpaces.length);

    if (!trimmedRest) {
      const normalized = indent + colons;
      if (normalized !== originalLine || lineModified) {
        lines[index] = normalized;
        modified = true;
      }
      continue;
    }

    const typeMatch = trimmedRest.match(/^([^\s\[:：]+)(.*)$/);
    if (!typeMatch) {
      const normalized = indent + colons + leadingSpaces + trimmedRest;
      if (normalized !== originalLine || lineModified) {
        lines[index] = normalized;
        modified = true;
      }
      continue;
    }

    const rawType = typeMatch[1];
    let remainder = typeMatch[2] || '';

    let canonical = getCanonicalAdmonition(rawType);
    if (!canonical) {
      const nextWordMatch = remainder.match(/^\s+([^\s\[:：]+)/);
      if (nextWordMatch) {
        const combinedType = `${rawType} ${nextWordMatch[1]}`;
        const resolved = getCanonicalAdmonition(combinedType);
        if (resolved) {
          canonical = resolved;
          remainder = remainder.slice(nextWordMatch[0].length);
        }
      }
    }

    if (!canonical && /^[*#]/.test(rawType)) {
      const normalized = indent + leadingSpaces + rawType + remainder;
      if (normalized !== originalLine || lineModified) {
        lines[index] = normalized;
        modified = true;
      }
      continue;
    }

    const typeForOutput = canonical || rawType;

    if (canonical && remainder.startsWith(':')) {
      const adjusted = remainder.replace(/^:\s*/, '');
      remainder = adjusted.length ? ` ${adjusted}` : '';
    }

    const normalizedLine = indent + colons + leadingSpaces + typeForOutput + remainder;

    if (normalizedLine !== originalLine || lineModified) {
      lines[index] = normalizedLine;
      modified = true;
    }
  }

  return { content: lines.join('\n'), modified };
}

/**
 * Replace escaped newline characters with real newline characters.
 * @param {string} value - String that may contain escaped newlines.
 * @returns {string}
 */
function convertEscapedNewlines(value) {
  if (typeof value !== 'string' || value.indexOf('\\n') === -1) {
    return value;
  }
  return value.replace(/\\n/g, '\n');
}

/**
 * Apply all formatting rules to content string
 * @param {string} content - The file content to process
 * @returns {string} - The formatted content
 */
function fixCrowdinEscapeArtifacts(content) {
  let modified = false;

  // Collapse quadruple escapes that Crowdin sometimes injects in inline code
  const inlineCodePattern = /`[^`]*`/g;
  content = content.replace(inlineCodePattern, (segment) => {
    const cleaned = segment.replace(/\\{2,}\|/g, '\\|');
    if (cleaned !== segment) {
      modified = true;
      return cleaned;
    }
    return segment;
  });

  // Remove unnecessary pipe escaping inside custom token syntax like %%Foo|bar%%
  content = content.replace(/%%([^%]*?)\\{2}\|([^%]*?)%%/g, (match, left, right) => {
    modified = true;
    return `%%${left}\\|${right}%%`;
  });

  return { content, modified };
}

function removeAllCodeFencers(content) {
  let modified = false;
  const stripped = content.replace(/````[\s\S]*?````/g, () => {
    modified = true;
    return "";
  });
  return { content: stripped, modified };
}

function processContent(content, filePath) {
  content = convertEscapedNewlines(content);
  let modified = false;

  const escapeFix = fixCrowdinEscapeArtifacts(content);
  content = escapeFix.content;
  modified = modified || escapeFix.modified;

  const admonitionFix = normalizeAdmonitionDirectives(content);
  content = admonitionFix.content;
  modified = modified || admonitionFix.modified;

  const fenceFix = removeAllCodeFencers(content);
  content = fenceFix.content;
  modified = modified || fenceFix.modified;

  // Fix 0: Remove backslashes from admonition directives
  // Matches admonition directives with escaped brackets like :::tip\[Title]
  content = content.replace(/^([ \t]*:::[^\s\[]+)(\\)(\[[^\]]*\])$/gm, (match, directive, backslash, bracket) => {
    modified = true;
    return directive + bracket;  // Return directive + bracket, omitting the backslash
  });

  // Fix 1: Remove indentation from closing ::: directives at root level
  const lines = content.split('\n');
  const newLines = [];

  let jsxStack = []; // Track nested JSX elements
  const admonitionIndentStack = [];
  let inCodeBlock = false;
  let codeBlockDelimiter = '';

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i];
    const trimmedLine = line.trim();

    // Track code blocks to avoid modifying code
    if (line.match(/^```/)) {
      if (!inCodeBlock) {
        inCodeBlock = true;
        codeBlockDelimiter = line.match(/^`+/)[0];
      } else if (line.startsWith(codeBlockDelimiter)) {
        inCodeBlock = false;
        codeBlockDelimiter = '';
      }
    }

    // Fix for trailing backslashes in list items (outside code blocks)
    if (!inCodeBlock) {
      const listItemMatch = line.match(/^(\s*(?:[-*]|\d+\.)[^\n]*)(\\)$/);
      if (listItemMatch) {
        // Remove the trailing backslash from list items
        line = listItemMatch[1];
        modified = true;
      }

      // Collapse duplicate trailing backslashes that create duplicate hard breaks
      if (/\\{2,}$/.test(line)) {
        const collapsed = line.replace(/\\+$/g, '\\');
        if (collapsed !== line) {
          line = collapsed;
          modified = true;
        }
      }
    }

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

    // Track admonition openings
    if (/^\s*:::(tip|note|warning|caution|info|important)\b/.test(line)) {
      const indentLength = (line.match(/^(\s*)/)[1] || '').length;
      admonitionIndentStack.push(indentLength);
    }

    // Handle closing ::: directives
    if (trimmedLine === ':::') {
      const expectedIndent =
        admonitionIndentStack.length > 0 ? admonitionIndentStack.pop() : 0;
      const correctIndent = ' '.repeat(expectedIndent);

      if (jsxStack.length > 0) {
        if (line !== correctIndent + ':::') {
          newLines.push(correctIndent + ':::');
          modified = true;
        } else {
          newLines.push(line);
        }
      } else {
        if (line !== correctIndent + ':::') {
          newLines.push(correctIndent + ':::');
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

  // Pattern: Opening admonition directive (with or without brackets/titles) followed directly by content
  // Matches: :::tip, :::tip\[Title], or :::tip Title formats
  const admonitionOpenPattern = /^([ \t]*:::(tip|note|warning|caution|info|important)(?:\\?\[.*?\]|[^\n]*))$\n([^\n]+)$/gm;
  content = content.replace(admonitionOpenPattern, (match, directive, type, nextLine) => {
    // Skip if next line is blank or another directive
    if (nextLine.trim() === '' || nextLine.trim().startsWith(':::')) {
      return match;
    }
    const indentLength = (directive.match(/^(\s*)/)[1] || '').length;
    if (indentLength > 0) {
      return match;
    }
    modified = true;
    return `${directive}\n\n${nextLine}`;
  });

  // Pattern: Content line followed directly by closing ::: for admonitions
  const admonitionClosePattern = /^([ \t]*.+)$\n^([ \t]*:::)$/gm;
  content = content.replace(admonitionClosePattern, (match, contentLine, closingDirective) => {
    // Skip if content is a JSX tag or another directive
    const trimmedContent = contentLine.trim();
    if (trimmedContent.endsWith('>') || trimmedContent.startsWith(':::')) {
      return match;
    }
    const indentLength = (closingDirective.match(/^(\s*)/)[1] || '').length;
    if (indentLength > 0) {
      return match;
    }
    modified = true;
    return `${contentLine}\n\n${closingDirective}`;
  });

  // Pattern: Closing directive followed directly by markdown content
  const admonitionPostSpacingPattern = /^([ \t]*:::)$(?:\r?\n)(^[ \t]*\S.*)$/gm;
  content = content.replace(admonitionPostSpacingPattern, (match, closingDirective, nextLine) => {
    const trimmedNext = nextLine.trim();
    if (trimmedNext === '' || trimmedNext.startsWith(':::') || trimmedNext.startsWith('<')) {
      return match;
    }
    const indentLength = (closingDirective.match(/^(\s*)/)[1] || '').length;
    if (indentLength > 0) {
      return match;
    }
    modified = true;
    return `${closingDirective}\n\n${nextLine}`;
  });

  return content;
}

function formatCrowdinSpacing() {
  console.log(`${colors.blue}${colors.bright}🔧 Formatting MDX files for Crowdin compatibility...${colors.reset}\n`);

  // Find all .mdx files
  const patterns = [
    'docs/**/*.{md,mdx}',
    'i18n/*/docusaurus-plugin-content-docs/**/*.{md,mdx}',
  ];

  const fileSet = new Set();
  patterns.forEach((pattern) => {
    glob.sync(pattern, { nodir: true }).forEach((file) => {
      // Skip files inside node_modules just in case patterns broaden over time
      if (!file.includes('node_modules/')) {
        fileSet.add(file);
      }
    });
  });

  const files = Array.from(fileSet);
  let totalFixed = 0;
  const fixedFiles = [];

  files.forEach(file => {
    const originalContent = fs.readFileSync(file, 'utf8');
    const formattedContent = processContent(originalContent, file);

    if (formattedContent !== originalContent) {
      fs.writeFileSync(file, formattedContent, 'utf8');
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

// Export both the main function and the content processor for testing
module.exports = formatCrowdinSpacing;
module.exports.processContent = processContent;
