# Unraid Documentation

View the live documentation on our website [Unraid Docs](https://docs.unraid.net)

Unraid Docs are built using [Docusaurus](https://docusaurus.io/)

### Installation

```
$ npm i
```

### Linting

Install [DavidAnson.vscode-markdownlint](https://marketplace.visualstudio.com/items?itemName=DavidAnson.vscode-markdownlint) and follow its linting instructions.

### Local Development

```
$ npm run start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

```
$ npm run start -- --locale zh
$ npm run start -- --locale es
```
These commands start a local development server for a specific locale (run one at a time.)


### Build

```
$ npm run build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service such as:

```
$ npm run serve
```


### Deployment

Using SSH:

```
$ USE_SSH=true yarn deploy
```

Not using SSH:

```
$ GIT_USER=<Your GitHub username> yarn deploy
```

If you are using GitHub pages for hosting, this command is a convenient way to build the website and push to the `gh-pages` branch.

