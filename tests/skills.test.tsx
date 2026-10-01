import { describe, it, expect } from "vitest";
import { render, within } from "@testing-library/react";
import App from "../src/App";

describe("Skills section (FR-03)", () => {
  it("renders all 6 skill categories with sample items", () => {
    render(<App />);
    const skills = document.getElementById("skills") as HTMLElement;
    expect(skills).toBeInTheDocument();
    const scope = within(skills);

    const categories = [
      "Languages",
      "Generative AI",
      "ML / Data",
      "Backend & Databases",
      "Frontend",
      "Tools & DevOps",
    ];
    for (const category of categories) {
      expect(scope.getByText(category)).toBeInTheDocument();
    }

    expect(scope.getByText("Python")).toBeInTheDocument();
    expect(scope.getByText("FastAPI")).toBeInTheDocument();
    expect(scope.getByText("React")).toBeInTheDocument();
    expect(scope.getByText("Claude Code")).toBeInTheDocument();
  });
});
