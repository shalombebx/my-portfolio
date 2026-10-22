import type { Metadata } from "next";
import ProjectList from "@/components/ProjectList";
import { projects } from "@/lib/projects";

export const metadata: Metadata = { title: "Projects" };

export default function ProjectsPage() {
  return (
    <div className="wrap pt-14">
      <p className="label">~/projects</p>
      <h1 className="mt-2 font-mono text-3xl font-semibold text-zinc-50">Projects</h1>
      <p className="mt-3 max-w-xl text-zinc-400">
        Each entry links to a case study with architecture, measured results, limitations and
        the exact commands to run it yourself.
      </p>
      <ProjectList projects={projects} />
    </div>
  );
}
