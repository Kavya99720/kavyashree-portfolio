import { profile } from "../data/profile";
import { Section } from "../components/Section";

export function Certifications() {
  return (
    <Section id="certifications" title="Certifications">
      <div className="space-y-6">
        {profile.certifications.map((group) => (
          <div key={group.issuer}>
            <h3 className="mb-2 font-semibold text-zinc-900 dark:text-zinc-100">
              {group.issuer}
            </h3>
            <ul className="space-y-1">
              {group.items.map((item) => (
                <li
                  key={item.name}
                  className="flex flex-wrap items-baseline gap-2 text-sm text-zinc-600 dark:text-zinc-400"
                >
                  <span>{item.name}</span>
                  {item.date && (
                    <span className="font-mono text-xs text-zinc-600 dark:text-zinc-400">
                      ({item.date})
                    </span>
                  )}
                  {item.verify && (
                    <a
                      href={item.verify}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-600 hover:underline dark:text-emerald-400"
                    >
                      Verify
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
