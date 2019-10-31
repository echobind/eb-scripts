import * as fse from "fs-extra";

/**
 *
 * @description removes a directory
 * @param pathToDir the path to the directory
 */
export function removeTempDir(pathToDir: string) {
  return fse.remove(pathToDir);
}
