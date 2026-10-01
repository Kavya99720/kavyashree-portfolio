import { profile } from "../data/profile";
import { ResumeButton } from "../components/ResumeButton";

export function Hero() {
  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="scroll-mt-20 border-b border-zinc-200 py-24 dark:border-zinc-800"
    >
      <div className="mx-auto flex max-w-5xl flex-col gap-4 px-4">
        <h1 id="hero-heading" className="text-4xl font-bold text-zinc-900 dark:text-zinc-100">
          {profile.name}
        </h1>
        <p className="text-lg text-zinc-600 dark:text-zinc-400">{profile.title}</p>
        <p className="font-mono text-sm text-zinc-600 dark:text-zinc-400">{profile.location}</p>
        <div className="mt-4 flex flex-wrap gap-4">
          <ResumeButton />
          <a
            href={profile.contact.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-md border border-zinc-300 px-4 py-2 text-sm font-semibold text-zinc-700 transition hover:border-emerald-500 hover:text-emerald-600 dark:border-zinc-700 dark:text-zinc-300 dark:hover:border-emerald-400 dark:hover:text-emerald-400"
          >
            GitHub
          </a>
          <a
            href={profile.contact.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-md border border-zinc-300 px-4 py-2 text-sm font-semibold text-zinc-700 transition hover:border-emerald-500 hover:text-emerald-600 dark:border-zinc-700 dark:text-zinc-300 dark:hover:border-emerald-400 dark:hover:text-emerald-400"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </section>
  );
}
