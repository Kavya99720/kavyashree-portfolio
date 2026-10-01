import { describe, it, expect } from "vitest";
import { render, within } from "@testing-library/react";
import App from "../src/App";

const ANTHROPIC_CERTS: { name: string; date: string; verify: string }[] = [
  {
    name: "Claude Code 101",
    date: "Sep 2026",
    verify: "https://academy.claude.com/verify/bcf965871b0ebc2d62e238963de5b7aa",
  },
  {
    name: "Claude Code in Action",
    date: "Sep 2026",
    verify: "https://academy.claude.com/verify/41f9433c5e0ace94cb7a5343d066e023",
  },
  {
    name: "Introduction to Model Context Protocol",
    date: "Sep 2026",
    verify: "https://academy.claude.com/verify/68f086d5e992ce26c0473043ac22c27a",
  },
  {
    name: "Model Context Protocol: Advanced Topics",
    date: "Sep 2026",
    verify: "https://academy.claude.com/verify/142d3e2580e2503fa4512539e5b05afc",
  },
  {
    name: "Introduction to Claude Cowork",
    date: "Sep 2026",
    verify: "https://verify.skilljar.com/c/dnpix8neukw4",
  },
  {
    name: "Claude 101",
    date: "Sep 2026",
    verify: "https://verify.skilljar.com/c/xxqr32epjr2c",
  },
  {
    name: "Building with the Claude API",
    date: "Jul 2026",
    verify: "https://verify.skilljar.com/c/7jkttsc5a6hf",
  },
];

describe("Certifications section (FR-09)", () => {
  it("groups certifications by issuer", () => {
    render(<App />);
    const certifications = document.getElementById(
      "certifications",
    ) as HTMLElement;
    expect(certifications).toBeInTheDocument();
    const text = certifications.textContent ?? "";

    expect(text).toMatch(/Anthropic/);
    expect(text).toMatch(/NPTEL/);
    expect(text).toMatch(
      /Artificial Intelligence: Concepts and Techniques/,
    );
    expect(text).toMatch(/\(Oct 2025\)/);
    expect(text).toMatch(/Cloud Computing, Blockchain and its Applications/);

    expect(text).toMatch(/Infosys Springboard/);
    expect(text).toMatch(/Python Basics/);
    expect(text).toMatch(/Java Essentials/);

    expect(text).toMatch(/Salesforce Trailhead/);
    expect(text).toMatch(/Agentblazer Champion 2026/);
    expect(text).toMatch(/17,625\+ points, 51\+ badges/);
  });

  it("lists all 7 Anthropic certifications with a working Verify link each", () => {
    render(<App />);
    const certifications = document.getElementById(
      "certifications",
    ) as HTMLElement;
    const scope = within(certifications);

    for (const cert of ANTHROPIC_CERTS) {
      expect(scope.getByText(cert.name)).toBeInTheDocument();
      expect(certifications.textContent).toMatch(
        new RegExp(`\\(${cert.date}\\)`),
      );
    }

    const verifyLinks = scope.getAllByRole("link", { name: /verify/i });
    expect(verifyLinks).toHaveLength(ANTHROPIC_CERTS.length);

    const hrefs = verifyLinks.map((link) => link.getAttribute("href"));
    for (const cert of ANTHROPIC_CERTS) {
      expect(hrefs).toContain(cert.verify);
    }

    for (const link of verifyLinks) {
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("rel", expect.stringContaining("noopener"));
      expect(link).toHaveAttribute("rel", expect.stringContaining("noreferrer"));
    }
  });

  it("does not show a Verify link for non-Anthropic certifications", () => {
    render(<App />);
    const certifications = document.getElementById(
      "certifications",
    ) as HTMLElement;
    const scope = within(certifications);

    const verifyLinks = scope.getAllByRole("link", { name: /verify/i });
    expect(verifyLinks).toHaveLength(ANTHROPIC_CERTS.length);
  });
});
