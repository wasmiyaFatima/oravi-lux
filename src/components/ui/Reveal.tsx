"use client";

import { motion, useReducedMotion } from "motion/react";
import { type ReactNode } from "react";

type Variant = "fade-up" | "fade" | "fade-left" | "fade-right" | "scale";

const initials: Record<
  Variant,
  { opacity: number; y?: number; x?: number; scale?: number }
> = {
  "fade-up": { opacity: 0, y: 36 },
  fade: { opacity: 0 },
  "fade-left": { opacity: 0, x: -32 },
  "fade-right": { opacity: 0, x: 32 },
  scale: { opacity: 0, scale: 0.96, y: 20 },
};

export function Reveal({
  children,
  className = "",
  delay = 0,
  variant = "fade-up",
  amount = 0.22,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  variant?: Variant;
  amount?: number;
}) {
  const reduce = useReducedMotion();
  const from = initials[variant];

  return (
    <motion.div
      className={className}
      initial={reduce ? false : from}
      whileInView={{ opacity: 1, y: 0, x: 0, scale: 1 }}
      viewport={{ once: true, amount, margin: "0px 0px -8% 0px" }}
      transition={{
        duration: 0.9,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
