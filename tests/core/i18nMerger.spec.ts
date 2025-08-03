import { expect } from "chai";
import { I18nMerger } from "../../src/core/i18nMerger";
import fs from "fs";
import path from "path";

const tempDir = path.join(__dirname, "locales");
const enFile = path.join(tempDir, "en.json");
const frFile = path.join(tempDir, "fr.json");

describe("I18nMerger", () => {
  before(() => {
    fs.mkdirSync(tempDir, { recursive: true });
    fs.writeFileSync(enFile, JSON.stringify({ hello: "world", nested: { key: "value" } }));
    fs.writeFileSync(frFile, JSON.stringify({ hello: "bonjour" }));
  });

  after(() => fs.rmSync(tempDir, { recursive: true, force: true }));

  it("should merge keys and report missing ones", () => {
    const merger = new I18nMerger({ folder: tempDir });
    const result = merger.merge();
    expect(result.missing.fr).to.include("nested.key");
    expect(result.merged).to.be.an("object");
  });
});
