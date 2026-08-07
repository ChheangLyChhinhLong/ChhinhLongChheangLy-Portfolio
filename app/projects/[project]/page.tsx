import Image from "next/image";
import { Metadata } from "next";
import { singleProjectQuery } from "@/lib/sanity.query";
import type { ProjectType } from "@/types";
import { PortableText } from "@portabletext/react";
import { CustomPortableText } from "@/app/components/shared/CustomPortableText";
import { Slide } from "../../animation/Slide";
import { urlFor } from "@/lib/sanity.image";
import { sanityFetch } from "@/lib/sanity.client";
import { BiLinkExternal, BiLogoGithub } from "react-icons/bi";
import { brandName, siteUrl } from "../../data/site";
import { siteConfig } from "@/lib/env";

type Props = {
  params: {
    project: string;
  };
};

const fallbackImage: string =
  siteConfig.projectsOgImage;

// Dynamic metadata for SEO
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = params.project;
  const project: ProjectType = await sanityFetch({
    query: singleProjectQuery,
    tags: ["project"],
    qParams: { slug },
  });

  return {
    title: `${project.name} | ${brandName}`,
    metadataBase: new URL(`${siteUrl}/projects/${project.slug}`),
    description: project.tagline,
    openGraph: {
      images: project.coverImage
        ? urlFor(project.coverImage.image).width(1200).height(630).url()
        : fallbackImage,
      url: `${siteUrl}/projects/${project.slug}`,
      title: project.name,
      description: project.tagline,
      siteName: brandName,
    },
  };
}

export default async function Project({ params }: Props) {
  const slug = params.project;
  const project: ProjectType = await sanityFetch({
    query: singleProjectQuery,
    tags: ["project"],
    qParams: { slug },
  });

  return (
    <main className="page-shell max-w-6xl">
      <Slide>
        <div className="mx-auto max-w-4xl">
          <p className="eyebrow mb-5">Project detail / {brandName}</p>
          <div className="mb-8 flex flex-wrap items-end justify-between gap-5">
            <h1 className="max-w-2xl font-incognito text-[2.75rem] font-black leading-none tracking-[-0.05em] sm:text-7xl">
              {project.name}
            </h1>

            <div className="grid w-full grid-cols-2 items-center gap-2 sm:flex sm:w-auto">
              <a
                href={project.projectUrl}
                rel="noreferrer noopener"
                target="_blank"
                className={`ios-button glass w-full ${
                  !project.projectUrl
                    ? "cursor-not-allowed opacity-80"
                    : "cursor-pointer hover:dark:border-zinc-700 hover:border-zinc-200"
                }`}
              >
                <BiLinkExternal aria-hidden="true" />
                {project.projectUrl ? "Live URL" : "Coming Soon"}
              </a>

              <a
                href={project.repository}
                rel="noreferrer noopener"
                target="_blank"
                className={`ios-button glass w-full ${
                  !project.repository
                    ? "cursor-not-allowed opacity-80"
                    : "cursor-pointer hover:dark:border-zinc-700 hover:border-zinc-200"
                }`}
              >
                <BiLogoGithub aria-hidden="true" />
                {project.repository ? "GitHub" : "No Repo"}
              </a>
            </div>
          </div>

          <div className="glass relative w-full overflow-hidden rounded-[32px] p-3 pt-[52.5%]">
            <Image
              className="rounded-[24px] object-cover"
              fill
              src={project.coverImage?.image ?? fallbackImage}
              alt={project.coverImage?.alt ?? project.name}
              quality={100}
              placeholder={project.coverImage?.lqip ? `blur` : "empty"}
              blurDataURL={project.coverImage?.lqip || ""}
            />
          </div>

          <div className="mx-auto mt-10 max-w-3xl text-lg leading-relaxed text-zinc-600 dark:text-zinc-300">
            <PortableText
              value={project.description}
              components={CustomPortableText}
            />
          </div>
        </div>
      </Slide>
    </main>
  );
}
