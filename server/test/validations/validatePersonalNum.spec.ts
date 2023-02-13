import { validatePersonalNumber } from "../../src/validation";

describe("Validate personal number", () => {
  it("Should return true if personal number 550713-1405", () => {
    expect(validatePersonalNumber("550713-1405")).toBe(true);
  });
  it("Should return true if personal number 5507131405", () => {
    expect(validatePersonalNumber("5507131405")).toBe(true);
  });
  it("Should return false if personal number 55071314055", () => {
    expect(validatePersonalNumber("55071314055")).toBe(false);
  });
  it("Should return false if personal number 55071a1405", () => {
    expect(validatePersonalNumber("55071a1405")).toBe(false);
  });
});
