"use client";
import { motion, useInView, useAnimation, AnimationProps } from "framer-motion";
import { useRef, useEffect, RefObject } from "react";

interface SlideProps extends AnimationProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

export const Slide = ({ children, className, delay }: SlideProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInview = useInView(ref as RefObject<Element>, { once: true });
  const controls = useAnimation();

  useEffect(() => {
    if (isInview) {
      controls.start("stop");
    }
  }, [controls, isInview]);

  return (
    <motion.div
      ref={ref}
      variants={{
        start: { opacity: 0, translateY: 10 },
        stop: { opacity: 1, translateY: 0 },
      }}
      transition={{ type: "spring", stiffness: 300, damping: 25, duration: 0.5, delay }}
      animate={controls}
      initial="start"
    >
      <div className={className}>{children}</div>
    </motion.div>
  );
};
