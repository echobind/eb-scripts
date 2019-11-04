import * as path from "path";
import * as fse from "fs-extra";
import { execSync } from "child_process";
import { DEFAULT_COMPONENT_NAME } from "../commands/generate";

let root = process.cwd();

describe("The `init` command", () => {
  beforeAll(async () => {
    try {
      // Back up our package.json so we don't break anything during our tests
      await fse.renameSync(`${root}/package.json`, `${root}/backup.json`);
    } catch (error) {
      console.error(error);
    }
  });

  beforeEach(async () => {
    // Create a copy package.json so we can use a fresh copy for each test
    await fse.copyFile(`${root}/backup.json`, `${root}/package.json`);
  });

  afterEach(async () => {
    // Remove package.json after each test completes
    await fse.remove(`${root}/package.json`);
  });

  afterAll(async () => {
    try {
      // Restore our package.json from backup
      await fse.renameSync(`${root}/backup.json`, `${root}/package.json`);
    } catch (err) {
      console.error(err);
    }
  });

  it("expects to find a backup.json and package.json", async () => {
    const backupJsonExists = fse.existsSync(`${root}/backup.json`);
    const packageJsonExists = fse.existsSync(`${root}/package.json`);

    expect(backupJsonExists).toBe(true);
    expect(packageJsonExists).toBe(true);
  });

  it.skip("works without flags", async () => {
    // Run the command
    execSync(`./bin/run init`, {
      cwd: root
    });

    const packageJson = require(`${root}/package.json`);
    const scripts = packageJson.scripts;

    const devDependencies = packageJson.devDependencies;

    // Check for eb-scripts in the devDependencies
    const hasEbScripts = Object.keys(devDependencies).includes("eb-scripts");

    expect(hasEbScripts).toBe(true);
  });

  it.skip("works with a flag of a valid template flag", async () => {
    const componentName = "TestComponent";
    const componentFolderPath = `${root}/${componentName}`;

    execSync(`./bin/run init -t react-component -n ${componentName}`, {
      cwd: root
    });

    const newComponentFolderExists = await fse.pathExists(componentFolderPath);
    const componentIndexExists = fse.existsSync(
      `${componentFolderPath}/index.js`
    );

    expect(newComponentFolderExists).toBe(true);
    expect(componentIndexExists).toBe(true);
  });

  it.skip("uses the default templates if none in the users directory", async () => {
    const componentName = "DefaultTemplateComponent";
    const componentFolderPath = `${root}/${componentName}`;

    execSync(`./bin/run generate -t react-component -n ${componentName}`, {
      cwd: root
    });

    const newComponentFolderExists = await fse.pathExists(componentFolderPath);
    const componentIndexExists = fse.existsSync(
      `${componentFolderPath}/index.js`
    );

    expect(newComponentFolderExists).toBe(true);
    expect(componentIndexExists).toBe(true);
  });

  it.skip("throws an error when you pass an invalid flag", () => {
    const generateCommand = () =>
      execSync(`./bin/run generate -t fake-component -n FakeComponent`, {
        cwd: root
      });

    expect(generateCommand).toThrowErrorMatchingSnapshot();
  });

  it.skip("uses the users template if they have one", async () => {
    const pathToNewTemplate = `${root}/_templates/react-component/new`;
    const newComponentName = "Test";
    // Make a react-component template
    await fse.ensureDir(pathToNewTemplate);
    // Add template to _templates/react-component/new
    await fse.copyFileSync(
      `${root}/src/__tests__/helpers/componentTestTemplate.ejs.t`,
      `${pathToNewTemplate}/component.ejs.t`
    );

    const newTemplateFolderExists = await fse.pathExists(pathToNewTemplate);
    const newTemplateFileExists = fse.existsSync(
      `${pathToNewTemplate}/component.ejs.t`
    );

    // Check that it made our template and new file
    expect(newTemplateFolderExists).toBe(true);
    expect(newTemplateFileExists).toBe(true);

    execSync(`./bin/run generate -t react-component -n ${newComponentName}`, {
      cwd: root
    });

    // Using the template we created, we expect to see a new component
    const newGeneratedComponentExists = fse.existsSync(
      `${root}/${newComponentName}.jsx`
    );

    // And no folder for the component
    const newGeneratedComponentFolderExists = await fse.pathExists(
      `${root}/${newComponentName}`
    );

    expect(newGeneratedComponentExists).toBe(true);
    expect(newGeneratedComponentFolderExists).toBe(false);
  });
});
