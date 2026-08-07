import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { BiRightTopArrowCircle } from "react-icons/bi";
import { projectsQuery } from "@/lib/sanity.query";
import type { ProjectType } from "@/types";
import EmptyState from "../components/shared/EmptyState";
import { Slide } from "../animation/Slide";
import { sanityFetch } from "@/lib/sanity.client";
import PageHeading from "../components/shared/PageHeading";
import { brandName, siteUrl } from "../data/site";
import GlowCard from "../components/shared/GlowCard";
import { siteConfig } from "@/lib/env";

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
      <PageHeading title="Selected work" description="A living collection of products, experiments, and open-source work. Each one is a little more proof that the web can be both useful and delightful." />
      <Slide delay={0.1}>
        {projects.length > 0 ? (
          <section className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {projects.map((project, index) => (
              <GlowCard key={project._id} className="rounded-[30px] shadow-[0_18px_55px_rgba(45,212,191,0.06)]">
              <Link href={`/projects/${project.slug}`} className="glass relative z-10 block h-full min-h-[44px] rounded-[30px] p-5 active:scale-[0.98]">
                <div className="mb-7 flex items-center justify-between"><span className="grid h-12 w-12 place-items-center overflow-hidden rounded-2xl border border-black/[0.06] bg-white/60 p-2 text-2xl dark:border-white/[0.08] dark:bg-white/[0.08]">{project.logo ? <Image src={project.logo} width={48} height={48} alt={project.name} className="object-contain" /> : "✦"}</span><span className="text-xs font-bold text-zinc-400">0{index + 1}</span></div>
                <h2 className="text-2xl font-semibold tracking-[-0.04em]">{project.name}</h2>
                <p className="mt-2 min-h-[3rem] text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">{project.tagline}</p>
                <div className="mt-7 flex items-center justify-between border-t border-black/[0.06] pt-4 text-xs font-bold uppercase tracking-[0.14em] text-indigo-500 dark:border-white/[0.08] dark:text-indigo-300"><span>View case</span><BiRightTopArrowCircle className="text-lg transition group-hover:translate-x-1 group-hover:-translate-y-1" /></div>
              </Link>
              </GlowCard>
            ))}
          </section>
        ) : <EmptyState value="Projects" />}
      </Slide>
    </main>
  );
}
