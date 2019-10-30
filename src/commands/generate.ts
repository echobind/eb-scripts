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

const DEFAULT_COMPONENT_NAME = "MyNewComponent";
const DEFAULT_TEMPLATE_NAME = "react-component";

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
    // flag with a value (-t, --template=VALUE)
    // name should correspond with one of the following names in /_templates
    template: flags.string({ char: "t", description: "template to use" }),
    // flag with a value (-n, --name=VALUE)
    name: flags.string({ char: "n", description: "name to print" })
  };

  static args = [
    {
      name: "template name",
      description: "the template you want to use",
      required: true,
      default: DEFAULT_TEMPLATE_NAME,
      options: ["react-component"]
    },
    {
      name: "component name",
      description: "the name of the component or file you want to generate",
      default: DEFAULT_COMPONENT_NAME
    }
  ];

  async run() {
    const { flags } = this.parse(Generate);
    const template = flags.template || DEFAULT_TEMPLATE_NAME;
    const name = flags.name || DEFAULT_COMPONENT_NAME;
    let templateLocation = "";

    this.log(
      `Generating new component using template ${template} at ./src/components/${name}.js`
    );

    // If they do have templates, use theirs
    if (hasTemplates) {
      templateLocation = `HYGEN_TMPLS=${theirTemplatePath}`;
    } else {
      // Otherwise, use ours
      templateLocation = `HYGEN_TMPLS=${defaultTemplatePath}`;
    }

    // Generate template
    execSync(
      `${templateLocation} yarn gen ${template} new ${name} --path=${pathWhereScriptIsRunning}`,
      { cwd: rootDirectory, stdio: "inherit" }
    );
  }
}
