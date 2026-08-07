import BlogList from "@/app/blog/BlogList";
import { getInitialBlogPosts } from "@/lib/blog-posts";

export default async function Posts() {
  const { posts, hasMore } = await getInitialBlogPosts();

  return <BlogList initialPosts={posts} initialHasMore={hasMore} />;
}
