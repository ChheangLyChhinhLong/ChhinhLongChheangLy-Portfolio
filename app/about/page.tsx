import Image from "next/image";
import { Metadata } from "next";
import { profileQuery } from "@/lib/sanity.query";
import type { ProfileType } from "@/types";
import { PortableText } from "@portabletext/react";
import { BiEnvelope, BiLinkExternal, BiSolidDownload } from "react-icons/bi";
import { CustomPortableText } from "../components/shared/CustomPortableText";
import Heroes from "../components/pages/Heroes";
import Usage from "../components/pages/Usage";
import { Slide } from "../animation/Slide";
import { sanityFetch } from "@/lib/sanity.client";
import RefLink from "../components/shared/RefLink";
import { brandName, fullName, siteUrl } from "../data/site";
import { siteConfig } from "@/lib/env";
import SocialLinks from "../components/shared/SocialLinks";

export const metadata: Metadata = {
  title: `About | ${brandName}`,
  metadataBase: new URL(`${siteUrl}/about`),
  description: `Learn more about ${fullName}'s skills, experience and technical background`,
  openGraph: {
    title: `About | ${brandName}`,
    url: `${siteUrl}/about`,
    description: `Learn more about ${fullName}'s skills, experience and technical background`,
    images: siteConfig.siteOgImage,
  },
};

export default async function About() {
  const profile: ProfileType = await sanityFetch({
    query: profileQuery,
    tags: ["profile"],
  });
  const resumeUrl = profile?.resumeURL || siteConfig.resumeUrl;
  const resumeDownloadUrl = resumeUrl ? `${resumeUrl}${resumeUrl.includes("?") ? "&" : "?"}dl=${encodeURIComponent(profile?.fullName || fullName)}-resume.pdf` : "#";

  return (
    <main className="page-shell relative">
      <div key={profile?._id}>
        <section className="relative grid grid-cols-1 gap-8 lg:grid-cols-custom lg:gap-12">
          <div className="order-2 lg:order-none">
            <Slide>
              <p className="eyebrow mb-5">A little context</p>
              <h1 className="mb-8 basis-1/2 font-incognito text-4xl font-semibold leading-tight tracking-[-0.04em] sm:text-6xl">
                I&apos;m {profile?.fullName ?? fullName}. I live in {profile?.location ?? "the cloud"}, where I build the future.
              </h1>

              <div className="prose prose-zinc max-w-2xl leading-relaxed dark:prose-invert">
                {profile?.fullBio ? (
                  <PortableText
                    value={profile?.fullBio}
                    components={CustomPortableText}
                  />
                ) : (
                  "Your bio information will show up here"
                )}
              </div>
            </Slide>
          </div>

          <aside className="order-none flex flex-col gap-y-8 lg:order-1 lg:justify-self-center">
            <Slide delay={0.1}>
              <div className="glass sticky top-8 rounded-[32px] p-4">
                {profile?.profileImage.image ? (
                  <Image
                    className="mb-4 aspect-square h-auto w-full rounded-[24px] bg-top object-cover"
                    src={profile?.profileImage.image}
                    width={400}
                    height={400}
                    quality={100}
                    alt={profile?.profileImage.alt}
                    placeholder="blur"
                    blurDataURL={profile?.profileImage.lqip}
                    priority
                  />
                ) : (
                  <div className="mb-4 aspect-square w-full rounded-[24px] bg-zinc-300 dark:bg-zinc-800" />
                )}

                <div className="flex flex-col gap-y-4 px-2 pb-2 text-center">
                  <div className="flex items-center gap-x-3">
                    <RefLink
                      href={resumeUrl || "#"}
                      className="ios-button-primary flex-1 rounded-2xl py-3 font-incognito text-base"
                    >
                      View Résumé <BiLinkExternal className="text-base" />
                    </RefLink>
                    <a
                      href={resumeDownloadUrl}
                      aria-disabled={!resumeUrl}
                      className="grid h-12 w-12 place-items-center rounded-2xl border border-black/[0.06] bg-black/[0.03] py-3 text-lg text-indigo-500 transition hover:bg-black/[0.08] dark:border-white/[0.1] dark:bg-white/[0.06] dark:text-indigo-300 dark:hover:bg-white/[0.12]"
                      title="Download Resume"
                    >
                      <BiSolidDownload
                        className="text-lg"
                        aria-label="Download Resume"
                      />
                    </a>
                  </div>

                  <a
                    href={`mailto:${profile?.email}`}
                    className="flex min-h-[44px] items-center justify-center gap-x-2 rounded-xl text-sm text-zinc-500 transition hover:text-indigo-500"
                  >
                    <BiEnvelope className="text-lg" />
                    {profile?.email ?? "Email address no available"}
                  </a>
                </div>
              </div>
            </Slide>
          </aside>
        </section>
        <Slide delay={0.12}>
          <section className="mt-20" aria-labelledby="social-links-heading">
            <p className="eyebrow mb-4">Find me online</p>
            <div className="mb-8 max-w-2xl">
              <h2
                id="social-links-heading"
                className="text-3xl font-semibold tracking-[-0.04em] sm:text-4xl"
              >
                Let&apos;s stay connected.
              </h2>
              <p className="mt-3 leading-relaxed text-zinc-500 dark:text-zinc-400">
                Follow the work, read the notes, or reach out through whichever
                platform feels most natural.
              </p>
            </div>
            <SocialLinks variant="grid-cards" />
          </section>
        </Slide>
        <Slide delay={0.14}>
          <Usage />
        </Slide>
        <Heroes />
      </div>
    </main>
  );
}
