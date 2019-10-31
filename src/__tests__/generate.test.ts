import * as fse from "fs-extra";
import * as path from "path";
import { test } from "@oclif/test";
import { execSync } from "child_process";
import { makeTempDir, checkDirExists, removeTempDir } from "../utils";

let root = process.cwd();
let tempRoot = path.join(root, "tmp");

describe("The `generate` command", () => {
  // This will be where we install `eb-scripts`
  // Update their package.json
  // Then generate new files
  // Then assert that they are there...

  beforeEach(async () => {
    // create our temporary directory
    try {
      await makeTempDir(tempRoot);
      await execSync("yarn init -y", { cwd: tempRoot });
      await makeTempDir(tempRoot + "/src");
      await makeTempDir(tempRoot + "/src/components");
      // TODO replace with eb-scirpts init command
      // install eb-scripts as a dev dependency
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

  it("expects to find a temporary directory with a package.json", async () => {
    const tempDirectoryExists = await checkDirExists(tempRoot);
    const hasPackageJson = await fse.existsSync(`${tempRoot}/package.json`);

    expect(tempDirectoryExists).toBe(true);
    expect(hasPackageJson).toBe(true);
  });

  it("runs using @oclif/test", async () => {
    // STOPPED HERE
    // Need to log all the files in the tempRoot
    // then log after running test and see if it is working as expected
    test
      .loadConfig({
        root: tempRoot
      })
      .stdout()
      .command(["generate", "-t react-component", "-n HeyJoe"]);

    const newComponentFolderExists = await checkDirExists(
      tempRoot + "/src/components/HeyJoe"
    );
    expect(newComponentFolderExists).toBe(true);
  });
});
