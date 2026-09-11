"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";
import { BiArrowToRight, BiCodeAlt, BiDownload, BiMoon, BiSearch, BiSun, BiX } from "react-icons/bi";
import { siteConfig } from "@/lib/env";

const actions = [
  { label: "Go to home", href: "/", icon: BiArrowToRight },
  { label: "Explore projects", href: "/projects", icon: BiCodeAlt },
  { label: "Read about me", href: "/about", icon: BiArrowToRight },
  { label: "Start a conversation", href: "/contact", icon: BiArrowToRight },
];

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const { resolvedTheme, setTheme } = useTheme();
  const pathname = usePathname();
  const resumeUrl = siteConfig.resumeUrl;
  const filteredActions = actions.filter((action) => action.label.toLowerCase().includes(query.toLowerCase()));

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen(true);
      }
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className="fixed right-4 top-4 z-40 hidden h-11 items-center gap-2 rounded-full border border-black/[0.08] bg-white/55 px-3 text-xs font-semibold text-zinc-500 shadow-sm backdrop-blur-xl transition hover:-translate-y-0.5 hover:text-zinc-950 dark:border-white/[0.1] dark:bg-white/[0.06] dark:hover:text-white lg:flex" aria-label="Open command palette">
        <BiSearch className="text-base" /> <span>Command</span> <kbd className="rounded-md border border-current/20 px-1.5 py-0.5 text-[10px]">⌘K</kbd>
      </button>
      {open && <div className="fixed inset-0 z-[60] grid items-start justify-center bg-zinc-950/35 px-4 pt-[12vh] backdrop-blur-sm" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && setOpen(false)}>
        <div role="dialog" aria-modal="true" aria-label="Command palette" className="glass-strong w-full max-w-xl overflow-hidden rounded-[26px] shadow-2xl">
          <div className="flex items-center gap-3 border-b border-black/[0.08] px-4 dark:border-white/[0.1]"><BiSearch className="text-xl text-zinc-400" /><input autoFocus value={query} onChange={(event) => setQuery(event.target.value)} placeholder="What do you want to do?" className="h-14 min-w-0 flex-1 bg-transparent text-base outline-none placeholder:text-zinc-400" /><button type="button" onClick={() => setOpen(false)} className="tap-target grid place-items-center text-zinc-400 hover:text-zinc-950 dark:hover:text-white" aria-label="Close command palette"><BiX className="text-xl" /></button></div>
          <div className="p-2">
            {filteredActions.map(({ label, href, icon: Icon }) => <Link key={href} href={href} className="flex min-h-[48px] items-center gap-3 rounded-2xl px-3 text-sm font-semibold transition hover:bg-black/[0.05] dark:hover:bg-white/[0.08]"><Icon className="text-lg text-indigo-500" />{label}<span className="ml-auto text-xs text-zinc-400">Enter</span></Link>)}
            {resumeUrl && <a href={resumeUrl} target="_blank" rel="noreferrer" className="flex min-h-[48px] items-center gap-3 rounded-2xl px-3 text-sm font-semibold transition hover:bg-black/[0.05] dark:hover:bg-white/[0.08]"><BiDownload className="text-lg text-indigo-500" />Download résumé</a>}
            <button type="button" onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")} className="flex min-h-[48px] w-full items-center gap-3 rounded-2xl px-3 text-left text-sm font-semibold transition hover:bg-black/[0.05] dark:hover:bg-white/[0.08]">{resolvedTheme === "dark" ? <BiSun className="text-lg text-indigo-500" /> : <BiMoon className="text-lg text-indigo-500" />}Switch to {resolvedTheme === "dark" ? "light" : "dark"} mode</button>
            {!filteredActions.length && !resumeUrl && <p className="px-3 py-6 text-center text-sm text-zinc-500">No matching actions.</p>}
          </div>
        </div>
      </div>}
    </>
  );
}