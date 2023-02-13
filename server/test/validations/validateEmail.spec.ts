import { validateEmail } from "../../src/validation";

describe("Validate email", () => {
  it("should return false if email is invalid", () => {
    expect(validateEmail("jonatan@gmail.com")).toBe(true);
  });
  it("should return false if the email is invalid", () => {
    expect(validateEmail("jonatan@gmail")).toBe(false);
  });
  it("should return false if the email is invalid", () => {
    expect(validateEmail("jonatan.com")).toBe(false);
  });
});
