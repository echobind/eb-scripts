import * as fse from "fs-extra";
import * as path from "path";
import { test } from "@oclif/test";
import { execSync } from "child_process";
import {
  checkFileExists,
  makeTempDir,
  checkDirExists,
  removeTempDir
} from "../utils";

let root = process.cwd();
let tempRoot = path.join(`${root}/src`, "/components");

describe("The `generate` command", () => {
  beforeEach(async () => {
    // create our temporary directory
    try {
      await makeTempDir(tempRoot);
    } catch (error) {
      console.error(error);
    }
  });

  afterEach(async () => {
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

  it("generates a react-component using the default template", async () => {
    const componentName = "TestComponent";
    const componentFolderPath = `${tempRoot}/${componentName}`;
    // const newComponentFolderExists = await checkDirExists(componentFolderPath);
    console.log("hello component folder path", componentFolderPath);
    const componentIndexExists = checkFileExists(
      `${componentFolderPath}/index.js`
    );
    // I'm very close. stopped here

    execSync(`./bin/run generate -t react-component -n ${componentName}`, {
      cwd: root
    });

    // expect(newComponentFolderExists).toBe(true);
    expect(componentIndexExists).toBe(true);
  });
});
