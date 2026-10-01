import { profile } from "../data/profile";
import { Section } from "../components/Section";
import { ResumeButton } from "../components/ResumeButton";

export function Contact() {
  return (
    <Section id="contact" title="Contact">
      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap gap-6 text-sm font-medium">
          <a
            href={`mailto:${profile.contact.email}`}
            className="text-emerald-600 hover:underline dark:text-emerald-400"
          >
            Email
          </a>
          <a
            href={profile.contact.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald-600 hover:underline dark:text-emerald-400"
          >
            LinkedIn
          </a>
          <a
            href={profile.contact.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald-600 hover:underline dark:text-emerald-400"
          >
            GitHub
          </a>
        </div>
        <ResumeButton className="w-fit" />
      </div>
    </Section>
  );
}
