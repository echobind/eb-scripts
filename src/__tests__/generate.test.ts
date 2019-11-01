import * as path from "path";
import { exec, execSync } from "child_process";
import * as util from "util";
import {
  checkFileExists,
  makeTempDir,
  checkDirExists,
  removeTempDir,
  writeFile
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
    // delete our temporary directory
    try {
      await removeTempDir(tempRoot);
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
    const newTemplate = `
    ---
    to: <%= path %>/src/components/Test.jsx
    ---
    <% component = h.changeCase.pascal(name) -%>
    import React from 'react'

    /** Description of component */
    export const <%= component %> = () => {
      return (
      <h1>Hello <%= component %> component!</h1>
      )
    }
    `;
    // Make a react-component template
    await makeTempDir(pathToNewTemplate);
    // Add template to _templates/react-component/new
    await writeFile(`${pathToNewTemplate}/component.ejs.t`, newTemplate);

    // TODO
    // 1. assert that those _templates and component.ejs.t  were created
    // 4. run command to generate
    // 5. assert that the Test.jsx file is there
    // 6. the other files should not be there.
  });
});
