import * as fse from "fs-extra";

/**
 *
 * @description creates a directory
 * @param pathToDir the path to the directory
 */
export function makeTempDir(pathToDir: string) {
  return fse.ensureDir(pathToDir);
}
