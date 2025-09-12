// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer").themes.github;
const darkCodeTheme = require("prism-react-renderer").themes.dracula;
const { sortSidebarItems } = require("./sitebar-semver-sort");

/** @type {import('@docusaurus/types').Config} */
module.exports = async function createConfigAsync() {
  // Import the ES module plugin dynamically
  // @ts-ignore
  const { default: remarkAutoGlossary } = await import('@renatonagliati/remark-auto-glossary');

  return {
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
      defaultLocale: "en",
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
        /** @type {import('@docusaurus/preset-classic').Options} */
        ({
          docs: {
            routeBasePath: "/",
            sidebarPath: require.resolve("./sidebars.js"),
            // Please change this to your repo.
            // Remove this to remove the "edit this page" links.
            editUrl: ({locale, versionDocsDirPath, docPath}) => {
              const DefaultLocale = 'en';
              // Link to Crowdin for non-English docs
              if (locale !== DefaultLocale) {
                return `https://translate.unraid.net/unraid-docs/${locale}`;
              }
              // Link to GitHub for English docs
              return `https://github.com/unraid/docs/tree/main/${versionDocsDirPath}/${docPath}`;
            },
            editLocalizedFiles: true,
            async sidebarItemsGenerator({
              defaultSidebarItemsGenerator,
              ...args
            }) {
              const sidebarItems = await defaultSidebarItemsGenerator(args);
              // @ts-ignore
              return sortSidebarItems(sidebarItems);
            },
            // Use the dynamically imported plugin
            remarkPlugins: [
              [remarkAutoGlossary, { yamlFile: "glossary.yaml" }]
            ],
          },
          /* blog: {
            showReadingTime: true,
            // Please change this to your repo.
            // Remove this to remove the "edit this page" links.
            editUrl: "https://github.com/unraid/docs/tree/main/",
          }, */

          theme: { customCss: require.resolve("./src/css/custom.css") },
          gtag: { trackingID: "G-CZENQ1ZPEH", anonymizeIP: true },
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
        tableOfContents: { minHeadingLevel: 2, maxHeadingLevel: 4 },
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
      // Account redirects
      { from: "/account/", to: "/unraid-connect/overview-and-setup/" },
      { from: "/account/link-key/", to: "/unraid-connect/overview-and-setup/" },
      
      // Category redirects
      { from: "/category/faq/", to: "/unraid-os/troubleshooting/faq/" },
      { from: "/category/guides/", to: "/category/using-unraid-to/" },
      { from: "/category/legacy-documentation/", to: "/" },
      { from: "/category/manual/", to: "/category/unraid-os/" },
      { from: "/category/zfs/", to: "/unraid-os/advanced-configurations/optimize-storage/zfs-storage/" },
      
      // Connect redirects
      { from: "/connect/", to: "/unraid-connect/overview-and-setup/" },
      { from: "/connect/flash-backup/", to: "/unraid-connect/automated-flash-backup/" },
      { from: "/connect/help/", to: "/unraid-connect/overview-and-setup/" },
      { from: "/connect/privacy/", to: "/unraid-connect/overview-and-setup/" },
      { from: "/connect/remote-access/", to: "/unraid-connect/remote-access/" },
      
      // Legacy redirects
      { from: "/legacy/Articles/dual-boot-unraid-and-windows/", to: "/" },
      { from: "/legacy/Articles/expanding-windows-vm-vdisk-partitions/", to: "/" },
      { from: "/legacy/Articles/upgrading-to-unraid-6/", to: "/" },
      { from: "/legacy/FAQ/cache-disk/", to: "/unraid-os/using-unraid-to/manage-storage/cache-pools/" },
      { from: "/legacy/FAQ/check-disk-filesystems/", to: "/unraid-os/using-unraid-to/manage-storage/array-configuration/#checking-array-devices" },
      { from: "/legacy/FAQ/check-harddrive-speed/", to: "/unraid-os/system-administration/monitor-performance/smart-reports-and-disk-health/" },
      { from: "/legacy/FAQ/console/", to: "/unraid-os/system-administration/advanced-tools/command-line-interface/" },
      { from: "/legacy/FAQ/Parity/", to: "/unraid-os/using-unraid-to/manage-storage/array-configuration/" },
      { from: "/legacy/FAQ/parity-swap-procedure/", to: "/unraid-os/using-unraid-to/manage-storage/array-configuration/" },
      { from: "/legacy/FAQ/replacing-a-data-drive/", to: "/unraid-os/using-unraid-to/manage-storage/array-configuration/" },
      { from: "/legacy/FAQ/replacing-multiple-data-drives/", to: "/unraid-os/using-unraid-to/manage-storage/array-configuration/" },
      { from: "/legacy/FAQ/setting-up-cpu-and-board-temperature-sensing/", to: "/unraid-os/system-administration/monitor-performance/smart-reports-and-disk-health/" },
      { from: "/legacy/FAQ/setup-sleep-and-wake-on-lan/", to: "/unraid-os/system-administration/advanced-tools/wake-on-lan/" },
      { from: "/legacy/FAQ/shrink-array/", to: "/unraid-os/using-unraid-to/manage-storage/array-configuration/" },
      { from: "/legacy/FAQ/terminal-access/", to: "/unraid-os/system-administration/advanced-tools/command-line-interface/" },
      { from: "/legacy/FAQ/transferring-files-from-a-network-share-to-unraid/", to: "/unraid-os/using-unraid-to/manage-storage/shares/" },
      { from: "/legacy/FAQ/transferring-files-within-the-unraid-server/", to: "/unraid-os/using-unraid-to/manage-storage/shares/" },
      { from: "/legacy/FAQ/understanding-smart-reports/", to: "/unraid-os/system-administration/monitor-performance/smart-reports-and-disk-health/" },
      { from: "/legacy/FAQ/usb-flash-drive-preparation/", to: "/unraid-os/getting-started/set-up-unraid/create-your-bootable-media/" },
      
      // Unraid OS redirects
      { from: "/unraid-os/faq/installation/", to: "/category/set-up-unraid/" },
      { from: "/unraid-os/faq/licensing-faq/", to: "/unraid-os/troubleshooting/licensing-faq/" },
      { from: "/unraid-os/faq/os-faq/", to: "/unraid-os/troubleshooting/faq/" },
      { from: "/unraid-os/faq/redeem-license-activation-code/", to: "/unraid-os/troubleshooting/licensing-faq/" },
      { from: "/unraid-os/getting-started/", to: "/unraid-os/getting-started/what-is-unraid/" },
      { from: "/unraid-os/getting-started/advanced-bios-config/", to: "/unraid-os/getting-started/set-up-unraid/create-your-bootable-media/" },
      { from: "/unraid-os/getting-started/considerations/", to: "/unraid-os/getting-started/what-is-unraid/" },
      { from: "/unraid-os/getting-started/manual-install-method/", to: "/unraid-os/getting-started/set-up-unraid/create-your-bootable-media/" },
      { from: "/unraid-os/getting-started/quick-install-guide/", to: "/unraid-os/getting-started/set-up-unraid/create-your-bootable-media/" },
      
      // Guides redirects
      { from: "/unraid-os/guides/configuring-time-machine/", to: "/unraid-os/using-unraid-to/manage-storage/apple-time-machine/" },
      { from: "/unraid-os/guides/convert-windows-to-vm/", to: "/unraid-os/using-unraid-to/create-virtual-machines/vm-conversion-and-migration/" },
      { from: "/unraid-os/guides/physical-to-virtual/", to: "/unraid-os/using-unraid-to/create-virtual-machines/vm-conversion-and-migration/" },
      { from: "/unraid-os/guides/wol-setup-for-unraid/", to: "/unraid-os/system-administration/advanced-tools/wake-on-lan/" },
      { from: "/unraid-os/guides/xen-to-kvm/", to: "/unraid-os/using-unraid-to/create-virtual-machines/vm-conversion-and-migration/" },
      
      // Manual redirects
      { from: "/unraid-os/manual/additional-settings/", to: "/unraid-os/getting-started/set-up-unraid/customize-unraid-settings/" },
      { from: "/unraid-os/manual/applications/", to: "/unraid-os/using-unraid-to/run-docker-containers/community-applications/" },
      { from: "/unraid-os/manual/changing-the-flash-device/", to: "/unraid-os/system-administration/maintain-and-update/changing-the-flash-device/" },
      { from: "/unraid-os/manual/docker-management/", to: "/unraid-os/using-unraid-to/run-docker-containers/managing-and-customizing-containers/" },
      { from: "/unraid-os/manual/multi-language/", to: "/unraid-os/using-unraid-to/customize-your-experience/multi-language-support/" },
      { from: "/unraid-os/manual/security/", to: "/unraid-os/system-administration/secure-your-server/security-fundamentals/" },
      { from: "/unraid-os/manual/security/data-encryption/", to: "/unraid-os/system-administration/secure-your-server/securing-your-data/" },
      { from: "/unraid-os/manual/security/flash-drive/", to: "/unraid-os/system-administration/secure-your-server/secure-your-flash-drive/" },
      { from: "/unraid-os/manual/security/good-practices/", to: "/unraid-os/system-administration/secure-your-server/security-fundamentals/" },
      { from: "/unraid-os/manual/security/outgoing-proxy-manager/", to: "/unraid-os/system-administration/secure-your-server/secure-your-outgoing-comms/" },
      { from: "/unraid-os/manual/security/secure-webgui-ssl/", to: "/unraid-os/system-administration/secure-your-server/securing-your-connection/" },
      { from: "/unraid-os/manual/security/tailscale/", to: "/unraid-os/system-administration/secure-your-server/tailscale/" },
      { from: "/unraid-os/manual/security/vpn/", to: "/unraid-os/system-administration/secure-your-server/wireguard/" },
      { from: "/unraid-os/manual/shares/", to: "/unraid-os/using-unraid-to/manage-storage/shares/" },
      { from: "/unraid-os/manual/shares/create-a-share/", to: "/unraid-os/using-unraid-to/manage-storage/shares/" },
      { from: "/unraid-os/manual/shares/delete-a-share/", to: "/unraid-os/using-unraid-to/manage-storage/shares/" },
      { from: "/unraid-os/manual/shares/disk-shares/", to: "/unraid-os/using-unraid-to/manage-storage/shares/" },
      { from: "/unraid-os/manual/shares/network-access/", to: "/unraid-os/using-unraid-to/manage-storage/shares/" },
      { from: "/unraid-os/manual/shares/user-shares/", to: "/unraid-os/using-unraid-to/manage-storage/shares/" },
      { from: "/unraid-os/manual/tools/", to: "/category/advanced-tools/" },
      { from: "/unraid-os/manual/upgrade-instructions/", to: "/unraid-os/system-administration/maintain-and-update/upgrading-unraid/" },
      { from: "/unraid-os/manual/users/", to: "/unraid-os/system-administration/secure-your-server/user-management/" },
      { from: "/unraid-os/manual/users/create-user/", to: "/unraid-os/system-administration/secure-your-server/user-management/" },
      { from: "/unraid-os/manual/users/manage-user/", to: "/unraid-os/system-administration/secure-your-server/user-management/" },
      { from: "/unraid-os/manual/users/reset-password/", to: "/unraid-os/system-administration/secure-your-server/user-management/" },
      { from: "/unraid-os/manual/vm/vm-management/", to: "/unraid-os/using-unraid-to/create-virtual-machines/vm-setup/" },
      { from: "/unraid-os/manual/vm/vm-support/", to: "/unraid-os/using-unraid-to/create-virtual-machines/overview-and-system-prep/" },
      { from: "/unraid-os/manual/zfs/placeholder/", to: "/unraid-os/advanced-configurations/optimize-storage/zfs-storage/" },
      
      // Overview redirects
      { from: "/unraid-os/overview/application-server/", to: "/category/run-docker-containers/" },
      { from: "/unraid-os/overview/nas/", to: "/category/manage-storage/" },
      { from: "/unraid-os/overview/ui-reference/", to: "/unraid-os/getting-started/explore-the-user-interface/tour-the-web-gui/" },
      { from: "/unraid-os/overview/unraid-management/", to: "/category/explore-the-user-interface/" },
      { from: "/unraid-os/overview/virtualization-host/", to: "/category/create-virtual-machines/" },
      { from: "/unraid-os/overview/what-is-unraid/", to: "/unraid-os/getting-started/what-is-unraid/" },
      
      // Troubleshooting redirects
      { from: "/unraid-os/troubleshooting/boot-issues/", to: "/unraid-os/troubleshooting/common-issues/boot-and-startup-failures/" },
      { from: "/unraid-os/troubleshooting/cache-issues/", to: "/unraid-os/using-unraid-to/manage-storage/cache-pools/" },
      { from: "/unraid-os/troubleshooting/crc-errors/", to: "/unraid-os/troubleshooting/diagnostics/udma-crc-errors/" },
      { from: "/unraid-os/troubleshooting/data-recovery/", to: "/unraid-os/troubleshooting/common-issues/data-recovery/" },
      { from: "/unraid-os/troubleshooting/diagnostics-information/", to: "/unraid-os/troubleshooting/diagnostics/capture-diagnostics-and-logs/" },
      { from: "/unraid-os/troubleshooting/docker/", to: "/unraid-os/troubleshooting/common-issues/docker-troubleshooting/" },
      { from: "/unraid-os/troubleshooting/system-crash/", to: "/unraid-os/troubleshooting/common-issues/system-crashes-and-stability/" },
      { from: "/unraid-os/troubleshooting/unclean-shutdowns/", to: "/unraid-os/troubleshooting/common-issues/unclean-shutdowns/" },
      { from: "/unraid-os/troubleshooting/windows-connection/", to: "/category/common-issues/" },
      
      // Additional missing redirects
      { from: "/category/getting-started/", to: "/unraid-os/getting-started/what-is-unraid/" },
      { from: "/connect/about/", to: "/unraid-connect/overview-and-setup/" },
      { from: "/legacy/FAQ/Shrink_array/", to: "/unraid-os/using-unraid-to/manage-storage/array-configuration/" },
      { from: "/unraid-os/faq/unraid-account/", to: "/unraid-connect/overview-and-setup/" },
      { from: "/unraid-os/manual/getting-started/", to: "/unraid-os/getting-started/what-is-unraid/" },
      { from: "/unraid-os/manual/getting-started/manualinstall-method/", to: "/unraid-os/getting-started/set-up-unraid/create-your-bootable-media/" },
      { from: "/unraid-os/manual/troubleshooting/", to: "/unraid-os/troubleshooting/" },
      { from: "/unraid-os/manual/users/resetpassword/", to: "/unraid-os/system-administration/secure-your-server/user-management/" },
      { from: "/unraid-os/manual/vm-management/", to: "/unraid-os/using-unraid-to/create-virtual-machines/vm-setup/" },
      { from: "/unraid-os/manual/what-is-unraid/", to: "/unraid-os/getting-started/what-is-unraid/" },
      { from: "/unraid-os/release-notes/6.12.7/", to: "/unraid-os/release-notes/6.12.8/" },
      
      // Go links redirects
      { from: "/go/account/", to: "/unraid-connect/overview-and-setup/" },
      { from: "/go/adding-array-disks/", to: "/unraid-os/using-unraid-to/manage-storage/array-configuration/#adding-disks" },
      { from: "/go/adding-pools/", to: "/unraid-os/using-unraid-to/manage-storage/array-configuration/#cache-pools" },
      { from: "/go/advanced-bios-config/", to: "/unraid-os/getting-started/set-up-unraid/create-your-bootable-media/" },
      { from: "/go/applications/", to: "/unraid-os/using-unraid-to/run-docker-containers/community-applications/" },
      { from: "/go/changing-the-flash-device/", to: "/unraid-os/system-administration/maintain-and-update/changing-the-flash-device/" },
      { from: "/go/check-filesystem/", to: "/unraid-os/using-unraid-to/manage-storage/array-configuration/#checking-array-devices" },
      { from: "/go/convert-reiser-and-xfs/", to: "/unraid-os/using-unraid-to/manage-storage/file-systems/#converting-to-a-new-file-system-type" },
      { from: "/go/configuring-vpn-tunneledaccess-for-system/", to: "/unraid-os/system-administration/secure-your-server/wireguard/#configuring-vpn-tunneled-access-for-system" },
      { from: "/go/connect-about/", to: "/unraid-connect/overview-and-setup/" },
      { from: "/go/connect-customizabledashboard/", to: "/unraid-connect/overview-and-setup/#customization" },
      { from: "/go/connect-dashboard/", to: "/unraid-connect/overview-and-setup/#dashboard" },
      { from: "/go/connect-deep-linking/", to: "/unraid-connect/overview-and-setup/#deep-linking" },
      { from: "/go/connect-dynamic-remoteaccess/", to: "/unraid-connect/remote-access/#dynamic-remote-access-setup" },
      { from: "/go/connect-flash-backup/", to: "/unraid-connect/automated-flash-backup/" },
      { from: "/go/connect-help/", to: "/unraid-connect/overview-and-setup/" },
      { from: "/go/connect-languagelocalization/", to: "/unraid-connect/overview-and-setup/#language-localization" },
      { from: "/go/connect-licensemanagement/", to: "/unraid-connect/overview-and-setup/#license-management" },
      { from: "/go/connect-manage-serverfrom-connect/", to: "/unraid-connect/overview-and-setup/#manage-your-server-from-within-the-connect-ui" },
      { from: "/go/connect-remote-access/", to: "/unraid-connect/remote-access/" },
      { from: "/go/connect/", to: "/unraid-connect/overview-and-setup/" },
      { from: "/go/determining-hvmiommuhardware-support/", to: "/unraid-os/using-unraid-to/create-virtual-machines/overview-and-system-prep/#hvm--iommu-what-they-enable" },
      { from: "/go/diagnostics/", to: "/unraid-os/troubleshooting/diagnostics/capture-diagnostics-and-logs/" },
      { from: "/go/disk-shares/", to: "/unraid-os/using-unraid-to/manage-storage/shares/" },
      { from: "/go/docker-management/", to: "/unraid-os/using-unraid-to/run-docker-containers/managing-and-customizing-containers/" },
      { from: "/go/download-list/", to: "/unraid-os/download_list/" },
      { from: "/go/expanding-windows-vmvdisk-partitions/", to: "/" },
      { from: "/go/faq-licensing-redeemactivation-code/", to: "/unraid-os/troubleshooting/licensing-faq/#how-to-redeem-a-license-activation-code" },
      { from: "/go/faq-licensing-upgrade/", to: "/unraid-os/troubleshooting/licensing-faq/#how-do-i-upgrade-my-unraid-license" },
      { from: "/go/faq-licensing/", to: "/unraid-os/troubleshooting/licensing-faq/" },
      { from: "/go/faq/", to: "/unraid-os/troubleshooting/faq/" },
      { from: "/go/getting-started/", to: "/unraid-os/getting-started/what-is-unraid/" },
      { from: "/go/lost-root-password/", to: "/unraid-os/system-administration/secure-your-server/user-management/" },
      { from: "/go/manual-install-method/", to: "/unraid-os/getting-started/set-up-unraid/create-your-bootable-media/" },
      { from: "/go/manual/", to: "/category/unraid-os/" },
      { from: "/go/multi-language/", to: "/unraid-os/using-unraid-to/customize-your-experience/multi-language-support/" },
      { from: "/go/outgoing-proxy-manager/", to: "/unraid-os/system-administration/secure-your-server/secure-your-outgoing-comms/" },
      { from: "/go/parity-swap/", to: "/unraid-os/using-unraid-to/manage-storage/array-configuration/#parity-swap" },
      { from: "/go/parity/", to: "/unraid-os/using-unraid-to/manage-storage/array-configuration/" },
      { from: "/go/quick-install-guide-assigningdevices/", to: "/unraid-os/getting-started/set-up-unraid/configure-your-array/#assign-parity-and-data-disks" },
      { from: "/go/quick-install-guide-settingup/", to: "/unraid-os/getting-started/set-up-unraid/deploy-and-configure-unraid-os/" },
      { from: "/go/quick-install-guide/", to: "/unraid-os/getting-started/set-up-unraid/create-your-bootable-media/" },
      { from: "/go/recommendations-onbuying-usb-drives/", to: "/unraid-os/system-administration/maintain-and-update/changing-the-flash-device/#selecting-a-replacement-device" },
      { from: "/go/release-notes/", to: "/category/release-notes/" },
      { from: "/go/release-notes/6.12.12/", to: "/unraid-os/release-notes/6.12.12/" },
      { from: "/go/release-notes/6.12.13/", to: "/unraid-os/release-notes/6.12.13/" },
      { from: "/go/shares/", to: "/unraid-os/using-unraid-to/manage-storage/shares/" },
      { from: "/go/shrink-array/", to: "/unraid-os/using-unraid-to/manage-storage/array-configuration/" },
      { from: "/go/split-level/", to: "/unraid-os/using-unraid-to/manage-storage/shares/#split-level" },
      { from: "/go/storage-management/", to: "/unraid-os/using-unraid-to/manage-storage/array-configuration/" },
      { from: "/go/syslog-server/", to: "/unraid-os/troubleshooting/diagnostics/capture-diagnostics-and-logs/#persistent-logs-syslog-server" },
      { from: "/go/tailscale-docker/", to: "/unraid-os/system-administration/secure-your-server/tailscale/#adding-tailscale-to-docker-containers" },
      { from: "/go/tailscale/", to: "/unraid-os/system-administration/secure-your-server/tailscale/" },
      { from: "/go/troubleshooting/", to: "/unraid-os/troubleshooting/" },
      { from: "/go/upgrade-instructions/", to: "/unraid-os/system-administration/maintain-and-update/upgrading-unraid/" },
      { from: "/go/user-shares/", to: "/unraid-os/using-unraid-to/manage-storage/shares/" },
      { from: "/go/vm-management/", to: "/unraid-os/using-unraid-to/create-virtual-machines/vm-setup/" },
      { from: "/go/vm-support/", to: "/unraid-os/using-unraid-to/create-virtual-machines/overview-and-system-prep/" },
      { from: "/go/vm-system-preparation/", to: "/unraid-os/using-unraid-to/create-virtual-machines/overview-and-system-prep/#system-preparation" },
      { from: "/go/vpn/", to: "/unraid-os/system-administration/secure-your-server/wireguard/" },
      { from: "/go/webgui-ssl/", to: "/unraid-os/system-administration/secure-your-server/securing-your-connection/" },
          ],
        },
      ],
    ],
  };
};
