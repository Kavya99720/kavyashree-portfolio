---
name: spec-first
description: Update docs/SPEC.md with requirement IDs and acceptance tests before writing any code.
---

# Spec First

Use this skill before making any code change, unless the user explicitly
says to skip it.

## Process

1. Read `docs/SPEC.md` (create it from the template below if missing).
2. Determine which requirement(s) the upcoming code change addresses:
   - New feature/behavior → add a new `FR-NN` entry (next sequential
     number, zero-padded to 2 digits).
   - Quality concern (accessibility, performance, privacy, security, etc.)
     → add a new `NFR-NN` entry (same numbering scheme, separate sequence).
   - Change to existing behavior → edit the existing entry in place instead
     of creating a duplicate.
3. Each entry must have exactly one line acceptance test describing how to
   verify it's true:

   ```markdown
   ### FR-03: <short title>
   - **Acceptance test:** <one line, concrete and verifiable>
   ```

4. Update the "Test Coverage" table in `docs/SPEC.md`, listing which test(s)
   will prove each touched ID (existing test file path, or a new one you're
   about to add).
5. Only after `docs/SPEC.md` is saved with these updates may code be
   written for the change.

## Template

If `docs/SPEC.md` doesn't exist, create it with:

```markdown
# SPEC

Living specification for this project. Every feature or quality requirement
gets an ID and a one-line acceptance test before any code is written for it.

- `FR-NN` — Functional requirement (a feature or behavior)
- `NFR-NN` — Non-functional requirement (accessibility, performance, privacy,
  security, etc.)

## Requirements

## Test Coverage

| ID | Proven by |
|----|-----------|
```
