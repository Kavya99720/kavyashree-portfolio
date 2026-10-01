import { profile } from "../data/profile";
import { Section } from "../components/Section";
import { ProjectCard } from "../components/ProjectCard";

export function Projects() {
  return (
    <Section id="projects" title="Projects">
      <div className="grid gap-6 md:grid-cols-2">
        {profile.projects.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>
    </Section>
  );
}
