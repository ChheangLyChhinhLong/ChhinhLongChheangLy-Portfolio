"use client";

import type { ComponentType, HTMLAttributes, MouseEvent, PropsWithChildren } from "react";
import { motion, type MotionProps, useReducedMotion } from "framer-motion";

type MotionDivProps = Omit<HTMLAttributes<HTMLDivElement>, keyof MotionProps> & MotionProps;
const MotionDiv = motion.div as ComponentType<MotionDivProps>;

export default function GlowCard({ children, className = "" }: PropsWithChildren<{ className?: string }>) {
  const shouldReduceMotion = useReducedMotion();

  const handleMove = (event: MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--glow-x", `${event.clientX - rect.left}px`);
    event.currentTarget.style.setProperty("--glow-y", `${event.clientY - rect.top}px`);
  };

  return (
    <MotionDiv
      onMouseMove={handleMove}
      whileHover={shouldReduceMotion ? undefined : { scale: 1.02, y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      className={`group/glow relative overflow-hidden ${className}`}
    >
      <div
        className="pointer-events-none absolute -inset-px hidden opacity-0 transition duration-300 group-hover/glow:opacity-100 lg:block"
        style={{ background: "radial-gradient(240px circle at var(--glow-x) var(--glow-y), rgba(129,140,248,.22), transparent 68%)" }}
      />
      {children}
    </MotionDiv>
  );
}
