"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { BiBookOpen, BiCodeAlt, BiImages, BiMailSend, BiSearch, BiUser } from "react-icons/bi";
import SocialLinks from "../shared/SocialLinks";
import Theme from "../global/Theme";
import MobileNav from "./MobileNav";
import CommandMenu from "./CommandMenu";
import Logo from "./Logo";

const links = [{ title: "About", href: "/about", icon: BiUser }, { title: "Projects", href: "/projects", icon: BiCodeAlt }, { title: "Journal", href: "/blog", icon: BiBookOpen }, { title: "Photos", href: "/photos", icon: BiImages }];

export default function Header() {
  const pathname = usePathname();
  const [commandOpen, setCommandOpen] = useState(false);
  useEffect(() => { const handleKey = (event: KeyboardEvent) => { if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") { event.preventDefault(); setCommandOpen(true); } }; window.addEventListener("keydown", handleKey); return () => window.removeEventListener("keydown", handleKey); }, []);
  return <><header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6 lg:px-8 lg:pt-5"><div className="glass pointer-events-auto mx-auto flex max-w-7xl items-center justify-between rounded-full px-3 py-2.5 lg:px-4"><Logo variant="code" compact showStatus /><nav className="hidden lg:block" aria-label="Primary navigation"><ul className="flex items-center gap-1">{links.map(({ title, href, icon: Icon }) => { const active = pathname.startsWith(href); return <li key={href}><Link href={href} aria-current={active ? "page" : undefined} className={`flex min-h-[44px] items-center gap-2 rounded-full px-3.5 py-2 text-sm font-semibold transition ${active ? "bg-black/[0.06] text-zinc-950 dark:bg-white/[0.1] dark:text-white" : "text-zinc-500 hover:bg-black/[0.05] hover:text-zinc-950 dark:text-zinc-400 dark:hover:bg-white/[0.08] dark:hover:text-white"}`}><Icon className={`text-base ${active ? "text-indigo-500" : ""}`} />{title}</Link></li>; })}</ul></nav><div className="flex items-center gap-2"><button type="button" onClick={() => setCommandOpen(true)} className="hidden h-11 items-center gap-2 rounded-full border border-black/[0.08] bg-white/45 px-3 text-xs font-semibold text-zinc-500 backdrop-blur-xl transition hover:text-zinc-950 dark:border-white/[0.1] dark:bg-white/[0.06] dark:hover:text-white sm:flex" aria-label="Open command menu"><BiSearch className="text-base" /><span className="hidden xl:inline">Search</span><kbd className="rounded-md border border-current/20 px-1.5 py-0.5 text-[10px]">⌘K</kbd></button><Link href="/contact" className="hidden min-h-[44px] items-center gap-2 rounded-full bg-zinc-950 px-4 text-sm font-semibold text-white transition hover:-translate-y-0.5 dark:bg-white dark:text-zinc-950 lg:flex"><BiMailSend /> Contact</Link><Theme /><MobileNav pathname={pathname} onCommand={() => setCommandOpen(true)} /></div></div></header><CommandMenu open={commandOpen} onClose={() => setCommandOpen(false)} /></>;
}