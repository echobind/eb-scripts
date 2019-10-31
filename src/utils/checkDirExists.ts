import * as fse from "fs-extra";

/**
 *
 * @description checks if a directory exists
 * @param pathToDir path to the directory
 */
export function checkDirExists(pathToDir: string) {
  return fse.pathExists(pathToDir);
}
