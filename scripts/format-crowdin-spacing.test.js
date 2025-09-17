import { describe, it, expect } from 'vitest';
import formatter from './format-crowdin-spacing.js';

// Use the processContent function exported from the formatter
const processContent = formatter.processContent;

describe('Crowdin Spacing Formatter', () => {
  describe('Admonition directives', () => {
    it('should remove backslash from admonition directive and add spacing', () => {
      const input = `:::note\\
This is a note.
:::`;
      const expected = `:::note

This is a note.

:::`;
      expect(processContent(input)).toBe(expected);
    });

    it('should add blank line after opening admonition (plain)', () => {
      const input = `:::note
This is content without a blank line.
:::`;
      const expected = `:::note

This is content without a blank line.

:::`;
      expect(processContent(input)).toBe(expected);
    });

    it('should add blank line after opening admonition with escaped brackets', () => {
      const input = `:::tip\\[What's New]
Starting with version 7.2, new features are available.
:::`;
      const expected = `:::tip\\[What's New]

Starting with version 7.2, new features are available.

:::`;
      expect(processContent(input)).toBe(expected);
    });

    it('should add blank line after opening admonition with plain text title', () => {
      const input = `:::tip New in Unraid 7.0
Unraid 7.x brings significant enhancements.
:::`;
      const expected = `:::tip New in Unraid 7.0

Unraid 7.x brings significant enhancements.

:::`;
      expect(processContent(input)).toBe(expected);
    });

    it('should add blank line before closing admonition', () => {
      const input = `:::warning

Be careful with this operation.
:::`;
      const expected = `:::warning

Be careful with this operation.

:::`;
      expect(processContent(input)).toBe(expected);
    });

    it('should add blank line between consecutive directives', () => {
      const input = `:::important
This is important.
:::
:::note
This is a note.
:::`;
      const expected = `:::important

This is important.

:::

:::note

This is a note.

:::`;
      expect(processContent(input)).toBe(expected);
    });

    it('should handle admonition with list content', () => {
      const input = `:::note
List of items:
- First item
- Second item
- Third item
:::`;
      const expected = `:::note

List of items:
- First item
- Second item
- Third item

:::`;
      expect(processContent(input)).toBe(expected);
    });

    it('should preserve already correct formatting', () => {
      const input = `:::tip

Already has proper spacing.

:::`;
      expect(processContent(input)).toBe(input);
    });
  });

  describe('Indentation handling', () => {
    it('should remove indentation from root-level closing directive', () => {
      const input = `:::caution
Content here.
  :::`;
      const expected = `:::caution

Content here.

:::`;
      expect(processContent(input)).toBe(expected);
    });

    it('should preserve indentation inside JSX elements', () => {
      const input = `<TabItem>
  :::note
  This is inside JSX.
  :::
</TabItem>`;
      // Note: The formatter only adds spacing around the admonition content,
      // not after the opening TabItem tag in this specific case
      const expected = `<TabItem>
  :::note

  This is inside JSX.

  :::

</TabItem>`;
      expect(processContent(input)).toBe(expected);
    });
  });

  describe('JSX and Markdown spacing', () => {
    it('should add blank lines around JSX elements', () => {
      const input = `Some markdown content.
<Card>
Card content here.
</Card>
More markdown content.`;
      const expected = `Some markdown content.

<Card>

Card content here.

</Card>

More markdown content.`;
      expect(processContent(input)).toBe(expected);
    });

    it('should handle lists followed by closing JSX', () => {
      const input = `<card>
- Item 1
- Item 2
</card>`;
      const expected = `<card>

- Item 1
- Item 2

</card>`;
      expect(processContent(input)).toBe(expected);
    });

    it('should handle complex nested structure', () => {
      const input = `<tabs>
  <tabItem label="Tab 1">
    :::info
    Information here.
    :::
  </tabItem>
</tabs>`;
      // The formatter adds spacing around admonition content
      const expected = `<tabs>
  <tabItem label="Tab 1">
    :::info

    Information here.

    :::

  </tabItem>
</tabs>`;
      expect(processContent(input)).toBe(expected);
    });
  });

  describe('Edge cases', () => {
    it('should handle multiple paragraphs in admonition', () => {
      const input = `:::important
First paragraph.

Second paragraph.

Third paragraph.
:::`;
      const expected = `:::important

First paragraph.

Second paragraph.

Third paragraph.

:::`;
      expect(processContent(input)).toBe(expected);
    });

    it('should handle mixed content types', () => {
      const input = `# Heading
Some text here.
:::note
A note without spacing.
:::
<Card>
Card content.
</Card>`;
      // Note: The formatter doesn't add spacing between plain text and admonitions
      // unless they're specific patterns (lists, JSX, etc)
      const expected = `# Heading
Some text here.
:::note

A note without spacing.

:::

<Card>

Card content.

</Card>`;
      expect(processContent(input)).toBe(expected);
    });

    it('should not add blank line after title-only admonitions', () => {
      const input = `:::info Important Notes
:::`;
      // Since there's no content after the title, just the closing :::
      // The formatter should not add a blank line after the title
      const expected = `:::info Important Notes
:::`;
      expect(processContent(input)).toBe(expected);
    });
  });
});