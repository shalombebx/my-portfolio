"use client";

import { useState } from "react";
import ProjectCard from "./ProjectCard";
import type { Project } from "@/lib/projects";

export default function ProjectList({ projects }: { projects: Project[] }) {
  const categories = ["All", ...Array.from(new Set(projects.map((p) => p.category)))];
  const [active, setActive] = useState("All");

  const shown = active === "All" ? projects : projects.filter((p) => p.category === active);

  return (
    <>
      <div className="mt-6 flex flex-wrap gap-2" role="group" aria-label="Filter by category">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setActive(c)}
            aria-pressed={active === c}
            className={`border px-3 py-1 font-mono text-xs ${
              active === c
                ? "border-zinc-300 text-zinc-100"
                : "border-zinc-800 text-zinc-500 hover:text-zinc-200"
            }`}
          >
            {c}
          </button>
        ))}
        <span className="ml-auto self-center font-mono text-xs text-zinc-600">
          {shown.length} / {projects.length}
        </span>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {shown.map((p) => (
          <ProjectCard key={p.slug} p={p} />
        ))}
      </div>
    </>
  );
}
