"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { BiArrowToTop, BiCodeAlt, BiLinkExternal } from "react-icons/bi";
import { brandName, fullName } from "@/app/data/site";
import { socialConfig } from "@/lib/env";
import SocialLinks from "../shared/SocialLinks";
import PayWayWidget from "../widgets/PayWayWidget";

const navigation = [{ label: "Home", href: "/" }, { label: "About", href: "/about" }, { label: "Projects", href: "/projects" }, { label: "Journal", href: "/blog" }, { label: "Photos", href: "/photos" }, { label: "Contact", href: "/contact" }];
const footerSocials = ["github", "linkedin", "telegram", "x"] as const;

export default function Footer({ payway }: { payway?: { baseUrl?: string; khrCode?: string; usdCode?: string } }) {
  const [year, setYear] = useState<number | null>(null);
  useEffect(() => setYear(new Date().getFullYear()), []);
  return <footer className="relative mt-24 px-4 pb-5 md:px-8 lg:mt-36 lg:pb-8"><div className="glass-strong mx-auto max-w-7xl rounded-[32px] p-6 sm:p-8 lg:rounded-[38px] lg:p-10"><div className="grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-20"><section><div className="flex items-center gap-2 text-sm font-semibold"><span className="h-2.5 w-2.5 animate-pulse rounded-full bg-emerald-400" />Available for projects</div><h2 className="mt-5 max-w-xl font-incognito text-4xl font-semibold leading-none tracking-[-0.05em] sm:text-5xl">Useful software, carefully made.</h2><p className="mt-5 max-w-md text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">{fullName} is a developer building thoughtful web experiences, reliable systems, and open experiments.</p><Link href="/contact" className="ios-button-primary mt-7 inline-flex">Start a conversation <BiLinkExternal /></Link>{payway?.baseUrl && <div className="mt-7 max-w-sm"><PayWayWidget baseUrl={payway.baseUrl} khrCode={payway.khrCode} usdCode={payway.usdCode} /></div>}</section><div className="grid gap-8 sm:grid-cols-3"><section><h3 className="text-xs font-bold uppercase tracking-[0.16em] text-zinc-400">Navigate</h3><ul className="mt-4 space-y-3">{navigation.map((item) => <li key={item.href}><Link href={item.href} className="text-sm text-zinc-500 transition hover:text-indigo-500 dark:text-zinc-400">{item.label}</Link></li>)}</ul></section><section><h3 className="text-xs font-bold uppercase tracking-[0.16em] text-zinc-400">Presence</h3><SocialLinks variant="footer-minimal" platforms={[...footerSocials]} className="mt-3 flex-wrap" /></section><section><h3 className="text-xs font-bold uppercase tracking-[0.16em] text-zinc-400">Built with</h3><ul className="mt-4 space-y-3 text-sm text-zinc-500 dark:text-zinc-400"><li className="flex items-center gap-2"><BiCodeAlt className="text-indigo-500" /> Next.js</li><li>Tailwind CSS</li><li>Vercel + Sanity</li></ul></section></div></div><div className="mt-10 flex flex-col gap-4 border-t border-black/[0.07] pt-5 text-xs text-zinc-500 dark:border-white/[0.1] dark:text-zinc-400 sm:flex-row sm:items-center sm:justify-between"><p>© {year ?? ""} {fullName} · {brandName}</p><button type="button" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="inline-flex min-h-[44px] items-center gap-2 self-start font-semibold transition hover:text-indigo-500 sm:self-auto">Back to top <BiArrowToTop /></button></div></div></footer>;
}