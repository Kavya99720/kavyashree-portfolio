import { describe, it, expect } from "vitest";
import { render, screen, within } from "@testing-library/react";
import App from "../src/App";

describe("Hero section (FR-01, FR-11)", () => {
  it("renders name, title, and location above the fold", () => {
    render(<App />);
    expect(
      screen.getByRole("heading", { level: 1, name: /kavyashree c v/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Generative AI & Agentic AI Engineer", {
        selector: "p, h2, span",
      }),
    ).toBeInTheDocument();
  });

  it("has a Download Resume button linking to the public redacted PDF", () => {
    render(<App />);
    const hero = document.getElementById("hero") as HTMLElement;
    const link = within(hero).getByRole("link", {
      name: /download resume/i,
    });
    expect(link).toHaveAttribute(
      "href",
      "/Kavyashree_CV_Resume_Public.pdf",
    );
    expect(link).toHaveAttribute("download");
  });
});
