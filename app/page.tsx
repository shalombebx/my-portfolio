import Link from "next/link";
import Image from "next/image";
import ProjectCard from "@/components/ProjectCard";
import ProfilePhotoPreview from "@/components/ProfilePhotoPreview";
import { projects } from "@/lib/projects";

const competencies = [
  {
    area: "Infrastructure",
    items: "Network configuration, system setup, hardware support (IT&I placement, NDDC)",
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
      <section className="wrap grid gap-10 pt-16 sm:pt-24 lg:grid-cols-[minmax(0,1fr)_minmax(20rem,0.85fr)] lg:items-center">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <ProfilePhotoPreview />
            <p className="inline-flex items-center gap-2 border border-zinc-800 px-3 py-1 font-mono text-xs text-zinc-300">
              <span className="text-emerald-400">&#9679;</span>
              Available for Full-Stack &amp; AI Engineering roles
            </p>
          </div>

          <h1 className="mt-8 font-mono text-4xl font-semibold tracking-tight text-zinc-50 sm:text-5xl">
            Shalom Bebebaraseigha
          </h1>
          <p className="mt-3 font-mono text-base text-zinc-400 sm:text-lg">
            Engineering explainable AI models and the full-stack infrastructure that powers them.
          </p>

          <p className="mt-8 max-w-2xl leading-relaxed text-zinc-300">
            I build systems from the ground up, moving seamlessly from physical network
            infrastructure to predictive machine learning. Whether I am training classifiers,
            explaining what they learned through visual interfaces, or shipping local-first and
            cloud-ready intelligence behind secure APIs, I own the complete technical lifecycle.
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
            <a href="mailto:shalombebx@gmail.com" className="btn">
              Get in touch
            </a>
          </div>
        </div>

        <figure className="relative mx-auto w-full max-w-lg">
          <div
            aria-hidden="true"
            className="absolute inset-8 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(16,185,129,0.22),transparent_70%)] blur-3xl"
          />
          <div className="relative overflow-hidden rounded-xl border border-zinc-800 bg-[#0c0c0f] shadow-2xl shadow-black/40">
            <Image
              src="/class-weighted-confusion-matrix.svg"
              alt="Class-weighted XGBoost confusion matrix for the oil spill severity classifier. Rows show actual severity and columns show predicted severity: Minor has 2, 4, and 4 cases; Medium has 2, 38, and 55; Major has 13, 276, and 2,247."
              width={760}
              height={620}
              className="block h-auto w-full"
            />
          </div>
          <figcaption className="relative mt-3 flex items-center justify-between gap-3 font-mono text-[10px] uppercase tracking-wider text-zinc-500">
            <span>Oil spill severity classifier</span>
            <span>Class-weighted XGBoost</span>
          </figcaption>
        </figure>
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
