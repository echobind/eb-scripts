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
// "as const" returns a readonly union type of strings from the array
const VALID_TEMPLATE_TYPES = ["react-component"] as const;

/**
 * @description valid template type
 * @example react-component
 * @todo eventually, we'll add other template types
 */
type Template = typeof VALID_TEMPLATE_TYPES[number];
// We spread the Valid Template Types into a new array
// so that it is "mutable" and can be used with flags.template.options
const templateOptions = [...VALID_TEMPLATE_TYPES];

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
      options: templateOptions
    }
  ];

  async run() {
    const { flags, args } = this.parse(Generate);
    // Assert flags.template as a TemplateType, so TS knows it should be a TemplateType
    const template = args.templateName || DEFAULT_TEMPLATE_NAME;
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
