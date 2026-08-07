import { heroesQuery } from "@/lib/sanity.query";
import { HeroeType } from "@/types";
import EasterEgg from "../shared/EasterEgg";
import { Slide } from "../../animation/Slide";
import { sanityFetch } from "@/lib/sanity.client";
import RefLink from "../shared/RefLink";

export default async function Heroes() {
  const heroes: HeroeType[] = await sanityFetch({
    query: heroesQuery,
    tags: ["heroe"],
  });

  return (
    <section className="mt-32 max-w-5xl">
      <Slide delay={0.17}>
        <h2 className="text-4xl mb-4 font-bold tracking-tight">Heroes</h2>
        <p className="dark:text-zinc-400 text-zinc-600 max-w-2xl">
          Inspired by{" "}
          <RefLink
            href="https://rafa.design"
            className="dark:text-blue-400 text-blue-500 underline"
          >
            Rafael Condo&apos;s
          </RefLink>{" "}
          heroes list, here&apos;s my own curated lineup of code conjurers and
          digital dynamos that I&apos;m absolutely stoked to meet someday.{" "}
          <strong className="font-semibold">
            &quot;In no particular order&quot;
          </strong>
        </p>
      </Slide>

      <ul className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-6 mt-12 tracking-tight">
        {heroes.map((heroe) => (
          <li
            key={heroe._id}
            className="flex min-h-[56px] items-center gap-x-2 rounded-2xl border border-zinc-200 bg-zinc-100 px-2 py-1 dark:border-zinc-800 dark:bg-primary-bg"
          >
            <EasterEgg isMet={heroe.met} />
            <RefLink
              href={heroe.url}
              className={`flex min-h-[44px] flex-1 items-center font-incognito tracking-wide hover:underline ${
                heroe.met && "dark:text-green-300 text-green-800"
              }`}
            >
              {heroe.name}
            </RefLink>
          </li>
        ))}
      </ul>
    </section>
  );
}
