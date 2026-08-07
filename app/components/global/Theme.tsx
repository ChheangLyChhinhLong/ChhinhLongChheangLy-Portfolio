"use client";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import SunIcon from "../../assets/icons/SunIcon";
import MoonIcon from "../../assets/icons/MoonIcon";

export default function Theme() {
  const { systemTheme, theme, setTheme } = useTheme();
  const [hasMounted, setHasMounted] = useState(false);
  const currentTheme = theme === "system" ? systemTheme : theme;

  function toggleTheme() {
    return currentTheme === "light" ? setTheme("dark") : setTheme("light");
  }
  useEffect(() => setHasMounted(true), []);

  if (!hasMounted)
    return (
      <span className="h-11 w-11 animate-pulse rounded-full border border-zinc-300 bg-zinc-200 dark:border-zinc-700 dark:bg-zinc-800"></span>
    );

  return (
    <button
      onClick={toggleTheme}
      className={`grid h-11 w-11 shrink-0 place-items-center rounded-full border border-black/[0.06] bg-white/50 p-2 text-zinc-500 shadow-sm transition duration-300 hover:bg-white active:scale-95 dark:border-white/[0.1] dark:bg-white/[0.06] dark:text-indigo-300 dark:hover:bg-white/[0.12] ${
        currentTheme === "light" ? "-rotate-180" : "rotate-0"
      }`}
      aria-label="Toggle color theme"
      title="Toggle color theme"
    >
      {currentTheme === "light" ? <SunIcon /> : <MoonIcon />}
    </button>
  );
}
