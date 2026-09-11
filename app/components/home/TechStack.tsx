import { BiCodeAlt, BiData, BiServer, BiWrench } from "react-icons/bi";

const groups = [
  { label: "Frontend", icon: BiCodeAlt, tools: "Next.js · React · TypeScript · Tailwind" },
  { label: "Backend", icon: BiServer, tools: "Node.js · APIs · Sanity · Python" },
  { label: "Data", icon: BiData, tools: "PostgreSQL · GROQ · Structured content" },
  { label: "Craft", icon: BiWrench, tools: "Git · Vercel · Motion · Accessibility" },
];

export default function TechStack() {
  return (
    <section className="mt-24" aria-labelledby="stack-heading">
      <div className="mb-7 flex items-end justify-between gap-4"><div><p className="eyebrow mb-3">The toolkit</p><h2 id="stack-heading" className="font-incognito text-3xl font-semibold tracking-[-0.045em] sm:text-4xl">Tools for thoughtful work.</h2></div><span className="hidden text-xs font-semibold uppercase tracking-[0.18em] text-zinc-400 sm:block">Always learning</span></div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{groups.map(({ label, icon: Icon, tools }) => <article key={label} className="glass group rounded-[22px] p-5 transition duration-300 hover:-translate-y-1"><Icon className="text-2xl text-indigo-500 transition group-hover:scale-110" /><h3 className="mt-7 font-semibold">{label}</h3><p className="mt-2 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">{tools}</p></article>)}</div>
    </section>
  );
}