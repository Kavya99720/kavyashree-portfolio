import { profile } from "../data/profile";
import { Section } from "../components/Section";

export function Skills() {
  return (
    <Section id="skills" title="Skills">
      <div className="grid gap-6 sm:grid-cols-2">
        {profile.skills.map((group) => (
          <div key={group.category} className="rounded-lg border border-zinc-200 p-4 dark:border-zinc-800">
            <h3 className="mb-2 font-semibold text-zinc-900 dark:text-zinc-100">{group.category}</h3>
            <ul className="flex flex-wrap gap-2 text-sm text-zinc-600 dark:text-zinc-400">
              {group.items.map((item) => (
                <li
                  key={item}
                  className="rounded border border-zinc-200 px-2 py-1 font-mono text-xs dark:border-zinc-700"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
