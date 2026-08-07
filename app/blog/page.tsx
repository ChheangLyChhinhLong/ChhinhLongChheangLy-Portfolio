import { Metadata } from "next";
import { BiDetail } from "react-icons/bi";
import Posts from "../components/pages/Posts";
import Social from "../components/shared/Social";
import { Slide } from "../animation/Slide";
import PageHeading from "@/app/components/shared/PageHeading";
import { brandName, siteUrl } from "../data/site";
import { siteConfig } from "@/lib/env";
import FeaturedPosts from "@/app/components/pages/FeaturedPosts";
import { getFeaturedBlogPosts } from "@/lib/blog-posts";

export const metadata: Metadata = {
  title: `Journal | ${brandName}`,
  metadataBase: new URL(`${siteUrl}/blog`),
  description: `Notes, experiments, and stories from ${brandName}.`,
  openGraph: { title: `Journal | ${brandName}`, url: `${siteUrl}/blog`, description: `Notes, experiments, and stories from ${brandName}.`, images: siteConfig.blogOgImage },
};

export default async function Blog() {
  const featuredPosts = await getFeaturedBlogPosts();

  return (
    <main className="page-shell">
      <PageHeading title="Journal" description="Notes from the intersection of product, code, and the small details that make digital experiences feel alive."><Social type="publication" /></PageHeading>
      <FeaturedPosts posts={featuredPosts} />
      <Slide delay={0.1}>
        <div className="mb-8 flex items-center gap-3"><span className="grid h-11 w-11 place-items-center rounded-full bg-indigo-500/10 text-indigo-500"><BiDetail /></span><h2 className="text-xl font-semibold tracking-tight">Explore all notes</h2></div>
        <Posts />
      </Slide>
    </main>
  );
}
