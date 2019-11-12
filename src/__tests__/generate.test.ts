import * as path from "path";
import * as fse from "fs-extra";
import { execSync } from "child_process";

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

  it("works with the react-native-typescript-component template and uses the default src/components path flag", async () => {
    const componentName = "Reactnativetypescriptcomponent";
    const componentFolderPath = `${tempRoot}/${componentName}`;

    execSync(
      `./bin/run generate react-native-typescript-component -n ${componentName}`,
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

    //Check if they have a storybook setup
    const hasStoryBookDir = fse.existsSync(
      `${tempRoot}/storybook/stories/index.ts`
    );

    // If they do,
    // we assert that a .stories.tsx file was generated
    if (hasStoryBookDir) {
      const componentStoriesExists = fse.existsSync(
        `${componentFolderPath}/${componentName}.stories.tsx`
      );
      expect(componentStoriesExists).toBe(true);
    }
    expect(newComponentFolderExists).toBe(true);
    expect(componentIndexExists).toBe(true);
    expect(componentTsxExists).toBe(true);
  });

  it.skip("works with the react-native-typescript-screen template and uses the default src/screens path", async () => {
    // TODO - finish this test
    // Because there is a prompt, we'll need to use a spawn from child_process.
    // Will create followup ticket.
    // const pathToScreens = path.join(`${root}/src`, "/screens");
    // const componentName = "ReactNativeTypeScriptScreen";
    // const componentFolderPath = `${pathToScreens}/${componentName}`;
    // const newComponentFolderExists = await fse.pathExists(componentFolderPath);
    // const componentIndexExists = fse.existsSync(
    //   `${componentFolderPath}/index.ts`
    // );
    // const componentTsxExists = fse.existsSync(
    //   `${componentFolderPath}/${componentName}.tsx`
    // );
    // expect(newComponentFolderExists).toBe(true);
    // expect(componentIndexExists).toBe(true);
    // expect(componentTsxExists).toBe(true);
  });

  it("works with the react-native-e2e template and uses the default e2e path", async () => {
    const testName = "ReactNativeE2ETest";
    const e2ePath = "e2e";
    execSync(`./bin/run generate react-native-e2e -n ${testName}`, {
      cwd: root
    });
    const pathToE2e = path.join(`${root}/${e2ePath}`);
    const testFilePath = `${pathToE2e}/${testName}.spec.js`;

    const newTestFileExists = await fse.pathExists(testFilePath);

    expect(newTestFileExists).toBe(true);
    // Remove the /e2e so it doesn't cause side effects
    await fse.remove(`${root}/${e2ePath}`);
  });

  it("works with the util-typescript template ", async () => {
    const testName = "CoolFunction";
    const utilsPath = "utils";
    execSync(
      `./bin/run generate util-typescript -n ${testName} -p ${utilsPath}`,
      {
        cwd: root
      }
    );
    const pathToUtils = path.join(`${root}/`, `${utilsPath}`);
    const utilTestFilePath = `${pathToUtils}/${testName}/test.ts`;
    const utilFilePath = `${pathToUtils}/${testName}/${testName}.ts`;
    const utilIndexFilePath = `${pathToUtils}/${testName}/index.ts`;

    const newTestFileExists = await fse.pathExists(utilTestFilePath);
    const newUtilFileExists = await fse.pathExists(utilFilePath);
    const newUtilIndexFileExists = await fse.pathExists(utilIndexFilePath);

    expect(newTestFileExists).toBe(true);
    expect(newUtilFileExists).toBe(true);
    expect(newUtilIndexFileExists).toBe(true);
    // Remove the utils temp directory so it doesn't cause side effects
    await fse.remove(pathToUtils);
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

    expect(generateCommand).toThrowErrorMatchingSnapshot();
  });

  it("uses the users template if they have one", async () => {
    // Rename the react-component template to keep as a
    await fse.renameSync(
      `${root}/_templates/react-component`,
      `${root}/_templates/react-backup-component`
    );
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
    // Remove the react-component template we created
    await fse.remove(`${root}/_templates/react-component`);
    // Restore our original component
    await fse.renameSync(
      `${root}/_templates/react-backup-component`,
      `${root}/_templates/react-component`
    );
  });
});
