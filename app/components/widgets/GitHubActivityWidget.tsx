import ContributionGraph from "../pages/ContributionGraph";
import { Slide } from "@/app/animation/Slide";

export default function GitHubActivityWidget() {
  return (
    <section className="mt-14">
      <Slide delay={0.16} className="mb-7">
        <div className="flex items-end justify-between gap-4">
          <div><p className="eyebrow mb-3">Control center / activity</p><h2 className="font-incognito text-4xl font-bold tracking-[-0.04em] sm:text-5xl">Build energy</h2></div>
          <span className="hidden rounded-full border border-teal-400/20 bg-teal-400/10 px-3 py-1.5 text-xs font-bold text-teal-600 dark:text-teal-300 sm:block">live signal</span>
        </div>
      </Slide>
      <Slide delay={0.18}>
        <div className="glass will-change-transform rounded-[30px] p-4 sm:p-7"><ContributionGraph /></div>
      </Slide>
    </section>
  );
}
