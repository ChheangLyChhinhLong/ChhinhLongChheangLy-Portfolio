import { getAllPublishedBlogPosts } from "@/lib/blog-posts";
import { siteConfig } from "@/lib/env";

export const dynamic = "force-dynamic";

export async function GET() {
  const posts = await getAllPublishedBlogPosts();
  const items = posts.map((post) => `<item><title>${escapeXml(post.title)}</title><link>${siteConfig.siteUrl}/blog/${post.slug}</link><guid>${siteConfig.siteUrl}/blog/${post.slug}</guid><description>${escapeXml(post.description)}</description><pubDate>${new Date(post.publishedAt).toUTCString()}</pubDate><category>${escapeXml(post.tags?.[0] || "Journal")}</category></item>`).join("");
  const xml = `<?xml version="1.0" encoding="UTF-8" ?><rss version="2.0"><channel><title>${escapeXml(siteConfig.siteName)} Journal</title><link>${siteConfig.siteUrl}/blog</link><description>${escapeXml(siteConfig.siteDescription)}</description>${items}</channel></rss>`;
  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8", "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400" } });
}

function escapeXml(value: string) {
  return value.replace(/[<>&'\"]/g, (character) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", "'": "&apos;", '\"': "&quot;" })[character] ?? character);
}