import type { MotionProps } from "motion/react";

const EASE = [0.16, 1, 0.3, 1] as const;

export function reveal(y: number, delay: number): MotionProps {
  return {
    initial: { opacity: 0, y },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.85, delay, ease: EASE },
  };
}
