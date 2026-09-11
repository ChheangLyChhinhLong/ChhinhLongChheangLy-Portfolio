"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { BiCodeAlt, BiLinkExternal, BiRightTopArrowCircle } from "react-icons/bi";
import type { ProjectType } from "@/types";
import GlowCard from "../shared/GlowCard";

const filters = ["All", "Frontend", "Backend", "Full-stack", "Mobile"] as const;
type Filter = (typeof filters)[number];

function category(project: ProjectType): Exclude<Filter, "All"> {
  const text = `${project.name} ${project.tagline}`.toLowerCase();
  if (/mobile|android|ios|flutter|react native/.test(text)) return "Mobile";
  if (/api|backend|server|node|database|sanity/.test(text)) return "Backend";
  if (/full.?stack|platform|dashboard|commerce/.test(text)) return "Full-stack";
  return "Frontend";
}

export default function ProjectGrid({ projects }: { projects: ProjectType[] }) {
  const [filter, setFilter] = useState<Filter>("All");
  const visibleProjects = useMemo(() => projects.filter((project) => filter === "All" || category(project) === filter), [filter, projects]);

  return (
    <>
      <div className="mb-7 flex gap-2 overflow-x-auto pb-2 touch-scroll" role="tablist" aria-label="Filter projects by discipline">
        {filters.map((item) => <button key={item} type="button" role="tab" aria-selected={filter === item} onClick={() => setFilter(item)} className={`min-h-[44px] shrink-0 rounded-full px-4 text-sm font-semibold transition active:scale-95 ${filter === item ? "bg-zinc-950 text-white dark:bg-white dark:text-zinc-950" : "border border-black/[0.08] bg-white/40 text-zinc-500 hover:text-zinc-950 dark:border-white/[0.1] dark:bg-white/[0.05] dark:hover:text-white"}`}>{item}</button>)}
      </div>
      {visibleProjects.length > 0 ? <section className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6" aria-live="polite">
        {visibleProjects.map((project, index) => <GlowCard key={project._id} className="rounded-[30px]">
          <article className="glass relative z-10 flex h-full flex-col rounded-[30px] p-5">
            <div className="mb-7 flex items-center justify-between"><span className="grid h-12 w-12 place-items-center overflow-hidden rounded-2xl border border-black/[0.06] bg-white/60 p-2 text-2xl dark:border-white/[0.08] dark:bg-white/[0.08]">{project.logo ? <Image src={project.logo} width={48} height={48} alt="" className="object-contain" /> : <BiCodeAlt className="text-indigo-500" />}</span><span className="text-xs font-bold text-zinc-400">0{index + 1}</span></div>
            <p className="eyebrow text-[0.6rem]">{category(project)}</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-[-0.04em]">{project.name}</h2>
            <p className="mt-2 min-h-[3rem] text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">{project.tagline}</p>
            <div className="mt-auto flex flex-wrap gap-2 border-t border-black/[0.06] pt-5 dark:border-white/[0.08]"><Link href={`/projects/${project.slug}`} className="ios-button-primary flex-1">Case study <BiRightTopArrowCircle /></Link>{project.projectUrl && <a href={project.projectUrl} target="_blank" rel="noreferrer" aria-label={`Open ${project.name} live project`} className="tap-target grid place-items-center rounded-full border border-black/[0.08] text-lg text-zinc-500 transition hover:text-indigo-500 dark:border-white/[0.1]"><BiLinkExternal /></a>}{project.repository && <a href={project.repository} target="_blank" rel="noreferrer" aria-label={`Open ${project.name} source code`} className="tap-target grid place-items-center rounded-full border border-black/[0.08] text-lg text-zinc-500 transition hover:text-indigo-500 dark:border-white/[0.1]"><BiCodeAlt /></a>}</div>
          </article>
        </GlowCard>)}
      </section> : <p className="glass rounded-3xl p-8 text-center text-zinc-500">No projects in this category yet.</p>}
    </>
  );
}