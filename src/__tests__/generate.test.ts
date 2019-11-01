import * as path from "path";
import { exec, execSync } from "child_process";
import { test } from "@oclif/test";
import * as util from "util";
import {
  checkFileExists,
  makeTempDir,
  checkDirExists,
  removeTempDir
} from "../utils";
import { DEFAULT_COMPONENT_NAME } from "../commands/generate";

const execPromise = util.promisify(exec);
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

  // Note this test format is different because we're using @oclif/test
  test
    .stdout()
    .command(["generate", "-t fake-component", "-n FakeComponent"])
    .it("displays an error when you pass an invalid flag", ctx => {
      expect(ctx.stdout).toEqual("wrong");
    });
});
