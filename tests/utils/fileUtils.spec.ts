import { expect } from "chai";
import fs from "fs";
import path from "path";
import { FileUtils } from "../../src/utils/fileUtils";

const tempDir = path.join(__dirname, "tmp");
const filePath = path.join(tempDir, "test.json");

describe("FileUtils", () => {
  before(() => fs.mkdirSync(tempDir, { recursive: true }));
  after(() => fs.rmSync(tempDir, { recursive: true, force: true }));

  it("should write and read JSON correctly", () => {
    const data = { hello: "world" };
    FileUtils.writeJson(filePath, data);
    const readData = FileUtils.readJson(filePath);
    expect(readData).to.deep.equal(data);
  });

  it("should list only JSON files", () => {
    fs.writeFileSync(path.join(tempDir, "ignore.txt"), "hi");
    const files = FileUtils.listJsonFiles(tempDir);
    expect(files).to.include("test.json");
    expect(files).to.not.include("ignore.txt");
  });

  it("should resolve a file path correctly", () => {
    const resolved = FileUtils.resolveFile(tempDir, "test.json");
    expect(resolved).to.equal(filePath);
  });
});
