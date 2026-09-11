import { Metadata } from "next";
import Social from "../components/shared/Social";
import PageHeading from "@/app/components/shared/PageHeading";
import { brandName, siteUrl } from "../data/site";
import { siteConfig } from "@/lib/env";
import FeaturedPosts from "@/app/components/pages/FeaturedPosts";
import { getAllPublishedBlogPosts, getFeaturedBlogPosts } from "@/lib/blog-posts";
import JournalExplorer from "../components/blog/JournalExplorer";
import Link from "next/link";
import { BiRss } from "react-icons/bi";

export const metadata: Metadata = {
  title: `Journal | ${brandName}`,
  metadataBase: new URL(`${siteUrl}/blog`),
  description: `Notes, experiments, and stories from ${brandName}.`,
  openGraph: { title: `Journal | ${brandName}`, url: `${siteUrl}/blog`, description: `Notes, experiments, and stories from ${brandName}.`, images: siteConfig.blogOgImage },
};

export default async function Blog() {
  const [featuredPosts, posts] = await Promise.all([
    getFeaturedBlogPosts(),
    getAllPublishedBlogPosts(),
  ]);

  return (
    <main className="page-shell">
      <PageHeading title="Journal & Writing" description="Notes from the intersection of product, code, and the small details that make digital experiences feel alive."><div className="flex flex-wrap items-center gap-3"><Social type="publication" /><Link href="/api/rss" className="ios-button glass" target="_blank" rel="noreferrer"><BiRss /> RSS feed</Link></div></PageHeading>
      <FeaturedPosts posts={featuredPosts} />
      <JournalExplorer posts={posts} />
    </main>
  );
}
