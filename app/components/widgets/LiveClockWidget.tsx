"use client";

import { useEffect, useState } from "react";
import { HiOutlineClock } from "react-icons/hi";

export default function LiveClockWidget() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const timer = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  const time = now?.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) || "--:--";
  const date = now?.toLocaleDateString([], { weekday: "short", month: "short", day: "numeric" }) || "syncing";

  return (
    <div className="glass will-change-transform rounded-[26px] p-5">
      <div className="flex items-center justify-between text-zinc-500"><span className="eyebrow"><HiOutlineClock /> Local signal</span><span className="h-2 w-2 animate-pulse rounded-full bg-teal-400" /></div>
      <p className="mt-5 font-incognito text-4xl font-semibold tracking-[-0.06em]">{time}</p>
      <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">{date} · your timezone</p>
    </div>
  );
}
