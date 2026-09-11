import { Metadata } from "next";
import { PortableText } from "@portabletext/react";
import { profileQuery, jobQuery } from "@/lib/sanity.query";
import type { JobType, ProfileType } from "@/types";
import { sanityFetch } from "@/lib/sanity.client";
import { brandName, fullName, siteUrl } from "../data/site";
import { siteConfig } from "@/lib/env";
import { Slide } from "../animation/Slide";
import { CustomPortableText } from "../components/shared/CustomPortableText";
import Heroes from "../components/pages/Heroes";
import Usage from "../components/pages/Usage";
import SocialLinks from "../components/shared/SocialLinks";
import AboutHero from "../components/about/AboutHero";
import ExperienceTimeline from "../components/about/ExperienceTimeline";
import SkillMatrix from "../components/about/SkillMatrix";
import Principles from "../components/about/Principles";
import AboutCta from "../components/about/AboutCta";

export const metadata: Metadata = {
  title: `About | ${brandName}`,
  metadataBase: new URL(`${siteUrl}/about`),
  description: `Learn more about ${fullName}'s skills, experience and technical background`,
  openGraph: { title: `About | ${brandName}`, url: `${siteUrl}/about`, description: `Learn more about ${fullName}'s skills, experience and technical background`, images: siteConfig.siteOgImage },
};

export default async function About() {
  const [profile, jobs] = await Promise.all([
    sanityFetch<ProfileType>({ query: profileQuery, tags: ["profile"] }),
    sanityFetch<JobType[]>({ query: jobQuery, tags: ["job"] }),
  ]);
  const resumeUrl = profile?.resumeURL || siteConfig.resumeUrl;
  const resumeDownloadUrl = resumeUrl ? `${resumeUrl}${resumeUrl.includes("?") ? "&" : "?"}dl=${encodeURIComponent(profile?.fullName || fullName)}-resume.pdf` : "#";

  return (
    <main className="page-shell relative">
      <AboutHero profile={profile} resumeUrl={resumeUrl} resumeDownloadUrl={resumeDownloadUrl} />
      <ExperienceTimeline jobs={jobs} />
      <SkillMatrix />
      <Principles />
      <Slide delay={0.08}><section className="mt-24 max-w-3xl" aria-labelledby="story-heading"><p className="eyebrow mb-3">The longer version</p><h2 id="story-heading" className="mb-7 font-incognito text-4xl font-semibold tracking-[-0.05em] sm:text-5xl">A work in progress, by design.</h2><div className="prose prose-zinc max-w-2xl leading-relaxed dark:prose-invert">{profile?.fullBio ? <PortableText value={profile.fullBio} components={CustomPortableText} /> : <p>Every project is another opportunity to learn, simplify, and build something that earns its place in someone&apos;s day.</p>}</div></section></Slide>
      <Slide delay={0.1}><section className="mt-24" aria-labelledby="social-links-heading"><p className="eyebrow mb-4">Find me online</p><div className="mb-8 max-w-2xl"><h2 id="social-links-heading" className="font-incognito text-4xl font-semibold tracking-[-0.05em] sm:text-5xl">Let&apos;s stay connected.</h2><p className="mt-3 leading-relaxed text-zinc-500 dark:text-zinc-400">Follow the work, read the notes, or reach out through whichever platform feels most natural.</p></div><SocialLinks variant="grid-cards" /></section></Slide>
      <Slide delay={0.12}><section className="mt-24"><Usage /></section></Slide>
      <Heroes />
      <AboutCta />
    </main>
  );
}
