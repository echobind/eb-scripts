import * as fse from "fs-extra";

/**
 *
 * @param pathToTempDir the path to the temporary directory
 */
export function makeTempDir(pathToTempDir: string) {
  return fse.ensureDir(pathToTempDir);
}
