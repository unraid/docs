// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");
const { sortSidebarItems } = require("./sitebar-semver-sort");

const locales = ["en", "zh", "es", 'fr', 'ge']
/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Unraid Docs",
  tagline: "Documentation for Unraid",
  favicon: "img/favicon.svg",  // https://dev.to/masakudamatsu/favicon-nightmare-how-to-maintain-sanity-3al7

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
    locales,
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
        gtag: {
          trackingID: 'G-CZENQ1ZPEH',
          anonymizeIP: true
        }
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      announcementBar: {
        id: 'underConstruction', // change this ID when you change the content so it'll show for users that previously closed the announcement
        content: 'Welcome to the new Unraid Documentation! 🚧 Currently Under Construction 🚧 <a href="https://wiki.unraid.net" target="_blank">Legacy Wiki</a> ',
        isCloseable: true,
        backgroundColor: '#ff8c2f',
        textColor: '#fff',
      },
      colorMode: { defaultMode: "dark", respectPrefersColorScheme: true },
      image: "img/meta-unraid.png",
      metadata: [
        { name: "theme-color", content: "#242526", media: "(prefers-color-scheme: dark)" }, // matches docusaurus theme rather than unraid specific color
        { name: "theme-color", content: "#ffffff", media: "(prefers-color-scheme: light)" },
        { name: "color-scheme", content: "dark light" },
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
              { label: "Contribute on Github", href: "https://github.com/unraid/docs" },
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
      },
    }),
  plugins: [
    [
      require.resolve("@cmfcmf/docusaurus-search-local"),
      {
        indexDocs: true,
        indexDocSidebarParentCategories: 2,
        language: locales
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
