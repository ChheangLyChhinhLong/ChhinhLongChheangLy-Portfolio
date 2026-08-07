"use client";

import type { PointerEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { BiRightTopArrowCircle, BiSolidTime } from "react-icons/bi";
import { HiCalendar } from "react-icons/hi";
import { formatDate } from "@/app/utils/date";
import { siteConfig } from "@/lib/env";
import type { BlogPostPreview } from "@/types";

type FeaturedPostsProps = {
  posts: BlogPostPreview[];
  variant?: "hero" | "compact";
};

function updateGlow(event: PointerEvent<HTMLElement>) {
  const bounds = event.currentTarget.getBoundingClientRect();
  event.currentTarget.style.setProperty(
    "--glow-x",
    `${event.clientX - bounds.left}px`,
  );
  event.currentTarget.style.setProperty(
    "--glow-y",
    `${event.clientY - bounds.top}px`,
  );
}

export default function FeaturedPosts({
  posts,
  variant = "hero",
}: FeaturedPostsProps) {
  const shouldReduceMotion = useReducedMotion();
  const featuredPosts = posts.slice(0, 3);

  if (featuredPosts.length === 0) return null;

  if (variant === "compact") {
    return (
      <div className="space-y-3">
        {featuredPosts.map((post, index) => (
          <motion.div
            key={post._id}
            whileHover={shouldReduceMotion ? undefined : { y: -4, scale: 1.01 }}
            transition={{ type: "spring", stiffness: 320, damping: 24 }}
          >
            <article
              onPointerMove={updateGlow}
              className="group relative overflow-hidden rounded-[24px] border border-black/[0.07] bg-white/50 shadow-glass backdrop-blur-md dark:border-white/10 dark:bg-black/30 lg:backdrop-blur-2xl"
            >
              <div className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(240px_circle_at_var(--glow-x,50%)_var(--glow-y,50%),rgba(129,140,248,0.18),transparent_55%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <Link
                href={`/blog/${post.slug}`}
                className="relative flex min-h-[7rem] gap-3 p-3"
              >
                <div className="relative w-24 shrink-0 overflow-hidden rounded-[18px] bg-zinc-200 dark:bg-zinc-800">
                  <Image
                    src={post.mainImage?.image || siteConfig.blogOgImage}
                    alt={post.mainImage?.alt || post.title}
                    fill
                    sizes="96px"
                    className="object-cover transition duration-700 group-hover:scale-105"
                    placeholder={post.mainImage?.lqip ? "blur" : "empty"}
                    blurDataURL={post.mainImage?.lqip || undefined}
                  />
                </div>
                <div className="relative z-20 min-w-0 py-1">
                  <p className="mb-2 text-[0.6rem] font-bold uppercase tracking-[0.18em] text-indigo-500 dark:text-indigo-300">
                    {post.featured ? (index === 0 ? "Top story" : "Featured") : "Latest"}
                  </p>
                  <h4 className="line-clamp-2 text-sm font-semibold leading-snug tracking-tight">
                    {post.title}
                  </h4>
                  <p className="mt-2 flex items-center gap-1 text-[0.65rem] text-zinc-500 dark:text-zinc-400">
                    <BiSolidTime aria-hidden="true" /> {post.readingTime}
                  </p>
                </div>
              </Link>
            </article>
          </motion.div>
        ))}
      </div>
    );
  }

  return (
    <section className="mb-12 mt-10" aria-labelledby="featured-posts-title">
      <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="eyebrow mb-2">Curated journal</p>
          <h2
            id="featured-posts-title"
            className="text-3xl font-semibold tracking-[-0.035em] sm:text-4xl"
          >
            Featured stories
          </h2>
        </div>
        <p className="max-w-sm text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
          Pinned ideas, deep dives, and the latest notes worth starting with.
        </p>
      </div>

      <div className="grid gap-5 lg:grid-cols-[1.35fr_0.95fr] lg:grid-rows-2">
        {featuredPosts.map((post, index) => {
          const isHero = index === 0;
          const badge = post.featured
            ? isHero
              ? "Top story"
              : "Featured"
            : "Latest";

          return (
            <div
              key={post._id}
              className={`${
                isHero ? "min-h-[390px] sm:min-h-[430px] lg:row-span-2 lg:min-h-[570px]" : "min-h-[290px] lg:min-h-0"
              }`}
            >
              <motion.div
                initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={shouldReduceMotion ? undefined : { y: -6, scale: 1.01 }}
                transition={{
                  type: "spring",
                  stiffness: 280,
                  damping: 24,
                  delay: shouldReduceMotion ? 0 : index * 0.06,
                }}
                style={{ height: "100%" }}
              >
                <article
                  onPointerMove={updateGlow}
                  className="group relative h-full overflow-hidden rounded-[28px] border border-black/[0.07] bg-white/50 shadow-[0_24px_80px_rgba(79,70,229,0.10)] backdrop-blur-md dark:border-white/10 dark:bg-black/30 dark:shadow-[0_24px_80px_rgba(0,0,0,0.3)] sm:rounded-[32px] lg:backdrop-blur-2xl"
                >
                  <div className="pointer-events-none absolute inset-0 z-20 bg-[radial-gradient(420px_circle_at_var(--glow-x,50%)_var(--glow-y,50%),rgba(129,140,248,0.22),transparent_52%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <Link href={`/blog/${post.slug}`} className="absolute inset-0">
                <Image
                  src={post.mainImage?.image || siteConfig.blogOgImage}
                  alt={post.mainImage?.alt || post.title}
                  fill
                  priority={isHero}
                  sizes={
                    isHero
                      ? "(max-width: 1024px) 100vw, 58vw"
                      : "(max-width: 1024px) 100vw, 40vw"
                  }
                  className="object-cover transition duration-700 ease-out group-hover:scale-[1.045]"
                  placeholder={post.mainImage?.lqip ? "blur" : "empty"}
                  blurDataURL={post.mainImage?.lqip || undefined}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/35 to-black/5" />
                <div className="absolute inset-x-0 bottom-0 z-30 p-6 text-white sm:p-7">
                  <div className="mb-4 flex items-center justify-between gap-4">
                    <span className="rounded-full border border-blue-300/30 bg-gradient-to-r from-blue-500/25 to-purple-500/25 px-3 py-1.5 text-[0.62rem] font-bold uppercase tracking-[0.2em] text-blue-100 shadow-[0_0_24px_rgba(96,165,250,0.2)] backdrop-blur-md lg:backdrop-blur-2xl">
                      {badge}
                    </span>
                    <span className="grid h-11 w-11 place-items-center rounded-full border border-white/20 bg-white/10 text-xl backdrop-blur-md transition duration-300 group-hover:rotate-6 group-hover:bg-white/20 lg:backdrop-blur-2xl">
                      <BiRightTopArrowCircle aria-hidden="true" />
                    </span>
                  </div>

                  <p className="mb-2 text-[0.65rem] font-bold uppercase tracking-[0.18em] text-indigo-200">
                    {post.tags?.[0] || "Journal"}
                  </p>
                  <h3
                    className={`font-semibold leading-[1.05] tracking-[-0.035em] ${
                      isHero ? "max-w-2xl text-3xl sm:text-5xl" : "text-2xl sm:text-3xl"
                    }`}
                  >
                    {post.title}
                  </h3>
                  {isHero ? (
                    <p className="mt-3 line-clamp-2 max-w-2xl text-sm leading-relaxed text-white/70 sm:text-base">
                      {post.description}
                    </p>
                  ) : null}

                  <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-white/65">
                    <span className="font-medium text-white/85">
                      By {siteConfig.fullName}
                    </span>
                    <time
                      dateTime={post.publishedAt}
                      className="flex items-center gap-1.5"
                    >
                      <HiCalendar aria-hidden="true" />
                      {formatDate(post.publishedAt)}
                    </time>
                    <span className="flex items-center gap-1.5">
                      <BiSolidTime aria-hidden="true" />
                      {post.readingTime}
                    </span>
                  </div>
                </div>
                  </Link>
                </article>
              </motion.div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
