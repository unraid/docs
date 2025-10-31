declare module "./sidebar-semver-sort.js" {
  // Use the Docusaurus SidebarItem type when available so TypeScript understands
  // the shape of the items passed into the sorter.
  import type { SidebarItem } from "@docusaurus/plugin-content-docs";

  /**
   * Sorts the array of sidebar items. The implementation may return categories
   * (with nested items) or a flat list depending on the sortBySemver flag.
   */
  export function sortSidebarItems(
    items: SidebarItem[],
    sortBySemver?: boolean
  ): SidebarItem[];

  export {};
}
