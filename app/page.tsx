import { profileQuery } from "@/lib/sanity.query";
import type { ProfileType } from "@/types";
import HeroSvg from "./assets/icons/HeroSvg";
import Job from "./components/pages/Job";
import Social from "./components/shared/Social";
import { Slide } from "./animation/Slide";
import { sanityFetch } from "@/lib/sanity.client";
import ContributionGraph from "./components/pages/GithubCalendarComponent";
import Link from "next/link";
import { BiCodeAlt, BiRightTopArrowCircle, BiStar } from "react-icons/bi";
import { brandName, fullName } from "./data/site";
import LiveClockWidget from "./components/widgets/LiveClockWidget";

export default async function Home() {
  const profile: ProfileType = await sanityFetch({
    query: profileQuery,
    tags: ["profile"],
  });

  return (
    <main className="page-shell">
      <section className="relative grid items-center gap-8 overflow-hidden rounded-[30px] border border-black/[0.06] bg-white/35 p-5 shadow-glass backdrop-blur-md dark:border-white/[0.08] dark:bg-white/[0.03] sm:rounded-[38px] sm:p-7 md:p-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10 lg:p-16 lg:backdrop-blur-xl">
        <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-indigo-500/20 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 left-1/3 h-44 w-44 rounded-full bg-teal-400/10 blur-3xl" />
        <div key={profile?._id} className="relative max-w-2xl">
          <Slide>
            <p className="eyebrow mb-6"><BiStar aria-hidden="true" /> Available for thoughtful builds</p>
            <h1 className="font-incognito text-[2.65rem] font-semibold leading-[0.98] tracking-[-0.055em] sm:text-7xl lg:text-[5.8rem]">
              {profile?.headline ?? `Designing the next layer of the web.`}
            </h1>
            <p className="mt-7 max-w-xl text-base leading-relaxed text-zinc-500 dark:text-zinc-400 sm:text-lg">
              {profile?.shortBio ?? `${fullName} is a full-stack developer crafting calm, expressive digital products with code and curiosity.`}
            </p>
          </Slide>
          <Slide delay={0.1}>
            <Social type="social" />
          </Slide>
          <Slide delay={0.14}>
            <div className="flex flex-wrap gap-3">
              <Link href="/projects" className="ios-button-primary"><BiCodeAlt /> View selected work <BiRightTopArrowCircle /></Link>
              <Link href="/about" className="ios-button glass">More about {brandName}</Link>
            </div>
          </Slide>
        </div>
        <Slide delay={0.14} className="relative mx-auto w-full max-w-lg">
          <div className="glass relative overflow-hidden rounded-[34px] p-5 sm:p-8">
            <div className="mb-10 flex items-center justify-between text-xs font-semibold text-zinc-500">
              <span className="flex items-center gap-2"><span className="h-2 w-2 animate-pulse rounded-full bg-teal-400" /> system.online</span>
              <span>01 / 04</span>
            </div>
            <HeroSvg />
            <div className="absolute bottom-5 left-5 rounded-full border border-white/20 bg-black/20 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-white/70 backdrop-blur-xl">Ideas → Interfaces</div>
          </div>
        </Slide>
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
      <ContributionGraph />
      <Job />
    </main>
  );
}
