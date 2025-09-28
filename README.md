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

* Node.js 18 or newer (see the `package.json` `engines` field)
* npm (ships with Node.js)
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
   npm install
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->
## Usage

Spin up a local Docusaurus dev server:

```bash
npm run start
```

Preview specific locales (one at a time):

```bash
npm run start -- --locale zh
npm run start -- --locale es
```

Lint Markdown and MDX content with Remark:

```bash
npm run lint      # report issues
npm run lint:fix  # apply automatic fixes
```

Run the full formatting pipeline, including Crowdin spacing adjustments:

```bash
npm run format
```

Additional project scripts:

* Type check TypeScript: `npm run typecheck`
* Unit tests (watch): `npm run test`
* Single test run (CI): `npm run test:run`
* Build production site: `npm run build`
* Preview production build: `npm run serve`

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTRIBUTING -->
## Contributing

New to the docs? Start with the contributor [Style Guide](docs/contribute/style-guide.mdx) for voice, formatting, and workflow expectations. It covers terminology, MDX conventions, screenshots, and review tips.

Once you're comfortable with the guidelines, typical workflow looks like:

1. Fork the project
2. Create a feature branch (`git checkout -b docs/your-change`)
3. Run `npm run lint` and `npm run format` before committing
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
* Run Crowdin formatting before submitting source updates: `npm run format:crowdin`

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
