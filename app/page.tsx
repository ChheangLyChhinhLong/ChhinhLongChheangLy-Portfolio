import { profileQuery, projectsQuery } from "@/lib/sanity.query";
import type { ProfileType, ProjectType } from "@/types";
import TerminalShowcase from "./components/home/TerminalShowcase";
import Job from "./components/pages/Job";
import Social from "./components/shared/Social";
import { Slide } from "./animation/Slide";
import { sanityFetch } from "@/lib/sanity.client";
import ContributionGraph from "./components/pages/GithubCalendarComponent";
import Link from "next/link";
import { BiArrowToRight, BiCodeAlt, BiMailSend, BiStar } from "react-icons/bi";
import { brandName, fullName } from "./data/site";
import LiveClockWidget from "./components/widgets/LiveClockWidget";
import TechStack from "./components/home/TechStack";
import FeaturedProjects from "./components/home/FeaturedProjects";
import AboutPreview from "./components/home/AboutPreview";

export default async function Home() {
  const [profile, projects] = await Promise.all([
    sanityFetch<ProfileType>({ query: profileQuery, tags: ["profile"] }),
    sanityFetch<ProjectType[]>({ query: projectsQuery, tags: ["project"] }),
  ]);

  return (
    <main className="page-shell">
      <section className="relative grid items-center gap-10 overflow-hidden rounded-[30px] border border-black/[0.06] bg-white/35 p-5 shadow-glass backdrop-blur-md dark:border-white/[0.08] dark:bg-white/[0.03] sm:rounded-[38px] sm:p-8 md:p-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14 lg:p-16 lg:backdrop-blur-xl">
        <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-indigo-500/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 left-1/3 h-64 w-64 rounded-full bg-teal-400/10 blur-3xl" />
        <div key={profile?._id} className="relative max-w-2xl">
          <Slide>
            <p className="eyebrow mb-6"><BiStar aria-hidden="true" /> Available for thoughtful builds</p>
            <h1 className="max-w-3xl font-incognito text-[2.8rem] font-semibold leading-[0.96] tracking-[-0.06em] sm:text-7xl lg:text-[5.7rem]">{profile?.headline ?? "Full-stack ideas, made useful."}</h1>
            <p className="mt-7 max-w-xl text-base leading-relaxed text-zinc-500 dark:text-zinc-400 sm:text-lg">
              {profile?.shortBio ?? `${fullName} is a full-stack developer crafting clear digital products, reliable systems, and a better web.`}
            </p>
          </Slide>
          <Slide delay={0.1}>
            <Social type="social" />
          </Slide>
          <Slide delay={0.14}>
            <div className="flex flex-wrap gap-3">
              <Link href="/projects" className="ios-button-primary"><BiCodeAlt /> View projects <BiArrowToRight /></Link>
              <Link href="/contact" className="ios-button glass"><BiMailSend /> Get in touch</Link>
            </div>
          </Slide>
          <Slide delay={0.2}><div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-xs font-semibold uppercase tracking-[0.16em] text-zinc-400"><span>Web experiences</span><span>Systems thinking</span><span>Human details</span></div></Slide>
        </div>
        <Slide delay={0.14} className="relative mx-auto w-full max-w-lg"><TerminalShowcase /></Slide>
      </section>
      <section className="mt-8 overflow-hidden rounded-[26px] border border-black/[0.06] bg-zinc-950 px-5 py-4 text-white shadow-xl shadow-zinc-950/10 dark:border-white/[0.08]" aria-label="Core capabilities">
        <div className="flex min-w-max animate-[marquee_28s_linear_infinite] items-center gap-8 text-sm font-semibold text-white/70 sm:justify-center sm:animate-none"><span className="text-indigo-300">Core capabilities</span><span>Product interfaces</span><span className="text-white/20">/</span><span>Full-stack systems</span><span className="text-white/20">/</span><span>Design engineering</span><span className="text-white/20">/</span><span>Technical direction</span></div>
      </section>
      <section className="mt-6 grid grid-cols-1 gap-4 sm:mt-8 sm:grid-cols-2 lg:grid-cols-4">
        {[{ label: "Focus", value: "Product UI" }, { label: "Mode", value: "Open source" }, { label: "Signal", value: "Always curious" }].map((item) => (
          <div key={item.label} className="glass rounded-[24px] p-5">
            <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">{item.label}</p>
            <p className="mt-3 font-incognito text-xl font-semibold tracking-tight">{item.value}</p>
          </div>
        ))}
        <LiveClockWidget />
      </section>
      <TechStack />
      <FeaturedProjects projects={projects} />
      <AboutPreview bio={profile?.shortBio} />
      <section className="mt-20 flex flex-col items-start justify-between gap-6 rounded-[30px] border border-indigo-500/15 bg-indigo-500/[0.07] p-6 sm:p-8 md:flex-row md:items-center"><div><p className="eyebrow mb-3">Have a project in mind?</p><h2 className="max-w-xl font-incognito text-3xl font-semibold tracking-[-0.045em] sm:text-4xl">Good work starts with a clear conversation.</h2></div><Link href="/contact" className="ios-button-primary shrink-0">Start a conversation <BiArrowToRight /></Link></section>
      <ContributionGraph />
      <Job />
      <p className="sr-only">{brandName} portfolio home page</p>
    </main>
  );
}
