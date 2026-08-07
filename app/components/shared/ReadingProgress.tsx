"use client";

import { useEffect, useState } from "react";

export default function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? (window.scrollY / max) * 100 : 0);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => { window.removeEventListener("scroll", update); window.removeEventListener("resize", update); };
  }, []);

  return <div className="fixed left-0 top-0 z-[60] h-1 w-full bg-transparent" aria-hidden="true"><div className="h-full origin-left bg-gradient-to-r from-indigo-500 via-violet-500 to-teal-400 shadow-[0_0_18px_rgba(129,140,248,.7)] transition-transform duration-150" style={{ transform: `scaleX(${progress / 100})` }} /></div>;
}
