// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer").themes.github;
const darkCodeTheme = require("prism-react-renderer").themes.dracula;
const { sortSidebarItems } = require("./sitebar-semver-sort");

const locales = ["en", "zh", "es", "fr", "de"];
/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Unraid Docs",
  tagline: "Documentation for Unraid",
  favicon: "img/favicon.svg", // https://dev.to/masakudamatsu/favicon-nightmare-how-to-maintain-sanity-3al7

  // Set the production url of your site here
  url: "https://docs.unraid.net/",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/",

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
    defaultLocale: "en",
    locales,
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
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: "/",
          sidebarPath: require.resolve("./sidebars.js"),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: "https://github.com/unraid/docs/tree/main/",
          editLocalizedFiles: true,
          async sidebarItemsGenerator({
            defaultSidebarItemsGenerator,
            ...args
          }) {
            const sidebarItems = await defaultSidebarItemsGenerator(args);
            return sortSidebarItems(sidebarItems);
          },
        },
        /* blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: "https://github.com/unraid/docs/tree/main/",
        }, */

        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
        gtag: {
          trackingID: "G-CZENQ1ZPEH",
          anonymizeIP: true,
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      algolia: {
        appId: "JUYLFQHE7W",
        apiKey: "47111d6564a2e69ee21a1d3d2f786ef3",
        indexName: "unraid",
        contextualSearch: true,
        searchPagePath: "search",
      },
      colorMode: { defaultMode: "dark", respectPrefersColorScheme: true },
      docs: {
        sidebar: {
          hideable: false,
          autoCollapseCategories: true,
        },
      },
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
          style: {
            width: "30px",
          },
        },
        items: [
          {
            items: [
              {
                href: "https://unraid.net",
                label: "Unraid Home",
              },
              {
                href: "https://forums.unraid.net",
                label: "Forums",
              },
              { label: "Docs Github", href: "https://github.com/unraid/docs" },
            ],
            position: "right",
            label: "More",
          },
          {
            type: "localeDropdown",
            position: "right",
          },
        ],
      },
      tableOfContents: {
        minHeadingLevel: 2,
        maxHeadingLevel: 4,
      },
      footer: {
        style: "light",
        links: [
          {
            title: "Documentation",
            items: [
              {
                label: "Home",
                to: "/",
              },
              {
                label: "Contribute on Github",
                href: "https://github.com/unraid/docs",
              },
            ],
          },
          {
            title: "Community",
            items: [
              {
                label: "Forums",
                href: "https://forums.unraid.net",
              },
              {
                label: "Discord",
                href: "https://discord.unraid.net/",
              },
            ],
          },
          {
            title: "More",
            items: [
              {
                label: "Unraid Home",
                href: "https://unraid.net",
              },
              {
                label: "Unraid Connect",
                href: "https://connect.myunraid.net",
              },
              {
                label: "Newsletter",
                href: "https://newsletter.unraid.net",
              },
              {
                label: "Blog",
                href: "https://unraid.net/blog",
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
    }),
  plugins: [
    require.resolve("docusaurus-plugin-image-zoom"),
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
          // reminder: these have no effect in dev mode
          // see https://docusaurus.io/docs/api/plugins/@docusaurus/plugin-client-redirects
          // file renamed in https://github.com/unraid/docs/commit/570a7e629bef1577d43e188495cb71916e7de360
          {
            to: "/legacy/FAQ/shrink-array/",
            from: "/legacy/FAQ/Shrink_array/",
          },
          // move Getting Started pages
          {
            to: "/unraid-os/getting-started/",
            from: "/unraid-os/manual/getting-started/",
          },
          {
            to: "/unraid-os/getting-started/",
            from: "/category/getting-started/",
          },
          {
            to: "/unraid-os/getting-started/manual-install-method/",
            from: "/unraid-os/manual/getting-started/manual-install-method/",
          },
          // redirect from 6.12.7 to 6.12.8
          {
            to: "/unraid-os/release-notes/6.12.8/",
            from: "/unraid-os/release-notes/6.12.7/",
          },
          // redirect from unraid-account faq page to the top level account page
          {
            to: "/account/",
            from: "/unraid-os/faq/unraid-account/",
          },
          // Overview redirect
          {
            to: "/unraid-os/overview/what-is-unraid/",
            from: "/unraid-os/manual/what-is-unraid/",
          },
          // Troubleshooting section redirect
          // skip, lost-root-password takes precedence
          /*
          {
            to: "/unraid-os/troubleshooting/",
            from: "/unraid-os/manual/troubleshooting/",
          },
          */
          // reset password redirect
          {
            to: "/unraid-os/manual/users/reset-password/",
            from: "/unraid-os/manual/troubleshooting/",
            // actually from: /unraid-os/manual/troubleshooting#lost-root-password
          },
          // VM reorg
          {
            to: "/unraid-os/manual/vm/vm-management/",
            from: "/unraid-os/manual/vm-management/",
          },
          // Connect reorg
          {
            to: "/connect/",
            from: "/category/unraid-connect/",
          },
          {
            to: "/connect/",
            from: "/connect/about/",
          },
          // go links used by the OS
          {
            to: "/category/manual/",
            from: "/go/manual",
          },
          {
            to: "/unraid-os/manual/users/reset-password/",
            from: "/go/lost-root-password",
          },
          {
            to: "/unraid-os/manual/changing-the-flash-device/",
            from: "/go/changing-the-flash-device",
          },
          {
            to: "/unraid-os/manual/security/vpn/#configuring-vpn-tunneled-access-for-system",
            from: "/go/configuring-vpn-tunneled-access-for-system",
          },
          {
            to: "/unraid-os/manual/vm/vm-management/#determining-hvmiommu-hardware-support",
            from: "/go/determining-hvmiommu-hardware-support",
          },
          {
            to: "/unraid-os/manual/vm/vm-management/#system-preparation",
            from: "/go/vm-system-preparation",
          },
          // go links used for Forum Word Expansions
          {
            to: "/unraid-os/manual/storage-management/#checking-a-file-system",
            from: "/go/check-filesystem",
          },
          {
            to: "/unraid-os/troubleshooting/diagnostics-information/",
            from: "/go/diagnostics",
          },
          {
            to: "/unraid-os/manual/shares/disk-shares/",
            from: "/go/disk-shares",
          },
          {
            to: "/unraid-os/manual/storage-management#parity-swap",
            from: "/go/parity-swap",
          },
          {
            to: "/legacy/FAQ/shrink-array/",
            from: "/go/shrink-array",
          },
          {
            to: "/unraid-os/manual/shares/user-shares/#split-level",
            from: "/go/split-level",
          },
          {
            to: "/unraid-os/troubleshooting/diagnostics-information/#persistent-logs-syslog-server",
            from: "/go/syslog-server",
          },
          {
            to: "/unraid-os/manual/shares/user-shares/",
            from: "/go/user-shares",
          },
          // go links used for unraid.net website
          {
            to: "/account/",
            from: "/go/account",
          },
          {
            to: "/unraid-os/manual/storage-management/#adding-disks",
            from: "/go/adding-array-disks",
          },
          {
            to: "/unraid-os/manual/storage-management/#why-use-a-pool",
            from: "/go/adding-pools",
          },
          {
            to: "/unraid-os/getting-started/advanced-bios-config/",
            from: "/go/advanced-bios-config",
          },
          {
            to: "/unraid-os/manual/applications/",
            from: "/go/applications",
          },
          {
            to: "/connect/",
            from: "/go/connect",
          },
          {
            to: "/connect/",
            from: "/go/connect-about",
          },
          {
            to: "/connect/help/",
            from: "/go/connect-help",
          },
          {
            to: "/connect/help#server-deep-linking",
            from: "/go/connect-deep-linking",
          },
          {
            to: "/connect/remote-access/",
            from: "/go/connect-remote-access",
          },
          {
            to: "/connect/remote-access/#dynamic-remote-access",
            from: "/go/connect-dynamic-remote-access",
          },
          {
            to: "/connect/flash-backup/",
            from: "/go/connect-flash-backup",
          },
          {
            to: "/connect/help/#license-management",
            from: "/go/connect-license-management",
          },
          {
            to: "/connect/help/#manage-your-server-from-within-the-connect-ui",
            from: "/go/connect-manage-server-from-connect",
          },
          {
            to: "/connect/help/#unraid-connect-dashboard",
            from: "/go/connect-dashboard",
          },
          {
            to: "/connect/help/#customizable-dashboard-server-banner-image-and-themes",
            from: "/go/connect-customizable-dashboard",
          },
          {
            to: "/connect/help/#language-localization",
            from: "/go/connect-language-localization",
          },
          {
            to: "/unraid-os/manual/docker-management/",
            from: "/go/docker-management",
          },
          {
            to: "/unraid-os/download_list/",
            from: "/go/download-list",
          },
          {
            to: "/legacy/Articles/expanding-windows-vm-vdisk-partitions/",
            from: "/go/expanding-windows-vm-vdisk-partitions",
          },
          {
            to: "/category/faq/",
            from: "/go/faq",
          },
          {
            to: "/unraid-os/faq/licensing-faq/",
            from: "/go/faq-licensing",
          },
          {
            to: "/unraid-os/faq/licensing-faq/#how-to-redeem-a-license-activation-code",
            from: "/go/faq-licensing-redeem-activation-code",
          },
          {
            to: "/unraid-os/faq/licensing-faq/#how-do-i-upgrade-my-unraid-license",
            from: "/go/faq-licensing-upgrade",
          },
          {
            to: "/unraid-os/faq/licensing-faq/#what-happens-with-pre-releases",
            from: "/go/faq-licensing-pre-release",
          },
          {
            to: "/unraid-os/getting-started/",
            from: "/go/getting-started",
          },
          {
            to: "/unraid-os/getting-started/manual-install-method/",
            from: "/go/manual-install-method",
          },
          {
            to: "/unraid-os/manual/security/outgoing-proxy-manager/",
            from: "/go/outgoing-proxy-manager",
          },
          {
            to: "/unraid-os/manual/multi-language/",
            from: "/go/multi-language",
          },
          {
            to: "/legacy/FAQ/Parity/",
            from: "/go/parity",
          },
          {
            to: "/unraid-os/getting-started/quick-install-guide/",
            from: "/go/quick-install-guide",
          },
          {
            to: "/unraid-os/getting-started/quick-install-guide/#assigning-devices-to-the-array-and-pools",
            from: "/go/quick-install-guide-assigning-devices",
          },
          {
            to: "/unraid-os/getting-started/quick-install-guide/#setting-up-the-unraid-os",
            from: "/go/quick-install-guide-setting-up",
          },
          {
            to: "/unraid-os/manual/changing-the-flash-device/#recommendations-on-buying-usb-drives",
            from: "/go/recommendations-on-buying-usb-drives",
          },
          {
            to: "/category/release-notes/",
            from: "/go/release-notes",
          },
          {
            to: "/unraid-os/manual/shares/",
            from: "/go/shares",
          },
          {
            to: "/unraid-os/manual/storage-management/",
            from: "/go/storage-management",
          },
          {
            to: "/unraid-os/troubleshooting/",
            from: "/go/troubleshooting",
          },
          {
            to: "/unraid-os/manual/upgrade-instructions/",
            from: "/go/upgrade-instructions",
          },
          {
            to: "/unraid-os/manual/vm/vm-management/",
            from: "/go/vm-management",
          },
          {
            to: "/unraid-os/manual/vm/vm-support/",
            from: "/go/vm-support",
          },
          {
            to: "/unraid-os/manual/security/vpn/",
            from: "/go/vpn",
          },
          {
            to: "/unraid-os/manual/security/secure-webgui-ssl/",
            from: "/go/webgui-ssl",
          },
          {
            to: "/unraid-os/release-notes/6.12.12/",
            from: "/go/release-notes/6.12.12/",
          },
          {
            to: "/unraid-os/release-notes/6.12.13/",
            from: "/go/release-notes/6.12.13/",
          },
          {
            to: "/unraid-os/manual/security/tailscale/",
            from: "/go/tailscale",
          },
          {
            to: "/unraid-os/manual/security/tailscale/#adding-tailscale-to-docker-containers",
            from: "/go/tailscale-docker",
          },
        ],
      },
    ],
  ],
};

module.exports = config;
