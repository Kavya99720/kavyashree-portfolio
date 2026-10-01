import { profile } from "../data/profile";
import { Section } from "../components/Section";

export function About() {
  return (
    <Section id="about" title="About">
      <p className="max-w-3xl text-zinc-700 dark:text-zinc-300">{profile.about}</p>
    </Section>
  );
}
