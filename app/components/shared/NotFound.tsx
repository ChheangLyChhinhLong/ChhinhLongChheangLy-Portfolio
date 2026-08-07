import Image from "next/image";
import duckImage from "@/public/searching-duck.gif";
import FeaturedPosts from "../pages/FeaturedPosts";
import { getFeaturedBlogPosts } from "@/lib/blog-posts";

type props = {
  title: string;
  description: string;
};

export default async function NotFoundComponent({ title, description }: props) {
  const featuredPosts = await getFeaturedBlogPosts();

  return (
    <main className="page-shell min-h-[60vh]">
      <header className="max-w-4xl">
        <Image
          width={80}
          height={80}
          src={duckImage}
          alt="Yellow duck searching"
        />
        <h1 className="font-incognito font-black tracking-tight sm:text-6xl text-3xl lg:leading-[3.7rem] leading-tight mt-6 mb-3">
          {title}
        </h1>
        <p className="max-w-2xl text-base dark:text-zinc-400 text-zinc-600 leading-relaxed">
          {description}
        </p>
      </header>

      <div className="mt-12">
        <FeaturedPosts posts={featuredPosts} />
      </div>
    </main>
  );
}
