import { profile } from "../data/profile";
import { Section } from "../components/Section";

export function Experience() {
  return (
    <Section id="experience" title="Experience">
      <div className="space-y-8">
        {profile.experience.map((entry) => (
          <div key={entry.role}>
            <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">{entry.role}</h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              {entry.company} · {entry.dates}
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-zinc-700 dark:text-zinc-300">
              {entry.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
