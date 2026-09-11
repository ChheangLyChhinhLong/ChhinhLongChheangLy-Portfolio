"use client";

import { BiSearch, BiX } from "react-icons/bi";
import { projectCategories, type ProjectCategory } from "./project-utils";

type ProjectFilterProps = { query: string; category: ProjectCategory; onQueryChange: (value: string) => void; onCategoryChange: (value: ProjectCategory) => void };

export default function ProjectFilter({ query, category, onQueryChange, onCategoryChange }: ProjectFilterProps) {
  return <div className="mb-8 space-y-4"><div className="glass flex min-h-[52px] items-center gap-3 rounded-2xl px-4"><BiSearch className="shrink-0 text-xl text-indigo-500" /><input value={query} onChange={(event) => onQueryChange(event.target.value)} className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-zinc-400" placeholder="Search projects, tools, or technologies..." aria-label="Search projects" />{query && <button type="button" onClick={() => onQueryChange("")} className="tap-target grid place-items-center text-zinc-400 transition hover:text-zinc-950 dark:hover:text-white" aria-label="Clear project search"><BiX className="text-xl" /></button>}</div><div className="flex gap-2 overflow-x-auto pb-2 touch-scroll" role="tablist" aria-label="Filter projects by category">{projectCategories.map((item) => <button key={item} type="button" role="tab" aria-selected={category === item} onClick={() => onCategoryChange(item)} className={`min-h-[44px] shrink-0 rounded-full px-4 text-sm font-semibold transition active:scale-95 ${category === item ? "bg-zinc-950 text-white dark:bg-white dark:text-zinc-950" : "border border-black/[0.08] bg-white/40 text-zinc-500 hover:text-zinc-950 dark:border-white/[0.1] dark:bg-white/[0.05] dark:hover:text-white"}`}>{item}</button>)}</div></div>;
}