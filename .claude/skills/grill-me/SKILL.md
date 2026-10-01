---
name: grill-me
description: Interview the user one question at a time before building a feature, then record the decisions.
---

# Grill Me

Use this skill before starting work on any new feature, when the requirements
aren't already fully specified.

## Process

1. Think through the open decisions needed to build the feature (scope, UX,
   data, tech choices, edge cases, etc.).
2. Ask ONE question at a time using AskUserQuestion.
   - Each question must have 2-4 concrete options.
   - Mark your recommended option by appending "(Recommended)" to its label,
     and put it first in the list.
   - Do not move to the next question until the current one is answered.
3. Keep asking questions until there are no more open decisions worth
   clarifying before implementation. Don't over-ask — stop once you have
   enough to build confidently.
4. Once all questions are answered, write the decisions to
   `docs/DECISIONS.md`:
   - Create the file (and `docs/` directory) if it doesn't exist.
   - Append new entries; never overwrite prior entries.
   - Number entries sequentially (continuing from the last number in the
     file, starting at 1 if the file is new).
   - Include today's date.
   - Format:

     ```markdown
     ## N. <Feature/topic title> (YYYY-MM-DD)

     - **Question:** <question text>
       **Decision:** <chosen option>

     - **Question:** <question text>
       **Decision:** <chosen option>
     ```

5. After writing to `docs/DECISIONS.md`, stop. Do not begin implementing the
   feature unless the user explicitly asks you to.
