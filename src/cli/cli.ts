#!/usr/bin/env node
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import fs from "fs";
import { fileURLToPath } from "url";
import path from "path";
import { I18nMerger } from "../core/i18nMerger.js";
import { I18nReporter } from "../core/i18nReporter.js";
import { I18nFixer } from "../core/i18nFixer.js";


const isDirectRun =
  process.argv[1] &&
  path.resolve(process.argv[1]) === path.resolve(fileURLToPath(import.meta.url));

if (isDirectRun) {
  const argv = yargs(hideBin(process.argv))
    .usage("Usage: $0 <folder> [options]")
    .option("reference", { type: "string", describe: "Reference file name (e.g., en.json)" })
    .option("report", { type: "boolean", default: true, describe: "Report missing keys" })
    .option("fix", { type: "boolean", default: false, describe: "Auto-fix missing keys" })
    .option("fill", { type: "string", default: "", describe: "Placeholder for missing keys" })
    .option("output", { type: "string", describe: "Write merged result to file" })
    .demandCommand(1)
    .help()
    .argv as any;

  const options = { ...argv, folder: argv._[0] };
  const merger = new I18nMerger(options);
  const result = merger.merge();

  if (options.report) {
    const reporter = new I18nReporter();
    const hasMissing = reporter.report(result);
    if (hasMissing) process.exitCode = 1;
  }

  if (options.fix) {
    const fixer = new I18nFixer(options);
    fixer.apply(result);
  }

  if (options.output) {
    fs.writeFileSync(options.output, JSON.stringify(result.merged, null, 2));
  }
}
