import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Title from "./testCompo/Title";
import { AppBar } from "@mui/material";
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
  it("should contains href", () => {
    render(<Title title="React" />);
    const linkElement: HTMLLinkElement = screen.getByTestId("learn-link");
    expect(linkElement.href).toContain("learnReact");
  });
});

// describe('App bar', () => {
//     it('should exist', () => {
//         render(<AppBar />)
//         const barElement = screen.getByTestId("app-bar");
//         expect(barElement.offsetHeight)
//     })
// })
