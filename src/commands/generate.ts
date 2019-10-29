import { Command, flags } from "@oclif/command";
import { execSync } from "child_process";
import * as path from "path";
import * as fs from "fs";

// The root of our package, so that we can leverage the scripts in the `package.json`
const rootDirectory = path.join(__dirname, "..");
const defaultTemplatePath = `${rootDirectory}/_templates`;
// Grab the path of the user's project
const pathWhereScriptIsRunning = process.cwd();

// This is where their templates are (at least we assume so)
const theirTemplatePath = pathWhereScriptIsRunning + "/_templates";

// Check if they have a template directory
const hasTemplates = fs.existsSync(theirTemplatePath);

export default class Generate extends Command {
  static description = "generates new files";

  static examples = [
    `$ eb-scripts generate -t react-component -n MyNewComponent
    Loaded templates: _templates
    added: src/MyNewComponent.js
`
  ];

  static flags = {
    help: flags.help({ char: "h" }),
    // flag with a value (-n, --name=VALUE)
    name: flags.string({ char: "n", description: "name to print" }),
    // flag with a value (-t, --template=VALUE)
    template: flags.string({ char: "t", description: "template to use" })
  };

  static args = [{ name: "component name" }];

  async run() {
    const { args, flags } = this.parse(Generate);

    const name = flags.name || "world";
    const template = flags.template || "";
    this.log(
      `Generating new component using template ${template} at ./src/components/${name}.js`
    );
    // If they do have templates, use theirs
    if (hasTemplates) {
      execSync(
        `HYGEN_TMPLS=${theirTemplatePath} yarn g:component ${name} --path=${pathWhereScriptIsRunning}`,
        { cwd: rootDirectory, stdio: "inherit" }
      );
    } else {
      // Otherwise, use ours
      execSync(
        `HYGEN_TMPLS=${defaultTemplatePath} yarn g:component ${name} --path=${pathWhereScriptIsRunning}`,
        { cwd: rootDirectory, stdio: "inherit" }
      );
    }
  }
}
