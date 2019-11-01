import * as path from "path";
import { exec, execSync } from "child_process";
import * as util from "util";
import {
  checkFileExists,
  makeTempDir,
  checkDirExists,
  removeTempDir
} from "../utils";

const execPromise = util.promisify(exec);
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

  it("generates a react-component using the default template", async done => {
    const componentName = "TestComponent";
    const componentFolderPath = `${tempRoot}/${componentName}`;
    const newComponentFolderExists = await checkDirExists(componentFolderPath);
    // const componentIndexExists = checkFileExists(
    // `${componentFolderPath}/index.js`
    // );

    execSync(`./bin/run generate -t react-component -n ${componentName}`, {
      cwd: root
    });
    await wait(1500);

    await expect(newComponentFolderExists).toBe(true);
    // expect(componentIndexExists).toBe(true);
    done();
  });
});

async function wait(ms: number) {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
}
