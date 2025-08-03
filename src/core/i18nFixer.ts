import { FileUtils } from "../utils/fileUtils";
import { KeyUtils } from "../utils/keyUtils";
import type { MergeResult, MergeOptions } from "./types";

export class I18nFixer {
  constructor(private options: MergeOptions) {}

  apply(result: MergeResult): void {
    const { folder, fill = "" } = this.options;
    for (const lang in result.missing) {
      if (result.missing[lang].length > 0) {
        const fixed: Record<string, any> = {};
        result.missing[lang].forEach((key) => KeyUtils.setNested(fixed, key, fill));
        FileUtils.writeJson(FileUtils.resolveFile(folder, lang), fixed);
      }
    }
  }
}
