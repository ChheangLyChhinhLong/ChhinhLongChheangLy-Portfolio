import Image from "next/image";
import { jobQuery } from "@/lib/sanity.query";
import type { JobType } from "@/types";
import { formatDate } from "../../utils/date";
import { Slide } from "../../animation/Slide";
import { sanityFetch } from "@/lib/sanity.client";
import RefLink from "../shared/RefLink";
import EmptyState from "../shared/EmptyState";
import { RiBriefcase3Fill } from "react-icons/ri";

export default async function Job() {
  const jobs: JobType[] = await sanityFetch({
    query: jobQuery,
    tags: ["job"],
  });

  return (
    <section className="mt-32">
      <Slide delay={0.16}>
        <div className="mb-16">
          <p className="eyebrow mb-3">Selected timeline</p>
          <h2 className="font-incognito text-4xl font-bold tracking-tight sm:text-5xl">
            Work experience
          </h2>
        </div>
      </Slide>

      {jobs.length > 0 ? (
        <Slide delay={0.18}>
          <div className="grid lg:grid-cols-2 grid-cols-1 gap-x-12 gap-y-10">
            {jobs.map((job) => (
              <div
                key={job._id}
                className="glass relative flex max-w-2xl items-start gap-x-4 rounded-[28px] p-5 lg:gap-x-6"
              >
                <RefLink
                  href={job.url}
                  className="relative grid min-h-[72px] min-w-[72px] place-items-center overflow-clip rounded-2xl border border-black/[0.06] bg-white/60 p-2 dark:border-white/[0.08] dark:bg-white/[0.08]"
                >
                  <Image
                    src={job.logo}
                    className="object-cover duration-300"
                    alt={`${job.name} logo`}
                    width={50}
                    height={50}
                  />
                </RefLink>
                <div className="flex flex-col items-start">
                  <h3 className="text-xl font-semibold tracking-tight">{job.name}</h3>
                  <p className="text-indigo-500 dark:text-indigo-300">{job.jobTitle}</p>
                  <time className="text-sm text-zinc-500 mt-2 tracking-widest uppercase">
                    {formatDate(job.startDate)} -{" "}
                    {job.endDate ? (
                      formatDate(job.endDate)
                    ) : (
                      <span className="dark:text-primary-color text-tertiary-color">
                        Present
                      </span>
                    )}
                  </time>
                  <p className="tracking-tight dark:text-zinc-400 text-zinc-600 my-4">
                    {job.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Slide>
      ) : (
        <EmptyState
          icon={<RiBriefcase3Fill />}
          title="Work Experience Not Provided"
          message="We could not find any work experience at the moment. To add one, visit the Sanity studio to start editing the content."
        />
      )}
    </section>
  );
}
