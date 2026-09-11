import Link from "next/link";
import { BiArrowToRight, BiCodeAlt, BiMailSend } from "react-icons/bi";

export default function AboutCta() {
  return <section className="mt-24 flex flex-col items-start justify-between gap-6 rounded-[30px] border border-indigo-500/15 bg-indigo-500/[0.07] p-6 sm:p-9 md:flex-row md:items-center"><div><p className="eyebrow mb-3">Let&apos;s build the next chapter</p><h2 className="max-w-2xl font-incognito text-3xl font-semibold tracking-[-0.045em] sm:text-4xl">Have a problem worth solving?</h2><p className="mt-3 max-w-xl text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">Explore the work, or tell me what you&apos;re thinking. The best projects usually start with a good question.</p></div><div className="flex flex-wrap gap-3"><Link href="/projects" className="ios-button-primary"><BiCodeAlt /> Explore projects <BiArrowToRight /></Link><Link href="/contact" className="ios-button glass"><BiMailSend /> Get in touch</Link></div></section>;
}