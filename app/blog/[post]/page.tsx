import Image from "next/legacy/image";
import Link from "next/link";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import type { PostType } from "@/types";
import { singlePostQuery } from "@/lib/sanity.query";
import { PortableText, toPlainText } from "@portabletext/react";
import { CustomPortableText } from "../../components/shared/CustomPortableText";
import { BiChevronRight, BiSolidTime, BiTime } from "react-icons/bi";
import { formatDate } from "../../utils/date";
import SharePost from "../../components/shared/SharePost";
import FeaturedPosts from "../../components/pages/FeaturedPosts";
import { Slide } from "../../animation/Slide";
import { urlFor } from "@/lib/sanity.image";
import PayWayWidget from "@/app/components/widgets/PayWayWidget";
import Comments from "@/app/components/shared/Comments";
import { HiCalendar, HiChat } from "react-icons/hi";
import { sanityFetch } from "@/lib/sanity.client";
import { readTime } from "@/app/utils/readTime";
import PageHeading from "@/app/components/shared/PageHeading";
import { brandName, siteUrl } from "../../data/site";
import ReadingProgress from "../../components/shared/ReadingProgress";
import { siteConfig } from "@/lib/env";
import { getFeaturedBlogPosts } from "@/lib/blog-posts";
import { paywayConfig } from "@/lib/server-env";

type Props = {
  params: {
    post: string;
  };
};

const fallbackImage: string =
  siteConfig.blogOgImage;

// Dynamic metadata for SEO
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = params.post;
  const post: PostType = await sanityFetch({
    query: singlePostQuery,
    tags: ["Post"],
    qParams: { slug },
  });

  if (!post) {
    notFound();
  }

  return {
    title: `${post.title}`,
    metadataBase: new URL(`${siteUrl}/blog/${post.slug}`),
    description: post.description,
    publisher: post.author.name,
    keywords: post.tags,
    alternates: {
      canonical:
        post.canonicalLink || `${siteUrl}/blog/${post.slug}`,
    },
    openGraph: {
      images:
        urlFor(post.coverImage?.image).width(1200).height(630).url() ||
        fallbackImage,
      url: `${siteUrl}/blog/${post.slug}`,
      title: post.title,
      description: post.description,
      type: "article",
      siteName: brandName,
      authors: post.author.name,
      tags: post.tags,
      publishedTime: post._createdAt,
      modifiedTime: post._updatedAt || "",
    },
    twitter: {
      title: post.title,
      description: post.description,
      images:
        urlFor(post.coverImage?.image).width(680).height(340).url() ||
        fallbackImage,
      creator: `@${post.author.twitterUrl.split("twitter.com/")[1]}`,
      site: `@${post.author.twitterUrl.split("twitter.com/")[1]}`,
      card: "summary_large_image",
    },
  };
}

export default async function Post({ params }: Props) {
  const slug = params.post;
  const [post, featuredPosts] = await Promise.all([
    sanityFetch<PostType>({
      query: singlePostQuery,
      tags: ["Post"],
      qParams: { slug },
    }),
    getFeaturedBlogPosts(),
  ]);

  if (!post) {
    notFound();
  }

  const words = toPlainText(post.body);
  const headings = post.body.filter((block) => block.style === "h2" || block.style === "h3") as Array<{ _key?: string; children?: Array<{ text?: string }> }>;

  return (
    <main className="page-shell">
      <ReadingProgress />
      <header>
        <Slide className="glass relative flex items-center gap-x-2 rounded-full px-5 py-3 text-sm">
          <Link
            href="/blog"
            className="flex min-h-[44px] items-center whitespace-nowrap border-b border-zinc-200 text-sm text-zinc-400 hover:text-zinc-700 dark:border-zinc-700 dark:text-zinc-400 hover:dark:text-white"
          >
            cd ..
          </Link>
          <BiChevronRight />
          <p className="text-zinc-400 text-sm truncate">{post.title}</p>
        </Slide>
      </header>

      <article>
        <Slide
          className="relative grid grid-cols-1 lg:grid-cols-[minmax(0,3fr)_minmax(16rem,1fr)]"
          delay={0.1}
        >
          <div className="min-h-full border-r-0 px-0 pb-4 pt-8 lg:border-r lg:border-black/[0.06] lg:pr-8 dark:lg:border-white/[0.08]">
            <div className="mb-8 flex flex-wrap items-center gap-3 text-sm text-zinc-500 dark:text-zinc-400">
              <div className="flex items-center gap-x-2">
                <HiCalendar />
                <time dateTime={post.date ? post.date : post._createdAt}>
                  {post.date
                    ? formatDate(post.date)
                    : formatDate(post._createdAt)}
                </time>
              </div>
              <Link
                href="#comments"
                className="flex min-h-[44px] items-center gap-x-2 text-tertiary-color dark:text-primary-color"
              >
                <HiChat />
                <div className="#comments">Comments</div>
              </Link>
              <div className="flex items-center gap-x-2">
                <BiSolidTime />
                <div className="">{readTime(words)}</div>
              </div>
            </div>

            <PageHeading title={post.title} description={post.description} />

            <div className="relative mt-8 aspect-video w-full overflow-hidden rounded-[24px] shadow-glass sm:rounded-[28px]">
              <Image
                className="rounded-xl border dark:border-zinc-800 border-zinc-100 object-cover"
                layout="fill"
                src={post.coverImage?.image || fallbackImage}
                alt={post.coverImage?.alt || post.title}
                quality={100}
                placeholder={post.coverImage?.lqip ? `blur` : "empty"}
                blurDataURL={post.coverImage?.lqip || ""}
              />
            </div>

            <div className="mt-10 text-lg leading-relaxed tracking-tight text-zinc-600 dark:text-zinc-300">
              <PortableText value={post.body} components={CustomPortableText} />
            </div>
          </div>

          <aside className="right-0 top-28 flex h-max flex-col gap-y-6 py-8 lg:sticky lg:gap-y-8 lg:px-3">
            <section className="glass rounded-[26px] p-5">
              <p className="dark:text-zinc-400 text-zinc-500 text-sm">
                Written By
              </p>
              <address className="flex items-center gap-x-3 mt-4 not-italic">
                <div className="relative w-12 h-12">
                  <Image
                    src={urlFor(post.author.photo.image)
                      .width(80)
                      .height(80)
                      .url()}
                    alt={post.author.photo.alt}
                    layout="fill"
                    className="dark:bg-zinc-800 bg-zinc-300 rounded-full object-cover"
                  />
                </div>
                <div rel="author">
                  <h3 className="font-semibold text-lg tracking-tight">
                    {post.author.name}
                  </h3>
                  <a
                    href={post.author.twitterUrl}
                    className="text-blue-500 text-sm"
                    rel="noreferrer noopener"
                    target="_blank"
                  >
                    {`@${post.author.twitterUrl.split("twitter.com/")[1]}`}
                  </a>
                </div>
              </address>
            </section>

            <section className="glass rounded-[26px] p-5">
              <h3 className="text-xl font-semibold tracking-tight mb-4">
                Tags
              </h3>
              <ul className="flex flex-wrap items-center gap-2 tracking-tight">
                {post.tags.map((tag, id) => (
                  <li
                    key={id}
                    className="rounded-full border border-black/[0.06] bg-black/[0.03] px-3 py-1 text-xs dark:border-white/[0.1] dark:bg-white/[0.06]"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </section>

            {headings.length > 0 && (
              <section className="glass rounded-[26px] p-5">
                <p className="eyebrow mb-4">On this page</p>
                <ul className="space-y-3 text-sm text-zinc-500 dark:text-zinc-400">
                  {headings.map((heading) => {
                    const label = heading.children?.map((child) => child.text || "").join("") || "Section";
                    const id = label.toLowerCase().replaceAll(/[^-\w]+/g, "-").replaceAll(/--+/g, "-").replace(/^-|-$/g, "");
                    return <li key={heading._key}><a href={`#${id}`} className="flex min-h-[44px] items-center rounded-xl px-2 transition hover:translate-x-1 hover:bg-black/[0.04] hover:text-indigo-500 dark:hover:bg-white/[0.05]">{label}</a></li>;
                  })}
                </ul>
              </section>
            )}

            <SharePost
              title={post.title}
              slug={post.slug}
              description={post.description}
            />

            <section className="glass rounded-[26px] p-5">
              <h3 className="text-xl font-semibold tracking-tight mb-4">
                Featured
              </h3>
              <FeaturedPosts
                posts={featuredPosts.filter(
                  (featuredPost) => featuredPost.slug !== params.post,
                )}
                variant="compact"
              />
            </section>
          </aside>
        </Slide>
      </article>

      <section
        id="comments"
        className="glass mt-10 max-w-3xl rounded-[30px] p-6 lg:p-10"
      >
        <h3 className="lg:text-4xl text-3xl font-semibold tracking-tight mb-8">
          Comments
        </h3>
        <Comments />
      </section>

      <section className="mt-5 max-w-3xl rounded-[30px] border border-black/[0.06] bg-indigo-500/[0.06] p-6 dark:border-white/[0.08] lg:p-10">
        <h3 className="lg:text-4xl text-3xl font-semibold tracking-tight mb-8">
          Support this work
        </h3>
        <p className="mb-6 max-w-xl text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
          If this article helped, you can support the next experiment with a
          secure ABA PayWay transfer.
        </p>
        <div className="max-w-sm">
          <PayWayWidget
            baseUrl={paywayConfig.baseUrl}
            khrCode={paywayConfig.khrCode}
            usdCode={paywayConfig.usdCode}
            compact
          />
        </div>
      </section>
    </main>
  );
}
