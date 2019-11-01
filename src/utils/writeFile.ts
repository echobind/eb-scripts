import * as fse from "fs-extra";

/**
 *
 * @description creates a directory
 * @param pathToFile the path to the file
 * @param content the content of the JSON file
 */
export function writeFile(pathToFile: string, content: any) {
  return fse.writeFileSync(pathToFile, content);
}
