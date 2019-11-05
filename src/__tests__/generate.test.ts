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
    // delete our temporary directory
    try {
      await fse.remove(tempRoot);
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

  it("works with a arg of a valid template and uses the default src/components path flag", async () => {
    const componentName = "TestComponent";
    const componentFolderPath = `${tempRoot}/${componentName}`;

    execSync(`./bin/run generate react-component -n ${componentName}`, {
      cwd: root
    });

    await expect(newComponentFolderExists).toBe(true);
    // expect(componentIndexExists).toBe(true);
    done();
  });

  it("throws an error if you don't pass any args", async () => {
    const generateCommand = () =>
      execSync(`./bin/run generate`, {
        cwd: root
      });

    expect(generateCommand).toThrowErrorMatchingSnapshot();
  });

  it("works with a arg of a valid template and uses the default src/components path flag", async () => {
    const componentName = "TestComponent";
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

  it("works with the react-typescript template and uses the default src/components path flag", async () => {
    const componentName = "TypeScriptComponent";
    const componentFolderPath = `${tempRoot}/${componentName}`;

    execSync(
      `./bin/run generate react-typescript-component -n ${componentName}`,
      {
        cwd: root
      }
    );

    const newComponentFolderExists = await fse.pathExists(componentFolderPath);
    const componentIndexExists = fse.existsSync(
      `${componentFolderPath}/index.ts`
    );

    const componentTsxExists = fse.existsSync(
      `${componentFolderPath}/${componentName}.tsx`
    );
    expect(newComponentFolderExists).toBe(true);
    expect(componentIndexExists).toBe(true);
    expect(componentTsxExists).toBe(true);
  });

  it("uses the default templates if none in the users directory and the default src/components path flag", async () => {
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

  it("throws an error when you pass an invalid flag", () => {
    const generateCommand = () =>
      execSync(`./bin/run generate fake-component -n FakeComponent`, {
        cwd: root
      });

  it("throws an error when you pass an invalid flag", () => {
    const generateCommand = () =>
      execSync(`./bin/run generate fake-component -n FakeComponent`, {
        cwd: root
      });

    expect(generateCommand).toThrowErrorMatchingSnapshot();
  });

  it("uses the path flag if passed", async () => {
    const componentName = "PathFlagComponent";
    const customPath = "src/components/other";
    const componentFolderPath = `${customPath}/${componentName}`;

    execSync(
      `./bin/run generate react-component -n ${componentName} -p ${customPath}`,
      {
        cwd: root
      }
    );

    const newComponentFolderExists = await fse.pathExists(componentFolderPath);
    const componentIndexExists = fse.existsSync(
      `${componentFolderPath}/index.js`
    );

    expect(newComponentFolderExists).toBe(true);
    expect(componentIndexExists).toBe(true);
  });

  it("uses the users template if they have one", async () => {
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
    // Remove the /_templates so it doesn't cause side effects
    await fse.remove(`${root}/_templates`);
  });
});

    expect(newComponentFolderExists).toBe(true);
    expect(componentIndexExists).toBe(true);
  });
});
