import * as fse from "fs-extra";

/**
 *
 * @description creates a directory
 * @param pathToFile the path to the file you want to copy
 * @param destination the destination of the file
 */
export function copyFile(pathToFile: string, destination: string) {
  return fse.copyFileSync(pathToFile, destination);
}
