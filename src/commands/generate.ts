import { Command, flags } from "@oclif/command";
import { execSync } from "child_process";
import {
  getTemplateLocation,
  pathWhereScriptIsRunning,
  rootDirectory
} from "../utils/getTemplateLocation";

export const DEFAULT_COMPONENT_NAME = "MyNewComponent";
const DEFAULT_TEMPLATE_NAME = "react-component";

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
    `$ eb-scripts generate -t react-component -n MyNewComponent
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
    name: flags.string({ char: "n", description: "name to print" })
  };

  static args = [
    {
      name: "template name",
      description: "the template you want to use",
      required: true,
      default: DEFAULT_TEMPLATE_NAME,
      options: ["react-component"] as TemplateType[]
    },
    {
      name: "component name",
      description: "the name of the component or file you want to generate",
      default: DEFAULT_COMPONENT_NAME
    }
  ];

  async run() {
    const { flags } = this.parse(Generate);
    // Assert flags.template as a TemplateType, so TS knows it should be a TemplateType
    const template = (flags.template as TemplateType) || DEFAULT_TEMPLATE_NAME;
    // Then we manually check if it is
    const isValidTemplate = validTemplateTypes.includes(template);
    const name = flags.name || DEFAULT_COMPONENT_NAME;
    const templateLocation = getTemplateLocation();
    const templatePath = `HYGEN_TMPLS=${templateLocation}`;

    this.log(
      `Generating new component using template ${template} at ./src/components/${name}.js`
    );

    // Generate template
    execSync(
      `${templatePath} yarn gen ${template} new ${name} --path=${pathWhereScriptIsRunning}`,
      { cwd: rootDirectory, stdio: "inherit" }
    );
  }
}
