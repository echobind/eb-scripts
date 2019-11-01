import * as fse from "fs-extra";

/**
 *
 * @description checks if a file exists
 * @param pathToFile path to the file
 */
export function checkFileExists(pathToFile: string) {
  return fse.existsSync(pathToFile);
}
