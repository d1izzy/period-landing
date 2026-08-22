import { useInView, useReducedMotion } from "motion/react";
import { useMemo, useRef, type CSSProperties } from "react";
import "./BlurHighlight.css";

type HighlightDirection = "left" | "right" | "top" | "bottom";

function escapeRe(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function splitHighlighted(text: string, bits: string[]) {
  if (!bits.length) return [{ text, on: false }];
  const re = new RegExp(`(${bits.map(escapeRe).join("|")})`, "gi");
  const chunks = text.split(re).filter(Boolean);
  const lookup = new Set(bits.map((bit) => bit.toLowerCase()));
  return chunks.map((chunk) => ({ text: chunk, on: lookup.has(chunk.toLowerCase()) }));
}

export default function BlurHighlight({
  children,
  highlightedBits = [],
  className = "",
  blurAmount = 8,
  inactiveOpacity = 0.3,
  blurDelay = 0,
  blurDuration = 0.8,
  highlightDelay = 0.4,
  highlightDuration = 1,
  highlightDirection = "left",
}: {
  children: string;
  highlightedBits?: string[];
  className?: string;
  blurAmount?: number;
  inactiveOpacity?: number;
  blurDelay?: number;
  blurDuration?: number;
  highlightDelay?: number;
  highlightDuration?: number;
  highlightDirection?: HighlightDirection;
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduce = useReducedMotion();
  const on = useInView(ref, { once: true, amount: 0.45 }) || Boolean(reduce);
  const parts = useMemo(() => {
    const text = children.replace(/\s+/g, " ").trim();
    return splitHighlighted(text, highlightedBits);
  }, [children, highlightedBits]);

  const style = {
    "--hl-blur": `${blurAmount}px`,
    "--hl-off": inactiveOpacity,
    "--hl-blur-delay": `${blurDelay}s`,
    "--hl-blur-dur": `${blurDuration}s`,
    "--hl-delay": `${highlightDelay}s`,
    "--hl-dur": `${highlightDuration}s`,
  } as CSSProperties;

  return (
    <p
      ref={ref}
      className={`blur-hl ${on ? "is-on" : ""} ${className}`.trim()}
      data-dir={highlightDirection}
      style={style}
    >
      {parts.map((part, i) =>
        part.on ? <mark key={`${part.text}-${i}`}>{part.text}</mark> : part.text,
      )}
    </p>
  );
}
