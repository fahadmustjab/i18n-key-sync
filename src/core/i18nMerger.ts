import { FileUtils } from "../utils/fileUtils";
import { KeyUtils } from "../utils/keyUtils";
import  { MergeOptions, MergeResult } from "./types";

export class I18nMerger {
  constructor(private options: MergeOptions) {}

  merge(): MergeResult {
    const { folder, reference } = this.options;
    const files = FileUtils.listJsonFiles(folder);

    const jsons: Record<string, any> = {};
    files.forEach((file) => (jsons[file] = FileUtils.readJson(FileUtils.resolveFile(folder, file))));

    // collect keys
    const allKeys = new Set<string>();
    if (reference && jsons[reference]) {
      KeyUtils.collectKeys(jsons[reference], "", allKeys);
    } else {
      Object.values(jsons).forEach((obj) => KeyUtils.collectKeys(obj, "", allKeys));
    }

    const merged: Record<string, any> = {};
    const missing: Record<string, string[]> = {};

    for (const [lang, obj] of Object.entries(jsons)) {
      missing[lang] = [];
      allKeys.forEach((key) => {
        const value = KeyUtils.getNested(obj, key);
        if (value === undefined) missing[lang].push(key);
        KeyUtils.setNested(merged, key, value ?? "");
      });
    }

    return { merged, missing };
  }
}
