import Link from "next/link";
import type { Project } from "@/lib/projects";

export default function ProjectCard({ p }: { p: Project }) {
  return (
    <Link
      href={`/projects/${p.slug}`}
      className="group flex flex-col border border-zinc-800 bg-panel/40 p-5 transition-colors hover:border-zinc-600"
    >
      <div className="flex items-center justify-between font-mono text-xs text-zinc-500">
        <span>{p.category}</span>
        <span>
          {p.year} &middot; {p.status}
        </span>
      </div>
      <h3 className="mt-3 text-lg font-semibold text-zinc-100 group-hover:underline">
        {p.title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-zinc-400">{p.summary}</p>
      <div className="mt-4 flex flex-wrap gap-1.5">
        {p.stack.slice(0, 5).map((s) => (
          <span key={s} className="tag">
            {s}
          </span>
        ))}
      </div>
      <span className="mt-5 font-mono text-xs text-zinc-500 group-hover:text-zinc-200">
        read case study &rarr;
      </span>
    </Link>
  );
}
