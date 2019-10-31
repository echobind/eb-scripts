import * as fse from "fs-extra";

/**
 *
 * @param pathToTempDir the path to the temporary directory
 */
export function removeTempDir(pathToTempDir: string) {
  return fse.remove(pathToTempDir);
}
