import { validateZipCode } from "../../src/validation";

describe("Validate zipCode", () => {
  it("should return true if input is 111 22", () => {
    expect(validateZipCode("111 22")).toBe(true);
  });
  it("should return true if input is 12345", () => {
    expect(validateZipCode("12345")).toBe(true);
  });
  it("should return false if the input is 1234", () => {
    expect(validateZipCode("1234")).toBe(false);
  });
  it("should return false if the input is 123456", () => {
    expect(validateZipCode("123456")).toBe(false);
  });
  it("should return false if the input is abcde", () => {
    expect(validateZipCode("abcde")).toBe(false);
  });
});
