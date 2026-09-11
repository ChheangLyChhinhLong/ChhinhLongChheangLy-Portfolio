"use client";

import { useMemo, useState } from "react";
import type { ProjectType } from "@/types";
import ProjectCard from "./ProjectCard";
import ProjectFilter from "./ProjectFilter";
import ProjectModal from "./ProjectModal";
import { getProjectCategory, projectCategories, type ProjectCategory } from "./project-utils";

export default function ProjectExplorer({ projects }: { projects: ProjectType[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<ProjectCategory>(projectCategories[0]);
  const [selectedProject, setSelectedProject] = useState<ProjectType | null>(null);
  const visibleProjects = useMemo(() => projects.filter((project) => { const haystack = `${project.name} ${project.tagline} ${JSON.stringify(project.description ?? [])}`.toLowerCase(); return (category === "All" || getProjectCategory(project) === category) && haystack.includes(query.toLowerCase().trim()); }), [category, projects, query]);

  return <><ProjectFilter query={query} category={category} onQueryChange={setQuery} onCategoryChange={setCategory} />{visibleProjects.length ? <section className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3" aria-live="polite">{visibleProjects.map((project, index) => <ProjectCard key={project._id} project={project} index={index} onDetails={setSelectedProject} />)}</section> : <div className="glass rounded-[28px] p-10 text-center"><p className="text-lg font-semibold">No projects found</p><p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">Try another search term or clear the active filter.</p><button type="button" onClick={() => { setQuery(""); setCategory("All"); }} className="ios-button-primary mt-6">Clear filters</button></div>}<ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} /></>;
}