---
name: release-check
description: Run pre-commit checks and report a PASS/FAIL table with evidence; block the commit if anything fails.
---

# Release Check

Use this skill before any commit, unless the user explicitly says to skip it.

## Process

Run each check below, gather concrete evidence (command output, file paths,
line numbers — not just an assertion), and record PASS or FAIL for each.
Do not skip a check because an earlier one failed; run all of them, then
report.

1. **Tests pass** — run the project's test command. Evidence: exit code and
   summary line (e.g. "42 passed, 0 failed").
2. **Build passes** — run the project's build command. Evidence: exit code
   and last few lines of output.
3. **Spec coverage** — for every requirement in `docs/SPEC.md` touched by
   this change (new or edited `FR-NN`/`NFR-NN`), confirm the "Test Coverage"
   table lists a test for it, and that test exists on disk. Evidence: ID →
   test file path.
4. **No sensitive data in the diff** — scan `git diff --cached` (and
   unstaged changes if not yet staged) for phone numbers, home addresses,
   secrets, or API keys (e.g. patterns like `AKIA`, `sk-`, `-----BEGIN`,
   `password=`, long hex/base64 tokens). Evidence: matched lines/files, or
   "none found".
5. **private/ and .env untracked** — run `git status` and `git ls-files` to
   confirm `private/` and `.env` are not tracked. Evidence: command output.
6. **No AI attribution in commit message** — confirm the drafted commit
   message contains no `Co-Authored-By` line or other Claude/AI attribution
   (per this repo's CLAUDE.md git rules). Evidence: the message text.
7. **Docs updated** — confirm `docs/SPEC.md` (and any other relevant docs)
   reflect this change. Evidence: files changed in the diff.
8. **Clean working tree after commit** — after committing, run `git status`
   and confirm no unexpected unstaged/untracked changes remain. Evidence:
   command output.

## Report

Present results as a table:

| # | Check | Result | Evidence |
|---|-------|--------|----------|
| 1 | Tests pass | PASS/FAIL | ... |
| 2 | Build passes | PASS/FAIL | ... |
| 3 | Spec coverage | PASS/FAIL | ... |
| 4 | No sensitive data | PASS/FAIL | ... |
| 5 | private/.env untracked | PASS/FAIL | ... |
| 6 | No AI attribution | PASS/FAIL | ... |
| 7 | Docs updated | PASS/FAIL | ... |
| 8 | Clean tree after commit | PASS/FAIL | ... |

## Rule

If any check fails, stop immediately and do not create the commit. Explain
the failure(s) and what's needed to fix them. Only proceed to commit once
checks 1-7 all PASS; check 8 is verified after the commit completes.
