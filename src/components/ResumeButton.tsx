import { profile } from "../data/profile";

export function ResumeButton({ className = "" }: { className?: string }) {
  return (
    <a
      href={profile.resumeUrl}
      download
      className={`inline-flex items-center justify-center rounded-md bg-emerald-500 px-4 py-2 text-sm font-semibold text-zinc-950 transition hover:bg-emerald-400 ${className}`}
    >
      Download Resume
    </a>
  );
}
