import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import CodeBlock from "@/components/CodeBlock";
import { getProject, isPlaceholder, projects } from "@/lib/projects";

type Params = { slug: string };

// Required for output: "export" - every slug is rendered at build time
export const dynamicParams = false;
export function generateStaticParams(): Params[] {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  return p ? { title: p.title, description: p.summary } : {};
}

export default async function ProjectPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) notFound();

  return (
    <article className="wrap pt-14">
      <Link href="/projects" className="font-mono text-xs text-zinc-500 hover:text-zinc-200">
        &larr; projects
      </Link>

      <header className="mt-6">
        <p className="label">
          {p.category} &middot; {p.year} &middot; {p.status}
        </p>
        <h1 className="mt-2 text-3xl font-semibold text-zinc-50">{p.title}</h1>
        <p className="mt-3 max-w-2xl text-zinc-300">{p.summary}</p>
        <div className="mt-6 flex flex-wrap gap-3">
          {p.liveUrl && !isPlaceholder(p.liveUrl) && (
            <a href={p.liveUrl} target="_blank" rel="noreferrer" className="btn btn-solid">
              Explore Live Project &#8599;
            </a>
          )}
          <a href={p.repoUrl} target="_blank" rel="noreferrer" className="btn">
            Source on GitHub
          </a>
        </div>
      </header>

      {p.demoVideo && (
        <section className="mt-10">
          <h2 className="label">Project demo</h2>
          <video
            className="mt-3 w-full border border-zinc-800 bg-black"
            controls
            playsInline
            preload="metadata"
            aria-label={`${p.title} demo`}
          >
            <source src={p.demoVideo} type="video/mp4" />
            Your browser does not support the video element.
          </video>
        </section>
      )}

      <section className="mt-14">
        <h2 className="label">Specs</h2>
        <dl className="mt-3 border border-zinc-800">
          {p.specs.map((s, i) => (
            <div
              key={s.label}
              className={`grid gap-1 px-4 py-2.5 sm:grid-cols-[11rem_1fr] ${
                i > 0 ? "border-t border-zinc-800" : ""
              }`}
            >
              <dt className="font-mono text-xs text-zinc-500">{s.label}</dt>
              <dd className="font-mono text-sm text-zinc-200">{s.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mt-14">
        <h2 className="label">Features</h2>
        <ul className="mt-3 space-y-2 text-zinc-300">
          {p.features.map((f) => (
            <li key={f} className="flex gap-3">
              <span className="font-mono text-zinc-600">-</span>
              <span>{f}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-14">
        <h2 className="label">Architecture &amp; tech stack</h2>
        <ol className="mt-3 border border-zinc-800">
          {p.architecture.map((a, i) => (
            <li
              key={a.name}
              className={`grid gap-1 px-4 py-3 sm:grid-cols-[7rem_1fr] sm:gap-4 ${
                i > 0 ? "border-t border-zinc-800" : ""
              }`}
            >
              <span className="font-mono text-sm text-zinc-100">
                <span className="text-zinc-600">{String(i + 1).padStart(2, "0")} </span>
                {a.name}
              </span>
              <span className="text-sm text-zinc-400">{a.detail}</span>
            </li>
          ))}
        </ol>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {p.stack.map((s) => (
            <span key={s} className="tag">
              {s}
            </span>
          ))}
        </div>
      </section>

      <section className="mt-14">
        <h2 className="label">Known limitations</h2>
        <ul className="mt-3 space-y-2 text-zinc-400">
          {p.limitations.map((l) => (
            <li key={l} className="flex gap-3">
              <span className="font-mono text-zinc-600">!</span>
              <span>{l}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-14">
        <h2 className="label">Local development guide</h2>
        <div className="mt-3 space-y-4">
          {p.setup.map((s, i) => (
            <CodeBlock
              key={s.title}
              title={`${i + 1}. ${s.title}`}
              comment={s.comment}
              commands={s.commands}
            />
          ))}
        </div>
      </section>
    </article>
  );
}
