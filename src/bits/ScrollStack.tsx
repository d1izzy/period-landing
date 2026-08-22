import {
  Children,
  useEffect,
  useRef,
  type CSSProperties,
  type ReactNode,
} from "react";
import "./ScrollStack.css";

export function ScrollStackItem({
  children,
  itemClassName = "",
}: {
  children: ReactNode;
  itemClassName?: string;
}) {
  return <div className={`scroll-stack-card ${itemClassName}`.trim()}>{children}</div>;
}

export default function ScrollStack({
  children,
  itemScale = 0.04,
  itemStackDistance = 22,
  stackPosition = 0.12,
  baseScale = 0.9,
}: {
  children: ReactNode;
  itemScale?: number;
  itemStackDistance?: number;
  stackPosition?: number;
  baseScale?: number;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const items = Children.toArray(children);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const cards = [...root.querySelectorAll<HTMLElement>(".scroll-stack-card")];
    const pins = [...root.querySelectorAll<HTMLElement>(".scroll-stack-pin")];
    let frame = 0;

    const update = () => {
      const vh = window.innerHeight;
      const pinY = vh * stackPosition;

      cards.forEach((card, i) => {
        const next = pins[i + 1];
        if (!next) {
          card.style.transform = "translateY(0) scale(1)";
          card.style.filter = "none";
          return;
        }
        const nextTop = next.getBoundingClientRect().top;
        const t = Math.min(1, Math.max(0, (pinY + 80 - nextTop) / (vh * 0.45)));
        const scale = Math.max(baseScale, 1 - t * (itemScale * (i + 1) + 0.02));
        const lift = -t * itemStackDistance * 0.35;
        const dim = t * 0.22;
        card.style.transform = `translateY(${lift}px) scale(${scale})`;
        card.style.filter = dim > 0.02 ? `brightness(${1 - dim})` : "none";
      });
    };

    const tick = () => {
      update();
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    window.addEventListener("resize", update);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", update);
    };
  }, [baseScale, itemScale, itemStackDistance, stackPosition, items.length]);

  return (
    <div ref={rootRef} className="scroll-stack">
      {items.map((child, i) => (
        <div
          key={i}
          className="scroll-stack-pin"
          style={
            {
              zIndex: i + 1,
              "--stack-top": `${72 + i * itemStackDistance}px`,
            } as CSSProperties
          }
        >
          {child}
        </div>
      ))}
    </div>
  );
}
