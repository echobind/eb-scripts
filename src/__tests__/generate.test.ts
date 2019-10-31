import * as fse from "fs-extra";
import * as path from "path";
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

  it("expects to find a temporary directory", async () => {
    const tempDirectoryExists = await checkDirExists(tempRoot);

    expect(tempDirectoryExists).toBe(true);
  });
});
