import * as path from "path";
import * as fse from "fs-extra";
import { execSync } from "child_process";
import { DEFAULT_COMPONENT_NAME } from "../commands/generate";

let root = process.cwd();
let tempRoot = path.join(`${root}/src`, "/components");

describe("The `generate` command", () => {
  beforeAll(async () => {
    // create our temporary directory
    try {
      await fse.ensureDir(tempRoot);
    } catch (error) {
      console.error(error);
    }
  });

  afterAll(async () => {
    // delete our temporary directories
    try {
      await fse.remove(tempRoot);
      await fse.remove(`${root}/_templates`);
    } catch (err) {
      console.error(err);
    }
  });

  it("expects to find a temporary directory in src/components", async () => {
    const tempDirectoryExists = await fse.pathExists(tempRoot);

    expect(tempDirectoryExists).toBe(true);
  });

  it("throws an error if you don't pass any args", async () => {
    const generateCommand = () =>
      execSync(`./bin/run generate`, {
        cwd: root
      });

    expect(generateCommand).toThrowErrorMatchingSnapshot();
  });

  it.skip("works with a flag of a valid template flag", async () => {
    const componentName = "TestComponent";
    const componentFolderPath = `${tempRoot}/${componentName}`;

    execSync(`./bin/run generate react-component -n ${componentName}`, {
      cwd: root
    });

    await expect(newComponentFolderExists).toBe(true);
    // expect(componentIndexExists).toBe(true);
    done();
  });

  it("works without flags", async () => {
    const componentName = DEFAULT_COMPONENT_NAME;
    const componentFolderPath = `${tempRoot}/${componentName}`;

    execSync(`./bin/run generate`, {
      cwd: root
    });

    const newComponentFolderExists = await fse.pathExists(componentFolderPath);
    const componentIndexExists = fse.existsSync(
      `${componentFolderPath}/index.js`
    );

    expect(newComponentFolderExists).toBe(true);
    expect(componentIndexExists).toBe(true);
  });

  it("works with a flag of a valid template flag", async () => {
    const componentName = "TestComponent";
    const componentFolderPath = `${tempRoot}/${componentName}`;

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

  it.skip("uses the default templates if none in the users directory", async () => {
    const componentName = "DefaultTemplateComponent";
    const componentFolderPath = `${tempRoot}/${componentName}`;

    execSync(`./bin/run generate react-component -n ${componentName}`, {
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
      execSync(`./bin/run generate fake-component -n FakeComponent`, {
        cwd: root
      });

  it("throws an error when you pass an invalid flag", () => {
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

    execSync(`./bin/run generate react-component -n ${newComponentName}`, {
      cwd: root
    });

    // Using the template we created, we expect to see a new component
    const newGeneratedComponentExists = fse.existsSync(
      `${tempRoot}/${newComponentName}.jsx`
    );

    // And no folder for the component
    const newGeneratedComponentFolderExists = await fse.pathExists(
      `${tempRoot}/${newComponentName}`
    );

    expect(newGeneratedComponentExists).toBe(true);
    expect(newGeneratedComponentFolderExists).toBe(false);
  });
});

    expect(newComponentFolderExists).toBe(true);
    expect(componentIndexExists).toBe(true);
  });
});
