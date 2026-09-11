"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { BiCodeAlt, BiTerminal } from "react-icons/bi";
import { brandName } from "@/app/data/site";

export type LogoVariant = "code" | "gradient" | "terminal";

type LogoProps = {
  variant?: LogoVariant;
  compact?: boolean;
  showStatus?: boolean;
  className?: string;
};

const MotionLink = motion(Link);

export default function Logo({ variant = "code", compact = false, showStatus = false, className = "" }: LogoProps) {
  const icon = variant === "terminal" ? <BiTerminal aria-hidden="true" /> : variant === "gradient" ? <span aria-hidden="true">CL</span> : <BiCodeAlt aria-hidden="true" />;
  const iconClasses = variant === "gradient" ? "bg-gradient-to-br from-indigo-500 via-violet-500 to-teal-400 text-sm font-black text-white shadow-lg shadow-indigo-500/20" : "border border-indigo-500/20 bg-indigo-500/10 text-indigo-500 dark:border-indigo-300/20 dark:bg-indigo-300/10 dark:text-indigo-200";

  return <MotionLink href="/" aria-label={`${brandName} home`} className={`group relative flex min-h-[44px] items-center gap-3 ${className}`} whileHover={{ y: -1 }} whileTap={{ scale: 0.96 }}>
    <motion.span className={`relative grid h-10 w-10 shrink-0 place-items-center rounded-[14px] text-xl transition-colors duration-300 ${iconClasses}`} whileHover={{ rotate: variant === "code" ? -5 : 4, scale: 1.08 }} transition={{ type: "spring", stiffness: 360, damping: 18 }}>
      {icon}
      <span className="pointer-events-none absolute -inset-1 rounded-[16px] border border-indigo-400/0 transition duration-300 group-hover:border-indigo-400/50 group-hover:shadow-[0_0_24px_rgba(99,102,241,0.25)]" aria-hidden="true" />
      {showStatus ? <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full border-2 border-[#f4f6fb] bg-emerald-400 dark:border-[#101014]" aria-label="Available for projects" /> : null}
    </motion.span>
    <span className={`${compact ? "hidden sm:block" : "block"} text-sm font-bold tracking-tight text-zinc-900 dark:text-white`}>{variant === "terminal" ? `~/${brandName.toLowerCase()}` : <>{brandName}<span className="text-indigo-400">.</span></>}</span>
  </MotionLink>;
}