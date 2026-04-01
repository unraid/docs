import type { SidebarItem } from "@docusaurus/plugin-content-docs";

export function sortSidebarItems(
  items: SidebarItem[],
  sortBySemver?: boolean,
): SidebarItem[];
