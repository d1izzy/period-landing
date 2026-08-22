import { useInView, useMotionValue, useSpring } from "motion/react";
import { useEffect, useRef } from "react";

export default function CountUp({
  to,
  from = 0,
  duration = 1.6,
  className = "",
}: {
  to: number;
  from?: number;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(from);
  const spring = useSpring(motionValue, {
    damping: 28,
    stiffness: 70 / duration,
  });
  const inView = useInView(ref, { once: true, margin: "0px" });

  useEffect(() => {
    if (inView) motionValue.set(to);
  }, [inView, motionValue, to]);

  useEffect(() => {
    return spring.on("change", (value) => {
      if (ref.current) ref.current.textContent = Math.round(value).toString();
    });
  }, [spring]);

  return (
    <span ref={ref} className={className}>
      {from}
    </span>
  );
}
