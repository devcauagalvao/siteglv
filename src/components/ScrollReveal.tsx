import React, { PropsWithChildren, useMemo, useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

type ScrollRevealProps = PropsWithChildren<{
  className?: string;
  once?: boolean;
  amount?: number;
  margin?: string;
  y?: number;
  scale?: number;
  blurPx?: number;
  duration?: number;
  ease?: "easeOut" | "easeIn" | "easeInOut" | "linear";
}>;

const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  className,
  once = false,
  amount = 0.22,
  margin = "-15% 0px -15% 0px",
  y = 22,
  scale = 0.985,
  blurPx = 0,
  duration = 0.5,
  ease = "easeOut",
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  // Mobile browsers can be finicky with IntersectionObserver + nested animated layouts.
  // If in-view detection fails, the previous behavior could keep entire sections at opacity 0.
  // We fail open on small screens for reliability and performance.
  const isSmallScreen = useMemo(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia?.("(max-width: 768px)")?.matches ?? false;
  }, []);

  if (prefersReducedMotion || isSmallScreen) {
    return <div className={className}>{children}</div>;
  }

  const isInView = useInView(ref, {
    amount,
    margin,
    once,
  });

  const variants = useMemo(
    () => ({
      in: {
        opacity: 1,
        y: 0,
        scale: 1,
        filter: prefersReducedMotion || blurPx <= 0 ? "none" : "blur(0px)",
      },
      out: {
        opacity: prefersReducedMotion ? 1 : 0,
        y: prefersReducedMotion ? 0 : y,
        scale: prefersReducedMotion ? 1 : scale,
        filter: prefersReducedMotion || blurPx <= 0 ? "none" : `blur(${blurPx}px)`,
      },
    }),
    [blurPx, prefersReducedMotion, scale, y]
  );

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="out"
      animate={isInView ? "in" : "out"}
      variants={variants}
      transition={{ duration, ease }}
      style={{ willChange: "transform, opacity" }}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;
