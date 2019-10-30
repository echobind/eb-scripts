import { Command, flags } from "@oclif/command";

// Grab the path of the user's project
const pathWhereScriptIsRunning = process.cwd();
const DEFAULT_PROJECT_NAME = "react";

export default class Init extends Command {
  static description =
    "initializes project by installing `eb-scripts` and adding scripts to `package.json`";

  static examples = [`$ npx eb-scripts init -p react`];

  static flags = {
    help: flags.help({ char: "h" }),
    // flag with a value (-p, --project=VALUE)
    project: flags.string({
      char: "p",
      description: "language/framework of project"
    })
  };

  static args = [
    {
      name: "project",
      required: true,
      description: "The languague or framework of the project",
      default: "react",
      options: ["react"]
    }
  ];

  async run() {
    const { flags } = this.parse(Init);
    const project = flags.project || DEFAULT_PROJECT_NAME;
    const packageJson = pathWhereScriptIsRunning + "/package.json";

    this.log(`Initializing new ${project} project`);
    this.log(`Grabbing package.json from ${packageJson}`);
  }
}
