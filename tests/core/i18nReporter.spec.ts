import { expect } from "chai";
import * as sinon from "sinon";
import { I18nReporter } from "../../src/core/i18nReporter";

describe("I18nReporter", () => {
  it("should log missing keys and return true when missing exist", () => {
    const reporter = new I18nReporter();
    const consoleSpy = sinon.spy(console, "log");

    const hasMissing = reporter.report({
      merged: {},
      missing: { fr: ["hello"], en: [] }
    });

    expect(hasMissing).to.be.true;
    expect(consoleSpy.called).to.be.true;

    consoleSpy.restore();
  });

  it("should log success message when no missing keys", () => {
    const reporter = new I18nReporter();
    const consoleSpy = sinon.spy(console, "log");

    const hasMissing = reporter.report({
      merged: {},
      missing: { en: [] }
    });

    expect(hasMissing).to.be.false;
    expect(consoleSpy.called).to.be.true;

    consoleSpy.restore();
  });
});
