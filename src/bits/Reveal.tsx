import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

const presets = {
  fade: {
    hidden: { opacity: 0 },
    show: { opacity: 1 },
  },
  up: {
    hidden: { opacity: 0, y: 48 },
    show: { opacity: 1, y: 0 },
  },
  down: {
    hidden: { opacity: 0, y: -28 },
    show: { opacity: 1, y: 0 },
  },
  left: {
    hidden: { opacity: 0, x: -64 },
    show: { opacity: 1, x: 0 },
  },
  right: {
    hidden: { opacity: 0, x: 64 },
    show: { opacity: 1, x: 0 },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.86 },
    show: { opacity: 1, scale: 1 },
  },
  blur: {
    hidden: { opacity: 0, filter: "blur(14px)", y: 18 },
    show: { opacity: 1, filter: "blur(0px)", y: 0 },
  },
  clip: {
    hidden: { opacity: 0, clipPath: "inset(12% 12% 12% 12%)", scale: 0.98 },
    show: { opacity: 1, clipPath: "inset(0% 0% 0% 0%)", scale: 1 },
  },
  tilt: {
    hidden: { opacity: 0, rotate: -4, y: 36 },
    show: { opacity: 1, rotate: 0, y: 0 },
  },
} as const;

export type RevealVariant = keyof typeof presets;

export default function Reveal({
  children,
  className = "",
  variant = "up",
  delay = 0,
  duration = 0.9,
}: {
  children: ReactNode;
  className?: string;
  variant?: RevealVariant;
  delay?: number;
  duration?: number;
}) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      variants={presets[variant]}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2, margin: "0px 0px -8% 0px" }}
      transition={{ duration, delay, ease }}
    >
      {children}
    </motion.div>
  );
}
