"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { HiBeaker, HiBookmarkAlt, HiCamera, HiHome, HiUser } from "react-icons/hi";
import Theme from "./Theme";
import UnmountStudio from "./Unmount";
import { brandName } from "../../data/site";
import SocialLinks from "../shared/SocialLinks";

const routes = [
  { title: "Home", href: "/", icon: HiHome },
  { title: "About", href: "/about", icon: HiUser },
  { title: "Projects", href: "/projects", icon: HiBeaker },
  { title: "Journal", href: "/blog", icon: HiBookmarkAlt },
  { title: "Photos", href: "/photos", icon: HiCamera },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <UnmountStudio>
      <header className="pointer-events-none fixed inset-x-0 bottom-0 z-50 px-3 safe-bottom lg:bottom-auto lg:top-0 lg:px-8 lg:pt-5">
        <div className="glass pointer-events-auto mx-auto hidden max-w-6xl items-center justify-between rounded-full px-3 py-2.5 lg:flex lg:px-4">
          <Link href="/" className="group flex items-center gap-3" aria-label={`${brandName} home`}>
            <span className="grid h-11 w-11 place-items-center rounded-[16px] bg-gradient-to-br from-indigo-500 via-violet-500 to-teal-400 text-sm font-black text-white shadow-lg shadow-indigo-500/20 transition duration-200 group-hover:rotate-6 group-active:scale-95">CL</span>
            <span className="text-sm font-bold tracking-tight">{brandName}<span className="text-indigo-400">.</span></span>
          </Link>

          <nav aria-label="Primary navigation">
            <ul className="flex items-center gap-1">
              {routes.map(({ title, href, icon: Icon }) => {
                const isActive = href === "/" ? pathname === href : pathname.startsWith(href);
                return (
                  <li key={href}>
                    <Link href={href} aria-current={isActive ? "page" : undefined} className={`group flex min-h-[44px] items-center gap-2 rounded-full px-3.5 py-2 font-incognito text-sm transition duration-200 active:scale-95 ${isActive ? "bg-black/[0.06] text-zinc-950 dark:bg-white/[0.1] dark:text-white" : "text-zinc-500 hover:bg-black/[0.05] hover:text-zinc-950 dark:text-zinc-400 dark:hover:bg-white/[0.08] dark:hover:text-white"}`}>
                      <Icon className={`text-sm transition group-hover:text-indigo-500 ${isActive ? "text-indigo-500 dark:text-indigo-300" : ""}`} aria-hidden="true" />
                      {title}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <SocialLinks
              variant="floating-bar"
              className="hidden xl:flex"
            />
            <Theme />
          </div>
        </div>

        <nav className="glass pointer-events-auto mx-auto flex max-w-md items-center justify-between rounded-[26px] p-1.5 shadow-[0_18px_60px_rgba(15,23,42,0.2)] lg:hidden" aria-label="Mobile navigation">
          {routes.map(({ title, href, icon: Icon }) => {
            const isActive = href === "/" ? pathname === href : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                aria-label={title}
                title={title}
                aria-current={isActive ? "page" : undefined}
                className={`relative grid h-12 min-w-[44px] flex-1 place-items-center rounded-[20px] transition duration-200 active:scale-90 ${isActive ? "bg-zinc-950 text-white shadow-lg shadow-zinc-950/15 dark:bg-white dark:text-zinc-950" : "text-zinc-500 dark:text-zinc-400"}`}
              >
                <Icon className="text-xl" aria-hidden="true" />
                {isActive ? <span className="absolute bottom-1 h-1 w-1 rounded-full bg-indigo-400" aria-hidden="true" /> : null}
                <span className="sr-only">{title}</span>
              </Link>
            );
          })}
          <span className="mx-1 h-7 w-px bg-black/[0.08] dark:bg-white/[0.1]" aria-hidden="true" />
          <Theme />
        </nav>
      </header>
    </UnmountStudio>
  );
}
