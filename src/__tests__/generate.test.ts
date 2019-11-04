import * as path from "path";
import { execSync } from "child_process";
import {
  checkFileExists,
  makeTempDir,
  checkDirExists,
  removeTempDir,
  copyFile
} from "../utils";
import { DEFAULT_COMPONENT_NAME } from "../commands/generate";

let root = process.cwd();
let tempRoot = path.join(`${root}/src`, "/components");

describe("The `generate` command", () => {
  beforeAll(async () => {
    // create our temporary directory
    try {
      await makeTempDir(tempRoot);
    } catch (error) {
      console.error(error);
    }
  });

  afterAll(async () => {
    // delete our temporary directories
    try {
      await removeTempDir(tempRoot);
      await removeTempDir(`${root}/_templates`);
    } catch (err) {
      console.error(err);
    }
  });

  it("expects to find a temporary directory in src/components", async () => {
    const tempDirectoryExists = await checkDirExists(tempRoot);

    expect(tempDirectoryExists).toBe(true);
  });

  it("works without flags", async () => {
    const componentName = DEFAULT_COMPONENT_NAME;
    const componentFolderPath = `${tempRoot}/${componentName}`;

    execSync(`./bin/run generate`, {
      cwd: root
    });

    const newComponentFolderExists = await checkDirExists(componentFolderPath);
    const componentIndexExists = checkFileExists(
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

    const newComponentFolderExists = await checkDirExists(componentFolderPath);
    const componentIndexExists = checkFileExists(
      `${componentFolderPath}/index.js`
    );

    expect(newComponentFolderExists).toBe(true);
    expect(componentIndexExists).toBe(true);
  });

  it("uses the default templates if none in the users directory", async () => {
    const componentName = "DefaultTemplateComponent";
    const componentFolderPath = `${tempRoot}/${componentName}`;

    execSync(`./bin/run generate -t react-component -n ${componentName}`, {
      cwd: root
    });

    const newComponentFolderExists = await checkDirExists(componentFolderPath);
    const componentIndexExists = checkFileExists(
      `${componentFolderPath}/index.js`
    );

    expect(newComponentFolderExists).toBe(true);
    expect(componentIndexExists).toBe(true);
  });

  it("throws an error when you pass an invalid flag", () => {
    const generateCommand = () =>
      execSync(`./bin/run generate -t fake-component -n FakeComponent`, {
        cwd: root
      });

    expect(generateCommand).toThrowErrorMatchingSnapshot();
  });

  it("uses the users template if they have one", async () => {
    const pathToNewTemplate = `${root}/_templates/react-component/new`;
    const newComponentName = "Test";
    const newTemplate = `---\nto: <%= path %>/src/components/<%= h.changeCase.pascal(name) %>.jsx
    ---
    <% component = h.changeCase.pascal(name) -%>
    import React from 'react'

    /** Description of component */
    export const <%= component %> = () => {
      return (
      <h1>Hello <%= component %> component!</h1>
      )
    }`;
    // Make a react-component template
    await makeTempDir(pathToNewTemplate);
    // Add template to _templates/react-component/new
    await copyFile(
      `${root}/src/utils/componentTestTemplate.ejs.t`,
      `${pathToNewTemplate}/component.ejs.t`
    );

    const newTemplateFolderExists = await checkDirExists(pathToNewTemplate);
    const newTemplateFileExists = checkFileExists(
      `${pathToNewTemplate}/component.ejs.t`
    );

    // Check that it made our template and new file
    expect(newTemplateFolderExists).toBe(true);
    expect(newTemplateFileExists).toBe(true);

    execSync(`./bin/run generate -t react-component -n ${newComponentName}`, {
      cwd: root
    });

    // Using the template we created, we expect to see a new component
    const newGeneratedComponentExists = checkFileExists(
      `${tempRoot}/${newComponentName}.jsx`
    );

    // And no folder for the component
    const newGeneratedComponentFolderExists = await checkDirExists(
      `${tempRoot}/${newComponentName}`
    );

    expect(newGeneratedComponentExists).toBe(true);
    expect(newGeneratedComponentFolderExists).toBe(false);
  });
});
