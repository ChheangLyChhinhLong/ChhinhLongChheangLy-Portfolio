import "server-only";
import { toPlainText } from "@portabletext/react";
import type { PortableTextBlock } from "sanity";
import { sanityFetch } from "@/lib/sanity.client";
import {
  featuredPostsQuery,
  initialBlogPostsQuery,
  paginatedBlogPostsQuery,
  publishedBlogPostsCountQuery,
} from "@/lib/sanity.query";
import type { BlogPostPreview } from "@/types";

const fallbackAuthor = "ChhinhLong ChheangLy";

type BlogPostQueryResult = Omit<BlogPostPreview, "readingTime"> & {
  body?: PortableTextBlock[];
};

function getReadingTime(body: PortableTextBlock[] = []) {
  const plainText = toPlainText(body).trim();
  const wordCount = plainText ? plainText.split(/\s+/).length : 0;
  const minutes = Math.max(1, Math.ceil(wordCount / 185));

  return `${minutes} min`;
}

function normalizePosts(posts: BlogPostQueryResult[]): BlogPostPreview[] {
  return posts.map(({ body, ...post }) => ({
    ...post,
    authorName: post.authorName?.trim() || fallbackAuthor,
    readingTime: getReadingTime(body),
  }));
}

export async function getInitialBlogPosts() {
  const [posts, total] = await Promise.all([
    sanityFetch<BlogPostQueryResult[]>({
      query: initialBlogPostsQuery,
      tags: ["Post"],
    }),
    sanityFetch<number>({
      query: publishedBlogPostsCountQuery,
      tags: ["Post"],
    }),
  ]);

  return {
    posts: normalizePosts(posts),
    hasMore: posts.length < total,
  };
}

export async function getFeaturedBlogPosts() {
  const posts = await sanityFetch<BlogPostQueryResult[]>({
    query: featuredPostsQuery,
    tags: ["Post"],
  });

  return normalizePosts(posts);
}

export async function getBlogPostsPage(start: number, limit: number) {
  const end = start + limit;
  const [posts, total] = await Promise.all([
    sanityFetch<BlogPostQueryResult[]>({
      query: paginatedBlogPostsQuery,
      qParams: { start, end },
      tags: ["Post"],
    }),
    sanityFetch<number>({
      query: publishedBlogPostsCountQuery,
      tags: ["Post"],
    }),
  ]);

  return {
    posts: normalizePosts(posts),
    hasMore: start + posts.length < total,
  };
}
