import type { ProjectEntry } from "../data/profile";

export function ProjectCard({ project }: { project: ProjectEntry }) {
  return (
    <article
      data-testid="project-card"
      data-featured={project.featured ? "true" : "false"}
      className={`flex flex-col gap-3 rounded-lg border p-6 ${
        project.featured
          ? "border-emerald-500/60 bg-emerald-500/5 md:col-span-2"
          : "border-zinc-200 dark:border-zinc-800"
      }`}
    >
      <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
        {project.title}
      </h3>
      <div className="flex flex-wrap gap-2 font-mono text-xs text-emerald-600 dark:text-emerald-400">
        {project.stack.map((tech) => (
          <span key={tech}>{tech}</span>
        ))}
      </div>
      <ul className="list-disc space-y-1 pl-5 text-sm text-zinc-600 dark:text-zinc-400">
        {project.bullets.map((bullet) => (
          <li key={bullet}>{bullet}</li>
        ))}
      </ul>
      <div className="mt-auto flex gap-4 pt-2 text-sm font-medium">
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="text-emerald-600 hover:underline dark:text-emerald-400"
        >
          GitHub
        </a>
        {project.live && (
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald-600 hover:underline dark:text-emerald-400"
          >
            Live Demo
          </a>
        )}
      </div>
    </article>
  );
}
