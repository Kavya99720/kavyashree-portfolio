import type { ReactNode } from "react";

export function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-heading`} className="scroll-mt-20 py-16">
      <div className="mx-auto max-w-5xl px-4">
        <h2
          id={`${id}-heading`}
          className="mb-8 font-mono text-sm font-semibold uppercase tracking-widest text-emerald-500"
        >
          {title}
        </h2>
        {children}
      </div>
    </section>
  );
}
