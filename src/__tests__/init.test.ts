import * as path from "path";
import * as fse from "fs-extra";
import { execSync } from "child_process";
import { DEFAULT_COMPONENT_NAME } from "../commands/generate";
import { scriptsByProject } from "../commands/init";

let root = process.cwd();

describe("The `init` command", () => {
  const backupJson = "backup.json";
  const backupYarnLock = "backupYarn.lock";

  beforeAll(async () => {
    try {
      // Back up our package.json so we don't break anything during our tests
      await fse.renameSync(`${root}/package.json`, `${root}/${backupJson}`);
      // Also back up our yarn.lock
      await fse.renameSync(`${root}/yarn.lock`, `${root}/${backupYarnLock}`);
    } catch (error) {
      console.error(error);
    }
  });

  beforeEach(async () => {
    // Create a copy package.json so we can use a fresh copy for each test
    await fse.copyFile(`${root}/${backupJson}`, `${root}/package.json`);
    // Create a copy of the yarn.lock
    await fse.copyFile(`${root}/${backupYarnLock}`, `${root}/yarn.lock`);
  });

  afterEach(async () => {
    // Remove package.json and yarn.lock after each test completes
    await fse.remove(`${root}/package.json`);
    await fse.remove(`${root}/yarn.lock`);
  });

  afterAll(async () => {
    try {
      // Restore our package.json from backup
      await fse.renameSync(`${root}/${backupJson}`, `${root}/package.json`);
      // Restore our yarn lock
      await fse.renameSync(`${root}/${backupYarnLock}`, `${root}/yarn.lock`);
    } catch (err) {
      console.error(err);
    }
  });

  it("expects to find a backup.json, backupYarn.lock and package.json", async () => {
    const backupJsonExists = fse.existsSync(`${root}/${backupJson}`);
    const backupYarnLockExists = fse.existsSync(`${root}/${backupYarnLock}`);
    const packageJsonExists = fse.existsSync(`${root}/package.json`);

    expect(backupJsonExists).toBe(true);
    expect(backupYarnLockExists).toBe(true);
    expect(packageJsonExists).toBe(true);
  });

  it("throws an error if you don't pass an argument for the project type", async () => {
    // We do this because the argument of project is required
    const initCommand = () =>
      execSync(`./bin/run init`, {
        cwd: root
      });

    expect(initCommand).toThrowErrorMatchingSnapshot();
  });

  it("works with an argument of a valid project: react", async () => {
    const project = "react";
    execSync(`./bin/run init ${project}`, {
      cwd: root
    });

    const data = fse.readFileSync(`${root}/package.json`, {
      encoding: "utf8"
    });
    const packageJson = JSON.parse(data);
    const scripts = packageJson.scripts;
    console.log(scripts, "here they are");

    const devDependencies = packageJson.devDependencies;

    const hasEbScripts = Object.keys(devDependencies).includes("eb-scripts");
    const scriptName = "g:component";
    const hasGComponentScript = Object.keys(scripts).includes(scriptName);
    // Check that the g:component script matches
    const expectedScript = scriptsByProject[project]["g:component"];

    expect(hasEbScripts).toBe(true);
    expect(hasGComponentScript).toBe(true);
    expect(scripts[scriptName]).toMatch(expectedScript);
  });

  it("works with an argument of a valid project: react-typescript", async () => {
    const project = "react-typescript";

    execSync(`./bin/run init ${project}`, {
      cwd: root
    });

    const data = fse.readFileSync(`${root}/package.json`, {
      encoding: "utf8"
    });
    const packageJson = JSON.parse(data);
    const scripts = packageJson.scripts;
    console.log(scripts, "here they are");
    const devDependencies = packageJson.devDependencies;
    const hasEbScripts = Object.keys(devDependencies).includes("eb-scripts");

    const scriptName = "g:component";
    const hasGComponentScript = Object.keys(scripts).includes(scriptName);
    // Check that the g:component script matches
    const expectedScript = scriptsByProject[project]["g:component"];

    expect(hasEbScripts).toBe(true);
    expect(hasGComponentScript).toBe(true);
    expect(scripts[scriptName]).toMatch(expectedScript);
  });

  it("throws an error when you pass an invalid flag", () => {
    const initCommand = () =>
      execSync(`./bin/run init rust`, {
        cwd: root
      });

    expect(initCommand).toThrowErrorMatchingSnapshot();
  });
});
