import { useState } from "react";
import { ThemeToggle } from "./ThemeToggle";

const LINKS = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "education", label: "Education" },
  { id: "certifications", label: "Certifications" },
  { id: "contact", label: "Contact" },
];

export function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-10 border-b border-zinc-200 bg-zinc-50/90 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/90">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <a href="#hero" className="font-mono text-sm font-semibold text-emerald-600 dark:text-emerald-400">
          KC
        </a>

        <button
          type="button"
          className="rounded-md border border-zinc-300 px-2 py-1 text-sm dark:border-zinc-700 md:hidden"
          aria-expanded={open}
          aria-controls="primary-nav"
          aria-label="Toggle navigation menu"
          onClick={() => setOpen((o) => !o)}
        >
          Menu
        </button>

        <nav
          id="primary-nav"
          aria-label="Primary"
          className={`${
            open ? "flex" : "hidden"
          } absolute left-0 right-0 top-full flex-col items-start gap-4 border-b border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-950 md:static md:flex md:flex-row md:items-center md:border-none md:bg-transparent md:p-0`}
        >
          {LINKS.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={() => setOpen(false)}
              className="text-sm text-zinc-700 hover:text-emerald-600 dark:text-zinc-300 dark:hover:text-emerald-400"
            >
              {link.label}
            </a>
          ))}
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
