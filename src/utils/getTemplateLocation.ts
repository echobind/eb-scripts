import * as fs from "fs";
import * as path from "path";

// The root of our package, so that we can leverage the scripts in the `package.json`
export const rootDirectory = path.join(__dirname, "..");

const DEFAULT_TEMPLATE_PATH = `${rootDirectory}/_templates`;

// Grab the path of the user's project
export const pathWhereScriptIsRunning = process.cwd();

// This is where their templates are (at least we assume so)
const theirTemplatePath = pathWhereScriptIsRunning + "/_templates";

const hasTemplates = fs.existsSync(theirTemplatePath);

export const getTemplateLocation = () => {
  // Default to our template
  let templateLocation = `HYGEN_TMPLS=${DEFAULT_TEMPLATE_PATH}`;

  // If they do have templates, use theirs
  if (hasTemplates) {
    templateLocation = `HYGEN_TMPLS=${theirTemplatePath}`;
  }

  return templateLocation;
};
