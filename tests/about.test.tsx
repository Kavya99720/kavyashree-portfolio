import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import App from "../src/App";

const EXPECTED_ABOUT_TEXT =
  "I'm a Generative AI and Agentic AI enthusiast. As a Generative AI intern at CellStrat, I design and test voice AI agents, and in my own projects I build AI agents, RAG pipelines and MCP servers that turn ideas into working apps. I learn fast, experiment constantly with tools like Claude Code, and I'm excited to grow as a Gen AI and Agentic AI engineer.";

describe("About section (FR-02)", () => {
  it("renders the exact professional summary text", () => {
    render(<App />);
    const about = document.getElementById("about") as HTMLElement;
    expect(about).toBeInTheDocument();
    expect(about.textContent).toContain(EXPECTED_ABOUT_TEXT);
  });

  it("does not assert CGPA in About (CGPA belongs in Education)", () => {
    render(<App />);
    const about = document.getElementById("about") as HTMLElement;
    expect(about.textContent).not.toMatch(/CGPA/i);
  });

  it("contains no phone number or home address", () => {
    render(<App />);
    const about = document.getElementById("about") as HTMLElement;
    expect(about.textContent).not.toMatch(/tel:/i);
    expect(about.textContent).not.toMatch(/\+91/);
  });
});
