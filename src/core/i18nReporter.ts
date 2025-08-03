import chalk from "chalk";
import type { MergeResult } from "./types";

export class I18nReporter {
  report(result: MergeResult): boolean {
    let hasMissing = false;
    for (const lang in result.missing) {
      if (result.missing[lang].length > 0) {
        hasMissing = true;
        console.log(chalk.yellow(`Missing keys in ${lang}:`));
        result.missing[lang].forEach((key) => console.log(`  - ${key}`));
      }
    }
    if (!hasMissing) console.log(chalk.green("All keys are in sync!"));
    return hasMissing;
  }
}
