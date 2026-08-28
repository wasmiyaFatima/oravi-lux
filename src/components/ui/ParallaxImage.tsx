"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import Image from "next/image";
import { useRef } from "react";

export function ParallaxImage({
  src,
  alt = "",
  className = "",
  priority = false,
  overlay = "default",
}: {
  src: string;
  alt?: string;
  className?: string;
  priority?: boolean;
  overlay?: "default" | "heavy" | "soft" | "none";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [-48, 48]);
  const scale = useTransform(
    scrollYProgress,
    [0, 1],
    reduce ? [1, 1] : [1.1, 1],
  );

  const overlays: Record<string, string> = {
    none: "",
    soft: "bg-gradient-to-t from-dark/55 via-dark/15 to-dark/25",
    default: "bg-gradient-to-t from-dark/80 via-dark/35 to-dark/45",
    heavy: "bg-gradient-to-t from-dark/92 via-dark/55 to-dark/60",
  };

  return (
    <div ref={ref} className={`absolute inset-0 overflow-hidden ${className}`}>
      <motion.div
        style={{ y, scale }}
        className="absolute inset-[-14%] will-change-transform"
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          className="object-cover"
          sizes="100vw"
        />
      </motion.div>
      {overlay !== "none" ? (
        <div className={`absolute inset-0 ${overlays[overlay]}`} />
      ) : null}
    </div>
  );
}
