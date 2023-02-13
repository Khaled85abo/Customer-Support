import { validateText } from "../../src/validation";

describe("Validate texts", () => {
  it("Should return no errors if all properties have value", () => {
    const errors = validateText({
      firstname: "tttt",
      lastname: "persson",
      email: "tttt.per@gmail.com",
      personalnumber: "550713-1405",
      address: "Utvecklargatan 12",
      zipCode: "111 22",
      city: "Stockholm",
      country: "Sweden",
    });

    expect(errors.length).toBe(0);
  });
  it("Should return 1 error if a property is missing", () => {
    const errors = validateText({
      lastname: "persson",
      email: "tttt.per@gmail.com",
      personalnumber: "550713-1405",
      address: "Utvecklargatan 12",
      zipCode: "111 22",
      city: "Stockholm",
      country: "Sweden",
    });

    expect(errors.length).toBe(1);
  });
  it("Should return 1 error if a property is missing a value", () => {
    const errors = validateText({
      firstname: "",
      lastname: "persson",
      email: "tttt.per@gmail.com",
      personalnumber: "550713-1405",
      address: "Utvecklargatan 12",
      zipCode: "111 22",
      city: "Stockholm",
      country: "Sweden",
    });

    expect(errors.length).toBe(1);
  });
  it("Should return 3 error if a property is missing a value", () => {
    const errors = validateText({
      firstname: "",
      lastname: "",
      email: "tttt.per@gmail.com",
      personalnumber: "550713-1405",
      address: "Utvecklargatan 12",
      zipCode: "111 22",
      city: "",
      country: "Sweden",
    });

    expect(errors.length).toBe(3);
  });
});
