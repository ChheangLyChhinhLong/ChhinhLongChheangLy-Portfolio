import Image from "next/image";
import Link from "next/link";
import { BiBookOpen, BiCodeAlt, BiDownload, BiEnvelope, BiLinkExternal, BiMap } from "react-icons/bi";
import type { ProfileType } from "@/types";
import { fullName } from "../../data/site";
import RefLink from "../shared/RefLink";

type AboutHeroProps = { profile: ProfileType; resumeUrl: string; resumeDownloadUrl: string };

export default function AboutHero({ profile, resumeUrl, resumeDownloadUrl }: AboutHeroProps) {
  const stats = [
    { label: "Building with code", value: "Since 2020", icon: BiCodeAlt },
    { label: "Primary focus", value: "Web + APIs", icon: BiBookOpen },
    { label: "Based in", value: profile.location || "Cambodia", icon: BiMap },
  ];

  return <section className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start lg:gap-16">
    <div>
      <p className="eyebrow mb-5">The person behind the interface</p>
      <h1 className="max-w-3xl font-incognito text-5xl font-semibold leading-[0.96] tracking-[-0.06em] sm:text-7xl">Passionate developer, curious student, lifelong builder.</h1>
      <div className="mt-7 max-w-2xl space-y-4 text-base leading-relaxed text-zinc-500 dark:text-zinc-400 sm:text-lg">
        <p>I&apos;m {profile.fullName || fullName}, an IT student and full-stack developer based in {profile.location || "Cambodia"}. I enjoy turning messy problems into clear systems and interfaces that feel natural to use.</p>
        <p>{profile.shortBio || "My work sits between product thinking, frontend craft, backend logic, and the steady discipline of learning something new every day."}</p>
        <p>From database design and APIs to polished web experiences, I care about the reasoning behind the code as much as the final screen.</p>
      </div>
      <div className="mt-8 flex flex-wrap gap-3"><Link href="/projects" className="ios-button-primary"><BiCodeAlt /> Explore projects</Link><a href={`mailto:${profile.email}`} className="ios-button glass"><BiEnvelope /> Get in touch</a></div>
      <div className="mt-10 grid gap-3 sm:grid-cols-3">{stats.map(({ label, value, icon: Icon }) => <div key={label} className="glass rounded-[20px] p-4"><Icon className="text-xl text-indigo-500" /><p className="mt-4 text-xs uppercase tracking-[0.14em] text-zinc-500">{label}</p><p className="mt-1 font-incognito text-lg font-semibold tracking-tight">{value}</p></div>)}</div>
    </div>
    <aside className="lg:sticky lg:top-8">
      <div className="glass rounded-[30px] p-4 sm:p-5">{profile.profileImage?.image ? <Image className="aspect-square w-full rounded-[22px] object-cover" src={profile.profileImage.image} width={560} height={560} quality={90} alt={profile.profileImage.alt || profile.fullName || fullName} placeholder={profile.profileImage.lqip ? "blur" : "empty"} blurDataURL={profile.profileImage.lqip} priority /> : <div className="aspect-square rounded-[22px] bg-gradient-to-br from-indigo-500/20 via-zinc-200 to-teal-400/20 dark:via-zinc-900" />}<div className="flex items-center gap-3 px-1 pt-5"><span className="h-2.5 w-2.5 animate-pulse rounded-full bg-emerald-400" /><span className="text-sm font-semibold">Open to meaningful work</span></div><div className="mt-4 flex gap-2"><RefLink href={resumeUrl || "#"} className="ios-button-primary flex-1 rounded-2xl"><BiLinkExternal /> View résumé</RefLink><a href={resumeDownloadUrl} aria-disabled={!resumeUrl} className="tap-target grid place-items-center rounded-2xl border border-black/[0.08] text-xl text-indigo-500 transition hover:bg-black/[0.05] dark:border-white/[0.1] dark:hover:bg-white/[0.08]" title="Download résumé"><BiDownload /></a></div></div>
    </aside>
  </section>;
}