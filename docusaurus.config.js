// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");
const { sortSidebarItems } = require("./sitebar-semver-sort");

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Unraid Docs",
  tagline: "Documentation for Unraid",
  favicon: "img/favicon.ico",

  // Set the production url of your site here
  url: "https://docs.unraid.net",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "unraid", // Usually your GitHub org/user name.
  projectName: "docs", // Usually your repo name.

  onBrokenLinks: "log",
  onBrokenMarkdownLinks: "log",
  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en", "zh"],
  },

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
          async sidebarItemsGenerator({ defaultSidebarItemsGenerator, ...args}) {
            const sidebarItems = await defaultSidebarItemsGenerator(args);
            return sortSidebarItems(sidebarItems);
          }
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
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      announcementBar: {
        content:
          'Welcome to the new Unraid Documentation! 🚧 Currently Under Construction 🚧 <a href="https://wiki.unraid.net" target="_blank">Legacy Wiki</a> ',
      },
      colorMode: { defaultMode: "dark", respectPrefersColorScheme: true },
      image: "img/un-mark-gradient.svg",
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
            type: "docSidebar",
            sidebarId: "unraidSidebar",
            position: "left",
            label: "Documentation",
          },
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
        style: "dark",
        links: [
          {
            title: "Documentation",
            items: [
              {
                label: "Home",
                to: "/",
              },
              { label: "Contribute on Github", to: "https://github.com/unraid/docs" },
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
                href: "https://discordapp.com/invite/unraid",
              },
            ],
          },
          {
            title: "More",
            items: [
              {
                label: "Unraid Home",
                to: "https://unraid.net",
              },
              {
                label: "Newsletter",
                to: "https://newsletter.unraid.net",
              },
              {
                label: "Blog",
                href: "https://unraid.net/blog",
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Unraid Inc.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
  plugins: [
    [
      require.resolve("@cmfcmf/docusaurus-search-local"),
      {
        indexDocs: true,
        indexDocSidebarParentCategories: 2,
        language: ['en', 'zh']
      },
    ],
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
  ],
};

module.exports = config;
