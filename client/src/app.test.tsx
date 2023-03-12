import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Title from "./testCompo/Title";
describe("something truthy and falsy", () => {
  it("true to be true", () => {
    expect(true).toBe(true);
  });

  it("false to be false", () => {
    expect(false).toBe(false);
  });
});

describe("Title", () => {
  it("renders headline", () => {
    render(<Title title="React" />);

    screen.debug();

    // check if App components renders headline
  });
});
