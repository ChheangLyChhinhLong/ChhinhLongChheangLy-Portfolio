import { Slide } from "@/app/animation/Slide";

type HeadingType = {
  title: string;
  description?: string;
  children?: React.ReactNode;
};

export default function PageHeading({
  title,
  description,
  children,
}: HeadingType) {
  return (
    <header className="mb-10 max-w-4xl sm:mb-14">
      <Slide>
        <p className="eyebrow mb-5"><span className="h-1.5 w-1.5 rounded-full bg-teal-400" /> ChhinhLong / archive</p>
        <h1 className="max-w-3xl font-incognito text-[2.75rem] font-semibold leading-[1.02] tracking-[-0.04em] sm:text-7xl lg:leading-[0.98]">
          {title}
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-zinc-500 dark:text-zinc-400 sm:mt-7">
          {description}
        </p>
        {children}
      </Slide>
    </header>
  );
}
