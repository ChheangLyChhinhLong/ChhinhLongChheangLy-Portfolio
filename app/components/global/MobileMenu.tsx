"use client";
import Link from "next/link";
import { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import {
  HiBeaker,
  HiBookmarkAlt,
  HiCamera,
  HiOutlineX,
  HiUser,
} from "react-icons/hi";

export default function MobileMenu() {
  const [navShow, setNavShow] = useState(false);
  const data = [
    {
      title: "About",
      href: "/about",
      icon: HiUser,
    },
    {
      title: "Projects",
      href: "/projects",
      icon: HiBeaker,
    },
    {
      title: "Blog",
      href: "/blog",
      icon: HiBookmarkAlt,
    },
    {
      title: "Photos",
      href: "/photos",
      icon: HiCamera,
    },
  ];

  const onToggleNav = () => {
    setNavShow((status) => {
      if (status) {
        document.body.style.overflow = "auto";
      } else {
        document.body.style.overflow = "hidden";
      }
      return !status;
    });
  };

  return (
    <>
      <button
        aria-label="Open navigation menu"
        onClick={onToggleNav}
        className="grid h-11 w-11 place-items-center rounded-full border border-black/[0.06] bg-white/50 p-2 active:scale-95 dark:border-white/[0.1] dark:bg-white/[0.06]"
      >
        <RxHamburgerMenu className="text-xl" />
      </button>
      <div
        className={`fixed left-0 top-0 z-40 h-full w-full transform bg-[#f4f6fb]/95 px-6 pt-6 backdrop-blur-md duration-[600ms] ease-[cubic-bezier(0.7,0,0,1)] dark:bg-[#08080a]/95 md:hidden ${
          navShow ? "translate-x-0 rounded-none" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between mt-6 px-8">
          <Link href="/" onClick={onToggleNav} className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-[15px] bg-gradient-to-br from-indigo-500 via-violet-500 to-teal-400 text-sm font-black text-white">CL</span>
            <span className="font-bold tracking-tight">ChhinhLong</span>
          </Link>

          <button
            aria-label="Close navigation menu"
            onClick={onToggleNav}
            className={`grid h-11 w-11 place-items-center rounded-full border border-black/[0.06] bg-white/60 p-2 duration-500 dark:border-white/[0.1] dark:bg-white/[0.06] ${
              !navShow ? "-rotate-[360deg]" : null
            }`}
          >
            <HiOutlineX className="text-xl" />
          </button>
        </div>
        <nav className="flex flex-col mt-6">
          {data.map((link) => (
            <Link
              key={link.title}
              href={link.href}
              className="flex items-center gap-x-3 rounded-3xl border-b border-black/[0.06] px-5 py-6 font-incognito text-lg font-semibold shadow-sm dark:border-white/[0.08] dark:shadow-none group"
              onClick={onToggleNav}
            >
              <link.icon
                className="text-zinc-500 group-hover:dark:text-white group-hover:text-zinc-800 duration-300"
                aria-hidden="true"
              />
              {link.title}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}
