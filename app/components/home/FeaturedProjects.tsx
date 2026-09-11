import Image from "next/image";
import Link from "next/link";
import { BiCodeAlt, BiLinkExternal, BiRightTopArrowCircle } from "react-icons/bi";
import type { ProjectType } from "@/types";

function stackFor(project: ProjectType) {
  const text = `${project.name} ${project.tagline}`.toLowerCase();
  return [text.includes("next") ? "Next.js" : "Web", text.includes("sanity") ? "Sanity" : "TypeScript", text.includes("mobile") ? "Mobile" : "Product UI"];
}

export default function FeaturedProjects({ projects }: { projects: ProjectType[] }) {
  if (!projects.length) return null;
  return (
    <section className="mt-24" aria-labelledby="featured-work-heading">
      <div className="mb-8 flex items-end justify-between gap-4"><div><p className="eyebrow mb-3">Selected work</p><h2 id="featured-work-heading" className="font-incognito text-3xl font-semibold tracking-[-0.045em] sm:text-4xl">A few things I&apos;ve shipped.</h2></div><Link href="/projects" className="hidden items-center gap-2 text-sm font-semibold text-indigo-500 transition hover:text-indigo-400 sm:inline-flex">All projects <BiRightTopArrowCircle /></Link></div>
      <div className="grid gap-5 lg:grid-cols-3">{projects.slice(0, 3).map((project, index) => <article key={project._id} className="glass group overflow-hidden rounded-[26px] transition duration-300 hover:-translate-y-1">
        <Link href={`/projects/${project.slug}`} className="block">
          <div className="relative aspect-[16/9] overflow-hidden bg-zinc-200 dark:bg-zinc-900">{project.coverImage?.image ? <Image src={project.coverImage.image} alt={project.coverImage.alt ?? project.name} fill sizes="(max-width: 1024px) 100vw, 33vw" className="object-cover transition duration-500 group-hover:scale-105" /> : <div className="grid h-full place-items-center bg-gradient-to-br from-indigo-500/20 to-teal-400/10 font-mono text-4xl text-indigo-400">0{index + 1}</div>}<span className="absolute left-4 top-4 rounded-full border border-white/20 bg-black/35 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-white backdrop-blur-md">Featured</span></div>
          <div className="p-5"><div className="flex flex-wrap gap-2">{stackFor(project).map((tag) => <span key={tag} className="rounded-full bg-indigo-500/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-indigo-600 dark:text-indigo-300">{tag}</span>)}</div><h3 className="mt-4 text-xl font-semibold tracking-[-0.035em]">{project.name}</h3><p className="mt-2 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">{project.tagline}</p></div>
        </Link>
        <div className="flex gap-2 px-5 pb-5"><Link href={`/projects/${project.slug}`} className="ios-button-primary flex-1">Case study <BiRightTopArrowCircle /></Link>{project.projectUrl && <a href={project.projectUrl} target="_blank" rel="noreferrer" className="tap-target grid place-items-center rounded-full border border-black/[0.08] text-lg text-zinc-500 transition hover:text-indigo-500 dark:border-white/[0.1]" aria-label={`Open ${project.name} live demo`}><BiLinkExternal /></a>}{project.repository && <a href={project.repository} target="_blank" rel="noreferrer" className="tap-target grid place-items-center rounded-full border border-black/[0.08] text-lg text-zinc-500 transition hover:text-indigo-500 dark:border-white/[0.1]" aria-label={`Open ${project.name} source code`}><BiCodeAlt /></a>}</div>
      </article>)}</div>
    </section>
  );
}