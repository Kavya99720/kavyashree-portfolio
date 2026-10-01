# SPEC

Living specification for this project. Every feature or quality requirement
gets an ID and a one-line acceptance test before any code is written for it.

- `FR-NN` — Functional requirement (a feature or behavior)
- `NFR-NN` — Non-functional requirement (accessibility, performance, privacy,
  security, etc.)

## Requirements

### FR-01: Hero section
- **Acceptance test:** Page loads showing name "Kavyashree C V", title "Generative AI & Agentic AI Engineer", and a "Download Resume" button, all above the fold.

### FR-02: About section
- **Acceptance test:** About section renders the exact text "I'm a Generative AI and Agentic AI enthusiast. As a Generative AI intern at CellStrat, I design and test voice AI agents, and in my own projects I build AI agents, RAG pipelines and MCP servers that turn ideas into working apps. I learn fast, experiment constantly with tools like Claude Code, and I'm excited to grow as a Gen AI and Agentic AI engineer." with no phone number or address present. CGPA is not asserted here — it lives in Education (FR-08).

### FR-03: Skills section
- **Acceptance test:** Skills section renders all skill categories from the resume (Languages, Generative AI, ML/Data, Backend & Databases, Frontend, Tools & DevOps) with their listed items.

### FR-04: Experience section
- **Acceptance test:** Experience section lists both resume roles (CellStrat Data Science Intern, Mind Matrix Android Dev Intern) each with title, company, dates, and bullet points.

### FR-05: Projects section — full list
- **Acceptance test:** Projects section renders all 5 resume projects (BillShield, AI-Powered Document Intelligence & Data Extraction Platform, Enterprise AI Operating System, AI Placement & Interview Prep Assistant Suite, Audio Notes Platform), each with title, tech tags, description, and a GitHub link.

### FR-06: Projects section — featured highlighting
- **Acceptance test:** BillShield and the AI-Powered Document Intelligence & Data Extraction Platform render in visually larger/highlighted cards than the other 3 projects.

### FR-07: Projects section — live demo link
- **Acceptance test:** The Document Intelligence Platform card includes a working "Live Demo" link to `doc-intelligence-platform-i72d.onrender.com` in addition to its GitHub link.

### FR-08: Education section
- **Acceptance test:** Education section lists all 3 resume entries (B.E. CSE — Vemana Institute of Technology, Pre-University — SVVN PU College, SSLC — New Macaulay English School) with institution, dates, and score.

### FR-09: Certifications section
- **Acceptance test:** Certifications section lists certifications grouped by issuer (Anthropic, NPTEL, Infosys Springboard, Salesforce Trailhead) with their listed details; each of the 7 Anthropic certifications has a "Verify" link opening in a new tab (`target="_blank"`, `rel="noopener noreferrer"`) pointing to its exact verification URL.

### FR-10: Contact section
- **Acceptance test:** Contact section renders exactly 3 links — email (`mailto:kavyashreecv2@gmail.com`), LinkedIn (`https://linkedin.com/in/kavyashree-cv-ai`), GitHub (`https://github.com/Kavya99720`) — with no phone number, no address, and no contact form present.

### FR-11: Resume download — Hero
- **Acceptance test:** "Download Resume" button in the Hero section links to `/Kavyashree_CV_Resume_Public.pdf` and triggers a file download when clicked.

### FR-12: Resume download — Contact
- **Acceptance test:** "Download Resume" button in the Contact section links to `/Kavyashree_CV_Resume_Public.pdf` and triggers a file download when clicked.

### FR-13: Light/dark theme toggle
- **Acceptance test:** A visible toggle switches the site between dark (default) and light themes, and the chosen theme persists across a page reload.

### FR-14: Navigation
- **Acceptance test:** A nav bar/menu links to each section (About, Skills, Experience, Projects, Education, Certifications, Contact) and clicking a link scrolls to that section.

### NFR-01: No private contact details in public content
- **Acceptance test:** A scan of all text files under `src/`, `public/`, `index.html` and the built output (plus the extracted text of every PDF in `public/`) finds zero phone-number patterns, address patterns, `tel:` links, or entries from `private/denylist.txt` if present.

### NFR-02: `private/` directory untouched
- **Acceptance test:** `git diff` and file-modified timestamps show no writes to any file under `private/` during the build of this feature.

### NFR-03: Resume PDF served is the redacted copy
- **Acceptance test:** Both Download Resume links resolve to `public/Kavyashree_CV_Resume_Public.pdf`; opening the downloaded file shows no phone number.

### NFR-04: Responsive layout
- **Acceptance test:** All sections render without horizontal scroll or overlapping content at 375px (mobile), 768px (tablet), and 1440px (desktop) viewport widths.

### NFR-05: Keyboard and screen-reader accessibility
- **Acceptance test:** All interactive elements (nav links, theme toggle, resume buttons, project links) are reachable via Tab key in a logical order and have accessible names (axe/Lighthouse accessibility audit reports no critical violations).

### NFR-06: Production build succeeds
- **Acceptance test:** `npm run build` completes with exit code 0 and produces a deployable static output in `dist/`.

### NFR-07: Deployability on Vercel
- **Acceptance test:** The `dist/` output from `npm run build` deploys successfully to a Vercel preview URL that renders the full site with no console errors.

## Test Coverage

| ID | Proven by |
|----|-----------|
| FR-01 | `tests/hero.test.tsx` |
| FR-02 | `tests/about.test.tsx` |
| FR-03 | `tests/skills.test.tsx` |
| FR-04 | `tests/experience.test.tsx` |
| FR-05 | `tests/projects.test.tsx` |
| FR-06 | `tests/projects.test.tsx` |
| FR-07 | `tests/projects.test.tsx` |
| FR-08 | `tests/education.test.tsx` |
| FR-09 | `tests/certifications.test.tsx` |
| FR-10 | `tests/contact.test.tsx` |
| FR-11 | `tests/hero.test.tsx` |
| FR-12 | `tests/contact.test.tsx` |
| FR-13 | `tests/theme-toggle.test.tsx` |
| FR-14 | `tests/nav.test.tsx` |
| NFR-01 | `tests/privacy.test.ts` (content scan) |
| NFR-02 | manual check during review (`git status`/`git diff` on `private/`) |
| NFR-03 | `tests/privacy.test.ts` |
| NFR-04 | `tests/e2e/responsive.spec.ts` (Playwright, multiple viewports) |
| NFR-05 | `tests/e2e/a11y.spec.ts` (Playwright + axe) |
| NFR-06 | CI/`release-check` build step |
| NFR-07 | manual Vercel preview check during `release-check` |
