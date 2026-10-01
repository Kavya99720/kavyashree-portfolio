import { profile } from "../data/profile";
import { Section } from "../components/Section";

export function Education() {
  return (
    <Section id="education" title="Education">
      <div className="space-y-4">
        {profile.education.map((entry) => (
          <div key={entry.degree}>
            <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">{entry.degree}</h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              {entry.institution} · {entry.dates} · {entry.score}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
}
