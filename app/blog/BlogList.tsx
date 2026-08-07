"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  BiChevronDown,
  BiLoaderAlt,
  BiRightTopArrowCircle,
  BiSolidTime,
} from "react-icons/bi";
import { HiCalendar } from "react-icons/hi";
import EmptyState from "@/app/components/shared/EmptyState";
import { formatDate } from "@/app/utils/date";
import { siteConfig } from "@/lib/env";
import type { BlogPostPreview } from "@/types";

const batchSize = 3;
const fallbackAuthor = "ChhinhLong ChheangLy";

type BlogListProps = {
  initialPosts: BlogPostPreview[];
  initialHasMore: boolean;
};

type PostsResponse = {
  posts: BlogPostPreview[];
  hasMore: boolean;
};

export default function BlogList({
  initialPosts,
  initialHasMore,
}: BlogListProps) {
  const [posts, setPosts] = useState(initialPosts);
  const [hasMore, setHasMore] = useState(initialHasMore);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const shouldReduceMotion = useReducedMotion();

  async function loadMorePosts() {
    if (isLoading || !hasMore) return;

    setIsLoading(true);
    setError("");
    navigator.vibrate?.(8);

    try {
      const response = await fetch(
        `/api/posts?start=${posts.length}&limit=${batchSize}`,
        { cache: "no-store" },
      );

      if (!response.ok) {
        throw new Error("Unable to load more posts.");
      }

      const data = (await response.json()) as PostsResponse;
      setPosts((currentPosts) => [...currentPosts, ...data.posts]);
      setHasMore(data.hasMore);
      navigator.vibrate?.([6, 35, 6]);
    } catch (loadError) {
      setError(
        loadError instanceof Error
          ? loadError.message
          : "Unable to load more posts.",
      );
    } finally {
      setIsLoading(false);
    }
  }

  if (posts.length === 0) {
    return <EmptyState value="Blog Post" />;
  }

  return (
    <section>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence>
          {posts.map((post, index) => (
            <motion.div
              key={post._id}
              initial={
                shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 }
              }
              animate={{ opacity: 1, y: 0 }}
              whileHover={
                shouldReduceMotion ? undefined : { scale: 1.02, y: -4 }
              }
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 24,
                delay: shouldReduceMotion ? 0 : (index % batchSize) * 0.06,
              }}
            >
              <article className="group h-full">
                <Link
                  href={`/blog/${post.slug}`}
                  className="relative block h-full min-h-[44px] overflow-hidden rounded-3xl border border-white/15 bg-white/10 p-3 shadow-[0_20px_60px_rgba(79,70,229,0.08)] backdrop-blur-md transition duration-300 ease-out hover:shadow-[0_25px_70px_rgba(79,70,229,0.16)] active:scale-[0.99] dark:border-white/10 dark:bg-black/20 lg:backdrop-blur-xl"
                >
                  <div className="relative h-52 overflow-hidden rounded-[1.25rem] bg-zinc-200 dark:bg-zinc-800">
                    <Image
                      src={post.mainImage?.image || siteConfig.blogOgImage}
                      className="object-cover transition duration-700 group-hover:scale-105"
                      alt={post.mainImage?.alt || post.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      placeholder={post.mainImage?.lqip ? "blur" : "empty"}
                      blurDataURL={post.mainImage?.lqip || undefined}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/45 to-transparent opacity-60" />
                    <span className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full border border-white/20 bg-black/20 text-xl text-white backdrop-blur-md transition duration-300 group-hover:rotate-6 lg:backdrop-blur-xl">
                      <BiRightTopArrowCircle />
                    </span>
                  </div>

                  <div className="p-4 pb-5">
                    <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-indigo-500 dark:text-indigo-300">
                      {post.tags?.[0] || "Journal"}
                    </p>
                    <h2 className="mb-3 text-2xl font-semibold tracking-[-0.03em]">
                      {post.title}
                    </h2>
                    <p className="line-clamp-2 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
                      {post.description}
                    </p>

                    <p className="mt-5 text-xs font-medium text-zinc-600 dark:text-zinc-300">
                      By {post.authorName || fallbackAuthor}
                    </p>
                    <div className="mt-2 flex flex-wrap items-center gap-4 text-xs text-zinc-500 dark:text-zinc-400">
                      <span className="flex items-center gap-1.5">
                        <HiCalendar />
                        {formatDate(post.publishedAt)}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <BiSolidTime />
                        {post.readingTime}
                      </span>
                    </div>
                  </div>
                </Link>
              </article>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {error ? (
        <p
          className="mt-5 text-center text-sm text-rose-600 dark:text-rose-300"
          role="alert"
        >
          {error} Please try again.
        </p>
      ) : null}

      {hasMore ? (
        <div className="mt-10 flex justify-center">
          <motion.div
            whileHover={shouldReduceMotion ? undefined : { y: -2 }}
            whileTap={shouldReduceMotion ? undefined : { scale: 0.95 }}
          >
            <button
              type="button"
              onClick={loadMorePosts}
              disabled={isLoading}
              className="inline-flex min-h-[44px] min-w-[11rem] items-center justify-center gap-2 rounded-full border border-white/20 bg-white/20 px-6 py-3.5 text-sm font-semibold tracking-tight shadow-[0_14px_40px_rgba(79,70,229,0.13)] backdrop-blur-md transition-all duration-200 ease-out active:scale-95 disabled:cursor-wait disabled:opacity-70 dark:border-white/10 dark:bg-white/10 lg:backdrop-blur-2xl"
              aria-label={isLoading ? "Loading more posts" : "See 3 more posts"}
            >
              {isLoading ? (
                <>
                  <BiLoaderAlt
                    className="animate-spin text-lg"
                    aria-hidden="true"
                  />
                  Loading
                </>
              ) : (
                <>
                  See More (+3)
                  <BiChevronDown className="text-lg" aria-hidden="true" />
                </>
              )}
            </button>
          </motion.div>
        </div>
      ) : null}

      <span className="sr-only" aria-live="polite">
        {isLoading
          ? "Loading more posts"
          : `${posts.length} posts are currently displayed`}
      </span>
    </section>
  );
}
