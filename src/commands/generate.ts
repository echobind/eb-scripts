import { Command, flags } from "@oclif/command";
import { execSync } from "child_process";
import {
  getTemplateLocation,
  pathWhereScriptIsRunning,
  rootDirectory
} from "../utils/";

export const DEFAULT_COMPONENT_NAME = "MyNewComponent";
const DEFAULT_TEMPLATE_NAME = "react-component";
const DEFAULT_PATH = "src/components";

/**
 * @description valid template type
 * @example react-component
 * @todo eventually, we'll add other template types
 */
type TemplateType = "react-component";

const validTemplateTypes: TemplateType[] = ["react-component"];

export default class Generate extends Command {
  static description = "generates new files";

  static examples = [
    `$ eb-scripts generate react-component -n MyNewComponent -p src/components
    Loaded templates: _templates
    added: src/MyNewComponent.js
`
  ];

  static flags = {
    help: flags.help({ char: "h" }),
    // flag with a value (-t, --template=VALUE)
    // name should correspond with one of the following names in /_templates
    template: flags.string({
      char: "t",
      description: "template to use",
      options: validTemplateTypes
    }),
    // flag with a value (-n, --name=VALUE)
    name: flags.string({
      char: "n",
      description: "name to print",
      default: DEFAULT_COMPONENT_NAME
    }),
    // flag with a value (-p, --path=VALUE)
    path: flags.string({
      char: "p",
      default: DEFAULT_PATH,
      description: "path to where you want the files to go"
    })
  };

  static args = [
    {
      name: "templateName",
      description: "the template you want to use",
      required: true,
      options: ["react-component"] as TemplateType[]
    }
  ];

  async run() {
    const { flags, args } = this.parse(Generate);
    // Assert flags.template as a TemplateType, so TS knows it should be a TemplateType
    const template =
      (args.templateName as TemplateType) || DEFAULT_TEMPLATE_NAME;
    const name = flags.name;
    // The path where the files will go when generated
    const path = flags.path;
    const templateLocation = getTemplateLocation();
    const templatePath = `HYGEN_TMPLS=${templateLocation}`;

    this.log(
      `Generating new component using template ${template} at ${pathWhereScriptIsRunning}/${path}`
    );

    // Generate template
    execSync(
      `${templatePath} yarn gen ${template} new ${name} --root=${pathWhereScriptIsRunning} --path=${path}`,
      { cwd: rootDirectory, stdio: "inherit" }
    );
  }
}
