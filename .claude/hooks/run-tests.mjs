import { existsSync, readdirSync, readFileSync, rmSync } from "node:fs";
import { join } from "node:path";
import { spawnSync } from "node:child_process";

const projectDir = process.env.CLAUDE_PROJECT_DIR ?? process.cwd();

function hasTestFiles(dir) {
  if (!existsSync(dir)) return false;
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      if (hasTestFiles(join(dir, entry.name))) return true;
    } else if (/\.test\.(ts|tsx|js|jsx)$/.test(entry.name)) {
      return true;
    }
  }
  return false;
}

let input = "";
try {
  input = readFileSync(0, "utf-8");
} catch {
  // no stdin available; proceed with no file-path filter
}

let filePath = "";
try {
  const payload = JSON.parse(input);
  filePath = payload?.tool_input?.file_path ?? "";
} catch {
  // not JSON or empty; run unconditionally if guards below pass
}

const relevant =
  filePath === "" ||
  ["src/", "tests/", "public/"].some((prefix) =>
    filePath.replace(/\\/g, "/").includes(`/${prefix}`) ||
    filePath.replace(/\\/g, "/").startsWith(prefix),
  );

if (!relevant) {
  process.exit(0);
}

const vitestBin = join(
  projectDir,
  "node_modules",
  ".bin",
  process.platform === "win32" ? "vitest.cmd" : "vitest",
);

if (!existsSync(vitestBin) || !hasTestFiles(join(projectDir, "tests"))) {
  process.exit(0);
}

function runVitest() {
  const result = spawnSync(vitestBin, ["run", "--reporter=dot"], {
    cwd: projectDir,
    encoding: "utf-8",
    shell: true,
  });
  return {
    status: result.status,
    output: `${result.stdout ?? ""}\n${result.stderr ?? ""}`,
  };
}

function isEnvironmentGlitch(out) {
  // A Windows/Vite dep-cache race occasionally stops the whole run before any
  // test executes, with this specific signature: no test actually ran (no
  // real assertion failure is ever reported this way), only vitest's module
  // resolution failing to find its own suite context.
  return (
    /Vitest failed to find the (current suite|runner)/.test(out) &&
    out.includes("Tests  no tests")
  );
}

let { status, output } = runVitest();

if (status !== 0 && isEnvironmentGlitch(output)) {
  try {
    rmSync(join(projectDir, "node_modules", ".vite"), {
      recursive: true,
      force: true,
    });
  } catch {
    // best-effort cache clear
  }
  ({ status, output } = runVitest());
}

if (status !== 0 && isEnvironmentGlitch(output)) {
  // Still glitching after a cache-clear retry. This never represents a real
  // test failure (no test ever ran), so don't block the edit on it — just
  // surface it as a warning.
  console.error(
    "Vitest hit a transient environment glitch (not a real test failure) and could not run after this edit. Re-check manually if needed.",
  );
  process.exit(0);
}

if (status !== 0) {
  const tail = output.split("\n").slice(-60).join("\n");
  console.error(`Vitest failed after this edit:\n${tail}`);
  process.exit(2);
}

process.exit(0);
