import { PortableTextComponents } from "@portabletext/react";
import { BiLinkExternal, BiSolidQuoteRight } from "react-icons/bi";
import PortableImage from "./PortableImage";
import CodeBlock from "./CodeBlock";
import HashScroll from "./HashScroll";
import getYoutubeId from "@/app/utils/get-youtubeId";
import YoutubeIframe from "./YoutubeIframe";
import RefLink from "./RefLink";
import Table from "./Table";
import { QuizValueProps, TableValueProps } from "@/types";
import Quiz from "./Quiz";

export const CustomPortableText: PortableTextComponents = {
  types: {
    image: PortableImage,
    code: CodeBlock,
    youtube: ({ value }: { value: { url: string } }) => {
      const id = getYoutubeId(value.url);
      return <YoutubeIframe videoId={id} />;
    },
    customTable: ({ value }: { value: TableValueProps }) => (
      <Table value={value} />
    ),
    quiz: ({ value }: { value: QuizValueProps }) => <Quiz value={value} />,
  },

  block: {
    normal: ({ children }) => <p className="mt-2 mb-6">{children}</p>,
    h2: ({ children }) => (
      <h2
        id={children // TODO: Export slugify code to reusable function
          ?.toString()
          .toLowerCase()
          .replaceAll(/[^-\w]+/g, "-")
          .replaceAll(/--+/g, "-")
          .replace(/^-|-$/g, "")}
        className="font-incognito before:content-['#'] before:hidden hover:before:sm:inline-block hover:before:hidden before:absolute lg:before:-left-5 before:-left-4 lg:before:text-2xl before:text-xl block before:top-1/2 before:-translate-y-1/2 before:opacity-80 dark:before:text-zinc-500 before:text-zinc-400 relative font-bold tracking-tight dark:text-zinc-100 lg:text-4xl text-3xl text-zinc-700 my-8"
      >
        <HashScroll text={children} />
      </h2>
    ),
    h3: ({ children }) => (
      <h3
        id={children
          ?.toString()
          .toLowerCase()
          .replaceAll(/[^-\w]+/g, "-")
          .replaceAll(/--+/g, "-")
          .replace(/^-|-$/g, "")}
        className="font-incognito before:content-['#'] before:hidden hover:before:sm:inline-block hover:before:hidden before:absolute lg:before:-left-5 before:-left-4 lg:before:text-2xl before:text-xl before:top-1/2 before:-translate-y-1/2 before:opacity-80 dark:before:text-zinc-500 before:text-zinc-400 relative block lg:font-bold font-semibold tracking-tight lg:text-3xl text-2xl dark:text-zinc-100 text-zinc-700 my-6"
      >
        <HashScroll text={children} />
      </h3>
    ),
    h4: ({ children }) => (
      <h4
        id={children
          ?.toString()
          .toLowerCase()
          .replaceAll(/[^-\w]+/g, "-")
          .replaceAll(/--+/g, "-")
          .replace(/^-|-$/g, "")}
        className="font-incognito before:content-['#'] before:hidden hover:before:sm:inline-block hover:before:hidden before:absolute lg:before:-left-6 before:-left-4 lg:before:text-2xl before:text-xl before:top-1/2 before:-translate-y-1/2 before:opacity-80 dark:before:text-zinc-500 before:text-zinc-400 relative inline-block font-semibold tracking-tight text-xl dark:text-zinc-100 text-zinc-700 mb-2 mt-4"
      >
        <HashScroll text={children} />
      </h4>
    ),
    blockquote: ({ children }) => (
      <blockquote className="glass relative my-8 overflow-hidden rounded-[24px] p-5 pr-12 text-lg tracking-tight lg:py-7 lg:pl-7">
        <BiSolidQuoteRight
          className="text-7xl absolute -top-7 -right-5 -rotate-12 dark:text-zinc-800 text-zinc-200"
          aria-hidden="true"
        />
        {children}
      </blockquote>
    ),
  },
  marks: {
    em: ({ children }) => (
      <em className="font-incognito font-medium italic">{children}</em>
    ),
    strong: ({ children }) => (
      <strong className="font-bold dark:text-zinc-300 text-zinc-700">
        {children}
      </strong>
    ),
    link: ({ children, value }) => {
      return (
        <RefLink
          href={value?.href}
          className="dark:text-blue-400 text-blue-500 hover:underline"
        >
          {children} <BiLinkExternal className="inline" aria-hidden="true" />
        </RefLink>
      );
    },
    code: ({ children }) => (
      <code className="rounded-md bg-indigo-500/10 px-1.5 py-[0.15rem] font-incognito font-medium text-pink-500 dark:bg-white/[0.08] dark:text-indigo-200">
        {children}
      </code>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-[square] mt-5 ml-5">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal mt-5 ml-5">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li className="mb-4">{children}</li>,
    number: ({ children }) => <li className="mb-4">{children}</li>,
  },
};
