import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";
import { themes } from "prism-react-renderer";
import path from "path";
import { fileURLToPath } from "url";
// @ts-ignore - ESM module without proper types
import remarkAutoGlossary from "@renatonagliati/remark-auto-glossary";
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
import jsxContentSpacing from "./remark-jsx-spacing.js";
import { sortSidebarItems } from "./sitebar-semver-sort.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const lightCodeTheme = themes.github;
const darkCodeTheme = themes.dracula;
const DEFAULT_LOCALE = "en";

const config: Config = {
  title: "Unraid Docs",
  tagline: "Documentation for Unraid",
  favicon: "img/favicon.svg",

  // Set the production url of your site here
  url: "https://docs.unraid.net/",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: process.env.BASE_URL || "/",

  trailingSlash: true,

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "unraid", // Usually your GitHub org/user name.
  projectName: "docs", // Usually your repo name.

  onBrokenLinks: "warn",
  onBrokenMarkdownLinks: "warn",
  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: DEFAULT_LOCALE,
    locales: ["en", "es", "fr", "de", "zh"],
  },
  scripts: [
    {
      src: "/js/redirects.js",
      async: false,
    },
  ],
  presets: [
    [
      "classic",
      {
        docs: {
          routeBasePath: "/",
          sidebarPath: "./sidebars.js",
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: ({ locale, versionDocsDirPath, docPath }) => {
            // Link to Crowdin for non-English docs
            if (locale !== DEFAULT_LOCALE) {
              return `https://translate.unraid.net/unraid-docs/${locale}`;
            }
            // Link to GitHub for English docs
            // Use PR branch if available, otherwise default to main
            const branch = process.env.GITHUB_BRANCH || "main";
            return `https://github.com/unraid/docs/edit/${branch}/${versionDocsDirPath}/${docPath}`;
          },
          editLocalizedFiles: true,
          async sidebarItemsGenerator({
            defaultSidebarItemsGenerator,
            ...args
          }) {
            const sidebarItems = await defaultSidebarItemsGenerator(args);
            return sortSidebarItems(sidebarItems);
          },
          exclude: ["**/partials/**"],
          // Remark plugins for processing MDX
          remarkPlugins: [
            [remarkAutoGlossary, { yamlFile: "glossary.yaml" }],
            jsxContentSpacing, // Custom lint rule for JSX content spacing (Crowdin compatibility)

            // Import remark-lint plugins for consistency with standalone remark config
            remarkPresetLintRecommended,

            // List formatting
            [remarkLintListItemIndent, "space"],
            [remarkLintOrderedListMarkerStyle, "."],

            // Code formatting
            [remarkLintFencedCodeMarker, "`"],
            [remarkLintCodeBlockStyle, "fenced"],
            [remarkLintNoShellDollars, false],

            // Heading formatting
            [remarkLintHeadingStyle, "atx"],
            [remarkLintNoHeadingPunctuation, false],
            remarkLintNoMultipleToplevelHeadings,

            // Link and reference formatting
            [remarkLintLinkTitleStyle, '"'],
            remarkLintNoUndefinedReferences,
            remarkLintNoDuplicateDefinitions,
            remarkLintNoUnusedDefinitions,
            [remarkLintDefinitionCase, false],

            // General formatting
            [remarkLintMaximumLineLength, false],
            remarkLintNoFileNameOuterDashes,
          ],
        },
        /* blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: "https://github.com/unraid/docs/tree/main/",
        }, */

        theme: { customCss: "./src/css/custom.css" },
        gtag: { trackingID: "G-CZENQ1ZPEH", anonymizeIP: true },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    algolia: {
      appId: "JUYLFQHE7W",
      apiKey: "47111d6564a2e69ee21a1d3d2f786ef3",
      indexName: "unraid",
      contextualSearch: true,
      searchPagePath: "search",
    },
    colorMode: { defaultMode: "dark", respectPrefersColorScheme: true },
    docs: { sidebar: { hideable: false, autoCollapseCategories: true } },
    image: "img/meta-unraid.png",
    metadata: [
      {
        name: "theme-color",
        content: "#242526",
        media: "(prefers-color-scheme: dark)",
      }, // matches docusaurus theme rather than unraid specific color
      {
        name: "theme-color",
        content: "#ffffff",
        media: "(prefers-color-scheme: light)",
      },
      { name: "color-scheme", content: "dark light" },
      {
        name: "keywords",
        content:
          "Unraid, server, storage, NAS, Docker, virtualization, array, parity, data protection, file sharing, plugins, management, GUI, disk management, caching, SSD, disk encryption, security, RAID, network configuration, backups, media server, transcoding, monitoring, VMs, GPU passthrough, hardware compatibility",
      },
    ],
    navbar: {
      title: "Unraid Docs",
      logo: {
        alt: "My Site Logo",
        src: "img/un-mark-gradient.svg",
        style: { width: "30px" },
      },
      items: [
        {
          items: [
            { href: "https://unraid.net", label: "Unraid Home" },
            { href: "https://forums.unraid.net", label: "Forums" },
            { label: "Docs Github", href: "https://github.com/unraid/docs" },
          ],
          position: "right",
          label: "More",
        },
        { type: "localeDropdown", position: "right" },
      ],
    },
    tableOfContents: { minHeadingLevel: 2, maxHeadingLevel: 3 },
    footer: {
      style: "light",
      links: [
        {
          title: "Documentation",
          items: [
            { label: "Home", to: "/" },
            {
              label: "Contribute on Github",
              href: "https://github.com/unraid/docs",
            },
          ],
        },
        {
          title: "Community",
          items: [
            { label: "Forums", href: "https://forums.unraid.net" },
            { label: "Discord", href: "https://discord.unraid.net/" },
          ],
        },
        {
          title: "More",
          items: [
            { label: "Unraid Home", href: "https://unraid.net" },
            { label: "Unraid Connect", href: "https://connect.myunraid.net" },
            { label: "Newsletter", href: "https://newsletter.unraid.net" },
            { label: "Blog", href: "https://unraid.net/blog" },
          ],
        },
        {
          title: "License",
          items: [
            {
              label: "CC BY-SA 4.0",
              href: "https://creativecommons.org/licenses/by-sa/4.0/",
              description:
                "This documentation is available under the Creative Commons Attribution-ShareAlike 4.0 International License. Feel free to share, copy, and use our docs however you need. You can even modify and build upon them for your own projects. Just make sure to give us credit and share any improvements you make under the same license. Note: This license applies only to the documentation content, not to Unraid software or trademarks.",
            },
          ],
        },
      ],
      logo: {
        alt: "Unraid Logo",
        src: "img/un-mark-gradient.svg",
        width: 100,
      },
      copyright: `<small>Copyright &copy; 2005-${new Date().getFullYear()} Lime Technology, Inc.<br>Unraid&reg; is a registered trademark of Lime Technology, Inc.</small>`,
    },
    prism: {
      theme: lightCodeTheme,
      darkTheme: darkCodeTheme,
      additionalLanguages: ["diff", "json", "bash"],
    },
    zoom: {
      selector: ".markdown :not(em) > img",
      background: {
        light: "rgb(255, 255, 255)",
        dark: "rgb(50, 50, 50)",
      },
      config: {
        // options you can specify via https://github.com/francoischalifour/medium-zoom#usage
      },
    },
  } satisfies Preset.ThemeConfig,

  plugins: [
    "docusaurus-plugin-image-zoom",
    [
      "@docusaurus/plugin-ideal-image",
      {
        quality: 70,
        max: 1030, // max resized image's size.
        min: 640, // min resized image's size. if original is lower, use that size.
        steps: 2, // the max number of images generated between min and max (inclusive)
        disableInDev: false,
      },
    ],
    [
      "@docusaurus/plugin-client-redirects",
      {
        redirects: [
          // Account redirects
          { from: "/account/", to: "/unraid-connect/overview-and-setup/" },
          {
            from: "/account/link-key/",
            to: "/unraid-connect/overview-and-setup/",
          },

          // Category redirects
          { from: "/category/faq/", to: "/unraid-os/troubleshooting/faq/" },
          {
            from: "/category/getting-started/",
            to: "/unraid-os/getting-started/what-is-unraid/",
          },
          { from: "/category/guides/", to: "/category/using-unraid-to/" },
          { from: "/category/legacy-documentation/", to: "/" },
          { from: "/category/manual/", to: "/category/unraid-os/" },
          {
            from: "/category/zfs/",
            to: "/unraid-os/advanced-configurations/optimize-storage/zfs-storage/",
          },

          // Connect redirects
          { from: "/connect/", to: "/unraid-connect/overview-and-setup/" },
          {
            from: "/connect/flash-backup/",
            to: "/unraid-connect/automated-flash-backup/",
          },
          { from: "/connect/help/", to: "/unraid-connect/overview-and-setup/" },
          {
            from: "/connect/privacy/",
            to: "/unraid-connect/overview-and-setup/",
          },
          {
            from: "/connect/remote-access/",
            to: "/unraid-connect/remote-access/",
          },

          // Legacy redirects
          { from: "/legacy/Articles/dual-boot-unraid-and-windows/", to: "/" },
          {
            from: "/legacy/Articles/expanding-windows-vm-vdisk-partitions/",
            to: "/",
          },
          { from: "/legacy/Articles/upgrading-to-unraid-6/", to: "/" },
          {
            from: "/legacy/FAQ/cache-disk/",
            to: "/unraid-os/using-unraid-to/manage-storage/cache-pools/",
          },
          {
            from: "/legacy/FAQ/check-disk-filesystems/",
            to: "/unraid-os/using-unraid-to/manage-storage/array/array-health-and-maintenance/#checking-array-devices",
          },
          {
            from: "/legacy/FAQ/check-harddrive-speed/",
            to: "/unraid-os/system-administration/monitor-performance/smart-reports-and-disk-health/",
          },
          {
            from: "/legacy/FAQ/console/",
            to: "/unraid-os/system-administration/advanced-tools/command-line-interface/",
          },
          {
            from: "/legacy/FAQ/Parity/",
            to: "/unraid-os/using-unraid-to/manage-storage/array/",
          },
          {
            from: "/legacy/FAQ/parity-swap-procedure/",
            to: "/unraid-os/using-unraid-to/manage-storage/array/replacing-disks-in-array/",
          },
          {
            from: "/legacy/FAQ/replacing-a-data-drive/",
            to: "/unraid-os/using-unraid-to/manage-storage/array/replacing-disks-in-array/",
          },
          {
            from: "/legacy/FAQ/replacing-multiple-data-drives/",
            to: "/unraid-os/using-unraid-to/manage-storage/array/replacing-disks-in-array/",
          },
          {
            from: "/legacy/FAQ/setting-up-cpu-and-board-temperature-sensing/",
            to: "/unraid-os/system-administration/monitor-performance/smart-reports-and-disk-health/",
          },
          {
            from: "/legacy/FAQ/setup-sleep-and-wake-on-lan/",
            to: "/unraid-os/system-administration/advanced-tools/wake-on-lan/",
          },
          {
            from: "/legacy/FAQ/shrink-array/",
            to: "/unraid-os/using-unraid-to/manage-storage/array/removing-disks-from-array/",
          },
          {
            from: "/legacy/FAQ/terminal-access/",
            to: "/unraid-os/system-administration/advanced-tools/command-line-interface/",
          },
          {
            from: "/legacy/FAQ/transferring-files-from-a-network-share-to-unraid/",
            to: "/unraid-os/using-unraid-to/manage-storage/shares/",
          },
          {
            from: "/legacy/FAQ/transferring-files-within-the-unraid-server/",
            to: "/unraid-os/using-unraid-to/manage-storage/shares/",
          },
          {
            from: "/legacy/FAQ/understanding-smart-reports/",
            to: "/unraid-os/system-administration/monitor-performance/smart-reports-and-disk-health/",
          },
          {
            from: "/legacy/FAQ/usb-flash-drive-preparation/",
            to: "/unraid-os/getting-started/set-up-unraid/create-your-bootable-media/",
          },

          // Unraid OS redirects
          {
            from: "/unraid-os/faq/installation/",
            to: "/category/set-up-unraid/",
          },
          {
            from: "/unraid-os/faq/licensing-faq/",
            to: "/unraid-os/troubleshooting/licensing-faq/",
          },
          {
            from: "/unraid-os/faq/os-faq/",
            to: "/unraid-os/troubleshooting/faq/",
          },
          {
            from: "/unraid-os/faq/redeem-license-activation-code/",
            to: "/unraid-os/troubleshooting/licensing-faq/#redeem-activation-code",
          },
          {
            from: "/unraid-os/faq/unraid-account/",
            to: "/unraid-connect/overview-and-setup/",
          },

          {
            from: "/unraid-os/getting-started/",
            to: "/unraid-os/getting-started/what-is-unraid/",
          },
          {
            from: "/unraid-os/getting-started/advanced-bios-config/",
            to: "/unraid-os/getting-started/set-up-unraid/deploy-and-configure-unraid-os/#bios-recommendations",
          },
          {
            from: "/unraid-os/getting-started/considerations/",
            to: "/unraid-os/getting-started/what-is-unraid/",
          },
          {
            from: "/unraid-os/getting-started/manual-install-method/",
            to: "/unraid-os/getting-started/set-up-unraid/create-your-bootable-media/",
          },
          {
            from: "/unraid-os/getting-started/quick-install-guide/",
            to: "/unraid-os/getting-started/set-up-unraid/create-your-bootable-media/",
          },

          {
            from: "/unraid-os/manual/getting-started/advanced-bios-config/",
            to: "/unraid-os/getting-started/set-up-unraid/deploy-and-configure-unraid-os/#bios-recommendations",
          },
          {
            from: "/unraid-os/manual/getting-started/",
            to: "/unraid-os/getting-started/what-is-unraid/",
          },
          {
            from: "/unraid-os/manual/getting-started/manualinstall-method/",
            to: "/unraid-os/getting-started/set-up-unraid/create-your-bootable-media/",
          },
          {
            from: "/unraid-os/manual/troubleshooting/",
            to: "/unraid-os/troubleshooting/",
          },
          {
            from: "/unraid-os/manual/users/resetpassword/",
            to: "/unraid-os/system-administration/secure-your-server/user-management/",
          },
          {
            from: "/unraid-os/manual/vm-management/",
            to: "/unraid-os/using-unraid-to/create-virtual-machines/vm-setup/",
          },
          {
            from: "/unraid-os/manual/what-is-unraid/",
            to: "/unraid-os/getting-started/what-is-unraid/",
          },

          // Guides redirects
          {
            from: "/unraid-os/guides/configuring-time-machine/",
            to: "/unraid-os/using-unraid-to/manage-storage/apple-time-machine/",
          },
          {
            from: "/unraid-os/guides/convert-windows-to-vm/",
            to: "/unraid-os/using-unraid-to/create-virtual-machines/vm-conversion-and-migration/",
          },
          {
            from: "/unraid-os/guides/physical-to-virtual/",
            to: "/unraid-os/using-unraid-to/create-virtual-machines/vm-conversion-and-migration/",
          },
          {
            from: "/unraid-os/guides/wol-setup-for-unraid/",
            to: "/unraid-os/system-administration/advanced-tools/wake-on-lan/",
          },
          {
            from: "/unraid-os/guides/xen-to-kvm/",
            to: "/unraid-os/using-unraid-to/create-virtual-machines/vm-conversion-and-migration/",
          },

          // Manual redirects
          {
            from: "/unraid-os/manual/additional-settings/",
            to: "/unraid-os/getting-started/set-up-unraid/customize-unraid-settings/",
          },
          {
            from: "/unraid-os/manual/applications/",
            to: "/unraid-os/using-unraid-to/run-docker-containers/community-applications/",
          },
          {
            from: "/unraid-os/manual/changing-the-flash-device/",
            to: "/unraid-os/system-administration/maintain-and-update/changing-the-flash-device/",
          },
          {
            from: "/unraid-os/manual/docker-management/",
            to: "/unraid-os/using-unraid-to/run-docker-containers/managing-and-customizing-containers/",
          },
          {
            from: "/unraid-os/manual/multi-language/",
            to: "/unraid-os/using-unraid-to/customize-your-experience/multi-language-support/",
          },
          {
            from: "/unraid-os/manual/security/",
            to: "/unraid-os/system-administration/secure-your-server/security-fundamentals/",
          },
          {
            from: "/unraid-os/manual/security/data-encryption/",
            to: "/unraid-os/system-administration/secure-your-server/securing-your-data/",
          },
          {
            from: "/unraid-os/manual/security/flash-drive/",
            to: "/unraid-os/system-administration/secure-your-server/secure-your-flash-drive/",
          },
          {
            from: "/unraid-os/manual/security/good-practices/",
            to: "/unraid-os/system-administration/secure-your-server/security-fundamentals/",
          },
          {
            from: "/unraid-os/manual/security/outgoing-proxy-manager/",
            to: "/unraid-os/system-administration/secure-your-server/secure-your-outgoing-comms/",
          },
          {
            from: "/unraid-os/manual/security/secure-webgui-ssl/",
            to: "/unraid-os/system-administration/secure-your-server/securing-your-connection/",
          },
          {
            from: "/unraid-os/manual/security/tailscale/",
            to: "/unraid-os/system-administration/secure-your-server/tailscale/",
          },
          {
            from: "/unraid-os/manual/security/vpn/",
            to: "/unraid-os/system-administration/secure-your-server/wireguard/",
          },
          {
            from: "/unraid-os/manual/shares/",
            to: "/unraid-os/using-unraid-to/manage-storage/shares/",
          },
          {
            from: "/unraid-os/manual/shares/create-a-share/",
            to: "/unraid-os/using-unraid-to/manage-storage/shares/",
          },
          {
            from: "/unraid-os/manual/shares/delete-a-share/",
            to: "/unraid-os/using-unraid-to/manage-storage/shares/",
          },
          {
            from: "/unraid-os/manual/shares/disk-shares/",
            to: "/unraid-os/using-unraid-to/manage-storage/shares/",
          },
          {
            from: "/unraid-os/manual/shares/network-access/",
            to: "/unraid-os/using-unraid-to/manage-storage/shares/",
          },
          {
            from: "/unraid-os/manual/shares/user-shares/",
            to: "/unraid-os/using-unraid-to/manage-storage/shares/",
          },
          {
            from: "/unraid-os/manual/storage-management/",
            to: "/unraid-os/using-unraid-to/manage-storage/array/",
          },
          { from: "/unraid-os/manual/tools/", to: "/category/advanced-tools/" },
          {
            from: "/unraid-os/manual/upgrade-instructions/",
            to: "/unraid-os/system-administration/maintain-and-update/upgrading-unraid/",
          },
          {
            from: "/unraid-os/manual/users/",
            to: "/unraid-os/system-administration/secure-your-server/user-management/",
          },
          {
            from: "/unraid-os/manual/users/create-user/",
            to: "/unraid-os/system-administration/secure-your-server/user-management/",
          },
          {
            from: "/unraid-os/manual/users/manage-user/",
            to: "/unraid-os/system-administration/secure-your-server/user-management/",
          },
          {
            from: "/unraid-os/manual/users/reset-password/",
            to: "/unraid-os/system-administration/secure-your-server/user-management/",
          },
          {
            from: "/unraid-os/manual/vm/vm-management/",
            to: "/unraid-os/using-unraid-to/create-virtual-machines/vm-setup/",
          },
          {
            from: "/unraid-os/manual/vm/vm-support/",
            to: "/unraid-os/using-unraid-to/create-virtual-machines/overview-and-system-prep/",
          },
          {
            from: "/unraid-os/manual/zfs/placeholder/",
            to: "/unraid-os/advanced-configurations/optimize-storage/zfs-storage/",
          },

          // Overview redirects
          {
            from: "/unraid-os/overview/application-server/",
            to: "/category/run-docker-containers/",
          },
          { from: "/unraid-os/overview/nas/", to: "/category/manage-storage/" },
          {
            from: "/unraid-os/overview/ui-reference/",
            to: "/unraid-os/getting-started/explore-the-user-interface/tour-the-web-gui/",
          },
          {
            from: "/unraid-os/overview/unraid-management/",
            to: "/category/explore-the-user-interface/",
          },
          {
            from: "/unraid-os/overview/virtualization-host/",
            to: "/category/create-virtual-machines/",
          },
          {
            from: "/unraid-os/overview/what-is-unraid/",
            to: "/unraid-os/getting-started/what-is-unraid/",
          },

          // Troubleshooting redirects
          {
            from: "/unraid-os/troubleshooting/boot-issues/",
            to: "/unraid-os/troubleshooting/common-issues/boot-and-startup-failures/",
          },
          {
            from: "/unraid-os/troubleshooting/cache-issues/",
            to: "/unraid-os/using-unraid-to/manage-storage/cache-pools/",
          },
          {
            from: "/unraid-os/troubleshooting/crc-errors/",
            to: "/unraid-os/troubleshooting/diagnostics/udma-crc-errors/",
          },
          {
            from: "/unraid-os/troubleshooting/data-recovery/",
            to: "/unraid-os/troubleshooting/common-issues/data-recovery/",
          },
          {
            from: "/unraid-os/troubleshooting/diagnostics-information/",
            to: "/unraid-os/troubleshooting/diagnostics/capture-diagnostics-and-logs/",
          },
          {
            from: "/unraid-os/troubleshooting/docker/",
            to: "/unraid-os/troubleshooting/common-issues/docker-troubleshooting/",
          },
          {
            from: "/unraid-os/troubleshooting/system-crash/",
            to: "/unraid-os/troubleshooting/common-issues/system-crashes-and-stability/",
          },
          {
            from: "/unraid-os/troubleshooting/unclean-shutdowns/",
            to: "/unraid-os/troubleshooting/common-issues/unclean-shutdowns/",
          },
          {
            from: "/unraid-os/troubleshooting/windows-connection/",
            to: "/category/common-issues/",
          },

          // Additional missing redirects
          {
            from: "/connect/about/",
            to: "/unraid-connect/overview-and-setup/",
          },
          {
            from: "/legacy/FAQ/Shrink_array/",
            to: "/unraid-os/using-unraid-to/manage-storage/array/removing-disks-from-array/",
          },
          {
            from: "/unraid-os/release-notes/6.12.7/",
            to: "/unraid-os/release-notes/6.12.8/",
          },
          { from: "/contribute-to-docs/", to: "/category/contribute/" },
          {
            from: "/contribute-to-docs/how-to-contribute/",
            to: "/category/contribute/",
          },
          { from: "/contribute-to-docs/intro/", to: "/category/contribute/" },
          {
            from: "/contribute-to-docs/unraid-styleguide/",
            to: "/category/contribute/",
          },
          {
            from: "/contribute-to-docs/unraid-styleguide/golden-rules/",
            to: "/category/contribute/",
          },
          {
            from: "/contribute-to-docs/unraid-styleguide/conventions/",
            to: "/category/contribute/",
          },

          // Go links redirects
          { from: "/go/account/", to: "/unraid-connect/overview-and-setup/" },
          {
            from: "/go/adding-array-disks/",
            to: "/unraid-os/using-unraid-to/manage-storage/array/adding-disks-to-array/",
          },
          {
            from: "/go/adding-pools/",
            to: "/unraid-os/using-unraid-to/manage-storage/cache-pools/",
          },
          {
            from: "/go/advanced-bios-config/",
            to: "/unraid-os/getting-started/set-up-unraid/deploy-and-configure-unraid-os/#bios-recommendations",
          },
          {
            from: "/go/applications/",
            to: "/unraid-os/using-unraid-to/run-docker-containers/community-applications/",
          },
          {
            from: "/go/backing-up-your-flash-drive/",
            to: "/unraid-os/system-administration/maintain-and-update/changing-the-flash-device/#backing-up-your-flash-device",
          },
          { from: "/go/blacklisted-usb-flash-device/", to: "/" },
          {
            from: "/go/changing-the-flash-device/",
            to: "/unraid-os/system-administration/maintain-and-update/changing-the-flash-device/",
          },
          {
            from: "/go/check-filesystem/",
            to: "/unraid-os/using-unraid-to/manage-storage/file-systems/#checking-a-file-system",
          },
          {
            from: "/go/convert-reiser-and-xfs/",
            to: "/unraid-os/using-unraid-to/manage-storage/file-systems/#converting-to-a-new-file-system-type",
          },
          {
            from: "/go/configuring-vpn-tunneled-access-for-system/",
            to: "/unraid-os/system-administration/secure-your-server/wireguard/#configuring-vpn-tunneled-access-for-system",
          },
          {
            from: "/go/connect-about/",
            to: "/unraid-connect/overview-and-setup/",
          },
          {
            from: "/go/connect-customizable-dashboard/",
            to: "/unraid-connect/overview-and-setup/#customization",
          },
          {
            from: "/go/connect-dashboard/",
            to: "/unraid-connect/overview-and-setup/#dashboard",
          },
          {
            from: "/go/connect-deep-linking/",
            to: "/unraid-connect/overview-and-setup/#deep-linking",
          },
          {
            from: "/go/connect-dynamic-remote-access/",
            to: "/unraid-connect/remote-access/#dynamic-remote-access-setup",
          },
          {
            from: "/go/connect-flash-backup/",
            to: "/unraid-connect/automated-flash-backup/",
          },
          {
            from: "/go/connect-help/",
            to: "/unraid-connect/overview-and-setup/",
          },
          {
            from: "/go/connect-languagelocalization/",
            to: "/unraid-connect/overview-and-setup/#language-localization",
          },
          {
            from: "/go/connect-license-management/",
            to: "/unraid-connect/overview-and-setup/#license-management",
          },
          {
            from: "/go/connect-manage-server-from-connect/",
            to: "/unraid-connect/overview-and-setup/#manage-your-server-from-within-the-connect-ui",
          },
          {
            from: "/go/connect-privacy/",
            to: "/unraid-connect/automated-flash-backup/#privacy-and-security",
          },
          {
            from: "/go/connect-remote-access/",
            to: "/unraid-connect/remote-access/",
          },
          { from: "/go/connect/", to: "/unraid-connect/overview-and-setup/" },
          {
            from: "/go/determining-hvmiommu-hardware-support/",
            to: "/unraid-os/using-unraid-to/create-virtual-machines/overview-and-system-prep/#hvm--iommu-what-they-enable",
          },
          {
            from: "/go/data-encryption/",
            to: "/unraid-os/system-administration/secure-your-server/securing-your-data/",
          },
          {
            from: "/go/diagnostics/",
            to: "/unraid-os/troubleshooting/diagnostics/capture-diagnostics-and-logs/",
          },
          {
            from: "/go/disk-shares/",
            to: "/unraid-os/using-unraid-to/manage-storage/shares/",
          },
          {
            from: "/go/docker-management/",
            to: "/unraid-os/using-unraid-to/run-docker-containers/managing-and-customizing-containers/",
          },
          { from: "/go/download-list/", to: "/unraid-os/download_list/" },
          {
            from: "/go/expanding-windows-vm-vdisk-partitions/",
            to: "/unraid-os/using-unraid-to/create-virtual-machines/windows-on-a-vm/#expanding-windows-vm-vdisk-partitions",
          },
          {
            from: "/go/faq-licensing-pre-release/",
            to: "/unraid-os/troubleshooting/licensing-faq/#pre-release-policy",
          },
          {
            from: "/go/faq-licensing-redeem-activation-code/",
            to: "/unraid-os/troubleshooting/licensing-faq/#redeem-activation-code",
          },
          {
            from: "/go/faq-licensing-upgrade/",
            to: "/unraid-os/troubleshooting/licensing-faq/#how-do-i-upgrade-my-unraid-license",
          },
          {
            from: "/go/faq-licensing/",
            to: "/unraid-os/troubleshooting/licensing-faq/",
          },
          { from: "/go/faq/", to: "/unraid-os/troubleshooting/faq/" },
          {
            from: "/go/getting-started/",
            to: "/unraid-os/getting-started/what-is-unraid/",
          },
          { from: "/go/hardware-requirements/", to: "/" },
          {
            from: "/go/lost-root-password/",
            to: "/unraid-os/system-administration/secure-your-server/user-management/",
          },
          {
            from: "/go/managing-api-keys/",
            to: "/API/how-to-use-the-api/#managing-api-keys",
          },
          {
            from: "/go/manual-install-method/",
            to: "/unraid-os/getting-started/set-up-unraid/create-your-bootable-media/",
          },
          { from: "/go/manual/", to: "/category/unraid-os/" },
          {
            from: "/go/microsoft-windows-as-a-vm/",
            to: "/unraid-os/using-unraid-to/create-virtual-machines/windows-on-a-vm/",
          },
          {
            from: "/go/multi-language/",
            to: "/unraid-os/using-unraid-to/customize-your-experience/multi-language-support/",
          },
          {
            from: "/go/multiple-pools/",
            to: "/unraid-os/using-unraid-to/manage-storage/cache-pools/",
          },
          {
            from: "/go/outgoing-proxy-manager/",
            to: "/unraid-os/system-administration/secure-your-server/secure-your-outgoing-comms/",
          },
          {
            from: "/go/parity-swap/",
            to: "/unraid-os/using-unraid-to/manage-storage/array/replacing-disks-in-array/#parity-swap",
          },
          {
            from: "/go/parity/",
            to: "/unraid-os/using-unraid-to/manage-storage/array/",
          },
          {
            from: "/go/quick-install-guide-assigning-devices/",
            to: "/unraid-os/getting-started/set-up-unraid/configure-your-array/#assign-parity-and-data-disks",
          },
          {
            from: "/go/quick-install-guide-connecting-to-webgui/",
            to: "/unraid-os/getting-started/set-up-unraid/deploy-and-configure-unraid-os/#connect-to-the-unraid-webgui",
          },
          {
            from: "/go/quick-install-guide-set-root-password/",
            to: "/unraid-os/getting-started/set-up-unraid/deploy-and-configure-unraid-os/#set-a-root-password",
          },
          {
            from: "/go/quick-install-guide-setting-up/",
            to: "/unraid-os/getting-started/set-up-unraid/deploy-and-configure-unraid-os/",
          },
          {
            from: "/go/quick-install-guide/",
            to: "/unraid-os/getting-started/set-up-unraid/create-your-bootable-media/",
          },
          {
            from: "/go/recommendations-on-buying-usb-drives/",
            to: "/unraid-os/system-administration/maintain-and-update/changing-the-flash-device/#selecting-a-replacement-device",
          },
          { from: "/go/release-notes/", to: "/category/release-notes/" },
          {
            from: "/go/release-notes/6.12.12/",
            to: "/unraid-os/release-notes/6.12.12/",
          },
          {
            from: "/go/release-notes/6.12.13/",
            to: "/unraid-os/release-notes/6.12.13/",
          },
          {
            from: "/go/shares/",
            to: "/unraid-os/using-unraid-to/manage-storage/shares/",
          },
          {
            from: "/go/shrink-array/",
            to: "/unraid-os/using-unraid-to/manage-storage/array/removing-disks-from-array/",
          },
          {
            from: "/go/split-level/",
            to: "/unraid-os/using-unraid-to/manage-storage/shares/#split-level",
          },
          {
            from: "/go/storage-management/",
            to: "/unraid-os/using-unraid-to/manage-storage/array/",
          },
          {
            from: "/go/syslog-server/",
            to: "/unraid-os/troubleshooting/diagnostics/capture-diagnostics-and-logs/#persistent-logs-syslog-server",
          },
          {
            from: "/go/tailscale-docker/",
            to: "/unraid-os/system-administration/secure-your-server/tailscale/#adding-tailscale-to-docker-containers",
          },
          {
            from: "/go/tailscale/",
            to: "/unraid-os/system-administration/secure-your-server/tailscale/",
          },
          { from: "/go/troubleshooting/", to: "/unraid-os/troubleshooting/" },
          {
            from: "/go/upgrade-instructions/",
            to: "/unraid-os/system-administration/maintain-and-update/upgrading-unraid/",
          },
          {
            from: "/go/upgrading-a-vm-to-windows-11/",
            to: "/unraid-os/using-unraid-to/create-virtual-machines/windows-on-a-vm/#upgrading-to-windows-11",
          },
          {
            from: "/go/user-shares/",
            to: "/unraid-os/using-unraid-to/manage-storage/shares/",
          },
          {
            from: "/go/vm-adjust-bios-settings/",
            to: "/unraid-os/using-unraid-to/create-virtual-machines/overview-and-system-prep/#adjust-bios-settings",
          },
          {
            from: "/go/vm-expanding-a-vdisk/",
            to: "/unraid-os/using-unraid-to/create-virtual-machines/vm-setup/#expand-a-vdisk",
          },
          {
            from: "/go/vm-management/",
            to: "/unraid-os/using-unraid-to/create-virtual-machines/vm-setup/",
          },
          {
            from: "/go/vm-support/",
            to: "/unraid-os/using-unraid-to/create-virtual-machines/overview-and-system-prep/",
          },
          {
            from: "/go/vm-system-preparation/",
            to: "/unraid-os/using-unraid-to/create-virtual-machines/overview-and-system-prep/#system-preparation",
          },
          {
            from: "/go/vpn/",
            to: "/unraid-os/system-administration/secure-your-server/wireguard/",
          },
          {
            from: "/go/ups-settings/",
            to: "/unraid-os/getting-started/set-up-unraid/customize-unraid-settings/#ups-settings",
          },
          {
            from: "/go/webgui-ssl/",
            to: "/unraid-os/system-administration/secure-your-server/securing-your-connection/",
          },
          {
            from: "/go/what-kind-of-usb-device-do-i-need/",
            to: "/unraid-os/system-administration/maintain-and-update/changing-the-flash-device/#selecting-a-replacement-device",
          },
        ],
      },
    ],
  ],
};

export default config;
