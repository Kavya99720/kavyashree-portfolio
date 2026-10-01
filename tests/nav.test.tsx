import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "../src/App";

describe("Navigation (FR-14)", () => {
  it("links to every section and each target id exists", () => {
    render(<App />);

    const sectionIds = [
      "about",
      "skills",
      "experience",
      "projects",
      "education",
      "certifications",
      "contact",
    ];

    const nav = screen.getByRole("navigation");
    for (const id of sectionIds) {
      const link = nav.querySelector(`a[href="#${id}"]`);
      expect(link, `nav link to #${id} not found`).toBeTruthy();
      expect(document.getElementById(id), `#${id} section missing`).toBeTruthy();
    }
  });
});
