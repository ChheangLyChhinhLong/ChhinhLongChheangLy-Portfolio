import { Metadata } from "next";
import { projectsQuery } from "@/lib/sanity.query";
import type { ProjectType } from "@/types";
import { Slide } from "../animation/Slide";
import { sanityFetch } from "@/lib/sanity.client";
import { brandName, siteUrl } from "../data/site";
import { siteConfig } from "@/lib/env";
import ProjectExplorer from "../components/projects/ProjectExplorer";
import Link from "next/link";
import { BiArrowToRight, BiMailSend } from "react-icons/bi";

export const metadata: Metadata = {
  title: `Projects | ${brandName}`,
  metadataBase: new URL(`${siteUrl}/projects`),
  description: `Explore projects built by ${brandName}.`,
  openGraph: { title: `Projects | ${brandName}`, url: `${siteUrl}/projects`, description: `Explore projects built by ${brandName}.`, images: siteConfig.projectsOgImage },
};

export default async function Project() {
  const projects: ProjectType[] = await sanityFetch({ query: projectsQuery, tags: ["project"] });

  return (
    <main className="page-shell">
      <section className="mb-12 max-w-3xl"><p className="eyebrow mb-4">The project archive</p><h1 className="font-incognito text-5xl font-semibold leading-[0.96] tracking-[-0.06em] sm:text-7xl">Featured work &amp; experiments.</h1><p className="mt-6 max-w-2xl text-base leading-relaxed text-zinc-500 dark:text-zinc-400 sm:text-lg">A hands-on collection of products, interfaces, backend systems, database explorations, and open-source utilities. Search the work by name or technology.</p></section>
      <Slide delay={0.1}>
        {projects.length > 0 ? <ProjectExplorer projects={projects} /> : <div className="glass rounded-[28px] p-10 text-center text-zinc-500">Projects will appear here soon.</div>}
      </Slide>
      <section className="mt-24 flex flex-col items-start justify-between gap-6 rounded-[30px] border border-indigo-500/15 bg-indigo-500/[0.07] p-6 sm:p-9 md:flex-row md:items-center"><div><p className="eyebrow mb-3">Build something specific</p><h2 className="font-incognito text-3xl font-semibold tracking-[-0.045em] sm:text-4xl">Have a project in mind?</h2><p className="mt-3 max-w-xl text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">Let&apos;s talk through the problem, the constraints, and the useful version of the idea.</p></div><Link href="/contact" className="ios-button-primary shrink-0"><BiMailSend /> Contact me <BiArrowToRight /></Link></section>
    </main>
  );
}
