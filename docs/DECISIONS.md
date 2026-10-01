# Decisions

## 1. Portfolio website v1 (2026-10-01)

- **Question:** Content source — resume vs LinkedIn PDF?
  **Decision:** `private/Kavyashree_CV_Resume.pdf` is the single source of truth for all site content. LinkedIn (https://linkedin.com/in/kavyashree-cv-ai) is used only as a link in the Contact section — not browsed or used as a content source.

- **Question:** Which sections should the portfolio have?
  **Decision:** Hero, About, Skills, Experience, Projects, Education, Certifications, Contact.

- **Question:** Which projects should be featured, and how prominently?
  **Decision:** All 5 resume projects shown. BillShield and the AI-Powered Document Intelligence & Data Extraction Platform are featured/highlighted (larger cards); the remaining 3 (Enterprise AI Operating System, AI Placement & Interview Prep Assistant Suite, Audio Notes Platform) get standard cards.

- **Question:** What visual design/aesthetic?
  **Decision:** Dark, modern dev-portfolio style — dark background, accent color, monospace/code touches, with a light mode toggle.

- **Question:** What tech stack?
  **Decision:** React + Vite + TypeScript.

- **Question:** What styling approach?
  **Decision:** Tailwind CSS.

- **Question:** Where should the site be hosted?
  **Decision:** Vercel (free Hobby tier — confirmed no expiration, custom domain support, git-based auto-deploy).

- **Question:** How should the resume download work?
  **Decision:** "Download Resume" button in both the Hero and Contact sections, linking to the PDF for one-click download.

- **Question:** The resume PDF contains a phone number, which conflicts with the CLAUDE.md privacy rule (no phone number in public files). How to handle the downloadable resume?
  **Decision:** Create a separate, redacted public-facing PDF with the phone number removed (email/LinkedIn/GitHub retained). The original file in `private/` is left untouched (read-only per CLAUDE.md). The redacted file already exists at `public/Kavyashree_CV_Resume_Public.pdf` — no further PDF editing needed; both Download Resume buttons (Hero, Contact) link to this file.

- **Question:** What should the Contact section include?
  **Decision:** Email, LinkedIn, and GitHub links only — no phone, no address, no contact form.
