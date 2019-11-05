import { Command, flags } from "@oclif/command";
import { execSync } from "child_process";
import * as fs from "fs";

const DEFAULT_PROJECT_NAME = "react";

/**
 * @description a script that is used in the `package.json` scripts
 * @example "g:component": "eb-scripts generate -t react-component -n"
 */
type Scripts = {
  /* A script */
  [script in string]: string;
};

/**
 * @description valid project type
 * @example `react`
 * @todo eventually, we'll add others like `react-native`, `react-typescript`, `node`, etc.
 */
type ProjectType = "react";

/**
 * @description the available options for generate scripts that may be added to a user's `package.json`
 */
type ScriptByProject = {
  [project in ProjectType]: Scripts;
};

// Grab the path of the user's project
const pathWhereScriptIsRunning = process.cwd();
const scriptsByProject: ScriptByProject = {
  react: {
    "g:component": "eb-scripts generate -t react-component -n"
  }
};

// Use the keys from scriptsByProject as valid projec types
const validProjectTypes: ProjectType[] = Object.keys(
  scriptsByProject
) as ProjectType[];
export default class Init extends Command {
  static description =
    "initializes project by installing `eb-scripts` and adding scripts to `package.json`";

  static examples = [`$ npx eb-scripts init -p react`];

  static flags = {
    help: flags.help({ char: "h" }),
    // flag with a value (--project=VALUE)
    project: flags.string({
      description: "language/framework of project",
      options: validProjectTypes
    })
  };

  static args = [
    {
      name: "project",
      required: true,
      description: "The language or framework of the project",
      default: "react",
      options: validProjectTypes
    }
  ];

  async run() {
    const { flags, args } = this.parse(Init);
    const project = args.project || flags.project || DEFAULT_PROJECT_NAME;
    // Grab their package Json
    const packageJsonLocation = `${pathWhereScriptIsRunning}/package.json`;
    const packageJson = require(packageJsonLocation);
    const theirScripts = packageJson.scripts || {};
    const validProjectTypes = Object.keys(scriptsByProject);
    const isValidProject = validProjectTypes.includes(project);

    // Check if project is valid
    if (!isValidProject) {
      console.error(`
        Error: invalid project type.
        Please use one of the following:
        ${validProjectTypes}
        `);
      return;
    }

    this.log(`Initializing new ${project} project`);

    // Otherwise, it is valid, so we tell TypeScript to assert it as a ProjectType
    const projectScripts: Scripts = scriptsByProject[project as ProjectType];

    // Combine their scripts with our scripts
    const updatedScripts = { ...projectScripts, ...theirScripts };
    packageJson.scripts = updatedScripts;

    this.log(`Writing to package.json scripts...`);
    fs.writeFileSync(packageJsonLocation, JSON.stringify(packageJson, null, 2));

    // *******************
    // Install `eb-scripts`
    // We do this so that the scripts we added to their package.json
    // work correctly.
    // *******************

    this.log(`Installing eb-scripts as a devDependency`);

    const yarnLockPath = pathWhereScriptIsRunning + "/yarn.lock";
    const hasYarnLock = fs.existsSync(yarnLockPath);

    // Check if they're using yarn
    if (hasYarnLock) {
      execSync("yarn add --dev eb-scripts", { cwd: pathWhereScriptIsRunning });
    } else {
      execSync("npm add --save-dev eb-scripts", {
        cwd: pathWhereScriptIsRunning
      });
    }

    this.log(`Done initializing.`);
  }
}
