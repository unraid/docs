function normalizeUrl(value) {
  return value.endsWith("/") ? value : `${value}/`;
}

function toAbsoluteUrl(baseUrl, maybeRelativeUrl) {
  return new URL(maybeRelativeUrl, baseUrl).toString();
}

export default function structuredDataPlugin(context, options) {
  const docsSiteUrl = normalizeUrl(
    new URL(context.siteConfig.baseUrl, context.siteConfig.url).toString(),
  );
  const organizationUrl = normalizeUrl(options.organizationUrl);
  const logoUrl = toAbsoluteUrl(docsSiteUrl, options.logoPath);

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${organizationUrl}#organization`,
        name: options.organizationName,
        url: organizationUrl,
        logo: {
          "@type": "ImageObject",
          "@id": `${docsSiteUrl}#logo`,
          url: logoUrl,
          contentUrl: logoUrl,
          width: options.logoWidth,
          height: options.logoHeight,
        },
      },
      {
        "@type": "WebSite",
        "@id": `${docsSiteUrl}#website`,
        name: context.siteConfig.title,
        url: docsSiteUrl,
        description: context.siteConfig.tagline,
        publisher: {
          "@id": `${organizationUrl}#organization`,
        },
      },
    ],
  };

  return {
    name: "unraid-structured-data",
    injectHtmlTags() {
      return {
        headTags: [
          {
            tagName: "script",
            attributes: {
              type: "application/ld+json",
            },
            innerHTML: JSON.stringify(structuredData),
          },
        ],
      };
    },
  };
}
