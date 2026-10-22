import Link from "next/link";
import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/lib/projects";

const competencies = [
  {
    area: "Infrastructure",
    items: "Network configuration, system setup, hardware support (ICT department placement, NDDC)",
  },
  {
    area: "Machine learning",
    items: "XGBoost, scikit-learn, class imbalance, SHAP explainability",
  },
  {
    area: "Backend & NLP",
    items: "FastAPI, local LLM pipelines with Ollama, embedding search, Docker",
  },
  {
    area: "Cloud",
    items: "Static-first deploys on Cloudflare Pages; containerised services",
  },
  {
    area: "Motion",
    items: "After Effects keyframing, typography pacing, audio-synced short-form reels",
  },
];

export default function Home() {
  return (
    <>
      <section className="wrap pt-16 sm:pt-24">
        <p className="inline-flex items-center gap-2 border border-zinc-800 px-3 py-1 font-mono text-xs text-zinc-300">
          <span className="text-emerald-400">&#9679;</span>
          Available for Full-Stack, Data Science &amp; Motion Graphics contracts
        </p>

        <h1 className="mt-8 font-mono text-4xl font-semibold tracking-tight text-zinc-50 sm:text-5xl">
          Shalom &quot;vantage&quot; Bebebaraseigha
        </h1>
        <p className="mt-3 font-mono text-base text-zinc-400 sm:text-lg">
          Full-Stack Developer | Data Science & Predictive Modeling | Motion Graphics Designer
        </p>

        <p className="mt-8 max-w-2xl leading-relaxed text-zinc-300">
          I work across the stack from cables to models. Day to day I set up networks and
          machines; on my own time I train classifiers, explain what they learned, and ship
          them behind APIs. I also cut motion graphics for short-form video.
        </p>
        <p className="mt-4 max-w-2xl leading-relaxed text-zinc-400">
          Both projects below are built from real data and run locally. The numbers on their
          pages come straight from the repos, including the unflattering ones.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/projects" className="btn btn-solid">
            View projects
          </Link>
          <Link href="/gallery" className="btn">
            Watch reels
          </Link>
        </div>
      </section>

      <section className="wrap mt-20">
        <h2 className="label">Core competencies</h2>
        <dl className="mt-4 border border-zinc-800">
          {competencies.map((c, i) => (
            <div
              key={c.area}
              className={`grid gap-1 p-4 sm:grid-cols-[10rem_1fr] sm:gap-6 ${
                i > 0 ? "border-t border-zinc-800" : ""
              }`}
            >
              <dt className="font-mono text-sm text-zinc-100">{c.area}</dt>
              <dd className="text-sm text-zinc-400">{c.items}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="wrap mt-20">
        <div className="flex items-end justify-between">
          <h2 className="label">Featured work</h2>
          <Link href="/projects" className="font-mono text-xs text-zinc-500 hover:text-zinc-200">
            all projects &rarr;
          </Link>
        </div>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {projects.map((p) => (
            <ProjectCard key={p.slug} p={p} />
          ))}
        </div>
      </section>
    </>
  );
}
