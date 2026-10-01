// @vitest-environment node
import { describe, it, expect } from "vitest";
import { readFile } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");

describe("index.html metadata", () => {
  it("has the expected title", async () => {
    const html = await readFile(join(ROOT, "index.html"), "utf-8");
    expect(html).toContain(
      "<title>Kavyashree C V | Generative AI & Agentic AI Engineer</title>",
    );
  });

  it("has the expected meta description", async () => {
    const html = await readFile(join(ROOT, "index.html"), "utf-8");
    expect(html).toMatch(
      /<meta\s+name="description"\s+content="Kavyashree C V — Generative AI & Agentic AI Engineer\. Building AI agents, RAG pipelines and MCP servers\."\s*\/>/,
    );
  });

  it("has Open Graph tags for social previews", async () => {
    const html = await readFile(join(ROOT, "index.html"), "utf-8");
    expect(html).toMatch(
      /<meta\s+property="og:title"\s+content="Kavyashree C V \| Generative AI & Agentic AI Engineer"\s*\/>/,
    );
    expect(html).toMatch(
      /<meta\s+property="og:description"\s+content="Kavyashree C V — Generative AI & Agentic AI Engineer\. Building AI agents, RAG pipelines and MCP servers\."\s*\/>/,
    );
    expect(html).toMatch(/<meta\s+property="og:type"\s+content="website"\s*\/>/);
    expect(html).toMatch(
      /<meta\s+property="og:url"\s+content="https:\/\/kavyashree-portfolio-phi\.vercel\.app\/"\s*\/>/,
    );
  });
});
