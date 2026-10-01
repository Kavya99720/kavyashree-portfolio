// @vitest-environment node
import { describe, it, expect } from "vitest";
import { readFile, readdir, access } from "node:fs/promises";
import { join, extname, relative, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { extractText, getDocumentProxy } from "unpdf";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");

const TEXT_EXTENSIONS = new Set([
  ".ts",
  ".tsx",
  ".js",
  ".jsx",
  ".css",
  ".html",
  ".json",
  ".svg",
  ".md",
  ".txt",
]);

const SCAN_DIRS = ["src", "public", "dist"];
const SCAN_FILES = ["index.html"];

// Any phone-number-shaped string: Indian mobile numbers, or a + country
// code followed by 8+ digits. Deliberately generic — this file must never
// contain the real number itself.
const PHONE_PATTERNS: RegExp[] = [
  /(?<!\d)(\+?91[\s-]?)?[6-9]\d{4}[\s-]?\d{5}(?!\d)/g,
  /\+\d{1,3}[\s-]?\d{8,}/g,
];

const TEL_HREF_PATTERN = /href\s*=\s*["']?tel:/i;

// Address-shaped patterns: 6-digit PIN codes, and common Indian street
// address markers. The city name alone ("Bengaluru, Karnataka") is allowed
// and is NOT matched here.
const ADDRESS_PATTERNS: RegExp[] = [
  // PIN code: exactly 6 digits with no adjacent digit OR hex/base62-ish
  // letter, so it doesn't fire on a digit run embedded in a longer token
  // like a URL slug or hex id (e.g. "...bcf965871b0e...").
  /(?<![\da-zA-Z])\d{6}(?![\da-zA-Z])/g,
  /\b\d+(st|nd|rd|th)\s+(cross|main)\b/gi,
  /\blayout\b/gi,
  /\bnagar\b/gi,
  /\b(house\s*no\.?|flat\s*no\.?)\s*\d+/gi,
  /#\s?\d+\b/g,
];

type Finding = { file: string; line: number; snippet: string; rule: string };

function scanTextForPhones(text: string, file: string): Finding[] {
  const findings: Finding[] = [];
  const lines = text.split("\n");
  lines.forEach((lineText, idx) => {
    for (const pattern of PHONE_PATTERNS) {
      pattern.lastIndex = 0;
      if (pattern.test(lineText)) {
        findings.push({
          file,
          line: idx + 1,
          snippet: lineText.trim().slice(0, 120),
          rule: "phone-pattern",
        });
      }
    }
    if (TEL_HREF_PATTERN.test(lineText)) {
      findings.push({
        file,
        line: idx + 1,
        snippet: lineText.trim().slice(0, 120),
        rule: "tel-href",
      });
    }
  });
  return findings;
}

function scanTextForAddress(text: string, file: string): Finding[] {
  const findings: Finding[] = [];
  const lines = text.split("\n");
  lines.forEach((lineText, idx) => {
    for (const pattern of ADDRESS_PATTERNS) {
      pattern.lastIndex = 0;
      if (pattern.test(lineText)) {
        findings.push({
          file,
          line: idx + 1,
          snippet: lineText.trim().slice(0, 120),
          rule: "address-pattern",
        });
      }
    }
  });
  return findings;
}

async function loadDenylist(): Promise<string[]> {
  const denylistPath = join(ROOT, "private", "denylist.txt");
  try {
    await access(denylistPath);
  } catch {
    return [];
  }
  const raw = await readFile(denylistPath, "utf-8");
  return raw
    .split("\n")
    .map((l: string) => l.trim())
    .filter(Boolean);
}

function scanTextForDenylist(
  text: string,
  file: string,
  denylist: string[],
): Finding[] {
  const findings: Finding[] = [];
  if (denylist.length === 0) return findings;
  const normalizedText = text.replace(/[\s-]/g, "");
  const lines = text.split("\n");
  for (const entry of denylist) {
    const normalizedEntry = /^\d[\d\s-]*\d$/.test(entry)
      ? entry.replace(/[\s-]/g, "")
      : entry;
    if (normalizedEntry.length < 4) continue; // avoid trivial false positives
    if (normalizedText.includes(normalizedEntry)) {
      const lineIdx = lines.findIndex((l) =>
        l.replace(/[\s-]/g, "").includes(normalizedEntry),
      );
      findings.push({
        file,
        line: lineIdx >= 0 ? lineIdx + 1 : 0,
        snippet: entry,
        rule: "denylist",
      });
    }
  }
  return findings;
}

async function walk(dir: string): Promise<string[]> {
  let entries;
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch {
    return [];
  }
  const files: string[] = [];
  for (const entry of entries) {
    if (entry.name === "node_modules" || entry.name === ".git") continue;
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walk(full)));
    } else {
      files.push(full);
    }
  }
  return files;
}

async function collectScanFiles(): Promise<string[]> {
  const files: string[] = [];
  for (const dir of SCAN_DIRS) {
    files.push(...(await walk(join(ROOT, dir))));
  }
  for (const f of SCAN_FILES) {
    files.push(join(ROOT, f));
  }
  return files;
}

async function collectPdfFiles(): Promise<string[]> {
  const all = await walk(join(ROOT, "public"));
  return all.filter((f) => extname(f).toLowerCase() === ".pdf");
}

describe("Privacy: no phone number or address anywhere public (NFR-01, NFR-03)", () => {
  it("self-test: the phone pattern detects synthetic phone numbers", () => {
    const findings = scanTextForPhones("Call +91 98765 43210 now", "synthetic");
    expect(findings.length).toBeGreaterThan(0);
  });

  it("self-test: the phone pattern does not false-positive on safe resume text", () => {
    const safe = [
      "CGPA 8.32",
      "17,625+ points, 51+ badges",
      "2022 – 2026",
      "99 Pytest + 43 Vitest",
    ];
    for (const line of safe) {
      expect(scanTextForPhones(line, "safe")).toHaveLength(0);
    }
  });

  it("self-test: the address pattern detects a synthetic PIN code and street marker", () => {
    expect(scanTextForAddress("Bengaluru 560001", "synthetic").length).toBeGreaterThan(0);
    expect(
      scanTextForAddress("4th Cross, Indiranagar Layout", "synthetic").length,
    ).toBeGreaterThan(0);
  });

  it("self-test: the address pattern allows 'Bengaluru, Karnataka' alone", () => {
    expect(scanTextForAddress("Bengaluru, Karnataka", "safe")).toHaveLength(0);
  });

  it("finds zero phone/address/tel/denylist matches in src/, public/, dist/, index.html", async () => {
    const denylist = await loadDenylist();
    const files = await collectScanFiles();
    const findings: Finding[] = [];

    for (const file of files) {
      if (!TEXT_EXTENSIONS.has(extname(file).toLowerCase())) continue;
      const text = await readFile(file, "utf-8");
      const rel = relative(ROOT, file);
      const isBuiltOutput = rel.startsWith("dist" + "\\") || rel.startsWith("dist/");
      findings.push(
        ...scanTextForPhones(text, rel),
        ...scanTextForDenylist(text, rel, denylist),
      );
      if (!isBuiltOutput) {
        // Address heuristics (6-digit runs, "#123" markers) false-positive
        // heavily on minified bundle code. dist/ is a pure build output of
        // src/, which this same scan already checks, so skip it here.
        findings.push(...scanTextForAddress(text, rel));
      }
    }

    expect(
      findings,
      `Privacy violations found:\n${findings
        .map((f) => `  ${f.file}:${f.line} [${f.rule}] ${f.snippet}`)
        .join("\n")}`,
    ).toHaveLength(0);
  });

  it("the public resume PDF's text contains no phone number or denylist match", async () => {
    const denylist = await loadDenylist();
    const pdfFiles = await collectPdfFiles();
    expect(pdfFiles.length).toBeGreaterThan(0);

    const findings: Finding[] = [];
    for (const pdfPath of pdfFiles) {
      const buffer = await readFile(pdfPath);
      const pdf = await getDocumentProxy(new Uint8Array(buffer));
      const { text } = await extractText(pdf, { mergePages: true });
      const rel = relative(ROOT, pdfPath);

      // Sanity check: extraction actually worked.
      expect(text, `PDF text extraction failed for ${rel}`).toMatch(
        /kavyashreecv2@gmail\.com/,
      );

      findings.push(
        ...scanTextForPhones(text, rel),
        ...scanTextForDenylist(text, rel, denylist),
      );
    }

    expect(
      findings,
      `Privacy violations found in PDF text:\n${findings
        .map((f) => `  ${f.file}:${f.line} [${f.rule}] ${f.snippet}`)
        .join("\n")}`,
    ).toHaveLength(0);
  });
});
