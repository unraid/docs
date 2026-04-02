<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->
<a id="readme-top"></a>
<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->

<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![Docs Status][docs-shield]][docs-url]
[![Crowdin][crowdin-shield]][crowdin-url]

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/unraid/docs">
    <img src="static/img/unraid-stacked-dark.svg" alt="Unraid Logo" width="120">
  </a>

  <h3 align="center">Unraid Documentation</h3>

  <p align="center">
    Source for the official Unraid documentation site.
    <br />
    <a href="https://docs.unraid.net"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://docs.unraid.net">View Site</a>
    &middot;
    <a href="https://github.com/unraid/docs/issues/new?labels=bug">Report Bug</a>
    &middot;
    <a href="https://github.com/unraid/docs/issues/new?labels=enhancement">Request Content</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->
## About The Project

[![Unraid Docs Screenshot][product-screenshot]](https://docs.unraid.net)

This repository powers the public [Unraid Docs](https://docs.unraid.net) site. It contains source content, UI components, and supporting scripts that help the Unraid team publish accurate, localized, and accessible documentation for Unraid OS and connected services.

The documentation site is built on [Docusaurus 3](https://docusaurus.io/), rendered as a static site, and deployed via GitHub Pages. Remark-based linting, Crowdin integrations, and automated formatting scripts keep Markdown/MDX contributions consistent across the project.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

* [![Docusaurus][Docusaurus-shield]][Docusaurus-url]
* [![React][React.js]][React-url]
* [![TypeScript][TypeScript-shield]][TypeScript-url]
* [![Remark][Remark-shield]][Remark-url]
* [![Vitest][Vitest-shield]][Vitest-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->
## Getting Started

Follow these steps to work on the docs locally.

### Prerequisites

* Node.js 22 or newer (see the `package.json` `engines` field)
* pnpm via [Corepack](https://nodejs.org/api/corepack.html)
* Recommended: [nvm](https://github.com/nvm-sh/nvm) for managing Node versions

Install or update Node with nvm:

```bash
nvm install --lts
nvm use
```

### Installation

1. Clone the repo

   ```bash
   git clone https://github.com/unraid/docs.git
   cd docs
   ```

2. Install dependencies

   ```bash
   corepack enable
   pnpm install
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->
## Usage

Spin up a local Docusaurus dev server:

```bash
pnpm start
```

The local docs dev server listens on `http://localhost:3001` by default. This keeps local iframe/embed testing aligned with [`iframe-test.html`](iframe-test.html) and other localhost examples in the repo.

Preview specific locales (one at a time):

```bash
pnpm start -- --locale zh
pnpm start -- --locale es
```

Run Docusaurus lint/build checks:

```bash
pnpm lint
```

Additional project scripts:

* Type check TypeScript: `pnpm typecheck`
* Unit tests (watch): `pnpm test`
* Single test run (CI): `pnpm test:run`
* Build production site: `pnpm build`
* Preview production build: `pnpm serve`

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Algolia Reindex

The docs search index is refreshed by the GitHub Actions workflow at [`.github/workflows/algolia-reindex.yml`](.github/workflows/algolia-reindex.yml).

That workflow matches the current Algolia Crawler API flow for this site:

* It looks up crawler `unraid` with `GET https://crawler.algolia.com/api/1/crawlers?name=unraid`
* It checks crawler details with `GET https://crawler.algolia.com/api/1/crawlers/<crawler_id>`
* It triggers `POST https://crawler.algolia.com/api/1/crawlers/<crawler_id>/reindex`

The workflow runs automatically on `main` when published docs content changes, and it can also be started manually with **Actions > Algolia Reindex > Run workflow**.

To enable it in GitHub, create these repository secrets:

* `ALGOLIA_CRAWLER_USER_ID`
* `ALGOLIA_CRAWLER_API_KEY`

You can find both in the Algolia dashboard under **Data sources > Crawler > Settings**.

Optional repository variables:

* `ALGOLIA_APP_ID` defaults to `JUYLFQHE7W`
* `ALGOLIA_CRAWLER_NAME` defaults to `unraid`
* `ALGOLIA_REINDEX_DELAY_SECONDS` defaults to `300`

The workflow does not need the standard `ALGOLIA_API_KEY` secret. Reindexing uses the crawler-specific credentials above.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Fork PR Previews

Forked pull requests do not get native Cloudflare preview builds, so this repo uses a two-workflow GitHub Actions flow for untrusted contributions:

* `.github/workflows/fork-preview-build.yml` runs on fork PRs, installs dependencies, builds the site, and uploads the static `build/` output as an artifact.
* `.github/workflows/fork-preview-deploy.yml` runs after that build completes, downloads the artifact in a trusted workflow, and deploys it to a preview-only Cloudflare Pages project with `wrangler pages deploy --branch=pr-<number>`.

This keeps Cloudflare secrets out of the untrusted PR build while still producing a stable preview URL at `https://pr-<number>.<project>.pages.dev`.

Set these before enabling the workflows:

* Repository variable: `CLOUDFLARE_PREVIEW_PAGES_PROJECT`
* Repository secret: `CLOUDFLARE_ACCOUNT_ID`
* Repository secret: `CLOUDFLARE_DEPLOY_TOKEN`

Recommended setup:

1. Create a separate Cloudflare Pages project dedicated to previews only.
2. Keep production on the existing deployment path.
3. Scope the Cloudflare deploy token to Pages edit access for the account that owns the preview project.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTRIBUTING -->
## Contributing

New to the docs? Start with the contributor [Style Guide](docs/contribute/style-guide.mdx) for voice, formatting, and workflow expectations. It covers terminology, MDX conventions, screenshots, and review tips.

Once you're comfortable with the guidelines, typical workflow looks like:

1. Fork the project
2. Create a feature branch (`git checkout -b docs/your-change`)
3. Run `pnpm lint` before committing
4. Commit with a clear message (`git commit -m "docs: describe change"`)
5. Push to your fork and open a pull request against `main`

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Top contributors

<a href="https://github.com/unraid/docs/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=unraid/docs" alt="Contributor graph" />
</a>

<!-- LOCALIZATION -->
## Localization

Help translate Unraid Docs for the global community.

* Join the project on Crowdin: [unraid.crowdin.com/unraid-docs](https://unraid.crowdin.com/unraid-docs)
* Follow the glossary and tone guidance in the [Style Guide](docs/contribute/style-guide.mdx)
* Use `pnpm crowdin:upload` or `pnpm crowdin:upload:sources` after changing English source docs
* Use `pnpm crowdin:upload:translations -- --language <lang>` after manually fixing files under `i18n/` so those fixes are pushed back to Crowdin before the next download
* Use Crowdin project language codes for `<lang>`: `de`, `es`, `fr`, and `zh-CN` for the `i18n/zh` locale
* Use `pnpm crowdin:download` to pull the latest exported translations after uploads
* `pnpm crowdin:sync` updates source strings and downloads translations, but it does not replace `crowdin:upload:translations` when you need to preserve manual translation fixes

Crowdin suggestions are reviewed regularly by maintainers and native-language contributors.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- LICENSE -->
## License

© 2024 Lime Technology, Inc. All rights reserved. See the [Unraid Legal Terms][license-url] for usage guidelines.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->
## Contact

Need help? Open an issue on GitHub or reach us via [unraid.net/contact](https://unraid.net/contact).

Project Link: [https://github.com/unraid/docs](https://github.com/unraid/docs)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

* [Docusaurus](https://docusaurus.io/)
* [Crowdin](https://crowdin.com/)
* [Remark Lint](https://github.com/remarkjs/remark-lint)
* [Vitest](https://vitest.dev/)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/unraid/docs.svg?style=for-the-badge
[contributors-url]: https://github.com/unraid/docs/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/unraid/docs.svg?style=for-the-badge
[forks-url]: https://github.com/unraid/docs/network/members
[stars-shield]: https://img.shields.io/github/stars/unraid/docs.svg?style=for-the-badge
[stars-url]: https://github.com/unraid/docs/stargazers
[issues-shield]: https://img.shields.io/github/issues/unraid/docs.svg?style=for-the-badge
[issues-url]: https://github.com/unraid/docs/issues
[docs-shield]: https://img.shields.io/badge/site-docs.unraid.net-orange?style=for-the-badge
[docs-url]: https://docs.unraid.net
[crowdin-shield]: https://img.shields.io/badge/Crowdin-Join-orange?style=for-the-badge&logo=crowdin
[crowdin-url]: https://unraid.crowdin.com/unraid-docs
[product-screenshot]: static/img/docusaurus.png
[Docusaurus-shield]: https://img.shields.io/badge/Docusaurus-3B0997?style=for-the-badge&logo=docusaurus&logoColor=white
[Docusaurus-url]: https://docusaurus.io/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://react.dev/
[TypeScript-shield]: https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white
[TypeScript-url]: https://www.typescriptlang.org/
[Remark-shield]: https://img.shields.io/badge/Remark-000000?style=for-the-badge&logo=markdown&logoColor=white
[Remark-url]: https://github.com/remarkjs/remark
[Vitest-shield]: https://img.shields.io/badge/Vitest-6E9F18?style=for-the-badge&logo=vitest&logoColor=white
[Vitest-url]: https://vitest.dev/
[license-url]: https://unraid.net/legal
