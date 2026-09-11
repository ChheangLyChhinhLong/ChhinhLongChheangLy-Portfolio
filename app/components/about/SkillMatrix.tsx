import { BiCodeAlt, BiData, BiServer, BiWrench } from "react-icons/bi";

const skillGroups = [
  { title: "Frontend", icon: BiCodeAlt, level: 88, skills: ["React", "Next.js", "TypeScript", "HTML5", "CSS3", "Tailwind CSS"] },
  { title: "Backend & API", icon: BiServer, level: 80, skills: ["Node.js", "Express", "Python", "REST APIs", "Telegram bots"] },
  { title: "Databases & architecture", icon: BiData, level: 76, skills: ["PostgreSQL", "MySQL", "PK / FK", "Normalization", "DFD modeling"] },
  { title: "Tools & workflow", icon: BiWrench, level: 86, skills: ["VS Code", "Git / GitHub", "Postman", "Vercel", "Sanity"] },
];

export default function SkillMatrix() {
  return <section className="mt-24" aria-labelledby="skills-heading"><div className="mb-8"><p className="eyebrow mb-3">Technical range</p><h2 id="skills-heading" className="font-incognito text-4xl font-semibold tracking-[-0.05em] sm:text-5xl">The stack behind the work.</h2></div><div className="grid gap-4 md:grid-cols-2">{skillGroups.map(({ title, icon: Icon, level, skills }) => <article key={title} className="glass rounded-[26px] p-5 sm:p-6"><div className="flex items-center justify-between"><div className="flex items-center gap-3"><span className="grid h-11 w-11 place-items-center rounded-2xl bg-indigo-500/10 text-2xl text-indigo-500"><Icon /></span><h3 className="font-incognito text-xl font-semibold">{title}</h3></div><span className="text-xs font-bold text-zinc-400">{level}%</span></div><div className="mt-5 h-1.5 overflow-hidden rounded-full bg-black/[0.07] dark:bg-white/[0.08]"><div className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-teal-400" style={{ width: `${level}%` }} /></div><div className="mt-5 flex flex-wrap gap-2">{skills.map((skill) => <span key={skill} className="rounded-full border border-black/[0.07] px-3 py-1.5 text-xs font-semibold text-zinc-600 dark:border-white/[0.1] dark:text-zinc-300">{skill}</span>)}</div></article>)}</div></section>;
}