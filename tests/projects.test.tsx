import { describe, it, expect } from "vitest";
import { render, within } from "@testing-library/react";
import App from "../src/App";

describe("Projects section (FR-05, FR-06, FR-07)", () => {
  it("renders all 5 projects with a GitHub link each", () => {
    render(<App />);
    const projects = document.getElementById("projects") as HTMLElement;
    expect(projects).toBeInTheDocument();

    const expected: Record<string, string> = {
      "BillShield": "https://github.com/Kavya99720/billshield",
      "AI-Powered Document Intelligence & Data Extraction Platform":
        "https://github.com/Kavya99720/doc-intelligence-platform",
      "Enterprise AI Operating System": "https://github.com/Kavya99720/enterprise-ai-operating-system",
      "AI Placement & Interview Prep Assistant Suite":
        "https://github.com/Kavya99720/interview-prep-assistant-suite",
      "Audio Notes Platform": "https://github.com/Kavya99720/gnani-audio-notes",
    };

    const cards = within(projects).getAllByTestId("project-card");
    expect(cards).toHaveLength(5);

    for (const [titlePart, githubUrl] of Object.entries(expected)) {
      const card = cards.find((c) => c.textContent?.includes(titlePart));
      expect(card, `card for "${titlePart}" not found`).toBeTruthy();
      const githubLink = within(card!).getByRole("link", { name: /github/i });
      expect(githubLink).toHaveAttribute("href", githubUrl);
    }
  });

  it("marks exactly BillShield and the Document Intelligence Platform as featured", () => {
    render(<App />);
    const projects = document.getElementById("projects") as HTMLElement;
    const cards = within(projects).getAllByTestId("project-card");

    const featured = cards.filter(
      (c) => c.getAttribute("data-featured") === "true",
    );
    expect(featured).toHaveLength(2);

    const featuredTitles = featured.map((c) => c.textContent).join(" | ");
    expect(featuredTitles).toMatch(/BillShield/);
    expect(featuredTitles).toMatch(/Document Intelligence/);
  });

  it("shows a Live Demo link only on the Document Intelligence Platform", () => {
    render(<App />);
    const projects = document.getElementById("projects") as HTMLElement;
    const cards = within(projects).getAllByTestId("project-card");

    const docIntelCard = cards.find((c) =>
      c.textContent?.includes("Document Intelligence"),
    )!;
    const liveLink = within(docIntelCard).getByRole("link", {
      name: /live demo/i,
    });
    expect(liveLink).toHaveAttribute(
      "href",
      "https://doc-intelligence-platform-i72d.onrender.com",
    );
    expect(liveLink).toHaveAttribute("target", "_blank");
    expect(liveLink).toHaveAttribute("rel", expect.stringContaining("noopener"));

    const otherCards = cards.filter((c) => c !== docIntelCard);
    for (const card of otherCards) {
      expect(
        within(card).queryByRole("link", { name: /live demo/i }),
      ).not.toBeInTheDocument();
    }
  });
});
