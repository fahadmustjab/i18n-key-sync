import { expect } from "chai";
import { KeyUtils } from "../../src/utils/keyUtils";

describe("KeyUtils", () => {
  it("should collect all nested keys", () => {
    const obj = { a: { b: "c" }, d: "e" };
    const keys = new Set<string>();
    KeyUtils.collectKeys(obj, "", keys);
    expect([...keys]).to.have.members(["a.b", "d"]);
  });

  it("should get nested value", () => {
    const obj = { a: { b: "c" } };
    expect(KeyUtils.getNested(obj, "a.b")).to.equal("c");
  });

  it("should return undefined for missing keys", () => {
    expect(KeyUtils.getNested({}, "x.y")).to.be.undefined;
  });

  it("should set nested values correctly", () => {
    const obj: any = {};
    KeyUtils.setNested(obj, "a.b.c", "val");
    expect(obj.a.b.c).to.equal("val");
  });
});
