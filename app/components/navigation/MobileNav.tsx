"use client";

import Link from "next/link";
import { createPortal } from "react-dom";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  BiBookOpen,
  BiCodeAlt,
  BiDownload,
  BiHomeAlt,
  BiImages,
  BiMailSend,
  BiMoon,
  BiSearch,
  BiSun,
  BiUser,
  BiX,
} from "react-icons/bi";
import { useTheme } from "next-themes";
import { siteConfig, socialConfig } from "@/lib/env";
import SocialLinks from "../shared/SocialLinks";
import Logo from "./Logo";

const links = [
  { title: "Home", href: "/", icon: BiHomeAlt },
  { title: "Projects", href: "/projects", icon: BiCodeAlt },
  { title: "Journal", href: "/blog", icon: BiBookOpen },
  { title: "About", href: "/about", icon: BiUser },
  { title: "Photos", href: "/photos", icon: BiImages },
  { title: "Contact", href: "/contact", icon: BiMailSend },
];

type MobileNavProps = { pathname: string; onCommand: () => void };

export default function MobileNav({ pathname, onCommand }: MobileNavProps) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLElement>(null);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) {
      document.body.style.overflow = "";
      return;
    }

    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
      if (event.key !== "Tab" || !dialogRef.current) return;

      const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
        "a[href], button:not([disabled]), [tabindex]:not([tabindex='-1'])",
      );
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);
    const focusTimer = window.setTimeout(() => {
      dialogRef.current?.querySelector<HTMLElement>("a[href], button:not([disabled])")?.focus();
    }, 20);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.clearTimeout(focusTimer);
      window.removeEventListener("keydown", closeOnEscape);
      triggerRef.current?.focus();
    };
  }, [open]);

  const drawer = (
    <AnimatePresence>
      {open ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] overflow-hidden bg-zinc-950/50 backdrop-blur-xl lg:hidden"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setOpen(false);
          }}
        >
          <motion.aside
            ref={dialogRef}
            id="mobile-navigation-drawer"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="ml-auto flex h-[100dvh] w-full max-w-md flex-col overflow-y-auto overscroll-contain border-l border-white/[0.1] bg-[#f4f6fb] px-5 pb-6 pt-[max(1.5rem,env(safe-area-inset-top))] shadow-2xl dark:bg-[#101014] sm:px-7"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
          >
            <div className="flex shrink-0 items-center justify-between">
              <Logo variant="terminal" showStatus />
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="tap-target grid place-items-center rounded-full border border-black/[0.08] text-xl text-zinc-500 dark:border-white/[0.1]"
                aria-label="Close navigation menu"
              >
                <BiX />
              </button>
            </div>

            <div className="mt-8 rounded-[24px] border border-indigo-500/15 bg-indigo-500/[0.07] p-4">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-indigo-500">Quick access</p>
              <p className="mt-2 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">Navigate the portfolio, switch themes, or search the work in one tap.</p>
            </div>

            <nav className="mt-6" aria-label="Mobile navigation">
              <ul className="space-y-2">
                {links.map(({ title, href, icon: Icon }, index) => {
                  const active = href === "/" ? pathname === href : pathname.startsWith(href);
                  return (
                    <motion.li key={href} initial={{ opacity: 0, x: 18 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.04 }}>
                      <Link
                        href={href}
                        onClick={() => setOpen(false)}
                        aria-current={active ? "page" : undefined}
                        className={`flex min-h-[52px] items-center gap-3 rounded-2xl px-4 text-base font-semibold transition ${active ? "bg-zinc-950 text-white dark:bg-white dark:text-zinc-950" : "text-zinc-600 hover:bg-black/[0.05] dark:text-zinc-300 dark:hover:bg-white/[0.07]"}`}
                      >
                        <Icon className="text-xl text-indigo-500" />
                        {title}
                        {active ? <span className="ml-auto h-2 w-2 rounded-full bg-emerald-400" /> : null}
                      </Link>
                    </motion.li>
                  );
                })}
              </ul>
            </nav>

            <div className="mt-auto grid gap-2 border-t border-black/[0.08] pt-6 dark:border-white/[0.1]">
              <div className="grid grid-cols-2 gap-2">
                <button type="button" onClick={() => { setOpen(false); onCommand(); }} className="flex min-h-[50px] items-center gap-2 rounded-2xl bg-indigo-500/10 px-3 text-left text-sm font-semibold text-indigo-600 dark:text-indigo-300"><BiSearch className="text-lg" />Search <kbd className="ml-auto text-[10px]">⌘K</kbd></button>
                <button type="button" onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")} className="flex min-h-[50px] items-center gap-2 rounded-2xl border border-black/[0.08] px-3 text-left text-sm font-semibold text-zinc-600 dark:border-white/[0.1] dark:text-zinc-300">{resolvedTheme === "dark" ? <BiSun /> : <BiMoon />}Theme</button>
              </div>
              {siteConfig.resumeUrl ? <a href={siteConfig.resumeUrl} target="_blank" rel="noreferrer" onClick={() => setOpen(false)} className="ios-button glass w-full"><BiDownload /> Download CV</a> : null}
              <Link href="/contact" onClick={() => setOpen(false)} className="ios-button-primary w-full"><BiMailSend /> Contact me</Link>
              <div className="flex items-center justify-between pt-2"><SocialLinks variant="footer-minimal" platforms={["github", "linkedin", "telegram", "email"]} className="gap-1" /><span className="max-w-[11rem] truncate text-xs text-zinc-400">{socialConfig.email}</span></div>
            </div>
          </motion.aside>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );

  return (
    <>
      <button ref={triggerRef} type="button" onClick={() => setOpen((current) => !current)} className="tap-target grid place-items-center rounded-full border border-black/[0.08] bg-white/55 text-xl text-zinc-600 shadow-sm backdrop-blur-xl dark:border-white/[0.1] dark:bg-white/[0.06] dark:text-zinc-200 lg:hidden" aria-label={open ? "Close navigation menu" : "Open navigation menu"} aria-expanded={open} aria-controls="mobile-navigation-drawer">
        <span className="relative h-5 w-5" aria-hidden="true">
          <motion.span animate={open ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }} className="absolute left-0 top-0 h-0.5 w-5 bg-current" />
          <motion.span animate={open ? { opacity: 0, x: 5 } : { opacity: 1, x: 0 }} className="absolute left-0 top-2 h-0.5 w-3 bg-current" />
          <motion.span animate={open ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }} className="absolute left-0 top-4 h-0.5 w-5 bg-current" />
        </span>
      </button>
      {mounted && typeof document !== "undefined" ? createPortal(drawer, document.body) : null}
    </>
  );
}
