import { expect } from "chai";
import fs from "fs";
import path from "path";
import { I18nMerger } from "../../src/core/i18nMerger.js";
import { I18nFixer } from "../../src/core/i18nFixer.js";


const tempDir = path.join(__dirname, "locales2");
const enFile = path.join(tempDir, "en.json");
const frFile = path.join(tempDir, "fr.json");

describe("I18nFixer", () => {
  before(() => {
    fs.mkdirSync(tempDir, { recursive: true });
    fs.writeFileSync(enFile, JSON.stringify({ hello: "world", nested: { key: "value" } }));
    fs.writeFileSync(frFile, JSON.stringify({ hello: "bonjour" }));
  });

  after(() => fs.rmSync(tempDir, { recursive: true, force: true }));

  it("should fill missing keys with placeholder", () => {
    const merger = new I18nMerger({ folder: tempDir });
    const result = merger.merge();

    const fixer = new I18nFixer({ folder: tempDir, fill: "__MISSING__" });
    fixer.apply(result);

    const fr = JSON.parse(fs.readFileSync(frFile, "utf-8"));
    expect(fr.nested.key).to.equal("__MISSING__");
  });
});
