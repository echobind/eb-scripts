# eb-scripts

[![All Contributors](https://img.shields.io/badge/all_contributors-5-orange.svg?style=flat-square)](#contributors)

A CLI and scripts used at Echobind

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/eb-scripts.svg)](https://npmjs.org/package/eb-scripts)
[![Downloads/week](https://img.shields.io/npm/dw/eb-scripts.svg)](https://npmjs.org/package/eb-scripts)
[![License](https://img.shields.io/npm/l/eb-scripts.svg)](https://github.com/echobind/eb-scripts/blob/master/package.json)

<!-- toc -->

- [eb-scripts](#eb-scripts)
- [Quickstart](#quickstart)
- [Usage](#usage)
- [Commands](#commands)
- [Contributing](#contributing)
  <!-- tocstop -->

# Quickstart

To get started quickly, from the root of your project run:

```shell
npx eb-scripts init (react|react-typescript|react-native-typescript)
```

This will install `eb-scripts` as a `devDependency` and add a few helpful `hygen` scripts to your `package.json`.

# Usage

<!-- usage -->

```sh-session
$ npm install -g eb-scripts
$ eb-scripts COMMAND
running command...
$ eb-scripts (-v|--version|version)
eb-scripts/2.0.0 linux-x64 node-v13.1.0
$ eb-scripts --help [COMMAND]
USAGE
  $ eb-scripts COMMAND
...
```

<!-- usagestop -->

# Commands

<!-- commands -->

- [`eb-scripts generate TEMPLATENAME`](#eb-scripts-generate-templatename)
- [`eb-scripts help [COMMAND]`](#eb-scripts-help-command)
- [`eb-scripts init PROJECT`](#eb-scripts-init-project)

## `eb-scripts generate TEMPLATENAME`

generates new files

```
USAGE
  $ eb-scripts generate TEMPLATENAME

ARGUMENTS
  TEMPLATENAME  (react-component|react-typescript-component|react-native-typescript-component|react-native-typescript-sc
                reen|react-native-e2e|util-typescript) the template you want to use

OPTIONS
  -h, --help       show CLI help
  -n, --name=name  [default: MyNewComponent] name to print
  -p, --path=path  path to where you want the files to go

EXAMPLE
  $ eb-scripts generate react-component -n MyNewComponent -p src/components
       Loaded templates: _templates
       added: src/MyNewComponent.js
```

_See code: [src/commands/generate.ts](https://github.com/echobind/eb-scripts/blob/v2.0.0/src/commands/generate.ts)_

## `eb-scripts help [COMMAND]`

display help for eb-scripts

```
USAGE
  $ eb-scripts help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v2.2.1/src/commands/help.ts)_

## `eb-scripts init PROJECT`

initializes project by installing `eb-scripts` and adding scripts to `package.json`

```
USAGE
  $ eb-scripts init PROJECT

ARGUMENTS
  PROJECT  (react|react-typescript|react-native-typescript) The language or framework of the project.
           Valid options: react,react-typescript,react-native-typescript

OPTIONS
  -h, --help  show CLI help

EXAMPLE
  $ npx eb-scripts init react
```

_See code: [src/commands/init.ts](https://github.com/echobind/eb-scripts/blob/v2.0.0/src/commands/init.ts)_

<!-- commandsstop -->

# Contributing

If you're interested in contributing, please read our [CONTRIBUTING](https://github.com/echobind/eb-scripts/blob/master/CONTRIBUTING.md) guide.

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
<table>
  <tr>
    <td align="center"><a href="https://jsjoe.io"><img src="https://avatars3.githubusercontent.com/u/3806031?v=4" width="100px;" alt="JavaScript Joe"/><br /><sub><b>JavaScript Joe</b></sub></a><br /><a href="https://github.com/echobind/eb-scripts/commits?author=jsjoeio" title="Code">💻</a> <a href="https://github.com/echobind/eb-scripts/commits?author=jsjoeio" title="Documentation">📖</a> <a href="#example-jsjoeio" title="Examples">💡</a> <a href="#maintenance-jsjoeio" title="Maintenance">🚧</a></td>
    <td align="center"><a href="https://github.com/cmejet"><img src="https://avatars3.githubusercontent.com/u/7119624?v=4" width="100px;" alt="Jenn"/><br /><sub><b>Jenn</b></sub></a><br /><a href="#review-cmejet" title="Reviewed Pull Requests">👀</a></td>
    <td align="center"><a href="http://alvincrespo.com"><img src="https://avatars0.githubusercontent.com/u/151311?v=4" width="100px;" alt="Alvin Crespo"/><br /><sub><b>Alvin Crespo</b></sub></a><br /><a href="https://github.com/echobind/eb-scripts/commits?author=alvincrespo" title="Code">💻</a> <a href="https://github.com/echobind/eb-scripts/commits?author=alvincrespo" title="Documentation">📖</a> <a href="https://github.com/echobind/eb-scripts/commits?author=alvincrespo" title="Tests">⚠️</a> <a href="#review-alvincrespo" title="Reviewed Pull Requests">👀</a></td>
    <td align="center"><a href="http://echobind.com"><img src="https://avatars1.githubusercontent.com/u/14339?v=4" width="100px;" alt="Chris Ball"/><br /><sub><b>Chris Ball</b></sub></a><br /><a href="#infra-cball" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="#ideas-cball" title="Ideas, Planning, & Feedback">🤔</a> <a href="#review-cball" title="Reviewed Pull Requests">👀</a></td>
    <td align="center"><a href="http://jeffreyzhen.com"><img src="https://avatars0.githubusercontent.com/u/13550272?v=4" width="100px;" alt="Jeffrey Zhen"/><br /><sub><b>Jeffrey Zhen</b></sub></a><br /><a href="#review-jeffreyzhen" title="Reviewed Pull Requests">👀</a></td>
  </tr>
</table>

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
