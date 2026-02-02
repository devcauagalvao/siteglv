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
  blurPx = 4,
  duration = 0.5,
  ease = "easeOut",
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

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
        filter: prefersReducedMotion ? "none" : "blur(0px)",
      },
      out: {
        opacity: prefersReducedMotion ? 1 : 0,
        y: prefersReducedMotion ? 0 : y,
        scale: prefersReducedMotion ? 1 : scale,
        filter: prefersReducedMotion ? "none" : `blur(${blurPx}px)`,
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
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;
