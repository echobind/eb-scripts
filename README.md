eb-scripts
==========

A CLI and scripts used at Echobind

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/eb-scripts.svg)](https://npmjs.org/package/eb-scripts)
[![Downloads/week](https://img.shields.io/npm/dw/eb-scripts.svg)](https://npmjs.org/package/eb-scripts)
[![License](https://img.shields.io/npm/l/eb-scripts.svg)](https://github.com/echobind/eb-scripts/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g eb-scripts
$ eb-scripts COMMAND
running command...
$ eb-scripts (-v|--version|version)
eb-scripts/0.0.0 darwin-x64 node-v10.16.0
$ eb-scripts --help [COMMAND]
USAGE
  $ eb-scripts COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`eb-scripts hello [FILE]`](#eb-scripts-hello-file)
* [`eb-scripts help [COMMAND]`](#eb-scripts-help-command)

## `eb-scripts hello [FILE]`

describe the command here

```
USAGE
  $ eb-scripts hello [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print

EXAMPLE
  $ eb-scripts hello
  hello world from ./src/hello.ts!
```

_See code: [src/commands/hello.ts](https://github.com/echobind/eb-scripts/blob/v0.0.0/src/commands/hello.ts)_

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
<!-- commandsstop -->
